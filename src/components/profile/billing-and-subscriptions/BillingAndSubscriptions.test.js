import React from 'react';
import { shallow, mount } from 'enzyme';
import { message } from 'antd';
import BillingAndSubscriptions from './BillingAndSubscriptions';

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

describe('BillingAndSubscriptions', () => {
    let component;

    const props = {
        preferences: {
            content: 'test',
            userCourseTags: ['test1', 'test2'],
            credit_card: {
                brand: 'Visa', last4: '4242', exp_month: '2', exp_year: '2022',
            },
        },
        subscriptionCustomerPortalUrl: 'testUrl',
        updateCreditCard: jest.fn(() => Promise.resolve(true)),
        createSubscriptionCustomerPortal: jest.fn(() => Promise.resolve(true)),
        deleteCreditCard: jest.fn(() => Promise.resolve(true)),
        getCCInfo: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = mount(<BillingAndSubscriptions {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should Call `createSubscriptionCustomerPortal` methods only when .componentDidMount()', () => {
        // Arrange
        const testProps = {
            ...props,
            createSubscriptionCustomerPortal: jest.fn(() => Promise.resolve(true)),

        };

        const componentTest = shallow(<BillingAndSubscriptions {...testProps} />, { disableLifecycleMethods: true });
        expect(testProps.createSubscriptionCustomerPortal).not.toHaveBeenCalled();

        // Act
        const instance = componentTest.instance();
        instance.componentDidMount();

        // Assert
        expect(testProps.createSubscriptionCustomerPortal).toHaveBeenCalled();
    });

    it('.createSubscriptionCustomerPortal() calls message.error when promise returns response of false ', async () => {
        // Arrange
        const testProps = {
            ...props,
            createSubscriptionCustomerPortal: jest.fn(() => Promise.resolve(false)),

        };
        const componentTest = shallow(<BillingAndSubscriptions {...testProps} />);

        // Act
        const instance = componentTest.instance();
        await instance.componentDidMount();

        // Assert
        expect(testProps.createSubscriptionCustomerPortal).toHaveBeenCalled();
        expect(message.error).toHaveBeenCalledWith('Something went wrong while viewing the billing and subscription information, please try again.');
    });

    it('Should render BillingAndSubscriptions component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should render CreditCard component successfully', () => {
        const creditCardComponent = component.find('.credit-card-component');
        expect(creditCardComponent).toHaveLength(1);
    });

    it('Should render `view-customer-portal-button` container successfully', () => {
        const viewCustomerPortalBtn = component.find('.view-customer-portal-button');
        expect(viewCustomerPortalBtn).toHaveLength(1);
    });

    it('Should render `view-button` button successfully', () => {
        const viewButton = component.find('.view-button').at(0);
        expect(viewButton.text()).toBe('View my billing and subscription information');
    });

    it('Should call `.handleViewButton()` method when `view-button` is clicked', () => {
        // Arrange
        const assignMock = jest.fn();
        window.location.assign = assignMock;

        const spy = jest.spyOn(component.instance(), 'handleViewButton');

        const viewButton = component.find('.view-button').at(0);

        // Act
        viewButton.simulate('click');

        // Assert
        expect(spy).toHaveBeenCalled();

        expect(window.location.assign).toHaveBeenCalled();
        expect(window.location.assign).toHaveBeenCalledWith(props.subscriptionCustomerPortalUrl);

        // Restore
        assignMock.mockClear();
    });

    it('Should `.handleViewButton()` throws error if the `subscriptionCustomerPortalUrl` blank', () => {
        // Arrange
        const testProps = {
            ...props,
            createSubscriptionCustomerPortal: jest.fn(() => Promise.resolve(true)),
            subscriptionCustomerPortalUrl: '',
        };

        const componentTest = shallow(<BillingAndSubscriptions {...testProps} />);
        const viewButton = componentTest.find('.view-button').at(0);

        // Act
        viewButton.simulate('click');

        expect(message.error).toHaveBeenCalledWith('Customer portal not available. Try refreshing the page');
    });
});
