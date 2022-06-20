import api from '../../../services/api';
import {
    ADMIN_FETCH_USER_STATISTICS,
} from '../../action-types/admin/userStatistics';

export function fetchUserStatistics(user_id) {
    return async dispatch => {
        try {
            const response = await api.get(`api/v1/admin/user-statistics/${user_id}`);
            dispatch({
                type: ADMIN_FETCH_USER_STATISTICS,
                payload: response.data,
            });
            return response.data;
        } catch (e) {
            return e.response.data;
        }
    };
}
