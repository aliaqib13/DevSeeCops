import React, { Component } from 'react';
import ReactGA from 'react-ga';
import {
    Button, Card, Col, Form, Input, message, Row, Typography,
} from 'antd';
import ParticleComponent from '../../components/login/ParticleComponent';
import { CATEGORIES, ACTIONS } from '../../util/GAEventConstants';
import './password-reset.scss';

const { Title } = Typography;

class PasswordReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirm_password: '',
            loading: false,
        };
    }

    componentDidMount = () => {
        ReactGA.event({
            category: CATEGORIES.RESET_PASSWORD,
            action: ACTIONS.RESET_LINK_FROM_EMAIL(),
        });
    }

    onChangeHandle = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    resetUserPassword = () => {
        const { password, confirm_password: confirmPassword } = this.state;
        const {
            form: { validateFields }, resetPassword, history, match: { params: { token } },
        } = this.props;
        const atoken = token;
        if (password !== confirmPassword) {
            message.error('Passwords doesn\'t match');
            return false;
        }

        if (!atoken) {
            message.error('Invalid token.');
            return false;
        }
        validateFields(err => {
            if (!err) {
                this.setState({
                    loading: false,
                });

                resetPassword({
                    password,
                    confirm_password: confirmPassword,
                    atoken,
                }).then(res => {
                    if (res.status >= 200 && res.status < 300) {
                        ReactGA.event({
                            category: CATEGORIES.RESET_PASSWORD,
                            action: ACTIONS.PASSWORD_CHANGED(),
                        });
                        message.success(res.data.message);
                        history.push('/login');
                    } else {
                        message.error(res.data.message);
                    }
                });
            }
        });
    }

    render() {
        const { form: { getFieldDecorator } } = this.props;
        const { loading } = this.state;
        return (
            <div className='password-reset-container'>
                <div className="canvasContainer">
                    <ParticleComponent />
                </div>
                <Row justify="center" type="flex" className='password-reset-card-container'>
                    <Col xs={20} md={12} xl={6} className='password-reset-card-column'>
                        <Card className='password-reset-card'>
                            <div className='password-reset-header' />
                            <Title className='component-title' level={4}>Reset Password</Title>
                            <Form onSubmit={this.onSubmit} autoComplete="off" noValidate>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, min: 6 }],
                                    })(
                                        <Input size="large" type="password" name="password" placeholder="New Password" onChange={this.onChangeHandle} className='password-reset-input' />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('confirm_password', {
                                        rules: [{ required: true, min: 6 }],
                                    })(
                                        <Input size="large" type="password" name="confirm_password" placeholder="Confirm New Password" onChange={this.onChangeHandle} />,
                                    )}
                                </Form.Item>
                                <Form.Item className='password-reset-btn-container'>
                                    <Button
                                        className='reset-btn'
                                        size="large"
                                        type="primary"
                                        onClick={this.resetUserPassword}
                                        loading={loading}
                                    >
                                        Reset Password
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PasswordReset;
