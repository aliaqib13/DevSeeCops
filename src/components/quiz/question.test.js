import React from 'react';
import { shallow } from 'enzyme';
import Question from './question';

describe('Question', () => {
    let component; let componentSingle; const props = {
        disabled: false,
        questionIdx: 0,
        checkedAnswers: [],
        data: [{
            quiz_id: 1,
            id: 1,
            answer: 'Good',
        }],
        is_multiple: 1,
        onChange: jest.fn(() => Promise.resolve(true)),
    }; const
        propsSingle = {
            disabled: false,
            questionIdx: 0,
            checkedAnswers: [],
            data: [{
                quiz_id: 2,
                id: 2,
                answer: 'Good',
            }],
            is_multiple: 0,
            onChange: jest.fn(() => Promise.resolve(true)),
        };

    beforeEach(() => {
        component = shallow(<Question {...props} />);
        componentSingle = shallow(<Question {...propsSingle} />);
    });

    it('should render Question component successfully', () => {
        expect(component.exists()).toBeTruthy();
        expect(componentSingle.exists()).toBeTruthy();
    });

    it('should render Radio button successfully', () => {
        const list = componentSingle.find('List');
        const item = list.props().renderItem(props.data);
        const radio = item.props.children[1];
        expect(radio.key).toBe('radio');
        expect(radio.props.type).toBe('radio');
    });

    it('should render Checkbox successfully', () => {
        const list = component.find('List');
        const item = list.props().renderItem(props.data);
        const checkbox = item.props.children[1];
        expect(checkbox.key).toBe('checkbox');
    });
});
