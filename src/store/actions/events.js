import api from '../../services/api';
import {
    FETCH_EVENTS,
    GET_EVENT,
} from '../action-types/events';

export function getEvents(keyword, currentPage, perPage) {
    return async dispatch => {
        try {
            const response = await api.get(`api/v1/events?keyword=${keyword || ''}&page=${currentPage || 1}&perPage=${perPage || 8}`);

            dispatch({
                type: FETCH_EVENTS,
                payload: response.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getEventById(id, edit) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/event?id=${id}&edit=${edit || ''}`);

            dispatch({
                type: GET_EVENT,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return false;
        }
    };
}

export function registerForEvent(id) {
    return async dispatch => {
        try {
            await api.post(`api/v1/events/register/${id}`);

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
