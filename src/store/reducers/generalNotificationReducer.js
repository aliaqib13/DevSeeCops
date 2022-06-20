import { CLEAR_GENERAL_NOTIFICATION, FETCH_GENERAL_NOTIFICATION } from '../action-types/generalNotification';

const initialState = {
    active: 0,
    text: '',
};

export default function generalNotificationReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    if (action.type === FETCH_GENERAL_NOTIFICATION) {
        return {
            ...action.payload.globalNotification,
        };
    }
    if (action.type === CLEAR_GENERAL_NOTIFICATION) {
        return {
            initialState,
        };
    }
    return state;
}
