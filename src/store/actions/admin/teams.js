import api from '../../../services/api';

export function adminCreateTeam(data) {
    return async () => {
        try {
            const res = await api.post('api/v1/admin/create-team', data);

            return res.data;
        } catch (e) {
            return e.response ? e.response.data.error : { message: 'Something went wrong creating new team, please try again' };
        }
    };
}
