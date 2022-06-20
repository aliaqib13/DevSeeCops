import React from 'react';
import { shallow } from 'enzyme';
import UpdateUserModal from './update-user-modal';

describe('update user modal', () => {
    let component;

    const props = {
        toggleModal: true,
        roles: [
            {
                id: 1,
                name: 'Administrator',
                slug: 'administrator',
            },
            {
                id: 2,
                name: 'Author',
                slug: 'author',
            },
        ],
        user: {
            activated: 1,
            cc_info: null,
            certificate_name: null,
            coordinator: null,
            customer_id: null,
            email: 'ion@araido.io',
            firstname: 'Ion',
            id: 2,
            is_fellow: 1,
            lastname: 'Arapu',
            mfa_enabled: 0,
            permissions: [
                {
                    id: 1,
                    slug: 'fellow_operator',
                    name: 'Fellow Operator',
                    description: 'can get access to admin fellow area',
                },
            ],
            roles: [
                {
                    name: 'Administrator',
                    slug: 'administrator',
                },
                {
                    name: 'Author',
                    slug: 'author',
                },
            ],
            slack_id: null,
        },
    };

    beforeEach(() => {
        component = shallow(<UpdateUserModal {...props} />);
    });

    it('should render user update modal', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('component should have Edit Title header title', () => {
        expect(component.find('Modal[title="Edit User"]').exists()).toBeTruthy();
    });

    it('should render form item with input for first name', () => {
        const formItem = component.find('FormItem');
        expect(formItem.find('Input[name="firstname"]').exists()).toBeTruthy();
    });

    it('should render form item with input for last name', () => {
        const formItem = component.find('FormItem');
        expect(formItem.find('Input[name="lastname"]').exists()).toBeTruthy();
    });

    it('should render form item with select option for roles', () => {
        const formItem = component.find('FormItem');
        expect(formItem.find('Select[name="role"]').exists()).toBeTruthy();
    });

    it('should render form item with select option adding permissions', () => {
        const formItem = component.find('FormItem');
        expect(formItem.find('Select[placeholder="search by permission"]').exists()).toBeTruthy();
    });
});
