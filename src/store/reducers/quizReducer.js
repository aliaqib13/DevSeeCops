import { FETCH_QUIZZES, SAVE_ANSWERS, CLEAR_QUIZ_STORE } from '../action-types/quiz';

const initialState = {
    questions: [],
    answers: {},
    failedQuestions: [],
    attempts: 0,
};

export default function quizReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
    case FETCH_QUIZZES:
        return {
            ...action.payload,
        };
    case SAVE_ANSWERS:
        return {
            ...state,
            ...action.payload,
        };
    case CLEAR_QUIZ_STORE:
        return initialState;
    default:
        return state;
    }
}
