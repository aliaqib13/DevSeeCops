import api from '../../../services/api';

export function exportCourseData(course_id) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/admin/course-ie/export-data/${course_id}`);

            return res.data;
        } catch (e) {
            return false;
        }
    };
}
