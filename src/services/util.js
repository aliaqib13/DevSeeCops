/* eslint-disable import/prefer-default-export */
export function addAuthToRequest(data, headers) {
    headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`; // eslint-disable-line no-param-reassign
    return data;
}
