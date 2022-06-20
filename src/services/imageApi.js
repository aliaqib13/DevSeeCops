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

const imageApi = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/`,
    transformRequest: [addAuthToRequest],
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

imageApi.interceptors.response.use(response => response, error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
            return new Promise(((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })).then(() => imageApi(originalRequest)).catch(err => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = window.localStorage.getItem('refresh_token');
        return new Promise(((resolve, reject) => {
            imageApi.post('token', JSON.stringify({ refresh_token: refreshToken }), {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            })
                .then(({ data }) => {
                    window.localStorage.setItem('token', data.token);
                    window.localStorage.setItem('refresh_token', data.refreshToken);
                    processQueue(null, data.token);
                    resolve(imageApi(originalRequest));
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

export default imageApi;
