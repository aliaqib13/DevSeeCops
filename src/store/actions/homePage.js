import { FETCH_HOME_PAGE_DATA } from '../action-types/homePage';
import api from '../../services/api';

export function fetchHomePage(page) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/home/${page}`);
            dispatch({
                type: FETCH_HOME_PAGE_DATA,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
