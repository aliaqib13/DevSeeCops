import React from 'react';
import { shallow } from 'enzyme';
import LearningPathSelectBox from './LearningPathSelectBox';

const props = {
    block: {
        type: 'LearningPath',
        content: {
            id: 1,
        },
    },
    learningPaths: [
        {
            id: 1,
            title: 'Test title',
        },
        {
            id: 2,
            title: 'Test title 2',
        },
    ],
    onChangeBlock: jest.fn(() => Promise.resolve(true)),
    index: 0,
};

describe('LearningPathSelectBox', () => {
    let component;

    beforeEach(() => {
        component = shallow(<LearningPathSelectBox {...props} />);
    });

    it('Should render component successfully', () => {
        expect(component.exists()).toEqual(true);
    });

    it('Should render `Select` and an `Option` for each learning path', () => {
        const select = component.find('Select');
        expect(select.exists()).toEqual(true);

        const options = component.find('Option');
        expect(options).toHaveLength(props.learningPaths.length);

        props.learningPaths.forEach((learningPath, index) => {
            const option = component.find('Option').at(index);
            expect(option.props().value).toBe(learningPath.id);
            expect(option.props().children).toBe(learningPath.title);
        });

        expect(component.state().content.id).toBe(1);
        select.simulate('change', 2);
        expect(component.state().content.id).toBe(2);
    });
});
