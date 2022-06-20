import React, { Component } from 'react';
import {
    Button, Modal, Table, Typography, Input, message,
} from 'antd';
import { validateEmail } from '../../../util/validators';
import CopyField from '../../blocks/CopyField/CopyField';

const { Title, Paragraph } = Typography;
const { Column } = Table;
const confirmModal = Modal.confirm;

class Referrals extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            visible: false,
            newReferralEmail: '',
        };
    }

    componentDidMount() {
        const { fetchReferrals } = this.props;
        fetchReferrals();
    }

    toggleModal = () => {
        this.setState(prevState => ({ visible: !prevState.visible }));
    }

    changeNewReferralEmail = e => {
        this.setState({ newReferralEmail: e.target.value });
    }

    addNewReferral = () => {
        const { newReferralEmail: email } = this.state;
        const { createReferral } = this.props;
        if (validateEmail(email)) {
            return createReferral(email).then(e => {
                if (e.message) {
                    message.error(e.message);
                    return false;
                }
                this.setState({ newReferralEmail: '', visible: false });
                message.success('Created successfully');
                return true;
            }).catch(console.error);
        }
        message.error('Please type valid email');
        return false;
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    deleteReferral = referral => {
        const { deleteReferral } = this.props;
        return deleteReferral(referral.id).then(e => {
            if (e.message) {
                message.error(e.message);
                return false;
            }
            message.success('Deleted');
            return true;
        }).catch(console.error);
    }

    deleteConfirm = referral => confirmModal({
        okText: 'Delete',
        title: 'Delete referral',
        content: `Are you sure delete referral to ${referral.email}?`,
        cancelText: 'Cancel',
        onOk: () => {
            this.deleteReferral(referral);
        },
    })

    render() {
        const { visible, newReferralEmail, loading } = this.state;
        const { referrals: { data }, referralsCampaignActive } = this.props;
        return (
            <div>
                <Title>
                    Referrals
                </Title>
                <Paragraph>
                    Want to share the DevSecOps-Academy experience with others? Create an invite link below and when
                    they&apos;ve purchased a course you&apos;ll both enjoy a discount on your next course purchase!
                </Paragraph>
                <Table dataSource={data} rowKey={item => item.name} scroll={{ x: 600 }}>
                    <Column title='Email' key='email' dataIndex='email' width='25%' />
                    <Column title='Status' key='status' dataIndex='status' width='15%' />
                    <Column title='Link' key='link' dataIndex='link' width='45%' render={text => <CopyField content={{ text }} />} />
                    <Column
                        title="Actions"
                        key="actions"
                        width='15%'
                        render={referral => (
                            <Button key={referral.id} onClick={() => this.deleteConfirm(referral)}>
                                Delete
                            </Button>
                        )}
                    />
                </Table>
                {
                    referralsCampaignActive ? (
                        <>
                            <Button onClick={this.toggleModal}>Add a new referral</Button>
                            <Modal
                                title="Add a new referral"
                                visible={visible}
                                onOk={this.addNewReferral}
                                onCancel={this.handleCancel}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>
                                        Return
                                    </Button>,
                                    <Button key="submit" type="primary" loading={loading} onClick={this.addNewReferral}>
                                        Submit
                                    </Button>,
                                ]}
                            >
                                <div>
                                    <Input type='email' placeholder='email' value={newReferralEmail} onChange={this.changeNewReferralEmail} />
                                </div>
                            </Modal>
                        </>
                    ) : (
                        <p> Referral rewards are not currently available </p>
                    )
                }
            </div>
        );
    }
}

export default Referrals;
