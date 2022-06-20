import { FETCH_HOME_PAGE_DATA } from '../action-types/homePage';

const initialState = {
    rightSidebar: [],
    courses: null,
};

export default function HomePageReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    if (action.type === FETCH_HOME_PAGE_DATA) {
        return {
            ...action.payload,
        };
    }
    return state;
}
