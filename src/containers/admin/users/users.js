import React, { Component } from 'react';
import {
    Typography, Table, Button, message, Tag, Modal, Icon, Dropdown, Menu, Input, Select, Tabs,
} from 'antd';
import { NavLink } from 'react-router-dom';
import { CSVLink } from 'react-csv';

import CreateUserModal from '../../../components/admin/user/create-user-modal';
import UpdateUserModal from '../../../components/admin/user/update-user-modal';
import SubscriptionDisplay from '../../../components/subscription-display/SubscriptionDisplay';
import AddTokensModal from '../../../components/admin/user/add-tokens-modal';

const { Option, OptGroup } = Select;
const { Title } = Typography;
const { Column } = Table;
const confirmModal = Modal.confirm;
const { TabPane } = Tabs;

class AdminUsers extends Component {
    constructor(props) {
        super(props);
        this.loader = message.loading('Loading..', 0);
        this.state = {
            userCreateModalVisible: false,
            userUpdateModalVisible: false,
            editingUser: null,
            currentPage: 1,
            pageSize: 10,
            searchName: '',
            searchEmail: '',
            searchStatus: '',
            searchRole: '',
            addTokenToUserModalVisible: false,
            selectedUserToAddTokens: null,
        };
    }

    componentDidMount() {
        const { pageSize, currentPage } = this.state;
        if (this.props.match?.params?.role) {
            this.setState({ searchRole: this.props.match?.params?.role });
        }
        this.props.adminFetchUsers(currentPage, pageSize, '', '', '', this.props.match?.params?.role).then(res => {
            this.loader();
        });
    }

    toggleUserCreateModal = () => {
        this.setState({
            userCreateModalVisible: !this.state.userCreateModalVisible,
        });
    }

    toggleUpdateUserModal = () => {
        this.setState({
            userUpdateModalVisible: !this.state.userUpdateModalVisible,
        });
    }

    toggleAddUserTokenModal = () => {
        const { addTokenToUserModalVisible } = this.state;
        this.setState({
            addTokenToUserModalVisible: !addTokenToUserModalVisible,
        });
    }

    editUser = id => {
        const { data } = this.props.adminUsers;
        const user = data.find(x => x.id === id);

        this.setState({
            editingUser: user,
        });
        this.toggleUpdateUserModal();
    }

    assignCourse = () => {
        const { history } = this.props;
        history.push('/platform/admin/course-administration', true);
    }

    showDeleteConfirm = id => {
        const { adminDeleteUser } = this.props;
        confirmModal({
            title: 'Are you sure you want to delete this user?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                adminDeleteUser(id).then(res => {
                    if (res) {
                        message.success('Deleted!');
                    } else {
                        message.error('Something went wrong, please try again.');
                    }
                });
            },
        });
    }

    resetPassword = id => {
        const { resetUserPassword } = this.props;
        confirmModal({
            title: 'Are you sure you want to reset this user\'s password?',
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk: () => {
                const loader = message.loading('Resetting password...', 0);
                resetUserPassword(id).then(res => {
                    loader();
                    if (res.status >= 200 && res.status < 300) {
                        message.success(res.data.message);
                    } else {
                        message.error(res.data.message);
                    }
                });
            },
        });
    }

    resetMFA = id => {
        const { resetMFA } = this.props;
        const loader = message.loading('Resetting', 0);
        resetMFA(id).then(res => {
            loader();
            if (res === true) {
                message.success('MFA Reset');
            } else {
                message.error('Something went wrong, please try again.');
            }
        });
    }

    showChangeStatusConfirm = (id, status) => {
        const { adminChangeUserStatus } = this.props;
        confirmModal({
            title: `Are you sure change this user's status to ${status ? 'Inactive' : 'Active'}?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                adminChangeUserStatus(id, !status).then(res => {
                    if (res) {
                        message.success('Success!');
                    } else {
                        message.error('Something went wrong, please try again.');
                    }
                });
            },
        });
    }

    fellow = id => {
        const { changeFellow } = this.props;
        changeFellow(id).then(res => {
            if (res === true) {
                message.success('Changed!');
            } else {
                message.error(res.data.message || 'Something went wrong, please try again.');
            }
        });
    }

    paginate = page => {
        const { adminFetchUsers } = this.props;
        const {
            pageSize, searchName, searchEmail, searchStatus, searchRole,
        } = this.state;
        this.setState({
            currentPage: page.current,
        });
        adminFetchUsers(page.current, pageSize, searchName, searchEmail, searchStatus, searchRole).then(res => {
        });
    }

    changeSearchName = e => {
        const { adminFetchUsers } = this.props;
        const {
            currentPage, pageSize, searchEmail, searchStatus, searchRole,
        } = this.state;
        this.setState({
            searchName: e.target.value,
        });
        adminFetchUsers(currentPage, pageSize, e.target.value, searchEmail, searchStatus, searchRole);
    }

    changeSearchEmail = e => {
        const { adminFetchUsers } = this.props;
        const {
            currentPage, pageSize, searchName, searchStatus, searchRole,
        } = this.state;
        this.setState({
            searchEmail: e.target.value,
        });
        adminFetchUsers(currentPage, pageSize, searchName, e.target.value, searchStatus, searchRole);
    }

    changeSearchStatus = e => {
        const { adminFetchUsers } = this.props;
        const {
            currentPage, pageSize, searchName, searchEmail, searchRole,
        } = this.state;
        this.setState({
            searchStatus: e,
        });
        adminFetchUsers(currentPage, pageSize, searchName, searchEmail, e, searchRole);
    }

    changeSearchRoles = e => {
        const { adminFetchUsers } = this.props;
        const {
            currentPage, pageSize, searchName, searchEmail, searchStatus,
        } = this.state;
        this.setState({
            searchRole: e,
        });
        adminFetchUsers(currentPage, pageSize, searchName, searchEmail, searchStatus, e);
    }

    createCSVData = (csvData = []) => csvData.map(e => ({ firstname: e.firstname, lastname: e.lastname, email: e.email }))

    handleGetUserToAddTokens = async userId => {
        const { data } = this.props.adminUsers;
        const user = data.find(x => x.id === userId);

        const userTokenBalance = await this.props.adminGetUserCurrentTokenBalance(userId);

        return this.setState({
            addTokenToUserModalVisible: true,
            selectedUserToAddTokens: {
                ...user,
                tokenBalance: userTokenBalance,
            },
        });
    }

    render() {
        const {
            adminUsers: {
                data, roles, total, csvData,
            },
        } = this.props;
        const {
            userCreateModalVisible, userUpdateModalVisible, editingUser, currentPage, pageSize, searchName, searchEmail,
            addTokenToUserModalVisible, selectedUserToAddTokens,
        } = this.state;

        const {
            adminAddTokensToUser, adminUpdateUser, adminCreateUser, getPermissions,
        } = this.props;

        const CsvData = this.createCSVData(csvData);
        const linkStyle = { color: 'inherit' };
        return (

            <div className="user-tab-container">
                <Tabs defaultActiveKey="users-list">
                    <TabPane tab="Users" key="users-list">
                        <div className="page-title">
                            <Title>
                                Users
                            </Title>
                            <Button type="primary" onClick={this.toggleUserCreateModal}>Create User</Button>

                            <CSVLink
                                data={CsvData}
                                filename="users-data.csv"
                                target="_blank"
                            >
                                <Button type="primary" style={{ marginLeft: '20px' }}>Export CSV</Button>
                            </CSVLink>
                        </div>
                        <div>
                            <Table
                                className="admin-users-table"
                                loading={false}
                                dataSource={data}
                                rowKey={item => item.id}
                                onChange={this.paginate}
                                pagination={
                                    {
                                        position: 'bottom',
                                        current: currentPage,
                                        pageSize,
                                        total,
                                        defaultCurrent: 1,
                                    }
                                }
                            >
                                <Column
                                    title={() => (
                                        <Input
                                            value={searchName}
                                            placeholder="Search user by Name"
                                            onChange={this.changeSearchName}
                                            name="searchName"
                                        />
                                    )}
                                    key="name"
                                    render={(text, record) => (
                                        <>
                                            <NavLink style={linkStyle} to={`/platform/admin/user-statistics/${record.id}`}>
                                                {record.firstname}
                                                {' '}
                                                {record.lastname}
                                            </NavLink>
                                            {record.is_fellow ? <Tag color="blue">fellow</Tag> : ''}
                                        </>
                                    )}
                                    className="column-admin-users-name"
                                />
                                <Column
                                    title={() => (
                                        <Input
                                            value={searchEmail}
                                            placeholder="Search user by Email"
                                            onChange={this.changeSearchEmail}
                                            name="searchEmail"
                                        />
                                    )}
                                    render={(text, record) => (
                                        <NavLink style={linkStyle} to={`/platform/admin/user-statistics/${record.id}`}>
                                            {record.email}
                                        </NavLink>
                                    )}
                                    key="email"
                                    className="column-admin-users-email"
                                />
                                <Column
                                    title={() => (
                                        <Select placeholder="Search by Status" style={{ width: 200 }} onChange={this.changeSearchStatus}>
                                            <OptGroup label="Status">
                                                <Option value="">All</Option>
                                                <Option value="active">Active</Option>
                                                <Option value="unActive">Unactive</Option>
                                            </OptGroup>
                                        </Select>
                                    )}
                                    key="activated"
                                    render={(text, record) => (<Tag color={record.activated ? 'blue' : 'red'}>{record.activated ? 'Active' : 'Inactive'}</Tag>)}
                                    className="column-admin-users-status"
                                />
                                <Column
                                    title={() => (
                                        <Select placeholder="Search by Roles" style={{ width: 200 }} onChange={this.changeSearchRoles}>
                                            <OptGroup label="Roles">
                                                <Option value="">All</Option>
                                                <Option value="regular_users">Regular User</Option>
                                                <Option value="fellow">Fellow</Option>
                                                <Option value="fellow_operator">Fellow Operator</Option>
                                                {
                                                    roles.map(e => <Option key={e.slug} value={e.slug}>{e.name}</Option>)
                                                }
                                            </OptGroup>
                                        </Select>
                                    )}
                                    key="id"
                                    render={(text, record) => (
                                        <>
                                            {record.roles && record.roles.map(item => (<Tag color="blue" key={item.id}>{item.slug}</Tag>))}
                                            {record.permissions && record.permissions.map(item => (<Tag color="blue" key={item.id}>{item.slug}</Tag>))}
                                        </>
                                    )}
                                    className="column-admin-users-roles"
                                />
                                <Column
                                    data-testid='subscription-column'
                                    title="Subscription"
                                    key="subscriptionDetails"
                                    render={(text, record) => <SubscriptionDisplay subscription={record.subscription} />}
                                />
                                <Column
                                    title="Actions"
                                    key="actions"
                                    style={{ width: '80px' }}
                                    render={(text, record) => (
                                        <Dropdown overlay={(
                                            <Menu>
                                                <Menu.Item
                                                    onClick={() => this.showChangeStatusConfirm(
                                                        record.id, record.activated,
                                                    )}
                                                >
                                                    <Icon type={`${record.activated ? 'close' : 'check'}-circle`} />
                                                    {' '}
                                                    {record.activated ? 'Deactivate' : 'Activate'}
                                                </Menu.Item>
                                                <Menu.Item onClick={() => this.editUser(record.id)}>
                                                    <Icon type="edit" />
                                                    {' '}
                                                    Edit
                                                </Menu.Item>
                                                <Menu.Item onClick={() => this.assignCourse()}>
                                                    <Icon type="plus-circle" />
                                                    {' '}
                                                    Assign to Course
                                                </Menu.Item>
                                                <Menu.Item onClick={() => this.showDeleteConfirm(record.id)}>
                                                    <Icon type="delete" />
                                                    {' '}
                                                    Delete
                                                </Menu.Item>
                                                <Menu.Item onClick={() => this.resetPassword(record.id)}>
                                                    <Icon type="redo" />
                                                    {' '}
                                                    Reset Password
                                                </Menu.Item>
                                                <Menu.Item onClick={() => this.resetMFA(record.id)}>
                                                    <Icon type="redo" />
                                                    {' '}
                                                    Reset MFA
                                                </Menu.Item>
                                                <Menu.Item onClick={() => this.fellow(record.id)}>
                                                    <Icon type={record.is_fellow ? 'usergroup-delete' : 'usergroup-add'} />
                                                    {' '}
                                                    {record.is_fellow ? 'Remove Fellow' : 'Make Fellow'}
                                                </Menu.Item>
                                                <Menu.Item onClick={() => this.handleGetUserToAddTokens(record.id)}>
                                                    <Icon type="wallet" />
                                                    {' '}
                                                    Add Tokens
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <NavLink to={`/platform/admin/user-statistics/${record.id}`}>
                                                        <Icon type="bar-chart" style={{ marginRight: '10px' }} />
                                                        User Statistics
                                                    </NavLink>
                                                </Menu.Item>
                                            </Menu>
                                        )}
                                        >
                                            <Button>
                                                Actions
                                                {' '}
                                                <Icon type="down" />
                                            </Button>
                                        </Dropdown>
                                    )}
                                />
                            </Table>
                        </div>

                        <CreateUserModal
                            toggleModal={this.toggleUserCreateModal}
                            visible={userCreateModalVisible}
                            createUser={data => adminCreateUser(data)}
                            roles={roles}
                        />
                        {
                            userUpdateModalVisible
                                && (
                                    <UpdateUserModal
                                        toggleModal={this.toggleUpdateUserModal}
                                        visible={userUpdateModalVisible}
                                        updateUser={(id, data) => adminUpdateUser(id, data)}
                                        roles={roles}
                                        user={editingUser}
                                        getPermissions={getPermissions}
                                    />
                                )
                        }
                        {addTokenToUserModalVisible && (
                            <AddTokensModal
                                toggleModal={this.toggleAddUserTokenModal}
                                visible={addTokenToUserModalVisible}
                                user={selectedUserToAddTokens}
                                adminAddTokensToUser={adminAddTokensToUser}
                            />
                        )}
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default AdminUsers;
