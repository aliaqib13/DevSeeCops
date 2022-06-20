import {
    SHARE_CERTIFICATE_EMAIL_START,
    SHARE_CERTIFICATE_EMAIL_SUCCESS,
    SHARE_CERTIFICATE_EMAIL_ERROR,
    FETCH_USER_CERTIFICATES,
    GET_USER_CERTIFICATE_BY_ID,
} from '../action-types/certificate';
import api from '../../services/api';

export function sendCertificateToEmail(data) {
    return async dispatch => {
        dispatch({
            type: SHARE_CERTIFICATE_EMAIL_START,
        });

        try {
            await api.post('api/v1/certificate/shareViaEmail', data);
            dispatch({
                type: SHARE_CERTIFICATE_EMAIL_SUCCESS,
            });
            return true;
        } catch (e) {
            dispatch({
                type: SHARE_CERTIFICATE_EMAIL_ERROR,
                error: e.response ? e.response.data : { message: 'Something went wrong, check the logs' },
            });
        }
    };
}

export function fetchUserCertificates(course_name) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/certificate?course_name=${course_name || ''}`);
            dispatch({
                type: FETCH_USER_CERTIFICATES,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function downloadCertificate(url) {
    return async () => {
        try {
            const res = await api.get(`api/v1/certificate-download/?url=${url}`, { responseType: 'blob' });

            return res.data;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getLearningPath(filter, finished) {
    return async () => {
        try {
            const res = await api.get(`api/v1/learning-path?filter=${filter}&finished=${finished}`);

            return res.data;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function createCertificateOfProgress(data) {
    return async () => {
        try {
            await api.post('api/v1/learning-path/certificate-of-progress', data);

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateCertificateVisibility(certificate) {
    return async () => {
        try {
            await api.post('api/v1/learning-path/update-certificate-visibility', certificate);

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function deleteCertificateOfProgress(id) {
    return async () => {
        try {
            await api.delete(`api/v1/learning-path/certificate-of-progress/${id}`);

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function notifyViaSlack(type, uuid) {
    return async () => {
        try {
            await api.post('api/v1/certificate/notify-slack', { type, uuid });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getUserCertificateById(id) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/certificate/${id}`);

            dispatch({
                type: GET_USER_CERTIFICATE_BY_ID,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong getting certificate data, please try again.' };
        }
    };
}
