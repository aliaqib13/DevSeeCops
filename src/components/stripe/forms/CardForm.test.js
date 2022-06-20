import React from 'react';
import { mount } from 'enzyme';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { CardForm } from './CardForm';

const mockStripe = () => ({
    createToken: jest.fn(),
    createSource: jest.fn(),
    createPaymentMethod: jest.fn(),
    confirmCardPayment: jest.fn(),
    confirmCardSetup: jest.fn(),
    paymentRequest: jest.fn(),
    _registerWrapper: jest.fn(),
});

jest.mock('@stripe/react-stripe-js', () => {
    const stripe = jest.requireActual('@stripe/react-stripe-js');

    return ({
        ...stripe,
        useStripe: () => mockStripe,
    });
});

describe('CardForm Test', () => {
    let component; let elements; const
        props = {
            invalidPromo: false,
            sourceData: {
                amount: 110,
                metadata: {
                    course_id: 1,
                },
            },
            couponName: '',
            onChangeCouponName: jest.fn(),
            history: { push: jest.fn() },
            children: 'AdjustedCost Window',
            course: {
                title: 'test course',
            },
            payCourse: jest.fn(() => Promise.resolve(true)),
            onChangeCouponName: jest.fn(couponName => couponName),
            history: { push: jest.fn() },
        };

    beforeEach(() => {
        elements = mount(<Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_KEY)}><CardForm {...props} /></Elements>);
        component = elements.find('CardForm');
    });

    it('should render the elements', () => {
        expect(elements).toHaveLength(1);
    });

    it('should render the container', () => {
        const container = component.find('.payment-form');
        expect(container).toHaveLength(1);
    });

    it('should render the form', () => {
        const form = component.find('form');
        expect(form).toHaveLength(1);
    });

    it('should render "Amount (including 21% VAT)$" text successfully ', () => {
        const form = component.find('form');

        expect(form.find('label').first().text()).toContain('Amount (including 21% VAT)');
    });

    it('should render the adjusted cost for the payment modal', () => {
        const adjustedCost = component.find('.amount-include-vat');

        expect(adjustedCost.props().children[1]).toBe(props.children);
    });

    it('should render the coupon input field', () => {
        const couponDiv = component.find('form').find('label').at(1);
        expect(couponDiv.first().text()).toBe('Coupon');
    });

    it('should render StripeCardDetails title ', () => {
        const cardElement = component.find('form').find('label').at(2);
        expect(cardElement.first().text()).toBe('Card details');
    });

    it('should render stripeCardElement component', () => {
        const cardElement = component.find('CardElement');
        expect(cardElement).toHaveLength(1);
    });

    it('should render recent used credit Card details', () => {
        const testProps = {
            ...props,
            credit_card: {
                brand: 'Visa', exp_year: 2024, exp_month: 4, last4: '4242',
            },
        };
        const elements = mount(<Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_KEY)}><CardForm {...testProps} /></Elements>);
        const component = elements.find('CardForm');

        const cardElement = component.find('.card-details');

        expect(cardElement).toHaveLength(1);

        const issuer = cardElement.find('Text').at(0);
        expect(issuer.first().text()).toBe('Issuer: ');

        const issuerBrand = cardElement.find('Text').at(1);
        expect(issuerBrand.first().text()).toBe(testProps.credit_card.brand);

        const creditCardNumber = cardElement.find('Text').at(2);
        expect(creditCardNumber.first().text()).toBe('Credit Card Number: ');

        const creditCardNumberData = cardElement.find('Text').at(3);
        expect(creditCardNumberData.first().text()).toBe(`****${testProps.credit_card.last4}`);

        const expDateTitle = cardElement.find('Text').at(4);
        expect(expDateTitle.first().text()).toBe('Expiration Date: ');

        const expDate = cardElement.find('Text').at(5);
        expect(expDate.first().text()).toBe(`${testProps.credit_card.exp_month}/${testProps.credit_card.exp_year}`);
    });

    it('should render Button component', () => {
        const buttonComponent = component.find('Button');
        expect(buttonComponent).toHaveLength(1);
        expect(buttonComponent.text()).toEqual('Continue');
    });

    it('should payWithCreditCard() successfully work', () => {
        const testProps = {
            calculatedPrice: {
                calculatedPriceUsd: '110',
            },
            amountTokensToDeductFromWallet: 22,
            totalRemainingAmount: {
                totalRemainingAmountInUsd: 0,
                totalRemainingAmountInEuro: 0,
            },
            verifyCoupon: jest.fn(() => Promise.resolve(true)),
            payCourse: jest.fn(() => Promise.resolve(true)),
            history: { push: jest.fn() },
            credit_card: {
                brand: 'Visa', exp_year: 2024, exp_month: 4, last4: '4242',
            },
            payWithoutCreditCard: jest.fn(() => Promise.resolve(true)),
            getCurrentTokenBalance: jest.fn(() => Promise.resolve(true)),
        };
        const renderedElements = mount(
            <Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_KEY)}>
                <CardForm {...testProps} />
            </Elements>,
        );
        const renderedComponent = renderedElements.find('CardForm');
        const confirmButton = renderedComponent.find('Button');
        confirmButton.simulate('click');
        setTimeout(() => {
            expect(renderedComponent.props().getCurrentTokenBalance).toHaveBeenCalledTimes(1);
        }, 500);
    });
});
