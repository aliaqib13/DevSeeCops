import {
    ADMIN_GET_JOBS_START,
    ADMIN_GET_JOBS_SUCCESS,
    ADMIN_GET_JOBS_ERROR,
    ADMIN_DELETE_JOB,
    ADMIN_CHANGE_JOB_STATUS,
    ADMIN_BULK_DELETE_JOBS,
} from '../../action-types/admin/jobs';

const initialState = {
    data: {},
    loading: false,
    error: null,
};

export default function adminJobsReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
    case ADMIN_GET_JOBS_START:
        return {
            ...state,
            error: null,
            loading: true,
        };
    case ADMIN_GET_JOBS_SUCCESS:
        return {
            data: action.payload,
            error: null,
            loading: false,
        };
    case ADMIN_GET_JOBS_ERROR:
        return {
            data: [],
            error: action.error,
            loading: false,
        };
        // delete job
    case ADMIN_DELETE_JOB: {
        const jobs = { ...state.data };
        jobs.data.splice(jobs.data.findIndex(item => item.id === action.payload), 1);
        return {
            ...state,
            data: jobs,
        };
    }
    // changeJobStatus
    case ADMIN_CHANGE_JOB_STATUS: {
        const jobsArray = { ...state.data };
        jobsArray.data[jobsArray.data.findIndex(item => item.id === action.payload.id)] = action.payload;
        return {
            ...state,
            data: jobsArray,
        };
    }
    // bulk delete
    case ADMIN_BULK_DELETE_JOBS:
        return {
            ...state,
            data: {
                ...state.data,
                data: action.payload,
            },
        };
    default:
        return state;
    }
}
