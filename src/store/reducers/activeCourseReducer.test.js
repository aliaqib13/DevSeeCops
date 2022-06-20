import {
    GET_ACTIVE_COURSE_START,
    GET_ACTIVE_COURSE_SUCCESS,
    GET_ACTIVE_COURSE_ERROR,
} from '../action-types/activeCourse';

import { GET_JOB_PROGRESS } from '../action-types/labs';

import activeCourseReducer from './activeCourseReducer';

describe('activeCourseReducer', () => {
    const initialState = {
        loading: false,
        loadingCreateACourse: false,
        error: null,
    };

    it('should set initialState when state is undefined', () => {
        const resultState = activeCourseReducer(undefined);
        expect(resultState.loading).toBe(false);
        expect(resultState.loadingCreateACourse).toBe(false);
        expect(resultState.error).toBe(null);
    });

    it('GET_ACTIVE_COURSE_START should set loading:true, error:null', () => {
        const resultState = activeCourseReducer(initialState, { type: GET_ACTIVE_COURSE_START });

        expect(resultState).not.toBe(initialState);

        expect(resultState.loading).toBe(true);
        expect(resultState.error).toBe(null);
    });

    it('GET_ACTIVE_COURSE_SUCCESS set loading:false, error:null and rest of state', () => {
        const rest = { something: 'else' };
        const resultState = activeCourseReducer(initialState, { type: GET_ACTIVE_COURSE_SUCCESS, payload: rest });

        expect(resultState).not.toBe(initialState);

        expect(resultState.loading).toBe(false);
        expect(resultState.error).toBe(null);
        expect(resultState.something).toBe(rest.something);
    });

    it('GET_ACTIVE_COURSE_ERROR loading:false, error: action.error', () => {
        const error = { error: 'Error getting aCourse' };
        const resultState = activeCourseReducer(initialState, { type: GET_ACTIVE_COURSE_ERROR, error });

        expect(resultState).not.toBe(initialState);

        expect(resultState.loading).toBe(false);
        expect(resultState.error).toBe(error);
    });

    it('GET_JOB_PROGRESS activeLab updates activeLab', () => {
        const jobs = 'none';
        const stateActiveLab = {
            loading: false,
            loadingCreateACourse: false,
            error: null,
            activeLab: {
                loading: false,
            },
        };
        const resultState = activeCourseReducer(stateActiveLab, { type: GET_JOB_PROGRESS, payload: jobs });

        expect(resultState).not.toBe(stateActiveLab);

        expect(resultState.loading).toBe(false);
        expect(resultState.activeLab.jobs).toBe(jobs);
        expect(resultState.activeLab.loading).toBe(false);
    });
});
