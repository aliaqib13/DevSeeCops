import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Hints from './Hints';

describe('Hints', () => {
    let component;

    beforeEach(() => {
        component = shallow(<Hints />);
        component.setProps({ hints: [{ id: 5, course_id: 1, message: '<p>Test Hint</p>' }] });
    });

    it('Should render successfully', () => {
        const wrapper = component.find('.hints-container');
        expect(wrapper.exists()).toBeTruthy();
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Should show button for adding hints', () => {
        const button = component.find('.add-hint');
        expect(button.exists()).toBeTruthy();
    });

    it('Should open modal when Add Hint button clicked', () => {
        const button = component.find('.add-hint');
        button.simulate('click');
        expect(component.state().createModalVisible).toEqual(true);
    });

    it('Should render hints in the table', () => {
        expect(component.find('withStore(Table)').props().dataSource).toEqual([{ id: 5, course_id: 1, message: '<p>Test Hint</p>' }]);
    });

    it('Should open edit modal when Edit button clicked', () => {
        component.find('withStore(Table)').props().children[1].props.render('test', { message: 'test', id: 1 }).props.children[0].props.onClick();
        expect(component.state().editModalVisible).toEqual(true);
    });
});
