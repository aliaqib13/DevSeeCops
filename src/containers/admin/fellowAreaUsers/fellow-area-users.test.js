import React from 'react';
import { shallow } from 'enzyme';
import { FellowAreaUsers } from './FellowAreaUsers';

describe('Fellow Area Users', () => {
    let component;
    const props = {
        users: [
            {
                id: 1,
                activated: 1,
                email: 'dominik@araido.io',
                firstname: 'Dominik',
                is_fellow: 1,
                lastname: 'de Smit',
                __meta__: { authoredCourses_count: 5 },
            },
            {
                id: 3,
                activated: 1,
                email: 'henry@araido.io',
                firstname: 'Henry',
                is_fellow: 1,
                lastname: 'Tovmasyan',
                __meta__: { authoredCourses_count: 3 },
            },
        ],
        fetchFellowUsers: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = shallow(<FellowAreaUsers {...props} />);
    });

    it('should render fellow area users component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render list', () => {
        expect(component.find('List')).toHaveLength(1);
    });
});
