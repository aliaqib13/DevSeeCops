import {
    ADMIN_CHANGE_REQUEST_STATUS_SUCCESS, ADMIN_DELETE_REQUEST,
    ADMIN_GET_ACCESS_REQUESTS_SUCCESS,
} from '../../action-types/admin/requests';

const initialState = [];

export default function adminAccessRequestsReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
    case ADMIN_GET_ACCESS_REQUESTS_SUCCESS:
        return action.payload;
    case ADMIN_CHANGE_REQUEST_STATUS_SUCCESS: {
        const newState = [...state];
        newState.map(item => item.requests.map((element, index) => {
            if (element.id === action.payload.id) {
                return item.requests[index] = action.payload;
            }
            return true;
        }));
        return newState;
    }

    case ADMIN_DELETE_REQUEST: {
        const updatedState = [...state];
        updatedState.map(item => item.requests.map((element, index) => {
            if (element.id === action.payload) {
                return item.requests.splice(index, 1);
            }
            return true;
        }));
        return updatedState;
    }

    default:
        return state;
    }
}
