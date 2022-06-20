import {
    GET_CHAPTERS_ERROR,
    GET_CHAPTERS_START,
    GET_CHAPTERS_SUCCESS,
    SAVE_CURRENT_STEP,
} from '../action-types/chapters';

import chaptersReducer from './chaptersReducer';

describe('chaptersReducer', () => {
    const initialState = {
        data: null,
        loading: false,
        error: null,
    };

    it('should set initialState when state is undefined', () => {
        const resultState = chaptersReducer(undefined);
        expect(resultState).toEqual({ data: null, loading: false, error: null });
    });

    it('GET_CHAPTERS_ERROR should set state.loading=false and error=action.error', () => {
        const resultState = chaptersReducer(initialState, {
            type: GET_CHAPTERS_ERROR,
            error: 'test',
        });
        expect(resultState.loading).toBe(false);
        expect(resultState.error).toBe('test');
    });

    it('SAVE_CURRENT_STEP should set state.data.currentStep=action.payload', () => {
        const resultState = chaptersReducer(initialState, {
            type: SAVE_CURRENT_STEP,
            payload: 'test',
        });
        expect(resultState.data.currentStep).toBe('test');
    });

    it('GET_CHAPTERS_SUCCESS should set state.loading=false, state.error=null and state.data=action.payload', () => {
        const resultState = chaptersReducer(initialState, {
            type: GET_CHAPTERS_SUCCESS,
            payload: 'test',
        });
        expect(resultState.loading).toBe(false);
        expect(resultState.error).toBeNull();
        expect(resultState.data).toBe('test');
    });

    it('GET_CHAPTERS_START should set state.loading=false, state.error=null and state.data=null', () => {
        const resultState = chaptersReducer(initialState, {
            type: GET_CHAPTERS_START,
        });
        expect(resultState.loading).toBe(true);
        expect(resultState.error).toBeNull();
        expect(resultState.data).toBeNull();
    });
});
