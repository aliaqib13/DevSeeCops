import React from 'react';
import { shallow } from 'enzyme';
import { UserStatistics } from './userStatistics';

describe('Admin User Statistics', () => {
    let component;
    const props = {
        fetchUserStatistics: jest.fn(() => Promise.resolve(true)),
        match: {
            params: {
                id: 3,
            },
        },
        data: {
            courses: [
                {
                    id: 1,
                    image: '/img/sm.jpg',
                    title: 'Secrets Management for your applications',
                },
                {
                    id: 3,
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/1200px-Kubernetes_logo_without_workmark.svg.png',
                    title: 'Secrets Management in Kubernetes',
                },
            ],
            user: {
                firstname: 'Henry',
                lastname: 'Tovmasyan',
                created_at: '2020-10-21 15:22:31',
                id: 3,
                roles: [],
            },
        },
    };

    beforeEach(() => {
        component = shallow(<UserStatistics {...props} />);
    });
    it('Should render successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
    it('Should render user statistics container', () => {
        const div = component.find('.user-statistics-container');

        expect(div.exists()).toBeTruthy();
    });
    it('Should render table courses', () => {
        const table = component.find('.user-statistics-table');
        expect(table.exists()).toBeTruthy();
    });
    it('Should render button back', () => {
        const button = component.find('.go-back-button');
        expect(button.exists()).toBeTruthy();
    });

    it('Should render role user tag', () => {
        const tag = component.find('.role-user');
        expect(tag.exists()).toBeTruthy();
    });
});
