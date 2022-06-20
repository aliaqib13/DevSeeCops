import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loading from './Loading';

describe('Loading', () => {
    let component;

    beforeEach(() => {
        component = shallow(<Loading />);
    });

    it('Should render successfully', () => {
        const wrapper = component.find('.loading-container');
        expect(wrapper.exists()).toBeTruthy();
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Should render Spin component', () => {
        const spin = component.find('Spin');
        expect(spin.exists()).toBeTruthy();
    });

    it('Should have tip "loading..."', () => {
        const spin = component.find('Spin');
        expect(spin.props().tip).toBe('Loading...');
    });
});
