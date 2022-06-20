import React, { Component } from 'react';
import {
    Modal, Form, Input, Button, Select, message, Spin,
} from 'antd';

const { Option } = Select;

const initialState = {
    firstname: '',
    lastname: '',
    role: 0,
    loading: false,
    userPermissions: [],
    searchList: [],
    fetching: false,
    newPermissions: [],
    deletedPermissions: [],
};

class UpdateUserModal extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    componentDidMount() {
        const { user } = this.props;
        const userPermissions = user.permissions.map(item => item.name);
        this.setState({
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.roles.length ? user.roles[0].id : 0,
            userPermissions,
        });
    }

    handleOk = e => {
        e.preventDefault();
        this.setState({
            loading: true,
        });

        const {
            firstname, lastname, role, newPermissions, deletedPermissions,
        } = this.state;
        const { user: { id }, updateUser, toggleModal } = this.props;

        return updateUser(id, {
            firstname,
            lastname,
            role,
            newPermissions,
            deletedPermissions,
        }).then(res => {
            this.setState({
                loading: false,
            });
            if (res === true) {
                message.success('Saved');
                this.setState(initialState);
                toggleModal();
            } else {
                message.error(res.message);
            }
        });
    }

    handleCancel = e => {
        const { toggleModal } = this.props;
        this.setState(initialState);

        toggleModal();
    }

    onChangeHandle = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    roleChangeHandle = value => {
        this.setState({
            role: value,
        });
    }

    onSearchUserPermissions = value => {
        const { getPermissions } = this.props;

        this.setState({
            fetching: true,
        });
        if (value.length > 3 && value.length < 254) {
            getPermissions(value).then(res => {
                if (res !== false) {
                    const searchList = res.map(item => ({
                        id: item.id,
                        name: item.name,
                    }));
                    this.setState({
                        searchList,
                    });
                }
            });
        }
    }

    onSelectUserEmailsPermissions = (permission, props) => {
        const { key } = props;
        const userPermissions = [...this.state.userPermissions];
        const newPermissions = [...this.state.newPermissions];
        if (key === permission) {
            return message.error('please select existing permissions');
        }
        userPermissions.push(permission);
        newPermissions.push(parseInt(key));
        this.setState({
            userPermissions,
            newPermissions,
        });
    }

    onDeselectUserEmailsPermissions = (permission, props) => {
        const { key } = props;
        const { permissions } = this.props.user;
        const { deletedPermissions, userPermissions, newPermissions } = this.state;
        if (key === permission) {
            const existingPermissionId = permissions.find(item => item.name === permission).id;
            deletedPermissions.push(existingPermissionId);
            this.setState({
                deletedPermissions,
            });
        } else {
            newPermissions.splice(newPermissions.indexOf(key), 1);
            this.setState({
                newPermissions,
            });
        }
        userPermissions.splice(userPermissions.indexOf(permission), 1);
        this.setState({
            userPermissions,
        });
    }

    render() {
        const {
            loading, firstname, lastname, role, userPermissions, fetching, searchList,
        } = this.state;
        const { roles, visible } = this.props;
        return (
            <Modal
                title="Edit User"
                visible={visible}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" loading={loading} onClick={this.handleOk}>
                        Save
                    </Button>,
                ]}
            >
                <Form>
                    <Form.Item>
                        <Input type="text" value={firstname} name="firstname" placeholder="First name" onChange={this.onChangeHandle} />
                    </Form.Item>
                    <Form.Item>
                        <Input type="text" value={lastname} name="lastname" placeholder="Last name" onChange={this.onChangeHandle} />
                    </Form.Item>
                    <Form.Item>
                        <Select placeholder="select role" name="role" onChange={this.roleChangeHandle} value={(role === 2 ? 0 : role)}>
                            <Option key="user" value={0}>User</Option>
                            {
                                roles.map(item => {
                                    if (item.slug === 'author') {
                                        return false;
                                    }
                                    return (<Option key={item.id} value={item.id}>{item.name}</Option>);
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Add Permission">
                        <Select
                            mode='tags'
                            style={{ width: '100%' }}
                            placeholder="search by permission"
                            value={userPermissions}
                            notFoundContent={fetching ? <Spin size="small" /> : null}
                            filterOption={false}
                            onDeselect={this.onDeselectUserEmailsPermissions}
                            onSelect={this.onSelectUserEmailsPermissions}
                            onSearch={this.onSearchUserPermissions}
                        >
                            {searchList.map(item => (
                                <Select.Option key={item.id} value={item.name}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default UpdateUserModal;
