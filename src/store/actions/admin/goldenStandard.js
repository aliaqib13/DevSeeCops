import api from '../../../services/api';

export function updateSteps(data) {
    return async () => {
        try {
            const res = await api.post('/api/v1/admin/update-all-steps', data);
            return res.data;
        } catch (e) {
            return false;
        }
    };
}

export function updateStepContent(data) {
    return async () => {
        try {
            await api.post('/api/v1/admin/update-step-content', data);
            return true;
        } catch (e) {
            return false;
        }
    };
}

export function updateIsCompulsory(checked) {
    return async () => {
        try {
            await api.post('/api/v1/admin/update-step-compulsory', checked);
            return true;
        } catch (e) {
            return false;
        }
    };
}

export function removeAllCompulsorySteps(data) {
    return async () => {
        try {
            await api.post('/api/v1/admin/remove-compulsory-steps', data);
            return true;
        } catch (e) {
            return false;
        }
    };
}
