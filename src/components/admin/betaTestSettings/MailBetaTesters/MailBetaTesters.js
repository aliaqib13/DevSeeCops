import React, { Component } from 'react';
import {
    Typography, Input, Button, Row, Col, Form, message,
} from 'antd';
import './MailBetaTesters.scss';

const { Title } = Typography;
const { TextArea } = Input;

class MailBetaTesters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadingTest: false,
            emailContent: '',
            testEmail: '',

        };
    }

    changeEmailContent = e => {
        this.setState({
            emailContent: e.target.value,
        });
    }

    changeTestEmail = e => {
        this.setState({
            testEmail: e.target.value,
        });
    }

    sendTestEmail = e => {
        e.preventDefault();

        const { testEmail, emailContent } = this.state;
        if (!emailContent) {
            return message.warning('Type Text for send test email');
        }
        this.setState({
            loadingTest: true,
        });
        this.props.sendTestEmail(testEmail, emailContent).then(res => {
            if (!res.message) {
                message.success(`Email ${res.data.email} Success`);
            } else {
                message.error(res.message);
            }
            this.setState({
                loadingTest: false,
            });
        });
    }

    sendEmailBetaTesters = e => {
        e.preventDefault();
        const { emailContent } = this.state;
        this.setState({
            loading: true,
        });
        this.props.sendEmailBetaTesters(emailContent).then(res => {
            if (!res.message) {
                message.success(`Send email ${res.data.countMails} Beta Tester Success`);
            } else {
                message.error(res.message);
            }
            this.setState({
                loading: false,
            });
        });
    }

    render() {
        const {
            loading, loadingTest, emailContent, testEmail,
        } = this.state;
        return (
            <div className="mail-beta-test-container">
                <Title className="mail-beta-test-title" level={4}> Mail Beta Testers </Title>

                <div>
                    <Row className="mail-beta-test-row" style={{ marginTop: '20px' }}>
                        <Col span={12}>
                            <Form className="" onSubmit={this.sendEmailBetaTesters}>
                                <TextArea required onChange={this.changeEmailContent} value={emailContent} placeholder="Enter text for send email" />
                                <Button className="mail-beta-test-send-emails" loading={loading} type="primary" htmlType="submit">Send Mail All Beta Testers</Button>
                            </Form>
                        </Col>
                        <Col span={12} style={{ padding: '0 20px' }}>
                            <Form onSubmit={this.sendTestEmail}>

                                <Input
                                    required
                                    onChange={this.changeTestEmail}
                                    type="email"
                                    value={testEmail}
                                    col={12}
                                    placeholder="Enter Email for test"
                                />
                                <Button className="mail-beta-test-send-email" loading={loadingTest} type="primary" htmlType="submit">Test</Button>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default MailBetaTesters;
