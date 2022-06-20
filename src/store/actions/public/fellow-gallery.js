import api from '../../../services/api';

export function fetchPublicFellowGallery() {
    return async () => {
        try {
            const res = await api.get('/api/v1/public/fellow-gallery');
            return res.data;
        } catch (e) {
            return false;
        }
    };
}
