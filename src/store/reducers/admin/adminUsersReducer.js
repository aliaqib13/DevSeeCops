import {
    ADMIN_FETCH_USERS_START,
    ADMIN_FETCH_USERS_SUCCESS,
    ADMIN_FETCH_USERS_ERROR,
    ADMIN_CHANGE_USER_STATUS_START,
    ADMIN_CHANGE_USER_STATUS_SUCCESS,
    ADMIN_CHANGE_USER_STATUS_ERROR,
    ADMIN_DELETE_USER_START,
    ADMIN_DELETE_USER_SUCCESS,
    ADMIN_DELETE_USER_ERROR,
    ADMIN_CREATE_USER,
    ADMIN_UPDATE_USER,
    ADMIN_CHANGE_FELLOW,
} from '../../action-types/admin/users';

export const initialState = {
    data: [],
    csvData: [],
    roles: [],
    total: 0,
    loading: false,
    loadingChangeUserStatus: false,
    loadingDeleteUser: false,
    error: null,
};

export default function adminUsersReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
    case ADMIN_FETCH_USERS_START:
        return {
            ...state,
            error: null,
            loading: true,
        };
    case ADMIN_FETCH_USERS_SUCCESS:
        return {
            ...state,
            error: null,
            loading: false,
            data: action.payload.users.data,
            roles: action.payload.roles,
            total: action.payload.users.total,
            csvData: action.payload.csvData,
        };
    case ADMIN_FETCH_USERS_ERROR:
        return {
            ...state,
            data: [],
            total: 0,
            loading: false,
            error: action.error,
        };
        // delete user
    case ADMIN_DELETE_USER_START:
        return {
            ...state,
            loadingDeleteUser: true,
            error: null,
        };

    case ADMIN_DELETE_USER_SUCCESS: {
        const data = state.data.filter(item => item.id !== action.payload);
        return {
            ...state,
            loadingDeleteUser: false,
            data,
            total: state.total - 1,
            error: null,
        };
    }

    case ADMIN_DELETE_USER_ERROR:
        return {
            ...state,
            loadingDeleteUser: false,
            error: action.error,
        };
        // change user status
    case ADMIN_CHANGE_USER_STATUS_START:
        return {
            ...state,
            loadingChangeUserStatus: true,
            error: null,
        };
    case ADMIN_CHANGE_USER_STATUS_SUCCESS: {
        const data = state.data.map(item => {
            if (item.id === action.payload.id) {
                return {
                    ...item,
                    activated: action.payload.status,
                };
            }
            return item;
        });
        return {
            ...state,
            loadingChangeUserStatus: false,
            data,
            error: null,
        };
    }

    case ADMIN_CHANGE_USER_STATUS_ERROR:
        return {
            ...state,
            loadingChangeUserStatus: false,
            error: action.error,
        };

    case ADMIN_CREATE_USER:
        return {
            ...state,
            data: [
                ...state.data,
                action.payload,
            ],
        };

    case ADMIN_UPDATE_USER: {
        const data = state.data.map(item => {
            if (item.id === action.payload.id) {
                return action.payload;
            }
            return item;
        });
        return {
            ...state,
            data,
        };
    }

    case ADMIN_CHANGE_FELLOW: {
        const data = state.data.map(item => {
            if (item.id === action.payload.id) {
                return {
                    ...item,
                    is_fellow: action.payload.is_fellow,
                };
            }
            return item;
        });
        return {
            ...state,
            loadingChangeUserStatus: false,
            data,
            error: null,
        };
    }

    default:
        return state;
    }
}
