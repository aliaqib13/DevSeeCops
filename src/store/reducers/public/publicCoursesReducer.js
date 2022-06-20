import {
    FETCH_COURSES_SUCCESS,
} from '../../action-types/courses';
import { GET_COURSE_BY_ID } from '../../action-types/course';

const initialState = {
    loading: false,
    loadingCourse: false,
    data: [],
    categories: [],
    course: null,
    error: null,
    currentCourse: null,
};

export default function publicCoursesReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
    case FETCH_COURSES_SUCCESS:
        return {
            ...state,
            loading: false,
            error: null,
            data: action.payload.courses,
            categories: action.payload.categories,
        };
    case GET_COURSE_BY_ID:
        return action.payload;
    default:
        return state;
    }
}
