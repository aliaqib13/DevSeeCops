import React from 'react';
import { shallow } from 'enzyme';
import FellowSettings from './fellowSettings';

const props = {
    adminFellowSettings: {
        courseScenarios: [],
        fellows: [],
        labBlocks: [],
        persons: [],
    },
    persons: [{ id: 3, email: 'henry@araido.io', is_fellow: 1 }],
    fetchCategories: jest.fn(() => Promise.resolve(false)),
    getCourseTemplates: jest.fn(() => Promise.resolve(false)),
    fetchFellowSettings: jest.fn(() => Promise.resolve(false)),
    getCourseTypes: jest.fn(() => Promise.resolve(false)),
};

describe('FellowSettings', () => {
    let component;
    component = shallow(<FellowSettings {...props} />);

    it('Should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
