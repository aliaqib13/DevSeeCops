import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FILED,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    GET_AUTH_USER,
    GET_QR_CODE_SUCCESS,
} from '../action-types/auth';
import api from '../../services/api';

export function login(data) {
    return async dispatch => {
        dispatch({
            type: AUTH_START,
        });

        try {
            // Attempt to login:
            const response = await api.post('login', data);
            // If there's a token and refresh token:
            if (response.data.token && response.data.refreshToken) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('refresh_token', response.data.refreshToken);
                dispatch({
                    type: AUTH_SUCCESS,
                    payload: null,
                });
            } else if (response.data.mfaSession) {
                dispatch({
                    type: AUTH_SUCCESS,
                    payload: {
                        user: response.data.user,
                        mfaSession: response.data.mfaSession,
                        mfa: response.data.mfa,
                    },
                });
                dispatch({
                    type: GET_QR_CODE_SUCCESS,
                    payload: response.data.qrImage,
                });
            } else {
                // Unexpected issue:
                dispatch({
                    type: AUTH_FILED,
                    error: { message: 'Something went wrong try again later.' },
                });
            }
        } catch (e) {
            if (e.response && e.response.status === 422) {
                dispatch({
                    type: AUTH_FILED,
                    error: { message: 'Wrong username or password, or account not activated' },
                });
            } else {
                dispatch({
                    type: AUTH_FILED,
                    error: { message: 'Something went wrong try again later.' },
                });
            }
        }
    };
}

export function logout() {
    return async () => {
        try {
            const res = await api.post('/api/logout');
            return res.data;
        } catch (e) {
            return e.response ? e.response : { message: 'Something went wrong please try again' };
        }
    };
}

export function register(data) {
    return async dispatch => {
        dispatch({
            type: REGISTER_START,
        });

        try {
            await api.post('/register', data);

            dispatch({
                type: REGISTER_SUCCESS,
            });
            return true;
        } catch (e) {
            const response = e.response || { data: { error: 'Unknown error' } };
            dispatch({
                type: REGISTER_ERROR,
                error: response.data.error,
            });
            return response;
        }
    };
}

export function getAuthUser() {
    return async dispatch => {
        dispatch({
            type: AUTH_START,
        });

        try {
            const response = await api.post('api/v1/me');
            dispatch({
                type: GET_AUTH_USER,
                payload: response.data,
            });
            return true;
        } catch (e) {
            dispatch({
                type: AUTH_FILED,
                error: { message: 'Wrong username or password, or account not activated' },
            });
            return false;
        }
    };
}

export function activateCreatedUser(data) {
    return async () => {
        try {
            return await api.post('/activate-account', data);
        } catch (e) {
            return e.response ? e.response : { message: 'Something went wrong please try again' };
        }
    };
}

export function resetPassword(data) {
    return async () => {
        try {
            return await api.post('/reset-password', data);
        } catch (e) {
            return e.response ? e.response : { message: 'Something went wrong please try again' };
        }
    };
}

export function checkMfaToken(token) {
    return async (dispatch, getState) => {
        try {
            const { mfaSession } = getState().auth;
            const response = await api.post('check-mfa', { token, mfaSession });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('refresh_token', response.data.refreshToken);
            return true;
        } catch (e) {
            return e.response ? e.response : { message: 'Something went wrong please try again' };
        }
    };
}

export function validateMFACode(data) {
    return async () => {
        try {
            const res = await api.post('/validate-mfa-code', data);

            if (!res.data.token.token || !res.data.token.refreshToken) {
                throw new Error(`Strange result from API: ${res.status} : ${JSON.stringify(res.body)}`);
            }

            // Store the resultant token
            localStorage.setItem('token', res.data.token.token);
            localStorage.setItem('refresh_token', res.data.token.refreshToken);
            return res.data;
        } catch (e) {
            console.error('Error validating MFA code', e);
            return false;
        }
    };
}

export function requestResetPassword(email, recaptchaKey) {
    return async () => {
        try {
            return await api.get(`/request-reset-password?email=${encodeURIComponent(email) || ''}&recaptchaKey=${encodeURIComponent(recaptchaKey) || ''}`);
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong please try again' };
        }
    };
}
