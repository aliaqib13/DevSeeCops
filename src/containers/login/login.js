import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {
    Button, Card, Col, Form, message, Modal, Row, Typography,
} from 'antd';
import ReactGA from 'react-ga';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ReCAPTCHA from 'react-google-recaptcha';
import { CATEGORIES, ACTIONS } from '../../util/GAEventConstants';
import ParticleComponent from '../../components/login/ParticleComponent';
import './login.scss';

const GOOGLE_RECAPTCHA_SITEKEY = process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY || '6LeTvI8aAAAAAK2xpvowAVccQf6y8_ZqgBxp4aoC';
const confirmModal = Modal.confirm;
const { Title } = Typography;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showPassword: false,
            ReCaptchaPassed: false,
            recaptchaKey: '',
        };
        const query = window.location.search.substring(1);
        if (query === 'status=invalid') {
            message.error('Failed, your token is invalid', 5);
        }
        if (query === 'status=success') {
            message.success('Your account was successfully activated, now you can login', 5);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { error } = nextProps.auth;
        if (error) {
            message.error(error.message);
        }
    }

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = () => {
        const { showPassword } = this.state;
        this.setState({ showPassword: !showPassword });
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        const { login } = this.props;
        e.preventDefault();
        const { email, password } = this.state;
        ReactGA.event({
            category: CATEGORIES.LOGIN_BUTTON,
            action: ACTIONS.LOGIN_BUTTON_CLICKED(),
            label: 'Login Button',
        });
        login({
            email,
            password,
        });
    };

    register = () => {
        ReactGA.event({
            category: CATEGORIES.USER_SIGN_UP,
            action: ACTIONS.USER_CLICKED_REGISTER_NOW(),
        });
    }

    resetPassword = e => {
        e.preventDefault();
        const { email } = this.state;
        if (email) {
            return confirmModal({
                title: 'Are you sure to reset your password?',
                content: <ReCAPTCHA
                    sitekey={GOOGLE_RECAPTCHA_SITEKEY}
                    onChange={this.recaptchaPassed}
                />,
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: () => {
                    const { ReCaptchaPassed, recaptchaKey } = this.state;
                    const { requestResetPassword: reset } = this.props;
                    if (!ReCaptchaPassed) {
                        message.error('Recaptcha is required');
                        ReactGA.event({
                            category: CATEGORIES.RESET_PASSWORD,
                            action: ACTIONS.RECAPTCHA_ACTIVATED_FAIL(),
                        });
                        return;
                    }
                    reset(email, recaptchaKey).then(res => {
                        message.destroy();
                        if (res.message) {
                            return message.error(res.message);
                        }
                        this.setState({
                            recaptchaKey: '',
                            ReCaptchaPassed: false,
                        });
                        ReactGA.event({
                            category: CATEGORIES.RESET_PASSWORD,
                            action: ACTIONS.RECAPTCHA_ACTIVATED(),
                        });
                        return message.success(res.data ? res.data.message : 'Please check your email to reset your password!');
                    }).catch(err => message.error(err.message));
                },
            });
        }
        ReactGA.event({
            category: CATEGORIES.RESET_PASSWORD,
            action: ACTIONS.RESET_PASSWORD_FAIL(),
        });
        return message.error('Please fill in your email!');
    }

    recaptchaPassed = value => {
        if (value) {
            this.setState({
                ReCaptchaPassed: true,
                recaptchaKey: value,
            });
        }
    }

    render() {
        const { email, password, showPassword } = this.state;
        const { auth: { loading } } = this.props;
        const backUrl = this.props.location.state ? this.props.location.state.backUrl : '';
        if (this.props.auth.user && !localStorage.getItem('token')) {
            return <Redirect to={{ pathname: '/mfa', state: { backUrl } }} />;
        } if (localStorage.getItem('token')) {
            return <Redirect to={backUrl || '/platform'} />;
        }

        return (
            <div className='login-container'>
                <div className="canvasContainer">
                    <ParticleComponent />
                </div>
                <Row justify="center" type="flex" className='login-card-container'>
                    <Col xs={20} md={12} xl={6} className='login-card-column'>
                        <Card className='login-card'>
                            <div className="login-card-inner-ct">
                                <div className='login-card-header' />
                                <Title level={4} className='login-card-title'>Sign in to the DevSecOps Academy</Title>
                                <Form onSubmit={this.onSubmit} autoComplete="off" noValidate>
                                    <TextField
                                        label="Email"
                                        margin="normal"
                                        variant="outlined"
                                        id="email"
                                        value={email}
                                        onChange={this.onChange}
                                        required
                                        autoComplete="new-email"
                                        className='login-email'
                                    />
                                    <TextField
                                        id="password"
                                        variant="outlined"
                                        type={showPassword ? 'text' : 'password'}
                                        label="Password"
                                        value={password}
                                        required
                                        className='login-password'
                                        onChange={this.onChange}
                                        autoComplete="new-password"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                        onMouseDown={this.handleMouseDownPassword}
                                                        className='login-password-toggle'
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <p className="top-space">
                                        Forgot your password?
                                        <span className="request-reset-email" onClick={this.resetPassword}>Reset password</span>
                                    </p>
                                    <Form.Item className='login-card-login-form-item'>
                                        <Button
                                            size="large"
                                            type="primary"
                                            className="antdbuttonTrial"
                                            htmlType="submit"
                                            loading={loading}
                                        >
                                            Log in
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <hr className='login-card-hr' />

                                <p className='login-forgot-password'>
                                    Don&apos;t have an account yet? Register now!
                                </p>
                                <Button
                                    size="large"
                                    type="primary"
                                    className='login-register-btn'
                                >
                                    <Link to="/register" onClick={this.register}>Register</Link>
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Login;
