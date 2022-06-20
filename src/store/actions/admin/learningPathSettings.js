import api from '../../../services/api';

export function createLearningPath(data) {
    return async () => {
        try {
            await api.post('api/v1/admin/learning-path', data);
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function editLearningPath(id, data) {
    return async () => {
        try {
            await api.put(`api/v1/admin/learning-path/${id}`, data);
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function deleteLearningPath(id) {
    return async () => {
        try {
            await api.delete(`api/v1/admin/learning-path/${id}`);
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
