import React from 'react';
import { shallow } from 'enzyme';
import Quiz from './Quiz';

describe('Quiz', () => {
    let component;
    const props = {
        quizzes: [
            {
                question: 'test1',
                answer: 'test1',
                order_number: 1,
            },
            {
                question: 'test2',
                answer: 'test2',
                order_number: 2,
            },
            {
                question: 'test3',
                answer: 'test3',
                order_number: 3,
            },
        ],
    };

    beforeEach(() => {
        const propsCopy = JSON.parse(JSON.stringify(props)); // give a copy of the props each time to stop tests modifying them
        component = shallow(<Quiz {...propsCopy} />);
    });

    it('should render Quiz component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('changePosition() should be change quiz position', () => {
        const index = 0;
        const instance = component.instance();
        const changePosBtn = component.find('.change-pos-btn');
        expect(changePosBtn.exists()).toBeTruthy();

        // Check the initial state
        expect(component.state().quizzes[index].question).toBe('test1');
        expect(component.state().quizzes[index].order_number).toBe(1);

        // Move the first question down one position
        instance.changePosition(index, 'down');
        expect(component.state().quizzes[index].question).toBe('test2');
        expect(component.state().quizzes[index].order_number).toBe(1);
        expect(component.state().quizzes[index + 1].question).toBe('test1');
        expect(component.state().quizzes[index + 1].order_number).toBe(2);
    });

    it('changePosition() will not change position up of at the top already', () => {
        const index = 0;
        const instance = component.instance();
        const changePosBtn = component.find('.change-pos-btn');
        expect(changePosBtn.exists()).toBeTruthy();

        // Check the initial state
        expect(component.state().quizzes[index].question).toBe('test1');
        expect(component.state().quizzes[index].order_number).toBe(1);

        // Move the first question down one position
        instance.changePosition(index, 'up');
        expect(component.state().quizzes[index].question).toBe('test1');
        expect(component.state().quizzes[index].order_number).toBe(1);
    });

    it('changePosition () will not change position down of at the end already', () => {
        const index = props.quizzes.length - 1;
        const instance = component.instance();
        const changePosBtn = component.find('.change-pos-btn');
        expect(changePosBtn.exists()).toBeTruthy();

        // Check the initial state
        expect(component.state().quizzes[index].question).toBe('test3');
        expect(component.state().quizzes[index].order_number).toBe(3);

        // Move the first question down one position
        instance.changePosition(index, 'down');
        expect(component.state().quizzes[index].question).toBe('test3');
        expect(component.state().quizzes[index].order_number).toBe(3);
    });
});
