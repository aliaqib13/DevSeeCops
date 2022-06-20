import {
    GET_CAMPAIGN,
} from '../action-types/campaign';

const initialState = {};

export default function campaignReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    // NOTE: Use this switch when the cases become more, otherwise without 3 cases sonar fails
    // switch (action.type) {
    // case GET_CAMPAIGN:
    //     return {
    //         ...state,
    //         campaign: action.payload,
    //     };
    // default:
    //     return state;
    // }

    if (action.type === GET_CAMPAIGN) {
        return {
            ...state,
            [action.campaign_id]: action.payload,
        };
    }

    // If we're not processing the action, return this state unaltered.
    return state;
}
