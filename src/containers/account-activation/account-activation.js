import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button, Card, Col, Form, Input, message, Row, Typography,
} from 'antd';
import { Redirect } from 'react-router-dom';
import { activateCreatedUser } from '../../store/actions/auth';
import ParticleComponent from '../../components/login/ParticleComponent';

const { Title } = Typography;

class AccountActivation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirm_password: '',
            loading: false,
            shouldRedirect: false,
        };
    }

    onChangeHandle = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onSubmit = e => {
        e.preventDefault();
        const { password, confirm_password } = this.state;
        const atoken = this.props.match.params.token;
        if (password !== confirm_password) {
            message.error('Passwords doesn\'t match');
            return false;
        }

        if (!atoken) {
            message.error('Invalid token.');
            return false;
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: false,
                });

                this.props.activateUser({
                    password,
                    confirm_password,
                    atoken,
                }).then(res => {
                    if (res.status >= 200 && res.status < 300) {
                        message.success(res.data.message);
                        this.setState({ shouldRedirect: true });
                    } else {
                        message.error(res.data.message);
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading, shouldRedirect } = this.state;
        if (shouldRedirect) {
            const backUrl = window.location.pathname.includes('account-activation-for-event') ? `/event-information/${this.props.match.params.event_id}` : '';
            return <Redirect to={{ pathname: '/login', state: { backUrl } }} />;
        }
        return (

            <div style={styles.body}>
                <div className="canvasContainer">
                    <ParticleComponent />
                </div>
                <Row justify="center" type="flex" style={{ alignItems: 'center', height: '100%', width: '100%' }}>
                    <Col xs={20} md={12} xl={6} style={{ margin: '50px 0' }}>
                        <Card style={{ borderRadius: '10px', padding: '20px' }}>
                            <div style={styles.cardImage} />
                            <Title level={4} style={styles.title}>Account activation</Title>
                            <Form onSubmit={this.onSubmit} autoComplete="off" noValidate>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, min: 10 }],
                                    })(
                                        <Input size="large" type="password" name="password" placeholder="New Password" onChange={this.onChangeHandle} style={{ marginBottom: 10 }} />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('confirm_password', {
                                        rules: [{ required: true, min: 10 }],
                                    })(
                                        <Input size="large" type="password" name="confirm_password" placeholder="Confirm New Password" onChange={this.onChangeHandle} />,
                                    )}
                                </Form.Item>
                                <Form.Item style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        size="large"
                                        type="primary"
                                        style={{ minWidth: '168px', height: '48px' }}
                                        htmlType="submit"
                                        loading={loading}
                                    >
                                        Activate
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
        height: 100,
        marginBottom: 20,
    },
    title: {
        textAlign: 'center',
        marginTop: 20,
    },
};

const mapDispatchToProps = dispatch => ({
    activateUser: data => dispatch(activateCreatedUser(data)),
});

export default connect(null, mapDispatchToProps)(Form.create({ name: 'activate_account' })(AccountActivation));
