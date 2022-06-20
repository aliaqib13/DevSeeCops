import { GET_FAQ } from '../action-types/tutorial';
import api from '../../services/api';

export function fetchFaq() {
    return async dispatch => {
        try {
            const response = await api.get('api/v1/tutorial/get_faq');

            dispatch({
                type: GET_FAQ,
                payload: response.data,
            });
            return true;
        } catch (e) {
            console.log(e);
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
