import React from 'react';
import { shallow } from 'enzyme';
import LearningPathsView from './learning-paths-view';

const props = {
    learningPaths: [{
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
    categories: [
        {
            id: 1, name: 'Secrets Management', created_at: null, updated_at: null,
        },
        {
            id: 2, name: 'Container Security', created_at: null, updated_at: null,
        },
        {
            id: 13, name: 'Static Application Security Testing', created_at: null, updated_at: null,
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
            id: 11, name: 'Serverless Security', created_at: null, updated_at: null,
        },
        {
            id: 12, name: 'Bugbounty Hunting', created_at: null, updated_at: null,
        },
        {
            id: 9, name: 'Mobile Security', created_at: null, updated_at: null,
        },
    ],
    notifyCourses: [],
    user: {
        id: 3,
    },
    createNotifyMe: jest.fn(),
};

describe('LearningPathsView', () => {
    let component;

    beforeEach(() => {
        component = shallow(<LearningPathsView {...props} />);
    });

    it('Should render LearningPathsView successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should render container', () => {
        const container = component.find('.container');
        expect(container.exists()).toBeTruthy();
    });

    it('Should svg`s g tag', () => {
        const gTag = component.find('g[id="SAST_Source"]');
        const spy = jest.spyOn(component.instance(), 'handleLearningPathCategory');
        gTag.props().onClick();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('Should render LearningPathCategory component', () => {
        component.setState({ category_id: 1 });
        const learningPathCategory = component.find('LearningPathCategory');
        expect(learningPathCategory.exists()).toBeTruthy();
    });
});
