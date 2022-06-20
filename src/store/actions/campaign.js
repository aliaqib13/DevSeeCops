import api from '../../services/api';
import {
    GET_CAMPAIGN,
} from '../action-types/campaign';

export function getCampaign(id) {
    return async dispatch => {
        try {
            const response = await api.get(`api/v1/campaign/${id}`);
            dispatch({
                type: GET_CAMPAIGN,
                payload: response.data,
                campaign_id: id,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
