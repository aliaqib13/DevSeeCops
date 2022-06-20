import api from '../../services/api';
import { FETCH_HELP_DATA } from '../action-types/help';

export const fetchHelpData = () => async dispatch => {
    try {
        const res = await api.get('api/v1/help');
        dispatch({
            type: FETCH_HELP_DATA,
            payload: res.data,
        });
        return true;
    } catch (e) {
        return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
    }
};
