import api from '../../../services/api';
import { ADMIN_FETCH_COURSE_INTERESTS } from '../../action-types/admin/courseInterests';

export function getCourseInterests() {
    return async dispatch => {
        try {
            const result = await api.get('/api/v1/admin/course-interests');
            dispatch({
                type: ADMIN_FETCH_COURSE_INTERESTS,
                payload: result.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
