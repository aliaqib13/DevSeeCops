import {
    SHARE_CERTIFICATE_EMAIL_START,
    SHARE_CERTIFICATE_EMAIL_SUCCESS,
    SHARE_CERTIFICATE_EMAIL_ERROR,
    FETCH_USER_CERTIFICATES,
    GET_USER_CERTIFICATE_BY_ID,
} from '../action-types/certificate';

const initialState = {
    loading: false,
    error: null,
    theory_certificates: [],
    completion_certificates: [],
    certificate_of_progress: [],
    certificateById: null,
};

export default function certificateReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
    case SHARE_CERTIFICATE_EMAIL_START:
        return {
            ...state,
            loading: true,
            error: null,
        };
    case SHARE_CERTIFICATE_EMAIL_SUCCESS:
        return {
            ...state,
            loading: false,
            error: null,
        };
    case SHARE_CERTIFICATE_EMAIL_ERROR:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    case FETCH_USER_CERTIFICATES:
        return {
            ...state,
            theory_certificates: action.payload.certificate_of_theory,
            completion_certificates: action.payload.certificate_of_completion,
            certificate_of_progress: action.payload.certificate_of_progress,
        };
    case GET_USER_CERTIFICATE_BY_ID:
        return {
            ...state,
            certificateById: action.payload,
        };
    default:
        return state;
    }
}
