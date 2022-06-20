import {
    ADMIN_GET_JOBS_START,
    ADMIN_GET_JOBS_SUCCESS,
    ADMIN_GET_JOBS_ERROR,
    ADMIN_DELETE_JOB,
    ADMIN_CHANGE_JOB_STATUS,
    ADMIN_BULK_DELETE_JOBS,
} from '../../action-types/admin/jobs';
import api from '../../../services/api';

export function fetchJobs(params) {
    return async dispatch => {
        const {
            type, user, page, activeLabId,
        } = params;
        dispatch({
            type: ADMIN_GET_JOBS_START,
        });

        try {
            const res = await api.get('api/v1/admin/jobs',
                {
                    params: {
                        type: type || '',
                        user,
                        page: page || 1,
                        activeLabId,
                    },
                });
            dispatch({
                type: ADMIN_GET_JOBS_SUCCESS,
                payload: res.data,
            });

            return true;
        } catch (e) {
            dispatch({
                type: ADMIN_GET_JOBS_ERROR,
                error: e.response ? e.response.data : { message: 'Something went wrong, please try again.' },
            });

            return false;
        }
    };
}

export function deleteJob(id) {
    return async dispatch => {
        try {
            await api.delete(`api/v1/admin/jobs/${id}`);

            dispatch({
                type: ADMIN_DELETE_JOB,
                payload: id,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function changeJobStatus(id, status) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/jobs/change-status', {
                id, status,
            });

            dispatch({
                type: ADMIN_CHANGE_JOB_STATUS,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function bulkDeleteJobs(ids) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/jobs/bulk-delete', { ids });

            dispatch({
                type: ADMIN_BULK_DELETE_JOBS,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
