import React from 'react';
import { shallow } from 'enzyme';
import { message } from 'antd';
import LearningPathEdit from './LearningPathEdit';

jest.mock('antd', () => {
    const antd = jest.requireActual('antd');
    const messageANTD = {
        ...antd.message,
        error: jest.fn(),
    };
    return {
        ...antd,
        message: messageANTD,
    };
});

describe('LearningPathEdit', () => {
    let component;
    const props = {
        visible: true,
        closeModal: jest.fn(() => Promise.resolve(true)),
        learningPath: [{
            id: 9,
            title: 'TTTT',
            description: 'test',
            category_id: 1,
            introduction_course_id: 5,
            exam_course_id: 4,
            resource_url: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/learning-paths/video.mp4',
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
        typeOfAction: 'edit',
        id: 1,
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
        category: {
            created_at: null,
            id: 1,
            name: 'Secrets Management',
            updated_at: null,
        },
        uploadVideo: jest.fn(() => Promise.resolve(true)),
        uploadImage: jest.fn(() => Promise.resolve(true)),
        createLearningPath: jest.fn(() => Promise.resolve(true)),
        editLearningPath: jest.fn(() => Promise.resolve(true)),
        deleteLearningPath: jest.fn(() => Promise.resolve(true)),
        getLearningPaths: jest.fn(() => Promise.resolve(true)),
        getIntroductionByCategory: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = shallow(<LearningPathEdit {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render inputs successfully', () => {
        const form = component.find('Form');
        const { children } = form.props();
        expect(children[0].props.children.props.name).toBe('title');
        expect(children[1].props.children.props.name).toBe('description');

        const inputCategory = component.find('Input').at(2);
        expect(inputCategory.props().value).toBe(props.category.name);

        const selectExam = component.find('Select').at(0);
        expect(selectExam.props().children.length).toBe(props.examCourses.length);
        expect(component.state().exam_course_id).toBe('');
        selectExam.simulate('change', 3);
        expect(component.state().exam_course_id).toBe(3);

        const selectCourse = component.find('Select').at(1);
        expect(selectCourse.props().children.length).toBe(props.courses.length);
        expect(component.state().selected_courses_titles).toStrictEqual([]);
        selectCourse.simulate('select', 'Secrets Management for your applications');
        expect(component.state().selected_courses_titles).toStrictEqual(['Secrets Management for your applications']);

        const selectResourceType = component.find('Select').at(2);
        expect(selectResourceType.props().children.length).toBe(2);
        expect(component.state().resource_type).toBe('image');
        selectResourceType.simulate('change', 'video');
        expect(component.state().resource_type).toBe('video');
    });

    it('should render video modal successfully', () => {
        const videoModal = component.find('Modal').at(1);
        expect(videoModal.exists()).toBeTruthy();
        videoModal.props().onCancel();
    });

    it('.isValidData() should check whether the data has all the required fields', () => {
        const data = {
            title: 'Test',
            description: 'Test desc',
            exam_course_id: 1,
        };
        let isValid = component.instance().isValidData(data);
        expect(isValid).toBe(true);
        data.description = '';
        isValid = component.instance().isValidData(data);
        expect(isValid).toBe(false);
    });

    it('.edit() should handle the edition of event', () => {
        const data = {
            title: 'Test',
            description: 'Test desc',
            exam_course_id: 1,
        };
        component.instance().setState(data);
        component.instance().edit();
        expect(props.editLearningPath).toHaveBeenCalledTimes(1);
    });

    it('.edit() will not edit learning path data if supplied data is incomplete', () => {
        const data = {
            title: 'Test',
            description: '',
            exam_course_id: 1,
        };
        component.instance().setState(data);
        component.instance().edit();
        expect(props.editLearningPath).toHaveBeenCalledTimes(0);
        expect(message.error).toHaveBeenCalledWith('Please fill in all the data');
    });
});
