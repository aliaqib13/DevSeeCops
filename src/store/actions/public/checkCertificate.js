import api from '../../../services/api';
import { GET_PUBLIC_CERTIFICATE_BY_ID } from '../../action-types/certificate';

export function getPublicCertificateById(id) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/public/check-certificate/${id}`);
            dispatch({
                type: GET_PUBLIC_CERTIFICATE_BY_ID,
                payload: res.data,
            });

            return true;
        } catch (e) {
            dispatch({ type: GET_PUBLIC_CERTIFICATE_BY_ID, payload: {} });
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getCertificateOfProgress(id) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/public/learning-path/certificate-of-progress/${id}`);

            return res.data;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
