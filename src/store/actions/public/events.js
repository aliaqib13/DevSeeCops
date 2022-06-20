import { FETCH_PUBLIC_EVENTS, GET_EVENT_BY_ID } from '../../action-types/events';
import api from '../../../services/api';

export function fetchPublicEvents(keyword) {
    return async dispatch => {
        try {
            const response = await api.get(`api/v1/public/events?keyword=${keyword || ''}`);

            dispatch({
                type: FETCH_PUBLIC_EVENTS,
                payload: response.data,
            });
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getPublicEventById(id) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/public/events/${id}`);
            dispatch({
                type: GET_EVENT_BY_ID,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function registerPlatformForEvent({
    firstname, lastname, email, event_id,
}) {
    return async dispatch => {
        try {
            await api.post('api/v1/register-platform-for-event', {
                firstname, lastname, email, event_id,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
