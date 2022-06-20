import React from 'react';
import { mount } from 'enzyme';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { IdealBankForm } from './IdealBankForm';

describe('Ideal Bank Form Test', () => {
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
        };

    beforeEach(() => {
        elements = mount(<Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_KEY)}><IdealBankForm {...props} /></Elements>);
        component = elements.find('IdealBankForm');
    });

    it('should render the elements', () => {
        expect(elements).toHaveLength(1);
    });

    it('should render the IdealBankForm', () => {
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

    it('should render IdealBankElement component', () => {
        const idealBankElement = component.find('IdealBankElement');
        expect(idealBankElement).toHaveLength(1);
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

    it('should render Ideal Banks choices ', () => {
        const idealBank = component.find('form').find('label').at(2);
        expect(idealBank.first().text()).toBe('iDEAL Bank');
    });

    it('should render Button component', () => {
        const buttonComponent = component.find('Button');
        expect(buttonComponent).toHaveLength(1);
        expect(buttonComponent.text()).toEqual('Continue');
    });
});
