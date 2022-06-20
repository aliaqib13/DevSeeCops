import { connect } from 'react-redux';
import {
    saveCourseProposal, uploadProposalFile, submitProposal, getProposalById,
} from '../../store/actions/fellowArea';
import FellowEditProposal from './FellowEditProposal';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    uploadProposalFile: (id, fileName, data) => dispatch(uploadProposalFile(id, fileName, data)),
    saveCourseProposal: (proposalId, data) => dispatch(saveCourseProposal(proposalId, data)),
    submitProposal: data => dispatch(submitProposal(data)),
    getProposalById: id => dispatch(getProposalById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FellowEditProposal);
