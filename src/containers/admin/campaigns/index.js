import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCampaigns, updateCampaignActiveness, updateCampaignConfig } from '../../../store/actions/admin/campaign';
import Campaigns from './Campaigns';

const mapStateToProps = state => ({
    campaigns: state.adminCampaigns.campaigns,
});

const mapDispatchToProps = dispatch => ({
    fetchCampaigns: () => dispatch(getCampaigns()),
    updateActiveness: id => dispatch(updateCampaignActiveness(id)),
    updateConfig: (id, data) => dispatch(updateCampaignConfig(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Campaigns));
