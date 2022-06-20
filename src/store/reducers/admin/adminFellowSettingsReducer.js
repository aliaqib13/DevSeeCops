import {
    ADMIN_FETCH_FELLOW_SETTINGS,
    ADMIN_UPDATE_FELLOW,
    ADMIN_DELETE_FELLOW,
    ADMIN_CREATE_FELLOW,
    ADMIN_CREATE_LAB_BLOCK,
    ADMIN_DELETE_LAB_BLOCK,
    ADMIN_UPDATE_LAB_BLOCK,
    ADMIN_CREATE_COURSE_SCENARIO,
    ADMIN_UPDATE_COURSE_SCENARIO,
    ADMIN_DELETE_COURSE_SCENARIO,
} from '../../action-types/admin/fellow-settings';

const initialState = {
    fellows: [],
    labBlocks: [],
    courseScenarios: [],
};

export default function adminFellowSettingsReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
    case ADMIN_FETCH_FELLOW_SETTINGS:
        return {
            ...action.payload,
        };
    case ADMIN_CREATE_FELLOW: {
        const fellows = [...state.fellows];
        fellows.unshift(action.payload);
        return {
            ...state,
            fellows,
        };
    }
    case ADMIN_UPDATE_FELLOW: {
        const allFellows = [...state.fellows];
        allFellows[allFellows.findIndex(item => item.id === action.payload.id)] = action.payload;
        return {
            ...state,
            fellows: [...allFellows],
        };
    }
    case ADMIN_DELETE_FELLOW: {
        const fellows = state.fellows.filter(item => item.id !== action.payload);
        return {
            ...state,
            fellows,
        };
    }
    case ADMIN_CREATE_LAB_BLOCK: {
        const labBlocks = [...state.labBlocks];
        labBlocks.unshift(action.payload);
        return {
            ...state,
            labBlocks,
        };
    }

    case ADMIN_UPDATE_LAB_BLOCK: {
        const allLabBlocks = [...state.labBlocks];
        allLabBlocks[allLabBlocks.findIndex(item => item.id === action.payload.id)] = action.payload;
        return {
            ...state,
            labBlocks: [...allLabBlocks],
        };
    }

    case ADMIN_DELETE_LAB_BLOCK: {
        const labBlocks = state.labBlocks.filter(item => item.id !== action.payload);
        return {
            ...state,
            labBlocks,
        };
    }

    case ADMIN_CREATE_COURSE_SCENARIO: {
        const courseScenarios = [...state.courseScenarios];
        courseScenarios.unshift(action.payload);
        return {
            ...state,
            courseScenarios,
        };
    }

    case ADMIN_UPDATE_COURSE_SCENARIO: {
        const allCourseScenarios = [...state.courseScenarios];
        allCourseScenarios[allCourseScenarios.findIndex(item => item.id === action.payload.id)] = action.payload;
        return {
            ...state,
            courseScenarios: [...allCourseScenarios],
        };
    }

    case ADMIN_DELETE_COURSE_SCENARIO: {
        const courseScenarios = state.courseScenarios.filter(item => item.id !== action.payload);
        return {
            ...state,
            courseScenarios,
        };
    }

    default:
        return state;
    }
}
