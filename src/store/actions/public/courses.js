import { FETCH_COURSES_SUCCESS, FETCH_INTRO_COURSES } from '../../action-types/courses';
import api from '../../../services/api';
import { GET_COURSE_BY_ID } from '../../action-types/course';

export function fetchPublicCourses(categoryId, keyword) {
    return async dispatch => {
        try {
            const response = await api.get('api/v1/public/courses', {
                params: {
                    category: categoryId,
                    keyword,
                },
            });
            const { categories, courses } = response.data;

            dispatch({
                type: FETCH_COURSES_SUCCESS,
                payload: {
                    categories,
                    courses,
                },
            });
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getPublicCourseById(id, type) {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/public/course', {
                params: {
                    id,
                    type,
                },
            });
            dispatch({
                type: GET_COURSE_BY_ID,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function fetchPublicIntroCourses() {
    return async dispatch => {
        try {
            const response = await api.get('api/v1/public/intro-courses');
            dispatch({
                type: FETCH_INTRO_COURSES,
                payload: response.data,
            });
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
