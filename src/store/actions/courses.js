import api from '../../services/api';
import {
    FETCH_COURSES_START,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_ERROR,
    GET_COURSE_START,
    GET_COURSE_SUCCESS,
    GET_COURSE_ERROR,
    GET_AWS_LINK_SUCCESS,
    FETCH_INTRO_COURSES,
    FETCH_COURSES_GROUPED_BY_TYPES,
} from '../action-types/courses';

export function fetchCourses(category_id, keyword, page, perPage) {
    return async dispatch => {
        dispatch({
            type: FETCH_COURSES_START,
        });

        try {
            const response = await api.get(`api/courses?category=${category_id || ''}&keyword=${keyword || ''}&page=${page || 1}&perPage=${perPage || 8}`);
            const { categories, courses } = response.data;

            dispatch({
                type: FETCH_COURSES_SUCCESS,
                payload: {
                    categories,
                    courses,
                },
            });
            return courses;
        } catch (e) {
            dispatch({
                type: FETCH_COURSES_ERROR,
                error: e.response ? e.response.data : { message: 'Something went wrong, please try again.' },
            });
        }
    };
}

export function getAwsLink(type) {
    return async dispatch => {
        try {
            const response = await api.get(`api/v1/aws/${type}`);

            dispatch({
                type: GET_AWS_LINK_SUCCESS,
                payload: response.data,
            });
        } catch (e) {

        }
    };
}

export function getCourse(id) {
    return async dispatch => {
        dispatch({
            type: GET_COURSE_START,
        });

        try {
            const response = await api.get(`acourse/${id}`);

            dispatch({
                type: GET_COURSE_SUCCESS,
                payload: response.data,
            });

            return true;
        } catch (e) {
            dispatch({
                type: GET_COURSE_ERROR,
                error: e.response ? e.response.data : { message: 'Something went wrong, please try again.' },
            });

            return false;
        }
    };
}

export function fetchIntroCourses() {
    return async dispatch => {
        try {
            const response = await api.get('api/v1/intro-courses');

            dispatch({
                type: FETCH_INTRO_COURSES,
                payload: response.data,
            });
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getIntroductionCertificate(user_id) {
    return async () => {
        try {
            const res = await api.get(`api/v1/get-intro-certificate/${user_id}`);
            return res.data;
        } catch (e) {
            console.error(e);
            return false;
        }
    };
}

export function fetchCoursesGroupedByTypes() {
    return async dispatch => {
        try {
            const response = await api.get('api/v1/courses-grouped-by-types');

            dispatch({
                type: FETCH_COURSES_GROUPED_BY_TYPES,
                payload: response.data,
            });
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
