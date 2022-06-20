import {
    ADD_NOTIFICATION,
    ADD_UNREAD_NOTIFICATION, DELETE_NOTIFICATION,
    GET_NOTIFICATIONS, GET_NOTIFICATION,
    GET_UNREAD_NOTIFICATIONS, NOTIFICATIONS_SEEN, NOTIFICATION_SEEN,
} from '../action-types/notifications';

const initialState = {
    allNotifications: [],
    unreadNotifications: [],
    notification: [],
};

export default function notificationsReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
    case GET_NOTIFICATIONS:
        return {
            ...state,
            allNotifications: action.payload,
        };
    case ADD_NOTIFICATION: {
        const newAllNotifications = [...state.allNotifications];
        newAllNotifications.unshift(action.payload);
        return {
            ...state,
            allNotifications: newAllNotifications,
        };
    }

    case GET_UNREAD_NOTIFICATIONS:
        return {
            ...state,
            unreadNotifications: action.payload,
        };

    case ADD_UNREAD_NOTIFICATION: {
        const updatedUnreadNotifications = [...state.unreadNotifications];
        updatedUnreadNotifications.push(action.payload);
        return {
            ...state,
            unreadNotifications: updatedUnreadNotifications,
        };
    }

    case NOTIFICATIONS_SEEN:
        return {
            ...state,
            unreadNotifications: [],
        };

    case DELETE_NOTIFICATION: {
        const updatedAllNotifications = [...state.allNotifications];
        const newUnreadNotifications = [...state.unreadNotifications];
        updatedAllNotifications.map((notification, index) => {
            if (notification.id === action.payload) {
                updatedAllNotifications.splice(index, 1);
            }
            return true;
        });
        newUnreadNotifications.map((notification, index) => {
            if (notification.id === action.payload) {
                newUnreadNotifications.splice(index, 1);
            }
            return true;
        });
        return {
            unreadNotifications: newUnreadNotifications,
            allNotifications: updatedAllNotifications,
        };
    }

    case GET_NOTIFICATION:
        return {
            ...state,
            notification: action.payload,
        };

    case NOTIFICATION_SEEN: {
        const updatedAllNotification = [...state.allNotifications].map(e => {
            if (e.id === action.payload) {
                return { ...e, seen: 1 };
            }
            return e;
        });
        const newUnreadNotification = [...state.unreadNotifications].filter(e => e.id !== action.payload);
        return {
            ...state,
            allNotifications: updatedAllNotification,
            unreadNotifications: newUnreadNotification,
        };
    }

    default:
        return state;
    }
}
