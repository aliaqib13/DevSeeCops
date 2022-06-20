import React from 'react';
import { shallow } from 'enzyme';
import { EditCategory } from './EditCategory';

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
        category: {
            created_at: null,
            id: 1,
            name: 'Secrets Management',
            description: 'Test',
            updated_at: null,
        },
        match: { params: { id: 1 } },
        uploadVideo: jest.fn(() => Promise.resolve(true)),
        uploadImage: jest.fn(() => Promise.resolve(true)),
        createLearningPath: jest.fn(() => Promise.resolve(true)),
        editLearningPath: jest.fn(() => Promise.resolve(true)),
        deleteLearningPath: jest.fn(() => Promise.resolve(true)),
        getLearningPaths: jest.fn(() => Promise.resolve(true)),
        getIntroductionByCategory: jest.fn(() => Promise.resolve(true)),
        updateCategory: jest.fn(() => Promise.resolve(true)),
        history: { push: jest.fn(() => Promise.resolve(true)) },
        getCategory: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = shallow(<EditCategory {...props} />);
    });

    it('should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render heading successfully', () => {
        const heading = component.find('.categoryName');
        const { children } = heading.props();
        expect(children[1].props.children).toBe(props.category.name);
    });

    it('back arrow returns user to /platform/admin/categories/', () => {
        const heading = component.find('.categoryName');
        const { children } = heading.props();
        expect(children[0].props.type).toBe('left');
        const historySpy = jest.spyOn(props.history, 'push');
        children[0].props.onClick();
        expect(historySpy).toHaveBeenCalledTimes(1);
        expect(historySpy).toHaveBeenCalledWith('/platform/admin/categories');
    });

    it('should render inputs successfully', () => {
        const inputName = component.find('Input').at(0);
        expect(inputName.props().name).toBe('name');
        expect(component.state().name).toBe('');
        inputName.simulate('change', { target: { name: 'name', value: 'Test Name' } });
        expect(component.state().name).toBe('Test Name');

        const inputDescription = component.find('TextArea').at(0);
        expect(inputDescription.props().name).toBe('description');
        expect(component.state().description).toBe('');
        inputName.simulate('change', { target: { name: 'description', value: 'Test Description' } });
        expect(component.state().description).toBe('Test Description');

        const updateButton = component.find('Button');
        expect(updateButton.props().children[0]).toBe('Save');
        const updateCategory = jest.spyOn(props, 'updateCategory');
        updateButton.props().onClick();
        expect(updateCategory).toHaveBeenCalledTimes(1);
    });

    it('should render LearningPaths component successfully', () => {
        const learningPaths = component.find('LearningPaths');
        expect(learningPaths.exists()).toBeTruthy();
    });

    it('Should set new props and thus call UNSAFE_componentWillReceiveProps to update the state', () => {
        const receiveProps = jest.spyOn(EditCategory.prototype, 'UNSAFE_componentWillReceiveProps');
        const newCategory = {
            created_at: null,
            id: 2,
            name: 'Test',
            description: 'Test',
            updated_at: null,
        };
        component.setProps({ category: newCategory });
        expect(receiveProps).toHaveBeenCalledTimes(1);
        expect(component.instance().state.name).toBe(newCategory.name);
        expect(component.instance().state.description).toBe(newCategory.description);
    });
});
