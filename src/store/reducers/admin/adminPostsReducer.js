import {
    ADMIN_ADD_POST,
    ADMIN_FETCH_POSTS,
    ADMIN_REMOVE_POST,
    ADMIN_UPDATE_POST,
} from '../../action-types/admin/posts';

const initialState = {
    posts: [],
};

export default function adminPostsReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
    case ADMIN_FETCH_POSTS:
        return {
            ...action.payload,
            posts: action.payload.data,

        };
    case ADMIN_ADD_POST: {
        const posts = [
            action.payload,
            ...state.posts,
        ];
        return {
            ...state,
            posts,
        };
    }
    case ADMIN_REMOVE_POST: {
        const posts = state.posts.filter(item => item.id !== action.payload);
        return {
            ...state,
            posts,
        };
    }
    case ADMIN_UPDATE_POST: {
        const posts = state.posts.map(item => {
            if (item.id === action.payload.id) {
                return action.payload;
            }
            return item;
        });
        return {
            ...state,
            posts,
        };
    }
    default:
        return state;
    }
}
