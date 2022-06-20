import { FETCH_LEARNING_PATHS, FETCH_INTRO_BY_CATEGORY, FETCH_PLANNED_COURSES } from '../action-types/learningPath';

const initialState = {
    learningPaths: [],
    categories: [],
    notifyCourses: [],
};

export default function learningPathReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
    case FETCH_LEARNING_PATHS:
        return {
            ...state,
            learningPaths: action.payload.learningPaths,
            categories: action.payload.categories,
            notifyCourses: action.payload.notifyCourses,
        };
    case FETCH_INTRO_BY_CATEGORY:
        return {
            ...state,
            introByCategory: action.payload,
        };
    case FETCH_PLANNED_COURSES:
        return {
            ...state,
            notifyCourses: action.payload.plannedCourses,
        };
    default:
        return state;
    }
}
