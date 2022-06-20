import React from 'react';
import { shallow } from 'enzyme';
import { message } from 'antd';
import { AdminSettings } from './adminSettings';
import { COURSE_STATUSES, COURSE_TYPE } from '../../../../constants';

const { INTRODUCTION, STANDARD, EXAM } = COURSE_TYPE;

jest.mock('antd', () => {
    const antd = jest.requireActual('antd');
    const messageANTD = {
        ...antd.message,
        error: jest.fn(),
        success: jest.fn(),
    };
    return {
        ...antd,
        message: messageANTD,
    };
});

const course = {
    id: 1,
    title: 'Secrets Management for your applications',
    description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
    information: {
        steps: 21,
        videos: 0,
        quizzes: 2,
    },
    course_is_for: null,
    required_exp: null,
    will_learn: null,
    preview_video: null,
    cert_badge: 0,
    version: '1.0.0',
    difficulty: 0,
    version_date: '2020-06-03',
    value_rating: 3.5,
    number_of_ratings: 12,
    enrolled_students: 800,
    content: 'At the end of this course you will know how to apply basic principles for secrets management for your applications',
    views: 1,
    image: '/img/sm.jpg',
    author: null,
    theory_duration: '15m',
    token_cost: 21,
    slug: 'secrets-management-for-your-applications',
    category_id: 1,
    created_at: '2020-05-25 16:35:44',
    updated_at: '2020-05-25 16:35:44',
    author_bio: null,
    author_pic: null,
    labs: [
        {
            id: 1,
            name: 'Secrets Management Java Application',
            slug: 'secrets-mgmt-java-aws',
            course_id: 1,
            signature_author_id: null,
            author_signature: null,
            platform: 'AWS',
            description: 'In this lab you will learn how to move hardcoded secrets in a Java SpringBoot application to Vault',
            available_time: '3m',
            max_hint_count: 5,
            hands_on_desc: 'This lab lets you choose a customized lab environment providing hands-on practices',
            hands_on_title: 'Hands on',
            created_at: '2020-05-25 16:35:46',
            updated_at: '2020-05-25 16:35:46',
            application_language: null,
        },
    ],
    category: {
        id: 1,
        name: 'Secrets Management',
        created_at: null,
        updated_at: null,
    },
    quizzes: [],
    authors: [],
    hints: [],
    faq: [],
    courseTags: [
        {
            id: 1, course_id: 1, title: 'js',
        },
        {
            id: 2, course_id: 1, title: 'pyton',
        },
    ],
    access_request: false,
    type: STANDARD,
    status: COURSE_STATUSES.PRODUCTION,
};

const props = {
    course,
    categories: [
        {
            id: 1,
            name: 'Secrets Management',
            created_at: null,
            updated_at: null,
        },
        {
            id: 2,
            name: 'Container Security',
            created_at: null,
            updated_at: null,
        },
        {
            id: 3,
            name: 'Application Security',
            created_at: null,
            updated_at: null,
        },
        {
            id: 4,
            name: 'ExamplePost Management',
            created_at: null,
            updated_at: null,
        },
        {
            id: 5,
            name: 'Threat Modeling',
            created_at: null,
            updated_at: null,
        },
        {
            id: 6,
            name: 'Cloud Security',
            created_at: null,
            updated_at: null,
        },
        {
            id: 7,
            name: 'Compliance as Code',
            created_at: null,
            updated_at: null,
        },
        {
            id: 8,
            name: 'Infra as Code',
            created_at: null,
            updated_at: null,
        },
        {
            id: 9,
            name: 'Mobile Security',
            created_at: null,
            updated_at: null,
        },
    ],
    statuses: [
        'Configuration', 'Development', 'Testing', 'Beta-test', 'Production',
    ],
    stepsImages: [],
    match: {
        params: {
            id: 1,
        },
    },
    isAdmin: true,
    exportCourseData: jest.fn(() => Promise.resolve({ course })),
    fetchStepsImages: jest.fn(() => Promise.resolve([])),
    checkIntroByCategory: jest.fn(() => Promise.resolve(true)),
    courseTypes: [INTRODUCTION, STANDARD, EXAM],
    mailFellows: jest.fn(() => Promise.resolve(true)),

};

describe('AdminSettings', () => {
    let component; let buttons_container; let top_action_buttons; let export_button; let
        save_button;

    beforeEach(() => {
        component = shallow(<AdminSettings {...props} />);
        buttons_container = component.find('.savePreviewContainer');
        top_action_buttons = component.find('.actions-top-block');
        export_button = buttons_container.childAt(1);
        save_button = buttons_container.childAt(0);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should render top actions buttons', () => {
        expect(top_action_buttons.childAt(0).props().children[0]).toBe('Export JSON');
    });

    it('Should render export button successfully', () => {
        expect(export_button).toHaveLength(1);
    });

    it('Should render save button successfully', () => {
        expect(save_button).toHaveLength(1);
        expect(save_button.props().children[0]).toBe('Save');
    });

    it('Should have "Export JSON " text in button', () => {
        expect(export_button.props().children[0]).toBe('Export JSON');
    });

    it('Should call exportCourseData function with proper course id when clicked export button', () => {
        export_button.simulate('click');
        expect(props.exportCourseData).toBeCalledTimes(1);
        expect(props.exportCourseData.mock.calls[0][0]).toBe(props.course.id);
    });

    it('should render access request toggle successfully', () => {
        const access_request = component.find('.access_request');
        expect(access_request).toHaveLength(1);
    });

    it('should render title of sections assigning tags to course', () => {
        const title = component.find('.courseDescriptionSection[title="Assign tags for this course"]');
        expect(title.find('Card').props().title).toEqual('Assign tags for this course');
    });

    it('should render lab steps in personal archive toggle successfully', () => {
        const lab_steps_in_personal_archive = component.find('.lab_steps_in_personal_archive');
        expect(lab_steps_in_personal_archive).toHaveLength(1);
    });

    it('should render select option for tags', () => {
        const selectComponent = component.find('.courseDescriptionSection[title="Assign tags for this course"]');
        expect(selectComponent.find('Select[mode="tags"]').exists()).toBe(true);
    });

    it('should render certificate of completion toggle successfully', () => {
        const certificate_of_completion = component.find('.certificate_of_completion');
        expect(certificate_of_completion).toHaveLength(1);
    });

    it('Should render Version date field with value passed by props', () => {
        const versionDateInput = component.find('PickerWrapper[name="version_date"]');
        expect(versionDateInput).toHaveLength(1);
        expect(versionDateInput.props().value._i).toBe(props.course.version_date);
    });

    it('Should render Value rating field this value passed by props', () => {
        const valueRating = component.find('Rate[name="value_rating"]');
        expect(valueRating).toHaveLength(1);
        expect(valueRating.props().value).toBe(props.course.value_rating);
    });

    it('Should render "Number of ratings" field successfully', () => {
        const numOfRatings = component.find('Input[name="number_of_ratings"]');
        expect(numOfRatings).toHaveLength(1);
        expect(numOfRatings.props().value).toBe(props.course.number_of_ratings);
    });

    it('Should render "Enrolled students" field with value passed by props', () => {
        const enrolledStudents = component.find('Input[name="enrolled_students"]');
        expect(enrolledStudents).toHaveLength(1);
        expect(enrolledStudents.props().value).toBe(props.course.enrolled_students);
        expect(enrolledStudents.props().placeholder).toBe('Enrolled students');
    });

    it('Should update value of "Enrolled students" when called onChange of the corresponding input', () => {
        const enrolledStudents = component.find('Input[name="enrolled_students"]');
        const newValue = 11;
        enrolledStudents.props().onChange({ target: { name: 'enrolled_students', value: newValue } });
        expect(component.find('Input[name="enrolled_students"]').props().value).toBe(newValue);
    });

    it('should have empty value if courseTags relation is empty', () => {
        const selectComponent = component.find('.courseDescriptionSection[title="Assign tags for this course"]');
        expect(selectComponent.find('Select[mode="tags"]').props().value[0]).toEqual(course.courseTags[0].title);
        expect(selectComponent.find('Select[mode="tags"]').props().value[1]).toEqual(course.courseTags[1].title);
    });

    it('Should render token cost successfully and check if token cost updated', () => {
        const tokenCostInput = component.find('Input').at(1);
        expect(component.state().token_cost).toBe(props.course.token_cost);
        tokenCostInput.simulate('change', { target: { name: 'token_cost', value: 42 } });
        expect(component.state().token_cost).toBe(42);
    });

    it('Should render statuses dropdown successfully', () => {
        const select = component.find('Select').at(0);
        expect(select.props().children.length).toBe(props.statuses.length);
        expect(component.state().status).toBe(course.status);
        select.simulate('change', props.statuses[2]);
        expect(component.state().status).toBe(props.statuses[2]);
    });

    it('Should render course types dropdown successfully', () => {
        const select = component.find('Select').at(1);
        expect(select.props().children.length).toBe(props.courseTypes.length);
        expect(component.state().type).toBe(course.type);
        select.simulate('change', INTRODUCTION);
        expect(component.state().type).toBe(INTRODUCTION);
    });

    it('Does not render a textarea for additional info when a course status is production or development', async () => {
        await component.setState({
            status: COURSE_STATUSES.PRODUCTION,
        });

        const { status } = component.state();
        expect(status).toBe(COURSE_STATUSES.PRODUCTION);

        const textarea = component.find('TextArea[name="additionalDesiredInfo"]');
        expect(textarea.exists()).toBe(false);

        await component.setState({
            status: COURSE_STATUSES.DEVELOPMENT,
        });

        const updatedStatus = component.state().status;
        expect(updatedStatus).toBe(COURSE_STATUSES.DEVELOPMENT);

        const updatedTextarea = component.find('TextArea[name="additionalDesiredInfo"]');
        expect(updatedTextarea.exists()).toBe(false);
    });

    it('Renders textarea for additional info when a course is desired', async () => {
        const textarea = component.find('TextArea[name="additionalDesiredInfo"]');
        expect(textarea.exists()).toBe(false);

        await component.setState({
            status: COURSE_STATUSES.DESIRED,
        });

        expect(component.find('TextArea[name="additionalDesiredInfo"]').exists()).toBe(true);
    });

    it('TextArea for additional desired info updates state on input', async () => {
        await component.setState({
            status: COURSE_STATUSES.DESIRED,
        });

        const textarea = component.find('TextArea[name="additionalDesiredInfo"]');
        await textarea.simulate('change', { target: { name: 'additionalDesiredInfo', value: 'test value' } });

        expect(component.state().additionalDesiredInfo).toBe('test value');
    });

    it('calls toggleUserCreateModal on clicking upload file button', () => {
        const button = component.find('.courseDescriptionContainer').props().children[4];

        expect(button.props.children).toEqual('Upload File');
        expect(component.state().adminUploadFileModalVisible).toBe(false);

        button.props.onClick();
        expect(component.state().adminUploadFileModalVisible).toBe(true);
    });

    it('toggles changeLabStepsInArchive when clicking lab_steps_in_personal_archive switch', () => {
        const switchToggle = component.find('.lab_steps_in_personal_archive');

        expect(switchToggle.props().className).toEqual('lab_steps_in_personal_archive');
        expect(component.state().lab_steps_in_personal_archive).toBe(false);

        switchToggle.props().onChange();
        expect(component.state().lab_steps_in_personal_archive).toBe(true);
    });

    it('toggles changeAccessRequest when clicking access_request switch', () => {
        const switchToggle = component.find('.access_request');

        expect(switchToggle.props().className).toEqual('access_request');
        expect(component.state().access_request).toBe(false);

        switchToggle.props().onChange();
        expect(component.state().access_request).toBe(true);
    });

    it('toggles changeCertificationInclude when clicking badge_of_certification switch', () => {
        const switchToggle = component.find('.badge_of_certification');

        expect(switchToggle.props().className).toEqual('badge_of_certification');
        expect(component.state().cert_badge).toBe(false);

        switchToggle.props().onChange();
        expect(component.state().cert_badge).toBe(true);
    });

    it('.sendMailFellows() returns message error `Title is required` if there is no title', async () => {
        const sendEmailElement = component.find('.send-email-container');
        const sendEmailBtn = sendEmailElement.find('Button');
        component.setState({
            notifyFellowData: { title: '', description: 'test', file: 'test' },
            mailFellowsLoading: false,
        });

        await sendEmailBtn.simulate('click');

        expect(message.error).toHaveBeenCalledWith('Title is required');
    });

    it('.sendMailFellows() returns message error `Description is required` if there is no Description', async () => {
        const sendEmailElement = component.find('.send-email-container');
        const sendEmailBtn = sendEmailElement.find('Button');
        component.setState({
            notifyFellowData: { title: 'test', description: '', file: 'test' },
            mailFellowsLoading: false,
        });

        await sendEmailBtn.simulate('click');

        expect(message.error).toHaveBeenCalledWith('Description is required');
    });

    it('.sendMailFellows() returns message success `Mail Success` the mail went through and been sent', async () => {
        const sendEmailElement = component.find('.send-email-container');
        const sendEmailBtn = sendEmailElement.find('Button');
        component.setState({
            notifyFellowData: { title: 'test', description: 'test', file: 'test' },
            mailFellowsLoading: false,
        });

        await sendEmailBtn.simulate('click');

        expect(message.success).toHaveBeenCalledWith('Mail Success');
        expect(component.state().notifyFellowData).toEqual({});
    });
});
