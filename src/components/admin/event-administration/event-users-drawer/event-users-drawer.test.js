import React from 'react';
import { shallow, mount } from 'enzyme';
import EventUsersDrawer from './index';

const props = {
    eventUsers: {
        data: [
            {
                created_at: '2020-12-22 12:49:38',
                event_id: 1,
                id: 5,
                is_assigned: 1,
                updated_at: '2020-12-23 14:58:22',
                user_id: 3,
                user: {
                    activated: 1,
                    cc_info: null,
                    certificate_name: 'Henry Tovmasyan',
                    coordinator: null,
                    created_at: '2020-12-09 16:28:06',
                    customer_id: null,
                    email: 'henry@araido.io',
                    firstname: 'Henry',
                    id: 3,
                    is_fellow: 0,
                    lastname: 'Tovmasyan',
                    linkedin_url: null,
                    mfa_enabled: 0,
                    slack_id: null,
                    updated_at: '2020-12-10 10:49:55',
                },
            },
            {
                created_at: '2020-12-22 12:49:38',
                event_id: 1,
                id: 6,
                is_assigned: 1,
                updated_at: '2020-12-23 14:58:22',
                user_id: 3,
                user: {
                    activated: 1,
                    cc_info: null,
                    certificate_name: 'Henry Tovmasyan',
                    coordinator: null,
                    created_at: '2020-12-09 16:28:06',
                    customer_id: null,
                    email: 'henry@araido.io',
                    firstname: 'Henry',
                    id: 3,
                    is_fellow: 0,
                    lastname: 'Tovmasyan',
                    linkedin_url: null,
                    mfa_enabled: 0,
                    slack_id: null,
                    updated_at: '2020-12-10 10:49:55',
                },
            },
        ],
        lastPage: 1,
        page: 1,
        perPage: 10,
        total: 8,
    },
    visible: true,
    loadingDrawer: false,
    removeUserFromEvent: jest.fn(() => Promise.resolve(true)),
    assignEvent: jest.fn(() => Promise.resolve(true)),
    assignEventToAll: jest.fn(() => Promise.resolve(true)),
    onClose: jest.fn(),
    getEventUsers: jest.fn(() => Promise.resolve(true)),
};

describe('EventUsersDrawer', () => {
    let component;

    beforeEach(() => {
        component = shallow(<EventUsersDrawer {...props} />);
    });

    it('Should render successfully', () => {
        const Drawer = component.find('withConfigConsumer(Drawer)');
        expect(Drawer.exists()).toBe(true);
    });

    it('Should render successfully the table containing users', () => {
        const table = component.find('withStore(Table)');
        expect(table.exists()).toBe(true);
        expect(table.props().dataSource).toEqual(props.eventUsers.data);
    });
});

describe('EventUsersDrawer table', () => {
    let component;

    beforeEach(() => {
        component = mount(<EventUsersDrawer {...props} />);
    });

    it('Should show user\'s email in users table', () => {
        const user_email = component.find('tr.drawer-users-row').at(0).find('td').at(0);
        expect(user_email.text()).toBe(props.eventUsers.data[0].user.email);
    });

    it('Should call removeUserActiveCourse function with proper user id when click on delete button in users table', () => {
        const remove_user_icon = component.find('tr.drawer-users-row').at(0).find('td').at(1)
            .find('Button');
        remove_user_icon.simulate('click');
        expect(props.removeUserFromEvent).toBeCalledTimes(1);
    });
});
