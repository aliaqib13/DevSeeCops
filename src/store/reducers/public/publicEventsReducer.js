import { FETCH_PUBLIC_EVENTS, GET_EVENT_BY_ID } from '../../action-types/events';

const initialState = {
    events: [],
    event: {},
};

export default function publicEventsReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
    case FETCH_PUBLIC_EVENTS:
        return {
            ...state,
            events: action.payload,
        };
    case GET_EVENT_BY_ID:
        return {
            ...state,
            event: action.payload,
        };
    default:
        return state;
    }
}
