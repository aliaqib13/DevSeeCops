import { FETCH_GENERAL_NOTIFICATION, CLEAR_GENERAL_NOTIFICATION } from '../action-types/generalNotification';
import api from '../../services/api';

export function fetchGeneralNotification(content = null) {
    return async dispatch => {
        try {
            if (content) {
                dispatch({
                    type: FETCH_GENERAL_NOTIFICATION,
                    payload: { globalNotification: content },
                });
                return true;
            }
            const res = await api.get('api/v1/global-notification');
            if (res.data) {
                dispatch({
                    type: FETCH_GENERAL_NOTIFICATION,
                    payload: res.data,
                });
                return true;
            }
            dispatch({
                type: CLEAR_GENERAL_NOTIFICATION,
            });
            return false;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
