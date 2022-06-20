import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, AutoComplete, message } from 'antd';
import CKEditor from 'ckeditor4-react';

import { validateEmail } from '../../../../util/validators';

class InviteUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailText: `We invite you to take part in the event called - ${this.props.event.name}.
                        Click <a href=${window.location.origin}/event-information/${this.props.event.id}>here</a> to register`,
            testEmail: '',
            testSearchList: [],
            testEmailLoading: false,
            emailLoading: false,
        };
    }

    onSearchTestEmail = testEmail => {
        this.setState({ testEmail });
        if (testEmail.length > 3) {
            this.props.searchUserByEmail(testEmail).then(res => {
                if (res !== false) {
                    const testSearchList = res.map(item => item.email);
                    this.setState({ testSearchList });
                }
            });
        }
    }

    onSelectTestEmail = testEmail => {
        this.setState({ testEmail });
    }

    sendTestEmail = () => {
        const { testEmail, emailText } = this.state;
        if (!validateEmail(testEmail)) {
            return message.error('Please provide valid test email');
        }
        if (!emailText) {
            return message.error('Please provide email text');
        }

        this.setState({ testEmailLoading: true });
        this.props.sendTestEmail({ id: this.props.event.id, testEmail, emailText }).then(res => {
            this.setState({ testEmailLoading: false });
            if (res === true) {
                message.success('Test email successfully sent!');
            } else if (res.message) {
                message.error(res.message);
            }
        });
    }

    sendToAll = () => {
        const { emailText } = this.state;
        if (!this.props.event.emails_uploaded) {
            return message.error('You have not uploaded emails. Please upload in the Event tab!');
        }
        if (!emailText) {
            return message.error('Please provide email text');
        }

        this.setState({ emailLoading: true });
        this.props.sendEventEmails({ id: this.props.event.id, emailText }).then(res => {
            this.setState({ emailLoading: false });
            if (res.allSent === true) {
                message.success('Emails successfully sent!');
            } else if (res.allSent !== true) {
                message.warning(res.text);
            } else if (res.message) {
                message.error(res.message);
            }
        });
    }

    inputChangeHandler = e => {
        this.setState({
            emailText: e.editor.getData(),
        });
    }

    render() {
        const {
            emailText, testEmail, testSearchList, testEmailLoading, emailLoading,
        } = this.state;
        return (
            <div className="editCourse">
                <div className="descriptionText draft-editor">
                    <span className="inputSpan">Email Text</span>
                    <CKEditor
                        name="emailText"
                        data={emailText}
                        onChange={this.inputChangeHandler}
                        onBeforeLoad={cke => (cke.disableAutoInline = true)}
                    />
                </div>
                <br />
                <span className="inputSpan">Email for test</span>
                <AutoComplete
                    className="search-test-email"
                    size="large"
                    dataSource={testSearchList}
                    onSelect={this.onSelectTestEmail}
                    placeholder="search email for testing"
                    onSearch={this.onSearchTestEmail}
                    value={testEmail}
                />
                <div style={{ marginTop: '15px' }}>
                    <Button type="primary" style={{ marginRight: '15px' }} onClick={this.sendTestEmail} loading={testEmailLoading}>Test Email</Button>
                    <Button type="primary" onClick={this.sendToAll} loading={emailLoading}>Send To All Uploaded Emails</Button>
                </div>
            </div>
        );
    }
}

export { InviteUsers };
export default withRouter(InviteUsers);
