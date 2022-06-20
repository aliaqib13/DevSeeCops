import {
    GET_COURSES,
    CREATE_EVENT,
    UPDATE_EVENT,
    FETCH_EVENTS_ADMIN,
    FETCH_EVENT_USERS,
    GET_USERS_PROGRESS,
    GET_EVENT_CERTIFICATES,
    GET_EVENT_TYPES,
} from '../../action-types/admin/eventAdministration';

const initialState = {
    coursesForEvent: [],
    createdEvent: {},
    updatedEvent: {},
    events: [],
    eventUsers: [],
    usersProgress: [],
    eventCertificates: [],
    eventTypes: [],
};

export default function adminEventAdministrationReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
    case GET_COURSES:
        return {
            ...state,
            coursesForEvent: action.payload,
        };
    case CREATE_EVENT:
        return {
            ...state,
            createdEvent: action.payload,
        };
    case UPDATE_EVENT:
        return {
            ...state,
            updatedEvent: action.payload,
        };
    case FETCH_EVENTS_ADMIN:
        return {
            ...state,
            events: action.payload.events,
            eventTypes: action.payload.eventTypes,
        };
    case FETCH_EVENT_USERS:
        return {
            ...state,
            eventUsers: action.payload,
        };
    case GET_USERS_PROGRESS:
        return {
            ...state,
            usersProgress: action.payload,
        };
    case GET_EVENT_CERTIFICATES:
        return {
            ...state,
            eventCertificates: action.payload,
        };
    case GET_EVENT_TYPES:
        return {
            ...state,
            eventTypes: action.payload,
        };
    default:
        return state;
    }
}
