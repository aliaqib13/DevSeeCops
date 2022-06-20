import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FILED,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    GET_AUTH_USER,
    UPDATE_AUTH_USER,
    UPDATE_AUTH_USER_ACTIVE_LAB,
    UPDATE_AUTH_USER_ACTIVE_LAB_DURATION,
    GET_QR_CODE_SUCCESS,
} from '../action-types/auth';
import { GET_USER_SUBSCRIPTION_DATA } from '../action-types/tokenSubscriptions';

const initialState = {
    loading: false,
    authenticated: false,
    registered: false,
    registerLoading: false,
    user: null,
    error: null,
    qrCode: null,
};

export default function authReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
    case AUTH_START:
        return {
            ...state,
            loading: true,
            error: null,
        };
    case AUTH_SUCCESS:
        return {
            ...state,
            loading: false,
            authenticated: false,
            user: action.payload.user,
            mfaSession: action.payload.mfaSession,
            mfa: action.payload.mfa,
            error: null,
        };
    case GET_QR_CODE_SUCCESS:
        return {
            ...state,
            qrCode: action.payload,
        };
    case AUTH_FILED:
        return {
            ...state,
            loading: false,
            authenticated: false,
            error: action.error,
            user: null,
        };
    case REGISTER_START:
        return {
            ...state,
            registerLoading: true,
            error: null,
        };
    case REGISTER_SUCCESS:
        return {
            ...state,
            registerLoading: false,
            registered: true,
            error: null,
        };
    case REGISTER_ERROR:
        return {
            ...state,
            registerLoading: false,
            error: action.error,
        };
    case GET_AUTH_USER:
        return {
            ...state,
            loading: false,
            authenticated: true,
            user: action.payload,
            error: null,
        };

    case UPDATE_AUTH_USER: {
        const { user } = action.payload;
        user.roles = state.user.roles;
        user.permissions = state.user.permissions;
        return {
            ...state,
            loading: false,
            authenticated: true,
            user,
            error: null,
        };
    }
    case UPDATE_AUTH_USER_ACTIVE_LAB: {
        // Filter out the active lab from the list:
        const activeLabs = state.user.activeLabs.filter(item => item.id !== action.payload);
        // Return the adjusted state:s
        return {
            ...state,
            user: {
                ...state.user,
                activeLabs,
            },
        };
    }
    case UPDATE_AUTH_USER_ACTIVE_LAB_DURATION: {
        // Set lab end for the referenced activelab
        const activeLabs = state.user.activeLabs.map(item => {
            if (item.id === action.payload.lab_id) {
                return {
                    ...item,
                    lab_end_at: action.payload.lab_end_at,
                };
            }
            // Else return original item.
            return item;
        });

        // Return the adjusted state
        return {
            ...state,
            user: {
                ...state.user,
                activeLabs,
            },
        };
    }
    case GET_USER_SUBSCRIPTION_DATA:
        return {
            ...state,
            user: {
                ...state.user,
                userSubscription: action.payload,
            },
        };
    default:
        return state;
    }
}
