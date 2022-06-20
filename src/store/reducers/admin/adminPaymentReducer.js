import { ADMIN_FETCH_PAYMENTS } from '../../action-types/admin/payment';

const initialState = {
    data: [],
    total: 0,
    lastPage: 0,
    page: 1,
    perPage: 10,
};

export default function adminPaymentReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    if (action.type === ADMIN_FETCH_PAYMENTS) {
        return {
            ...action.payload,
        };
    }

    return state;
}
