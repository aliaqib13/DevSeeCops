import api from '../../../services/api';

export function fetchNews() {
    return async () => {
        try {
            const res = await api.get('api/v1/get-news');
            return res.data;
        } catch (e) {
            return false;
        }
    };
}

export function getPost(slug) {
    return async () => {
        try {
            const res = await api.get(`/api/v1/get-post?slug=${slug}`);
            return res.data;
        } catch (e) {
            return false;
        }
    };
}
