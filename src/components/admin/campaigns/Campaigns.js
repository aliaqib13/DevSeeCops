import React, { Component } from 'react';
import {
    Table, message, Switch, Tooltip, Button, Modal,
} from 'antd';
import BuyOneGetOne from './BuyOneGetOne';
import FirstCourseFree from './FirstCourseFree';
import ReferralScheme from './ReferralScheme';

const { Column } = Table;

class Campaigns extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editConfigModalVisible: false,
            campaign: {},
        };
    }

    changeActive = campaign => {
        const { updateCampaignActiveness, fetchCampaigns } = this.props;
        updateCampaignActiveness(campaign.id).then(res => {
            if (res === true) {
                message.destroy();
                message.success('Updated');
                fetchCampaigns();
            } else {
                message.error(res.message);
            }
            return true;
        }).catch(err => console.warn(err));
    }

    editConfigModal = campaign => {
        this.setState(prevState => ({
            editConfigModalVisible: !prevState.editConfigModalVisible,
            campaign: campaign || {},
        }));
    }

    render() {
        const { campaigns, updateCampaignConfig, fetchCampaigns } = this.props;
        const { editConfigModalVisible, campaign } = this.state;
        return (
            <>
                <Table dataSource={campaigns}>
                    <Column title='Name' dataIndex='name' />
                    <Column
                        title='Active'
                        render={(text, record) => (
                            <div className="activeSwitch">
                                <Tooltip title="Toggle to change the activeness">
                                    <Switch
                                        checked={Boolean(record.active)}
                                        onChange={() => this.changeActive(record)}
                                    />
                                </Tooltip>
                            </div>
                        )}
                    />
                    <Column
                        title='Config'
                        render={(text, record) => (
                            <Button type='primary' onClick={() => this.editConfigModal(record)}>Update</Button>
                        )}
                    />
                </Table>
                <Modal
                    width='755px'
                    visible={editConfigModalVisible}
                    onCancel={this.editConfigModal}
                    footer={null}
                >
                    {campaign.name === 'buyOneGetOneFree'
                     && (
                         <BuyOneGetOne
                             id={campaign.id}
                             config={campaign.config || {}}
                             updateCampaignConfig={updateCampaignConfig}
                             fetchCampaigns={fetchCampaigns}
                             closeModal={this.editConfigModal}
                         />
                     )}
                    {campaign.name === 'referral'
                     && (
                         <ReferralScheme
                             id={campaign.id}
                             config={campaign.config || {}}
                             updateCampaignConfig={updateCampaignConfig}
                             fetchCampaigns={fetchCampaigns}
                             closeModal={this.editConfigModal}
                         />
                     )}
                    {campaign.name === 'firstCourse'
                     && (
                         <FirstCourseFree
                             id={campaign.id}
                             config={campaign.config || {}}
                             updateCampaignConfig={updateCampaignConfig}
                             fetchCampaigns={fetchCampaigns}
                             closeModal={this.editConfigModal}
                         />
                     )}
                </Modal>
            </>
        );
    }
}

export default Campaigns;
