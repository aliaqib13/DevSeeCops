import React from 'react';
import { shallow } from 'enzyme';
import { EventInformation } from './event-information';
import { COURSE_TYPE, EVENT_TYPE } from '../../constants';

const event = {
    course_ids: '[1]',
    courses: [
        {
            description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault 1',
            id: 1,
            title: 'Secrets Management for your applications 1',
            will_learn: [],
            type: COURSE_TYPE.STANDARD,
        },
        {
            description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault 2',
            id: 2,
            title: 'Secrets Management for your applications 2',
            will_learn: [],
            type: COURSE_TYPE.INTRODUCTION,
        },
        {
            description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault 3',
            id: 3,
            title: 'Secrets Management for your applications 3',
            will_learn: [],
            type: COURSE_TYPE.EXAM,
        },
    ],
    created_at: '2020-12-22 15:06:45',
    description: null,
    emails_uploaded: 0,
    end_time: null,
    eventEmails: [],
    eventSponsors: [],
    eventUsers: [{
        created_at: '2021-05-20 19:37:51',
        event_id: 2,
        id: 1,
        is_assigned: 0,
        updated_at: '2021-05-20 19:37:51',
        user_id: 3,
    }],
    id: 4,
    image: 'https://static.ewtest.infomaker.io/wp-content/uploads/sites/2/2017/03/22081625/cloud-upload.png',
    listed: 1,
    name: 'Event Secrets Management ',
    start_time: null,
    updated_at: '2020-12-22 15:06:45',
    type: EVENT_TYPE.OPEN,
    user_limit: 2,
};

const props = {
    event,
    user: {
        roles: [
            'administrator',
        ],
        id: 1,
    },
    match: {
        params: {
            id: 1,
        },
    },
    getEventById: jest.fn(() => Promise.resolve(true)),
    registerForEvent: jest.fn(() => Promise.resolve(true)),
};

describe('event-information', () => {
    let component;

    beforeEach(() => {
        component = shallow(<EventInformation {...props} />);
    });

    it('should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render a tag with correct href', () => {
        const aTagSt = component.find('a').at(0);
        expect(aTagSt.props().href).toBe(`/course-information/${props.event.courses[0].id}`);
        const aTagIntro = component.find('a').at(1);
        expect(aTagIntro.props().href).toBe(`/introduction-module/${props.event.courses[1].id}`);
        const aTagExam = component.find('a').at(2);
        expect(aTagExam.props().href).toBe(`/professional-exam/${props.event.courses[2].id}`);
    });

    it('should render number of open places', () => {
        const button = component.find('.sidebar');
        const pTag = button.props().children[1];
        const freeSpaces = props.event.user_limit - props.event.eventUsers.length;
        expect(pTag.props.children.join('')).toBe(`${freeSpaces} place(s) available`);
    });

    it('should successfully register event', async () => {
        component.instance().registerForEvent();
        expect(props.registerForEvent).toBeCalled();
        const registered = await props.registerForEvent(true);
        expect(registered).toBe(true);
    });
});
