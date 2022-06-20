import api from '../../../services/api';
import {
    GET_CAMPAIGNS,
} from '../../action-types/admin/campaign';

export function getCampaigns() {
    return async dispatch => {
        try {
            const response = await api.get('api/v1/admin/campaigns');
            dispatch({
                type: GET_CAMPAIGNS,
                payload: response.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateCampaignActiveness(id) {
    return async () => {
        try {
            await api.put(`api/v1/admin/campaign/${id}/active`);

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateCampaignConfig(id, data) {
    return async () => {
        try {
            await api.put(`api/v1/admin/campaign/${id}/config`, data);

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
