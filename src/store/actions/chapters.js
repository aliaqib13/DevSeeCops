import {
    GET_CHAPTERS_ERROR,
    GET_CHAPTERS_START,
    GET_CHAPTERS_SUCCESS,
    SAVE_CURRENT_STEP,
} from '../action-types/chapters';
import api from '../../services/api';

export function getChapters(type) {
    return async dispatch => {
        dispatch({
            type: GET_CHAPTERS_START,
        });

        try {
            const response = await api.get(`api/courses/${type}`);
            dispatch({
                type: GET_CHAPTERS_SUCCESS,
                payload: response.data,
            });

            return response.data;
        } catch (e) {
            dispatch({
                type: GET_CHAPTERS_ERROR,
                error: e.response.data,
            });

            return false;
        }
    };
}

export function saveCurrentStep(id, course_id, step) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/courses/saveCurrentStep', {
                id,
                step,
                course_id,
            });

            dispatch({
                type: SAVE_CURRENT_STEP,
                payload: res.data,
            });
        } catch (e) {
            return false;
        }
    };
}
