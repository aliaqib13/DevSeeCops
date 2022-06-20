import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import EventAdministration from './index';
import { EVENT_TYPE } from '../../../../constants';

const props = {
    coursesForEvent: [{ id: 1, title: 'Secrets Management for your applications' }, { id: 4, title: 'Container Security in CI/CD' }],
    getCourses: jest.fn(() => Promise.resolve(true)),
    uploadEventImage: jest.fn(() => Promise.resolve(true)),
    createEvent: jest.fn(() => Promise.resolve(true)),
    getEvents: jest.fn(() => Promise.resolve(true)),
    getEventUsers: jest.fn(() => Promise.resolve(true)),
    events: [
        {
            id: 1,
            name: 'Event of Algorithms with js/java',
            image: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/events/wJuXsArS7iol6FrSTm3p7ubaocCc9rkT.png',
            eventUsers: [{
                created_at: '2020-12-22 12:49:38',
                event_id: 1,
                id: 5,
                is_assigned: 1,
                updated_at: '2020-12-23 14:58:22',
                user_id: 3,
            }],
        },
        {
            id: 3,
            name: 'Event to check coding speed',
            image: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/events/y8tIQ2NhIZBk01LBPQYffwlBbA2GYdRR.png',
            eventUsers: [{
                created_at: '2020-12-22 12:49:38',
                event_id: 1,
                id: 5,
                is_assigned: 1,
                updated_at: '2020-12-23 14:58:22',
                user_id: 3,
            }],
        },
        {
            id: 4,
            name: 'Event Secrets Management ',
            image: 'https://static.ewtest.infomaker.io/wp-content/uploads/sites/2/2017/03/22081625/cloud-upload.png',
            eventUsers: [{
                created_at: '2020-12-22 12:49:38',
                event_id: 1,
                id: 5,
                is_assigned: 1,
                updated_at: '2020-12-23 14:58:22',
                user_id: 3,
            }],
        },
        {
            id: 5,
            name: 'Gitlab Event',
            image: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/events/328y7zBnrfTQ16UCX4GsU3vwrrd0gyxP.png',
            eventUsers: [{
                created_at: '2020-12-22 12:49:38',
                event_id: 1,
                id: 5,
                is_assigned: 1,
                updated_at: '2020-12-23 14:58:22',
                user_id: 3,
            }],
        },
    ],

    eventUsers: [{
        created_at: '2020-12-22 12:49:38',
        event_id: 1,
        id: 5,
        is_assigned: 1,
        updated_at: '2020-12-23 14:58:22',
        user_id: 3,
    }],
    isAdmin: true,
    removeUserFromEvent: jest.fn(() => Promise.resolve(true)),
    assignEvent: jest.fn(() => Promise.resolve(true)),
    assignEventToAll: jest.fn(() => Promise.resolve(true)),
    eventTypes: Object.values(EVENT_TYPE),

};

function tick() {
    return new Promise(resolve => {
        setTimeout(resolve, 0);
    });
}

describe('EventAdministration', () => {
    let component;

    beforeEach(() => {
        component = shallow(<EventAdministration {...props} />);
    });

    it('Should render successfully', () => {
        const wrapper = component.find('.course-users-container');
        expect(wrapper.exists()).toBeTruthy();
    });

    it('Should call getEventUsers function when click on users in table actions column', () => {
        const wrapper = component.find('.course-users-container');
        wrapper.find('Column[title="Total number of users"]').props().render('test', props.events[0]).props.onClick();
        expect(props.getEventUsers).toBeCalledTimes(1);
    });

    it('Should render table with all available courses', () => {
        const table = component.find('withStore(Table)').at(0);
        expect(table.exists()).toBeTruthy();
        expect(table.props().dataSource).toEqual(props.events);
    });

    it('Should open CreateEventModal when click Add Course button', () => {
        const wrapper = component.find('.course-users-container');
        const importCourseButton = wrapper.find('div').at(1).find('Button').at(0);
        expect(component.find('CreateEventModal').prop('visible')).toBe(false);
        importCourseButton.simulate('click');
        expect(component.find('CreateEventModal').prop('visible')).toBe(true);
    });

    it('Should open drawer when click on view in action column in table', async () => {
        const wrapper = component.find('.course-users-container');
        let drawer = component.find('EventUsersDrawer');
        expect(drawer.prop('visible')).toBe(false);
        wrapper.find('Column[title="Total number of users"]').props().render('test', props.events[0]).props.onClick();
        await tick();
        component.update();
        drawer = component.find('EventUsersDrawer');
        expect(drawer.prop('visible')).toBe(true);
    });
});

describe('EventAdministration Table', () => {
    let component;

    beforeEach(() => {
        component = mount(<MemoryRouter><EventAdministration {...props} /></MemoryRouter>);
    });

    it('should show event name', () => {
        expect(component.find('tr.ant-table-row-level-0').at(0).childAt(1).first()
            .text()).toBe(props.events[0].name);
    });

    it('Should show total event users', () => {
        expect(component.find('tr.ant-table-row-level-0').at(0).childAt(3).first()
            .text()).toBe('View ');
    });

    it('Should show total event users', () => {
        expect(component.find('tr.ant-table-row-level-0').at(0).childAt(4).first()
            .text()).toBe('View ');
    });

    it('Should show total event users', () => {
        expect(component.find('tr.ant-table-row-level-0').at(0).childAt(6).first()
            .text()).toBe(`${String(props.events[0].eventUsers.length)} `);
    });

    it('Should render as many rows as there are passed with props', () => {
        expect(component.find('BodyRow').length).toBe(props.events.length);
    });
});
