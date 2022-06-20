import { FETCH_REFERRALS, CREATE_REFERRAL, DELETE_REFERRAL } from '../action-types/referrals';
import api from '../../services/api';

export function fetchReferrals() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/referrals');
            dispatch({
                type: FETCH_REFERRALS,
                payload: res.data,
            });
            return res;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function createReferral(email) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/referral/create', { email });
            if (!res.message) {
                dispatch({
                    type: CREATE_REFERRAL,
                    payload: res.data,
                });
                return true;
            }
            return res;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
export function deleteReferral(id) {
    return async dispatch => {
        try {
            const res = await api.delete(`api/v1/referral/${id}`);
            if (!res.message) {
                dispatch({
                    type: DELETE_REFERRAL,
                    payload: res.data,
                });
                return true;
            }
            return res;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
