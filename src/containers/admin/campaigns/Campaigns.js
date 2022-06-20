import React, { Component } from 'react';
import Campaign from '../../../components/admin/campaigns/Campaigns';

class Campaigns extends Component {
    componentDidMount() {
        const { fetchCampaigns } = this.props;
        fetchCampaigns();
    }

    render() {
        const {
            campaigns, fetchCampaigns, updateActiveness, updateConfig,
        } = this.props;
        return (
            <Campaign
                campaigns={campaigns}
                fetchCampaigns={fetchCampaigns}
                updateCampaignActiveness={updateActiveness}
                updateCampaignConfig={updateConfig}
            />
        );
    }
}

export default Campaigns;
