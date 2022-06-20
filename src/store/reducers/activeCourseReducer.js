import {
    GET_ACTIVE_COURSE_START,
    GET_ACTIVE_COURSE_SUCCESS,
    GET_ACTIVE_COURSE_ERROR,
} from '../action-types/activeCourse';

import { GET_JOB_PROGRESS } from '../action-types/labs';

const initialState = {
    loading: false,
    loadingCreateACourse: false,
    error: null,
};

export default function (state, action = {}) {
    const { type, payload, error } = action;
    if (typeof state === 'undefined') {
        return initialState;
    }

    const { activeLab } = state;
    switch (type) {
    case GET_ACTIVE_COURSE_START:
        return {
            ...state,
            loading: true,
            error: null,
        };
    case GET_ACTIVE_COURSE_SUCCESS:
        return {
            ...payload,
            loading: false,
            error: null,
        };
    case GET_ACTIVE_COURSE_ERROR:
        return {
            ...state,
            loading: false,
            error,
        };
        // update job
    case GET_JOB_PROGRESS:
        return {
            ...state,
            activeLab: {
                ...activeLab,
                jobs: payload,
            },
        };
    default:
        return state;
    }
}
