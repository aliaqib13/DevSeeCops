import api from '../../services/api';
import {
    ADD_NOTIFICATION, ADD_UNREAD_NOTIFICATION, DELETE_NOTIFICATION,
    GET_NOTIFICATIONS, GET_NOTIFICATION, NOTIFICATION_SEEN,
    GET_UNREAD_NOTIFICATIONS, NOTIFICATIONS_SEEN,
} from '../action-types/notifications';

export function getNotifications() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/notifications');
            dispatch({
                type: GET_NOTIFICATIONS,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function addNotification(data) {
    return dispatch => {
        try {
            dispatch({
                type: ADD_NOTIFICATION,
                payload: data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function addUnreadNotification(data) {
    return dispatch => {
        try {
            dispatch({
                type: ADD_UNREAD_NOTIFICATION,
                payload: data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function notificationsSeen() {
    return async dispatch => {
        try {
            await api.put('api/v1/notifications-seen');
            dispatch({
                type: NOTIFICATIONS_SEEN,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getUnreadNotifications() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/unread-notifications');
            dispatch({
                type: GET_UNREAD_NOTIFICATIONS,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function deleteNotification(id) {
    return async dispatch => {
        try {
            await api.delete(`api/v1/notification/${id}`);
            dispatch({
                type: DELETE_NOTIFICATION,
                payload: id,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function clearUnreadNotifications() {
    return dispatch => {
        try {
            dispatch({
                type: NOTIFICATIONS_SEEN,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getNotificationById(id) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/notification/${id}`);
            dispatch({
                type: GET_NOTIFICATION,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function notificationSeenById(id) {
    return async dispatch => {
        try {
            await api.put(`api/v1/notifications-seen/${id}`);
            dispatch({
                type: NOTIFICATION_SEEN,
                payload: id,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
