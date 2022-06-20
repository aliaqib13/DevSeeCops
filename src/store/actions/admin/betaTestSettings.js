import api from '../../../services/api';
import imageApi from '../../../services/imageApi';

export function getBetaTestInstructions() {
    return async () => {
        try {
            return await api.get('api/v1/beta-test-settings/instructions');
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateBetaTestInstructions(data) {
    return async () => {
        try {
            return await api.post('api/v1/admin/beta-test-settings/instructions', data);
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function uploadImage(file, folder) {
    return async dispatch => {
        try {
            const response = await imageApi.post(`api/v1/admin/upload-file/${folder}`, file);
            return response.data.file;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function sendTestEmail(email, data) {
    return async () => {
        try {
            return await api.post('api/v1/admin/beta-test-settings/send-test-email', { email, data });
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function sendEmailBetaTesters(data) {
    return async () => {
        try {
            return await api.post('api/v1/admin/beta-test-settings/send-email-beta-testers', { data });
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
