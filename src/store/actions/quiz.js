import { FETCH_QUIZZES, SAVE_ANSWERS, CLEAR_QUIZ_STORE } from '../action-types/quiz';

import api from '../../services/api';

export function fetchQuizzes(course_id) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/quiz/${course_id}`);

            dispatch({
                type: FETCH_QUIZZES,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function saveAnswers(course_id, answers) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/quiz/save-answers', {
                course_id,
                answered_questions: answers,
            });

            dispatch({
                type: SAVE_ANSWERS,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function clearQuizStore() {
    return async dispatch => {
        dispatch({
            type: CLEAR_QUIZ_STORE,
        });
    };
}
