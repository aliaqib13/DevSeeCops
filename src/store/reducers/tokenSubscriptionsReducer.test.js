import {
    GET_TOKEN_SUBSCRIPTIONS,
    CREATE_BILLING_AND_SUBSCRIPTIONS_CUSTOMER_PORTAL,
} from '../action-types/tokenSubscriptions';

import tokenSubscriptionsReducer from './tokenSubscriptionsReducer';

describe('tokenSubscriptionsReducer', () => {
    const initialState = {
        tokenSubscriptionsInformation: null,
        subscriptionCustomerPortalUrl: null,
    };

    it('GET_TOKEN_SUBSCRIPTIONS should set initialState when state is undefined', () => {
        const action = {
            type: GET_TOKEN_SUBSCRIPTIONS,
            payload: initialState.tokenSubscriptionsInformation,
        };
        const resultState = tokenSubscriptionsReducer(undefined, action);
        expect(resultState).toEqual(initialState);
    });

    it('GET_TOKEN_SUBSCRIPTIONS should return the unaltered state if action is not recognized', () => {
        const action = {};
        const state = { tokenSubscriptionsInformation: [{ name: 'bronze' }] };
        const resultantState = tokenSubscriptionsReducer(state, action);

        expect(resultantState).toEqual(state);
    });

    it('GET_TOKEN_SUBSCRIPTIONS should set the state from the payload ', () => {
        const action = {
            type: GET_TOKEN_SUBSCRIPTIONS,
            payload: [{
                name: 'Bronze', tokens: 4, USDPrice: 15, productId: 'prod_test1', subscriptionId: 'price_test1',
            }, {
                name: 'Silver', tokens: 7, USDPrice: 25, productId: 'prod_test2', subscriptionId: 'price_test2',
            }, {
                name: 'Gold', tokens: 12, USDPrice: 40, productId: 'prod_test3', subscriptionId: 'price_test3',
            }],
        };

        const resultantState = tokenSubscriptionsReducer(initialState, action);

        expect(resultantState.tokenSubscriptionsInformation).toStrictEqual(action.payload);
    });

    it('CREATE_BILLING_AND_SUBSCRIPTIONS_CUSTOMER_PORTAL should set initialState when state is undefined', () => {
        const action = {
            type: CREATE_BILLING_AND_SUBSCRIPTIONS_CUSTOMER_PORTAL,
            payload: initialState.subscriptionCustomerPortalUrl,
        };
        const resultState = tokenSubscriptionsReducer(undefined, action);

        expect(resultState).toEqual(initialState);
    });

    it('CREATE_BILLING_AND_SUBSCRIPTIONS_CUSTOMER_PORTAL should return the unaltered state if action is not recognized', () => {
        const action = {};
        const state = { subscriptionCustomerPortalUrl: 'test' };
        const resultantState = tokenSubscriptionsReducer(state, action);

        expect(resultantState).toEqual(state);
    });

    it('CREATE_BILLING_AND_SUBSCRIPTIONS_CUSTOMER_PORTAL should set the state from the payload ', () => {
        const action = {
            type: CREATE_BILLING_AND_SUBSCRIPTIONS_CUSTOMER_PORTAL,
            payload: 'test_url',
        };

        const resultantState = tokenSubscriptionsReducer(initialState, action);

        expect(resultantState.subscriptionCustomerPortalUrl).toStrictEqual(action.payload);
    });
});
