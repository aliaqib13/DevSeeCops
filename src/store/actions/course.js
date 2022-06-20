import { GET_COURSE_BY_ID } from '../action-types/course';
import api from '../../services/api';

export function getCourseById(id) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/courses/${id}`);
            dispatch({
                type: GET_COURSE_BY_ID,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getIntroductionModule(id) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/introduction-module/${id}`);
            dispatch({
                type: GET_COURSE_BY_ID,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function createActiveCourse(course_id, from_subscription) {
    return async dispatch => {
        try {
            const response = await api.post('api/v1/courses/active-course', { course_id, from_subscription });

            return response.data;
        } catch (e) {
            return false;
        }
    };
}

export function createActiveIntroductionCourse(course_id) {
    return async dispatch => {
        try {
            const response = await api.post('api/v1/courses/create-active-course', { course_id });

            return response.data;
        } catch (e) {
            return false;
        }
    };
}

export function getExamCourseById(id) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/exam-course/${id}`);
            dispatch({
                type: GET_COURSE_BY_ID,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function createNotifyMe(id) {
    return async () => {
        try {
            if (!id) {
                console.error('Course id is required');
                throw new Error('Id is required');
            }
            const response = await api.post(`api/v1/courses/${id}/interested`);
            return response;
        } catch (e) {
            console.error('Error creating course notification: ', e);
            return false;
        }
    };
}

export function deleteNotifyCourse(courseId) {
    return async () => {
        try {
            if (!courseId) {
                console.error('Course id is required');
                throw new Error('Id is required');
            }
            const response = await api.delete(`api/v1/courses/${courseId}/interested`);
            return response;
        } catch (e) {
            console.error('Error deleting course notification: ', e);
            return false;
        }
    };
}
