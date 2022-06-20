import React, { Component } from 'react';
import './lab.scss';
import ReactGA from 'react-ga';
import moment from 'moment';
import { connect } from 'react-redux';
import {
    Button, Col, Row, Table, Typography, Collapse, Icon, Progress, message, Modal, Statistic, notification, Empty, Spin,
} from 'antd';
import { NavLink } from 'react-router-dom';
import { CATEGORIES, ACTIONS } from '../../util/GAEventConstants';
import {
    fetchLabs, destroyLab, getActiveLab, getJobProgress, saveCurrentLabStep,
    updateActiveLabStatus, updateOpenHints, getRemainingHintsCount, getHintMessage, uploadFile, uploadLabImage,
    getLabImage, deleteLabImage, checkLabStatus, checkResourceURLStatus, saveStepProgress, addLabTime, requestLabTime,
} from '../../store/actions/labs';
import { resetChecker } from '../../store/actions/admin/acitveLabsHistory';
import { fetchStepsImages } from '../../store/actions/stepsImages';
import { getActiveCourse } from '../../store/actions/activeCourse';
import LabSteps from '../../components/lab/lab-steps';
import FunnyMsg from '../../components/lab/funny-messages';
import Loading from '../../components/Loading/Loading';
import { getAuthUser } from '../../store/actions/auth';
import { SUPPORT_HOURS } from '../../constants';
import { isInsideSupportHours } from '../../util/validators';

const { Paragraph, Title, Text } = Typography;
const { Panel } = Collapse;
const confirmModal = Modal.confirm;
const { Countdown } = Statistic;
let sleepPromise = null;
let promiseFinished = false;
const ButtonGroup = Button.Group;

class Lab extends Component {
    constructor(props) {
        super(props);
        this.progressInterval = null;
        this.loader = null;
        this.inProgress = false;
        this.checkLabStatusInterval = null;
        this.checkResourceURLStatusInterval = null;

        this.state = {
            currentStep: 0,
            loadingMessage: '',
            showDone: false,
            collapsed: true,
            deadline: moment().unix(),
            showing: {},
            active_lab_id: null,
            loading: false,
            checking: false,
            stages: [],
            stepStatus: {
                activeLabId: this.props.match.params.id,
                completed: [],
                failed: [],
            },
        };

        this.messageInterval = null;
    }

    sleep(milliseconds) {
        let cancel = () => promiseFinished = true;
        const promise = new Promise((resolve, reject) => {
            setTimeout(resolve, milliseconds);

            cancel = () => {
                if (promiseFinished) {
                    return;
                }
                reject();
            };
        });
        return { promise, cancel };
    }

    setCompletedFailedSteps(aLab) {
        let currentStep = 0;
        if (aLab.currentStep) {
            currentStep = aLab.currentStep.lab_id;
        }
        if (aLab.completed_failed_steps) {
            const data = JSON.parse(aLab.completed_failed_steps);
            const { stepStatus } = this.state;
            this.setState({
                stepStatus: {
                    ...stepStatus,
                    completed: data.completed,
                    failed: data.failed,
                },
                currentStep,
            });
        }
    }

    setDeadLine(aLab) {
        const deadline = aLab.lab_end_at - moment().unix();
        this.setState({ deadline: moment().add(deadline < 0 ? 0 : deadline, 'seconds') });
        if (aLab.currentStep) {
            this.setState({
                currentStep: aLab.currentStep.lab_step,
            });
        }
        return this.state.deadline;
    }

    getRelevantJob = jobs => {
        let lastJob = null;
        if (jobs[jobs.length - 2]) {
            if (jobs[jobs.length - 2].status === 'CREATING' || (jobs[jobs.length - 2].status === 'CREATED' && jobs[jobs.length - 1].progress === 0)) {
                lastJob = jobs[jobs.length - 2];
            } else {
                lastJob = jobs[jobs.length - 1];
            }
        } else {
            lastJob = jobs[jobs.length - 1];
        }
        return lastJob;
    }

    async progressIntervalCallback(id, aLab) {
        const {
            getJobProgress, checkResourceURLStatus, labs: { resourceURLs }, getActiveLab, getAuthUser,
        } = this.props;
        const res = await getJobProgress(id);
        if (res !== false) {
            // set lastJob to penultimate job to when the last job is still being created (status of last job is CREATING)
            const lastJob = res[res.length - 2];
            if (lastJob.status === 'ERROR') {
                // when lastJob status is ERROR cleared intervals and show error message
                clearInterval(this.progressInterval);
                clearInterval(this.checkLabStatusInterval);
                clearInterval(this.checkResourceURLStatusInterval);
                this.progressInterval = null;
                this.inProgress = false;
                message.error('Lab creation/deletion failed, please try again.');
            } else if (parseInt(lastJob.progress) === 100) {
                // set inProgress false since lastJob.progress is 100
                this.inProgress = false;
                if (lastJob.status === 'CREATED') {
                    message.success('Lab created.');
                    if (!this.checkResourceURLStatusInterval) {
                        // if there is no checkResourceURLStatusInterval set it
                        checkResourceURLStatus(resourceURLs);
                        this.setIntervalForResourcesURLStatus();
                    }
                    if (aLab.lab.automated_checking_lab_steps && !aLab.activeCourse.finished) {
                        sleepPromise = this.sleep(45000);
                        if (sleepPromise.promise) {
                            sleepPromise.promise.then(() => {
                                promiseFinished = true;
                                this.setIntervalForLabStatus(id);
                            });
                        }
                    }
                } else if (lastJob.status === 'DESTROYED') {
                    // If the lab has been successfully destroyed, cancel any interval checks for the future.
                    message.success('Lab deleted.');
                    clearInterval(this.messageInterval);
                    clearInterval(this.progressInterval);
                    clearInterval(this.checkLabStatusInterval);
                    clearInterval(this.checkResourceURLStatusInterval);
                }
                clearInterval(this.progressInterval);
                this.progressInterval = null;
                getActiveLab(id);
                getAuthUser();
            }
        }
    }

    async courseNotFinished(lastJob, id, aLab) {
        // checking that lastJob status is DESTROYING or DESTROYED and showing accordingly message
        const { history, checkResourceURLStatus, labs: { resourceURLs, activeLab } } = this.props;
        const destroying = lastJob.status === 'DESTROYING' ? 'Lab is being destroyed.' : '';
        const destroyed = lastJob.status === 'DESTROYED' ? 'Lab is destroyed.' : '';
        const alertMsg = destroying || destroyed;
        if (alertMsg) {
            // show message
            message.error(alertMsg);
            history.push(`/platform/tl/${aLab.activeCourse.id}`);
            return;
        }
        if (lastJob.status === 'CREATING' && this.progressInterval === null) {
            // set loadingMessage when status of  lastJob is CREATING
            this.setState({
                loadingMessage: this.__getRandomMsg(),
            });
            this.messageInterval = setInterval(() => {
                this.setState({
                    loadingMessage: this.__getRandomMsg(),
                });
            }, 5000);
            this.inProgress = true;
            // set progressInterval
            this.progressInterval = setInterval(() => this.progressIntervalCallback(id, aLab), 3000);
        }
        this.setState({
            active_lab_id: activeLab.id,
        });
        if (lastJob.status === 'CREATED') {
            if (!this.checkResourceURLStatusInterval) {
                // if there is no checkResourceURLStatusInterval set it
                checkResourceURLStatus(resourceURLs);
                this.setIntervalForResourcesURLStatus();
                if (aLab.lab.automated_checking_lab_steps && !aLab.activeCourse.finished) {
                    const { promise } = this.sleep(45000);
                    promise.then(() => {
                        promiseFinished = true;
                        this.setIntervalForLabStatus(id);
                    });
                }
            }
        }
        if (lastJob.status === 'ERROR') {
            // show error when lastJob status is ERROR
            clearInterval(this.messageInterval);
            clearInterval(this.progressInterval);
            clearInterval(this.checkLabStatusInterval);
            clearInterval(this.checkResourceURLStatusInterval);
            if (sleepPromise) {
                sleepPromise.cancel();
            }
            this.progressInterval = null;
            this.inProgress = false;
            message.error('Lab creation/deletion failed, please try again.');
        }
    }

    componentDidMount() {
        this.visitedTime = new Date().getTime();
        ReactGA.pageview(window.location.pathname);
        const { id } = this.props.match.params;
        const { user } = this.props.auth;
        this.setState({
            loading: true,
        });
        return this.__getActiveLab(user, id);
    }

    __getActiveLab = async (user, id) => {
        const loader = message.loading('Loading..');
        const {
            getActiveLab, history, getRemainingHintsCount, fetchStepsImages,
        } = this.props;
        const res = await getActiveLab(id);
        const { labs: { activeLab } } = this.props;
        loader();
        if (res === false || !activeLab) {
            history.push(`/platform/lab/${id}`);
            return;
        }

        await getRemainingHintsCount(id);

        this.setCompletedFailedSteps(activeLab);

        if (activeLab.progress !== 'Pending') {
            this.setState({
                showDone: true,
            });
        }

        await fetchStepsImages(activeLab.activeCourse.course_id);

        // Redirect user away if they can't visit the lab:
        if (
            moment().isAfter(moment.unix(activeLab.lab_end_at)) // Time ran out
            && (activeLab.activeCourse.course.authors.findIndex(item => item.id === user.id) === -1) // and is not an author
            && (activeLab.progress !== 'Completed') // and hasn't completed the lab
        ) {
            message.error('The available time for the lab has run out!');
            history.push(`/platform/tl/${activeLab.activeCourse.id}`);
        }

        this.setDeadLine(activeLab);

        const { jobs } = activeLab;

        if (!jobs.length) {
            history.push(`/platform/lab/${id}`);
            return;
        }

        const lastJob = this.getRelevantJob(jobs);

        if (activeLab.activeCourse) {
            ReactGA.event({
                category: CATEGORIES.HANDS_ON_LAB,
                action: ACTIONS.HAND_ON_LAB_STARTED_FOR_COURSE_FROM_ACTIVE_LAB(activeLab.activeCourse.course.title),
                label: 'Hands-on Lab Page',
            });
        }

        if (!activeLab.activeCourse.finished) {
            this.courseNotFinished(lastJob, id, activeLab);
        }
        this.setState({ loading: false });
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        const { activeLab } = this.props.labs;
        const aLab = nextProps.labs.activeLab;
        if ((activeLab && aLab) && (activeLab.lab_end_at !== aLab.lab_end_at)) {
            const deadline = aLab.lab_end_at - moment().unix();
            this.setState({ deadline: moment().add(deadline < 0 ? 0 : deadline, 'seconds') });
        }
    }

    componentWillUnmount() {
        // clearInterval(this.interval)
        clearInterval(this.progressInterval);
        clearInterval(this.messageInterval);
        clearInterval(this.checkLabStatusInterval);
        clearInterval(this.checkResourceURLStatusInterval);
        if (sleepPromise) {
            sleepPromise.cancel();
        }
        this.leftTime = new Date().getTime();
        const time = this.leftTime - this.visitedTime;
        ReactGA.timing({
            category: CATEGORIES.TIMING,
            variable: 'time',
            value: time, // in milliseconds
            label: 'Hands-on Lab Page',
        });
    }

    setIntervalForLabStatus(id) {
        this.checkLabStatusInterval = setInterval(() => {
            this.checkLabStatus(id);
        }, 10000);
    }

    setIntervalForResourcesURLStatus = () => {
        this.checkResourceURLStatusInterval = setInterval(() => {
            if (this.props.labs.resourceURLs.length) {
                this.props.checkResourceURLStatus(this.props.labs.resourceURLs);
            }
        }, 15000);
    }

    checkLabStatus(id) {
        this.props.checkLabStatus(id).then(res => {
            if (res.data) {
                if (res.data.find(stage => stage === 'finish')) {
                    clearInterval(this.checkLabStatusInterval);
                    if (sleepPromise) {
                        sleepPromise.cancel();
                    }
                }
                this.setState({ stages: res.data }, this.handleStepProgress);
            }
        });
    }

    handleStepProgress = () => {
        const { stepStatus, stages } = this.state;
        const { activeLab } = this.props.labs;
        if (activeLab) {
            const { lab } = activeLab;
            const chapters = lab.step;
            chapters.forEach((item, index) => {
                if (item.states && item.states.length && item.states.every(value => stages.includes(value.title))
                    && !stepStatus.completed.includes(index)) {
                    stepStatus.completed.push(index);
                    if (stepStatus.failed.includes(index)) {
                        const indexOfStep = stepStatus.failed.indexOf(index);
                        stepStatus.failed.splice(indexOfStep, 1);
                    }
                } else if ((item.states && item.states.length && !item.states.every(value => stages.includes(value.title)))
                    && !stepStatus.failed.includes(index) && !stepStatus.completed.includes(index)) {
                    stepStatus.failed.push(index);
                }
            });
            this.setState({ stepStatus });
            this.props.saveStepProgress(stepStatus);
        }
    }

    updateStepProgress = index => {
        const { stepStatus, stages } = this.state;
        const { activeLab } = this.props.labs;
        if (activeLab) {
            const { lab } = activeLab;
            const chapters = lab.step;
            for (let i = 0; i < index; i++) {
                const item = chapters[i];
                if ((!item.states || !item.states.length) && !stepStatus.completed.includes(i)) {
                    stepStatus.completed.push(i);
                    if (stepStatus.failed.includes(i)) {
                        const indexOfStep = stepStatus.failed.indexOf(i);
                        stepStatus.failed.splice(indexOfStep, 1);
                    }
                } else if ((item.states && item.states.length && !item.states.every(value => stages.includes(value.title)))
                    && !stepStatus.failed.includes(i) && !stepStatus.completed.includes(i) && lab.automated_checking_lab_steps) {
                    stepStatus.failed.push(i);
                }
            }
            this.setState({ stepStatus });
            this.props.saveStepProgress(stepStatus);
        }
    }

    destroyLab = () => {
        confirmModal({
            title: 'Are you sure you want to destroy your lab already? All progress will be gone!',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                const { id } = this.props.match.params;
                const { active_course_id } = this.props.labs.activeLab;
                if (sleepPromise) {
                    sleepPromise.cancel();
                }
                // FOR TESTING PURPOSES ONLY
                const testing_mode = false;
                this.props.destroyLab({
                    id,
                    testing_mode,
                }).then(res => {
                    if (res) {
                        this.props.getActiveCourse(active_course_id);
                        this.props.history.push(`/platform/tl/${active_course_id}`);
                    } else {
                        message.error('Can not destroy the lab while in review');
                    }
                });
            },
        });
    }

    getKeyByValue(object, value, type) {
        return object[Object.keys(object).find(key => object[key].creds && JSON.parse(object[key].creds)[type] === value)].name;
    }

    // TODO: rewrite to proper React
    downloadConfigFile = text => {
        const element = document.createElement('a');
        if (JSON.parse(text).kubeconfig) {
            const file = new Blob([JSON.parse(text).kubeconfig], { type: 'text/x-yaml' });
            element.href = URL.createObjectURL(file);
            element.download = `${this.getKeyByValue(this.props.labs.activeLab.resources, JSON.parse(text).kubeconfig, 'kubeconfig')}.yaml`;
        } else {
            const file = new Blob([JSON.parse(text).private_key], { type: 'text' });
            element.href = URL.createObjectURL(file);
            element.download = `${this.getKeyByValue(this.props.labs.activeLab.resources, JSON.parse(text).private_key, 'private_key')}.pem`;
        }
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    checkNotification = index => {
        const { lab, progress } = this.props.labs.activeLab;
        // We only check if the lab progress is pending and automated checking of lab steps is enabled
        if (progress === 'Pending' && lab.automated_checking_lab_steps) {
            // There is no previous step for indexes of less than 1
            if (index < 1) {
                return;
            }

            const { stages, stepStatus } = this.state;

            // get the last step
            const prevStep = lab.step[index - 1];

            // No action if there's no states associated with the previous step
            if (!prevStep.states) {
                return;
            }
            // Find any incomplete stages mentioned for that step
            const incompleteStages = prevStep.states.filter(value => !stages.includes(value.title));
            const prevStepIsAlreadyComplete = stepStatus.completed.includes(index - 1);

            // If there are incomplete stages and the step isn't already marked as complete:
            if (incompleteStages.length && !prevStepIsAlreadyComplete) {
                // We'll only print the message about the first of the failed states:
                const firstFailedState = incompleteStages[0];
                const description = firstFailedState.help_message
                    || 'Our automated checking indicates you may not have completed previous step correctly. We advise you to check again before continuing.';

                notification.info({
                    message: 'Check again!',
                    description,
                    duration: 10,
                });
            }
        }
    }

    next = () => {
        const { activeLab } = this.props.labs;
        const chapters = activeLab.lab.step;
        const currentStep = this.state.currentStep + 1;
        this.__saveCurrentStep(currentStep);
        this.__scrollToHead();
        this.setState({ currentStep });
        if (currentStep === chapters.length - 1) {
            this.updateStepProgress(currentStep + 1);
        } else {
            this.updateStepProgress(currentStep);
        }
        this.checkNotification(currentStep);
    }

    prev = () => {
        const currentStep = this.state.currentStep - 1;
        this.__saveCurrentStep(currentStep);
        this.__scrollToHead();
        this.setState({ currentStep });
    }

    done = () => {
        const { id } = this.props.labs.activeLab;
        const insideSupportHours = isInsideSupportHours();
        confirmModal({
            title: <div>Are you sure this lab is done?</div>,
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk: () => {
                const loader = message.loading('Please wait while we are checking your lab results....', 1);
                this.setState({
                    showDone: true,
                    checking: true,
                });

                this.props.updateActiveLabStatus(id).then(res => {
                    const { active_course_id } = this.props.labs.activeLab;
                    if (res) {
                        if (res.automated) {
                            this.props.getAuthUser();
                            if (res.success) {
                                notification.open({
                                    message: 'Congratulations!',
                                    description:
                                        'Our Artificial Intellegence using Machine Learning has determined you have completed the lab successfully. Check your certificates page!',
                                    duration: 60,
                                });
                                this.props.history.push(`/platform/tl/${active_course_id}`);
                            } else {
                                notification.info({
                                    message: 'Request accepted!',
                                    description: res.message,
                                    duration: 10,
                                });
                                this.setState({
                                    showDone: true,
                                    checking: false,
                                });
                                this.props.history.push(`/platform/tl/${active_course_id}`);
                            }
                        } else {
                            this.props.getAuthUser();
                            notification.open({
                                message: 'Request Accepted!',
                                description:
                                    `You request has been accepted. Our team will start reviewing the results as soon as possible and you will be notified by email!
                                    ${!insideSupportHours ? SUPPORT_HOURS : ''}`,
                                duration: 10,
                            });
                            this.setState({
                                ...this.state,
                                showDone: true,
                            });
                            this.props.history.push(`/platform/tl/${active_course_id}`);
                        }
                    } else {
                        loader();
                        message.error(res.message);
                        this.setState({
                            showDone: false,
                            checking: false,
                        });
                    }
                });
            },
        });
    }

    selectStep = index => {
        const shouldNotify = index > this.state.currentStep;
        const { activeLab } = this.props.labs;
        const chapters = activeLab.lab.step;
        this.__scrollToHead();
        this.setState({
            currentStep: index,
        }, () => {
            if (index === chapters.length - 1) {
                this.updateStepProgress(index + 1);
            } else {
                this.updateStepProgress(index);
            }
            if (shouldNotify) {
                this.checkNotification(index);
            }
        });

        this.__saveCurrentStep(index);
    }

    __scrollToHead() {
        window.scrollTo({ top: this.state.collapsed ? 300 : 130, behavior: 'smooth' });
    }

    __saveCurrentStep(step) {
        const labId = this.props.labs.activeLab.id;
        const { currentStep } = this.props.labs.activeLab;

        if (currentStep) {
            this.props.saveCurrentLabStep(currentStep.id, labId, step);
        } else {
            this.props.saveCurrentLabStep(0, labId, step);
        }
    }

    goToAws = link => {
        window.open(link, '_blank');
    }

    hideProgressBar(last_job) {
        if (last_job && last_job.status === 'ERROR') {
            return false;
        }
        if (last_job && last_job.progress !== 100) {
            return true;
        }
        return false;
    }

    __getRandomMsg() {
        const index = Math.floor(Math.random() * Math.floor(FunnyMsg.length));
        return FunnyMsg[index];
    }

    collapseChanged = items => {
        this.setState({
            collapsed: Boolean(items.length),
        });
    }

    onFinish = () => {
        const { active_course_id } = this.props.labs.activeLab;
        this.props.history.push(`/platform/tl/${active_course_id}`);
    }

    copyCreds = info => {
        const copyInput = document.createElement('textarea');
        copyInput.value = info;
        document.body.appendChild(copyInput);
        copyInput.select();
        document.execCommand('copy');
        document.body.removeChild(copyInput);
    }

    handleCreds = id => {
        const { showing } = this.state;
        showing[id] = !showing[id];
        this.setState({ showing });
    }

    checkAuthors = (authors, user_id) => {
        if (!authors.length) {
            return false;
        }
        for (let i = 0; i < authors.length; i++) {
            if (authors[i].id === user_id) {
                return true;
            }
        }
        return false;
    }

    resetAutomatedChecking = activeLabId => {
        const { resetChecker } = this.props;
        return resetChecker(activeLabId).then(res => {
            if (res === true) {
                message.success('Lab automated checking is reset');
            } else {
                message.error(res.message || 'Something went wrong');
            }
        });
    }

    render() {
        const {
            activeLab, loadingDestroyLab, remainingHints, resourceURLs,
        } = this.props.labs;
        const { user } = this.props.auth;
        const {
            loadingMessage, showDone, deadline, showing, active_lab_id, loading, checking, stages, stepStatus,
        } = this.state;
        let tableLoading = true;
        let lastJob = null;
        let lab = null;
        let resources = [];
        let jobs = [];
        let course_id = null;
        let labId = null;
        let isAuthor = false;
        if (activeLab && activeLab.activeCourse) {
            lab = activeLab.lab ? activeLab.lab : {};
            resources = activeLab.resources;
            jobs = activeLab.jobs;
            course_id = activeLab.activeCourse && activeLab.activeCourse.course ? activeLab.activeCourse.course.id : null;
            labId = lab.id;
            if (jobs.length) {
                lastJob = jobs[jobs.length - 2];
            }

            if (resources && resources.length) {
                tableLoading = false;
            }
            isAuthor = this.checkAuthors(activeLab.activeCourse.course.authors, user.id);
        }
        const columns = [
            {
                title: 'Resource',
                dataIndex: 'name',
            },
            {
                title: 'URL',
                dataIndex: 'url',
                render: (awsLink, data) => {
                    if (awsLink !== '') {
                        // Find the relevant resource:
                        const resourceUrl = resourceURLs.find(item => item.id === data.id);

                        if (resourceUrl) {
                            // If no check, or success, display the launch button:
                            if (resourceUrl.type === 'success' || resourceUrl.url.startsWith('[no-check]')) {
                                // Check if it needs the "no-check" removed:
                                const url = resourceUrl.url.startsWith('[no-check]') ? resourceUrl.url.replace('[no-check]', '').trim() : resourceUrl.url;

                                return <a href={url} rel='noopener noreferrer' target="_blank"><Button className='launch-success' type='primary' icon='code'>Launch</Button></a>;
                            }

                            // Else, Loading:
                            return <Button type='primary' icon='code' loading>Launch</Button>;
                        }
                    }
                },
                sorter: (a, b) => a.url.length - b.url.length,
                defaultSortOrder: 'descend',
            },
            {
                title: 'Info',
                dataIndex: 'info',
            },
            {
                title: 'Credentials',
                dataIndex: 'creds',
                render: (info, record) => {
                    if (info !== '') {
                        if (info.length < 100) {
                            let data = '';
                            try {
                                data = JSON.parse(info);
                            } catch (error) {
                                data = info;
                            }

                            return (
                                <div>
                                    <Button
                                        type='primary'
                                        shape='circle'
                                        icon={showing[record.id] ? 'eye' : 'eye-invisible'}
                                        style={showing[record.id] ? { float: 'right' } : {}}
                                        onClick={() => this.handleCreds(record.id)}
                                    />
                                    {showing[record.id]
                                        ? (
                                            <div style={{ float: 'left' }}>
                                                {typeof data === 'string'
                                                    ? (
                                                        <p>
                                                            {data}
                                                            <Button
                                                                type='primary'
                                                                shape='circle'
                                                                icon='copy'
                                                                size='small'
                                                                className='copy-button'
                                                                onClick={() => this.copyCreds(data)}
                                                            />
                                                        </p>
                                                    )
                                                    : (
                                                        <p>
                                                            {Object.keys(data).map((creds, i) => (
                                                                <div className='creds-username'>
                                                                    <span className='creds-header'>
                                                                        {creds}
                                                                        :
                                                                        {' '}
                                                                    </span>
                                                                    {data[creds]}
                                                                    <Button
                                                                        type='primary'
                                                                        shape='circle'
                                                                        icon='copy'
                                                                        size='small'
                                                                        className='copy-button'
                                                                        onClick={() => this.copyCreds(data[creds])}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </p>
                                                    )}
                                            </div>
                                        )

                                        : null}
                                </div>
                            );
                        }

                        return <Button type="primary" icon="download" onClick={() => this.downloadConfigFile(info)}>Download</Button>;
                    }
                },

            },

        ];
        return (
            <>
                {
                    (activeLab && activeLab.activeCourse) && lab && !loading
                        ? (
                            <Spin spinning={checking}>
                                <div className="labs-table-content">
                                    <div className='labs-table-content-heading'>
                                        <Title level={4}>{lab.name}</Title>

                                        <div className='labs-table-content-heading-info'>
                                            {(user.roles.indexOf('administrator') !== -1 || isAuthor) && (
                                                <div style={{ marginRight: '50px' }}>
                                                    <Button
                                                        className="reset-automated-checking"
                                                        onClick={() => this.resetAutomatedChecking(activeLab.id)}
                                                        type="primary"
                                                    >
                                                        Reset Automated Checking
                                                    </Button>
                                                    <NavLink to={`/platform/admin/edit-lab-steps/${labId}/${course_id}`}>
                                                        <Button shape='circle' icon='edit' />
                                                    </NavLink>
                                                </div>
                                            )}
                                            <div style={{ margin: '5px 15px' }}>
                                                <ButtonGroup>
                                                    <Button size='small' onClick={this.prev} icon='left' disabled={this.state.currentStep < 1} />
                                                    <Button size='small' onClick={this.next} icon='right' disabled={this.state.currentStep >= lab.step.length - 1} />
                                                </ButtonGroup>
                                            </div>
                                            {!activeLab.activeCourse.finished && (
                                                <div>
                                                    <Text className='labs-table-content-heading-level'>
                                                        Level:
                                                        {activeLab.activeCourse.user_level}
                                                    </Text>
                                                    <br />
                                                    {activeLab.activeCourse.user_level !== 'Medior' && (
                                                        <>
                                                            <Text className='labs-table-content-heading-hints'>
                                                                <span>
                                                                    Hints remaining =
                                                                    {remainingHints}
                                                                </span>
                                                            </Text>
                                                            <br />
                                                        </>
                                                    )}
                                                    {
                                                        this.hideProgressBar(lastJob) ? ''
                                                            : (
                                                                <Countdown
                                                                    className='labs-table-content-heading-timer'
                                                                    title='Time Remaining'
                                                                    value={deadline}
                                                                    onFinish={this.onFinish}
                                                                />
                                                            )
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <Paragraph>{lab.description}</Paragraph>
                                    {!activeLab.activeCourse.finished && (
                                        <Row className="panel-row">
                                            <Col span={24}>
                                                {
                                                    lastJob && lastJob.status === 'ERROR'
                                                        ? (
                                                            <div className="error-lab">
                                                                <div className="message">
                                                                    <h2>Lab creation/deletion failed, please try again.</h2>
                                                                </div>
                                                                <Button type='danger' loading={loadingDestroyLab} onClick={this.destroyLab}>
                                                                    Destroy Lab
                                                                </Button>
                                                            </div>
                                                        )
                                                        : this.hideProgressBar(lastJob)
                                                            ? (
                                                                <div className="progress-bar-container">
                                                                    <Progress
                                                                        percent={lastJob.progress}
                                                                        strokeWidth={12}
                                                                        status="active"
                                                                        strokeColor={{
                                                                            from: '#5396d1',
                                                                            to: '#5bc8ab',
                                                                        }}
                                                                    />
                                                                    <p>{loadingMessage}</p>
                                                                </div>
                                                            )
                                                            : (
                                                                <Collapse
                                                                    onChange={this.collapseChanged}
                                                                    defaultActiveKey={['1']}
                                                                    expandIcon={({ isActive }) => <Icon type='caret-right' rotate={isActive ? 90 : 0} />}
                                                                >
                                                                    <Panel className="panel" header="Labs" disabled={false} key='1'>
                                                                        <Row>
                                                                            <Col span={18}>
                                                                                {
                                                                                    !resources.length
                                                                                        ? <div style={{ marginLeft: '10px', marginTop: '12px', color: '#ff4d4f' }}>Something went wrong </div>
                                                                                        : <Table className="labs-table" rowKey={item => item.id} loading={tableLoading} columns={columns} dataSource={resources} pagination={false} />
                                                                                }

                                                                            </Col>
                                                                            <Col span={6}>
                                                                                <div className="labs-table-footer">
                                                                                    <Button icon='delete' disabled={showDone} type='danger' loading={loadingDestroyLab} onClick={this.destroyLab}>
                                                                                        Destroy Lab
                                                                                    </Button>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </Panel>
                                                                </Collapse>
                                                            )
                                                }

                                            </Col>
                                        </Row>
                                    )}
                                    <LabSteps
                                        chapters={lab.step}
                                        steps_images={this.props.steps_images}
                                        currentStep={this.state.currentStep}
                                        next={this.next}
                                        prev={this.prev}
                                        selectStep={this.selectStep}
                                        done={this.done}
                                        showDone={activeLab.lab.automated_checking && !activeLab.activeCourse.finished && activeLab.progress === 'Pending' ? false : showDone}
                                        hint_is_open={activeLab.hint_is_open}
                                        updateOpenHints={this.props.updateOpenHints}
                                        getHintMessage={this.props.getHintMessage}
                                        active_lab_id={active_lab_id}
                                        getRemainingHintsCount={() => this.props.getRemainingHintsCount(activeLab.id)}
                                        user_level={activeLab.activeCourse.user_level}
                                        uploadFile={this.props.uploadFile}
                                        uploadLabImage={this.props.uploadLabImage}
                                        lab_id={this.props.match.params.id}
                                        getLabImage={this.props.getLabImage}
                                        deleteLabImage={this.props.deleteLabImage}
                                        finished={activeLab.activeCourse.finished}
                                        stages={stages}
                                        completed_steps={stepStatus.completed}
                                    />
                                </div>
                            </Spin>
                        )
                        : loading
                            ? <Loading />
                            : <Empty />
                }
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        labs: state.labs,
        courses: state.courses,
        auth: state.auth,
        steps_images: state.stepsImages.images,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchLabs: type => dispatch(fetchLabs(type)),
        destroyLab: data => dispatch(destroyLab(data)),
        getActiveLab: activeLabId => dispatch(getActiveLab(activeLabId)),
        getJobProgress: activeLabId => dispatch(getJobProgress(activeLabId)),
        saveCurrentLabStep: (id, labId, step) => dispatch(saveCurrentLabStep(id, labId, step)),
        updateActiveLabStatus: id => dispatch(updateActiveLabStatus(id)),
        updateOpenHints: (id, data) => dispatch(updateOpenHints(id, data)),
        getRemainingHintsCount: id => dispatch(getRemainingHintsCount(id)),
        getHintMessage: id => dispatch(getHintMessage(id)),
        uploadFile: (file, folder) => dispatch(uploadFile(file, folder)),
        fetchStepsImages: courseId => dispatch(fetchStepsImages(courseId)),
        uploadLabImage: data => dispatch(uploadLabImage(data)),
        getLabImage: imageToken => dispatch(getLabImage(imageToken)),
        deleteLabImage: imageToken => dispatch(deleteLabImage(imageToken)),
        getActiveCourse: activeCourseId => dispatch(getActiveCourse(activeCourseId)),
        getAuthUser: () => dispatch(getAuthUser()),
        checkLabStatus: activeLabId => dispatch(checkLabStatus(activeLabId)),
        checkResourceURLStatus: urls => dispatch(checkResourceURLStatus(urls)),
        saveStepProgress: data => dispatch(saveStepProgress(data)),
        addLabTime: (id, time) => dispatch(addLabTime(id, time)),
        requestLabTime: activeLabId => dispatch(requestLabTime(activeLabId)),
        resetChecker: activeLabId => dispatch(resetChecker(activeLabId)),
    };
}
export { Lab };
export default connect(mapStateToProps, mapDispatchToProps)(Lab);
