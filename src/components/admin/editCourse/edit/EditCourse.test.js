import React from 'react';
import { shallow } from 'enzyme';
import { EditCourse } from './EditCourse';
import { COURSE_STATUSES, COURSE_TYPE } from '../../../../constants';

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
    status: COURSE_STATUSES.PRODUCTION,
    type: COURSE_TYPE.STANDARD,
};
const testForm = {
    getFieldDecorator: jest.fn(opts => c => c),
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
    stepsImages: [],
    match: {
        params: {
            id: 1,
        },
    },
    isAdmin: true,
    exportCourseData: jest.fn(() => Promise.resolve({ course })),
    fetchStepsImages: jest.fn(() => Promise.resolve([])),
    form: testForm,
};

describe('EditCourse', () => {
    let component; let buttons_container; let top_action_buttons; let
        save_button;

    beforeEach(() => {
        component = shallow(<EditCourse {...props} />);
        buttons_container = component.find('.savePreviewContainer');
        top_action_buttons = component.find('.actions-top-block');
        save_button = buttons_container.childAt(0);
    });

    it('Should render top actions buttons', () => {
        expect(top_action_buttons.childAt(0).props().children[0]).toBe('Edit Preplab');
        expect(top_action_buttons.childAt(1).props().children[0]).toBe('Save');
        // expect(top_action_buttons.childAt(2).props().children[0]).toBe('Export JSON ')
    });
    //
    it('Should render save button successfully', () => {
        expect(save_button.exists()).toBeTruthy();
        expect(save_button.props().children[0]).toBe('Save');
    });

    it('should render linkedin url successfully', () => {
        const linkedin_url = component.find('.linkedin_url');
        expect(linkedin_url.exists()).toBeTruthy();
    });

    it('should change input and edit title in state', () => {
        const inpTitle = component.find('Input[name="title"]');
        inpTitle.props().onChange({ target: { name: 'title', value: 'TitleTest' } });
        const state = component.state();
        expect(state.title).toBe('TitleTest');
    });
});
