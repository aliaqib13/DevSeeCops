import React from 'react';
import { shallow } from 'enzyme';
import Intro from './Intro';

describe('Intro', () => {
    let component;
    beforeEach(() => {
        component = shallow(<Intro />);
    });

    it('should render Intro component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render learning path text in home page', () => {
        const text = component.find('#third-animation');
        expect(text.text()).toBe('Free resources to determine your Learning Path');
    });

    it('should render how it working text in home page', () => {
        const text = component.find('#fourth-animation');
        expect(text.text()).toBe('How DevSecOps Academy works for you');
    });
    it('should render carrier text in home page', () => {
        const text = component.find('#second-animation');
        expect(text.text()).toBe('How DevSecOps strengthens your career');
    });
});
