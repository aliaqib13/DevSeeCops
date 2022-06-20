import {
    ADMIN_FETCH_SETTINGS,
    ADMIN_CREATE_FAQ,
    ADMIN_UPDATE_FAQ,
    ADMIN_DELETE_FAQ,
    ADMIN_UPDATE_RIGHT_SIDE_BAR_CONTENT,
    ADMIN_UPDATE_CTO_SETTINGS,
} from '../../action-types/admin/settings';

const initialState = {
    faq: [],
    homePage: [],
    CEO: null,
    fellows: [],
};

export default function adminSettingsReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
    case ADMIN_FETCH_SETTINGS:
        return {
            ...action.payload,
        };
    case ADMIN_CREATE_FAQ: {
        const faq = [...state.faq, action.payload];
        return {
            ...state,
            faq,
        };
    }

    case ADMIN_UPDATE_FAQ: {
        const faq = state.faq.map(item => {
            if (item.id === action.payload.id) {
                return action.payload;
            }
            return item;
        });

        return {
            state,
            faq,
        };
    }
    case ADMIN_DELETE_FAQ: {
        const faq = state.faq.filter(item => item.id !== action.payload);
        return {
            ...state,
            faq,
        };
    }

    case ADMIN_UPDATE_RIGHT_SIDE_BAR_CONTENT:
        return {
            ...state,
            homePage: action.payload,
        };

    case ADMIN_UPDATE_CTO_SETTINGS:
        return {
            ...state,
            CEO: {
                ...action.payload,
                hash: new Date().getTime(),
            },
        };
    default:
        return state;
    }
}
