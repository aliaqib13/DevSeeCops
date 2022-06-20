import {
    GET_CHAPTERS_ERROR,
    GET_CHAPTERS_START,
    GET_CHAPTERS_SUCCESS,
    SAVE_CURRENT_STEP,
} from '../action-types/chapters';

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default function chaptersReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
    case GET_CHAPTERS_START:
        return {
            ...state,
            loading: true,
            error: null,
            data: null,
        };
    case GET_CHAPTERS_SUCCESS:
        return {
            loading: false,
            data: action.payload,
            error: null,
        };
    case GET_CHAPTERS_ERROR:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    case SAVE_CURRENT_STEP: {
        const data = { ...state.data };
        data.currentStep = action.payload;
        return {
            ...state,
            data,
        };
    }
    default:
        return state;
    }
}
