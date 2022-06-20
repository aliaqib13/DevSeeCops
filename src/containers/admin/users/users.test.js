import React from 'react';
import { shallow } from 'enzyme';
import { message } from 'antd';
import AdminUsers from './users';

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

describe('Admin Users', () => {
    let component;
    const props = {
        adminUsers: {
            roles: [
                {
                    id: 1,
                    name: 'Administrator',
                    slug: 'administrator',
                    description: 'manage administration privileges',
                    created_at: '2020-06-17 19:38:08',
                    updated_at: '2020-06-17 19:38:08',
                },
                {
                    id: 2,
                    name: 'Author',
                    slug: 'author',
                    description: 'manage course',
                    created_at: '2020-06-17 19:38:08',
                    updated_at: '2020-06-17 19:38:08',
                },
            ],
            data: [
                {
                    id: 1,
                    firstname: 'Dominik',
                    lastname: 'de Smit',
                    activated: 1,
                    certificate_name: null,
                    coordinator: null,
                    email: 'dominik@araido.io',
                    is_fellow: 1,
                    roles: [{
                        id: 1,
                        name: 'Administrator',
                        slug: 'administrator',
                        description: 'manage administration privileges',
                        created_at: '2020-06-17 19:38:08',
                        updated_at: '2020-06-17 19:38:08',
                    }],
                    created_at: '2020-06-17 19:38:07',
                    updated_at: '2020-06-26 11:39:35',
                    subscription: { message: 'Random test message' },
                    customer_id: 'cus_test_fail',
                },
                {
                    id: 3,
                    firstname: 'Henry',
                    lastname: 'Tovmasyan',
                    activated: 1,
                    certificate_name: null,
                    coordinator: null,
                    email: 'henry@araido.io',
                    is_fellow: 0,
                    roles: [],
                    created_at: '2020-06-17 19:38:08',
                    updated_at: '2020-06-26 11:51:51',
                    subscription: '',
                },
            ],
        },
        adminFetchUsers: jest.fn(() => Promise.resolve(true)),
        changeFellow: jest.fn(() => Promise.resolve(true)),
        adminGetUserCurrentTokenBalance: jest.fn(() => Promise.resolve(true)),
        adminAddTokensToUser: jest.fn(() => Promise.resolve(true)),

    };

    beforeEach(() => {
        component = shallow(<AdminUsers {...props} />);
    });

    it('Should render successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should render 2 rows in table', () => {
        const table = component.find('.admin-users-table');

        expect(table).toHaveLength(1);
    });
    it('Should render column users name', () => {
        const column = component.find('.column-admin-users-name');
        expect(column).toHaveLength(1);
    });
    it('Should render column users email', () => {
        const column = component.find('.column-admin-users-email');
        expect(column).toHaveLength(1);
    });
    it('Should render column users status', () => {
        const column = component.find('.column-admin-users-status');
        expect(column).toHaveLength(1);
    });
    it('Should render column users roles', () => {
        const column = component.find('.column-admin-users-roles');
        expect(column).toHaveLength(1);
    });
    it('Should render actions column', () => {
        const actionsColumn = component.find('Column[title="Actions"]');
        expect(actionsColumn).toHaveLength(1);
        expect(actionsColumn.props().title).toBe('Actions');
    });
    it('Call changeFellow successfully', async () => {
        component.instance().fellow(1);
        expect(props.changeFellow).toHaveBeenCalledWith(1);
        await props.changeFellow();
        expect(message.success).toHaveBeenCalledWith('Changed!');
    });

    it('subscription column get the right props passed in', () => {
        expect(component.find('[data-testid="subscription-column"]')
            .props()
            .render('test', props.adminUsers.data[0]).props.subscription)
            .toStrictEqual(props.adminUsers.data[0].subscription);
    });

    it("Should render actions column's options", () => {
        const actionsColumn = component.find('Column[title="Actions"]');
        const actionColumnMenuItems = actionsColumn.props().render('test', props.adminUsers.data[1]).props.overlay.props;

        expect(actionColumnMenuItems.children[0].props.children[2]).toBe('Deactivate');
        expect(actionColumnMenuItems.children[1].props.children[2]).toBe('Edit');
        expect(actionColumnMenuItems.children[2].props.children[2]).toBe('Assign to Course');
        expect(actionColumnMenuItems.children[3].props.children[2]).toBe('Delete');
        expect(actionColumnMenuItems.children[4].props.children[2]).toBe('Reset Password');
        expect(actionColumnMenuItems.children[5].props.children[2]).toBe('Reset MFA');
        expect(actionColumnMenuItems.children[6].props.children[2]).toBe('Make Fellow');
        expect(actionColumnMenuItems.children[7].props.children[2]).toBe('Add Tokens');
        expect(actionColumnMenuItems.children[8].props.children.props.children[1]).toBe('User Statistics');
    });

    it('Should call `.adminGetUserCurrentTokenBalance()` when `addToken` menu item is clicked', () => {
        const actionsColumn = component.find('Column[title="Actions"]');
        const actionColumnMenuItems = actionsColumn.props().render('test', props.adminUsers.data[1]).props.overlay.props;
        const addTokenItem = actionColumnMenuItems.children[7].props;

        expect(props.adminGetUserCurrentTokenBalance).toHaveBeenCalledTimes(0);

        addTokenItem.onClick();

        expect(props.adminGetUserCurrentTokenBalance).toHaveBeenCalledTimes(1);
    });

    it('Should not render `AddTokensModal` component when `addTokenToUserModalVisible` state is false', () => {
        component.setState({ addTokenToUserModalVisible: false });

        const addTokensModal = component.find('AddTokensModal');
        expect(addTokensModal).toHaveLength(0);
    });

    it('Should render `AddTokensModal` component when `addTokenToUserModalVisible` state is true', () => {
        component.setState({ addTokenToUserModalVisible: true });

        const addTokensModal = component.find('AddTokensModal');
        expect(addTokensModal).toHaveLength(1);
    });
});
