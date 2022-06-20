import React from 'react';
import { shallow } from 'enzyme';
import { message } from 'antd';
import TheoryAndLab from './theory-and-lab';
import { COURSE_TYPE, COURSE_STATUSES } from '../../constants';
import Loading from '../../components/Loading/Loading';

jest.mock('react-ga');

jest.mock('antd', () => {
    const antd = jest.requireActual('antd');
    const messageANTD = {
        ...antd.message,
        error: jest.fn(),
        success: jest.fn(),
        faked: true,
    };
    return {
        ...antd,
        message: messageANTD,
    };
});

const props = {
    activeCourse: {
        id: 2,
        course_id: 1,
        user_id: 4,
        theory_progress: null,
        user_level: 'Medior',
        finished: 0,
        currentStep: {
            id: 24,
            user_id: 1,
            course_id: 149,
            lab_id: null,
            theory_step: 19,
            lab_step: null,
            created_at: '2021-01-08 12:44:59',
            updated_at: '2021-01-08 13:45:28',
        },
        course: {
            id: 20,
            title: 'FELLOW',
            description: 'FELLOW',
            information: { steps: 20 },
            course_is_for: [
                'sdfdsf',
                'sfdsf',
            ],
            required_exp: '<ul>\n\t<li>sdfdsfds</li>\n\t<li><strong>sfsddsf</strong></li>\n</ul>\n',
            will_learn: [
                'sdfdsf',
                'sdfdsf',
            ],
            tools_used: [],
            preview_video: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/FELLOW/swlPShJcVMkcatQ2IzNhhv2z6ofvtIQn.mov',
            cert_badge: 0,
            version: '1.0.0',
            difficulty: 3,
            content: 'FELLOW',
            views: 54,
            image: 'https://static.ewtest.infomaker.io/wp-content/uploads/sites/2/2017/03/22081625/cloud-upload.png',
            author: null,
            theory_duration: '10m',
            price: 39.99,
            active: 1,
            slug: 'fellow',
            linkedIn_url: 'sdfdsdsfsdf',
            category_id: 1,
            deleted: 0,
            created_at: '2020-09-16 12:17:49',
            updated_at: '2020-11-23 11:12:09',
            author_bio: null,
            version_date: '2020-09-16',
            value_rating: null,
            number_of_ratings: null,
            enrolled_students: null,
            certificate_of_completion: 1,
            lab_steps_in_personal_archive: 1,
            author_pic: null,
            publicly_visible: 0,
            stripe_product_id: '{"usd":"prod_I21l2zcoXqoLyI","eur":"prod_I21lcdOGtADQsd"}',
            stripe_price_id: '{"usd":"price_1HRxhxE2GQolyFR74x4Lrkv3","eur":"price_1HRxhxE2GQolyFR7r6Untlm8"}',
            access_request: 0,
            is_template: 0,
            template_id: null,
            is_from_draft: 0,
            status: 'Configuration',
            theory_title: null,
            theory_description: null,
            free_access: 0,
            second_author: null,
            second_author_bio: null,
            second_author_pic: null,
            second_linkedIn_url: null,
            labs: [
                {
                    id: 13,
                    name: 'GCP Omar',
                    slug: 'dev-testing',
                    course_id: 20,
                    signature_author_id: null,
                    author_signature: null,
                    platform: null,
                    description: 'This is omar',
                    available_time: '180m',
                    max_hint_count: 0,
                    hands_on_desc: 'This is omar',
                    hands_on_title: 'GCP Omar',
                    created_at: '2020-10-02 10:21:10',
                    updated_at: '2021-02-01 10:33:23',
                    application_language: null,
                    automated_checking: 0,
                    state_machine_created: 1,
                },
                {
                    id: 16,
                    name: 'Testing',
                    slug: 'dev-testing',
                    course_id: 20,
                    signature_author_id: null,
                    author_signature: null,
                    platform: null,
                    description: 'This is testing',
                    available_time: '100m',
                    max_hint_count: 0,
                    hands_on_desc: 'This is testing',
                    hands_on_title: 'Testing',
                    created_at: '2021-01-28 15:18:58',
                    updated_at: '2021-01-28 16:19:06',
                    application_language: null,
                    automated_checking: 0,
                    state_machine_created: 0,
                },
            ],
            authors: [
                {
                    id: 6,
                    firstname: 'Hans',
                    lastname: 'Moonen',
                    certificate_name: null,
                    cc_info: null,
                    customer_id: null,
                    email: 'hans@araido.io',
                    activated: 1,
                    coordinator: null,
                    is_fellow: 1,
                    linkedin_url: null,
                    created_at: '2020-03-23 18:42:05',
                    updated_at: '2020-07-15 11:54:26',
                    slack_id: null,
                    mfa_enabled: 0,
                    logged_in: 0,
                    pivot: {
                        user_id: 6,
                        course_id: 20,
                    },
                },
                {
                    id: 1,
                    firstname: 'Dominik',
                    lastname: 'de Smit',
                    certificate_name: 'Dominik de Smit',
                    cc_info: null,
                    customer_id: null,
                    email: 'dominik@araido.io',
                    activated: 1,
                    coordinator: null,
                    is_fellow: 0,
                    linkedin_url: null,
                    created_at: '2020-03-23 18:42:04',
                    updated_at: '2021-01-25 12:10:39',
                    slack_id: null,
                    mfa_enabled: 1,
                    logged_in: 1,
                    pivot: {
                        user_id: 1,
                        course_id: 20,
                    },
                },
            ],
            theory: [],
            certificates: [],
            userAnswer: {
                failed_questions: [],
            },
        },
        activeLabs: [
            {
                id: 67,
                active_course_id: 73,
                lab_id: 13,
                user_id: 1,
                status: 1,
                progress: 'Completed',
                duration: 3,
                lab_end_at: 1612266877,
                max_hint_count: 0,
                hint_is_open: null,
                start_time: '2021-02-02T11:51:42.000Z',
                created_at: '2020-10-12 11:19:14',
                updated_at: '2021-02-02 13:27:51',
                total_spin_up_time: 883660194,
                total_spin_ups: 37,
                completed_failed_steps: '{"failed": [3], "completed": [0, 1, 2]}',
                retry_times: 0,
                jobs: [
                    {
                        id: 901,
                        created_at: '2020-10-12 11:19:14',
                        updated_at: '2020-10-12 11:20:19',
                        job_number: 1548,
                        user_id: 1,
                        active_lab_id: 67,
                        status: 'ERROR',
                        progress: 0,
                        debug_info: '901, Something went wrong for job id: 901, error: \u001b[31m\n\u001b[1m\u001b[31mError: \u001b[0m\u001b[0m\u001b[1mfailed pre-requisites: missing permission on "billingAccounts/01A645-F8516E-D9A73C": billing.resourceAssociations.create\u001b[0m\n\n\u001b[0m\u001b[0m\u001b[0m\n',
                        job_resources: null,
                        automated: 0,
                        scheduled_deletion_time: null,
                    },
                    {
                        id: 903,
                        created_at: '2020-10-12 12:17:19',
                        updated_at: '2020-10-12 12:18:18',
                        job_number: 1550,
                        user_id: 1,
                        active_lab_id: 67,
                        status: 'DESTROYED',
                        progress: 100,
                        debug_info: null,
                        job_resources: null,
                        automated: null,
                        scheduled_deletion_time: null,
                    },
                    {
                        id: 1954,
                        created_at: '2021-02-02 12:54:37',
                        updated_at: '2021-02-02 12:54:39',
                        job_number: 2592,
                        user_id: 1,
                        active_lab_id: 67,
                        status: 'CREATED',
                        progress: 100,
                        debug_info: null,
                        job_resources: null,
                        automated: null,
                        scheduled_deletion_time: null,
                    },
                ],
                lab: {
                    id: 13,
                    name: 'GCP Omar',
                    slug: 'dev-testing',
                    course_id: 20,
                    signature_author_id: null,
                    author_signature: null,
                    platform: null,
                    description: 'This is omar',
                    available_time: '180m',
                    max_hint_count: 0,
                    hands_on_desc: 'This is omar',
                    hands_on_title: 'GCP Omar',
                    created_at: '2020-10-02 10:21:10',
                    updated_at: '2021-02-01 10:33:23',
                    application_language: null,
                    automated_checking: 0,
                    state_machine_created: 1,
                    step: [
                        {
                            id: 10,
                            lab_id: 13,
                            title: 'bla',
                            uuid: 'd8d64a25-eac5-40c6-bfdb-6b584f5fd9d1',
                            order_number: 1,
                            is_compulsory: 0,
                            created_at: '2021-01-11 14:19:02',
                            updated_at: '2021-01-28 16:13:29',
                            states: [],
                        },
                        {
                            id: 22,
                            lab_id: 13,
                            title: 'blabla',
                            uuid: '12e91037-1c52-4558-9eaa-b449d1174a42',
                            order_number: 2,
                            is_compulsory: 0,
                            created_at: '2021-01-26 13:41:09',
                            updated_at: '2021-01-28 16:13:29',
                            states: [],
                        },
                        {
                            id: 11,
                            lab_id: 13,
                            title: 'bla2',
                            uuid: '27b035db-565a-46e6-a812-b8f20df961a2',
                            order_number: 3,
                            is_compulsory: 0,
                            created_at: '2021-01-11 14:19:02',
                            updated_at: '2021-01-28 16:13:29',
                            states: [
                                {
                                    id: 137,
                                    step_id: 11,
                                    title: 'finish',
                                    created_at: '2021-01-28 16:13:29',
                                    updated_at: '2021-01-28 16:13:29',
                                },
                            ],
                        },
                        {
                            id: 9,
                            lab_id: 13,
                            title: '1',
                            uuid: '8690176a-3b80-48f2-a090-7b7d575a0281',
                            order_number: 4,
                            is_compulsory: 0,
                            created_at: '2021-01-11 14:19:02',
                            updated_at: '2021-01-28 16:13:29',
                            states: [
                                {
                                    id: 136,
                                    step_id: 9,
                                    title: 'initial',
                                    created_at: '2021-01-28 16:13:29',
                                    updated_at: '2021-01-28 16:13:29',
                                },
                            ],
                        },
                    ],
                },
            },
            {
                id: 77,
                active_course_id: 73,
                lab_id: 16,
                user_id: 1,
                status: 0,
                progress: 'Pending',
                duration: 3,
                lab_end_at: 1612279264,
                max_hint_count: 0,
                hint_is_open: null,
                start_time: '2021-02-02T13:41:04.000Z',
                created_at: '2021-01-29 14:48:53',
                updated_at: '2021-02-02 14:41:18',
                total_spin_up_time: 1096369,
                total_spin_ups: 40,
                completed_failed_steps: '{"failed": [0, 2], "completed": [1]}',
                retry_times: 0,
                jobs: [
                    {
                        id: 1753,
                        created_at: '2021-01-29 14:48:53',
                        updated_at: '2021-01-29 14:48:58',
                        job_number: 2393,
                        user_id: 1,
                        active_lab_id: 77,
                        status: 'CREATED',
                        progress: 100,
                        debug_info: null,
                        job_resources: '{"JUST_TESTING":"[LINK]https://www.devsecops-academy.com[/LINK][CREDENTIALS]{\\"username\\": \\"root\\", \\"password\\": \\"asjvwp2qd4k\\"}[/CREDENTIALS]","JUST_TESTING_2":"[LINK]https://www.devsecops-academy.com[/LINK][CREDENTIALS]{\\"username\\": \\"root2\\", \\"password\\": \\"asjvwp2qd4k2\\"}[/CREDENTIALS]"}',
                        automated: 0,
                        scheduled_deletion_time: null,
                    },
                    {
                        id: 1756,
                        created_at: '2021-01-29 14:49:22',
                        updated_at: '2021-01-29 14:49:26',
                        job_number: 2396,
                        user_id: 1,
                        active_lab_id: 77,
                        status: 'DESTROYED',
                        progress: 100,
                        debug_info: null,
                        job_resources: null,
                        automated: null,
                        scheduled_deletion_time: null,
                    },
                    {
                        id: 1963,
                        created_at: '2021-02-02 14:41:16',
                        updated_at: '2021-02-02 14:41:18',
                        job_number: 2603,
                        user_id: 1,
                        active_lab_id: 77,
                        status: 'DESTROYED',
                        progress: 100,
                        debug_info: null,
                        job_resources: null,
                        automated: null,
                        scheduled_deletion_time: null,
                    },
                ],
                lab: {
                    id: 16,
                    name: 'Testing',
                    slug: 'dev-testing',
                    course_id: 20,
                    signature_author_id: null,
                    author_signature: null,
                    platform: null,
                    description: 'This is testing',
                    available_time: '100m',
                    max_hint_count: 0,
                    hands_on_desc: 'This is testing',
                    hands_on_title: 'Testing',
                    created_at: '2021-01-28 15:18:58',
                    updated_at: '2021-01-28 16:19:06',
                    application_language: null,
                    automated_checking: 0,
                    state_machine_created: 0,
                    step: [
                        {
                            id: 33,
                            lab_id: 16,
                            title: 'sdfdsf',
                            uuid: '9d84c4c9-1e83-4861-95be-3ad6cdf1d3fa',
                            order_number: 1,
                            is_compulsory: 0,
                            created_at: '2021-01-28 15:19:10',
                            updated_at: '2021-01-29 17:02:41',
                            states: [
                                {
                                    id: 138,
                                    step_id: 33,
                                    title: 'idle',
                                    created_at: '2021-01-29 17:02:41',
                                    updated_at: '2021-01-29 17:02:41',
                                },
                            ],
                        },
                        {
                            id: 35,
                            lab_id: 16,
                            title: 'bla',
                            uuid: 'ff306600-eef5-4611-b4fe-855df0a335ff',
                            order_number: 2,
                            is_compulsory: 0,
                            created_at: '2021-01-29 17:02:17',
                            updated_at: '2021-01-29 17:02:41',
                            states: [
                                {
                                    id: 140,
                                    step_id: 35,
                                    title: 'initial',
                                    created_at: '2021-01-29 17:02:41',
                                    updated_at: '2021-01-29 17:02:41',
                                },
                            ],
                        },
                        {
                            id: 34,
                            lab_id: 16,
                            title: 'bla2',
                            uuid: 'd10b01ae-d3f7-490c-b8a3-47164508bf89',
                            order_number: 3,
                            is_compulsory: 0,
                            created_at: '2021-01-29 17:02:17',
                            updated_at: '2021-01-29 17:02:41',
                            states: [
                                {
                                    id: 139,
                                    step_id: 34,
                                    title: 'gitlab_pipeline_check',
                                    created_at: '2021-01-29 17:02:41',
                                    updated_at: '2021-01-29 17:02:41',
                                },
                            ],
                        },
                    ],
                },
            },
        ],
        loading: false,
        error: null,
    },
    auth: {
        user: {
            id: 4,
            firstname: 'George',
            lastname: 'Aramyan',
            certificate_name: null,
            email: 'george@araido.io',
            activated: 1,
            coordinator: null,
            created_at: '2020-06-22 10:41:20',
            updated_at: '2020-06-22 10:41:20',
            roles: [
                'administrator',
            ],
        },
    },
    match: {
        params: {
            id: 2,
        },
    },
    getActiveCourse: jest.fn(() => Promise.resolve(true)),
    getJobProgress: jest.fn(() => Promise.resolve(true)),
};
describe('TheoryAndLab', () => {
    let component;

    beforeEach(() => {
        component = shallow(<TheoryAndLab {...props} />);
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('Should render successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render remaining minutes', () => {
        const minutes = component.find('.minutes');
        expect(minutes.exists()).toBeTruthy();
    });
    it('Should render difficulty level text', () => {
        const difficultyLevel = component.find('.difficulty-level');
        expect(difficultyLevel.exists()).toBeTruthy();
    });

    it('Should render difficulty level depend on level comes from props', () => {
        const { activeCourse } = props;
        activeCourse.course.difficulty = 1;
        component.setProps({
            activeCourse,
        });
        expect(component.find('.difficulty-level').text()).toBe('Easy');

        activeCourse.course.difficulty = 5;
        component.setProps({
            activeCourse,
        });
        expect(component.find('.difficulty-level').text()).toBe('Hard');

        activeCourse.course.difficulty = 3;
        component.setProps({
            activeCourse,
        });
        expect(component.find('.difficulty-level').text()).toBe('Medium');
    });

    it('should render completedButton successfully when course finished', () => {
        component.setProps({
            activeCourse: {
                ...props.activeCourse,
                finished: 1,
                course: {
                    status: COURSE_STATUSES.PRODUCTION,
                    authors: [],
                    certificates: [],
                    labs: [],
                },
            },
        });

        const completedButton = component.find('.completedButton');
        expect(completedButton.exists()).toBeTruthy();
        expect(completedButton.props().children).toBe('Revisit');
    });

    it('.getButtonStatus() should return the button status', () => {
        let status = component.instance().getButtonStatus(props.activeCourse);
        expect(status).toBe('Continue');
        const theoryProgress = 100;
        status = component.instance().getButtonStatus(props.activeCourse, theoryProgress);
        expect(status).toBe('Revisit');
    });

    it('should show correct theory progress', async () => {
        props.getActiveCourse = '';

        // theory lab steps are passed but there is no certificate yet and the course type is not intro
        let progress = component.find('Progress').at(0);
        expect(progress.props().percent).toBe(99);

        // course type is intro and the quiz  is passed
        const props1 = JSON.parse(JSON.stringify(props));
        props1.activeCourse.course.type = COURSE_TYPE.INTRODUCTION;
        props1.getActiveCourse = jest.fn(() => Promise.resolve(true));
        const component1 = shallow(<TheoryAndLab {...props1} />);
        await component1.instance();
        progress = component1.find('Progress').at(0);
        expect(progress.props().percent).toBe(100);

        // course type is intro and the quiz  has failed questions
        const props2 = JSON.parse(JSON.stringify(props));
        props2.activeCourse.course.type = COURSE_TYPE.INTRODUCTION;
        props2.activeCourse.course.userAnswer.failed_questions = [1];
        props2.getActiveCourse = jest.fn(() => Promise.resolve(true));
        const component2 = shallow(<TheoryAndLab {...props2} />);
        await component2.instance();
        progress = component2.find('Progress').at(0);
        expect(progress.props().percent).toBe(99);

        // course type is intro and the quiz is not started yet
        const props3 = JSON.parse(JSON.stringify(props));
        props3.activeCourse.course.type = COURSE_TYPE.INTRODUCTION;
        props3.activeCourse.course.userAnswer = null;
        props3.getActiveCourse = jest.fn(() => Promise.resolve(true));
        const component3 = shallow(<TheoryAndLab {...props3} />);
        await component3.instance();
        progress = component3.find('Progress').at(0);
        expect(progress.props().percent).toBe(99);

        // the certificate is received
        const props4 = JSON.parse(JSON.stringify(props));
        props4.activeCourse.course.certificates = [{ id: 1 }];
        props4.getActiveCourse = jest.fn(() => Promise.resolve(true));
        const component4 = shallow(<TheoryAndLab {...props4} />);
        await component4.instance();
        progress = component4.find('Progress').at(0);
        expect(progress.props().percent).toBe(100);

        props.getActiveCourse = jest.fn(() => Promise.resolve(true));
    });

    test('should start button be active if a user is an administrator', async () => {
        const instance = component.instance();

        const isDisabled = instance.isStartButtonDisabled();
        expect(isDisabled).toEqual(false);

        const startBtn = component.find('.startButton').at(0);
        expect(startBtn.props().disabled).toEqual(false);
    });

    test('should start button be active if a user is not an administrator and course status is not Development', async () => {
        const instance = component.instance();
        const { activeCourse, auth } = props;
        activeCourse.course.status = COURSE_STATUSES.PRODUCTION;
        auth.user.roles = ['beta_tester'];
        component.setProps(props);

        const isDisabled = instance.isStartButtonDisabled();
        expect(isDisabled).toEqual(false);

        const startBtn = component.find('.startButton').at(0);
        expect(startBtn.props().disabled).toEqual(false);
    });

    test('should start button disabled, if a user is not an administrator and course status is Development', async () => {
        const instance = component.instance();
        const { activeCourse, auth } = props;
        activeCourse.course.status = COURSE_STATUSES.DEVELOPMENT;
        auth.user.roles = ['beta_tester'];
        component.setProps(props);

        const isDisabled = instance.isStartButtonDisabled();
        expect(isDisabled).toEqual(true);

        const startBtn = component.find('.startButton').at(0);
        expect(startBtn.props().disabled).toBeTruthy();
    });

    test('should start button be active if a user is a course author and course status is Development', async () => {
        const instance = component.instance();
        const { activeCourse, auth } = props;
        activeCourse.course.status = COURSE_STATUSES.DEVELOPMENT;
        activeCourse.course.authors = [auth.user];
        auth.user.roles = ['beta_tester'];

        component.setProps(props);

        const isDisabled = instance.isStartButtonDisabled();
        expect(isDisabled).toEqual(false);

        const startBtn = component.find('.startButton').at(0);
        expect(startBtn.props().disabled).toEqual(false);
    });

    test('it should render disabled-startButton-tooltip with expected title when the course\'s status is not Production and the user is not an admin', async () => {
        const expectedTitle = 'Sorry, but course is in development stage';
        const { activeCourse, auth } = props;
        activeCourse.course.status = COURSE_STATUSES.DEVELOPMENT;
        auth.user.roles = ['beta_tester'];
        component.setProps(props);

        const disabledStartBtnTooltip = component.find('.disabled-startButton-tooltip');
        expect(disabledStartBtnTooltip.props().title).toBe(expectedTitle);
    });

    test('if course status is DEVELOPMENT, the Start button is disabled', async () => {
        const { activeCourse } = props;
        activeCourse.course.status = COURSE_STATUSES.DEVELOPMENT;
        component.setProps(props);

        const disabledStartBtn = component.find('.disabled-startButton-tooltip .startButton');
        expect(disabledStartBtn.props().className).toBe('startButton');
        expect(disabledStartBtn.props().disabled).toBeTruthy();
    });

    test('if course status is DESIRED, the Start button is disabled', async () => {
        const { activeCourse } = props;
        activeCourse.course.status = COURSE_STATUSES.DESIRED;
        component.setProps(props);

        const disabledStartBtn = component.find('.disabled-startButton-tooltip .startButton');
        expect(disabledStartBtn.props().className).toBe('startButton');
        expect(disabledStartBtn.props().disabled).toBeTruthy();
    });

    test('if course status is DRAFT, the Start button is disabled', async () => {
        const { activeCourse } = props;
        activeCourse.course.status = COURSE_STATUSES.DRAFT;
        component.setProps(props);

        const disabledStartBtn = component.find('.disabled-startButton-tooltip .startButton');
        expect(disabledStartBtn.props().className).toBe('startButton');
        expect(disabledStartBtn.props().disabled).toBeTruthy();
    });

    test('if no activeCourse id, returned component \'Course not found\'', async () => {
        const { activeCourse } = props;
        activeCourse.id = null;
        component.setProps(props);

        expect(component.find('h3').props().children).toEqual('Course not found');
    });

    test('renders only a Loading component when state.loadingCourse is true', async () => {
        component.setState({ loadingCourse: true });
        const loadingComponent = component.find(Loading);
        const theoryLootContainer = component.find('.theoryLabRootContainer');
        expect(loadingComponent).toHaveLength(1);
        expect(theoryLootContainer).toHaveLength(0);
    });
});

describe('handleRelevantJob()', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.useRealTimers();
    });
    const component = shallow(<TheoryAndLab {...props} />);

    test('setInterval() calls the given function in the specified time', () => {
        jest.useFakeTimers();
        const testFn = jest.fn();

        const instance = component.instance();
        instance.__setInterval(testFn, 1000);

        jest.advanceTimersByTime(10000);

        expect(testFn).toHaveBeenCalledTimes(10);
    });

    test('handleRelevantJob() calls props.getJobProgress', () => {
        const mockResponseData = props.activeCourse.activeLabs[0];
        const testProps = {
            ...props,
            getJobProgress: jest.fn(() => Promise.resolve(mockResponseData)),
            getAuthUser: jest.fn(() => Promise.resolve(true)),
        };

        const testComponent = shallow(<TheoryAndLab {...testProps} />);

        const instance = testComponent.instance();

        instance.handleRelevantJob(testProps.activeCourse.activeLabs[0].id);

        expect(testProps.getJobProgress).toHaveBeenCalled();
    });

    test('handleRelevantJob() returns ERROR if last job is ERROR', async () => {
        const activeLabs = [
            {
                id: 1,
                status: 1,
                completed_failed_steps: '{"failed": "[2]", "completed": "[0, 1,]"}',
                jobs: [
                    {
                        id: 903,
                        status: 'ERROR',
                        progress: 100,
                    },
                ],
                lab: {
                    id: 12,
                    step: [
                        {
                            id: 11,
                            lab_id: 12,
                            states: [
                                {
                                    id: 137,
                                    step_id: 11,
                                    title: 'finish',
                                    created_at: '2021-01-28 16:13:29',
                                    updated_at: '2021-01-28 16:13:29',
                                },
                            ],
                        },
                        {
                            id: 11,
                            lab_id: 12,
                            states: [
                                {
                                    id: 137,
                                    step_id: 11,
                                    title: 'finish',
                                    created_at: '2021-01-28 16:13:29',
                                    updated_at: '2021-01-28 16:13:29',
                                },
                            ],
                        },
                        {
                            id: 11,
                            lab_id: 12,
                            states: [
                                {
                                    id: 137,
                                    step_id: 11,
                                    title: 'initial',
                                    created_at: '2021-01-28 16:13:29',
                                    updated_at: '2021-01-28 16:13:29',
                                },
                            ],
                        },
                    ],
                },
            },
        ];
        const mockResponseData = activeLabs[0];
        const testProps = {
            activeCourse: {
                course: {
                    id: 1,
                },
                activeLabs,
            },
            match: {
                params: {
                    id: 1,
                },
            },
            getActiveCourse: jest.fn(() => Promise.resolve(mockResponseData)),
            getJobProgress: jest.fn(() => Promise.resolve(mockResponseData)),
            getAuthUser: jest.fn(() => Promise.resolve(true)),
        };

        const testComponent = shallow(<TheoryAndLab {...testProps} />);
        const instance = testComponent.instance();

        await instance.handleRelevantJob(testProps.activeCourse.activeLabs[0].id);

        expect(testProps.getJobProgress).toHaveBeenCalled();
        expect(testComponent.state().progressLab).toBe(0);
        expect(message.error).toHaveBeenCalled();
        expect(message.error).toHaveBeenCalledWith('Lab creation/deletion failed, please try again.');
    });

    test('handleRelevantJob() returns CREATED if last job is CREATED', async () => {
        const activeLabs = [
            {
                id: 1,
                status: 1,
                completed_failed_steps: '{"failed": "[2]", "completed": "[0, 1,]"}',
                jobs: [
                    {
                        id: 903,
                        status: 'CREATED',
                        progress: 100,
                    },
                    {
                        id: 1954,
                        status: 'CREATING',
                        progress: 0,
                    },
                ],
                lab: {
                    id: 12,
                    step: [
                        {
                            id: 11,
                            lab_id: 12,
                            states: [
                                {
                                    id: 137,
                                    step_id: 11,
                                    title: 'finish',
                                    created_at: '2021-01-28 16:13:29',
                                    updated_at: '2021-01-28 16:13:29',
                                },
                            ],
                        },
                        {
                            id: 11,
                            lab_id: 12,
                            states: [
                                {
                                    id: 137,
                                    step_id: 11,
                                    title: 'finish',
                                    created_at: '2021-01-28 16:13:29',
                                    updated_at: '2021-01-28 16:13:29',
                                },
                            ],
                        },
                        {
                            id: 11,
                            lab_id: 12,
                            states: [
                                {
                                    id: 137,
                                    step_id: 11,
                                    title: 'initial',
                                    created_at: '2021-01-28 16:13:29',
                                    updated_at: '2021-01-28 16:13:29',
                                },
                            ],
                        },
                    ],
                },
            },
        ];
        const mockResponseData = activeLabs[0];
        const testProps = {
            activeCourse: {
                course: {
                    id: 1,
                    labs: ['1', '2'],
                },
                activeLabs,
            },
            match: {
                params: {
                    id: 1,
                },
            },
            getActiveCourse: jest.fn(() => Promise.resolve(mockResponseData)),
            getJobProgress: jest.fn(() => Promise.resolve(mockResponseData)),
            getAuthUser: jest.fn(() => Promise.resolve(true)),
        };

        const testComponent = shallow(<TheoryAndLab {...testProps} />);
        const instance = testComponent.instance();

        await instance.handleRelevantJob(testProps.activeCourse.activeLabs[0].id);

        expect(testProps.getJobProgress).toHaveBeenCalled();
        expect(testComponent.state().progressLab).toBe(0);
        expect(message.success).toHaveBeenCalledWith('Lab created.');
    });

    test('handleRelevantJob() returns DESTROYED if last job is DESTROYED', async () => {
        const activeLabs = [
            {
                id: 1,
                status: 1,
                completed_failed_steps: '{"failed": "[2]", "completed": "[0, 1,]"}',
                jobs: [
                    {
                        id: 903,
                        status: 'DESTROYED',
                        progress: 100,
                    },
                ],
                lab: {
                    id: 12,
                    step: [
                        {
                            id: 11,
                            lab_id: 12,
                            states: [
                                {
                                    id: 137,
                                    step_id: 11,
                                    title: 'finish',
                                    created_at: '2021-01-28 16:13:29',
                                    updated_at: '2021-01-28 16:13:29',
                                },
                            ],
                        },
                        {
                            id: 11,
                            lab_id: 12,
                            states: [
                                {
                                    id: 137,
                                    step_id: 11,
                                    title: 'finish',
                                    created_at: '2021-01-28 16:13:29',
                                    updated_at: '2021-01-28 16:13:29',
                                },
                            ],
                        },
                        {
                            id: 11,
                            lab_id: 12,
                            states: [
                                {
                                    id: 137,
                                    step_id: 11,
                                    title: 'initial',
                                    created_at: '2021-01-28 16:13:29',
                                    updated_at: '2021-01-28 16:13:29',
                                },
                            ],
                        },
                    ],
                },
            },
        ];
        const mockResponseData = activeLabs[0];
        const testProps = {
            activeCourse: {
                course: {
                    id: 1,
                    labs: ['1', '2'],
                },
                activeLabs,
            },
            match: {
                params: {
                    id: 1,
                },
            },
            getActiveCourse: jest.fn(() => Promise.resolve(mockResponseData)),
            getJobProgress: jest.fn(() => Promise.resolve(mockResponseData)),
            getAuthUser: jest.fn(() => Promise.resolve(true)),
        };
        const testComponent = shallow(<TheoryAndLab {...testProps} />);
        const instance = testComponent.instance();

        await instance.handleRelevantJob(testProps.activeCourse.activeLabs[0].id);

        expect(testProps.getJobProgress).toHaveBeenCalled();
        expect(testComponent.state().progressLab).toBe(0);
        expect(message.success).toHaveBeenCalledWith('Lab deleted.');
    });
});

describe('.getRelevantJob()', () => {
    const component = shallow(<TheoryAndLab {...props} />);
    test('check that relevant job is penultimate when penultimate job status is CREATING', () => {
        const mockActiveLab = {
            jobs: [
                {
                    progress: 0,
                    status: 'CREATING',
                },
                {
                    progress: 0,
                    status: 'DESTROYED',
                },
            ],
        };
        const instance = component.instance();
        const relevantJob = instance.getRelevantJob(mockActiveLab);
        expect(relevantJob).toEqual(mockActiveLab.jobs[mockActiveLab.jobs.length - 2]);
    });

    test('check that relevant job is penultimate when jobs length is greater or equal 2 penultimate job status is CREATED and latest progress of job is 0', () => {
        const mockActiveLab = {
            jobs: [
                {
                    progress: 0,
                    status: 'CREATED',
                },
                {
                    progress: 0,
                    status: 'CREATING',
                },
            ],
        };
        const instance = component.instance();
        const relevantJob = instance.getRelevantJob(mockActiveLab);
        expect(relevantJob).toEqual(mockActiveLab.jobs[mockActiveLab.jobs.length - 2]);
    });
    test('check that relevant job is last job when jobs length is greater or equal 2 and penultimate job status is not CREATED or CREATING', () => {
        const mockActiveLab = {
            jobs: [
                {
                    progress: 0,
                    status: 'DESTROYED',
                },
                {
                    progress: 0,
                    status: 'CREATING',
                },
            ],
        };
        const instance = component.instance();
        const relevantJob = instance.getRelevantJob(mockActiveLab);
        expect(relevantJob).toEqual(mockActiveLab.jobs[mockActiveLab.jobs.length - 1]);
    });

    test('check that relevant job is last job when jobs length is 1', () => {
        const mockActiveLab = {
            jobs: [
                {
                    progress: 0,
                    status: 'DESTROYED',
                },
            ],
        };
        const instance = component.instance();
        const relevantJob = instance.getRelevantJob(mockActiveLab);
        expect(relevantJob).toEqual(mockActiveLab.jobs[mockActiveLab.jobs.length - 1]);
    });
});

describe('activeLab without any infrastructure (status: 1)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const testProps = {
        activeCourse: {
            course: {
                labs: [
                    {
                        id: 16,
                        name: 'Secure your AWS S3 Bucket',
                        available_time: '180m',
                    },
                ],
                authors: [
                    {
                        id: 7,
                        firstname: 'Hans',
                        lastname: 'Moonen',
                    },
                ],
                certificates: [],
            },
            activeLabs: [
                {
                    id: 1001,
                    status: 0,
                    progress: 'Pending',
                    completed_failed_steps: '{"failed": [4, 6, 7, 8, 9, 10], "completed": [0, 1, 2, 3]}',
                    jobs: [
                        {
                            status: 'CREATED',
                            progress: 100,
                        },
                        {
                            status: 'DESTROYED',
                            progress: 100,
                        },
                    ],
                    lab: {
                        id: 16,
                        step: [
                            {
                                id: 547,
                                lab_id: 16,
                                title: 'General lab information',
                                uuid: '16e94a8b-b851-4a55-812e-2d3695e70b08',
                                order_number: 1,
                                is_compulsory: 1,
                                created_at: '2021-03-03 07:35:54',
                                updated_at: '2022-01-24 12:49:20',
                                states: [],
                            },
                            {
                                id: 2,
                                lab_id: 16,
                                title: 'Your Lab',
                                uuid: 'd01fbfe7-2b06-4cb2-b9d9-2a3842ae54b2',
                                order_number: 2,
                                is_compulsory: 0,
                                created_at: '2021-01-21 20:48:22',
                                updated_at: '2022-01-24 12:49:20',
                                states: [],
                            },
                            {
                                id: 4,
                                lab_id: 16,
                                title: 'Objectives',
                                uuid: 'e418abe3-e337-4191-8e76-20fbea175694',
                                order_number: 3,
                                is_compulsory: 0,
                                created_at: '2021-01-21 20:48:22',
                                updated_at: '2022-01-24 12:49:20',
                                states: [],
                            },
                            {
                                id: 5,
                                lab_id: 16,
                                title: 'Explore your S3 bucket',
                                uuid: 'c5d00f7e-7748-442b-a761-3cb08de0f0c9',
                                order_number: 4,
                                is_compulsory: 0,
                                created_at: '2021-01-21 20:48:22',
                                updated_at: '2022-01-24 12:49:20',
                                states: [
                                    {
                                        id: 56309,
                                        step_id: 5,
                                        title: 'check_image_upload',
                                        help_message: null,
                                        created_at: '2022-01-24 12:49:20',
                                        updated_at: '2022-01-24 12:49:20',
                                    },
                                ],
                            },
                            {
                                id: 6,
                                lab_id: 16,
                                title: 'Audit your S3 bucket',
                                uuid: '5ee6cdc5-78d9-4215-b26a-3676e3afb2f5',
                                order_number: 5,
                                is_compulsory: 0,
                                created_at: '2021-01-21 20:48:22',
                                updated_at: '2022-01-24 12:49:20',
                                states: [],
                            },
                            {
                                id: 7,
                                lab_id: 16,
                                title: 'Add a security check',
                                uuid: 'ccf0d8c5-d780-4f5e-b58e-ae1ffa8564b0',
                                order_number: 6,
                                is_compulsory: 0,
                                created_at: '2021-01-21 20:48:22',
                                updated_at: '2022-01-24 12:49:20',
                                states: [
                                    {
                                        id: 56310,
                                        step_id: 7,
                                        title: 'aws_access_key_env_check',
                                        help_message: null,
                                        created_at: '2022-01-24 12:49:20',
                                        updated_at: '2022-01-24 12:49:20',
                                    },
                                    {
                                        id: 56311,
                                        step_id: 7,
                                        title: 'aws_secret_access_key_env_check',
                                        help_message: null,
                                        created_at: '2022-01-24 12:49:20',
                                        updated_at: '2022-01-24 12:49:20',
                                    },
                                    {
                                        id: 56312,
                                        step_id: 7,
                                        title: 's3tk_gitlab_pipeline_check',
                                        help_message: null,
                                        created_at: '2022-01-24 12:49:20',
                                        updated_at: '2022-01-24 12:49:20',
                                    },
                                ],
                            },
                            {
                                id: 8,
                                lab_id: 16,
                                title: 'Fix the security issues with the AWS CLI',
                                uuid: '280c6a16-31f3-4403-be61-6c4287934919',
                                order_number: 7,
                                is_compulsory: 0,
                                created_at: '2021-01-21 20:48:22',
                                updated_at: '2022-01-24 12:49:20',
                                states: [
                                    {
                                        id: 56313,
                                        step_id: 8,
                                        title: 's3_encryption_check',
                                        help_message: null,
                                        created_at: '2022-01-24 12:49:20',
                                        updated_at: '2022-01-24 12:49:20',
                                    },
                                    {
                                        id: 56314,
                                        step_id: 8,
                                        title: 's3_public_access_block_check',
                                        help_message: null,
                                        created_at: '2022-01-24 12:49:20',
                                        updated_at: '2022-01-24 12:49:20',
                                    },
                                    {
                                        id: 56315,
                                        step_id: 8,
                                        title: 's3_versioning_check',
                                        help_message: null,
                                        created_at: '2022-01-24 12:49:20',
                                        updated_at: '2022-01-24 12:49:20',
                                    },
                                    {
                                        id: 56316,
                                        step_id: 8,
                                        title: 's3_logging_enabled_check',
                                        help_message: null,
                                        created_at: '2022-01-24 12:49:20',
                                        updated_at: '2022-01-24 12:49:20',
                                    },
                                ],
                            },
                            {
                                id: 9,
                                lab_id: 16,
                                title: 'Fix the security issues with s3tk',
                                uuid: '36aa35ad-c505-482d-977e-e3a25e531dc7',
                                order_number: 8,
                                is_compulsory: 0,
                                created_at: '2021-01-21 20:48:22',
                                updated_at: '2022-01-24 12:49:20',
                                states: [
                                    {
                                        id: 56317,
                                        step_id: 9,
                                        title: 's3_encryption_enabled_using_s3tk',
                                        help_message: null,
                                        created_at: '2022-01-24 12:49:20',
                                        updated_at: '2022-01-24 12:49:20',
                                    },
                                    {
                                        id: 56318,
                                        step_id: 9,
                                        title: 's3_encryption_disabled_check',
                                        help_message: null,
                                        created_at: '2022-01-24 12:49:20',
                                        updated_at: '2022-01-24 12:49:20',
                                    },
                                ],
                            },
                            {
                                id: 10,
                                lab_id: 16,
                                title: 'Create a secure S3 bucket with Terraform',
                                uuid: 'e56f46a2-39fe-4556-8d75-840207d15dc9',
                                order_number: 9,
                                is_compulsory: 0,
                                created_at: '2021-01-21 20:48:22',
                                updated_at: '2022-01-24 12:49:20',
                                states: [
                                    {
                                        id: 56319,
                                        step_id: 10,
                                        title: 'terraform_config_check',
                                        help_message: null,
                                        created_at: '2022-01-24 12:49:20',
                                        updated_at: '2022-01-24 12:49:20',
                                    },
                                ],
                            },
                            {
                                id: 11,
                                lab_id: 16,
                                title: 'Add a SAST check with Checkov ',
                                uuid: '8ab05976-ce81-4576-8b3c-d64c3a61793b',
                                order_number: 10,
                                is_compulsory: 0,
                                created_at: '2021-01-21 20:48:22',
                                updated_at: '2022-01-24 12:49:20',
                                states: [
                                    {
                                        id: 56320,
                                        step_id: 11,
                                        title: 'checkov_config_check',
                                        help_message: null,
                                        created_at: '2022-01-24 12:49:20',
                                        updated_at: '2022-01-24 12:49:20',
                                    },
                                    {
                                        id: 56321,
                                        step_id: 11,
                                        title: 'checkov_check_skip_check',
                                        help_message: null,
                                        created_at: '2022-01-24 12:49:20',
                                        updated_at: '2022-01-24 12:49:20',
                                    },
                                    {
                                        id: 56322,
                                        step_id: 11,
                                        title: 'mfa_delete_check',
                                        help_message: null,
                                        created_at: '2022-01-24 12:49:20',
                                        updated_at: '2022-01-24 12:49:20',
                                    },
                                    {
                                        id: 56323,
                                        step_id: 11,
                                        title: 'checkov_scan_check',
                                        help_message: null,
                                        created_at: '2022-01-24 12:49:20',
                                        updated_at: '2022-01-24 12:49:20',
                                    },
                                ],
                            },
                            {
                                id: 12,
                                lab_id: 16,
                                title: 'Download your source code',
                                uuid: '0436190d-e632-4b39-a233-1c6bb3b2ff18',
                                order_number: 11,
                                is_compulsory: 0,
                                created_at: '2021-01-21 20:48:22',
                                updated_at: '2022-01-24 12:49:20',
                                states: [],
                            },
                            {
                                id: 571,
                                lab_id: 16,
                                title: 'Survey',
                                uuid: '6754c335-2672-4bda-ae1d-6c90291e74e4',
                                order_number: 12,
                                is_compulsory: 1,
                                created_at: '2021-03-03 07:35:56',
                                updated_at: '2022-01-24 12:49:20',
                                states: [],
                            },
                            {
                                id: 596,
                                lab_id: 16,
                                title: 'Finalize your course',
                                uuid: '8f91e3f1-d893-4fd3-b601-8ef0d48203f0',
                                order_number: 13,
                                is_compulsory: 1,
                                created_at: '2021-03-03 07:35:57',
                                updated_at: '2022-01-24 12:49:20',
                                states: [],
                            },
                        ],
                    },
                },
            ],
        },
        auth: {
            user: {
                id: 4,
                firstname: 'George',
                lastname: 'Aramyan',
                certificate_name: null,
                email: 'george@araido.io',
                activated: 1,
                roles: [
                    'administrator',
                ],
            },
        },
        match: {
            params: {
                id: 2,
            },
        },
        getActiveCourse: jest.fn(() => Promise.resolve(true)),
        getJobProgress: jest.fn(() => Promise.resolve(true)),
    };

    const component = shallow(<TheoryAndLab {...testProps} />);
    it('updates state.progressLab if activeLab has status 0 and sets loadingCourse false', () => {
        const instance = component.instance();

        expect(instance.state.loadingCourse).toBe(false);
        expect(instance.state.progressLab).toBe(6);
    });
});
