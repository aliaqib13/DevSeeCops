import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import AdminTeams from './teams';

describe('AdminTeams', () => {
    let component;

    beforeEach(() => {
        component = mount(<MemoryRouter><AdminTeams /></MemoryRouter>);
    });

    it('Should render AdminTeams Component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should render `teams` tab successfully', () => {
        const teamsTab = component.find('TabPane').at(0);
        expect(teamsTab).toHaveLength(1);
        expect(teamsTab.props().tab).toBe('Teams');
    });

    it("Should render teamsTab's title successfully", () => {
        const teamsTitle = component.find('Title').at(0);
        expect(teamsTitle.text()).toBe('Teams');
    });

    it('Should render `Create team` button successfully', () => {
        const createTeamBtn = component.find('Button').at(0);
        expect(createTeamBtn.text()).toBe('Create team');
        expect(createTeamBtn.props().htmlType).toBe('button');
    });

    it('Should render `Create team` NavLink successfully', () => {
        const createTeamBtnNavLink = component.find('NavLink').at(0);
        expect(createTeamBtnNavLink.props().to).toBe('/platform/admin/teams/create-team');
    });
});
