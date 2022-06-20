import React from 'react';
import { shallow } from 'enzyme';
import { Sidebar } from './Sidebar';

const props = {
    theme: 'dark',
    isMobile: false,
    auth: {
        loading: false,
        user: {
            id: 8,
            firstname: 'firstname',
            lastname: 'lastname',
            email: 'test@araido.io',
            roles: [
                'administrator',
            ],
        },
    },
    location: {
        pathname: '/platform',
    },
};

describe('Sidebar', () => {
    let component;
    beforeEach(() => {
        component = shallow(<Sidebar {...props} />);
    });

    it('should render Sidebar component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it("Should render Admin's sidebar elements successfully", () => {
        const sideBarElement = component.find('NavLink');
        const sideBarElementNavLink = component.find('NavLink');

        expect(sideBarElementNavLink.at(0).props().to).toEqual('/platform');
        expect(sideBarElement.at(0).props().children[1].props.children).toEqual('Home');

        expect(sideBarElementNavLink.at(1).props().to).toEqual('/platform/notifications');
        expect(sideBarElement.at(1).props().children[1].props.children).toEqual('Notifications');

        expect(sideBarElementNavLink.at(2).props().to).toEqual('/platform/courses');
        expect(sideBarElement.at(2).props().children[1].props.children).toEqual('Courses');

        expect(sideBarElementNavLink.at(3).props().to).toEqual('/platform/learning-paths');
        expect(sideBarElement.at(3).props().children[1].props.children).toEqual('Learning Paths');

        expect(sideBarElementNavLink.at(4).props().to).toEqual('/platform/achievements');
        expect(sideBarElement.at(4).props().children[1].props.children).toEqual('My Achievements');

        expect(sideBarElementNavLink.at(5).props().to).toEqual('/platform/admin/certificate-manager');
        expect(sideBarElement.at(5).props().children[1].props.children).toEqual('Certificates Manager');

        expect(sideBarElementNavLink.at(6).props().to).toEqual('/platform/admin/course-administration');
        expect(sideBarElement.at(6).props().children[1].props.children).toEqual('Course Administration');

        expect(sideBarElementNavLink.at(7).props().to).toEqual('/platform/admin/payments');
        expect(sideBarElement.at(7).props().children[1].props.children).toEqual('Payments');

        expect(sideBarElementNavLink.at(8).props().to).toEqual('/platform/admin/active-labs');
        expect(sideBarElement.at(8).props().children[1].props.children).toEqual('Active Labs');

        expect(sideBarElementNavLink.at(9).props().to).toEqual('/platform/admin/labs');
        expect(sideBarElement.at(9).props().children[1].props.children).toEqual('Labs History');

        expect(sideBarElementNavLink.at(10).props().to).toEqual('/platform/admin/jobs');
        expect(sideBarElement.at(10).props().children[1].props.children).toEqual('Jobs');

        expect(sideBarElementNavLink.at(11).props().to).toEqual('/platform/admin/users');
        expect(sideBarElement.at(11).props().children[1].props.children).toEqual('Users');

        expect(sideBarElementNavLink.at(12).props().to).toEqual('/platform/admin/teams');
        expect(sideBarElement.at(12).props().children[1].props.children).toEqual('Teams');

        expect(sideBarElementNavLink.at(13).props().to).toEqual('/platform/admin/settings');
        expect(sideBarElement.at(13).props().children[1].props.children).toEqual('General Settings');

        expect(sideBarElementNavLink.at(14).props().to).toEqual('/platform/admin/fellow-settings');
        expect(sideBarElement.at(14).props().children[1].props.children).toEqual('Fellow Settings');

        expect(sideBarElementNavLink.at(15).props().to).toEqual('/platform/admin/beta-test-settings');
        expect(sideBarElement.at(15).props().children[1].props.children).toEqual('Beta Test Settings');

        expect(sideBarElementNavLink.at(16).props().to).toEqual('/platform/admin/manager');
        expect(sideBarElement.at(16).props().children[1].props.children).toEqual('Manager Dashboard');

        expect(sideBarElementNavLink.at(17).props().to).toEqual('/platform/admin/categories');
        expect(sideBarElement.at(17).props().children[1].props.children).toEqual('Category Settings');

        expect(sideBarElementNavLink.at(18).props().to).toEqual('/platform/admin/campaign-center');
        expect(sideBarElement.at(18).props().children[1].props.children).toEqual('Campaign Center');

        expect(sideBarElementNavLink.at(19).props().to).toEqual('/platform/tutorial');
        expect(sideBarElement.at(19).props().children[1].props.children).toEqual('Help');

        expect(sideBarElementNavLink.at(20).props().to).toEqual('/platform/fellow-gallery');
        expect(sideBarElement.at(20).props().children[1].props.children).toEqual('Fellow Gallery');

        expect(sideBarElementNavLink.at(21).props().to).toEqual('/platform/admin/fellow-area');
        expect(sideBarElement.at(21).props().children[1].props.children).toEqual('Fellow Area');

        expect(sideBarElementNavLink.at(22).props().to).toEqual('/platform/beta-test-instructions');
        expect(sideBarElement.at(22).props().children[1].props.children).toEqual('Beta Test Instructions');

        expect(sideBarElementNavLink.at(23).props().to).toEqual('/platform/events');
        expect(sideBarElement.at(23).props().children[1].props.children).toEqual('Events');

        expect(sideBarElementNavLink.at(24).props().to).toEqual('/platform/academy-tour');
        expect(sideBarElement.at(24).props().children[1].props.children).toEqual('Introduction Tour');
    });
});
