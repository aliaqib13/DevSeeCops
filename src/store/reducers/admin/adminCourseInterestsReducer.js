import { ADMIN_FETCH_COURSE_INTERESTS } from '../../action-types/admin/courseInterests';

const initialState = {
    courseInterests: [],
};
export default function adminCourseInterestsReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    if (action.type === ADMIN_FETCH_COURSE_INTERESTS) {
        return {
            ...state,
            courseInterests: action.payload.data,
        };
    }
    return state;
}
