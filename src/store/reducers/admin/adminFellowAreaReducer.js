import { FETCH_FELLOW_USERS, FETCH_FELLOW_COURSES } from '../../action-types/admin/fellow-area';

const initialState = {
    users: [],
    fellow_courses: [],
    draft: [],
    categories: [],
};

export default function (state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    if (action.type === FETCH_FELLOW_USERS) {
        return {
            users: action.payload,
        };
    } if (action.type === FETCH_FELLOW_COURSES) {
        return {
            ...action.paylaod,
        };
    }

    return state;
}
