import {
    FETCH_LABS_START,
    FETCH_LABS_SUCCESS,
    FETCH_LABS_ERROR,
    DESTROY_LAB_START,
    DESTROY_LAB_SUCCESS,
    DESTROY_LAB_ERROR,
    GET_ACTIVE_LAB_START,
    GET_ACTIVE_LAB_SUCCESS,
    GET_ACTIVE_LAB_ERROR,
    GET_JOB_PROGRESS,
    SAVE_CURRENT_LAB_STEP,
    UPDATE_HINTS_OPEN,
    GET_REMAINING_HINTS_COUNT,
    EDIT_RESOURCE_URL_STATUS,
    SAVE_STEP_PROGRESS,
} from '../action-types/labs';
import api from '../../services/api';
import imageApi from '../../services/imageApi';
import { UPDATE_AUTH_USER_ACTIVE_LAB } from '../action-types/auth';

export function fetchLabs(type) {
    return async dispatch => {
        dispatch({
            type: FETCH_LABS_START,
        });

        try {
            const response = await api.get(`labs/${type}`);

            dispatch({
                type: FETCH_LABS_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: FETCH_LABS_ERROR,
                error: e.response ? e.response.error : { message: 'Something went wrong, please try again' },
            });
        }
    };
}

export function createLab(data) {
    return async () => {
        try {
            const response = await api.post('/try', data);

            return response.data;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again' };
        }
    };
}

export function getActiveLab(active_lab_id) {
    return async dispatch => {
        dispatch({
            type: GET_ACTIVE_LAB_START,
        });

        try {
            const response = await api.get(`api/v1/labs/activeLab/${active_lab_id}`);

            dispatch({
                type: GET_ACTIVE_LAB_SUCCESS,
                payload: response.data,
            });
            return true;
        } catch (e) {
            dispatch({
                type: GET_ACTIVE_LAB_ERROR,
                error: e.response ? e.response.error : { message: 'Something went wrong, please try again' },
            });

            return false;
        }
    };
}

export function destroyLab(data) {
    return async dispatch => {
        dispatch({
            type: DESTROY_LAB_START,
        });

        try {
            await api.post('api/v1/labs/destroy', data);

            dispatch({
                type: DESTROY_LAB_SUCCESS,
            });

            dispatch({
                type: UPDATE_AUTH_USER_ACTIVE_LAB,
                payload: data.id,
            });

            return true;
        } catch (e) {
            dispatch({
                type: DESTROY_LAB_ERROR,
                error: e.response ? e.response.error : { message: 'Something went wrong, please try again' },
            });

            return false;
        }
    };
}

export function labDestroyed(alab_id) {
    return async dispatch => {
        try {
            dispatch({
                type: UPDATE_AUTH_USER_ACTIVE_LAB,
                payload: alab_id,
            });
            return true;
        } catch (e) {
            return false;
        }
    };
}

export function getJobProgress(job_id) {
    return async dispatch => {
        try {
            const response = await api.get(`api/v1/labs/getJob/${job_id}`);

            dispatch({
                type: GET_JOB_PROGRESS,
                payload: response.data,
            });

            return response.data;
        } catch (e) {
            dispatch({
                type: GET_JOB_PROGRESS,
                payload: [],
            });

            return false;
        }
    };
}

export function saveCurrentLabStep(id, lab_id, step) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/labs/saveCurrentStep', {
                id,
                lab_id,
                step,
            });

            dispatch({
                type: SAVE_CURRENT_LAB_STEP,
                payload: res.data,
            });
        } catch (e) {
            return false;
        }
    };
}

export function updateActiveLabStatus(id) {
    return async () => {
        try {
            const res = await api.put(`api/v1/labs/update-active-lab-progress/${id}`);
            return res.data;
        } catch (e) {
            const errMessage = e.response.data.message;
            return e.response ? { message: errMessage } : { message: 'Something went wrong, please try again' };
        }
    };
}

export function updateOpenHints(id, data) {
    return async dispatch => {
        try {
            const response = await api.post(`api/v1/activelabs/update_hints_open/${id}`, data);
            dispatch({
                type: UPDATE_HINTS_OPEN,
                payload: response.data,
            });
            return true;
        } catch (e) {
            return e.response ? { message: e.response.data.message } : { message: 'Something went wrong, please try again' };
        }
    };
}

export function getRemainingHintsCount(id) {
    return async dispatch => {
        try {
            const response = await api.get(`api/v1/labs/get-remaining-hints-count/${id}`);
            dispatch({
                type: GET_REMAINING_HINTS_COUNT,
                payload: response.data,
            });
            return response.data;
        } catch (e) {
            return e.response ? { message: e.response.data.message } : { message: 'Something went wrong, please try again' };
        }
    };
}

export function getHintMessage(id) {
    return async () => {
        try {
            return await api.get(`/api/v1/activelabs/get-hint-message/${id}`);
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again' };
        }
    };
}

export function uploadFile(file, folder) {
    return async () => {
        try {
            const response = await imageApi.post(`api/v1/admin/upload-file/${folder}`, file);
            return response.data.file;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function uploadLabImage(data) {
    return async () => {
        try {
            await api.post('api/v1/lab-image', data);
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getLabImage(imageToken) {
    return async () => {
        try {
            return await api.get(`api/v1/lab-image?image_token=${imageToken}`);
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function deleteLabImage(imageToken) {
    return async () => {
        try {
            await api.delete(`api/v1/lab-image/${imageToken}`);
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function checkLabStatus(id) {
    return async () => {
        try {
            return await api.get(`api/v1/labs/lab-status/${id}`);
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function checkResourceURLStatus(urls) {
    return dispatch => {
        try {
            return Promise.all(urls.map(async urlObject => {
                if (urlObject
                    && urlObject.type !== 'success' // Not already successfully checked
                    && !urlObject.url.startsWith('[no-check]') // Not marked as no-check
                ) {
                    // Check the status:
                    const response = await api.post('/api/v1/labs/check-url-status', { url: urlObject.url });
                    if (
                        response.data // Data in the response
                        && (response.data.status === 200 || response.data.status === 203) // Valid status
                    ) {
                        dispatch({
                            type: EDIT_RESOURCE_URL_STATUS,
                            id: urlObject.id,
                            url: response.data.href,
                        });
                    }
                }
            }));
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function saveStepProgress(data) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/labs/save-step-progress', {
                data,
            });

            dispatch({
                type: SAVE_STEP_PROGRESS,
                payload: res.data,
            });
        } catch (e) {
            return false;
        }
    };
}

export function addLabTime(id, time) {
    return async () => {
        try {
            await api.post('api/v1/activelabs/add-time', {
                id, time,
            });

            return true;
        } catch (e) {
            return false;
        }
    };
}

export function requestLabTime(active_lab_id) {
    return async () => {
        try {
            await api.post('api/v1/activelabs/request-time', { active_lab_id });

            return true;
        } catch (e) {
            return false;
        }
    };
}

export function notifyUserAboutLabReset(email, lab_name) {
    const data = {
        email, lab_name,
    };
    return async () => {
        try {
            await api.post('api/v1/admin/active-labs/reset-notification', data);

            return true;
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again' };
        }
    };
}
