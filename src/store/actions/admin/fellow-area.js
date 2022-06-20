import { FETCH_FELLOW_USERS, FETCH_FELLOW_COURSES } from '../../action-types/admin/fellow-area';
import api from '../../../services/api';

export function fetchFellowUsers() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/admin/fellow-area');
            dispatch({
                type: FETCH_FELLOW_USERS,
                payload: res.data,
            });
        } catch (e) {
            return e.response.data;
        }
    };
}

export function fetchFellowCourses(id) {
    return async dispatch => {
        try {
            const res = await api.get(`/api/v1/admin/fellow-area/${id}`);

            dispatch({
                type: FETCH_FELLOW_COURSES,
                payload: res.data,
            });
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function saveDrafts(drafts, user_id) {
    return async () => {
        try {
            await api.post(`/api/v1/admin/fellow-area/save-drafts/${user_id}`, { drafts });
            return true;
        } catch (e) {
            return false;
        }
    };
}

export function searchCourse(keyword, user_id) {
    return async () => {
        try {
            const res = await api.get(`api/v1/admin/get-fellow-course?keyword=${keyword}&user_id=${user_id}`);
            return res.data;
        } catch (e) {
            return false;
        }
    };
}

export function assignLabBlocks(data) {
    return async () => {
        try {
            await api.post('api/v1/admin/assign-lab-blocks', data);
            return true;
        } catch (e) {
            return false;
        }
    };
}

export function getLabBlocks(id) {
    return async () => {
        try {
            const res = await api.get(`api/v1/admin/get-lab-blocks/${id}`);
            return res.data;
        } catch (e) {
            return false;
        }
    };
}

export function getCourseRequiredFields() {
    return async () => {
        try {
            const res = await api.get('api/v1/admin/fellow-area/required-fields');
            return res.data;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function createCourse(course, drafts, user_id) {
    return async dispatch => {
        try {
            await api.post(`/api/v1/admin/fellow-area/create-course/${user_id}`, { course, drafts });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function submitDrafts(drafts, user_id) {
    return async () => {
        try {
            await api.post(`/api/v1/admin/fellow-area/submit-drafts/${user_id}`, { drafts });
            return true;
        } catch (e) {
            return false;
        }
    };
}

export function clearDrafts(user_id) {
    return async dispatch => {
        try {
            await api.delete(`/api/v1/admin/fellow-area/delete-drafts/${user_id}`);
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
