import React from 'react';
import { shallow } from 'enzyme';
import Register from './register';

describe('Register', () => {
    const component = shallow(<Register />);
    it('should render Register successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
