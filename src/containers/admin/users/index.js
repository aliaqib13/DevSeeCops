import { connect } from 'react-redux';
import {
    adminFetchUsers,
    adminChangeUserStatus,
    adminDeleteUser,
    adminCreateUser,
    adminUpdateUser,
    resetUserPassword,
    changeFellow,
    getPermissions,
    resetMFA,
} from '../../../store/actions/admin/users';

import { adminAddTokensToUser, adminGetUserCurrentTokenBalance } from '../../../store/actions/tokenWallet';

import AdminUsers from './users';

const mapStateToProps = state => ({
    adminUsers: state.adminUsers,

});

const mapDispatchToProps = dispatch => ({
    adminFetchUsers: (
        page, pageSize, searchName, searchEmail, searchStatus, searchRole,
    ) => dispatch(adminFetchUsers(page, pageSize, searchName, searchEmail, searchStatus, searchRole)),
    adminDeleteUser: id => dispatch(adminDeleteUser(id)),
    adminChangeUserStatus: (id, status) => dispatch(adminChangeUserStatus(id, status)),
    adminCreateUser: data => dispatch(adminCreateUser(data)),
    adminUpdateUser: (id, data) => dispatch(adminUpdateUser(id, data)),
    resetUserPassword: id => dispatch(resetUserPassword(id)),
    changeFellow: id => dispatch(changeFellow(id)),
    getPermissions: keyword => dispatch(getPermissions(keyword)),
    resetMFA: id => dispatch(resetMFA(id)),
    adminGetUserCurrentTokenBalance: userId => dispatch(adminGetUserCurrentTokenBalance(userId)),
    adminAddTokensToUser: data => dispatch(adminAddTokensToUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
