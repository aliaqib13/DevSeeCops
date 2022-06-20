import React from 'react';
import { shallow } from 'enzyme';
import Story from './story';

describe('Story', () => {
    const component = shallow(<Story />);
    it('should render Story successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
