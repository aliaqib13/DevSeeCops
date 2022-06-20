import {
    ADMIN_FETCH_ACTIVE_LAB_HISTORY,
    ADMIN_SET_ACTIVE_LAB_DURATION,
    ADMIN_CHANGE_PROGRESS,
    ADMIN_FETCH_ACTIVE_LAB,

} from '../../action-types/admin/activeLabsHistory';
import {
    UPDATE_AUTH_USER_ACTIVE_LAB,
    UPDATE_AUTH_USER_ACTIVE_LAB_DURATION,
} from '../../action-types/auth';

import api from '../../../services/api';

export function fetchActiveLabsHistory(searchData = {}, page = 1) {
    const {
        userSearch, statusSearch, filterOutDSOA, progressSearch,
    } = searchData;
    return async dispatch => {
        try {
            const res = await api.get('api/v1/admin/active-labs-history', {
                params: {
                    user: userSearch,
                    status: statusSearch,
                    filterOutDSOA,
                    page: page || 1,
                    progress: progressSearch,
                },
            });

            dispatch({
                type: ADMIN_FETCH_ACTIVE_LAB_HISTORY,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again' };
        }
    };
}

export function fetchActiveLabs(page, pageSize) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/admin/active-labs?page=${page || 1}&pageSize=${pageSize || 10}`);
            dispatch({
                type: ADMIN_FETCH_ACTIVE_LAB,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again' };
        }
    };
}

export function deleteActiveLabHistory(data, activeLabId) {
    return async dispatch => {
        try {
            await api.post('api/v1/admin/active-labs/delete', data);

            dispatch({
                type: UPDATE_AUTH_USER_ACTIVE_LAB,
                payload: activeLabId,
            });

            return true;
        } catch (e) {
            if (e.response.data.message === 'Lab is already destroyed') {
                return true;
            }
            return e.response ? e.response.data : { message: 'Something went wrong, please try again' };
        }
    };
}

export function updateActiveLabHistoryProgress(id, data) {
    return async dispatch => {
        try {
            const res = await api.post(`api/v1/admin/active-labs/change-status/${id}`, data);

            dispatch({
                type: ADMIN_CHANGE_PROGRESS,
                payload: {
                    lab: res.data,
                    id,
                },
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again' };
        }
    };
}

export function setDuration(id, duration) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/active-labs/change-duration', {
                id, duration,
            });

            dispatch({
                type: ADMIN_SET_ACTIVE_LAB_DURATION,
                payload: res.data,
            });

            dispatch({
                type: UPDATE_AUTH_USER_ACTIVE_LAB_DURATION,
                payload: {
                    lab_end_at: res.data.lab_end_at,
                    lab_id: res.data.id,
                },
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again' };
        }
    };
}

export function getActiveLab(id) {
    return async () => {
        try {
            return await api.get(`api/v1/admin/active-lab/${id}`);
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again' };
        }
    };
}

export function getLabReport(activeLabId) {
    return async () => {
        try {
            return await api.get(`api/v1/admin/active-labs/get-report/${activeLabId}`);
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again' };
        }
    };
}

export function checkLabStages(activeLabId) {
    return async () => {
        try {
            return await api.get(`api/v1/admin/active-labs/check-lab/${activeLabId}`);
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again' };
        }
    };
}

export function resetChecker(activeLabId) {
    const data = {
        activeLabID: activeLabId,
    };
    return async () => {
        try {
            await api.post('api/v1/admin/active-labs/reset-checker', data);

            return true;
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again' };
        }
    };
}

export function sendEmailToUser(data) {
    return async () => {
        try {
            await api.post('api/v1/admin/send-email-to-active-lab-user', data);
            return true;
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again' };
        }
    };
}
