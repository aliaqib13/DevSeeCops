import { FETCH_FELLOW_GALLERY } from '../../action-types/fellowGallery';

const initialState = {
    fellows: [],
};

export default function fellowGalleryReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    if (action.type === FETCH_FELLOW_GALLERY) {
        return {
            ...state,
            fellows: [...action.payload],
        };
    }
    return state;
}
