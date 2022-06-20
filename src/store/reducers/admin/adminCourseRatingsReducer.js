import {
    FETCH_RATINGS, ADD_RATING, UPDATE_RATING, DELETE_RATING,
} from '../../action-types/admin/courseRatings';

const initialState = {
    ratings: [],
};

export default function adminCourseRatingsReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    let ratings = [];
    switch (action.type) {
    case FETCH_RATINGS:
        return {
            ratings: action.payload,
        };
    case ADD_RATING:
        ratings = [...state.ratings];
        ratings.push(action.payload);
        return {
            ratings,
        };
    case DELETE_RATING:
        ratings = state.ratings.filter(item => item.id !== action.payload);
        return {
            ratings,
        };
    case UPDATE_RATING:
        ratings = state.ratings.map(item => {
            if (item.id === action.payload.id) {
                return action.payload;
            }
            return item;
        });

        return {
            ratings,
        };
    default:
        return state;
    }
}
