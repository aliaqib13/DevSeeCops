import api from '../../../services/api';
import { ADMIN_FETCH_PAYMENTS } from '../../action-types/admin/payment';

export function fetchAdminPayment(page, perPage) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/admin/payments?page=${page || 1}&perPage=${perPage || 10}`);
            dispatch({
                type: ADMIN_FETCH_PAYMENTS,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
