import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AdminDashboard } from './AdminDashboard';

const props = {
    fetchAdminDashboardData: jest.fn(() => Promise.resolve(true)),
};

describe('AdminDashboard', () => {
    let component; let componentStates;

    beforeEach(() => {
        component = mount(<MemoryRouter><AdminDashboard {...props} /></MemoryRouter>);

        componentStates = shallow(<AdminDashboard {...props} />);
    });
    it('Should render component successfully', () => {
        expect(component).toHaveLength(1);
    });
    it('Should render titles successfully', () => {
        const titles = component.find('Title');
        expect(titles.at(0).text()).toBe('Admin Dashboard');
        expect(titles.at(1).text()).toBe('To Do');
        expect(titles.at(2).text()).toBe('Active');
        expect(titles.at(3).text()).toBe('Course Factory');
        expect(titles.at(4).text()).toBe('User Overview');
        expect(titles.at(5).text()).toBe('Certificates Overview');
    });

    it("Should render dashboard count's titles when state is set to zero", () => {
        const countTitles = component.find('Col');
        const countLinks = index => countTitles.at(index).props().children.props.to;// Used to get the NavLinks of an item deeply nested in a Columns"

        expect(countTitles.at(0).text()).toBe('0 of Course draft review requests');
        expect(countLinks(0)).toBe('/platform/admin/course-administration');
        expect(countTitles.at(1).text()).toBe('0 of Open course access requests');
        expect(countLinks(1)).toBe('/platform/admin/course-administration');
        expect(countTitles.at(2).text()).toBe('0 of Lab review request');
        expect(countLinks(2)).toBe('/platform/admin/labs');

        expect(countTitles.at(3).text()).toBe('0 of active labs');
        expect(countLinks(3)).toBe('/platform/admin/active-labs');
        expect(countTitles.at(4).text()).toBe('0 of users logged in');
        expect(countLinks(4)).toBe('/platform/admin/users');

        expect(countTitles.at(5).text()).toBe('0 of available courses');
        expect(countLinks(5)).toBe('/platform/courses');
        expect(countTitles.at(6).text()).toBe('0 courses in development');
        expect(countLinks(6)).toBe('/platform/admin/course-administration');

        expect(countTitles.at(7).text()).toBe('0 of accounts');
        expect(countLinks(7)).toBe('/platform/admin/users');
        expect(countTitles.at(8).text()).toBe('0 of users with NO specific role');
        expect(countLinks(8)).toBe('/platform/admin/users/regular_users');
        expect(countTitles.at(9).text()).toBe('0 of users with role of Admins');
        expect(countLinks(9)).toBe('/platform/admin/users/administrator');
        expect(countTitles.at(10).text()).toBe('0 of users with role Fellow Operators');
        expect(countLinks(10)).toBe('/platform/admin/users/fellow_operator');
        expect(countTitles.at(11).text()).toBe('0 of users with role of Fellow');
        expect(countLinks(11)).toBe('/platform/admin/users/fellow');
        expect(countTitles.at(12).text()).toBe('0 of users with role of Beta tester');
        expect(countLinks(12)).toBe('/platform/admin/users/beta_tester');

        expect(countTitles.at(13).text()).toBe('0 of certificates of completion');
        expect(countLinks(13)).toBe('/platform/admin/certificate-manager/completion');
        expect(countTitles.at(14).text()).toBe('0 of certificates of theory');
        expect(countLinks(14)).toBe('/platform/admin/certificate-manager/theory');
    });
    it("Should render dashboard count's titles when state is changed", () => {
        componentStates.setState({
            countRequests: 1,
            countLabs: 2,
            countAllUsers: 3,
            countRegularUsers: 4,
            countAdminUsers: 5,
            countFellowOperatorUsers: 6,
            countFellowUsers: 7,
            countBetaTesterUsers: 8,
            countAllCourses: 9,
            countCertificatesCompletion: 10,
            countCertificatesTheory: 11,
            countLoggedInUsers: 12,
            countDevelopmentCourses: 13,
            countDraftCourses: 14,
            countActiveLabs: 15,
        });

        const toDoCards = componentStates.find('[data-testid="toDo"]').find('Card');
        const activeCards = componentStates.find('[data-testid="active"]').find('Card');
        const courseFactoryCards = componentStates.find('[data-testid="courseFactory"]').find('Card');
        const userOverviewCards = componentStates.find('[data-testid="userOverview"]').find('Card');
        const certificatesOverviewCards = componentStates.find('[data-testid="certificatesOverview"]').find('Card');

        expect(toDoCards.at(0).props().title).toBe('14 of Course draft review requests');
        expect(toDoCards.at(1).props().title).toBe('1 of Open course access requests');
        expect(toDoCards.at(2).props().title).toBe('2 of Lab review request');

        expect(activeCards.at(0).props().title).toBe('15 of active labs');
        expect(activeCards.at(1).props().title).toBe('12 of users logged in');

        expect(courseFactoryCards.at(0).props().title).toBe('9 of available courses');
        expect(courseFactoryCards.at(1).props().title).toBe('13 courses in development');

        expect(userOverviewCards.at(0).props().title).toBe('3 of accounts');
        expect(userOverviewCards.at(1).props().title).toBe('4 of users with NO specific role');
        expect(userOverviewCards.at(2).props().title).toBe('5 of users with role of Admins');
        expect(userOverviewCards.at(3).props().title).toBe('6 of users with role Fellow Operators');
        expect(userOverviewCards.at(4).props().title).toBe('7 of users with role of Fellow');
        expect(userOverviewCards.at(5).props().title).toBe('8 of users with role of Beta tester');

        expect(certificatesOverviewCards.at(0).props().title).toBe('10 of certificates of completion');
        expect(certificatesOverviewCards.at(1).props().title).toBe('11 of certificates of theory');
    });
});
