import api from '../../../services/api';

export default function sendForm(data) {
    return async () => {
        try {
            const res = await api.post('api/v1/send-contact-form', data);
            return res.data;
        } catch (e) {
            console.error('Error sending contact form: ', e);
            return false;
        }
    };
}
