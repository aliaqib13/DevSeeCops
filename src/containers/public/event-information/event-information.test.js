import React from 'react';
import { shallow } from 'enzyme';
import { EventInformation } from './event-information';

describe('EventInformation', () => {
    let component;
    const event = {
        id: 1,
        name: 'eventName',
        subtitle: 'eventSubtitle',
        eventUsers: [],
    };
    const defaultProps = {
        getPublicEventById: async () => event,
        history: [],
        event,
        match: { params: { id: 1 } },
    };

    beforeEach(() => {
        component = shallow(<EventInformation {...defaultProps} />);
    });

    it('Should render EventInformation successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Display the event name and subtitle correctly', () => {
        const titleComponent = component.find('.course-information-header');

        const nameComponent = titleComponent.find('.title');
        expect(nameComponent.exists()).toBeTruthy();
        expect(nameComponent.text()).toBe(event.name);

        const subtitleComponent = titleComponent.find('.content');
        expect(subtitleComponent.exists()).toBeTruthy();
        expect(subtitleComponent.text()).toBe(event.subtitle);
    });
});
