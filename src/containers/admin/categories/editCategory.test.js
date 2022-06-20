import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { EditCategory } from './editCategory';

describe('EditCategory', () => {
    let component;
    const props = {
        learningPaths: [{
            id: 9,
            title: 'TTTT',
            description: 'test',
            category_id: 1,
            introduction_course_id: 5,
            exam_course_id: 4,
            resource_url: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/learning-paths/FCPxnqd3ufSJqBvHEotvmDTfBTb68f3a.png',
            created_at: '2021-03-29 14:11:04',
            updated_at: '2021-03-29 15:04:16',
            introduction: { id: 5, title: 'Runtime Container Security', description: 'Keeping an eye on your running containers' },
            category: {
                id: 1, name: 'Secrets Management', created_at: null, updated_at: null,
            },
            courses: [{
                id: 27, learning_path_id: 9, course_id: 6, created_at: '2021-03-29 14:11:04', updated_at: '2021-03-29 14:11:04', course: { id: 6, title: 'Building Secure Container Images', description: 'Building secure container images' },
            }],
        }],
        introByCategory: {
            category_id: 1,
            description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
            id: 2,
            title: 'Secrets Management in CI/CD',
        },
        category: {
            created_at: null,
            id: 1,
            name: 'Secrets Management',
            updated_at: null,
        },
        coursesGroupedByTypes: {
            standard: [{
                category_id: 2,
                description: 'Storing & managing your secrets in a safe way by using HashiCorp Vault in Kubernetes',
                id: 2,
                title: 'Container Security',
            }],
            exam: [{
                category_id: 3,
                description: 'Storing & managing your secrets in a safe way by using HashiCorp Vault in Kubernetes',
                id: 3,
                title: 'Secrets Management in Kubernetes',
            }],
        },
        match: { params: { id: 1 } },
        uploadFileFunc: jest.fn(() => Promise.resolve(true)),
        createLearningPathFunc: jest.fn(() => Promise.resolve(true)),
        editLearningPathFunc: jest.fn(() => Promise.resolve(true)),
        deleteLearningPathFunc: jest.fn(() => Promise.resolve(true)),
        getLearningPathsFunc: jest.fn(() => Promise.resolve(true)),
        getIntroductionByCategoryFunc: jest.fn(() => Promise.resolve(true)),
        updateCategoryFunc: jest.fn(() => Promise.resolve(true)),
        history: { push: jest.fn(() => Promise.resolve(true)) },
        getCategoryFunc: jest.fn(() => Promise.resolve(true)),
        fetchCoursesGroupedByTypesFunc: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = mount(<MemoryRouter><EditCategory {...props} /></MemoryRouter>);
    });

    it('should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render editCourseContainer successfully', () => {
        const editCourseContainer = component.find('.editCourseContainer');
        expect(editCourseContainer.exists()).toBeTruthy();
    });

    it('should render without error event if courses grouped by type are missing', () => {
        props.coursesGroupedByTypes.standard = null;
        props.coursesGroupedByTypes.exam = null;
        component = mount(<MemoryRouter><EditCategory {...props} /></MemoryRouter>);
        expect(component.exists()).toBeTruthy();
    });
});
