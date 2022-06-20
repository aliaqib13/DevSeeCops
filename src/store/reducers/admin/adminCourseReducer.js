import {
    GET_COURSE_BY_ID_START,
    GET_COURSE_BY_ID_SUCCESS,
    GET_COURSE_BY_ID_ERROR,
    UPDATE_COURSE,
    CREATE_COURSE,
    CREATE_CATEGORY,
    DELETE_CATEGORY,
    FETCH_CATEGORIES,
    UPLOAD_IMAGE,
    ADMIN_ADD_NEW_LAB,
    ADMIN_DELETE_LAB,
    ADMIN_UPDATE_LAB,
    ADMIN_UPDATE_QUIZ,
    ADMIN_CREATE_QUIZ,
    ADMIN_DELETE_QUIZ,
    ADMIN_SAVE_ALL_QUIZZES,
    SIGN_LAB,
    ADD_AUTHOR,
    REMOVE_AUTHOR,
    ADMIN_EDIT_HINT,
    ADMIN_DELETE_HINT,
    ADMIN_ADD_HINT,
    ADMIN_FETCH_COURSE_TEMPLATE,
    ADMIN_FETCH_COURSE_DESIGNS,
    ADMIN_FETCH_COURSE_TYPES,
    UPDATE_CATEGORY,
    ADMIN_FETCH_CATEGORY,
} from '../../action-types/admin/course';

const initialState = {
    course: null,
    categories: [],
    loading: false,
    error: null,
    courseTemplates: [],
    courseDesigns: [],
    statuses: [],
    courseTypes: [],
    category: {},
};

export default function adminCourseReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
    case GET_COURSE_BY_ID_START:
        return {
            ...state,
            loading: true,
            error: null,
        };
    case GET_COURSE_BY_ID_SUCCESS:
        return {
            ...state,
            loading: false,
            course: action.payload.course,
            categories: action.payload.categories,
            statuses: action.payload.statuses,
        };
    case GET_COURSE_BY_ID_ERROR:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    case UPDATE_COURSE:
        return {
            ...state,
            course: action.payload,
        };
    case CREATE_COURSE:
        return {
            ...state,
            loading: false,
            course: action.payload,
        };
    case CREATE_CATEGORY: {
        state.categories.push(action.payload);
        return {
            ...state,
        };
    }
    case DELETE_CATEGORY: {
        const categories = [...state.categories];
        categories.splice(categories.findIndex(item => item.id === action.payload), 1);
        return {
            ...state,
            categories,
        };
    }
    case UPDATE_CATEGORY: {
        const cat = [...state.categories];
        cat[cat.findIndex(item => item.id === action.payload.id)] = action.payload;
        return {
            ...state,
            categories: cat,
        };
    }
    case FETCH_CATEGORIES:
        return {
            ...state,
            categories: action.payload,
        };
    case UPLOAD_IMAGE:
        return {
            ...state,
            course: {
                ...state.course,
                image: action.payload.file,
            },
        };
    case ADMIN_ADD_NEW_LAB: {
        const course = { ...state.course };
        course.labs.push(action.payload);
        return {
            ...state,
            course,
            error: null,
        };
    }

    case ADMIN_DELETE_LAB: {
        const newCourse = { ...state.course };
        newCourse.labs.splice(newCourse.labs.findIndex(item => item.id === action.payload), 1);
        return {
            ...state,
            course: newCourse,
            error: action.error,
        };
    }

    case ADMIN_UPDATE_LAB: {
        const updatedCourse = { ...state.course };
        updatedCourse.labs[updatedCourse.labs.findIndex(item => item.id === action.payload.id)] = action.payload;
        return {
            ...state,
            course: updatedCourse,
            error: action.error,
        };
    }
    case ADMIN_CREATE_QUIZ: {
        const newQuizzes = [...state.course.quizzes];
        newQuizzes.push(action.payload);
        return {
            ...state,
            course: {
                ...state.course,
                quizzes: newQuizzes,
            },
        };
    }
    case ADMIN_UPDATE_QUIZ: {
        const updateQuizzes = [...state.course.quizzes];
        updateQuizzes[updateQuizzes.findIndex(item => item.id === action.payload.id)] = action.payload;
        return {
            ...state,
            course: {
                ...state.course,
                quizzes: updateQuizzes,
            },
        };
    }
    case ADMIN_DELETE_QUIZ: {
        const deleteQuizzes = [...state.course.quizzes];
        deleteQuizzes.splice(deleteQuizzes.findIndex(item => item.id === action.payload), 1);

        return {
            ...state,
            course: {
                ...state.course,
                quizzes: deleteQuizzes,
            },
        };
    }
    case ADMIN_SAVE_ALL_QUIZZES:
        return {
            ...state,
            course: {
                ...state.course,
                quizzes: action.payload,
            },
        };
    case SIGN_LAB: {
        const signCourse = { ...state.course };
        signCourse.labs[signCourse.labs.findIndex(item => item.id === action.payload.id)] = action.payload;
        return {
            ...state,
            course: { ...signCourse },
        };
    }
    case ADD_AUTHOR: {
        const addCourseAuthor = { ...state.course };
        addCourseAuthor.authors.push(action.payload);
        return {
            ...state,
            course: addCourseAuthor,
        };
    }
    case REMOVE_AUTHOR: {
        const authors = state.course.authors.filter(item => item.id !== action.payload.user_id);
        return {
            ...state,
            course: {
                ...state.course,
                authors,
            },
        };
    }
    case ADMIN_ADD_HINT: {
        const addCourseHints = { ...state.course };
        action.payload.forEach(item => {
            addCourseHints.hints.unshift(item);
        });

        return {
            ...state,
            course: addCourseHints,
        };
    }
    case ADMIN_EDIT_HINT: {
        const editCourseHint = { ...state.course };
        editCourseHint.hints[editCourseHint.hints.findIndex(item => item.id === action.payload.id)] = action.payload;
        return {
            ...state,
            course: editCourseHint,
        };
    }
    case ADMIN_DELETE_HINT: {
        const removeCourseHint = { ...state.course };
        removeCourseHint.hints.splice(removeCourseHint.hints.findIndex(item => item.id === action.payload), 1);
        return {
            ...state,
            course: removeCourseHint,
        };
    }
    case ADMIN_FETCH_COURSE_TEMPLATE:
        return {
            ...state,
            courseTemplates: action.payload,
        };
    case ADMIN_FETCH_COURSE_DESIGNS:
        return {
            ...state,
            courseDesigns: action.payload,
        };
    case ADMIN_FETCH_COURSE_TYPES:
        return {
            ...state,
            courseTypes: action.payload,
        };
    case ADMIN_FETCH_CATEGORY:
        return {
            ...state,
            category: action.payload,
        };
    default:
        return state;
    }
}
