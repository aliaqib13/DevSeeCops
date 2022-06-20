import {
    FETCH_HELP_DATA,
} from '../action-types/help';

import helpReducer from './helpReducer';

describe('helpReducer', () => {
    const initialState = {
        data: [],
    };

    it('should set initialState when state is undefined', () => {
        const resultState = helpReducer(undefined);
        expect(resultState.data).toEqual([]);
    });

    it('FETCH_HELP_DATA should set state.data=action.payload.content', () => {
        const resultState = helpReducer(initialState, {
            type: FETCH_HELP_DATA,
            payload: {
                content: ['test'],
            },
        });
        expect(resultState.data).toEqual(['test']);
    });
});
