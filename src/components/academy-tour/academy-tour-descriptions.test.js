import React from 'react';
import moment from 'moment';
import mockedGA from 'react-ga';
import { shallow } from 'enzyme';
import { AcademyTourDescriptions } from './academy-tour-descriptions';

jest.mock('react-ga', () => ({
    event: jest.fn(),
}));

const props = {
    introCourses: [{
        id: 1,
        title: 'Secrets Management for your applications',
        description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
        category_id: 1,
        category: {
            id: 1, name: 'Secrets Management', created_at: null, updated_at: null,
        },
        activeCourses: null,
    }, {
        id: 11,
        title: 'Threat Modeling for containers',
        description: 'Threat modeling for containers',
        category_id: 5,
        category: {
            id: 5, name: 'Threat Modeling', created_at: null, updated_at: null,
        },
        activeCourses: {
            course_id: 11,
            id: 1,
            finished: 1,
            updated_at: '2021-05-12 10:00:05',
        },
    }, {
        id: 15,
        title: 'Mobile Security',
        description: 'Mobile Security',
        category_id: 9,
        category: {
            id: 9, name: 'Mobile Security', created_at: null, updated_at: null,
        },
        activeCourses: null,
    }],
    activeCategory: 'Secrets Management for your applications',
    history: { push: jest.fn(() => Promise.resolve(true)) },
    createActiveIntroductionCourse: jest.fn(() => Promise.resolve(true)),
};
const globalIntroDesc = "Each DevSecOps category has a free introductory module that introduces you to the category and its common security issues. It also helps you to understand which learning paths, courses, and exams are available. The introduction modules contain very basic hands-on labs to help you to become familiar with how the academy's hands-on labs work and to get beginners started with applying DevSecOps practices in that category.";
const globalIntroTitle = 'Introduction Modules';

describe('AcademyTourDescriptions', () => {
    let component;

    beforeEach(() => {
        component = shallow(<AcademyTourDescriptions {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should render AcademyTourDescriptions successfully', () => {
        const title = component.find('.academy-tour-descriptions');
        expect(title.props().children[0].props.children[0].props.children).toEqual('Introduction Modules');
    });

    it('Should render global intro successfully', () => {
        const container = component.find('.academy-tour-descriptions');
        const globalIntro = container.props().children[0].props.children;
        expect(globalIntro[0].props.children).toBe(globalIntroTitle);
        expect(globalIntro[1].props.children).toBe(globalIntroDesc);
    });

    it('Should render intro block successfully', () => {
        const block = component.find('.block').at(0);
        const introTitle = block.props().children[0].props.children;
        const button = block.props().children[2].props;
        expect(introTitle).toBe(props.introCourses[0].title);
        const createActiveIntroductionCourseSpy = jest.spyOn(props, 'createActiveIntroductionCourse');
        button.onClick();
        expect(createActiveIntroductionCourseSpy).toHaveBeenCalledTimes(1);
        expect(button.children).toBe('Go To Module');

        const blockWithActiveCourse = component.find('.block').at(1);
        const introTitleWithActiveCourse = blockWithActiveCourse.props().children[0].props.children;
        const buttonWithActiveCourse = blockWithActiveCourse.props().children[2].props;
        const completedInfo = blockWithActiveCourse.props().children[3].props;
        expect(completedInfo.children[0].props.children.trim()).toBe('Completed on');
        expect(completedInfo.children[1].props.children.join('').trim())
            .toBe(moment(props.introCourses[1].activeCourses.updated_at).format('MMM Do YYYY'));
        expect(introTitleWithActiveCourse).toBe(props.introCourses[1].title);
        const historySpy = jest.spyOn(props.history, 'push');
        buttonWithActiveCourse.onClick();
        expect(historySpy).toHaveBeenCalledTimes(1);
        expect(buttonWithActiveCourse.children).toBe('Go To Module');
    });

    it('Should render as many blocks as intro courses', () => {
        const container = component.find('.academy-tour-descriptions');
        const introCount = props.introCourses.length;
        const { children } = container.props();
        const introModuleBlock = children[1];
        expect(introModuleBlock.length).toBe(introCount);
    });

    it('calls ReactGA event when clicking go to module button', () => {
        const button = component.find('.btn-go-module').first();

        button.simulate('click');

        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'course_selection',
            action: 'Introduction module lab created for',
            label: 'Secrets Management for your applications',
        });
    });
});
