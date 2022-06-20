import {
    CREATE_COURSE_PROPOSAL, FETCH_FELLOW_COURSES, GET_DESIRED_COURSES, GET_PROPOSALS,
} from '../action-types/fellowArea';

const initialState = {
    categories: [],
    desiredCourses: [],
    draft: [],
    fellow_courses: [],
    proposals: [],
    user: [],
};

export default function (state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
    case FETCH_FELLOW_COURSES: {
        const {
            fellow_courses: fellowCourses, draft, categories, user,
        } = action.payload;
        return {
            ...state,
            fellow_courses: fellowCourses,
            draft,
            categories,
            user,
        };
    }
    case GET_DESIRED_COURSES:
        return {
            ...state,
            desiredCourses: action.payload,
        };
    case GET_PROPOSALS:
        return {
            ...state,
            proposals: action.payload,
        };
    case CREATE_COURSE_PROPOSAL:
        return {
            ...state,
            courseProposal: { ...action.payload },
        };
    default:
        return state;
    }
}
