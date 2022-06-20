import { FETCH_IMAGES } from '../action-types/stepsImages';
import { UPLOAD_IMAGE, REMOVE_IMAGE } from '../action-types/admin/stepsImages';

const initialState = {
    images: [],
};

export default function stepsImagesReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    let images = [];
    switch (action.type) {
    case FETCH_IMAGES:
        return {
            images: action.payload,
        };
    case UPLOAD_IMAGE:
        return {
            images: [...state.images, action.payload],
        };
    case REMOVE_IMAGE:
        images = [...state.images];
        images.splice(images.findIndex(item => item.id === action.payload), 1);
        return {
            images,
        };
    default:
        return state;
    }
}
