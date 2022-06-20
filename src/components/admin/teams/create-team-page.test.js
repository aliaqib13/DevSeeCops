import React from 'react';
import { shallow } from 'enzyme';
import { message } from 'antd';
import CreateTeamPage from './create-team-page';

jest.mock('antd', () => {
    const antd = jest.requireActual('antd');

    const messageANTD = {
        ...antd.message,
        success: jest.fn(),
    };

    return {
        ...antd,
        message: messageANTD,
    };
});

const props = {
    adminCreateTeam: jest.fn(() => Promise.resolve(true)),
    adminSearchUsersByEmail: jest.fn(() => Promise.resolve(true)),
};

describe('CreateTeamPage', () => {
    let component;

    beforeEach(() => {
        component = shallow(<CreateTeamPage {...props} />);
    });

    it('Should render CreateTeamPage Component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should render page title successfully', () => {
        const pageTitle = component.find('.page-title').find('Title');
        expect(pageTitle.props().children).toBe('Create a team');
    });

    it('Should render `create-team-header` elements successfully', () => {
        const header = component.find('.create-team-header');
        const teamLogoInput = header.find('Input').at(0);
        const teamNameInput = header.find('Input').at(1);
        const addMemberBtn = header.find('.add-members-btn').at(0);

        // Render `teamLogo` and `teamName` input field
        expect(teamLogoInput.props().placeholder).toBe('Enter team logo Url ...');
        expect(teamLogoInput.props().name).toBe('teamLogo');
        expect(teamLogoInput.props().type).toBe('text');

        expect(teamNameInput.props().placeholder).toBe('Enter team name ...');
        expect(teamNameInput.props().name).toBe('teamName');
        expect(teamNameInput.props().type).toBe('text');

        // Should change `teamLogo` and `teamName` status when change input
        expect(component.state().teamName).toBe('');
        teamNameInput.props().onChange({ target: { value: 'testTeamName', name: 'teamName' } });
        expect(component.state().teamName).toBe('testTeamName');

        expect(component.state().teamLogo).toBe('');
        teamLogoInput.props().onChange({ target: { value: 'testTeamLogo', name: 'teamLogo' } });
        expect(component.state().teamLogo).toBe('testTeamLogo');

        // Should render `Add members` button
        expect(addMemberBtn.props().children).toBe('Add members');
        expect(addMemberBtn.props().htmlType).toBe('button');

        // Set `addMembersModalToggle` to True when `Add members` Button is clicked
        expect(component.state().addMembersModalToggle).toBe(false);
        addMemberBtn.props().onClick();
        expect(component.state().addMembersModalToggle).toBe(true);
    });

    it('Should render team members table and columns successfully', () => {
        const membersTable = component.find('.admin-team-members-table');
        const membersTableColumns = membersTable.find('Column');

        expect(membersTable).toHaveLength(1);

        // Should render columns
        expect(membersTableColumns.at(0).props().title).toBe('Member name');
        expect(membersTableColumns.at(1).props().title).toBe('Member email');
        expect(membersTableColumns.at(2).props().title).toBe('As Manager');

        //  Should render rows with data from `teamMembersData` props
        component.setState({
            teamMembersData: [
                {
                    firstname: 'test1FN',
                    lastname: 'test1LN',
                    email: 'test1@test.test',
                    is_manager: false,
                },

            ],
        });

        const teamNameCol = membersTableColumns.at(0).props().render('test', component.state().teamMembersData[0]);
        const teamEmailCol = membersTableColumns.at(1).props().render('test', component.state().teamMembersData[0]);
        const teamIsManagerCol = membersTableColumns.at(2).props().render('test', component.state().teamMembersData[0]);

        expect(teamNameCol.props.children).toBe('test1FN test1LN');
        expect(teamEmailCol.props.children).toBe('test1@test.test');
        expect(teamIsManagerCol.props.children).toBe(false);

        // Should change `teamMembersData` states with value of `is_manager` property when checkbox is changed
        expect(component.state().teamMembersData[0].is_manager).toBe(false);
        teamIsManagerCol.props.onChange({ target: { value: 'test1@test.test' } });
        expect(component.state().teamMembersData[0].is_manager).toBe(true);
    });

    it('Should render `Add Members` Modal when `Add members` button is clicked', () => {
        const header = component.find('.create-team-header');
        const addMemberBtn = header.find('.add-members-btn').at(0);

        // Modal will not render
        const addMembersModalBefore = component.find('Modal');
        expect(addMembersModalBefore).toHaveLength(0);

        // Click on Add members button
        addMemberBtn.props().onClick();

        // Modal will render
        const addMembersModalAfter = component.find('Modal');
        expect(addMembersModalAfter).toHaveLength(1);
        expect(addMembersModalAfter.props().visible).toBe(true);
        expect(addMembersModalAfter.props().title).toBe('Add members');
    });

    it('Should change `addMembersModalToggle` to False and call `closeModal`Method when `onCancel` Modal is clicked', () => {
        // Arrange
        const header = component.find('.create-team-header');
        const addMemberBtn = header.find('.add-members-btn').at(0);
        const instance = component.instance();
        const spyCloseModal = jest.spyOn(instance, 'closeModal');

        // Click on Add members button
        addMemberBtn.props().onClick();

        // Modal will render
        const addMembersModal = component.find('Modal');
        expect(addMembersModal).toHaveLength(1);
        expect(component.state().addMembersModalToggle).toBe(true);

        // Click on on Cancel
        addMembersModal.props().onCancel();
        expect(component.state().addMembersModalToggle).toBe(false);

        // CloseModal method will be called
        expect(spyCloseModal).toHaveBeenCalled();
        expect(spyCloseModal).toHaveBeenCalledTimes(1);
    });

    it('Should render two tabs in the `Add members` Modal ', () => {
        // Arrange
        component.setState({ addMembersModalToggle: true });
        const addMembersModal = component.find('Modal');
        const tabPane = addMembersModal.find('TabPane');
        const existingUserTab = addMembersModal.find('TabPane').at(0);
        const newUserTab = addMembersModal.find('TabPane').at(1);

        // Assert
        expect(tabPane).toHaveLength(2);
        expect(existingUserTab.props().tab).toBe('Existing User');
        expect(newUserTab.props().tab).toBe('New User');
    });

    it('Should render `existing user` tab with two columns and call `adminSearchUsersByEmail` props when email searched', () => {
        // Arrange
        component.setState({ addMembersModalToggle: true });
        const modal = component.find('Modal');
        const existingUserTab = modal.find('TabPane').at(0);
        const memberDataCol = existingUserTab.find('Column').at(0);
        const addMemberCol = existingUserTab.find('Column').at(1);
        const searchEmailInput = memberDataCol.props().title().props;

        // Should render title with input field to enter an email
        expect(searchEmailInput.value).toBe('');
        expect(searchEmailInput.placeholder).toBe('Search users by Email');
        expect(searchEmailInput.type).toBe('text');

        // Change input field value will call `.adminSearchUsersByEmail()` props
        expect(props.adminSearchUsersByEmail).toHaveBeenCalledTimes(0);
        expect(component.state().emailInput).toBe('');

        searchEmailInput.onChange({ target: { value: 'testEmailInput', name: 'search-users-by-email' } });

        expect(component.state().emailInput).toBe('testEmailInput');
        expect(props.adminSearchUsersByEmail).toHaveBeenCalledTimes(1);
        expect(props.adminSearchUsersByEmail).toHaveBeenCalledWith('testEmailInput');

        //  Should render rows with data from `searchedEmails` props with `add member` button
        component.setState({
            searchedEmails: [
                {
                    id: 1,
                    firstname: 'test1FN',
                    lastname: 'test1LN',
                    email: 'test1@test.test',
                },

            ],
        });

        const memberDataRow = memberDataCol.props().render('test', component.state().searchedEmails[0]).props;

        expect(memberDataRow.children[0].props.children).toBe('test1FN test1LN');
        expect(memberDataRow.children[1].props.children).toBe('test1@test.test');

        const addMemberBtnRow = addMemberCol.props().render('test', component.state().searchedEmails[0]).props;

        expect(addMemberBtnRow.children).toBe('Add Member');
        expect(addMemberBtnRow.htmlType).toBe('button');

        // `Add member` button will update `teamMemberData` and `disabledAddButton` states
        addMemberBtnRow.onClick();

        expect(component.state().teamMembersData).toEqual([
            {
                is_manager: false,
                firstname: 'test1FN',
                lastname: 'test1LN',
                email: 'test1@test.test',
            },

        ]);
        expect(component.state().disabledAddButton).toEqual([{ id: 1 }]);
    });

    it('Should render `new user` tab with three input field and button', () => {
        // Arrange
        component.setState({ addMembersModalToggle: true });

        const modal = component.find('Modal');
        const newUserTab = modal.find('TabPane').at(1);
        const formItems = newUserTab.find('FormItem');
        const firstNameInput = newUserTab.find('Input').at(0).props();
        const lastNameInput = newUserTab.find('Input').at(1).props();
        const emailInput = newUserTab.find('Input').at(2).props();
        const addMemberBtn = newUserTab.find('Button').props();

        // Assert
        expect(newUserTab.props().tab).toBe('New User');
        expect(formItems).toHaveLength(3);

        // `First name` Input field will change  `nonExistingUserFirstName` state
        expect(firstNameInput.type).toBe('text');
        expect(firstNameInput.placeholder).toBe('First name');

        expect(component.state().nonExistingUserFirstName).toBe('');
        firstNameInput.onChange({ target: { value: 'testFirstName', name: 'nonExistingUserFirstName' } });
        expect(component.state().nonExistingUserFirstName).toBe('testFirstName');

        // `Last name` Input field  will change  `nonExistingUserLastName` state
        expect(lastNameInput.type).toBe('text');
        expect(lastNameInput.placeholder).toBe('Last name');

        expect(component.state().nonExistingUserLastName).toBe('');
        lastNameInput.onChange({ target: { value: 'testLastName', name: 'nonExistingUserLastName' } });
        expect(component.state().nonExistingUserLastName).toBe('testLastName');

        // `Email` Input field  will change  `nonExistingUserEmail` state
        expect(emailInput.type).toBe('text');
        expect(emailInput.placeholder).toBe('Email');

        expect(component.state().nonExistingUserEmail).toBe('');
        emailInput.onChange({ target: { value: 'testEmail', name: 'nonExistingUserEmail' } });
        expect(component.state().nonExistingUserEmail).toBe('testEmail');

        // Render `Add user` button and set `teamMembersData` state
        expect(addMemberBtn.children).toBe('Add user');
        expect(addMemberBtn.htmlType).toBe('button');

        // Check `first name`, `last name` and `email` state before clicking on `add user` button
        expect(component.state().nonExistingUserFirstName).toBe('testFirstName');
        expect(component.state().nonExistingUserLastName).toBe('testLastName');
        expect(component.state().nonExistingUserEmail).toBe('testEmail');
        expect(component.state().teamMembersData).toHaveLength(0);

        // Click `add user` button
        addMemberBtn.onClick();

        // Expect `teamMembersData` to Have length of one object
        expect(component.state().teamMembersData).toHaveLength(1);
        expect(component.state().teamMembersData[0].firstname).toBe('testFirstName');
        expect(component.state().teamMembersData[0].lastname).toBe('testLastName');
        expect(component.state().teamMembersData[0].email).toBe('testEmail');
        expect(component.state().teamMembersData[0].is_manager).toBe(false);
    });

    it('Should render `create team` button successfully', () => {
        const createTeamBtn = component.find('.create-team-btn');

        expect(createTeamBtn.props().children).toBe('Create team');
    });

    it('Should call `.adminCreateTeam()` when `create team` button is clicked', () => {
        const createTeamBtn = component.find('.create-team-btn');
        // set states to be called with
        const stateData = {
            teamName: 'testName',
            teamLogo: 'testLogo',
            teamMembersData: [
                {
                    firstname: 'test1FN',
                    lastname: 'test1LN',
                    email: 'test1@test.test',
                    is_manager: false,
                },

            ],
        };

        component.setState(stateData);

        const dataCalled = {
            logo: stateData.teamLogo,
            name: stateData.teamName,
            members: stateData.teamMembersData,
        };

        expect(props.adminCreateTeam).toHaveBeenCalledTimes(0);

        createTeamBtn.props().onClick();

        expect(props.adminCreateTeam).toHaveBeenCalledTimes(1);
        expect(props.adminCreateTeam).toHaveBeenCalledWith(dataCalled);
    });

    it('Should call `message.success` when `props.adminCreateTeam()` called ', () => {
        props.adminCreateTeam();
        expect(message.success).toHaveBeenCalled();
        jest.clearAllMocks();
    });
});
