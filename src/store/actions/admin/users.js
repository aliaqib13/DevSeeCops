import {
    ADMIN_FETCH_USERS_START,
    ADMIN_FETCH_USERS_SUCCESS,
    ADMIN_FETCH_USERS_ERROR,
    ADMIN_CHANGE_USER_STATUS_START,
    ADMIN_CHANGE_USER_STATUS_SUCCESS,
    ADMIN_CHANGE_USER_STATUS_ERROR,
    ADMIN_DELETE_USER_START,
    ADMIN_DELETE_USER_SUCCESS,
    ADMIN_DELETE_USER_ERROR,
    ADMIN_CREATE_USER,
    ADMIN_UPDATE_USER,
    ADMIN_CHANGE_FELLOW,
} from '../../action-types/admin/users';

import api from '../../../services/api';

export function adminFetchUsers(page, pageSize, searchName, searchEmail, searchStatus, searchRole) {
    return async dispatch => {
        dispatch({
            type: ADMIN_FETCH_USERS_START,
        });
        try {
            const response = await api.get(`api/v1/admin/users?&page=${page || 1}&pageSize=${pageSize || 10}&name=${searchName || ''}&email=${searchEmail || ''}&status=${searchStatus || ''}&role=${searchRole || ''}`);
            dispatch({
                type: ADMIN_FETCH_USERS_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: ADMIN_FETCH_USERS_ERROR,
                error: e.response.data,
            });
        }
    };
}

export function adminDeleteUser(id) {
    return async dispatch => {
        dispatch({
            type: ADMIN_DELETE_USER_START,
        });

        try {
            await api.delete(`api/v1/admin/users/${id}`);

            dispatch({
                type: ADMIN_DELETE_USER_SUCCESS,
                payload: id,
            });
            return true;
        } catch (e) {
            dispatch({
                type: ADMIN_DELETE_USER_ERROR,
                error: e.response.data,
            });

            return false;
        }
    };
}

export function adminChangeUserStatus(id, status) {
    return async dispatch => {
        dispatch({
            type: ADMIN_CHANGE_USER_STATUS_START,
        });

        try {
            await api.post('api/v1/admin/users/change-status', {
                id, status,
            });
            dispatch({
                type: ADMIN_CHANGE_USER_STATUS_SUCCESS,
                payload: { id, status },
            });

            return true;
        } catch (e) {
            dispatch({
                type: ADMIN_CHANGE_USER_STATUS_ERROR,
                error: e.response,
            });

            return false;
        }
    };
}

export function adminCreateUser(data) {
    return async dispatch => {
        try {
            const response = await api.post('api/v1/admin/users', data);

            dispatch({
                type: ADMIN_CREATE_USER,
                payload: response.data.user,
            });

            return true;
        } catch (e) {
            return e.response.data;
        }
    };
}

export function adminUpdateUser(id, data) {
    return async dispatch => {
        try {
            const response = await api.put(`api/v1/admin/users/${id}`, data);

            dispatch({
                type: ADMIN_UPDATE_USER,
                payload: response.data.user,
            });

            return true;
        } catch (e) {
            return e.response.data;
        }
    };
}

export function searchByEmail(email, fellowOnly) {
    return async () => {
        try {
            const res = await api.post(`api/v1/admin/users/search-by-email?fellowsOnly=${fellowOnly}`, { email });
            return res.data;
        } catch (e) {
            return false;
        }
    };
}

export function adminSearchUsersByEmail(
    searchEmail,
) {
    return async () => {
        try {
            const response = await api.get('api/v1/admin/users', { params: { pageSize: 100, email: searchEmail } });

            return response.data.users.data;
        } catch (e) {
            return e.response ? e.response.data.error : { message: 'Something went wrong searching users by email, please try again' };
        }
    };
}

export function resetUserPassword(id) {
    return async () => {
        try {
            return await api.get(`api/v1/admin/user/reset-password/${id}`);
        } catch (e) {
            return e.response ? e.response : { message: 'Something went wrong please try again' };
        }
    };
}

export function changeFellow(id) {
    return async dispatch => {
        try {
            const res = await api.patch(`api/v1/admin/users/change-fellow/${id}`);

            dispatch({
                type: ADMIN_CHANGE_FELLOW,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response : { message: 'Something went wrong please try again' };
        }
    };
}

export function getPermissions(keyword) {
    return async () => {
        try {
            const res = await api.get(`api/v1/admin/search-permissions?keyword=${keyword}`);
            return res.data;
        } catch (e) {
            return false;
        }
    };
}

export function resetMFA(id) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/reset-mfa', { id });
            dispatch({
                type: ADMIN_UPDATE_USER,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong please try again' };
        }
    };
}
