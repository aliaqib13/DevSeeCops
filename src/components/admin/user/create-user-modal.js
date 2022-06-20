import React, { Component } from 'react';
import {
    Modal, Form, Input, Button, Select, message,
} from 'antd';

const { Option } = Select;

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    role: 0,
    loading: false,
};

class CreateUserModal extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    handleOk = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true,
                });
                const {
                    firstname, lastname, email, role,
                } = this.state;
                this.props.createUser({
                    firstname,
                    lastname,
                    email,
                    role,
                }).then(res => {
                    this.setState({
                        loading: false,
                    });
                    if (res === true) {
                        message.success('Created');
                        this.props.form.resetFields();
                        this.setState(initialState);
                        this.props.toggleModal();
                    } else {
                        message.error(res.message);
                    }
                });
            }
        });
    }

    handleCancel = e => {
        this.setState(initialState);
        this.props.form.resetFields();
        this.props.toggleModal();
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

    render() {
        const { role, loading } = this.state;
        const { roles, visible, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                title="Create User"
                visible={visible}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="create" type="primary" loading={loading} onClick={this.handleOk}>
                        Create
                    </Button>,
                ]}
            >
                <Form>
                    <Form.Item>
                        {getFieldDecorator('firstname', {
                            rules: [{ required: true }],
                        })(
                            <Input type="text" name="firstname" placeholder="First name" onChange={this.onChangeHandle} />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('lastname', {
                            rules: [{ required: true }],
                        })(
                            <Input type="text" name="lastname" placeholder="Last name" onChange={this.onChangeHandle} />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, type: 'email' }],
                        })(
                            <Input type="text" name="email" placeholder="Email" onChange={this.onChangeHandle} />,
                        )}

                    </Form.Item>
                    <Form.Item>
                        <Select placeholder="select role" name="role" onChange={this.roleChangeHandle} value={role}>
                            <Option key="user" value={0}>User</Option>
                            {
                                roles.map(item => (<Option key={item.id} value={item.id}>{item.name}</Option>))
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create({ name: 'create_user' })(CreateUserModal);
