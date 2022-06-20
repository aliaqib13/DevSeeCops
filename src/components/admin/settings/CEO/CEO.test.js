import React from 'react';
import { shallow } from 'enzyme';
import CEO from './index';

describe('CEO', () => {
    let component;
    const props = {};

    beforeEach(() => {
        component = shallow(<CEO {...props} />);
    });

    it('should render CEO component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
