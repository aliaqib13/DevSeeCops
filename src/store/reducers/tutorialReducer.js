import { GET_FAQ } from '../action-types/tutorial';

const initialState = {
    faq: [],
};

export default function tutorialReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    if (action.type === GET_FAQ) {
        return {
            ...state,
            faq: action.payload,
        };
    }
    return state;
}
