import api from '../../../services/api';

export function updateTags(data) {
    return async () => {
        try {
            return await api.post('/api/v1/admin/tag/', data);
        } catch (e) {
            return false;
        }
    };
}

export function fetchTags() {
    return async () => {
        try {
            const res = await api.get('api/v1/admin/tags');
            return res.data;
        } catch (e) {
            return false;
        }
    };
}
