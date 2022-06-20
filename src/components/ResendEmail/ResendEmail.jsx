import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    Button, Card, Col, Form, Icon, Input, Row, Typography,
} from 'antd';
import ParticleComponent from './ParticleComponent';

const { Title } = Typography;

class ResendEmail extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', timeLeft: 0, disabled_button: false };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        const { resendEmail } = this.props;
        e.preventDefault();
        resendEmail(this.state.email).then(result => {
            if (result.status === 'success') {
                this.setState({
                    disabled_button: true,
                });
                this.startTimer(60);
            }
        });
        if (this.state.disabled_button) {
            this.startTimer(60);
        }

        this.setState({ email: '' });
    };

    startTimer(timeLeft) {
        const timer = setInterval(() => {
            const timeLeft = this.state.timeLeft - 1;
            if (timeLeft === 0) {
                this.setState({ disabled_button: false });
                clearInterval(timer);
            }
            this.setState({
                timeLeft,
            });
        }, 1000);

        return this.setState({ timeLeft });
    }


    render() {
        const { authenticated } = this.props;
        const { disabled_button, email, timeLeft } = this.state;
        if (authenticated) {
            return <Redirect to='/' />;
        }

        return (
            <div style={styles.body}>
                <ParticleComponent />
                <Row justify="center" type="flex">
                    <Col xs={20} md={12} xl={6}>
                        <Card style={{ marginTop: '70px' }}>
                            <div style={styles.cardImage} />
                            <Title level={4} style={styles.title}>No Email? Resend activation email</Title>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Item>
                                    <Input
                                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="email"
                                        required="required"
                                        placeholder="Email"
                                        id="email"
                                        value={email}
                                        onChange={this.onChange}
                                    />
                                </Form.Item>
                                <h4>
                                    Resend email in :
                                    {timeLeft}
                                    seconds
                                </h4>
                                <Form.Item>
                                    <Button
                                        size="large"
                                        type="primary"
                                        style={{ width: '100%' }}
                                        htmlType="submit"
                                        disabled={disabled_button}
                                    >
                                        Resend Email
                                    </Button>
                                </Form.Item>
                                <p>
                                    Account activated?
                                    <a href="/login"> Login</a>
                                </p>
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
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'linear-gradient(to right, rgb(83, 150, 209), rgb(91, 200, 171))',
    },
    cardImage: {
        background: 'url(/img/araido.svg) no-repeat',
        backgroundPosition: 'center',
        height: 100,
        marginBottom: 20,
    },
    title: {
        textAlign: 'center',
        marginTop: 20,
    },
};

const mapDispatch = ({ resendEmail: { resendEmail } }) => ({
    resendEmail: email => resendEmail({ email }),
});

export { ResendEmail };
export default connect(null, mapDispatch)(ResendEmail);
