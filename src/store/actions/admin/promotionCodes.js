import api from '../../../services/api';

export function fetchCoupons() {
    return async () => {
        try {
            const res = await api.get('api/v1/admin/get-coupons');
            return res.data;
        } catch (e) {
            return false;
        }
    };
}

export function sendTestEmail(data) {
    return async () => {
        try {
            return await api.post('api/v1/admin/send-test-email', data);
        } catch (e) {
            return false;
        }
    };
}

export function sendPromoCodes(data) {
    return async () => {
        try {
            return await api.post('api/v1/admin/send-promotion-codes', data);
        } catch (e) {
            return false;
        }
    };
}

export function getPromotionCodesInfo() {
    return async dispatch => {
        try {
            return await api.get('api/v1/admin/promotion-codes-info');
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function notifyByEmail(data) {
    return async dispatch => {
        try {
            return await api.post('api/v1/admin/promotion-codes-info-emails', data);
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function sendPromoCodesNewUsers(data) {
    return async dispatch => {
        try {
            return await api.post('api/v1/admin/send-promotion-codes-new-users', data);
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
