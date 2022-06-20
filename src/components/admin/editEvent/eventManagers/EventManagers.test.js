import React from 'react';
import { shallow } from 'enzyme';
import EventManagers from './EventManagers';

const eventManagers = [{
    id: 1,
    user: {
        id: 1, firstname: 'Test', lastname: 'Test', email: 'test@gmail.com',
    },
}];

const props = {
    eventManagers,
    removeEventManager: jest.fn(() => Promise.resolve({ course })),
    addEventManager: jest.fn(() => Promise.resolve([])),
};

describe('EventManagers', () => {
    let component;

    beforeEach(() => {
        component = shallow(<EventManagers {...props} />);
        component.setState({ visible: true });
    });

    it('should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render add event manager modal successfully', () => {
        const addModal = component.find('Modal');
        expect(addModal.exists()).toBeTruthy();
        expect(addModal.props().visible).toBe(true);
        expect(addModal.props().title).toBe('Add Event Manager');
    });
});
