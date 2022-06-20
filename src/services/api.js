import axios from 'axios';
import { addAuthToRequest } from './util';
// for multiple requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/`,
    transformRequest: [
        addAuthToRequest,
        data => (typeof data === 'string' ? data : JSON.stringify(data)),
    ],
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
});

api.interceptors.response.use(response => response, error => {
    const originalRequest = error.config;

    if (
        error
        && error.response
        && error.response.status === 401
        && !originalRequest._retry) { // eslint-disable-line no-underscore-dangle
        if (isRefreshing) {
            return new Promise(((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })).then(() => api(originalRequest));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = window.localStorage.getItem('refresh_token');
        return new Promise(((resolve, reject) => {
            api.post('token', { refresh_token: refreshToken })
                .then(({ data }) => {
                    window.localStorage.setItem('token', data.token);
                    window.localStorage.setItem('refresh_token', data.refreshToken);
                    originalRequest.transformRequest = addAuthToRequest;
                    processQueue(null, data.token);
                    resolve(api(originalRequest));
                })
                .catch(err => {
                    if (err.response.status === 500) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('refresh_token');
                        window.location = '/login';
                    }
                    processQueue(err, null);
                    reject(err);
                })
                .then(() => { isRefreshing = false; });
        }));
    }

    return Promise.reject(error);
});

export default api;
