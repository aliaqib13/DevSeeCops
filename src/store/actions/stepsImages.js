import { FETCH_IMAGES } from '../action-types/stepsImages';
import api from '../../services/api';

export function fetchStepsImages(course_id) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/steps-images/${course_id}`);

            dispatch({
                type: FETCH_IMAGES,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return false;
        }
    };
}

export function getAvailableStepImages(course_id) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/available-steps-images/${course_id}`);

            dispatch({
                type: FETCH_IMAGES,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return false;
        }
    };
}
