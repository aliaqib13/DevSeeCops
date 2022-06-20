import api from '../../../services/api';
import { GET_PREFERENCES, GET_USER_COURSE_TAGS } from '../../action-types/preferences';

export function getPreferencesById(user_id) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/admin/get-preferences/${user_id}`);
            if (res.status === 204) {
                return {
                    status: 204,
                    message: 'No data!',
                };
            }
            dispatch({
                type: GET_PREFERENCES,
                payload: res.data.preferences,
            });
            dispatch({
                type: GET_USER_COURSE_TAGS,
                payload: res.data.userTags,
            });

            return true;
        } catch (e) {
            return e.response.data;
        }
    };
}
