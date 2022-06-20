import {
    ADMIN_GET_LAB_STEPS_START,
    ADMIN_GET_LAB_STEPS_SUCCESS,
    ADMIN_GET_LAB_STEPS_ERROR,
    ADMIN_UPDATE_LAB_STEPS,
    ADMIN_GET_LABS,
} from '../../action-types/admin/labs';
import api from '../../../services/api';

export function getLabSteps(lab_id) {
    return async dispatch => {
        dispatch({
            type: ADMIN_GET_LAB_STEPS_START,
        });

        try {
            const res = await api.get(`api/v1/admin/labs/steps/${lab_id}`);

            dispatch({
                type: ADMIN_GET_LAB_STEPS_SUCCESS,
                payload: res.data,
            });

            return true;
        } catch (e) {
            dispatch({
                type: ADMIN_GET_LAB_STEPS_ERROR,
                error: e.response.data,
            });

            return false;
        }
    };
}

export function updateLabSteps(lab_id, data) {
    return async dispatch => {
        try {
            const res = await api.put(`api/v1/admin/labs/steps/${lab_id}`, data);

            dispatch({
                type: ADMIN_UPDATE_LAB_STEPS,
                payload: { content: res.data.steps },
            });

            return true;
        } catch (e) {
            return false;
        }
    };
}

export function getHintMessage(id) {
    return async dispatch => {
        try {
            return await api.get(`/api/v1/admin/hint/${id}`);
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again' };
        }
    };
}

export function getLabs() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/admin/labs');

            dispatch({
                type: ADMIN_GET_LABS,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return false;
        }
    };
}
