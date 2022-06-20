import { GET_FAQ } from '../action-types/tutorial';

import tutorialReducer from './tutorialReducer';

describe('tutorialReducer', () => {
    const initialState = {
        faq: [],
    };

    it('should set initialState when state is undefined', () => {
        const resultState = tutorialReducer(undefined);
        expect(resultState).toEqual(initialState);
    });

    it('should return the unaltered state if action is not recognised', () => {
        const action = {};
        const state = { old: 'state' };
        const resultState = tutorialReducer(state, action);

        expect(resultState).toEqual(state);
    });

    it('should set the state from the payload for GET_FAQ', () => {
        const action = {
            type: GET_FAQ,
            payload: 'test payload',
        };

        const resultState = tutorialReducer(initialState, action);

        expect(resultState).toStrictEqual({
            faq: 'test payload',
        });
    });
});
