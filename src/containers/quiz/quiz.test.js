import React from 'react';
import { shallow } from 'enzyme';
import { Quiz } from './quiz';
import { COURSE_TYPE } from '../../constants';

describe('Quiz', () => {
    let component;
    const props = {
        location: { state: { course_id: 1 } },
        match: { params: { id: 1 } },
        history: { push: jest.fn() },
        quiz: {
            attempts: 1,
            questions: [],
            courseType: COURSE_TYPE.STANDARD,
        },
        clearQuizStore: jest.fn(() => Promise.resolve(true)),
        fetchQuizzes: jest.fn(() => Promise.resolve(true)),
        saveAnswers: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = shallow(<Quiz {...props} />);
    });

    it('should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render the modal content considering the course type', () => {
        let result = component.find('Result');
        expect(result.props().extra[0].props.children).toBe('Go to Course');
        expect(result.props().extra[1].props.children).toBe('Go to My Achievements');
        expect(result.props().subTitle)
            .toBe("You have been granted a badge for completing this preparation lab. Check it out on 'My Achievements'!");
        const propsIntro = { ...props };
        propsIntro.quiz.courseType = COURSE_TYPE.INTRODUCTION;
        const componentIntro = shallow(<Quiz {...propsIntro} />);
        expect(componentIntro.exists()).toBeTruthy();
        result = componentIntro.find('Result');
        expect(result.props().extra[0].props.children).toBe('Go back to Introduction Module');
        expect(result.props().extra[1]).toBe(false);
        expect(result.props().subTitle).toBe('You completed the quiz for the preparation lab of this Introduction Module');
    });
});
