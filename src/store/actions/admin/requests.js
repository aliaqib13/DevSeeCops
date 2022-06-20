import api from '../../../services/api';
import {
    ADMIN_CHANGE_REQUEST_STATUS_SUCCESS,
    ADMIN_DELETE_REQUEST,
    ADMIN_GET_ACCESS_REQUESTS_SUCCESS,
} from '../../action-types/admin/requests';

export function getAdminAccessRequests() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/admin/course-requests');
            dispatch({
                type: ADMIN_GET_ACCESS_REQUESTS_SUCCESS,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function changeRequestStatus(data) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/course-requests/change-status', data);
            dispatch({
                type: ADMIN_CHANGE_REQUEST_STATUS_SUCCESS,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function deleteRequest(id) {
    return async dispatch => {
        try {
            await api.delete(`api/v1/admin/course-requests/${id}`);
            dispatch({
                type: ADMIN_DELETE_REQUEST,
                payload: id,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
