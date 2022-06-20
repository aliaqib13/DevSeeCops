import api from '../../services/api';

import { UPDATE_AUTH_USER } from '../action-types/auth';

export function editProfile(data) {
    return async dispatch => {
        try {
            const res = await api.put('api/v1/edit-profile', data);
            dispatch({
                type: UPDATE_AUTH_USER,
                payload: res.data,
            });
            return true;
        } catch (e) {
            if (e.response) {
                return e.response.data;
            }

            return e;
        }
    };
}
