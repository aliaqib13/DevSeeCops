import React, { Component } from 'react';
import {
    Table, Button, Switch, message, Modal, Tooltip,
} from 'antd';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import './certificateOfProgress.scss';

const { Column } = Table;
const confirmModal = Modal.confirm;

class CertificateOfProgress extends Component {
    changeCheck = certificate => {
        this.props.updateCertificateVisibility(certificate).then(res => {
            if (res === true) {
                message.success('Updated');
                this.props.fetchUserCertificates();
            }
        });
    }

    goToCertificateOfProgress = certificate => {
        this.props.history.push(`/platform/certificate-of-progress/${certificate.uuid}`);
    }

    copy = certificate => {
        const copyInput = document.createElement('textarea');
        copyInput.value = `${window.location.origin}/certificate-of-progress/${certificate.uuid}`;
        document.body.appendChild(copyInput);
        copyInput.select();
        document.execCommand('copy');
        message.destroy();
        message.success('Copied');
        document.body.removeChild(copyInput);
    }

    delete = id => {
        confirmModal({
            title: 'Are you sure you want to delete this certificate?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                const loader = message.loading('Deleting..');
                this.props.deleteCertificateOfProgress(id).then(res => {
                    loader();
                    if (res === true) {
                        message.success('Deleted');
                        this.props.fetchUserCertificates();
                    } else {
                        message.error(res.message);
                    }
                });
            },
        });
    }

    render() {
        const { certificates } = this.props;
        return (
            <div className="certificate-of-progress">
                <p className="certificate-of-progress-tab-info">
                    Here you can manage your certificates of progress and share them with your network.
                </p>
                <h2 className="certificate-of-progress-header">Certificates Of Progress</h2>
                <Table dataSource={certificates}>
                    <Column
                        title="Id"
                        render={(text, record) => (record.id)}
                        key="id"
                    />
                    <Column
                        title="Date of Creation"
                        render={(text, record) => (moment(record.created_at).format('DD MMM YYYY'))}
                        key="date"
                    />
                    <Column
                        title="View"
                        render={(text, record) => (
                            <Tooltip title="Preview your certificate of progress">
                                <Button onClick={() => this.goToCertificateOfProgress(record)}>View</Button>
                            </Tooltip>
                        )}
                        key="view"
                    />
                    <Column
                        title="Publicly Visible"
                        render={(text, record) => (
                            <div className="activeSwitch">
                                <Tooltip title="Select to create a link that you can share publicly">
                                    <Switch
                                        checked={!!record.is_publicly_visible}
                                        onChange={() => this.changeCheck(record)}
                                    />
                                </Tooltip>
                            </div>
                        )}
                        key="publicly_visible"
                    />
                    <Column
                        title="Shareable Link"
                        render={(text, record) => (
                            <Button
                                icon="copy"
                                type="primary"
                                onClick={() => this.copy(record)}
                                disabled={!record.is_publicly_visible}
                            >
                                Copy
                            </Button>
                        )}
                        key="shareable_link"
                    />
                    <Column
                        title="Delete"
                        render={(text, record) => (
                            <Button icon="delete" type="danger" onClick={() => this.delete(record.id)} />
                        )}
                        key="delete"
                    />
                </Table>
            </div>
        );
    }
}

export { CertificateOfProgress };
export default withRouter(CertificateOfProgress);
