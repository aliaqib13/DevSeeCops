import { connect } from 'react-redux';
import { fetchAdminDashboardData } from '../../../store/actions/admin/adminDashboard';
import AdminDashboard from './AdminDashboard';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    fetchAdminDashboardData: () => dispatch(fetchAdminDashboardData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
