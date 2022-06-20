import React from 'react';
import { shallow } from 'enzyme';
import CourseScenarioSelection from './CourseScenarioSelection';

const props = {
    courseScenarios: [{
        title: 'Test',
        category: {
            name: 'Test',
        },
        object: 'Test',

    }],
};

describe('CourseScenarioSelection', () => {
    let component;
    beforeEach(() => {
        component = shallow(<CourseScenarioSelection {...props} />);
    });

    it('Should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should render table with data successfully', () => {
        const firstROw = component.find('Row').at(0);
        const table = firstROw.props().children.props;
        expect(table.children.props.dataSource[0]).toBe(props.courseScenarios[0]);
    });

    it('Should render create from scratch button successfully', () => {
        const secondROw = component.find('Row').at(1);
        const button = secondROw.props().children.props;
        expect(button.htmlType).toBe('button');
        expect(button.children).toBe('Create From Scratch');
    });
});
