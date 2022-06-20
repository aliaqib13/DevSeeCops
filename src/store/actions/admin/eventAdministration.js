import {
    GET_COURSES,
    CREATE_EVENT,
    UPDATE_EVENT,
    FETCH_EVENTS_ADMIN,
    FETCH_EVENT_USERS,
    GET_USERS_PROGRESS,
    GET_EVENT_CERTIFICATES,
    ADD_EVENT_MANAGER,
    REMOVE_EVENT_MANAGER,
    REMOVE_EVENT_EMAIL,
    GET_EVENT_TYPES,
} from '../../action-types/admin/eventAdministration';
import api from '../../../services/api';

export function getCourses() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/admin/event-administration/courses');

            dispatch({
                type: GET_COURSES,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return false;
        }
    };
}

export function createEvent(data) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/event-administration/events', data);

            dispatch({
                type: CREATE_EVENT,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateEvent(id, data) {
    return async dispatch => {
        try {
            const response = await api.put(`api/v1/admin/event-administration/events/${id}`, data);

            dispatch({
                type: UPDATE_EVENT,
                payload: response.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function deleteEvent(id) {
    return async () => {
        try {
            await api.delete(`api/v1/admin/event-administration/events/${id}`);
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function sendTestEmail(data) {
    return async () => {
        try {
            await api.post('api/v1/admin/event-administration/send-test-email-events', data);
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function sendEventEmails(data) {
    return async () => {
        try {
            const res = await api.post('api/v1/admin/event-administration/send-event-emails', data);
            return res.data;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function deleteEventEmails(id) {
    return async () => {
        try {
            await api.delete(`api/v1/admin/event-administration/event-emails/${id}`);
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getEvents() {
    return async dispatch => {
        try {
            const response = await api.get('api/v1/admin/event-administration/events');

            dispatch({
                type: FETCH_EVENTS_ADMIN,
                payload: response.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getEventUsers(eventId, currentPage, perPage, searchEmail) {
    return async dispatch => {
        try {
            const response = await api.get('api/v1/admin/event-administration/users', {
                params: {
                    event_id: eventId,
                    searchEmail,
                    page: currentPage || 1,
                    perPage: perPage || 8,
                },
            });

            dispatch({
                type: FETCH_EVENT_USERS,
                payload: response.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function removeUserFromEvent(eventId, userId) {
    return async () => {
        try {
            await api.delete('api/v1/admin/event-administration/users', {
                params: {
                    event_id: eventId,
                    user_id: userId,
                },
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function assignEvent(eventId, userId) {
    return async () => {
        try {
            await api.put('api/v1/admin/event-administration/users', {
                params: {
                    event_id: eventId,
                    user_id: userId,
                },
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function assignEventToAll(eventId) {
    return async () => {
        try {
            await api.put(`api/v1/admin/event-administration/all-users/${eventId}`);

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function createAndSendNotification(data) {
    return async () => {
        try {
            await api.post('api/v1/admin/event-administration/create-send-notification', data);

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getEventUsersProgress(eventId, currentPage, perPage) {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/admin/event-administration/users-progress', {
                params: {
                    event_id: eventId,
                    page: currentPage || 1,
                    perPage: perPage || 10,
                },
            });

            dispatch({
                type: GET_USERS_PROGRESS,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getEventCertificates(eventId, currentPage, perPage) {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/admin/event-administration/certificates', {
                params: {
                    event_id: eventId,
                    page: currentPage || 1,
                    perPage: perPage || 10,
                },
            });

            dispatch({
                type: GET_EVENT_CERTIFICATES,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function addEventManager(email, eventId) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/event-administration/event-manager', { email, event_id: eventId });

            dispatch({
                type: ADD_EVENT_MANAGER,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function removeEventManager(userId, eventId) {
    return async dispatch => {
        try {
            const res = await api.delete('api/v1/admin/event-administration/event-manager', {
                params: {
                    user_id: userId,
                    event_id: eventId,
                },
            });

            dispatch({
                type: REMOVE_EVENT_MANAGER,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function removeEventEmail(eventEmailId) {
    return async dispatch => {
        try {
            const res = await api.delete(`api/v1/admin/event-administration/event-email/${eventEmailId}`);

            dispatch({
                type: REMOVE_EVENT_EMAIL,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getEventTypes() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/admin/event-administration/event-types');

            dispatch({
                type: GET_EVENT_TYPES,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return false;
        }
    };
}
