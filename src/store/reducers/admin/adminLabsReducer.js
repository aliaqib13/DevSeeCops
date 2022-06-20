import {
    ADMIN_GET_LAB_STEPS_START,
    ADMIN_GET_LAB_STEPS_ERROR,
    ADMIN_GET_LAB_STEPS_SUCCESS,
    ADMIN_UPDATE_LAB_STEPS,
    ADMIN_FETCH_FAVORITE_COMPONENTS,
    ADMIN_ADD_FAVORITE_COMPONENT,
    ADMIN_ADD_FAVORITE_STEP,
    ADMIN_FETCH_FAVORITE_STEP,
    ADMIN_DELETE_FAVORITE_STEP,
    ADMIN_GET_LABS,
    ADMIN_GET_THEORY_LABS,
    ADMIN_UPDATE_THEORY_LABS,

} from '../../action-types/admin/labs';

const initialState = {
    data: {},
    loading: false,
    loadingDestroyLab: false,
    loadingRecreateLab: false,
    loadingGetLabSteps: false,
    labSteps: null,
    favoriteComponents: [],
    favoriteSteps: [],
    labs: [],
    error: null,
    theoryLabs: null,
};

export default function adminLabsReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
    // get lab steps
    case ADMIN_GET_LAB_STEPS_START:
        return {
            favoriteComponents: state.favoriteComponents,
            favoriteSteps: state.favoriteSteps,
            loadingGetLabSteps: true,
        };
    case ADMIN_GET_LAB_STEPS_SUCCESS:
        return {
            favoriteComponents: state.favoriteComponents,
            favoriteSteps: state.favoriteSteps,
            loadingGetLabSteps: false,
            labSteps: action.payload,
        };
    case ADMIN_GET_LAB_STEPS_ERROR:
        return {
            loadingGetLabSteps: false,
            error: action.error,
        };
    case ADMIN_UPDATE_LAB_STEPS:
        return {
            ...state,
            labSteps: action.payload,
        };
    case ADMIN_FETCH_FAVORITE_COMPONENTS:
        return {
            ...state,
            favoriteComponents: action.payload,
        };
    case ADMIN_ADD_FAVORITE_COMPONENT: {
        const { favoriteComponents } = { ...state };
        favoriteComponents.unshift(action.payload);
        return {
            ...state,
            favoriteComponents,
        };
    }
    case ADMIN_ADD_FAVORITE_STEP: {
        const { favoriteSteps } = { ...state };
        favoriteSteps.unshift(action.payload);
        return {
            ...state,
            favoriteSteps,
        };
    }
    case ADMIN_FETCH_FAVORITE_STEP:
        return {
            ...state,
            favoriteSteps: action.payload,
        };
    case ADMIN_DELETE_FAVORITE_STEP: {
        const favoriteSteps = state.favoriteSteps.filter(item => item.id !== action.payload);
        return {
            ...state,
            favoriteSteps,
        };
    }
    case ADMIN_GET_LABS:
        return {
            ...state,
            labs: action.payload,
        };
    case ADMIN_GET_THEORY_LABS:
        return {
            ...state,
            theoryLabs: action.payload,
        };
    case ADMIN_UPDATE_THEORY_LABS: {
        const { theoryLabs } = state;
        theoryLabs.content = action.payload;
        return {
            ...state,
            theoryLabs,
        };
    }
    default:
        return state;
    }
}
