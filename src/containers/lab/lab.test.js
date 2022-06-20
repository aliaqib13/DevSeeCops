import React from 'react';
import { shallow } from 'enzyme';
import { message, notification } from 'antd';
import ReactGA from 'react-ga';
import { Lab } from './lab';
import { CATEGORIES, ACTIONS } from '../../util/GAEventConstants';

jest.mock('antd', () => {
    const antd = jest.requireActual('antd');
    const notificationANTD = {
        ...antd.notification,
        info: jest.fn(),
    };
    const messageANTD = {
        ...antd.message,
        error: jest.fn(),
        success: jest.fn(),
    };
    return {
        ...antd,
        notification: notificationANTD,
        message: messageANTD,
    };
});

const labs = {
    activeLab: {
        activeCourse: {
            course: {
                title: 'Secrets Management for your applications',
                authors: [{
                    id: 3,
                    pivot: {
                        course_id: 1,
                        user_id: 3,
                    },
                }],
            },
            course_id: 1,
            created_at: '2020-09-07 11:18:53',
            finished: 0,
            id: 59,
            theory_progress: null,
            updated_at: '2020-09-07 11:18:57',
            user_id: 3,
            user_level: 'Medior',
        },
        currentStep: {
            id: 1,
            user_id: 8,
            course_id: null,
            lab_id: 1,
            theory_step: null,
            lab_step: 6,
        },
        jobs: [
            {
                active_lab_id: 21,
                automated: 0,
                created_at: '2020-09-07 13:12:21',
                debug_info: null,
                id: 39,
                job_number: null,
                job_resources: null,
                progress: 0,
                scheduled_deletion_time: null,
                status: 'CREATING',
                updated_at: '2020-09-07 13:12:21',
                user_id: 3,
            },
            {
                active_lab_id: 21,
                automated: 0,
                created_at: '2020-09-07 13:12:21',
                debug_info: null,
                id: 40,
                job_number: null,
                job_resources: null,
                progress: 0,
                scheduled_deletion_time: null,
                status: 'CREATING',
                updated_at: '2020-09-07 13:12:21',
                user_id: 3,
            },
        ],
        lab: {
            automated_checking_lab_steps: true,
            application_language: null,
            course_id: 1,
            created_at: '2020-06-08 15:11:52',
            description: 'In this lab you will learn how to move hardcoded secrets in a Java SpringBoot application to Vault',
            hands_on_desc: 'This lab lets you choose a customized lab environment providing hands-on practices',
            hands_on_title: 'Hands on',
            id: 1,
            max_hint_count: 5,
            name: 'Secrets Management Java Application',
            platform: 'AWS',
            signature_author_id: null,
            slug: 'secrets-mgmt-java-aws',
            available_time: '3m',
            step: [
                {
                    content: [
                        {
                            title: 'Start here',
                            contentBlocks: [
                                {
                                    content: {
                                        text: ['We have prepared a Gitlab environment for you that…y going to the Project home and click on Web IDE.'],
                                        titles: [''],
                                        type: 'InformationBox',
                                    },
                                },
                                {
                                    content: {
                                        type: 'SingleText',
                                        text: 'After you run your pipeline for the first time the',
                                    },

                                },
                                {
                                    content: {
                                        text: ['Gitlab takes a few minutes to prepare, so it could…ashiCorp Vault and try to log-in and look around!'],
                                        titles: [''],
                                        type: 'HeartBox',
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    content: [
                        {
                            title: 'Start here',
                            contentBlocks: [
                                {
                                    content: {
                                        text: ['We have prepared a Gitlab environment for you that…y going to the Project home and click on Web IDE.'],
                                        titles: [''],
                                        type: 'InformationBox',
                                    },
                                },
                                {
                                    content: {
                                        type: 'SingleText',
                                        text: 'After you run your pipeline for the first time the',
                                    },

                                },
                                {
                                    content: {
                                        text: ['Gitlab takes a few minutes to prepare, so it could…ashiCorp Vault and try to log-in and look around!'],
                                        titles: [''],
                                        type: 'HeartBox',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],

        },
        lab_end_at: null,
        lab_id: 1,
        max_hint_count: 5,
        progress: 'Pending',
        resources: [{
            id: 1,
            name: 'Test',
            url: '',
            info: 'Test',
            creds: '{"username": "Test", "password": "test123"}',
            type: 'fetch',
        }],
        start_time: '2020-09-07T09:12:22.000Z',
        status: 1,
        stop_time: null,
        updated_at: '2020-09-07 13:12:21',
        user_id: 3,
        id: 21,
        completed_failed_steps: JSON.stringify({ completed: [0, 1], failed: [2] }),
        active_course_id: 59,
    },
    error: null,
    job_id: null,
    labData: null,
    loading: false,
    loadingActiveLab: false,
    loadingCreateLab: false,
    loadingDestroyLab: false,
    loadingGetChapters: false,
    progress: 0,
    remainingHints: 5,
    labs: [],
    resourceURLs: [{ id: 1, url: 'https://testtest.com' }],
};

const props = {
    labs,
    match: {
        params: {
            id: 1,
        },
    },
    auth: {
        user: {
            activated: 1,
            cc_info: null,
            certificate_name: 'Henry Tovmasyan',
            coordinator: null,
            created_at: '2020-06-08 15:11:52',
            customer_id: null,
            email: 'henry@araido.io',
            firstname: 'Henry',
            id: 3,
            is_fellow: 0,
            lastname: 'Tovmasyan',
            roles: ['administrator'],
        },
    },
    resetChecker: jest.fn(() => Promise.resolve(true)),
    progressIntervalCallback: jest.fn(),
    history: { push: jest.fn() },
    getActiveLab: jest.fn(() => Promise.resolve(true)),
    getAuthUser: jest.fn(),
    getRemainingHintsCount: jest.fn(() => Promise.resolve(true)),
    getJobProgress: jest.fn(() => Promise.resolve(labs.activeLab.jobs)),
    fetchStepsImages: jest.fn(() => {}),
    checkLabStatus: jest.fn(() => Promise.resolve(true)),
    checkResourceURLStatus: jest.fn(() => Promise.resolve(true)),
    saveStepProgress: jest.fn(() => Promise.resolve(true)),
    saveCurrentLabStep: jest.fn(() => Promise.resolve(true)),
    setProgressInterval: jest.fn(() => setInterval(props.progressIntervalCallback, 3000)),
};
const props1 = { ...props };
props1.labs.activeLab.resources[0].url = '[no-check]https://testNoCheck.com';
props1.labs.resourceURLs[0].url = props.labs.activeLab.resources[0].url;

jest.mock('react-ga');

describe('Lab', () => {
    let component;
    let withNoCheckComponent;
    beforeEach(() => {
        // Reset mocks:
        notification.info.mockClear();

        // Reset components
        withNoCheckComponent = shallow(<Lab {...props1} />);
        component = shallow(<Lab {...props} />);
    });

    it('should render lab component', () => {
        expect(component.exists()).toEqual(true);
    });

    it('should render header section for timer and user level ', () => {
        const labHeadingInfo = component.find('.labs-table-content-heading-info');
        expect(labHeadingInfo.exists()).toEqual(true);
    });

    it('should not to show the timer , if the the job not completed', () => {
        props.labs.activeLab.jobs[0].progress = 100;
        component.setProps(props);
        const labHeadingInfo = component.find('.labs-table-content-heading-info');
        const LabTimer = labHeadingInfo.find('Countdown');
        expect(LabTimer.exists()).toEqual(true);
        expect(LabTimer.props().title).toEqual('Time Remaining');
    });

    it('should show credentials', () => {
        const record = props.labs.activeLab.resources[0];
        const { id } = record;
        const { showing } = component.instance().state;
        showing[id] = true;
        component.instance().setState({ showing });
        const username = component.find('.panel');
        expect(username.props().children.props.children[0].props.children.props.rowKey(record)).toEqual(id);
    });

    it('should render lab component with no-check resource url', () => {
        const panel = withNoCheckComponent.find('.panel');
        const tableProps = panel.props().children.props.children[0].props.children.props;
        const urlData = tableProps.columns[1];
        const aTag = urlData.render('link', props.labs.activeLab.resources[0]);
        expect(aTag.props.href).toBe(props1.labs.resourceURLs[0].url.replace('[no-check]', '').trim());
    });

    it('should render lab component with resource url worth checking', () => {
        labs.activeLab.resources[0].url = 'https://testCheck.com';
        const newComponent = shallow(<Lab {...props} />);
        expect(newComponent.exists()).toEqual(true);
        labs.activeLab.resources[0].url = '';
    });

    it('should render lab component with resource url already checked', () => {
        labs.activeLab.resources[0].url = 'https://testCheck.com';
        labs.activeLab.resources[0].type = 'success';
        const newComponent = shallow(<Lab {...props} />);
        expect(newComponent.exists()).toEqual(true);
        labs.activeLab.resources[0].url = '';
        labs.activeLab.resources[0].type = 'fetch';
    });

    it('should go to previous or next step on button clicks', () => {
        window.scrollTo = jest.fn();
        const buttonGroup = component.find('ButtonGroup');
        const prevButton = buttonGroup.props().children[0];
        const nextButton = buttonGroup.props().children[1];
        component.setState({ currentStep: 2 });
        prevButton.props.onClick();
        expect(component.state().currentStep).toBe(1);
        nextButton.props.onClick();
        expect(component.state().currentStep).toBe(2);
        expect(prevButton.props.icon).toBe('left');
        expect(nextButton.props.icon).toBe('right');
    });

    it('should copy creds successfully', () => {
        const originalExecCommand = document.execCommand;
        document.execCommand = jest.fn();
        component.instance().copyCreds('Test');
        expect(document.execCommand).toHaveBeenCalledWith('copy');
        document.execCommand = originalExecCommand;
    });

    it('should handle creds successfully', () => {
        expect(component.instance().state.showing[1]).not.toBe(true);
        component.instance().handleCreds(1);
        expect(component.instance().state.showing[1]).toBe(true);
        component.instance().handleCreds(1);
        expect(component.instance().state.showing[1]).toBe(false);
    });

    it('Should set new props and thus call UNSAFE_componentWillReceiveProps to update the state', () => {
        const receiveProps = jest.spyOn(component.instance(), 'UNSAFE_componentWillReceiveProps');
        component.setProps({ labs });
        expect(receiveProps).toHaveBeenCalledTimes(1);
        expect(component.instance().props.labs).toBe(props.labs);
    });

    it('should check resource url status successfully', () => {
        const timerInterval = window.setInterval;
        window.setInterval = arg => arg();
        const checkResourceURLStatus = jest.spyOn(props, 'checkResourceURLStatus');
        component.instance().setIntervalForResourcesURLStatus();
        expect(checkResourceURLStatus).toHaveBeenCalledTimes(1);
        window.setInterval = timerInterval;
    });

    it('Shows a custom help_message for steps with states that have help messages.', () => {
        // Create a deep copy of the main props
        const testLabs = JSON.parse(JSON.stringify(labs));

        // make sure step 0 has a state assigned with a help_message
        const customHelpMessage = 'My Custom help_message';
        testLabs.activeLab.lab.step[0].states = [
            { title: 'incompleteState', help_message: customHelpMessage },
            { title: 'a second one', help_message: 'something else' }, // It also only shows the first failed stage
        ];

        // Create the component
        const testProps = { ...props, labs: testLabs };
        const testComponent = shallow(<Lab {...testProps} />);

        const instance = testComponent.instance();
        // Call checkNotification from the next step
        instance.checkNotification(1);

        // Check that the notification was shown with the custom message
        expect(notification.info).toBeCalledWith({
            message: 'Check again!',
            description: customHelpMessage,
            duration: 10,
        });
    });

    it('Shows a generic message when a step has incomplete stages with no help_message.', () => {
        // Create a deep copy of the main props
        const testLabs = JSON.parse(JSON.stringify(labs));

        // make sure step 0 has a state assigned,
        testLabs.activeLab.lab.step[0].states = [
            { title: 'incompleteState' },
        ];

        // Create the component
        const testProps = { ...props, labs: testLabs };
        const testComponent = shallow(<Lab {...testProps} />);

        const instance = testComponent.instance();
        // Call checkNotification from the next step
        instance.checkNotification(1);

        // Check that the notification was shown with the custom message
        expect(notification.info).toBeCalledWith({
            message: 'Check again!',
            description: 'Our automated checking indicates you may not have completed previous step correctly. We advise you to check again before continuing.',
            duration: 10,
        });
    });

    const oneMinuteAgoUnixTimestamp = () => ((Date.now() / 1000) - 60);

    it('user can have access to lab if user is author of the course but time has ran out', async () => {
        const testLabs = JSON.parse(JSON.stringify(labs)); // Take a copy for this test

        testLabs.activeLab.activeCourse.course.authors = [{
            id: props.auth.user.id, // set this user as the author
        }];
        testLabs.activeLab.lab_end_at = oneMinuteAgoUnixTimestamp(); // in the past
        const testProps = { ...props, labs: testLabs };
        const testComponent = shallow(<Lab {...testProps} />, { disableLifecycleMethods: true }); // We disable lifecycle methods as we will run them manually

        const instance = testComponent.instance();
        await instance.componentDidMount(); // Call the lifecycle with an await
        const courseTitle = testProps.labs.activeLab.activeCourse.course.title;
        expect(ReactGA.event).toBeCalledWith({
            category: CATEGORIES.HANDS_ON_LAB,
            action: ACTIONS.HAND_ON_LAB_STARTED_FOR_COURSE_FROM_ACTIVE_LAB(courseTitle),
            label: 'Hands-on Lab Page',
        });
        expect(testProps.history.push).not.toHaveBeenCalled();
    });

    it('user can have access to lab if user is complete lab successfully but time has run out', async () => {
        const testLabs = JSON.parse(JSON.stringify(labs)); // Take a copy for this test

        testLabs.activeLab.activeCourse.course.authors = [];
        testLabs.activeLab.lab_end_at = oneMinuteAgoUnixTimestamp(); // In the past
        testLabs.activeLab.progress = 'Completed';

        const testProps = { ...props, labs: testLabs };
        const testComponent = shallow(<Lab {...testProps} />, { disableLifecycleMethods: true }); // We disable lifecycle methods as we will run them manually

        const instance = testComponent.instance();
        await instance.componentDidMount(); // Call the lifecycle with an await

        const courseTitle = testProps.labs.activeLab.activeCourse.course.title;
        expect(ReactGA.event).toBeCalledWith({
            category: CATEGORIES.HANDS_ON_LAB,
            action: ACTIONS.HAND_ON_LAB_STARTED_FOR_COURSE_FROM_ACTIVE_LAB(courseTitle),
            label: 'Hands-on Lab Page',
        });
        expect(testProps.history.push).not.toHaveBeenCalled();
    });

    it('user cannot have access to lab if user is not author of the course, do not successfully complete the lab and time has run out', async () => {
        const testLabs = JSON.parse(JSON.stringify(labs)); // Take a copy for this test

        testLabs.activeLab.activeCourse.course.authors = [];
        testLabs.activeLab.lab_end_at = oneMinuteAgoUnixTimestamp(); // In the past
        testLabs.activeLab.progress = 'Pending';

        const testProps = { ...props, labs: testLabs };
        const testComponent = shallow(<Lab {...testProps} />, { disableLifecycleMethods: true }); // We disable lifecycle methods as we will run them manually

        const instance = testComponent.instance();
        await instance.componentDidMount(); // Call the lifecycle with an await

        expect(testProps.history.push).toBeCalledWith(`/platform/tl/${testProps.labs.activeLab.active_course_id}`);
    });

    it('check that relevant job is penultimate when penultimate job status is CREATING', () => {
        const mockJobs = [
            {
                progress: 0,
                status: 'CREATING',
            },
            {
                progress: 0,
                status: 'DESTROYED',
            },
        ];
        const instance = component.instance();
        const relevantJob = instance.getRelevantJob(mockJobs);
        expect(relevantJob).toEqual(mockJobs[mockJobs.length - 2]);
    });

    it('check that relevant job is penultimate when jobs length is greater or equal 2 penultimate job status is CREATED and latest progress of job is 0', () => {
        const mockJobs = [
            {
                progress: 0,
                status: 'CREATED',
            },
            {
                progress: 0,
                status: 'CREATING',
            },
        ];
        const instance = component.instance();
        const relevantJob = instance.getRelevantJob(mockJobs);
        expect(relevantJob).toEqual(mockJobs[mockJobs.length - 2]);
    });
    it('check that relevant job is last job when jobs length is greater or equal 2 and penultimate job status is not CREATED or CREATING', () => {
        const mockJobs = [
            {
                progress: 0,
                status: 'DESTROYED',
            },
            {
                progress: 0,
                status: 'CREATING',
            },
        ];
        const instance = component.instance();
        const relevantJob = instance.getRelevantJob(mockJobs);
        expect(relevantJob).toEqual(mockJobs[mockJobs.length - 1]);
    });

    it('check that relevant job is last job when jobs length is 1', () => {
        const mockJobs = [
            {
                progress: 0,
                status: 'DESTROYED',
            },
        ];
        const instance = component.instance();
        const relevantJob = instance.getRelevantJob(mockJobs);
        expect(mockJobs[mockJobs.length - 1]).toEqual(relevantJob);
    });

    it('should set completed failed steps and current step', async () => {
        const { activeLab } = labs;
        const instance = component.instance();
        const completedFailedSteps = JSON.parse(activeLab.completed_failed_steps);
        instance.setCompletedFailedSteps(activeLab);
        expect(component.instance().state.stepStatus.completed).toEqual(completedFailedSteps.completed);
        expect(component.instance().state.stepStatus.failed).toEqual(completedFailedSteps.failed);
        expect(component.instance().state.currentStep).toEqual(activeLab.currentStep.lab_id);
    });

    it('should set deadline and currentStep', async () => {
        const aLab = {
            currentStep: {
                lab_step: 10,
            },
        };
        const { activeLab } = labs;
        const instance = component.instance();
        expect(component.state().currentStep).toBe(activeLab.currentStep.lab_step);
        const deadline = instance.setDeadLine(aLab);
        expect(deadline).toBe(component.state().deadline);
        expect(component.state().currentStep).toBe(aLab.currentStep.lab_step);
    });

    it('progressIntervalCallback should return error message when lastJob status is ERROR', async () => {
        const { activeLab } = labs;
        activeLab.jobs[0].status = 'ERROR';
        const instance = component.instance();
        await instance.progressIntervalCallback(activeLab.jobs[0].id, activeLab);
        expect(message.error).toHaveBeenCalledWith('Lab creation/deletion failed, please try again.');
    });

    it('progressIntervalCallback should return success message when lastJob status is CREATED', async () => {
        const { activeLab } = labs;
        activeLab.jobs[0].status = 'CREATED';
        activeLab.jobs[0].progress = 100;
        const instance = component.instance();
        await instance.progressIntervalCallback(activeLab.jobs[0].id, activeLab);
        expect(message.success).toHaveBeenCalledWith('Lab created.');
    });

    it('progressIntervalCallback should return success message when lastJob status is DESTROYED', async () => {
        const { activeLab } = labs;
        activeLab.jobs[0].status = 'DESTROYED';
        activeLab.jobs[0].progress = 100;
        const instance = component.instance();
        await instance.progressIntervalCallback(activeLab.jobs[0].id, activeLab);
        expect(message.success).toHaveBeenCalledWith('Lab deleted.');
    });

    it('courseNotFinished should return error message when lastJobStatus is DESTROYING', async () => {
        const instance = component.instance();
        const { activeLab } = labs;
        activeLab.jobs[0].status = 'DESTROYING';
        await instance.courseNotFinished(activeLab.jobs[0], activeLab.jobs[0].id, activeLab);
        expect(message.error).toHaveBeenCalledWith('Lab is being destroyed.');
        expect(props.history.push).toHaveBeenCalledWith(`/platform/tl/${activeLab.activeCourse.id}`);
    });

    it('courseNotFinished should return error message when lastJobStatus is DESTROYED', async () => {
        const instance = component.instance();
        const { activeLab } = labs;
        activeLab.jobs[0].status = 'DESTROYED';
        await instance.courseNotFinished(activeLab.jobs[0], activeLab.jobs[0].id, activeLab);
        expect(message.error).toHaveBeenCalledWith('Lab is destroyed.');
        expect(props.history.push).toHaveBeenCalledWith(`/platform/tl/${activeLab.activeCourse.id}`);
    });

    it('courseNotFinished should return error message when lastJobStatus is CREATING', async () => {
        const instance = component.instance();
        const { activeLab } = labs;
        activeLab.jobs[0].status = 'CREATING';
        await instance.courseNotFinished(activeLab.jobs[0], activeLab.jobs[0].id, activeLab);
        expect(props.getActiveLab).toHaveBeenCalledWith(1);
        expect(props.getAuthUser).toBeCalled();
    });

    it('courseNotFinished should call checkResourceURLStatus with resourceURLs when lastJob status is CREATED', async () => {
        const instance = component.instance();
        const { activeLab, resourceURLs } = labs;
        const { checkResourceURLStatus } = props;
        activeLab.jobs[0].status = 'CREATED';
        await instance.courseNotFinished(activeLab.jobs[0], activeLab.jobs[0].id, activeLab);
        expect(checkResourceURLStatus).toHaveBeenCalledWith(resourceURLs);
    });

    it('courseNotFinished should return success message when lastJobStatus is DESTROYED', async () => {
        const instance = component.instance();
        const { activeLab } = labs;
        activeLab.jobs[0].status = 'DESTROYED';
        await instance.courseNotFinished(activeLab.jobs[0], activeLab.jobs[0].id, activeLab);
        expect(message.success).toHaveBeenCalledWith('Lab deleted.');
    });

    it('courseNotFinished should return error message when lastJobStatus is ERROR', async () => {
        const instance = component.instance();
        const { activeLab } = labs;
        activeLab.jobs[0].status = 'ERROR';
        await instance.courseNotFinished(activeLab.jobs[0], activeLab.jobs[0].id, activeLab);
        expect(message.error).toHaveBeenCalledWith('Lab creation/deletion failed, please try again.');
    });

    it('should render `reset-automated-checking` button success when user is fellow and an author of course', async () => {
        const { auth: { user } } = props;
        user.is_fellow = 1;
        component.setProps({ user });
        const button = component.find('.reset-automated-checking');
        expect(button.props().className).toBe('reset-automated-checking');
        expect(button.exists()).toEqual(true);
    });

    it('should not render `reset-automated-checking` button when user is not an author of course', async () => {
        const { auth: { user } } = props;
        const { activeLab } = labs;
        activeLab.activeCourse.course.authors = [];
        user.is_fellow = 0;
        user.roles = [];
        component.setProps({ user });
        component.setProps({ labs });
        const button = component.find('.reset-automated-checking');
        expect(button.exists()).toEqual(false);
    });

    it('button `reset-automated-checking` onclick should call resetAutomatedChecking with id of activeLab', async () => {
        const { auth: { user }, labs: { activeLab }, resetChecker } = props;
        resetChecker.mockClear();
        activeLab.activeCourse.course.authors = [{
            id: 3,
            pivot: {
                course_id: 1,
                user_id: 3,
            },
        }];
        user.is_fellow = 1;
        component.setProps({ user });
        const button = component.find('.reset-automated-checking');
        button.simulate('click');

        // Check the resetChecker from the props was called with the correct arguments:
        expect(resetChecker).toHaveBeenCalledWith(activeLab.id);
    });

    it('resetAutomatedChecking should call props.resetChecker with id of activeLab, and message.success with expected message', async () => {
        const { labs: { activeLab }, resetChecker } = props;
        const instance = component.instance();
        // Call resetAutomatedChecking and wait for it to return
        await instance.resetAutomatedChecking(activeLab.id);
        expect(resetChecker).toHaveBeenCalledWith(activeLab.id);
        expect(message.success).toHaveBeenCalledWith('Lab automated checking is reset');
    });
});
