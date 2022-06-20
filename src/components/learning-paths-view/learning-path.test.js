import React from 'react';
import mockedGA from 'react-ga';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import LearningPath from './learning-path';
import { COURSE_STATUSES, COURSE_TYPE } from '../../constants';

jest.mock('react-ga', () => ({
    event: jest.fn(),
}));

const props = {
    item: {
        id: 1,
        resource_url: 'https://atp-resources.s3.eu-central-1.amazonaws.com/course-videos/ml4Oi4Gh9zcITadexGc4VEKKdAVVWLpT.mp4',
        title: 'Test title',
        description: 'Testing',
        courses: [{
            id: 64,
            title: 'DAST for your web application',
            description: 'hjdgjhgsgh',
            price: 0,
            status: COURSE_STATUSES.PRODUCTION,
            type: COURSE_TYPE.STANDARD,
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
        }, {
            id: 63,
            title: 'Secrets Management for your applications from GS',
            description: 'czczxcz',
            status: COURSE_STATUSES.PRODUCTION,
            type: COURSE_TYPE.STANDARD,
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
        }, {
            id: 1,
            title: 'Secrets Management for your applications',
            description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
            status: COURSE_STATUSES.PRODUCTION,
            type: COURSE_TYPE.STANDARD,
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

        }, {
            id: 15,
            title: 'Mobile Security',
            description: 'Mobile Security',
            status: COURSE_STATUSES.DEVELOPMENT,
            type: COURSE_TYPE.STANDARD,
            labs: [],
            activeCoursesMany: [],

        }, {
            id: 16,
            title: 'Mobile Security Test',
            description: 'Mobile Security test',
            status: COURSE_STATUSES.DEVELOPMENT,
            type: COURSE_TYPE.STANDARD,
            plannedCourses: {
                id: 1,
                user_id: 3,
                course_id: 16,
            },
            labs: [],
            activeCoursesMany: [],
        },
        ],
        examCourse: {
            title: 'Test Exam Course',
            id: 14,
            description: 'Test Exam Desc',
            status: COURSE_STATUSES.DEVELOPMENT,
            type: COURSE_TYPE.EXAM,
            labs: [],
            activeCoursesMany: [],
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
    visible: true,
    modalVisible: false,
    handleVideo: jest.fn(() => Promise.resolve(true)),
    handleBlock: jest.fn(() => Promise.resolve(true)),
    getLabCount: () => props.item.courses[0].labs.length,
    createNotifyMe: jest.fn(() => Promise.resolve(true)),
    getPlannedCourses: jest.fn(() => Promise.resolve({
        notifyCourses: [
            { course_id: 64 },
            { course_id: 16 },
        ],
    })),
    notifyCourses: [
        { course_id: 16 },
    ],
    user: {
        id: 3,
    },
    index: 0,
};

function tick() {
    return new Promise(resolve => {
        setTimeout(resolve, 0);
    });
}

describe('LearningPath', () => {
    let component;

    beforeEach(() => {
        component = shallow(<LearningPath {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should render LearningPathCategory successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should render learning path successfully', () => {
        const collapse = component.find('Collapse');
        const learningPath = component.find('.learning-path');
        const mainDesc = component.find('.main-description');
        const modal = learningPath.find('Modal');

        expect(collapse).toBeTruthy();
        const { children } = collapse.props();
        const headerChildren = children.props.header.props.children;
        expect(headerChildren.props.children[0].props.children).toBe(props.item.title);
        expect(headerChildren.props.children[1].props.children).toBe(props.item.description);
        expect(modal.exists()).toBe(true);

        const list = mainDesc.props().children[0].props.children[0].props;

        const list1 = list.children[0];
        const list2 = list.children[1];
        const list3 = list.children[2];
        const listValue = list1.props.children;
        const list2Value = list2.props.children;
        const list3Value = list3.props.children;
        expect(listValue).toBe(`Number of courses - ${props.item.courses.length}`);
        expect(list2Value).toBe(`Number of practitioner labs - ${props.item.courses[0].labs.length}`);
        expect(list3Value).toBe(`Exam - ${props.item.examCourse.title}`);

        const videoCont = component.find('.video-cont');
        const video = videoCont.props().children.props.children[1];
        const source = video.props.children[0];
        expect(video.type).toBe('video');
        expect(source.props.type).toBe('video/mp4');
        expect(source.props.src).toBe(props.item.resource_url);

        const videoPlayArrow = component.find('.video-play-arrow');
        expect(videoPlayArrow).toBeTruthy();
        videoPlayArrow.props().onClick();
        expect(props.handleVideo).toBeCalled();
    });

    it('Should render buttons successfully', () => {
        const mainDesc = component.find('.main-description');
        const courseConts = mainDesc.props().children[2].props.children;
        const but1 = courseConts[0].props.children[1].props.children[2].props.children[0].props.children.props.children;
        const but2 = courseConts[1].props.children[1].props.children[2].props.children[0].props.children.props.children;
        const but3 = courseConts[2].props.children[1].props.children[2].props.children[0].props.children.props.children;
        const but4 = courseConts[3].props.children[1].props.children[2].props.children[0].props.children;
        const but5 = courseConts[3].props.children[1].props.children[2].props.children[1].props.children;
        const but6 = courseConts[4].props.children[1].props.children[2].props.children[1].props.children;
        expect(but1).toBe('Explore');
        expect(but2).toBe('Resume');
        expect(but3).toBe('Revisit');
        expect(but4).toBe('Planned');
        expect(but5).toBe('Notify me');
        expect(but6).toBe('Interest Registered');
    });

    it('calls ReactGA event on explore button', () => {
        const mainDesc = component.find('.main-description');
        const courseConts = mainDesc.props().children[2].props.children;
        const exploreBtn = courseConts[0].props.children[1].props.children[2].props.children[0];

        expect(exploreBtn.props.children.props.children).toBe('Explore');

        exploreBtn.props.onClick();

        expect(mockedGA.event).toHaveBeenCalledTimes(1);
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'course_selection',
            action: 'Clicked on DAST for your web application learning path',
            label: 'explore: DAST for your web application',
        });
    });

    it('does not call ReactGA event on Resume, Revisit or Planned buttons', () => {
        const mainDesc = component.find('.main-description');
        const courseConts = mainDesc.props().children[2].props.children;
        const resumeBtn = courseConts[1].props.children[1].props.children[2].props.children[0];
        const revisitBtn = courseConts[2].props.children[1].props.children[2].props.children[0];
        const plannedBtn = courseConts[3].props.children[1].props.children[2].props.children[0];

        expect(resumeBtn.props.children.props.children).toBe('Resume');
        expect(revisitBtn.props.children.props.children).toBe('Revisit');
        expect(plannedBtn.props.children).toBe('Planned');

        const buttons = [resumeBtn, revisitBtn, plannedBtn];
        buttons.forEach(button => button.props.onClick());

        expect(mockedGA.event).toHaveBeenCalledTimes(0);
    });

    it('Notify me button should work successfully', async () => {
        const mainDesc = component.find('.main-description');
        const courseConts = mainDesc.props().children[2].props.children;
        const { notifyCourses } = component.instance().props;
        expect(notifyCourses.length).toBe(1);
        courseConts[3].props.children[1].props.children[2].props.children[1].props.onClick();
        await tick();
        expect(props.createNotifyMe).toBeCalled();
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'course_selection',
            action: 'Clicked on Mobile Security learning path',
            label: 'clicked on "notify me"',
        });
    });

    it('Should render courses contents successfully', () => {
        const courseCont = component.find('.courses-cont');
        const coursesToBeShown = props.item.courses.concat({ ...props.item.examCourse }).length;
        expect(courseCont).toHaveLength(coursesToBeShown);
    });

    it('Should render tootlip and exam icon successfully', () => {
        const examIcon = component.find('Icon').at(1);
        expect(examIcon).toBeTruthy();
        expect(examIcon.props().type).toBe('file-done');
        const tootlip = component.find('Tooltip');
        expect(tootlip.props().title).toBe('Professional Exam');
        expect(tootlip.props().children.props.type).toBe(examIcon.props().type);
    });

    it('Can render correctly without the `notifyCourses` prop', () => {
        const testProps = {
            ...props,
        };
        delete testProps.notifyCourses;

        // We have to full mount the component to make sure it's all rendered
        const uut = mount(
            <MemoryRouter>
                <LearningPath {...testProps} />
            </MemoryRouter>,
        );

        expect(uut.exists()).toBeTruthy();
    });

    it('Does not render notify me buttons if `notifyCourses` prop is undefined', () => {
        const testProps = {
            ...props,
        };
        delete testProps.notifyCourses;

        // We have to full mount the component to make sure it's all rendered
        const uut = mount(
            <MemoryRouter>
                <LearningPath {...testProps} />
            </MemoryRouter>,
        );

        // No "interest registered" button
        const interestRegisteredButtons = uut.find('.course-interest-registered');
        expect(interestRegisteredButtons).toHaveLength(0);
        // No "notify me" button
        const courseNotifyButton = uut.find('.course-notify-me');
        expect(courseNotifyButton).toHaveLength(0);
    });
});
