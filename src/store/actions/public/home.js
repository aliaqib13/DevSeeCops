import api from '../../../services/api';

export function fetchSlider() {
    return async () => {
        try {
            const res = await api.get('api/v1/get-home-news');
            return res.data;
        } catch (e) {
            return false;
        }
    };
}
