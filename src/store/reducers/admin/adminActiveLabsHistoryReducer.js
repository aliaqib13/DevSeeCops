import {
    ADMIN_FETCH_ACTIVE_LAB_HISTORY,
    ADMIN_DESTROY_ACTIVE_LAB,
    ADMIN_RECREATE_ACTIVE_LAB,
    ADMIN_SET_ACTIVE_LAB_DURATION,
    ADMIN_CHANGE_PROGRESS,
    ADMIN_FETCH_ACTIVE_LAB,
} from '../../action-types/admin/activeLabsHistory';

const initialState = {
    labs: {},
    activeLabs: {},
};

export default function (state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
    case ADMIN_FETCH_ACTIVE_LAB_HISTORY:
        return {
            ...state,
            labs: action.payload,
        };
    case ADMIN_FETCH_ACTIVE_LAB: {
        return {
            ...state,
            activeLabs: action.payload,
        };
    }
    case ADMIN_DESTROY_ACTIVE_LAB:
        return {
            ...state,
            labs: {},
        };
    case ADMIN_RECREATE_ACTIVE_LAB: {
        const activeLabs = { ...state };
        return {
            activeLabs,
            labs: {},
        };
    }
    case ADMIN_CHANGE_PROGRESS: {
        const labId = action.payload.id;
        const { progress } = action.payload.lab;

        const data = state.labs.data.map(item => {
            if (item.id === labId) {
                return {
                    ...item,
                    progress,
                };
            }
            return item;
        });

        return {
            ...state,
            labs: {
                ...state.lab,
                data,
            },
        };
    }

    case ADMIN_SET_ACTIVE_LAB_DURATION: {
        const { id, duration } = action.payload;
        const data = state.labs.data.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    duration,
                };
            }
            return item;
        });

        return {
            ...state,
            labs: {
                ...state.labs,
                data,
            },
        };
    }

    default:
        return state;
    }
}
