import React from 'react';
import { shallow } from 'enzyme';
import CreditCard from './index';

describe('CreditCard', () => {
    let component;
    const props = {
        getCCInfo: jest.fn(() => Promise.resolve(true)),
        updateCreditCard: jest.fn(() => Promise.resolve(true)),
        deleteCreditCard: jest.fn(() => Promise.resolve(true)),
        card_info: {
            brand: 'Visa', last4: '4242', exp_month: '2', exp_year: '2022',
        },
    };

    beforeEach(() => {
        component = shallow(<CreditCard {...props} />);
    });

    it('should render CreditCard component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render CreditCard component without cc info successfully', () => {
        const props1 = { ...props };
        props1.card_info = {};
        const component1 = shallow(<CreditCard {...props1} />);
        expect(component1.exists()).toBeTruthy();
    });
});
