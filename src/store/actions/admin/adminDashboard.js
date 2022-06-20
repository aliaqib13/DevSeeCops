import api from '../../../services/api';

export const fetchAdminDashboardData = () => async () => {
    try {
        const data = await api.get('api/v1/admin/get-admin-dashboard-data');
        return data.data;
    } catch (e) {
        return e.response ? e.response.data : { message: 'Something went wrong, please try again' };
    }
};
