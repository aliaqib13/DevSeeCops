import React, { Component } from 'react';
import {
    Form, Input, Icon, Row, Col, Button, message,
} from 'antd';
import { validateNewPassword } from '../../util/validators';

const focused = React.createRef();

class MenageProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            loading: false,
            passwordReadOnly: true,
            authUser: {
                firstname: '',
                lastname: '',
                email: '',
                id: '',
                password: '',
                passwordConfirmation: '',
                currentPassword: '',
                certificateName: '',
                linkedinUrl: '',
            },
        };
    }

    componentDidMount() {
        const { authUser } = this.state;
        const { focusInput } = this.props;
        authUser.firstname = this.props.authUser.firstname;
        authUser.lastname = this.props.authUser.lastname;
        authUser.email = this.props.authUser.email;
        authUser.id = this.props.authUser.id;
        authUser.certificateName = this.props.authUser.certificate_name;
        if (focusInput && focused.current) {
            focused.current.focus();
        }
        authUser.linkedinUrl = this.props.authUser.linkedin_url;

        this.setState({
            authUser,
        });
    }

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value,
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('The two passwords that you entered are inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        const { confirmDirty } = this.state;
        if (value && confirmDirty) {
            form.validateFields(['password_confirmation'], { force: true });
        }
        callback();
    };

    onInputChange = e => {
        const { name } = e.target;
        const { value } = e.target;
        const { authUser } = this.state;
        authUser[name] = value;
        this.setState({
            authUser,
        });
    }

    editUserProfile = e => {
        e.preventDefault();
        let hasError = false;

        this.props.form.validateFields(err => {
            if (err) {
                hasError = true;
                for (const item in err) {
                    err[item].errors.forEach(msg => {
                        message.error(msg.message);
                    });
                }
            }
        });

        if (hasError) {
            return;
        }

        this.setState({
            loading: true,
        });
        const {
            firstname, lastname, certificateName, password, passwordConfirmation, currentPassword, linkedinUrl,
        } = this.state.authUser;
        this.props.editProfile({
            firstname,
            lastname,
            certificate_name: certificateName,
            password: currentPassword ? password : '',
            password_confirmation: currentPassword ? passwordConfirmation : '',
            current_password: currentPassword,
            linkedin_url: linkedinUrl,
        }).then(res => {
            this.setState({
                loading: false,
            });
            if (res === true) {
                message.success('Edited');
                const { authUser } = this.state;
                authUser.password = '';
                authUser.passwordConfirmation = '';
                authUser.currentPassword = '';
                this.setState({
                    authUser,
                });
                const { form } = this.props;
                form.resetFields(['password', 'password_confirmation', 'current_password']);
            } else if (res.errors) {
                res.errors.forEach(error => {
                    message.error(error.message);
                });
            } else {
                message.error(res.message);
            }
        });
    }

    onFocus = () => {
        this.setState({
            passwordReadOnly: false,
        });
    }

    render() {
        const { loading, passwordReadOnly, authUser } = this.state;
        const {
            firstname, lastname, certificateName, email, password, passwordConfirmation, currentPassword, linkedinUrl,
        } = authUser;
        const { getFieldDecorator } = this.props.form;

        let passwordValidationRules = [];
        let confirmPassRules = [];
        let disabledPass = true;

        if (currentPassword) {
            passwordValidationRules = [
                {
                    required: true,
                    message: 'The password is required',
                },
                {
                    min: 8,
                    message: 'The password must be of minimum length 8 characters',
                },
                {
                    validator: this.validateToNextPassword,
                },
                {
                    validator: validateNewPassword,
                },
            ];

            confirmPassRules = [
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                {
                    validator: this.compareToFirstPassword,
                },
            ];

            disabledPass = false;
        }

        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Form className="login-form" autoComplete="new-form">

                            <Form.Item label="E-mail">
                                {getFieldDecorator('email', {
                                    initialValue: email,
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'The input is not a valid e-mail!',
                                        },
                                    ],
                                })(<Input
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    name="email"
                                    onChange={this.onInputChange}
                                    disabled
                                />)}
                            </Form.Item>

                            <Form.Item label="LinkedIn profile">
                                <Input
                                    prefix={<Icon type="linkedin" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    name="linkedinUrl"
                                    value={linkedinUrl}
                                    onChange={this.onInputChange}
                                />
                            </Form.Item>

                            <Form.Item label="First Name" key={1}>
                                {getFieldDecorator('firstname', {
                                    initialValue: firstname,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'First Name is required',
                                        },
                                        {
                                            max: 36,
                                            message: 'First Name field characters cannot be greater 36',
                                        },
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="text"
                                        name="firstname"
                                        placeholder="First name"
                                        onChange={this.onInputChange}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item label="Last Name" key={12}>
                                {getFieldDecorator('lastname', {
                                    initialValue: lastname,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Last Name is required',
                                        },
                                        {
                                            max: 36,
                                            message: 'Last Name field characters cannot be greater 36',
                                        },
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        name="lastname"
                                        placeholder="Last name"
                                        onChange={this.onInputChange}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item label="Name on Certificate" key={2}>
                                {getFieldDecorator('certificate_name', {
                                    initialValue: certificateName,
                                    rules: [
                                        {
                                            max: 20,
                                            message: 'Name on Certificate cannot be longer then 20 characters',
                                        },
                                        {
                                            required: true,
                                            message: 'Name on Certificate is required',
                                        },
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="safety-certificate" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        name="certificateName"
                                        placeholder="Name on Certificate"
                                        onChange={this.onInputChange}
                                        ref={focused}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item label="Current Password" key={3}>
                                {getFieldDecorator('current_password', {
                                    initialValue: currentPassword,
                                })(
                                    <Input.Password
                                        autoComplete="off"
                                        onFocus={this.onFocus}
                                        readOnly={passwordReadOnly}
                                        prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        name="currentPassword"
                                        placeholder="Type Here Your Current Password "
                                        onChange={this.onInputChange}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item label="New Password" hasFeedback key={4}>
                                {getFieldDecorator('password', {
                                    initialValue: password,
                                    rules: passwordValidationRules,
                                })(<Input.Password
                                    disabled={disabledPass}
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    onChange={this.onInputChange}
                                    name='password'
                                />)}
                            </Form.Item>
                            <Form.Item label="Confirm New Password" hasFeedback key={5}>
                                {getFieldDecorator('password_confirmation', {
                                    initialValue: passwordConfirmation,
                                    rules: confirmPassRules,
                                })(<Input.Password
                                    disabled={disabledPass}
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    onChange={this.onInputChange}
                                    onBlur={this.handleConfirmBlur}
                                    name='passwordConfirmation'
                                />)}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading} onClick={this.editUserProfile}>
                                    Save changes
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Form.create({ name: 'menage_profile' })(MenageProfile);
