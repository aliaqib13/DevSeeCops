import {
    FETCH_ACTIVE_COURSES,
    GET_COURSE_USERS,
    CLEAR_USERS,
    REMOVE_USER_ACTIVE_COURSE,
    ADD_USER_ACTIVE_COURSE,
    IMPORT_COURSE,
    FETCH_COURSES_PLATFORM_INSIGHTS,
    GET_COURSE_REQUESTS,
    GET_LAB_TIME_REQUESTS,
    ADMIN_FETCH_COURSE_STATUSES,
    ADMIN_FETCH_COURSES_BY_STATUS,
    ADMIN_FETCH_COURSE_PROPOSALS_REVIEW,
    ADMIN_FETCH_COURSE_PROPOSAL_BY_ID,
    ADMIN_FETCH_DEVELOPMENT_COURSES,
    ADMIN_FETCH_COURSE_PROPOSAL_BY_ID_FILES,
} from '../../action-types/admin/courseAdministration';

const initialState = {
    courses: [],
    statuses: [],
    users: {
        data: [],
    },
    courseRequests: {
        data: [],
    },
    labtimeRequests: {
        data: [],
    },
    coursesByStatus: {
        data: [],
    },
    developmentCourses: {
        data: [],
    },
    courseProposalsForReview: {
        data: [],
    },
    courseProposalById: {},
    courseProposalByIdFiles: [],

};

export default function adminCourseAdministrationReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
    case FETCH_ACTIVE_COURSES:
        return {
            ...state,
            courses: action.payload,
        };
    case FETCH_COURSES_PLATFORM_INSIGHTS:
        return {
            ...state,
            coursesPlatformInsights: action.payload,
        };
    case GET_COURSE_USERS:
        return {
            ...state,
            users: action.payload,
        };
    case GET_COURSE_REQUESTS:
        return {
            ...state,
            courseRequests: action.payload,
        };
    case CLEAR_USERS:
        return {
            ...state,
            users: [],
        };
    case REMOVE_USER_ACTIVE_COURSE: {
        const users = { ...state.users };
        const courses = [...state.courses];
        users.data.splice(users.data.findIndex(item => item.id === action.payload.user_id), 1);
        courses[courses.findIndex(item => item.id === action.payload.course_id)].__meta__.activeCourses_count -= 1;
        return {
            ...state,
            users,
            courses,
        };
    }
    case ADD_USER_ACTIVE_COURSE: {
        const courses = [...state.courses];
        courses[courses.findIndex(item => item.id === action.payload.course_id)].__meta__.activeCourses_count += 1;
        return {
            ...state,
            courses,
        };
    }
    case IMPORT_COURSE: {
        return {
            ...state,
            courses: [
                ...state.courses,
                action.payload,
            ],
        };
    }
    case GET_LAB_TIME_REQUESTS:
        return {
            ...state,
            labtimeRequests: action.payload,
        };
    case ADMIN_FETCH_COURSE_STATUSES:
        return {
            ...state,
            statuses: action.payload,
        };
    case ADMIN_FETCH_COURSES_BY_STATUS:
        return {
            ...state,
            coursesByStatus: action.payload,
        };
    case ADMIN_FETCH_DEVELOPMENT_COURSES:
        return {
            ...state,
            developmentCourses: action.payload,
        };
    case ADMIN_FETCH_COURSE_PROPOSALS_REVIEW:
        return {
            ...state,
            courseProposalsForReview: action.payload,
        };
    case ADMIN_FETCH_COURSE_PROPOSAL_BY_ID:
        return {
            ...state,
            courseProposalById: action.payload,
        };
    case ADMIN_FETCH_COURSE_PROPOSAL_BY_ID_FILES:
        return {
            ...state,
            courseProposalByIdFiles: action.payload,
        };
    default:
        return state;
    }
}
