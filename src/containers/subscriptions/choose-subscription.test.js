import React from 'react';
import { shallow, mount } from 'enzyme';
import { message } from 'antd';
import { ChooseSubscription } from './choose-subscription';

jest.mock('antd', () => {
    const antd = jest.requireActual('antd');
    const messageANTD = {
        ...antd.message,
        error: jest.fn(),
    };
    return {
        ...antd,
        message: messageANTD,
    };
});

describe('ChooseSubscription', () => {
    let component;

    const assignMock = jest.fn();

    const props = {
        checkoutSessionURL: 'test_url',
        tokenSubscriptionsInformation: [
            {
                name: 'Bronze', tokens: 4, USDPrice: 15, productId: 'prod_test1', subscriptionId: 'price_test1',
            },
            {
                name: 'Silver', tokens: 7, USDPrice: 25, productId: 'prod_test2', subscriptionId: 'price_test2',
            },
            {
                name: 'Gold', tokens: 12, USDPrice: 40, productId: 'prod_test3', subscriptionId: 'price_test3',
            },
        ],
        createSubscriptionCheckoutSession: jest.fn(() => Promise.resolve(true)),
        getUserSubscriptionsInformation: jest.fn(() => Promise.resolve(true)),
        getTokenSubscriptions: jest.fn(() => Promise.resolve(true)),
        event: { preventDefault: jest.fn() },

    };

    beforeEach(() => {
        component = shallow(<ChooseSubscription {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should render component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should Call `getTokenSubscriptions` methods only when .componentDidMount()', () => {
        // Arrange
        const testProps = {
            checkoutSessionURL: 'test_url',
            tokenSubscriptionsInformation: [
                {
                    name: 'Bronze', tokens: 4, USDPrice: 15, productId: 'prod_test1', subscriptionId: 'price_test1',
                },
            ],
            createSubscriptionCheckoutSession: jest.fn(() => Promise.resolve(true)),
            getUserSubscriptionsInformation: jest.fn(() => Promise.resolve(true)),
            getTokenSubscriptions: jest.fn(() => Promise.resolve(true)),
        };
        const componentTest = shallow(<ChooseSubscription {...testProps} />, { disableLifecycleMethods: true });
        expect(testProps.getTokenSubscriptions).not.toHaveBeenCalled();
        expect(testProps.createSubscriptionCheckoutSession).not.toHaveBeenCalled();

        // Act
        const instance = componentTest.instance();
        instance.componentDidMount();

        // Assert
        expect(testProps.getTokenSubscriptions).toHaveBeenCalled();
    });

    it('.getTokenSubscriptions() calls message.error when promise returns response of false ', async () => {
        // Arrange
        const testProps = {
            ...props,
            getTokenSubscriptions: jest.fn(() => Promise.resolve(false)),

        };
        const componentTest = shallow(<ChooseSubscription {...testProps} />);

        // Act
        const instance = componentTest.instance();
        await instance.componentDidMount();

        // Assert
        expect(testProps.getTokenSubscriptions).toHaveBeenCalled();
        expect(message.error).toHaveBeenCalledWith('Something went wrong while getting subscriptions, please try again.');
    });

    it('Should call `loading` component if `tokenSubscriptionsInformation` is null ', () => {
        // Arrange
        const testProps = {
            ...props,
            tokenSubscriptionsInformation: null,

        };
        const componentTest = mount(<ChooseSubscription {...testProps} />);

        const loadingContainer = componentTest.find('.loading-container');

        // Assert
        expect(loadingContainer).toHaveLength(1);
        expect(componentTest.text()).toBe('Loading...');
    });

    it('Should render title of the page ', () => {
        // Arrange
        const pageTitle = component.find('.page-title').find('Title');

        // Assert
        expect(pageTitle.props().children).toBe('Choose subscription');
    });

    it('Should render number of subscription card equal to the `tokenSubscriptionsInformation` length ', () => {
        // Arrange
        const subscriptionCard = component.find('.subscription-card');

        // Assert
        expect(subscriptionCard).toHaveLength(props.tokenSubscriptionsInformation.length);
    });

    it('Should render subscription elements successfully ', () => {
        // Arrange
        const subscriptionCard = component.find('.subscription-card').at(0); // Bronze Subscription
        const cardTitle = subscriptionCard.find('h2');

        const cardBody = subscriptionCard.find('.card-body');
        const cardTokensAmount = cardBody.find('.tokens-amount');
        const cardTokensCost = cardBody.find('.tokens-cost');
        const selectButton = cardBody.find('.select-button');

        // Assert
        expect(subscriptionCard).toHaveLength(1);
        expect(cardTitle.text()).toBe('Bronze');
        expect(cardTokensAmount.text()).toBe('4 Tokens');
        expect(cardTokensCost.text()).toBe('15 $ / month');
        expect(selectButton.props().children).toBe('Select');
    });

    it('Should call `createSubscriptionCheckoutSession` when user click on `Select` button', () => {
        // Arrange
        delete window.location;
        window.location = { assign: assignMock };
        window.location.assign(props.checkoutSessionURL);
        const preventDefault = jest.fn();

        const cardBody = component.find('.card-body').at(0); // Bronze Subscription
        const selectButton = cardBody.find('.select-button');

        // Act
        selectButton.simulate('click', { preventDefault });

        // Assert
        expect(props.createSubscriptionCheckoutSession).toHaveBeenCalled();
        expect(props.createSubscriptionCheckoutSession)
            .toHaveBeenCalledWith(props.tokenSubscriptionsInformation[0].subscriptionId);  // Bronze Subscription PriceId

        expect(window.location.assign).toHaveBeenCalledTimes(1);
        expect(window.location.assign).toHaveBeenCalledWith(props.checkoutSessionURL);
        // Restore
        assignMock.mockClear();
    });

    it('Should render instruction about subscriptions', () => {
        // Arrange
        const subInfo = component.find('.subscriptions-info-footer').at(0);
        const list = subInfo.find('li');

        // Assert
        expect(list.at(0).text()).toBe('Cancel at any time - You can use any accumulated tokens even after your subscription is cancelled');
        expect(list.at(1).text()).toBe('Billed monthly');
    });

    it('Renders `Current Subscription` if a user has a subscription', () => {
        const testProps = {
            ...props,
            userSubscription: {
                subscriptionName: 'Bronze Monthly',
                subscriptionId: 'sub_bronze_test',
                lastRenewed: 123456,
            },
        };

        const testComponent = shallow(<ChooseSubscription {...testProps} />);
        const subscriptionCard = testComponent.find('.subscription-card').at(0); // Bronze Subscription
        const cardBody = subscriptionCard.find('.card-body');
        const currentText = cardBody.find('.current-text').props().children;

        expect(currentText).toBe('Current Subscription');
    });

    it('handleSubscriptionSelect() calls confirmModal if user has a subscription', () => {
        const testProps = {
            ...props,
            userSubscription: {
                subscriptionName: 'Bronze Monthly',
                subscriptionId: 'sub_bronze_test',
                lastRenewed: 123456,
            },
        };

        const testComponent = shallow(<ChooseSubscription {...testProps} />);

        const instance = testComponent.instance();
        const modalSpy = jest.spyOn(instance, 'confirmModal');

        const preventDefault = jest.fn();

        const cardBody = testComponent.find('.card-body').at(1); // Silver Subscription
        const selectButton = cardBody.find('.select-button');

        // Act
        selectButton.simulate('click', { preventDefault });

        expect(modalSpy).toHaveBeenCalled();
        expect(modalSpy).toHaveBeenCalledWith(props.tokenSubscriptionsInformation[1], 'Bronze');
    });

    it('handleSubscriptionSelect() does not call confirmModal if a user has no subscription yet', () => {
        const instance = component.instance();
        const modalSpy = jest.spyOn(instance, 'confirmModal');

        const preventDefault = jest.fn();

        const cardBody = component.find('.card-body').at(1); // Silver Subscription
        const selectButton = cardBody.find('.select-button');

        // Act
        selectButton.simulate('click', { preventDefault });

        expect(modalSpy).not.toHaveBeenCalled();
    });
});
