import React, { Component } from 'react';
import {
    AutoComplete, Button, Drawer, Icon, Input, message, Table,
} from 'antd';

const { Column } = Table;

export default class CourseUsersDrawer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addUserLoader: false,
            deleteUserLoader: false,
            inputValue: '',
            searchList: [],
            searchEmail: '',
            currentPage: 1,
        };
    }

    addUserCourse = () => {
        const email = this.state.inputValue;

        if (!email) {
            message.error('Email is required.');
            return;
        }

        this.setState({
            addUserLoader: true,
        });

        this.props.addUserActiveCourse(email, this.props.selectedCourse).then(res => {
            if (res === true) {
                message.success('Success');
                this.setState({
                    inputValue: '',
                    searchList: [],
                });

                this.props.onClose();
            } else if (res.errors) {
                res.errors.forEach(error => {
                    message.error(error.message);
                });
            } else {
                message.error(res.message);
            }
            this.setState({
                addUserLoader: false,
            });
        });
    }

    removeUserActiveCourse = user_id => {
        this.setState({
            deleteUserLoader: true,
        });
        this.props.removeUserActiveCourse(user_id, this.props.selectedCourse).then(res => {
            if (res === true) {
                message.success('User active course deleted');
            } else {
                message.error(res.message);
            }
            this.setState({
                deleteUserLoader: false,
            });
        });
    }

    onSearch = value => {
        this.setState({
            inputValue: value,
        });

        if (value.length >= 3) {
            this.props.searchUserByEmail(value).then(res => {
                if (res !== false) {
                    this.setState({
                        searchList: res,
                    });
                }
            });
        }
    }

    onSelect = email => {
        this.setState({
            inputValue: email,
        });
    }

    changeSearchEmail = e => {
        this.setState({
            searchEmail: e.target.value,
        });
        const { currentPage } = this.state;
        const { selectedCourse, users } = this.props;
        this.props.getCourseUsers(selectedCourse, currentPage, users.perPage, e.target.value);
    }

    paginate = page => {
        const { selectedCourse, users } = this.props;
        const { searchEmail } = this.state;

        this.setState({
            currentPage: page,
        });

        this.props.getCourseUsers(selectedCourse, page, users.perPage, searchEmail);
    }

    render() {
        const { visible, users, showUserLoader } = this.props;
        const {
            addUserLoader, deleteUserLoader, inputValue, searchList, searchEmail, currentPage,
        } = this.state;

        return (
            <Drawer
                title="Users"
                className="course-users-drawer"
                width={550}
                placement="right"
                onClose={this.props.onClose}
                visible={visible}
                switchScrollingEffect={false}
            >
                <AutoComplete
                    size="large"
                    style={{ width: '100%' }}
                    dataSource={searchList}
                    onSelect={this.onSelect}
                    placeholder="add by email"
                    onSearch={this.onSearch}
                    value={inputValue}
                >
                    <Input
                        suffix={(
                            <Button
                                size="large"
                                style={{ marginRight: -12 }}
                                type="primary"
                                onClick={() => this.addUserCourse()}
                                loading={addUserLoader}
                            >
                                <Icon type="user-add" />
                            </Button>
                        )}
                    />
                </AutoComplete>

                <Table
                    size="lg"
                    pagination={{
                        onChange: this.paginate,
                        pageSize: users.perPage,
                        total: users.total,
                        current: currentPage,
                        position: 'top',
                        defaultCurrent: 1,
                    }}
                    loading={showUserLoader}
                    dataSource={users.data}
                    rowKey={item => item.id}
                    rowClassName="drawer-users-row"
                >
                    <Column
                        title={() => (
                            <Input
                                value={searchEmail}
                                placeholder="Search by Email"
                                onChange={this.changeSearchEmail}
                                name="searchEmail"
                            />
                        )}
                        key="email"
                        dataIndex="email"
                    />
                    <Column
                        title="actions"
                        key="actions"
                        render={(text, record) => (<Button type="danger" shape="circle" icon="delete" loading={deleteUserLoader} onClick={() => this.removeUserActiveCourse(record.id)} />)}
                    />
                </Table>
            </Drawer>
        );
    }
}
