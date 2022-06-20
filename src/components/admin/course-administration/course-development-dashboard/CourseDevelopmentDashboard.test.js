import React from 'react';
import { shallow } from 'enzyme';
import CourseDevelopmentDashboard from './index';

describe('CourseDevelopmentDashboard', () => {
    let component;
    const props = {
    };

    beforeEach(() => {
        component = shallow(<CourseDevelopmentDashboard {...props} />);
    });

    it('should render CourseDevelopmentDashboard component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
