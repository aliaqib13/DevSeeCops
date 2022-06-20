import {
    ADMIN_FETCH_FELLOW_SETTINGS,
    ADMIN_CREATE_FELLOW,
    ADMIN_DELETE_FELLOW,
    ADMIN_UPDATE_FELLOW,
    ADMIN_CREATE_LAB_BLOCK,
    ADMIN_UPDATE_LAB_BLOCK,
    ADMIN_DELETE_LAB_BLOCK,
    ADMIN_CREATE_COURSE_SCENARIO,
    ADMIN_UPDATE_COURSE_SCENARIO,
    ADMIN_DELETE_COURSE_SCENARIO,
} from '../../action-types/admin/fellow-settings';

import api from '../../../services/api';
import imageApi from '../../../services/imageApi';

export function fetchFellowSettings(searchText, dataType) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/admin/fellow-settings?searchText=${searchText || ''}&dataType=${dataType || 'companies'}`);
            dispatch({
                type: ADMIN_FETCH_FELLOW_SETTINGS,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
export function uploadImage(file, folder) {
    return async () => {
        try {
            const response = await imageApi.post(`api/v1/admin/upload-file/${folder}`, file);

            return response.data.file;
        } catch (e) {
            console.log(e);
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function createFellow(data) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/settings/fellow', data);

            dispatch({
                type: ADMIN_CREATE_FELLOW,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateFellow({ id, ...data }) {
    return async dispatch => {
        try {
            const res = await api.put(`api/v1/admin/settings/fellow/${id}`, data);

            dispatch({
                type: ADMIN_UPDATE_FELLOW,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function deleteFellow(id) {
    return async dispatch => {
        try {
            await api.delete(`api/v1/admin/settings/fellow/${id}`);
            dispatch({
                type: ADMIN_DELETE_FELLOW,
                payload: id,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getFellowGuideLines() {
    return async () => {
        try {
            return await api.get('api/v1/settings/fellow-guidelines');
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateFellowGuidelines(data) {
    return async () => {
        try {
            return await api.post('api/v1/admin/settings/fellow-guidelines', data);
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function createLabBlock(data) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/create-lab-block', data);

            dispatch({
                type: ADMIN_CREATE_LAB_BLOCK,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateLabBlock(id, data) {
    return async dispatch => {
        try {
            const res = await api.put(`api/v1/admin/update-lab-block/${id}`, data);

            dispatch({
                type: ADMIN_UPDATE_LAB_BLOCK,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function deleteLabBlocks(id) {
    return async dispatch => {
        try {
            await api.delete(`api/v1/admin/delete-lab-block/${id}`);

            dispatch({
                type: ADMIN_DELETE_LAB_BLOCK,
                payload: id,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function createCourseScenarios(data) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/create-course-scenarios', data);

            dispatch({
                type: ADMIN_CREATE_COURSE_SCENARIO,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateCourseScenarios(id, data) {
    return async dispatch => {
        try {
            const res = await api.put(`api/v1/admin/update-course-scenarios/${id}`, data);

            dispatch({
                type: ADMIN_UPDATE_COURSE_SCENARIO,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function deleteCourseScenarios(id) {
    return async dispatch => {
        try {
            await api.delete(`api/v1/admin/delete-course-scenarios/${id}`);

            dispatch({
                type: ADMIN_DELETE_COURSE_SCENARIO,
                payload: id,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function sendTestEmail(email, data) {
    return async () => {
        try {
            return await api.post('api/v1/admin/fellow-settings/send-test-email', { email, data });
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function sendEmailFellows(data) {
    return async () => {
        try {
            return await api.post('api/v1/admin/fellow-settings/send-email-fellows', { data });
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getFellowNews() {
    return async () => {
        try {
            return await api.get('api/v1/settings/fellow-news');
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateFellowNews(data) {
    return async () => {
        try {
            return await api.post('api/v1/admin/settings/fellow-news', data);
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function addGoldenStandardSlug(data) {
    return async () => {
        try {
            return await api.post('api/v1/admin/golden-template-slug', data);
        } catch (e) {
            return false;
        }
    };
}

export function getGoldenStandardTag() {
    return async () => {
        try {
            const res = await api.get('api/v1/admin/golden-template-slug');
            return res.data.value;
        } catch (e) {
            return false;
        }
    };
}
