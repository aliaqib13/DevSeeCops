import {
    FETCH_HELP_DATA,
} from '../action-types/help';

const initialState = {
    data: [],

};

export default function helpReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    if (action.type === FETCH_HELP_DATA) {
        return {
            ...state,
            data: action.payload.content,
        };
    }
    return state;
}
