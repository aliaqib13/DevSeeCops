import api from '../../services/api';
import { FETCH_BETA_TEST_INSTRUCTIONS } from '../action-types/betaTestNotifications';

export const fetchBetaTestInstructions = () => async dispatch => {
    try {
        const res = await api.get('api/v1/beta-test-settings/instructions');
        dispatch({
            type: FETCH_BETA_TEST_INSTRUCTIONS,
            payload: res.data,
        });
        return true;
    } catch (e) {
        return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
    }
};
