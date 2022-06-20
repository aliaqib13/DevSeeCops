import React from 'react';
import { shallow } from 'enzyme';
import LearningPaths from './LearningPaths';

describe('LearningPaths', () => {
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
        categories: [
            {
                id: 1, name: 'Secrets Management', created_at: null, updated_at: null,
            },
            {
                id: 2, name: 'Container Security', created_at: null, updated_at: null,
            },
            {
                id: 3, name: 'Application Security', created_at: null, updated_at: null,
            },
            {
                id: 4, name: 'Vulnerability Management', created_at: null, updated_at: null,
            },
            {
                id: 5, name: 'Threat Modeling', created_at: null, updated_at: null,
            },
            {
                id: 6, name: 'Cloud Security', created_at: null, updated_at: null,
            },
            {
                id: 7, name: 'Compliance as Code', created_at: null, updated_at: null,
            },
            {
                id: 8, name: 'Infra as Code', created_at: null, updated_at: null,
            },
            {
                id: 9, name: 'Mobile Security', created_at: null, updated_at: null,
            },
        ],
        introCourses: [{
            category: {
                created_at: null,
                id: 1,
                name: 'Secrets Management',
                updated_at: null,
            },
            category_id: 1,
            description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
            id: 2,
            title: 'Secrets Management in CI/CD',
        }],
        courses: [{
            category: {
                created_at: null,
                id: 1,
                name: 'Secrets Management',
                updated_at: null,
            },
            category_id: 1,
            description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
            id: 1,
            title: 'Secrets Management for your applications',
        }],
        examCourses: [{
            category: {
                created_at: null,
                id: 1,
                name: 'Secrets Management',
                updated_at: null,
            },
            category_id: 1,
            description: 'Storing & managing your secrets in a safe way by using HashiCorp Vault in Kubernetes',
            id: 3,
            title: 'Secrets Management in Kubernetes',
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
        uploadVideo: jest.fn(() => Promise.resolve(true)),
        createLearningPath: jest.fn(() => Promise.resolve(true)),
        editLearningPath: jest.fn(() => Promise.resolve(true)),
        deleteLearningPath: jest.fn(() => Promise.resolve(true)),
        getLearningPaths: jest.fn(() => Promise.resolve(true)),
        getIntroductionByCategory: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = shallow(<LearningPaths {...props} />);
    });

    it('should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render title successfully', () => {
        const title = component.find('Title');
        expect(title.props().children).toBe('Learning Paths');
    });

    it('should render create button successfully', () => {
        const button = component.find('Button');
        expect(button.props().children).toBe('Create');
        expect(component.instance().state.visible).toBe(false);
        expect(component.instance().state.type).toBe('edit');
        button.props().onClick();
        expect(component.instance().state.visible).toBe(true);
        expect(component.instance().state.type).toBe('create');
    });

    it('should render table successfully', () => {
        const table = component.props().children[2];
        expect(table.props.dataSource).toBe(props.learningPaths);
    });

    it('should render columns successfully', () => {
        const title = component.find('Column[title="Title"]');
        expect(title.props().dataIndex).toBe('title');

        const description = component.find('Column[title="Description"]');
        expect(description.props().dataIndex).toBe('description');

        const actions = component.find('Column[title="Actions"]');
        const { overlay } = actions.props().render(props.learningPaths[0]).props;
        const spyOpenEditModal = jest.spyOn(component.instance(), 'openEditModal');
        overlay.props.children[0].props.onClick();
        expect(spyOpenEditModal).toBeCalledTimes(1);
        const spyDelete = jest.spyOn(component.instance(), 'delete');
        overlay.props.children[1].props.onClick();
        expect(spyDelete).toBeCalledTimes(1);
    });

    it('should render LearningPathEdit component successfully', () => {
        const learningPathEdit = component.find('LearningPathEdit');
        expect(learningPathEdit.exists()).toBeTruthy();
    });
});
