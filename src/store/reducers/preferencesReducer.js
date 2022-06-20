import {
    GET_PREFERENCES, GET_CC_INFO, UPDATE_CC, GET_USER_COURSE_TAGS,
} from '../action-types/preferences';

const initialState = {
    content: null,
    userCourseTags: [],
    credit_card: {},
};

export default function preferencesReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
    case GET_PREFERENCES:
        return {
            ...state,
            content: action.payload.content,
        };
    case GET_USER_COURSE_TAGS:
        return {
            ...state,
            userCourseTags: action.payload,
        };
    case GET_CC_INFO:
        return {
            ...state,
            credit_card: action.payload || {},
        };
    case UPDATE_CC:
        return {
            ...state,
            credit_card: action.payload,
        };
    default:
        return state;
    }
}
