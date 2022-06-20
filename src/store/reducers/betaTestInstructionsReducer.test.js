import {
    FETCH_BETA_TEST_INSTRUCTIONS,
} from '../action-types/betaTestNotifications';

import betaTestInstructionsReducer from './betaTestInstructionsReducer';

describe('betaTestInstructionsReducer', () => {
    const initialState = {
        data: [],
    };

    it('should set initialState when state is undefined', () => {
        const resultState = betaTestInstructionsReducer(undefined);
        expect(resultState.data).toEqual([]);
    });

    it('FETCH_BETA_TEST_INSTRUCTIONS should set state.data=action.payload.content', () => {
        const resultState = betaTestInstructionsReducer(initialState, {
            type: FETCH_BETA_TEST_INSTRUCTIONS,
            payload: {
                content: ['test'],
            },
        });
        expect(resultState.data).toEqual(['test']);
    });
});
