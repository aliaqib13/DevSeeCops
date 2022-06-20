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
import api from '../../../services/api';
import imageApi from '../../../services/imageApi';

export function fetchActiveCourses() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/admin/course-administration');

            dispatch({
                type: FETCH_ACTIVE_COURSES,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return false;
        }
    };
}

export function getCourseUsers(course_id, page, perPage, searchEmail) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/admin/course-administration/users/?course_id=${course_id}&page=${page || 1}&perPage=${perPage || 10}&searchEmail=${searchEmail || ''}`);

            dispatch({
                type: GET_COURSE_USERS,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return false;
        }
    };
}

export function getCourseRequests(course_id, page, perPage, searchEmail) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/admin/course-administration/course-requests/?course_id=${course_id}&page=${page || 1}&perPage=${perPage || 10}&searchEmail=${searchEmail || ''}`);
            dispatch({
                type: GET_COURSE_REQUESTS,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return false;
        }
    };
}

export function clearUsers() {
    return dispatch => {
        dispatch({
            type: CLEAR_USERS,
        });
    };
}

export function searchUserByEmail(email) {
    return async () => {
        try {
            const res = await api.post('api/v1/admin/users/search-by-email', { email });

            return res.data;
        } catch (e) {
            return false;
        }
    };
}

export function addUserActiveCourse(email, courseId) {
    return async dispatch => {
        try {
            await api.post('api/v1/admin/course-administration/users', { email, course_id: courseId });

            dispatch({
                type: ADD_USER_ACTIVE_COURSE,
                payload: { course_id: courseId },
            });

            return true;
        } catch (e) {
            return e.response.data;
        }
    };
}

export function removeUserActiveCourse(userId, courseId) {
    return async dispatch => {
        try {
            await api.post('api/v1/admin/course-administration/delete-active-course', {
                user_id: userId,
                course_id: courseId,
            });

            dispatch({
                type: REMOVE_USER_ACTIVE_COURSE,
                payload: { user_id: userId, course_id: courseId },
            });

            return true;
        } catch (e) {
            return e.response.data;
        }
    };
}

export function uploadCourse(file) {
    return async dispatch => {
        try {
            const res = await imageApi.post('api/v1/admin/course-ie/import-course', file);

            dispatch({
                type: IMPORT_COURSE,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response.data;
        }
    };
}

export function fetchCoursesPlatformInsights() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/admin/course-administration/platform-insights');

            dispatch({
                type: FETCH_COURSES_PLATFORM_INSIGHTS,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response.data;
        }
    };
}

export function getLabtimeRequests(labId, page, perPage, searchEmail) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/admin/course-administration/labtime-requests/?lab_id=${labId}&page=${page || 1}&perPage=${perPage || 10}&searchEmail=${searchEmail || ''}`);
            dispatch({
                type: GET_LAB_TIME_REQUESTS,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return false;
        }
    };
}

export function changeLabtimeRequestStatus(data) {
    return async () => {
        try {
            await api.post('api/v1/admin/course-administration/labtime-requests/change-status', data);

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function deleteLabtimeRequest(id) {
    return async () => {
        try {
            await api.delete(`api/v1/admin/course-administration/labtime-requests/${id}`);

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getCourseStatuses() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/admin/course-administration/course-statuses');
            dispatch({
                type: ADMIN_FETCH_COURSE_STATUSES,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data.error : { message: 'Something went wrong, please try again' };
        }
    };
}

export function getCoursesByStatus(status, page, perPage, search) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/admin/course-administration/courses-by-status?status=${status}&page=${page || 1}&perPage=${perPage || 10}&search=${search || ''}`);
            dispatch({
                type: ADMIN_FETCH_COURSES_BY_STATUS,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data.error : { message: 'Something went wrong, please try again' };
        }
    };
}

export function getDevelopmentCourses(page, perPage, search) {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/admin/course-administration/courses-development-status', {
                params: {
                    page: page || 1,
                    perPage: perPage || 10,
                    search,
                },
            });
            dispatch({
                type: ADMIN_FETCH_DEVELOPMENT_COURSES,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data.error : { message: 'Something went wrong, please try again' };
        }
    };
}

export function getCourseProposalsForReviews() {
    return async dispatch => {
        try {
            const res = await api.get('/api/v1/admin/fellow-area/proposal');

            dispatch({
                type: ADMIN_FETCH_COURSE_PROPOSALS_REVIEW,
                payload: res.data,
            });

            return true;
        } catch (error) {
            return error.response ? error.response.data.error : { message: 'Something went wrong, Could not fetch Course proposals data' };
        }
    };
}

export function getCourseProposalById(id) {
    return async dispatch => {
        try {
            const res = await api.get(`/api/v1/fellow-area/proposal/${id}`);

            dispatch({
                type: ADMIN_FETCH_COURSE_PROPOSAL_BY_ID,
                payload: res.data,
            });

            return true;
        } catch (error) {
            return error.response ? error.response.data.error : { message: 'Something went wrong, Could not fetch Course proposal data' };
        }
    };
}

export function listCourseProposalFiles(proposalId) {
    return async dispatch => {
        try {
            const res = await api.get(`/api/v1/fellow-area/proposal/list-files/${proposalId}`);

            dispatch({
                type: ADMIN_FETCH_COURSE_PROPOSAL_BY_ID_FILES,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data.error : { message: 'Something went wrong while downloading the file, please try again.' };
        }
    };
}

export function downloadCourseProposalFile(proposalId, fileName) {
    return async () => {
        try {
            const res = await api.get(`/api/v1/fellow-area/proposal/get-file/${proposalId}/${fileName}`, { responseType: 'blob' });

            return res.data;
        } catch (e) {
            return e.response ? e.response.data.error : { message: 'Something went wrong while downloading the file, please try again.' };
        }
    };
}

export function sendRejectCourseProposalEmailToFellow(id, data) {
    return async () => {
        try {
            await api.post(`api/v1/admin/fellow-area/reject-course-proposal/${id}`, data);
            return true;
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again' };
        }
    };
}

export function proposalAcceptance(id) {
    return async () => {
        try {
            const response = api.post('/api/v1/admin/course-proposal/acceptance', { id });
            return response;
        } catch (e) {
            return e.response ? e.response.data.message : { message: 'Something went wrong, please try again' };
        }
    };
}
