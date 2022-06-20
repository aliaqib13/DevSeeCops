import api from '../../../services/api';
import {
    ADMIN_ADD_POST, ADMIN_FETCH_POSTS, ADMIN_REMOVE_POST, ADMIN_UPDATE_POST,
} from '../../action-types/admin/posts';

export function createPost(data) {
    return async dispatch => {
        try {
            const res = await api.post('api/v1/admin/add-post', data);
            dispatch({
                type: ADMIN_ADD_POST,
                payload: res.data,
            });
            return true;
        } catch (e) {

        }
    };
}

export function fetchPosts(page = 1) {
    return async dispatch => {
        try {
            const res = await api.get(`api/v1/admin/fetch-posts?page=${page}`);
            dispatch({
                type: ADMIN_FETCH_POSTS,
                payload: res.data,
            });
            return true;
        } catch (e) {

        }
    };
}

export function removePost(id) {
    return async dispatch => {
        try {
            await api.delete(`api/v1/admin/remove-post/${id}`);
            dispatch({
                type: ADMIN_REMOVE_POST,
                payload: id,
            });
            return true;
        } catch (e) {

        }
    };
}

export function updatePost(id, data) {
    return async dispatch => {
        try {
            const res = await api.put(`api/v1/admin/update-post/${id}`, data);
            dispatch({
                type: ADMIN_UPDATE_POST,
                payload: res.data,
            });
            return true;
        } catch (e) {

        }
    };
}

export function searchFellow(keyword) {
    return async () => {
        try {
            const res = await api.get(`api/v1/admin/search-fellow?keyword=${keyword}`);
            return res.data;
        } catch (e) {
            return false;
        }
    };
}

export function fetchPostTags() {
    return async () => {
        try {
            const res = await api.get('api/v1/admin/get-post-tags');
            return res.data;
        } catch (e) {
            return false;
        }
    };
}

export function updateTags(data) {
    return async () => {
        try {
            return await api.post('api/v1/admin/update-post-tags', data);
        } catch (e) {
            return false;
        }
    };
}

export function searchPostTag(keyword) {
    return async () => {
        try {
            const res = await api.get(`api/v1/admin/search-post-tags/?keyword=${keyword}`);
            return res.data;
        } catch (e) {
            return false;
        }
    };
}
