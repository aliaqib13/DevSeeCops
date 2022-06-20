import {
    GET_TOKEN_SUBSCRIPTIONS,
    CREATE_BILLING_AND_SUBSCRIPTIONS_CUSTOMER_PORTAL,
} from '../action-types/tokenSubscriptions';

const initialState = {
    tokenSubscriptionsInformation: null,
    subscriptionCustomerPortalUrl: null,
};

export default function tokenSubscriptionsReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
    case GET_TOKEN_SUBSCRIPTIONS: {
        return {
            ...state,
            tokenSubscriptionsInformation: action.payload,
        };
    }
    case CREATE_BILLING_AND_SUBSCRIPTIONS_CUSTOMER_PORTAL: {
        return {
            ...state,
            subscriptionCustomerPortalUrl: action.payload,
        };
    }

    default:
        return state;
    }
}
