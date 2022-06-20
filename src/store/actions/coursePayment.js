import api from '../../services/api';

export function courseAccessRequest(courseId) {
    return async () => {
        try {
            return await api.post('api/v1/course-request', { course_id: courseId });
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function requestCourseFromTeam(courseId, teamId) {
    return async () => {
        try {
            return await api.post('api/v1/request-team-course', { course_id: courseId, team_id: teamId });
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function payCourse(data) {
    return async () => {
        try {
            const res = await api.post('api/v1/payments/pay-course', data);

            return res.data;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function createPaymentIntents({ courseId }) {
    return async () => {
        try {
            const res = await api.post('api/v1/payments/create-intents', { course_id: courseId });

            return res.data;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function checkCustomer() {
    return async () => {
        try {
            const res = await api.get('api/v1/payments/check-customer');

            if (res.data && !Object.keys(res.data).length) {
                return false;
            }
            return res.data;
        } catch (e) {
            return false;
        }
    };
}

export function verifyCoupon(couponName) {
    return async () => {
        try {
            const res = await api.get(`api/v1/payments/verify-coupon?couponName=${couponName}`);

            return res.data;
        } catch (e) {
            return false;
        }
    };
}
