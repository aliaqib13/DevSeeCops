import React from 'react';
import { shallow } from 'enzyme';
import { Events } from './events';

describe('Events page', () => {
    let component;
    const props = {
        auth: {
            user: {
                id: 1,
                activated: 1,
                email: 'dominik@araido.io',
                firstname: 'Dominik',
                is_fellow: 1,
                lastname: 'de Smit',
            },
        },
        events: {
            data: [
                {
                    id: 1,
                    image: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/events/wJuXsArS7iol6FrSTm3p7ubaocCc9rkT.png',
                    name: 'Event of Algorithms with js/java',
                },
            ],
            lastPage: 1,
            page: 1,
            perPage: 10,
            total: 1,
        },
        getEvents: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = shallow(<Events {...props} />);
    });

    it('should render events container successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render search input successfully', () => {
        expect(component.exists('Search')).toEqual(true);
    });
});
