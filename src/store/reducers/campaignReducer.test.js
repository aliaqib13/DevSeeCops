import {
    GET_CAMPAIGN,
} from '../action-types/campaign';

import campaignReducer from './campaignReducer';

describe('campaignReducer', () => {
    const initialState = {};

    it('should set initialState when state is undefined', () => {
        const resultState = campaignReducer(undefined);
        expect(resultState).toEqual({});
    });

    it('GET_CAMPAIGN should set state[action.campaign_id]=[action.payload]', () => {
        const resultState = campaignReducer(initialState, {
            type: GET_CAMPAIGN,
            payload: 'test',
            campaign_id: 'testKey',
        });
        expect(resultState.testKey).toBe('test');
    });
});
