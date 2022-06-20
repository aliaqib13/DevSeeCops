import React from 'react';
import { shallow } from 'enzyme';
import { CoursesGrid } from './CoursesGrid';
import { COURSE_STATUSES, COURSE_TYPE } from '../../constants';

describe('Courses Grid', () => {
    let component; let
        componentExam;
    const props = {
        user: {
            id: 1,
            activated: 1,
            email: 'dominik@araido.io',
            firstname: 'Dominik',
            is_fellow: 1,
            lastname: 'de Smit',
            roles: ['administrator'],
        },
        courses: [
            {
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
                price: 100.99,
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
            },
        ],
    };

    const propsExam = { ...props };
    propsExam.courses = JSON.parse(JSON.stringify(props.courses));
    propsExam.courses[0].type = COURSE_TYPE.EXAM;

    beforeEach(() => {
        component = shallow(<CoursesGrid {...props} />);
        componentExam = shallow(<CoursesGrid {...propsExam} />);
    });

    it('should render courses grid component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should not render exam icon if course type is not exam', () => {
        const list = component.find('List');
        expect(list.props().dataSource).toEqual(props.courses);
        const listItem = list.props().renderItem(props.courses[0]);
        const { extra } = listItem.props.children.props;
        expect(extra.props.children[1].props.children[0]).toEqual(false);
    });

    it('should render exam icon if course type is exam', () => {
        const list = componentExam.find('List');
        expect(list.props().dataSource).toEqual(propsExam.courses);
        const listItem = list.props().renderItem(propsExam.courses[0]);
        const { extra } = listItem.props.children.props;
        const icon = extra.props.children[1].props.children[0].props.children.props;
        expect(icon.type).toEqual('file-done');
        expect(icon.className).toEqual('course-type-icon');
    });
});
