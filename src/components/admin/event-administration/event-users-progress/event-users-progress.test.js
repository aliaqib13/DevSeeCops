import React from 'react';
import { shallow } from 'enzyme';
import EventUsersProgress from './index';

const props = {
    usersProgress: {
        data: [
            {
                user_name: 'Test Test', course_name: 'Container Security in CI/CD', quiz: null, hands_on_lab: null, user_level: 'None',
            },
            {
                user_name: 'Test Test', course_name: 'Container Security in CI/CD', quiz: { failed: 0, succeeded: 2 }, hands_on_lab: { total_spin_ups: 1, total_spin_up_time: 16106558 }, user_level: 'Advanced',
            },
            {
                user_name: 'Test Test', course_name: 'Container Security in CI/CD', quiz: { failed: 0, succeeded: 2 }, hands_on_lab: { total_spin_ups: 1, total_spin_up_time: 16106558 }, user_level: 'Advanced',
            },
        ],
        lastPage: 1,
        page: 1,
        perPage: 10,
        total: 3,
        eventName: 'Test',
    },
    event_id: 1,
    getEventUsersProgress: jest.fn(() => Promise.resolve(true)),
};

describe('EventUsersProgress', () => {
    let component; let
        container;

    beforeEach(() => {
        component = shallow(<EventUsersProgress {...props} />);
        container = component.props().children.props.children;
    });

    it('Should render the component successfully', () => {
        expect(component.exists()).toBe(true);
    });

    it('Should render the title successfully', () => {
        expect(container[0].props.children[0]).toBe('Users Progress for event -');
        expect(container[0].props.children[2]).toBe(props.usersProgress.eventName);
    });

    it('Should render the title successfully', async () => {
        expect(container[1].props.data.length).toBe(props.usersProgress.data.length);
    });
});
