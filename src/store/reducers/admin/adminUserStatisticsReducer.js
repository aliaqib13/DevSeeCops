import {
    ADMIN_FETCH_USER_STATISTICS,
} from '../../action-types/admin/userStatistics';

const initialState = {
    data: {
        user: {
            roles: [],
        },
        courses: [],
    },
};

export default function adminUserStatisticsReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    if (action.type === ADMIN_FETCH_USER_STATISTICS) {
        return {
            ...state,
            data: action.payload,
        };
    }
    return state;
}
