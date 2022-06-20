import { FETCH_LEARNING_PATHS, FETCH_INTRO_BY_CATEGORY, FETCH_PLANNED_COURSES } from '../action-types/learningPath';
import api from '../../services/api';

export function getLearningPaths() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/learning-paths');

            dispatch({
                type: FETCH_LEARNING_PATHS,
                payload: res.data,
            });
        } catch (e) {
            return false;
        }
    };
}

export function getIntroductionByCategory(id) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/categories/${id}/introduction`);

            dispatch({
                type: FETCH_INTRO_BY_CATEGORY,
                payload: res.data,
            });
        } catch (e) {
            return false;
        }
    };
}

export function getPlannedCourses() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/courses-interested');
            dispatch({
                type: FETCH_PLANNED_COURSES,
                payload: res.data,
            });
            return res.data;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
