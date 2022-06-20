import {
    GET_COURSE_BY_ID,
} from '../action-types/course';

import courseReducer from './courseReducer';

describe('courseReducer', () => {
    it('should set initialState when state is undefined', () => {
        const resultState = courseReducer(undefined);
        expect(resultState).toEqual({});
    });

    it('should return the unaltered state if action is not recognised', () => {
        const action = {};
        const state = { some: 'state' };
        const resultantState = courseReducer(state, action);

        expect(resultantState).toBe(state);
    });

    it('should state the state from the payload for GET_COURSE_BY_ID', () => {
        const action = {
            type: GET_COURSE_BY_ID,
            payload: {
                some: Math.random(),
                data: 'here',
            },
        };
        const state = {};

        // Call the reducer
        const resultantState = courseReducer(state, action);

        // Should be exactly the payload object given
        expect(resultantState).toBe(action.payload);
    });
});
