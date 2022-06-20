import {
    FETCH_EVENTS,
    GET_EVENT,
} from '../action-types/events';
import {
    ADD_EVENT_MANAGER,
    REMOVE_EVENT_MANAGER,
    REMOVE_EVENT_EMAIL,
} from '../action-types/admin/eventAdministration';

const initialState = {
    events: [],
    event: {},
};

export default function eventsReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
    case FETCH_EVENTS:
        return {
            ...state,
            events: action.payload,
        };
    case GET_EVENT:
        return {
            ...state,
            event: action.payload,
        };
    case ADD_EVENT_MANAGER: {
        const addEventManager = { ...state.event };
        addEventManager.eventManagers.push(action.payload);
        return {
            ...state,
            event: addEventManager,
        };
    }

    case REMOVE_EVENT_MANAGER: {
        const removeEventManager = { ...state.event };
        const index = removeEventManager.eventManagers.indexOf(action.payload.id);
        removeEventManager.eventManagers.splice(index, 1);
        return {
            ...state,
            event: removeEventManager,
        };
    }
    case REMOVE_EVENT_EMAIL: {
        const removeEventEmail = { ...state.event };
        const indexEmail = removeEventEmail.eventEmails.indexOf(action.payload.id);
        removeEventEmail.eventEmails.splice(indexEmail, 1);
        return {
            ...state,
            event: removeEventEmail,
        };
    }
    default:
        return state;
    }
}
