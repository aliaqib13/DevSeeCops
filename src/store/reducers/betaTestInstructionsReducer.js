import {
    FETCH_BETA_TEST_INSTRUCTIONS,
} from '../action-types/betaTestNotifications';

const initialState = {
    data: [],

};

export default function betaTestInstructionsReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    if (action.type === FETCH_BETA_TEST_INSTRUCTIONS) {
        return {
            ...state,
            data: action.payload.content,
        };
    }
    return state;
}
