import React from 'react';
import { shallow } from 'enzyme';
import LearningPath from './LearningPath';
import { COURSE_STATUSES } from '../../constants';

const props = {
    getLearningPath: jest.fn(() => Promise.resolve(true)),
    createCertificateOfProgress: jest.fn(() => Promise.resolve(true)),
    preferences: {
        content: {
            category: ['Secure Coding', 'Threat Modeling', 'Container Security', 'Compliance as Code', 'Secrets Management'],
        },
        userCourseTags: [{
            id: 1,
            title: 'Test',
            pivot: {
                tag_id: 1,
                user_id: 3,
            },
        }],
    },
    user: {
        id: 3,
        firstname: 'Henry',
        lastname: 'Tovmasyan',
        certificate_name: 'Henry Tovmasyan',
        email: 'henry@araido.io',
        activated: 1,
        coordinator: null,
        created_at: '2020-06-08 15:11:52',
        updated_at: '2020-06-22 14:15:30',
        roles: [
            {
                id: 1,
                slug: 'administrator',
                name: 'Administrator',
                description: 'manage administration privileges',
                created_at: '2020-06-08 15:11:52',
                updated_at: '2020-06-08 15:11:52',
                pivot: {
                    role_id: 1,
                    user_id: 3,
                },
            },
        ],
    },

};

const state = {
    coursesCompleted: [{
        id: 6,
        course_id: 7,
        user_id: 3,
        user_level: 'Advanced',
        course: {
            id: 7,
            title: 'Automated SAST in CI/CD',
            description: 'Finding the application security issues in your source code',
            information: null,
            course_is_for: null,
            required_exp: null,
            will_learn: null,
            preview_video: null,
            cert_badge: 0,
            version: '1.0.0',
            difficulty: 0,
            content: 'At the end of this course you will know how to properly perform SAST in your organization',
            views: 0,
            image: 'https://previews.123rf.com/images/cnapsys/cnapsys1204/cnapsys120400101/13370694-computer-code-bug.jpg',
            author: null,
            theory_duration: '15m',
            price: 100.99,
            status: COURSE_STATUSES.DEVELOPMENT,
            slug: 'sast',
            linkedIn_url: null,
            category_id: 3,
            created_at: '2020-10-16 10:27:12',
            updated_at: '2020-10-16 10:27:12',
            author_bio: null,
            version_date: null,
            value_rating: null,
            number_of_ratings: null,
            enrolled_students: null,
            certificate_of_completion: 1,
            lab_steps_in_personal_archive: 1,
            author_pic: null,
            publicly_visible: 0,
            stripe_product_id: null,
            stripe_price_id: null,
        },
        certificate: {
            id: 2,
            course_id: 7,
            uuid: '07396817-22ed-412e-8d6c-0481636df0a2',
            type: 'completion',
            image: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/certificates/certificate_of_Henry_Tovmasyan_7b1b35d4-9299-4ea5-a323-b80869802e8f.png',
            badge: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/certificates/badge_of_theory_7b1b35d4-9299-4ea5-a323-b80869802e8f.png',
            lab_name: 'Secrets Management in Kubernetes',
            difficulty: 'V1.0.0',
            platform: null,
            user_id: 3,
            created_at: '2020-10-19 13:08:14',
            updated_at: '2020-10-19 13:08:14',
            cert_info: [Object],
        },
        activeLabs: [
            {
                active_course_id: 5,
                created_at: '2020-10-19 11:07:35',
                duration: 3,
                hint_is_open: null,
                id: 2,
                lab_end_at: 1603102055,
                lab_id: 4,
                max_hint_count: 2,
                progress: 'Done',
                start_time: '2020-10-19T07:07:35.000Z',
                status: 1,
                total_spin_up_time: 15625655,
                total_spin_ups: 1,
                updated_at: '2020-10-19 13:06:59',
                user_id: 3,
            }],
    }],
    recommendedCourses: [
        {
            id: 1,
            title: 'Secrets Management for your applications',
            category_id: 1,
            theory_duration: '15m',
            slug: 'secrets-management-for-your-applications',
            image: '/img/sm.jpg',
            status: COURSE_STATUSES.PRODUCTION,
        },
    ],

};

describe('LearningPath', () => {
    let component;

    beforeEach(() => {
        component = shallow(<LearningPath {...props} />);
    });

    it('Should render LearningPath successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should render Table successfully', () => {
        component.instance().setState({ coursesCompleted: state.coursesCompleted });
        const cont = component.find('.learning-path-container');
        const table = cont.props().children[3].props.children[1];
        expect(table.props.dataSource).toBe(state.coursesCompleted);
    });

    it('Should render create certificate modal successfully', () => {
        component.instance().setState({ showModal: true });
        const cont = component.find('.learning-path-container');
        const modal = cont.props().children[1];
        expect(modal.props.visible).toBe(true);
    });
});
