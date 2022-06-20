import React, { Component } from 'react';
import {
    Form, Typography, Table, Button, message, Modal, Input, Tabs, Checkbox,
} from 'antd';

import './create-team-page.scss';

const { Title } = Typography;
const { Column } = Table;
const { TabPane } = Tabs;

class CreateTeamPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addMembersModalToggle: false,
            nonExistingUserFirstName: '',
            nonExistingUserLastName: '',
            nonExistingUserEmail: '',
            teamName: '',
            teamLogo: '',
            emailInput: '',
            searchedEmails: [],
            teamMembersData: [],
            disabledAddButton: [],
        };
    }

    closeModal = () => {
        this.setState({
            addMembersModalToggle: false,
        });
    }

    handleAddMembersClick = () => {
        this.setState({
            addMembersModalToggle: true,
        });
    }

    handleSearchChange = e => {
        const { adminSearchUsersByEmail } = this.props;

        this.setState({
            emailInput: e.target.value,
        });

        return adminSearchUsersByEmail(e.target.value).then(res => {
            const searchedUserList = res.map(user => ({
                id: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname, is_manager: false,
            }));

            this.setState({
                searchedEmails: searchedUserList,
            });
            return null;
        });
    }

    handleExistingUserAddMemberClick = selectedUserId => {
        const { searchedEmails, teamMembersData, disabledAddButton } = this.state;

        const selectedUserEmail = searchedEmails.find(item => item.id === selectedUserId);

        const user = {
            firstname: selectedUserEmail.firstname,
            lastname: selectedUserEmail.lastname,
            email: selectedUserEmail.email,
            is_manager: false,
        };

        const disableButtonUser = {
            id: selectedUserEmail.id,
        };

        const existingUserAsMember = [
            ...teamMembersData,
            user,
        ];

        const existingUserDisabledAddButton = [
            ...disabledAddButton,
            disableButtonUser,
        ];

        this.setState({
            teamMembersData: existingUserAsMember,
            disabledAddButton: existingUserDisabledAddButton,
        });
    }

    handleAddNewUserAsMember = () => {
        const { teamMembersData } = this.state;

        const {
            nonExistingUserFirstName,
            nonExistingUserLastName,
            nonExistingUserEmail,
        } = this.state;

        const newUser = {
            firstname: nonExistingUserFirstName,
            lastname: nonExistingUserLastName,
            email: nonExistingUserEmail,
            is_manager: false,
        };

        const newUserAsMember = [...teamMembersData, newUser];

        this.setState({
            teamMembersData: newUserAsMember,
        });
    }

    onChangeHandle = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onChangeIsManagerCheckBox = e => {
        const { teamMembersData } = this.state;

        const teamMembers = [...teamMembersData];
        const index = teamMembers.findIndex(member => member.email === e.target.value); // find the particular object to update using email
        teamMembers[index] = { ...teamMembers[index], is_manager: !teamMembers[index].is_manager };
        this.setState({ teamMembersData: teamMembers });
    }

    handleCreateTeamClick =() => {
        const { adminCreateTeam } = this.props;
        const { teamName, teamLogo, teamMembersData } = this.state;

        const teamData = {
            name: teamName,
            logo: teamLogo,
            members: teamMembersData,
        };

        return adminCreateTeam(teamData).then(res => {
            if (res) {
                message.success(`Team ${res.name} has been created`);
                setTimeout(() => window.location.assign('/platform/admin/teams'), 1000);
            } else {
                message.error(res.message);
            }
            return null;
        }).catch(err => console.warn(err));
    }

    render() {
        const {
            addMembersModalToggle, emailInput, searchedEmails, teamName, teamLogo, teamMembersData, disabledAddButton,
        } = this.state;

        return (
            <>
                <div className='create-team-container'>
                    <div className='page-title'>
                        <Title>
                            Create a team
                        </Title>
                    </div>
                    <div className='create-team-header'>
                        <div className='team-name-logo-container'>
                            {teamLogo
                        && <img src={teamLogo} alt='team-logo' className='team-logo-img' />}
                            <Input
                                value={teamLogo}
                                placeholder='Enter team logo Url ...'
                                onChange={this.onChangeHandle}
                                name='teamLogo'
                                className='team-name-logo-input'

                            />
                            <Input
                                value={teamName}
                                placeholder='Enter team name ...'
                                onChange={this.onChangeHandle}
                                name='teamName'
                                className='team-name-logo-input team-name-input'
                            />
                        </div>

                        <Button className='add-members-btn' onClick={this.handleAddMembersClick}>Add members</Button>
                    </div>
                    <div>
                        <Table
                            className='admin-team-members-table'
                            loading={false}
                            dataSource={teamMembersData}
                            rowKey={item => item.email}
                            pagination

                        >
                            <Column
                                title='Member name'
                                key='member-name'
                                render={(text, record) => (
                                    <>
                                        {`${record.firstname} ${record.lastname}`}
                                    </>
                                )}
                                className='column-member-name'
                            />
                            <Column
                                title='Member email'
                                key='member-email'
                                render={(text, record) => (
                                    <>
                                        {record.email}
                                    </>
                                )}
                                className='column-member-email'
                            />

                            <Column
                                title='As Manager'
                                key='as-manager'
                                render={(text, record) => (
                                    <Checkbox onChange={this.onChangeIsManagerCheckBox} value={record.email} className='manager-checkbox' id={record.email} checked={record.is_manager}>
                                        {record.is_manager}
                                    </Checkbox>
                                )}
                                className='column-member-is-manager'
                            />

                        </Table>
                    </div>
                    <div className='create-team-footer'>
                        <Button type='primary' className='create-team-btn' onClick={this.handleCreateTeamClick}>Create team</Button>
                    </div>
                </div>
                {
                    (addMembersModalToggle)
                && (
                    <Modal
                        visible={addMembersModalToggle}
                        title='Add members'
                        onCancel={this.closeModal}
                        width={700}
                        footer={[
                            <Button key='back' onClick={this.closeModal}>
                                Done
                            </Button>,

                        ]}
                    >
                        <Tabs defaultActiveKey='1'>
                            <TabPane tab='Existing User' key={1}>
                                <Table
                                    className='admin-users-table'
                                    loading={false}
                                    dataSource={searchedEmails}
                                    rowKey={item => item.id}
                                >
                                    <Column
                                        title={() => (
                                            <Input
                                                value={emailInput}
                                                placeholder='Search users by Email'
                                                onChange={this.handleSearchChange}
                                                name='search-users-by-email'
                                            />

                                        )}
                                        key='team-member'
                                        render={(text, record) => (
                                            <div>
                                                <h4>{`${record.firstname} ${record.lastname}`}</h4>
                                                <h5>{record.email}</h5>
                                            </div>
                                        )}
                                        className='column-team-member-email'
                                    />
                                    <Column
                                        key='add-member'
                                        render={(text, record) => (

                                            <Button
                                                key='submit'
                                                type='link'
                                                onClick={() => this.handleExistingUserAddMemberClick(record.id)}
                                                disabled={disabledAddButton.some(item => item.id === record.id)}
                                            >
                                                Add Member
                                            </Button>

                                        )}
                                        className='column-team-manager-checkbox'
                                    />

                                </Table>
                            </TabPane>
                            <TabPane tab='New User' key={2}>
                                <Form>
                                    <Form.Item>
                                        <Input type='text' name='nonExistingUserFirstName' placeholder='First name' onChange={this.onChangeHandle} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Input type='text' name='nonExistingUserLastName' placeholder='Last name' onChange={this.onChangeHandle} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Input type='text' name='nonExistingUserEmail' placeholder='Email' onChange={this.onChangeHandle} />
                                    </Form.Item>
                                    <Button key='create' type='primary' onClick={this.handleAddNewUserAsMember}>
                                        Add user
                                    </Button>
                                </Form>
                            </TabPane>

                        </Tabs>

                    </Modal>
                )
                }

            </>
        );
    }
}

export default CreateTeamPage;
