import {
    ADMIN_FETCH_CERTIFICATES, ADMIN_DELETE_CERTIFICATE, ADMIN_UPDATE_CERTIFICATE,
}
    from '../../action-types/admin/menageCertificate';
import api from '../../../services/api';

export function fetchCertificates(search) {
    return async dispatch => {
        try {
            const response = await api.get(`api/v1/admin/certificates/?user=${search.user || ''}&type=${search.type || ''}`);
            dispatch({
                type: ADMIN_FETCH_CERTIFICATES,
                payload: response.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function deleteCertificate(id) {
    return async dispatch => {
        try {
            const res = await api.delete(`api/v1/admin/certificates/${id}`);

            dispatch({
                type: ADMIN_DELETE_CERTIFICATE,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateCertificate(id, data) {
    return async dispatch => {
        try {
            const res = await api.put(`api/v1/admin/certificates/${id}`, data);
            dispatch({
                type: ADMIN_UPDATE_CERTIFICATE,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again' };
        }
    };
}

export function searchByCourse(course, searchTags = []) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/admin/search-by-course?course=${course}&searchTags=${searchTags}`);
            dispatch({
                type: ADMIN_FETCH_CERTIFICATES,
                payload: res.data.certificates,
            });
            return res;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again' };
        }
    };
}
