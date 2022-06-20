import React, { Component } from 'react';
import ReactGA from 'react-ga';
import moment from 'moment';
import {
    message, Button, Col, Card, Row, Tooltip, Progress, Icon, Select, Modal, notification,
} from 'antd';
import { CATEGORIES, ACTIONS } from '../../util/GAEventConstants';
import './theory-and-lab.scss';
import Loading from '../../components/Loading/Loading';
import { SUPPORT_HOURS, COURSE_TYPE, COURSE_STATUSES } from '../../constants';
import { isInsideSupportHours } from '../../util/validators';

const { Option } = Select;
const confirmModal = Modal.confirm;

class TheoryAndLab extends Component {
    constructor(props) {
        super(props);

        this.loader = null;
        this.progressInterval = null;
        this.state = {
            loadingCreateLab: false,
            show: false,
            isMobile: false,
            mobileWarnShow: true,
            selectedLab: 0,
            userLevel: 'Advanced',
            loadingCourse: true,
            progressLab: 0,
        };
    }

    getRelevantJob = activeLab => {
        let lastJob = null;
        if (activeLab && activeLab.jobs.length > 0) {
            const { jobs } = activeLab;
            if (jobs[jobs.length - 2]) {
                if (jobs[jobs.length - 2].status === 'CREATING' || (jobs[jobs.length - 2].status === 'CREATED' && jobs[jobs.length - 1].progress === 0)) {
                    lastJob = jobs[jobs.length - 2];
                } else {
                    lastJob = jobs[jobs.length - 1];
                }
            } else {
                lastJob = jobs[jobs.length - 1];
            }
        }
        return lastJob;
    }

    componentDidMount() {
        const loader = message.loading('Loading..', 0);
        const {
            match: { params: { id } },
            getActiveCourse,
        } = this.props;
        ReactGA.pageview(window.location.pathname);
        getActiveCourse(id).then(res => {
            loader();

            if (res) {
                const { activeLabs } = this.props.activeCourse;
                const activeLab = this.returnActiveLab(activeLabs);
                if (!activeLab) {
                    return this.setState({
                        progressLab: this.returnProgress(activeLabs),
                        loadingCourse: false,
                    });
                }
                const filtered = activeLabs.filter(activelab => activelab.status === 1);
                const activeLabIndex = filtered.findIndex(item => item.progress === 'Pending');
                this.setState({ selectedLab: activeLabIndex >= 0 ? activeLabIndex : filtered.length ? filtered.length - 1 : 0 });
                const job = this.getRelevantJob(activeLab);

                if (this.progressInterval === null && job && parseInt(job.progress) !== 100) {
                    this.__setInterval(() => this.handleRelevantJob(activeLab.id), 2000);
                }
            }

            this.setState({
                loadingCourse: false,
            });
        });

        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    }

    componentWillUnmount() {
        clearInterval(this.progressInterval);
    }

    handleRelevantJob(activeLabId) {
        const {
            getJobProgress,
            getActiveCourse,
            getAuthUser,
            activeCourse: { activeLabs },
            match: { params: { id } },
        } = this.props;
        return getJobProgress(activeLabId).then(res => {
            if (res !== false) {
                const lastJob = this.getRelevantJob(res);
                this.setState({
                    progressLab: lastJob.progress,
                });

                if (lastJob.status === 'ERROR') {
                    message.error('Lab creation/deletion failed, please try again.');
                    clearInterval(this.progressInterval);
                    this.progressInterval = null;
                    this.setState({
                        progressLab: 0,
                    });
                } else if (parseInt(lastJob.progress) === 100) {
                    if (lastJob.status === 'CREATED') {
                        message.success('Lab created.');
                        this.setState({
                            progressLab: this.returnProgress(activeLabs),
                        });
                    } else if (lastJob.status === 'DESTROYED') {
                        message.success('Lab deleted.');
                        this.setState({
                            progressLab: this.returnProgress(activeLabs),
                        });
                    }
                    clearInterval(this.progressInterval);
                    this.progressInterval = null;
                    getActiveCourse(id);
                    getAuthUser();
                }
            }
        });
    }

    checkMobile = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth < 992) {
            this.setState({
                isMobile: true,
            });
        } else {
            this.setState({
                isMobile: false,
            });
        }
    }

    goTheory = () => {
        const { course } = this.props.activeCourse;
        const { auth: { user }, history } = this.props;

        if (user.certificate_name === null || user.certificate_name === '') {
            notification.open({
                message: 'Warning!',
                description:
                    'You have not yet specified how your name should appear on your DevSecOps Academy certificate. Please edit your profile first.',
                duration: 5,
                btn: <Button type="primary" size="default" onClick={() => history.push('/platform/edit-profile', true)}>
                    Specify Certificate Name
                </Button>,
            });
            return false;
        }
        history.push(`/platform/course-chapters/${course.id}`);
    }

    confirmModalCreateLab = () => {
        const {
            activeCourse, createLab, getAuthUser, getActiveCourse, history,
        } = this.props;
        const { course } = activeCourse;
        const { selectedLab, userLevel } = this.state;

        // FOR TESTING ONLY
        const testingMode = false;
        const available_time = course.labs[selectedLab] ? course.labs[selectedLab].available_time
            : this.returnChosenLab().available_time ? this.returnChosenLab().available_time : '';

        const insideSupportHours = isInsideSupportHours();
        confirmModal({
            title: `Are you sure you want to create this lab now? Be aware that you have 1 attempt to do this course.
                    After ${available_time.slice(0, -1)} minutes the lab will be destroyed.`,
            content: !insideSupportHours ? SUPPORT_HOURS : course.content,
            okText: 'Create',
            okType: 'success',
            cancelText: 'Cancel',
            onOk: () => {
                if (activeCourse) {
                    ReactGA.event({
                        category: CATEGORIES.HANDS_ON_LAB,
                        action: ACTIONS.HANDS_ON_LAB_STARTED_FOR_COURSE_FROM_ACTIVE_COURSE(activeCourse.course.title),
                        label: 'Hands-on Lab Page',
                    });
                }
                this.setState({
                    loadingCreateLab: true,
                });
                createLab({
                    active_course_id: activeCourse.id,
                    lab_id: course.labs[selectedLab] ? course.labs[selectedLab].id : this.returnChosenLab().id ? this.returnChosenLab().id : '',
                    testing_mode: testingMode,
                    user_level: course.userLevel || userLevel,
                }).then(res => {
                    getAuthUser();
                    if (res.active_lab_id) {
                        getActiveCourse(activeCourse.id);
                        history.push(`/platform/lab/${res.active_lab_id}`);
                    } else {
                        message.error(res.message);
                    }
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    continueLab = () => {
        const { activeCourse, history, auth: { user } } = this.props;
        const { activeLabs } = activeCourse;
        const activeLab = this.returnActiveLab(activeLabs);

        if (user.certificate_name === null || user.certificate_name === '') {
            notification.open({
                message: 'Warning!',
                description:
                    'You have not yet specified how your name should appear on your DevSecOps Academy certificate. Please edit your profile first.',
                duration: 5,
                btn: <Button type="primary" size="default" onClick={() => history.push('/platform/edit-profile', true)}>
                    Specify Certificate Name
                </Button>,
            });
            return false;
        }
        if (activeLab) {
            history.push(`/platform/lab/${activeLab.id}`);
        } else if (activeCourse.course.labs[this.state.selectedLab]) {
            const aLabId = this.returnActiveLabFromLab(this.state.selectedLab).id;
            history.push(`/platform/lab/${aLabId}`);
        }
    }

    createLab = () => {
        const { activeCourse, auth: { user } } = this.props;
        const { course, activeLabs } = activeCourse;

        const activeLab = this.returnActiveLab(activeLabs);
        if (activeLab) {
            if (course.authors.findIndex(item => item.id === user.id) === -1) {
                if (activeLab.lab_end_at && moment().isAfter(moment.unix(activeLab.lab_end_at))) {
                    message.error('The available time for the lab has run out!');
                } else {
                    this.confirmModalCreateLab();
                }
            } else {
                this.confirmModalCreateLab();
            }
        } else {
            this.confirmModalCreateLab();
        }
    }

    selectLab = key => {
        this.setState({
            selectedLab: key,
            progressLab: this.returnProgress(null, this.returnActiveLabIdFromLab(key)),
        });
    }

    returnActiveLab = activeLabs => {
        if (activeLabs) {
            let activeLab;
            const filtered = activeLabs.filter(activelab => activelab.status === 1);
            activeLab = filtered.length ? filtered[this.state.selectedLab] || filtered[filtered.length - 1] : null;
            if (activeLab) {
                if (activeLab.jobs && activeLab.jobs.length && activeLab.jobs[activeLab.jobs.length - 1].status === 'DESTROYED') {
                    return null;
                }

                return activeLab;
            }
            return null;
        }
        return null;
    }

    returnChosenLab = () => {
        if (this.props.activeCourse.activeLabs.length !== 0 && this.returnActiveLab(this.props.activeCourse.activeLabs)) {
            const active_id = this.returnActiveLab(this.props.activeCourse.activeLabs).lab.id;
            const lab = this.props.activeCourse.course.labs.find(lab => lab.id === active_id);
            return lab;
        }
        return false;
    }

    returnActiveLabIdFromLab = labKey => {
        if (this.props.activeCourse.course.labs.length <= 0) {
            return -1;
        }

        const labId = this.props.activeCourse.course.labs[labKey].id;
        const activeLab = this.props.activeCourse.activeLabs.find(activeLab => activeLab.lab.id === labId);
        if (activeLab) {
            return Object.keys(this.props.activeCourse.activeLabs).find(key => this.props.activeCourse.activeLabs[key] === activeLab);
        }
        return -1;
    }

    returnActiveLabFromLab = labKey => {
        if (this.props.activeCourse.course.labs.length <= 0) {
            return null;
        }
        const labId = this.props.activeCourse.course.labs[labKey].id;
        return this.props.activeCourse.activeLabs.find(activeLab => activeLab.lab.id === labId);
    }

    selectUserLevel = level => {
        this.setState({
            userLevel: level,
        });
    }

    returnProgress = (activeLabs, id) => {
        let activeLab = null;
        if (parseInt(id) === -1) {
            return 0;
        }
        if (id) {
            activeLab = this.props.activeCourse.activeLabs[id];
        } else {
            activeLab = this.returnActiveLab(activeLabs);
        }

        if (!activeLab) {
            if (activeLabs.length > 0) {
                if (this.returnActiveLabIdFromLab(this.state.selectedLab)) {
                    activeLab = activeLabs[this.returnActiveLabIdFromLab(this.state.selectedLab)];
                } else {
                    activeLab = activeLabs[0];
                }
            } else {
                activeLab = null;
            }
        }
        if (activeLab && activeLab.lab.step && activeLab.lab.step.length) {
            const jsonCompleted = (JSON.parse(activeLab.completed_failed_steps) && JSON.parse(activeLab.completed_failed_steps).completed)
                ? JSON.parse(activeLab.completed_failed_steps).completed
                : [];

            const steps = activeLab.lab.step;
            let statesCount = 0;
            let progressLength = 0;
            steps.forEach(step => {
                if (step.states && step.states.length > 0) {
                    if (jsonCompleted.indexOf(step.order_number - 1) !== -1) {
                        step.states.forEach(state => {
                            statesCount++;
                        });
                    }
                    progressLength += step.states.length;
                }
            });
            if (!statesCount) {
                return 0;
            }
            return Math.floor((statesCount / progressLength) * 100);
        }
        return 0;
    }

    getButtonStatus = (activeCourse, theoryProgress) => {
        if (activeCourse.course.certificates.length || theoryProgress === 100) {
            return 'Revisit';
        }
        if (activeCourse.course.theory) {
            if (activeCourse.currentStep) {
                return 'Continue';
            }
            return 'Start';
        }
        return 'Missing Theory';
    }

    __setInterval(fn, interval) {
        clearInterval(this.progressInterval);

        this.progressInterval = setInterval(fn, interval);
    }

    returnLabForDropDown(course, selectedLab) {
        if (this.returnActiveLabFromLab(selectedLab) && this.returnActiveLabFromLab(selectedLab).progress === 'Completed') {
            return (
                <>
                    {course.labs[selectedLab].name}
                    {' '}
                    <Icon type="check-circle" />
                    {' '}
                    (completed)
                </>
            );
        }
        return course.labs[selectedLab].name;
    }

    isStartButtonDisabled() {
        const {
            activeCourse: {
                course,
            },
            auth: {
                user,
            },
        } = this.props;
        const author = course.authors.find(a => a.id === user.id);
        if (author) {
            return false;
        }
        if (course.status === COURSE_STATUSES.PRODUCTION) {
            return false;
        }
        if (!user.roles.includes('administrator') && course.status === COURSE_STATUSES.DEVELOPMENT) {
            return true;
        }
        if (!course.theory) {
            return true;
        }
        return false;
    }

    render() {
        const { activeCourse } = this.props;
        const { course, activeLabs } = activeCourse;
        const {
            selectedLab, userLevel, loadingCourse, progressLab,
        } = this.state;

        if (loadingCourse) {
            return <Loading />;
        }
        if (!activeCourse.id) {
            return (<div><h3>Course not found</h3></div>);
        }

        const activeLab = this.returnActiveLab(activeLabs);
        const { user } = this.props.auth;
        const progress = progressLab;
        const lastJob = this.getRelevantJob(activeLab);

        if (this.state.isMobile && this.state.mobileWarnShow && this.state.show) {
            message.warn('Hands-on lab only works on a Laptop/PC.');
            this.setState({
                mobileWarnShow: false,
            });
        }

        let theoryProgress = 0;

        if (course && course.theory && activeCourse.currentStep && course.information && course.information.steps) {
            theoryProgress = Math.floor((activeCourse.currentStep.theory_step + 1) * 100 / course.information.steps);

            if (theoryProgress === 100
                && (
                    (!course.certificates.length
                        && course.type !== COURSE_TYPE.INTRODUCTION) // if the course is not intro and certificate is not issued yet
                    || !course.userAnswer // if the quiz is not attempted
                    || (course.userAnswer && course.userAnswer.failed_questions.length !== 0) // if the quiz is attempted but some questions are failed
                )
            ) {
                theoryProgress = 99;
            }
            if (course.certificates.length) {
                theoryProgress = 100;
            }
        }

        const remainingTime = (activeLab && activeLab.lab_end_at) ? Math.round((activeLab.lab_end_at - moment().unix()) / 60) : (course && course.labs.length) ? +course.labs[0].available_time.replace('m', '') : 0;
        let difficulty = null;
        let difficultyIcon = '/img/easy.svg';

        if (course && course.difficulty <= 2) {
            difficulty = 'Easy';
        } else if (course && course.difficulty > 2 && course.difficulty <= 4) {
            difficulty = 'Medium';
            difficultyIcon = '/img/medium.svg';
        } else if (course && course.difficulty > 4) {
            difficulty = 'Hard';
            difficultyIcon = '/img/hard.svg';
        }

        const labButton = (
            <Button
                type="primary"
                shape="round"
                className={`startButton${this.state.isMobile ? 'with-warning' : ''}`}
                disabled
                onClick={this.createLab}
            >
                Start
            </Button>
        );

        return (
            <div className="theoryLabRootContainer">
                <div className="courseDescription">
                    <h1>{course.title}</h1>
                    <p>{course.content}</p>
                </div>
                <Row type="flex" className="theoryLabRow">
                    <Col className="theoryCol">
                        <Card
                            key="theory"
                            hoverable
                            className="theoryCard"
                        >
                            <div className="cartContainer">
                                <Tooltip title="Theory lab time">
                                    <div className="timeContainer">
                                        <div className="timer">
                                            <img src="/img/timerIcon.svg" alt="timerIcon" />
                                            <span className="minutes">{course.theory_duration}</span>
                                        </div>
                                    </div>
                                </Tooltip>
                                <div className="typeContainer">
                                    <h1 className="courseTypeTitle">{course.theory_title ? course.theory_title : 'Preparation not found'}</h1>
                                </div>
                                <div className="descriptionContainer">
                                    <p>
                                        {course.theory_description ? course.theory_description : 'Preparation description not found'}
                                    </p>
                                </div>
                                <div className="imgContainer">
                                    <img
                                        src="/img/theoryImage.png"
                                        title="theoryImage"
                                        alt="theoryImage"
                                    />
                                </div>
                                <div className="progressBarContainer">
                                    <Tooltip>
                                        <Progress
                                            percent={theoryProgress}
                                            strokeWidth={24}
                                            strokeColor='#D3D3D3'
                                        />
                                    </Tooltip>
                                </div>
                                <div className="buttonsContainer">
                                    <div>
                                        <Button
                                            type="primary"
                                            shape="round"
                                            className="startButton"
                                            onClick={this.goTheory}
                                            disabled={this.isStartButtonDisabled()}
                                        >
                                            {this.getButtonStatus(activeCourse, theoryProgress)}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col className="practicalCol">
                        <Card
                            key="lab"
                            hoverable
                            className="practicalCard"
                        >
                            <div className="cartContainer">
                                <Tooltip title="Hands on lab time">
                                    <div className="timeContainer">
                                        <div className="timer practicalIcon">
                                            <img src="/img/timerIcon.svg" alt="timerIcon" />
                                            <span className="minutes">
                                                {remainingTime > 0 ? remainingTime : 0}
                                                m
                                            </span>
                                        </div>
                                        <div className="type practicalIcon">
                                            <img
                                                alt="lineIcon"
                                                src={difficultyIcon}
                                                className="practicalIcon"
                                            />
                                            <span className="difficulty-level">{difficulty}</span>
                                        </div>
                                    </div>
                                </Tooltip>
                                <div className="labContainer">
                                    <h1 className="courseTypeTitle">{this.returnChosenLab() ? this.returnChosenLab().hands_on_title : course.labs[selectedLab] ? course.labs[selectedLab].hands_on_title : 'No Lab'}</h1>
                                </div>
                                <div className="selectLab">
                                    {
                                        course.labs.length
                                            ? (
                                                <Select
                                                    key={this.returnLabForDropDown(course, selectedLab)}
                                                    defaultValue={this.returnLabForDropDown(course, selectedLab)}
                                                    style={{ width: '100%' }}
                                                    onChange={this.selectLab}
                                                    disabled={(activeLab && (activeLab.status !== 1 || activeLab.progress === 'Pending'))}
                                                >
                                                    {
                                                        course.labs.map((item, key) => (
                                                            this.returnActiveLabFromLab(key) && this.returnActiveLabFromLab(key).progress === 'Completed'
                                                                ? (
                                                                    <Option key={key} value={key}>
                                                                        {item.name}
                                                                        {' '}
                                                                        <Icon type="check-circle" />
                                                                        {' '}
                                                                        (completed)
                                                                    </Option>
                                                                )
                                                                : <Option key={key} value={key}>{item.name}</Option>
                                                        ))
                                                    }
                                                </Select>
                                            )
                                            : <h3>Labs not found</h3>
                                    }
                                </div>
                                <div className="selectSeniority">
                                    <Tooltip title="Advanced means you can take a maximum number of hints. The level will show on your certificate">
                                        <Select className="selectSeniority-select" value={userLevel} onChange={this.selectUserLevel} disabled={(activeLab && activeLab.progress !== 1) || !!(activeCourse.finished)}>
                                            <Option key={1} value="Medior">Medior (free use of hints)</Option>
                                            <Option key={2} value="Advanced">
                                                Advanced (max
                                                {activeLab ? activeLab.max_hint_count : course.labs[selectedLab] ? course.labs[selectedLab].max_hint_count : 'No'}
                                                {' '}
                                                hints)
                                            </Option>
                                        </Select>
                                    </Tooltip>
                                </div>
                                <div className="descriptionContainer">
                                    <p>
                                        {this.returnChosenLab() ? this.returnChosenLab().hands_on_desc : course.labs[selectedLab] ? course.labs[selectedLab].hands_on_desc : 'No Lab'}
                                    </p>
                                </div>
                                <div className="imgContainer">
                                    <img
                                        src="/img/practicImage.png"
                                        title="practicImage"
                                        alt="practicImage"
                                    />
                                </div>
                                <div className="progressBarContainer">
                                    <Tooltip>
                                        {
                                            activeCourse.finished
                                                ? (
                                                    <Progress
                                                        percent={100}
                                                        strokeWidth={24}
                                                        status="success"
                                                        strokeColor='#D3D3D3'
                                                    />
                                                )
                                                : lastJob && lastJob.status === 'CREATING'
                                                    ? (
                                                        <Progress
                                                            percent={progress}
                                                            strokeWidth={24}
                                                            status="active"
                                                            strokeColor='#D3D3D3'
                                                        />
                                                    )
                                                    : lastJob && lastJob.status !== 'DESTROYING' && activeLab.lab.step
                                                        ? (
                                                            <Progress
                                                                percent={progress}
                                                                strokeColor="#D3D3D3"
                                                                status="normal"
                                                                strokeWidth={24}
                                                            />
                                                        )
                                                        : lastJob
                                                            ? (
                                                                <Progress
                                                                    percent={progress}
                                                                    strokeColor="red"
                                                                    status="active"
                                                                    strokeWidth={24}
                                                                />
                                                            )
                                                            : (
                                                                <Progress
                                                                    percent={progress}
                                                                    strokeColor="#D3D3D3"
                                                                    status="normal"
                                                                    strokeWidth={24}
                                                                />
                                                            )
                                        }

                                    </Tooltip>
                                </div>
                                <div className="buttonsContainer">
                                    <div>
                                        { course.status !== COURSE_STATUSES.PRODUCTION && !user.roles.includes('administrator') && !user.roles.includes('author')
                                            ? (
                                                <div className="button-with-warning">
                                                    <Tooltip
                                                        placement="bottom"
                                                        title="Sorry, but course is in development stage"
                                                        className="disabled-startButton-tooltip"
                                                    >
                                                        <div>
                                                            {labButton}
                                                        </div>
                                                    </Tooltip>
                                                </div>
                                            )
                                            : activeCourse && !activeCourse.finished && (!this.returnActiveLabFromLab(selectedLab)
                                                || (this.returnActiveLabFromLab(selectedLab).progress === 'Pending' && this.returnActiveLabFromLab(selectedLab).status === 0))
                                            && (theoryProgress >= 99 || course.authors.findIndex(item => item.id === user.id) !== -1)
                                                ? (
                                                    <div className="button-with-warning">
                                                        <Button
                                                            type="primary"
                                                            shape="round"
                                                            className={`startButton ${this.state.isMobile ? 'with-warning' : ''}`}
                                                            disabled={this.state.isMobile || !course.labs.length}
                                                            onClick={this.createLab}
                                                        >
                                                            Start
                                                        </Button>
                                                        {
                                                            this.state.isMobile
                                                                ? <span className="warning">Hands-on lab only works on a Laptop/PC.</span> : ''
                                                        }
                                                        {
                                                            !course.labs.length
                                                                ? <span className="warning">Labs not found</span> : ''
                                                        }

                                                    </div>
                                                )
                                                : (activeLab && activeLab.progress === 'Completed') || (activeCourse && activeCourse.finished)
                                                    ? (
                                                        <Button type="primary" shape="round" className='completedButton' onClick={this.continueLab}>
                                                            Revisit
                                                        </Button>
                                                    )
                                                    : lastJob && lastJob.status !== 'DESTROYED'
                                                        ? (lastJob.status === 'DESTROYING' || lastJob.status === 'SCHEDULED')
                                                            ? (
                                                                <Button
                                                                    type="primary"
                                                                    shape="round"
                                                                    className="startButton"
                                                                    disabled={lastJob.status === 'DESTROYING' || lastJob.status === 'SCHEDULED'}
                                                                >
                                                                    Destroy in progress
                                                                    {' '}
                                                                    <Icon type="loading" style={{ fontSize: 11 }} spin />
                                                                </Button>
                                                            )
                                                            : (course.authors.findIndex(item => item.id === user.id) !== -1 && (activeLab && activeLab.progress === 'Done'))
                                                                ? (
                                                                    <div className="button-with-warning">
                                                                        <Button
                                                                            type="primary"
                                                                            shape="round"
                                                                            className={`startButton ${this.state.isMobile ? 'with-warning' : ''}`}
                                                                            disabled={this.state.isMobile}
                                                                            onClick={this.continueLab}
                                                                        >
                                                                            Revisit
                                                                            {' '}
                                                                            {
                                                                                lastJob.status === 'CREATING'
                                                                                    ? <Icon type="loading" style={{ fontSize: 11 }} spin />
                                                                                    : ''
                                                                            }
                                                                        </Button>
                                                                    </div>
                                                                )
                                                                : (
                                                                    <div className="button-with-warning">

                                                                        {

                                                                            (activeLab && activeLab.progress === 'Done') && !this.returnChosenLab().automated_checking
                                                                                ? (
                                                                                    <Button
                                                                                        type="primary"
                                                                                        shape="round"
                                                                                        className={`startButton ${this.state.isMobile ? 'with-warning' : ''}`}
                                                                                        onClick={this.continueLab}
                                                                                        style={{ background: '#ff7875', color: '#fff' }}
                                                                                    >
                                                                                        Review in progress
                                                                                    </Button>
                                                                                )
                                                                                : (
                                                                                    <Button
                                                                                        type="primary"
                                                                                        shape="round"
                                                                                        className={`startButton ${this.state.isMobile ? 'with-warning' : ''}`}
                                                                                        disabled={this.state.isMobile}
                                                                                        onClick={this.continueLab}
                                                                                    >
                                                                                        Continue
                                                                                        {' '}
                                                                                        {
                                                                                            lastJob.status === 'CREATING'
                                                                                                ? <Icon type="loading" style={{ fontSize: 11 }} spin />
                                                                                                : ''
                                                                                        }
                                                                                    </Button>
                                                                                )

                                                                        }
                                                                        {
                                                                            this.state.isMobile
                                                                                ? <span className="warning">Hands-on lab only works on a Laptop/PC.</span> : ''
                                                                        }
                                                                    </div>
                                                                )
                                                        : theoryProgress >= 99 || course.authors.findIndex(item => item.id === user.id) !== -1
                                                            ? (
                                                                <div className="button-with-warning">
                                                                    <Button
                                                                        type="primary"
                                                                        shape="round"
                                                                        className={`startButton ${this.state.isMobile ? 'with-warning' : ''}`}
                                                                        disabled={this.state.isMobile || !course.labs.length}
                                                                        onClick={this.createLab}
                                                                    >
                                                                        Start
                                                                    </Button>
                                                                    {
                                                                        this.state.isMobile
                                                                            ? <span className="warning">Hands-on lab only works on a Laptop/PC.</span> : ''
                                                                    }
                                                                    {
                                                                        !course.labs.length
                                                                            ? <span className="warning">Labs not found</span> : ''
                                                                    }

                                                                </div>
                                                            )
                                                            : (
                                                                <Tooltip placement="bottom" title="Please complete the Preparation Lab before starting the hands-on lab">
                                                                    <div>
                                                                        <Button type="primary" shape="round" className={`startButton ${this.state.isMobile ? 'with-warning' : ''}`} disabled>
                                                                            Prepare first
                                                                        </Button>
                                                                    </div>
                                                                </Tooltip>
                                                            )}
                                    </div>
                                </div>
                            </div>
                        </Card>

                    </Col>
                </Row>

            </div>
        );
    }
}

export default TheoryAndLab;
