import api from '../../services/api';
import {
    GET_TOKEN_SUBSCRIPTIONS,
    CREATE_BILLING_AND_SUBSCRIPTIONS_CUSTOMER_PORTAL,
    GET_USER_SUBSCRIPTION_DATA,
} from '../action-types/tokenSubscriptions';

export function getTokenSubscriptions() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/subscriptions');
            dispatch({
                type: GET_TOKEN_SUBSCRIPTIONS,
                payload: res.data,
            });
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong while getting token subscriptions, please try again.' };
        }
    };
}

export function createSubscriptionCheckoutSession(priceId) {
    return async () => {
        try {
            const res = await api.post('/api/v1/stripe/checkout', { priceId });

            const checkoutSessionURL = res.data.checkoutSessionUrl;

            return checkoutSessionURL;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong while getting checkout session, please try again.' };
        }
    };
}

export function createSubscriptionCustomerPortal() {
    return async dispatch => {
        try {
            const res = await api.post('/api/v1/subscriptions/customer-portal');
            dispatch({
                type: CREATE_BILLING_AND_SUBSCRIPTIONS_CUSTOMER_PORTAL,
                payload: res.data.url,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong while creating customer portal, please try again.' };
        }
    };
}

export function getUserSubscriptionsInformation() {
    return async dispatch => {
        try {
            const res = await api.get('/api/v1/subscriptions/get-user-information');
            dispatch({
                type: GET_USER_SUBSCRIPTION_DATA,
                payload: res.data,
            });

            return true;
        } catch (e) {
            if (e.response.status === 400 || e.response.status === 404) {
                dispatch({
                    type: GET_USER_SUBSCRIPTION_DATA,
                    payload: { },
                });
            }
            return e.response ? e.response.data.message : { message: 'Something went wrong while getting user subscription information, please try again.' };
        }
    };
}
