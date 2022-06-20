import {
    GET_ACTIVE_COURSE_START,
    GET_ACTIVE_COURSE_SUCCESS,
    GET_ACTIVE_COURSE_ERROR,
} from '../action-types/activeCourse';
import api from '../../services/api';

export function getActiveCourse(id) {
    return async dispatch => {
        dispatch({
            type: GET_ACTIVE_COURSE_START,
        });

        try {
            const response = await api.get(`acourse/${id}`);

            dispatch({
                type: GET_ACTIVE_COURSE_SUCCESS,
                payload: response.data,
            });

            return true;
        } catch (e) {
            dispatch({
                type: GET_ACTIVE_COURSE_ERROR,
                error: e.response ? e.response.data : { message: 'Something went wrong, please try again.' },
            });

            return false;
        }
    };
}
