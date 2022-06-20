import React, { Component } from 'react';
import { message, Modal } from 'antd';
import EmailSelect from './EmailSelect';

class EmailShare extends Component {
    state = {
        emailSendingError: null,
        emails: [],
    };

    sendCertificate = () => {
        const { emails } = this.state;
        const { certificateToShare, closeEmailModal } = this.props;
        if (!emails || !emails.length) {
            message.error('Please provide at least one email address');
            return;
        }
        const loader = message.loading('sending..', 0);
        this.props.sendCertificateToEmail({ emails, img: certificateToShare }).then(res => {
            loader();
            if (res === true) {
                message.success('Successfully sent');
                closeEmailModal();
            } else {
                message.error('something went wrong please try again');
            }
        });
    };

    handleEmailChange = values => {
        this.setState({ emails: values });
    };

    resetEmails = () => {
        this.setState({
            emails: null,
        });
        this.props.reset();
    };

    render() {
        const { emailModalVisible, closeEmailModal } = this.props;

        return (
            <Modal
                wrapClassName='certificates-container-email-modal'
                visible={emailModalVisible}
                onOk={this.sendCertificate}
                onCancel={closeEmailModal}
                afterClose={this.resetEmails}
                closable={false}
                destroyOnClose
            >
                <EmailSelect handleEmailChange={this.handleEmailChange} />
            </Modal>
        );
    }
}

export default EmailShare;
