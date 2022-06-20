import { FETCH_FELLOW_GALLERY } from '../action-types/fellowGallery';
import api from '../../services/api';

export function fetchFellowGallery() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/fellow-gallery');
            dispatch({
                type: FETCH_FELLOW_GALLERY,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
