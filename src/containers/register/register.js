import React, { Component } from 'react';
import ReactGA from 'react-ga';
import TextField from '@material-ui/core/TextField';
import {
    Button, Card, Col, Form, message, Row, Checkbox, Typography,
} from 'antd';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { CATEGORIES, ACTIONS } from '../../util/GAEventConstants';
import { register } from '../../store/actions/auth';
import { getCampaign } from '../../store/actions/campaign';
import ParticleComponent from '../../components/register/ParticleComponent';

import './register.scss';

import { CAMPAIGN_IDS } from '../../constants';

const { Title } = Typography;

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmpassword: '',
            rToken: '',
            policy: false,
            showPassword: false,
            showConfirmPassword: false,
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const { referralToken } = params;
        if (referralToken) {
            localStorage.setItem('referralToken', referralToken);
            this.setState({ rToken: referralToken });
        } else {
            const fromStorage = localStorage.getItem('referralToken');
            if (fromStorage) {
                this.setState({ rToken: fromStorage });
            }
        }
        this.props.getCampaign(CAMPAIGN_IDS.firstCourse);
    }

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = pass => {
        this.setState({ [pass]: !this.state[pass] });
    };

    onChange = e => {
        if (e.target.id === 'policy') {
            this.setState({ [e.target.id]: !this.state.policy });
            return;
        }
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const {
            firstname, lastname, email, password, rToken, confirmpassword, policy,
        } = this.state;
        const { register } = this.props;

        if (password !== confirmpassword) {
            message.error("Passwords don't match");
        } else if (policy === false) {
            message.error('Please agree with the Terms of Service');
        } else {
            ReactGA.event({
                category: CATEGORIES.USER_SIGN_UP,
                action: ACTIONS.USER_SUBMITTED_DETAILS_TO_REGISTER(),
            });
            return register({
                firstname,
                lastname,
                email,
                password,
                rToken,
            }).then(res => {
                if (res.status === 500) {
                    ReactGA.event({
                        category: CATEGORIES.USER_SIGN_UP,
                        action: ACTIONS.USER_FAILED_TO_SIGN_UP(),
                    });
                }
                if (res.status === 422 && res.data.error.message === `The user with email ${this.state.email} already exists!`) {
                    ReactGA.event({
                        category: CATEGORIES.USER_SIGN_UP,
                        action: ACTIONS.USER_FAILED_TO_SIGN_UP(),
                        label: 'user already exists',
                    });
                }

                if (res.status === 422 && res.data.error.message === 'Please provide a valid email') {
                    ReactGA.event({
                        category: CATEGORIES.USER_SIGN_UP,
                        action: ACTIONS.USER_FAILED_TO_SIGN_UP(),
                        label: 'invalid details - email',
                    });
                }

                return true;
            }).catch(err => console.warn('Error on user sign up', err));
        }
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auth.error) {
            message.error(nextProps.auth.error.message);
        }
        if (nextProps.auth.registered) {
            message.info('To complete the process please check your email for activating your account. Within the email you will find a link which you must click in order to activate your account.', 10);
        }
    }

    render() {
        const { firstCourseCampaign, auth } = this.props;
        const {
            firstname, lastname, email, policy,
        } = this.state;
        if (auth.authenticated || auth.registered) {
            return <Redirect to='/login' />;
        }
        return (
            <div style={styles.body}>
                <div className="canvasContainer">
                    <ParticleComponent />
                </div>
                <Row justify='center' type='flex' style={{ alignItems: 'center', height: '100%' }}>
                    <Col xs={20} md={12} xl={6} style={{ margin: '25px 0', width: '80%', maxWidth: '500px' }}>
                        <Card style={{ borderRadius: '10px', padding: '10px' }}>
                            <div data-testid="register-header-logo" style={styles.cardImage} />
                            <Title data-testid="register-header-title" level={4} style={styles.title}>Please fill in all the input fields below and then activate your account via the e-mail you will receive</Title>
                            <Form onSubmit={this.onSubmit} className='register-form'>
                                <TextField
                                    label="First Name"
                                    type='text'
                                    margin="normal"
                                    variant="outlined"
                                    id='firstname'
                                    value={firstname}
                                    onChange={this.onChange}
                                    style={{ width: '100%' }}
                                    autoComplete="new-first-name"
                                    required
                                />
                                <TextField
                                    label="Last Name"
                                    type='text'
                                    margin="normal"
                                    variant="outlined"
                                    id='lastname'
                                    value={lastname}
                                    onChange={this.onChange}
                                    style={{ width: '100%' }}
                                    autoComplete="new-last-name"
                                    required
                                />
                                <TextField
                                    label="Email"
                                    type='email'
                                    margin="normal"
                                    variant="outlined"
                                    id='email'
                                    value={email}
                                    onChange={this.onChange}
                                    style={{ width: '100%' }}
                                    autoComplete="new-email"
                                    required
                                />
                                <Form.Item className='register-form-reg'>
                                    <Checkbox onChange={this.onChange} checked={policy} id='policy' name="privacy">
                                        I agree to
                                        {' '}
                                        <Link to="/policy" rel="noopener noreferrer" target="__blank">DevSecOps Academy's Terms of Service</Link>
                                    </Checkbox>
                                </Form.Item>
                                <p>
                                    {firstCourseCampaign && Boolean(firstCourseCampaign.active)
                                    && firstCourseCampaign.config && firstCourseCampaign.config.aboveButtonText}
                                </p>
                                <Form.Item className='register-form-reg'>
                                    <Button
                                        size='large'
                                        type="primary"
                                        htmlType='submit'
                                        loading={auth.registerLoading}
                                        data-testid="register-submit-button"

                                    >
                                        Register
                                    </Button>
                                </Form.Item>
                                <p>
                                    Have an account already?
                                </p>
                                <Form.Item className='register-form-login'>
                                    <Button
                                        size='large'
                                        type="primary"
                                        loading={auth.loading}
                                        data-testid="login-button"

                                    >
                                        <Link

                                            to='/login'
                                        >
                                            Login
                                        </Link>
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

const styles = {
    body: {
        minHeight: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'linear-gradient(to right, rgb(83, 150, 209), rgb(91, 200, 171))',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardImage: {
        background: 'url(/img/academy_logo.svg) no-repeat',
        backgroundPosition: 'center',
        height: 150,
        marginBottom: 20,
    },
    title: {
        textAlign: 'center',
        marginTop: 20,
    },
};

const mapStateToProps = state => ({
    auth: state.auth,
    firstCourseCampaign: state.campaigns[CAMPAIGN_IDS.firstCourse],
});

const mapDispatchToProps = dispatch => ({
    register: data => dispatch(register(data)),
    getCampaign: id => dispatch(getCampaign(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
