import React from 'react';
import { shallow } from 'enzyme';
import LearningPathCategory from './learning-path-category';
import { COURSE_STATUSES } from '../../constants';

const props = {
    category: {
        id: 1,
        name: 'Secrets Management',
    },
    introduction: {
        image: 'test',
        title: 'Test',
        description: 'Description',
    },
    learningPathCategory: [
        {
            id: 1,
            resource_url: 'https://atp-resources.s3.eu-central-1.amazonaws.com/course-videos/ml4Oi4Gh9zcITadexGc4VEKKdAVVWLpT.mp4',
            title: 'Test title',
            description: 'Testing',
            courses: [{
                course: {
                    id: 64,
                    title: 'DAST for your web application',
                    description: 'hjdgjhgsgh',
                    price: 0,
                    status: COURSE_STATUSES.PRODUCTION,
                    type: 'exam',
                    labs: [{
                        id: 72,
                    }, {
                        id: 73,
                    }, {
                        id: 74,
                    }],
                    activeCoursesMany: [{
                        id: 23,
                        course_id: 64,
                        user_id: 5,
                        theory_progress: null,
                        user_level: null,
                        created_at: '2021-03-03 12:13:22',
                        updated_at: '2021-03-03 12:13:22',
                        finished: 0,
                    }, {
                        id: 24,
                        course_id: 64,
                        user_id: 8,
                        theory_progress: null,
                        user_level: 'Advanced',
                        created_at: '2021-03-03 17:56:18',
                        updated_at: '2021-04-05 14:55:13',
                        finished: 0,
                    }],
                },
            }, {
                id: 2,
                learning_path_id: 1,
                course_id: 63,
                created_at: null,
                updated_at: null,
                course: {
                    id: 63,
                    title: 'Secrets Management for your applications from GS',
                    description: 'czczxcz',
                    status: COURSE_STATUSES.PRODUCTION,
                    type: 'standard',
                    labs: [],
                    activeCoursesMany: [{
                        id: 16,
                        course_id: 63,
                        user_id: 3,
                        theory_progress: null,
                        user_level: null,
                        created_at: '2021-01-26 12:05:19',
                        updated_at: '2021-01-26 12:05:19',
                        finished: 0,
                    }],
                },
            }, {
                id: 3,
                learning_path_id: 1,
                course_id: 1,
                created_at: null,
                updated_at: null,
                course: {
                    id: 1,
                    title: 'Secrets Management for your applications',
                    description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
                    status: COURSE_STATUSES.PRODUCTION,
                    type: 'exam',
                    labs: [{
                        id: 1,
                    }, {
                        id: 2,
                    }],
                    activeCoursesMany: [{
                        id: 11,
                        course_id: 1,
                        user_id: 3,
                        theory_progress: null,
                        user_level: 'Advanced',
                        created_at: '2020-12-24 15:59:59',
                        updated_at: '2021-02-22 18:35:10',
                        finished: 1,
                    }, {
                        id: 14,
                        course_id: 1,
                        user_id: 8,
                        theory_progress: null,
                        user_level: null,
                        created_at: '2020-12-25 18:10:52',
                        updated_at: '2020-12-25 18:10:52',
                        finished: 0,
                    }],
                },
            }, {
                id: 4,
                learning_path_id: 1,
                course_id: 15,
                created_at: null,
                updated_at: null,
                course: {
                    id: 15,
                    title: 'Mobile Security',
                    description: 'Mobile Security',
                    status: COURSE_STATUSES.DEVELOPMENT,
                    type: 'standard',
                    labs: [],
                    activeCoursesMany: [],
                },
            }],
            examCourse: {
                title: 'Test Exam Course',
            },
            category: {
                id: 1,
                name: 'Secrets Management',
            },
            introduction: {
                image: 'test',
                title: 'Test',
                description: 'Description',
            },
        },
    ],
    user: {
        id: 3,
    },
    createNotifyMe: jest.fn(),
};

describe('LearningPathCategory', () => {
    let component;

    beforeEach(() => {
        component = shallow(<LearningPathCategory {...props} />);
    });

    it('Should render LearningPathCategory successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should render heading successfully', () => {
        const h4 = component.find('h4');
        const child = h4.props().children;
        const heading = child.props.children;
        expect(heading).toBe(`${props.category.name} Learning Paths`);
    });

    it('Should render introduction successfully', () => {
        const intro = component.find('.intro-cont');
        const title = intro.props().children[0].props.children;
        const description = intro.props().children[1].props.children;
        expect(title).toBe(props.introduction.title);
        expect(description).toBe(props.introduction.description);
    });

    it('Should render learning paths successfully', () => {
        const learningPath = component.find('LearningPath');
        expect(learningPath.exists()).toBeTruthy();
    });

    it('Should render svg successfully', () => {
        const svg = component.find('svg');
        expect(svg.exists()).toBeTruthy();
        window.scrollTo = jest.fn();
        svg.props().onClick();
        expect(window.scrollTo).toBeCalled();
    });

    it('Should get labs count successfully', () => {
        const { getLabCount } = component.instance();
        const count = getLabCount(props.learningPathCategory[0].courses);
        expect(count).toBe(5);
    });
});
