import api from '../../../services/api';
import imageApi from '../../../services/imageApi';
import {
    GET_COURSE_BY_ID_START,
    GET_COURSE_BY_ID_ERROR,
    GET_COURSE_BY_ID_SUCCESS,
    UPDATE_COURSE,
    CREATE_COURSE,
    CREATE_CATEGORY,
    DELETE_CATEGORY,
    FETCH_CATEGORIES,
    UPLOAD_IMAGE,
    ADMIN_ADD_NEW_LAB,
    ADMIN_UPDATE_LAB,
    ADMIN_DELETE_LAB,
    ADMIN_CREATE_QUIZ,
    ADMIN_UPDATE_QUIZ,
    ADMIN_DELETE_QUIZ,
    ADMIN_SAVE_ALL_QUIZZES,
    SIGN_LAB,
    ADD_AUTHOR,
    REMOVE_AUTHOR,
    ADMIN_ADD_HINT,
    ADMIN_DELETE_HINT,
    ADMIN_EDIT_HINT,
    ADMIN_FETCH_COURSE_TEMPLATE,
    ADMIN_FETCH_COURSE_DESIGNS,
    ADMIN_FETCH_COURSE_TYPES,
    UPDATE_CATEGORY,
    ADMIN_FETCH_CATEGORY,
} from '../../action-types/admin/course';

export function getCourseById(id) {
    return async dispatch => {
        dispatch({
            type: GET_COURSE_BY_ID_START,
        });

        try {
            const response = await api.get(`api/v1/admin/courses/${id}`);
            dispatch({
                type: GET_COURSE_BY_ID_SUCCESS,
                payload: response.data,
            });

            return true;
        } catch (e) {
            dispatch({
                type: GET_COURSE_BY_ID_ERROR,
                error: e.response ? e.response.data : { message: 'Something went wrong, please try again.' },
            });

            return false;
        }
    };
}

export function checkIntroByCategory(categoryId) {
    return async () => {
        try {
            const res = await api.get(`api/v1/admin/courses/check-intro?category_id=${categoryId}`);
            return res.data;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateCourse(id, data) {
    return async dispatch => {
        try {
            const response = await api.put(`api/v1/admin/courses/${id}`, data);

            dispatch({
                type: UPDATE_COURSE,
                payload: response.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateCourseAdmin(id, data) {
    return async dispatch => {
        try {
            const response = await api.put(`api/v1/admin/courses-admin/${id}`, data);

            dispatch({
                type: UPDATE_COURSE,
                payload: response.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function createCourse(data) {
    return async dispatch => {
        try {
            const response = await api.post('api/v1/admin/courses', data);
            dispatch({
                type: CREATE_COURSE,
                payload: response.data,
            });

            return response.data.id;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function createCategory(data) {
    return async dispatch => {
        try {
            const response = await api.post('api/v1/admin/categories', data);

            dispatch({
                type: CREATE_CATEGORY,
                payload: response.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function fetchCategories() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/admin/categories');

            dispatch({
                type: FETCH_CATEGORIES,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function deleteCategory(index, id) {
    return async dispatch => {
        try {
            await api.delete(`api/v1/admin/categories/${id}`);
            dispatch({
                type: DELETE_CATEGORY,
                payload: id,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateCategory(id, data) {
    return async dispatch => {
        try {
            const res = await api.put(`api/v1/admin/categories/${id}`, data);
            dispatch({
                type: UPDATE_CATEGORY,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function uploadFile(file, folder) {
    return async dispatch => {
        try {
            const response = await imageApi.post(`api/v1/admin/upload-file/${folder}`, file);

            dispatch({
                type: UPLOAD_IMAGE,
                payload: response.data,
            });

            return response.data.file;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function addLab(data) {
    return async dispatch => {
        try {
            const response = await api.post('api/v1/admin/labs', data);

            dispatch({
                type: ADMIN_ADD_NEW_LAB,
                payload: response.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function editLab(id, data) {
    return async dispatch => {
        try {
            const response = await api.put(`api/v1/admin/labs/${id}`, data);

            dispatch({
                type: ADMIN_UPDATE_LAB,
                payload: response.data.lab,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again' };
        }
    };
}

export function deleteLab(id) {
    return async dispatch => {
        try {
            await api.delete(`api/v1/admin/labs/${id}`);

            dispatch({
                type: ADMIN_DELETE_LAB,
                payload: id,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

// QUIZ
export function createQuiz(data) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/quiz', data);

            dispatch({
                type: ADMIN_CREATE_QUIZ,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function updateQuiz(id, data) {
    return async dispatch => {
        try {
            const res = await api.put(`api/v1/admin/quiz/${id}`, data);

            dispatch({
                type: ADMIN_UPDATE_QUIZ,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function deleteQuiz(id) {
    return async dispatch => {
        try {
            await api.delete(`api/v1/admin/quiz/${id}`);
            dispatch({
                type: ADMIN_DELETE_QUIZ,
                payload: id,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function saveAllQuizzes(courseId, data) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/quiz/save-all-quizzes', {
                course_id: courseId,
                ...data,
            });
            dispatch({
                type: ADMIN_SAVE_ALL_QUIZZES,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function saveSignature(labId, signature) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/labs/sign', {
                lab_id: labId,
                signature,
            });

            dispatch({
                type: SIGN_LAB,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function addAuthor(email, courseId) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/courses/add-author', {
                email,
                course_id: courseId,
            });

            dispatch({
                type: ADD_AUTHOR,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function removeAuthor(userId, courseId) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/courses/remove-author', {
                user_id: userId, course_id: courseId,
            });
            dispatch({
                type: REMOVE_AUTHOR,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function deleteCourse(courseId) {
    return async () => {
        try {
            await api.delete(`api/v1/admin/courses/${courseId}`);
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function addHint(data) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/hint', data);
            dispatch({
                type: ADMIN_ADD_HINT,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function editHint(id, data) {
    return async dispatch => {
        try {
            const res = await api.put(`api/v1/admin/hint/${id}`, data);
            dispatch({
                type: ADMIN_EDIT_HINT,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function deleteHint(id) {
    return async dispatch => {
        try {
            const res = await api.delete(`api/v1/admin/hint/${id}`);
            dispatch({
                type: ADMIN_DELETE_HINT,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
export function adminCreateActiveCourse(courseId) {
    return async () => {
        try {
            const response = await api.post('api/v1/admin/courses/process-to-course', { course_id: courseId });

            return response.data;
        } catch (e) {
            return false;
        }
    };
}

export function saveStateMachine(data) {
    return async () => {
        try {
            await api.post('api/v1/admin/labs/save-state-machine', data);
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again' };
        }
    };
}

export function getStateMachine(id) {
    return async () => {
        try {
            const response = await api.get(`api/v1/admin/labs/get-state-machine/${id}`);

            return response.data;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again' };
        }
    };
}

export function saveStateMachineConfig(data) {
    return async () => {
        try {
            await api.post('api/v1/admin/labs/save-state-machine-config', data);
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again' };
        }
    };
}

export function getStateMachineConfig(id) {
    return async () => {
        try {
            const response = await api.get(`api/v1/admin/labs/get-state-machine-config/${id}`);

            return response.data;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again' };
        }
    };
}

export function saveStateMachineFiles(data) {
    return async () => {
        try {
            await imageApi.post('api/v1/admin/labs/save-state-machine-files', data);
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again' };
        }
    };
}

export function getStateMachineFiles(id) {
    return async () => {
        try {
            const response = await api.get(`api/v1/admin/labs/get-state-machine-files/${id}`);

            return response.data;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again' };
        }
    };
}

export function getCourseTemplates() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/admin/course-templates');
            dispatch({
                type: ADMIN_FETCH_COURSE_TEMPLATE,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data.error : { message: 'Something went wrong, please try again' };
        }
    };
}

export function fetchCourseDesigns(courseId) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/admin/course-designs/${courseId}`);
            dispatch({
                type: ADMIN_FETCH_COURSE_DESIGNS,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data.error : { message: 'Something went wrong, please try again' };
        }
    };
}

export function mailFellows(courseId, data) {
    return async () => {
        try {
            return await api.post(`api/v1/admin/send-mail-fellows/${courseId}`, { data });
        } catch (e) {
            return e.response ? e.response.data.error : { message: 'Something went wrong, please try again' };
        }
    };
}

export function deleteAllStateMachineFiles(labId) {
    return async () => {
        try {
            await api.delete(`api/v1/admin/labs/delete-state-machine-files/${labId}`);

            return true;
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again' };
        }
    };
}
export function searchCourse(keyword) {
    return async () => {
        try {
            const res = await api.get(`api/v1/admin/search-course?keyword=${keyword}`);
            return res.data;
        } catch (e) {
            return false;
        }
    };
}

export function getCourseTypes() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/admin/course-types');

            dispatch({
                type: ADMIN_FETCH_COURSE_TYPES,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return false;
        }
    };
}

export function getCategory(id) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/admin/categories/${id}`);

            dispatch({
                type: ADMIN_FETCH_CATEGORY,
                payload: res.data,
            });
            return true;
        } catch (e) {
            console.error('Failed to get category:', e);
            return false;
        }
    };
}
