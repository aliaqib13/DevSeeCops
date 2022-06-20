import {
    GET_CAMPAIGNS,
} from '../../action-types/admin/campaign';

const initialState = {
    campaigns: [],
};

export default function adminCampaignReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    // NOTE: Use this switch when the cases become more, otherwise without 3 cases sonar fails
    // switch (action.type) {
    // case GET_CAMPAIGNS:
    //     return {
    //         ...state,
    //         campaigns: action.payload,
    //     };
    // default:
    //     return state;
    // }
    if (action.type === GET_CAMPAIGNS) {
        return {
            ...state,
            campaigns: action.payload,
        };
    }
    return state;
}
