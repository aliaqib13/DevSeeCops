import React from 'react';
import { shallow } from 'enzyme';
import PreviewSteps from './previewSteps';

const props = {
    chapters: [
        {
            title: 'Objectives',
            contentBlocks: [
                {
                    type: 'TitleBox',
                    content: {
                        image: '/img/secrets-mgmt/Ellips.svg',
                        subtitle: 'The objectives of this theory lab are twofold.',
                        title: 'Objectives',
                    },
                },
                {
                    type: 'GreyBox',
                    content: {
                        text: [
                            'First of all, we will familiarize you with the various secrets management concepts and best practices. It should be evident to you what secrets management means for scaling the DevOps productivity within the team.',
                            'By completing this theory lab, we will prepare you for a hands-on implementation of  secrets management concepts. After working through the content, you will be able to apply your knowledge and effectively implement secrets management concepts, workflow, and the applicable tooling in your current working environment.',
                        ],
                        titles: [
                            'Understanding Secret Management Concepts',
                            'Preparing for hands-on implementation',
                        ],
                        type: 'GreyBox',
                    },
                },
                {
                    type: 'LearningPath',
                    content: {
                        id: 1,
                    },
                },
            ],
        },
        {
            title: 'What is the benefit of  secrets management for your SDLC ?',
            contentBlocks: [
                {
                    type: 'TitleBox',
                    content: {
                        image: '/img/secrets-mgmt/Key.svg',
                        title: 'What is the benefit of  secrets management for your SDLC ?',
                    },
                },
            ],
        },
    ],
    completed_steps: [1, 2, 3],
    learningPaths: [
        {
            id: 1,
            resource_url: 'https://atp-resources.s3.eu-central-1.amazonaws.com/course-videos/ml4Oi4Gh9zcITadexGc4VEKKdAVVWLpT.mp4',
            title: 'Test title',
            description: 'Testing',
            courses: [{
                course: {
                    image: 'test',
                    title: 'Test',
                    description: 'Description',
                    labs: [
                        { id: 1 },
                    ],
                    activeCoursesMany: [
                        { user_id: 3, finished: 0 },
                    ],
                },
                course_id: 4,
                created_at: '2021-02-18 13:12:32',
                id: 3,
                learning_path_id: 3,
                updated_at: '2021-02-18 13:12:35',
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
};
describe('PreviewSteps', () => {
    let component;

    beforeEach(() => {
        component = shallow(<PreviewSteps {...props} />);
    });

    it('should render previewSteps component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render steps timeline successfully', () => {
        const stepsTimeline = component.find('.stepsTimeline');
        expect(stepsTimeline.exists()).toBeTruthy();
    });

    it('should reset Learning Path data after selecting step', () => {
        component.instance().setState({ videoVisible: [true] });
        expect(component.instance().state.videoVisible).toStrictEqual([true]);
        component.instance().selectStep(1);
        expect(component.instance().state.videoVisible).toStrictEqual([]);
    });
});
