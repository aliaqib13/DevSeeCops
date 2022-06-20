import api from '../../../services/api';
import {
    ADD_RATING, DELETE_RATING, FETCH_RATINGS, UPDATE_RATING,
} from '../../action-types/admin/courseRatings';

export function fetchRatings(course_id) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/admin/course-ratings/${course_id}`);

            dispatch({
                type: FETCH_RATINGS,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function addRating(course_id, data) {
    return async dispatch => {
        try {
            const res = await api.post(`api/v1/admin/course-ratings/${course_id}`, data);

            dispatch({
                type: ADD_RATING,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateRating(id, data) {
    return async dispatch => {
        try {
            const res = await api.put(`api/v1/admin/course-ratings/${id}`, data);

            dispatch({
                type: UPDATE_RATING,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function deleteRating(id) {
    return async dispatch => {
        try {
            await api.delete(`api/v1/admin/course-ratings/${id}`);

            dispatch({
                type: DELETE_RATING,
                payload: id,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function searchUserByEmail(email) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/users/search-by-email', { email, course_ratings: true });

            return res.data;
        } catch (e) {
            return false;
        }
    };
}
