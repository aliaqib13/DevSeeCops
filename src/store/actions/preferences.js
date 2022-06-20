import api from '../../services/api';
import {
    GET_PREFERENCES, GET_CC_INFO, UPDATE_CC, GET_USER_COURSE_TAGS,
} from '../action-types/preferences';

export function getPreferences() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/get-preferences');
            if (res.status === 204) {
                return {
                    status: 204,
                    message: 'No data!',
                };
            }
            dispatch({
                type: GET_PREFERENCES,
                payload: res.data.preferences,
            });
            dispatch({
                type: GET_USER_COURSE_TAGS,
                payload: res.data.userTags,
            });

            return true;
        } catch (e) {
            return e.response.data;
        }
    };
}

export function updatePreferences(data) {
    return async dispatch => {
        try {
            await api.put('api/v1/update-preferences', data);
            return true;
        } catch (e) {
            return e.response.data;
        }
    };
}

export function getCCInfo() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/preferences/cc-info');

            dispatch({
                type: GET_CC_INFO,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateCreditCard(token, type) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/preferences/update-cc', { token, type });

            dispatch({
                type: UPDATE_CC,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function searchByCourseTags(keyword) {
    return async () => {
        try {
            const res = await api.get(`api/v1/search-tags?keyword=${keyword}`);
            return res.data;
        } catch (e) {
            return false;
        }
    };
}

export function deleteCreditCard() {
    return async dispatch => {
        try {
            await api.put('api/v1/preferences/delete-cc');

            dispatch({
                type: UPDATE_CC,
                payload: {},
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
