import {
    getTokenSubscriptions,
    createSubscriptionCheckoutSession,
    createSubscriptionCustomerPortal,
    getUserSubscriptionsInformation,
    updateSubscription,
} from './tokenSubscriptions';
import api from '../../services/api';
import {
    GET_TOKEN_SUBSCRIPTIONS,
    CREATE_BILLING_AND_SUBSCRIPTIONS_CUSTOMER_PORTAL,
    GET_USER_SUBSCRIPTION_DATA,
} from '../action-types/tokenSubscriptions';

jest.mock('../../services/api');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('src/store/actions/tokenSubscriptions', () => {
    it(".getTokenSubscriptions() calls 'api/v1/subscriptions' and dispatches a GET_TOKEN_SUBSCRIPTIONS action", async () => {
        const dispatch = jest.fn();
        const mockResponseData = {
            data: [{
                name: 'Bronze', tokens: 4, USDPrice: 15, productId: 'prod_test1', subscriptionId: 'price_test1',
            }, {
                name: 'Silver', tokens: 7, USDPrice: 25, productId: 'prod_test2', subscriptionId: 'price_test2',
            }, {
                name: 'Gold', tokens: 12, USDPrice: 40, productId: 'prod_test3', subscriptionId: 'price_test3',
            }],
        };

        api.get.mockResolvedValue(mockResponseData);
        await getTokenSubscriptions()(dispatch);

        expect(api.get).toHaveBeenCalledWith('api/v1/subscriptions');
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: GET_TOKEN_SUBSCRIPTIONS,
            payload: mockResponseData.data,
        });
    });

    it('.getTokenSubscriptions() returns an error when GET fails', async () => {
        const dispatch = jest.fn();
        const mockRejectedData = {
            res: null,
        };

        api.get.mockRejectedValue(mockRejectedData);
        const response = await getTokenSubscriptions()(dispatch);

        expect(api.get).toHaveBeenCalledWith('api/v1/subscriptions');
        expect(response.message).toEqual('Something went wrong while getting token subscriptions, please try again.');
        expect(dispatch).toHaveBeenCalledTimes(0);
    });

    it(".createSubscriptionCheckoutSession() calls '/api/v1/stripe/checkout' and dispatches a CREATE_SUBSCRIPTION_CHECKOUT_SESSION action", async () => {
        const dispatch = jest.fn();
        const data = {
            priceId: 10,
        };
        const mockResponseData = {
            data: {
                checkoutSessionUrl: 'test_url',
            },
        };

        api.post.mockResolvedValue(mockResponseData);
        const response = await createSubscriptionCheckoutSession(data.priceId)(dispatch);

        expect(api.post).toHaveBeenCalledWith('/api/v1/stripe/checkout', data);
        expect(response).toBe(mockResponseData.data.checkoutSessionUrl);
    });

    it('.createSubscriptionCheckoutSession() returns an error when POST fails', async () => {
        const dispatch = jest.fn();
        const data = {
            priceId: 10,
        };
        const mockRejectedData = {
            res: null,
        };

        api.post.mockRejectedValue(mockRejectedData);
        const response = await createSubscriptionCheckoutSession(data.priceId)(dispatch);

        expect(api.post).toHaveBeenCalledWith('/api/v1/stripe/checkout', data);
        expect(response.message).toEqual('Something went wrong while getting checkout session, please try again.');
        expect(dispatch).toHaveBeenCalledTimes(0);
    });

    it(".createSubscriptionCustomerPortal() calls '/api/v1/subscriptions/customer-portal' and dispatches a CREATE_BILLING_AND_SUBSCRIPTIONS_CUSTOMER_PORTAL action", async () => {
        const dispatch = jest.fn();

        const mockResponseData = {
            data: {
                url: 'test_url',
            },
        };

        api.post.mockResolvedValue(mockResponseData);
        await createSubscriptionCustomerPortal()(dispatch);

        expect(api.post).toHaveBeenCalledWith('/api/v1/subscriptions/customer-portal');
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: CREATE_BILLING_AND_SUBSCRIPTIONS_CUSTOMER_PORTAL,
            payload: mockResponseData.data.url,
        });
    });

    it('.createSubscriptionCustomerPortal() returns an error when POST fails', async () => {
        const dispatch = jest.fn();

        const mockRejectedData = {
            res: null,
        };

        api.post.mockRejectedValue(mockRejectedData);
        const response = await createSubscriptionCustomerPortal()(dispatch);

        expect(api.post).toHaveBeenCalledWith('/api/v1/subscriptions/customer-portal');
        expect(response.message).toEqual('Something went wrong while creating customer portal, please try again.');
        expect(dispatch).toHaveBeenCalledTimes(0);
    });
    it(".getUserSubscriptionsInformation() calls '/api/v1/subscriptions/get-user-information' and dispatches a GET_USER_SUBSCRIPTION_DATA action", async () => {
        const dispatch = jest.fn();

        const mockResponseData = {
            data: {
                lastRenewed: 1641207794,
                subscriptionId: 'sub_test',
                subscriptionName: 'test_name',
            },
        };

        api.get.mockResolvedValue(mockResponseData);
        await getUserSubscriptionsInformation()(dispatch);

        expect(api.get).toHaveBeenCalledWith('/api/v1/subscriptions/get-user-information');
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: GET_USER_SUBSCRIPTION_DATA,
            payload: mockResponseData.data,
        });
    });

    it('.getUserSubscriptionsInformation() dispatches a GET_USER_SUBSCRIPTION_DATA action with empty object and return an error when GET fail with `404` error', async () => {
        const dispatch = jest.fn();

        const mockRejectedData = {
            response: {
                status: 404,
                data: {
                    message: 'testError',
                },
            },
        };

        api.get.mockRejectedValue(mockRejectedData);
        const response = await getUserSubscriptionsInformation()(dispatch);
        expect(api.get).toHaveBeenCalledWith('/api/v1/subscriptions/get-user-information');
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: GET_USER_SUBSCRIPTION_DATA,
            payload: {},
        });
        expect(response).toBe('testError');
    });

    it('.getUserSubscriptionsInformation() dispatches a GET_USER_SUBSCRIPTION_DATA action with empty object and return an error when GET fail with `400` error', async () => {
        const dispatch = jest.fn();

        const mockRejectedData = {
            response: {
                status: 400,
                data: {
                    message: 'testError',
                },
            },
        };

        api.get.mockRejectedValue(mockRejectedData);
        const response = await getUserSubscriptionsInformation()(dispatch);
        expect(api.get).toHaveBeenCalledWith('/api/v1/subscriptions/get-user-information');
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: GET_USER_SUBSCRIPTION_DATA,
            payload: {},
        });
        expect(response).toBe('testError');
    });
});
