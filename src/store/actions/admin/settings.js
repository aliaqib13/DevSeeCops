import {
    ADMIN_FETCH_SETTINGS,
    ADMIN_CREATE_FAQ,
    ADMIN_UPDATE_FAQ,
    ADMIN_DELETE_FAQ,
    ADMIN_UPDATE_RIGHT_SIDE_BAR_CONTENT,
    ADMIN_UPDATE_CTO_SETTINGS,
} from '../../action-types/admin/settings';
import api from '../../../services/api';
import imageApi from '../../../services/imageApi';

export function fetchSettings() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/admin/settings');

            dispatch({
                type: ADMIN_FETCH_SETTINGS,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function createFaq(data) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/settings/faq', data);

            dispatch({
                type: ADMIN_CREATE_FAQ,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateFaq(id, data) {
    return async dispatch => {
        try {
            const res = await api.put(`api/v1/admin/settings/faq/${id}`, data);

            dispatch({
                type: ADMIN_UPDATE_FAQ,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function deleteFaq(id) {
    return async dispatch => {
        try {
            await api.delete(`api/v1/admin/settings/faq/${id}`);
            dispatch({
                type: ADMIN_DELETE_FAQ,
                payload: id,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
export function uploadImage(file, folder) {
    return async dispatch => {
        try {
            const response = await imageApi.post(`api/v1/admin/upload-file/${folder}`, file);

            return response.data.file;
        } catch (e) {
            console.log(e);
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateRightSideBarContent(data) {
    return async dispatch => {
        try {
            const response = await api.post('api/v1/admin/settings/update-side-bar-content', data);
            dispatch({
                type: ADMIN_UPDATE_RIGHT_SIDE_BAR_CONTENT,
                payload: response.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function saveCEOConfigs(data) {
    return async dispatch => {
        try {
            const response = await api.post('api/v1/admin/settings/ceo', data);
            dispatch({
                type: ADMIN_UPDATE_CTO_SETTINGS,
                payload: response.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateGlobalNotification(data) {
    return async () => {
        try {
            return await api.put('api/v1/admin/settings/global-notification', data);
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function createGlobalNotification(data) {
    return async () => {
        try {
            return await api.post('api/v1/admin/settings/global-notification', data);
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getHelp() {
    return async () => {
        try {
            return await api.get('api/v1/help');
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateHelp(data) {
    return async () => {
        try {
            return await api.post('api/v1/admin/help', data);
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again.' };
        }
    };
}
