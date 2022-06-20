import React from 'react';
import { shallow } from 'enzyme';
import EventEmails from './EventEmails';

const eventEmails = [{ id: 1, email: 'test@gmail.com' }];

const props = {
    eventEmails,
    removeEventEmail: jest.fn(() => Promise.resolve({ course })),
};

describe('EventEmails', () => {
    let component;

    beforeEach(() => {
        component = shallow(<EventEmails {...props} />);
    });

    it('should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
