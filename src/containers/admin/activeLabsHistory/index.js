import { connect } from 'react-redux';
import {
    fetchActiveLabsHistory, deleteActiveLabHistory, updateActiveLabHistoryProgress,
    setDuration, getLabReport, checkLabStages, resetChecker, sendEmailToUser,
} from '../../../store/actions/admin/acitveLabsHistory';
import { getJobProgress, notifyUserAboutLabReset } from '../../../store/actions/labs';
import { getAuthUser } from '../../../store/actions/auth';
import LabsHistory from './LabsHistory';

const mapStateToProps = state => ({
    adminActiveLabsHistory: state.adminActiveLabsHistory,
});

const mapDispatchToProps = dispatch => ({
    fetchActiveLabsHistory: (search, page) => dispatch(fetchActiveLabsHistory(search, page)),
    deleteActiveLabHistory: (data, aLabId) => dispatch(deleteActiveLabHistory(data, aLabId)),
    setDuration: (id, duration) => dispatch(setDuration(id, duration)),
    updateActiveLabStatus: (id, data) => dispatch(updateActiveLabHistoryProgress(id, data)),
    getJobProgress: activeLabId => dispatch(getJobProgress(activeLabId)),
    getLabReport: activeLabId => dispatch(getLabReport(activeLabId)),
    checkLabStages: activeLabId => dispatch(checkLabStages(activeLabId)),
    getAuthUser: () => dispatch(getAuthUser()),
    resetChecker: activeLabId => dispatch(resetChecker(activeLabId)),
    notifyUserAboutLabReset: (email, labName) => dispatch(notifyUserAboutLabReset(email, labName)),
    sendEmailToUser: data => dispatch(sendEmailToUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LabsHistory);
