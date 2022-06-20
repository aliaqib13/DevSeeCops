import { connect } from 'react-redux';
import {
    uploadImage, getBetaTestInstructions, updateBetaTestInstructions, sendTestEmail, sendEmailBetaTesters,
} from '../../../store/actions/admin/betaTestSettings';
import BetaTestSettings from './BetaTestSettings';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    uploadFile: (file, folder) => dispatch(uploadImage(file, folder)),
    getBetaTestInstructions: () => dispatch(getBetaTestInstructions()),
    updateBetaTestInstructions: data => dispatch(updateBetaTestInstructions(data)),
    sendTestEmail: (email, data) => dispatch(sendTestEmail(email, data)),
    sendEmailBetaTesters: data => dispatch(sendEmailBetaTesters(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BetaTestSettings);
