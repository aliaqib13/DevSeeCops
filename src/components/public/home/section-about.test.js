import React from 'react';
import { shallow } from 'enzyme';
import SectionAbout from './SectionAbout';

describe('SectionAbout', () => {
    let component;
    beforeEach(() => {
        component = shallow(<SectionAbout />);
    });

    it('should render SectionAbout component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render peoples opinion text', () => {
        const text = component.find('#twelfth-animation');
        expect(text.text()).toBe('What people think about DevSecOps Academy');
    });

    it('should render peoples opinion text', () => {
        const text = component.find('#twelfth-animation');
        expect(text.text()).toBe('What people think about DevSecOps Academy');
    });
});
