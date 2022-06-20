import api from '../../../services/api';
import imageApi from '../../../services/imageApi';
import {
    ADMIN_FETCH_FAVORITE_COMPONENTS,
    ADMIN_ADD_FAVORITE_COMPONENT,
    ADMIN_ADD_FAVORITE_STEP,
    ADMIN_FETCH_FAVORITE_STEP,
    ADMIN_DELETE_FAVORITE_STEP,
    ADMIN_GET_THEORY_LABS,
    ADMIN_UPDATE_THEORY_LABS,
} from '../../action-types/admin/labs';

export function getCourseTheory(course_id) {
    return async dispatch => {
        try {
            const response = await api.get(`api/v1/admin/course-theory/${course_id}`);
            dispatch({
                type: ADMIN_GET_THEORY_LABS,
                payload: response.data,
            });
            return true;
        } catch (e) {
            return false;
        }
    };
}

export function updateTheory(id, data) {
    return async dispatch => {
        try {
            const response = await api.put(`api/v1/admin/course-theory/${id}`, data);
            dispatch({
                type: ADMIN_UPDATE_THEORY_LABS,
                payload: response.data.theorySteps,
            });
            return true;
        } catch (e) {
            return e.response.data;
        }
    };
}

export function uploadFile(file, folder) {
    return async dispatch => {
        try {
            const response = await imageApi.post(`api/v1/admin/upload-file/${folder}`, file);

            return response.data.file;
        } catch (e) {
            return false;
        }
    };
}

export function parseTheoryFromCsv(file, data) {
    return async dispatch => {
        try {
            const response = await imageApi.post('api/v1/admin/steps/parse-csv', file);

            return response.data;
        } catch (e) {
            return e.response.data;
        }
    };
}

export function storeSavedComponent(data) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/favorite-component', data);
            dispatch({
                type: ADMIN_ADD_FAVORITE_COMPONENT,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return e.response.data;
        }
    };
}

export function fetchFavoriteComponents(title) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/admin/favorite-component?title=${title || ''}`);
            dispatch({
                type: ADMIN_FETCH_FAVORITE_COMPONENTS,
                payload: res.data,
            });
        } catch (e) {
            return e.response.data;
        }
    };
}

export function storeFavoriteStep(data) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/favorite-step', data);
            dispatch({
                type: ADMIN_ADD_FAVORITE_STEP,
                payload: res.data,
            });
            return true;
        } catch (e) {
            console.log(e);
        }
    };
}

export function fetchFavoriteSteps(title = '') {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/admin/favorite-steps?title=${title || ''}`);
            dispatch({
                type: ADMIN_FETCH_FAVORITE_STEP,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return e.response.data;
        }
    };
}

export function deleteFavoriteStep(id) {
    return async dispatch => {
        try {
            await api.delete(`api/v1/admin/favorite-step/${id}`);
            dispatch({
                type: ADMIN_DELETE_FAVORITE_STEP,
                payload: id,
            });
            return true;
        } catch (e) {
            return e.response.data;
        }
    };
}
