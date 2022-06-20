import {
    FETCH_COURSES_START,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_ERROR,
    GET_COURSE_START,
    GET_COURSE_SUCCESS,
    GET_COURSE_ERROR,
    GET_AWS_LINK_SUCCESS,
    FETCH_INTRO_COURSES,
    FETCH_COURSES_GROUPED_BY_TYPES,
} from '../action-types/courses';

export const initialState = {
    loading: false,
    loadingCourse: false,
    data: {},
    categories: [],
    course: null,
    error: null,
    currentCourse: null,
    introCourses: [],
    userDidIntroductions: false,
    coursesGroupedByTypes: [],
};

export default function coursesReducer(state, action) {
    if (typeof state === 'undefined') {
        return JSON.parse(JSON.stringify(initialState));
    }
    switch (action.type) {
    case FETCH_COURSES_START:
        return {
            ...state,
            error: null,
            loading: true,
        };
    case FETCH_COURSES_SUCCESS:
        return {
            ...state,
            loading: false,
            error: null,
            data: action.payload.courses,
            categories: action.payload.categories,
        };
    case FETCH_COURSES_ERROR:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    case GET_COURSE_START:
        return {
            ...state,
            error: null,
            loadingCourse: true,
        };
    case GET_COURSE_SUCCESS:
        return {
            ...state,
            error: null,
            loadingCourse: false,
            course: action.payload,
        };
    case GET_COURSE_ERROR:
        return {
            ...state,
            loadingCourse: false,
            error: action.error,
        };
    case GET_AWS_LINK_SUCCESS:
        return {
            ...state,
            course: {
                ...state.course,
                aws: action.payload,
            },
        };
    case FETCH_INTRO_COURSES:
        return {
            ...state,
            introCourses: action.payload.introCourses,
            userDidIntroductions: action.payload.userDidIntroductions,
        };
    case FETCH_COURSES_GROUPED_BY_TYPES:
        return {
            ...state,
            coursesGroupedByTypes: action.payload,
        };
    default:
        return state;
    }
}
