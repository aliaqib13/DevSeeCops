import React, { Component } from 'react';
import {
    Button, Card, Col, Form, Icon, Input, message, Row, Typography,
} from 'antd';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import './login.scss';
import ReactGA from 'react-ga';
import { CATEGORIES, ACTIONS } from '../../util/GAEventConstants';
import { getAuthUser, checkMfaToken, validateMFACode } from '../../store/actions/auth';
import ParticleComponent from '../../components/login/ParticleComponent';

const { Title, Paragraph } = Typography;

class MFA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            code: '',
            showManually: false,
        };
    }

    componentDidMount() {
        const { getAuthUser } = this.props;
        const { auth } = this.props;
        if (!auth.user && localStorage.getItem('token')) {
            getAuthUser();
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const { token } = this.state;
        const { checkMfaToken, location } = this.props;
        const backUrl = location.state ? location.state.backUrl : '';
        if (token === '') {
            message.error('Please fill in the 2FA code');
            return false;
        } if (token.length !== 6) {
            return message.error('Incorrect 2FA code');
        }
        checkMfaToken(token)
            .then(res => {
                if (res === true || localStorage.getItem('token')) {
                    window.location = backUrl || '/platform';
                } else {
                    message.error(res.data.message);
                }
                return null;
            })
            .catch(console.error);
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    setCode = e => {
        this.setState({
            code: e.target.value,
        });
    }

    enable2fa = () => {
        const { validateMFACode, location, auth } = this.props;
        const { code } = this.state;
        const { id } = auth.user;
        const backUrl = location.state ? location.state.backUrl : '';
        if (code === '') {
            message.error('Please fill in the 2FA code');
            return false;
        } if (code.length !== 6) {
            return message.error('Incorrect 2FA code');
        }

        validateMFACode({ code, user_id: id })
            .then(res => {
                if (res.success === true && localStorage.getItem('token')) {
                    ReactGA.event({
                        category: CATEGORIES.USER_SIGN_UP,
                        action: ACTIONS.USER_CONFIGURED_MFA(),
                    });
                    window.location = backUrl || '/platform';
                } else {
                    message.error('Incorrect 2FA code, please try again!');
                }
                return null;
            })
            .catch(err => {
                console.log(err);
            });
        return null;
    }

    showMFA = () => this.setState({ showManually: true })

    render() {
        const { auth, location } = this.props;
        const backUrl = location.state ? location.state.backUrl : '';
        const { user, qrCode, mfa } = auth;
        const { showManually, token } = this.state;

        if (!user) {
            return <Redirect to='/' />;
        }

        if (localStorage.getItem('token')) {
            return <Redirect to={backUrl || '/platform'} />;
        }

        return (
            <div className="mfa-container">
                <div className="canvasContainer">
                    <ParticleComponent />
                </div>
                <Row justify="center" type="flex" className="row-class">
                    <Col xs={20} md={12} xl={6} style={{ margin: '50px 0' }}>
                        { (user.mfa_enabled)
                            ? (
                                <Card style={{ borderRadius: '10px', padding: '20px' }}>
                                    <div className="styles-image" />
                                    <Title level={4} className="mfa-title">Please fill in the 2FA code from Google Authenticator</Title>
                                    <Form onSubmit={this.onSubmit} autoComplete="off" noValidate>
                                        <TextField
                                            id="token"
                                            variant="outlined"
                                            type="text"
                                            label="Token"
                                            value={token}
                                            required={false}
                                            style={{ width: '100%', marginTop: '16px' }}
                                            onChange={this.onChange}
                                            autoComplete="one-time-code"
                                        />
                                        <Form.Item className="verify-button-item">
                                            <Button
                                                size="large"
                                                type="primary"
                                                className="verify-button"
                                                htmlType="submit"
                                            >
                                                Continue
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            )
                            : qrCode
                            && (
                                <Card style={{ borderRadius: '10px', padding: '20px' }}>
                                    <div className='styles-image' />
                                    <Title level={4} className='mfa-title'>Setup 2FA with the QR code</Title>
                                    <p className='qr-description'>
                                        You need to install Google Authenticator for
                                        {' '}
                                        <Link target='_blank' to={{ pathname: 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=nl&gl=US' }}> Android </Link>
                                        {' '}
                                        or
                                        {' '}
                                        <Link target='_blank' to={{ pathname: 'https://apps.apple.com/nl/app/google-authenticator/id388497605' }}> iOS </Link>
                                    </p>
                                    <img src={qrCode} alt='mfa' className="center-element" />
                                    <p className='qr-manualy-code'>
                                        {
                                            showManually
                                                ? <Paragraph copyable>{mfa}</Paragraph>
                                                : (
                                                    <p>
                                                        Not able to use your camera and need to manually configure MFA?
                                                        <br />
                                                        <span
                                                            role='button'
                                                            tabIndex={0}
                                                            onClick={this.showMFA}
                                                        >
                                                            Click here to reveal your secret key
                                                        </span>
                                                    </p>
                                                )
                                        }
                                    </p>
                                    <div className="qr-input">
                                        <Input
                                            prefix={<Icon type="safety-certificate" />}
                                            type="text"
                                            name="firstname"
                                            placeholder="2FA Code"
                                            onChange={this.setCode}
                                            autoComplete="one-time-code"
                                        />
                                    </div>
                                    <Button type="primary" htmlType="submit" className="center-element" onClick={this.enable2fa}>
                                        Enable 2FA and continue
                                    </Button>
                                </Card>
                            )}
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = dispatch => ({
    getAuthUser: () => dispatch(getAuthUser()),
    validateMFACode: data => dispatch(validateMFACode(data)),
    checkMfaToken: token => dispatch(checkMfaToken(token)),
}
);

export { MFA };
export default connect(mapStateToProps, mapDispatchToProps)(MFA);
