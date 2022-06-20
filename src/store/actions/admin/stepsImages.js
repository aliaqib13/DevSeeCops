import { UPLOAD_IMAGE, REMOVE_IMAGE } from '../../action-types/admin/stepsImages';
import api from '../../../services/api';

export function uploadStepImage(course_id, image) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/steps-images/upload-image', {
                course_id,
                image,
            });

            dispatch({
                type: UPLOAD_IMAGE,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again' };
        }
    };
}

export function removeStepImage(id) {
    return async dispatch => {
        try {
            await api.delete(`api/v1/admin/steps-images/${id}`);
            dispatch({
                type: REMOVE_IMAGE,
                payload: id,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again' };
        }
    };
}
