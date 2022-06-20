import { GET_COURSE_BY_ID } from '../action-types/course';

const initialState = {};

export default function (state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    if (action.type === GET_COURSE_BY_ID) {
        return action.payload;
    }

    // If we're not processing the action, return this state unaltered.
    return state;
}
