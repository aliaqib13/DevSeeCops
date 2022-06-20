import React from 'react';
import { mount, shallow } from 'enzyme';
import mockedGA from 'react-ga';
import PaymentModal from './PaymentModal';

jest.mock('react-ga', () => ({
    event: jest.fn(),
}));

afterEach(() => {
    jest.clearAllMocks();
});

const props = {
    course: {
        title: 'test-course',
        token_cost: 20,
    },
    tokenBalance: 10,
    user: {
        firstname: 'test',
        lastname: 'example',
    },
    checkCustomer: jest.fn(() => Promise.resolve(true)),
};

describe('PaymentModalTest', () => {
    let component;

    beforeEach(() => {
        component = shallow(<PaymentModal {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // TODO: this test needs to be improved to look for specific elements, not just that "something exists"
    // ATP-2359: Test to be re-enabled when iDeal fixed
    it.skip('should render the elements of payment modal', () => {
        component = shallow(<PaymentModal {...props} />);

        const purchaseBtn = component.find('.open-modal-btn');
        const paymentSelector = component.find('.choose-payment-type').at(0);

        expect(purchaseBtn.props().children).toBe('Purchase now');
        expect(paymentSelector.props().children).toHaveLength(2);
        expect(component).toHaveLength(1);
        expect(component).toBeTruthy();
    });

    it('Should change `openModalLoading` state and call `checkCustomer` method when `purchase now` button is clicked', () => {
        const purchaseBtn = component.find('.open-modal-btn');
        purchaseBtn.simulate('click');

        expect(component.state().openModalLoading).toBe(true);
        expect(props.checkCustomer).toHaveBeenCalledTimes(1);
    });

    // Re-enable as part of ATP-2359
    it.skip('Should render `purchase` modal when the `purchase now` button is clicked', () => {
        const component = mount(<PaymentModal {...props} />);
        component.setState({ openModalLoading: true });

        // payment modal is displayed
        const purchaseModal = component.find('.payment-modal').at(0);
        expect(purchaseModal).toHaveLength(1);
        expect(purchaseModal.props().title).toBe('Select your payment method:');

        // When payment options are clicked
        const paymentOption1 = purchaseModal.props().children.props.children[0].props;
        expect(paymentOption1.cover.props.src).toBe('/img/i-deal-bank-icon.png');
        paymentOption1.onClick();
        expect(component.state().payment_method).toBe('ideal');

        const paymentOption2 = purchaseModal.props().children.props.children[1].props;
        expect(paymentOption2.cover.props.src).toBe('/img/credit-card-icon.png');
        paymentOption2.onClick();
        expect(component.state().payment_method).toBe('stripe');

        // on Cancel `purchase` modal
        purchaseModal.props().onCancel();
        expect(component.state().openModalLoading).toBe(false);
    });
});

describe('PaymentModal Google Analytics', () => {
    let component;

    beforeEach(() => {
        component = shallow(<PaymentModal {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    it('calls ReactGA when clicking purchase now', () => {
        const purchaseBtn = component.find('.open-modal-btn');

        purchaseBtn.simulate('click');

        expect(mockedGA.event).toHaveBeenCalledTimes(1);
        expect(mockedGA.event).toHaveBeenCalledWith({
            action: `Purchase course ${props.course.title}`,
            category: 'purchase_now',
            label: 'Purchase now',
        });
    });
});

describe('calculatePrices() returns an object with price info', () => {
    const props = {
        course: {
            title: 'test-course',
            token_cost: 20,
        },
        tokenBalance: 10,
        user: {
            firstname: 'test',
            lastname: 'example',
        },
    };

    const component = shallow(<PaymentModal {...props} />);
    it('calculatePrices() with USD and 10 percent discount', () => {
        const instance = component.instance();
        const result = instance.calculatePrices('USD', 10);
        expect(result).toEqual({
            coursePrice: 100,
            subTotal: '90.00',
            tokensToDeduct: 10,
            beforeVAT: '40.00',
            total: '48.40',
            valueOfTokensToDeduct: 50,
        });
    });
    it('calculatePrices() with EUR and no discount', () => {
        const instance = component.instance();
        const result = instance.calculatePrices('EUR');
        expect(result).toEqual({
            coursePrice: 80,
            subTotal: 80,
            tokensToDeduct: 10,
            beforeVAT: '40.00',
            total: '48.40',
            valueOfTokensToDeduct: 40,
        });
    });
    it('calculatePrices() with EUR no discount', () => {
        const testProps = {
            ...props,
            course: {
                ...props.course,
                token_cost: 22,
            },
            tokenBalance: 25,
        };
        const testComp = shallow(<PaymentModal {...testProps} />);
        const instance = testComp.instance();
        const result = instance.calculatePrices('EUR');
        expect(result).toEqual({
            coursePrice: 88,
            subTotal: 88,
            tokensToDeduct: 22,
            beforeVAT: '0.00',
            total: '0.00',
            valueOfTokensToDeduct: 88,
        });
    });
    it('calculatePrices() with USD and 20 percent discount', () => {
        const testProps = {
            ...props,
            course: {
                ...props.course,
                token_cost: 3,
            },
            tokenBalance: 2,
        };
        const testComp = shallow(<PaymentModal {...testProps} />);
        const instance = testComp.instance();
        const result = instance.calculatePrices('USD', 20);
        expect(result).toEqual({
            coursePrice: 15,
            subTotal: '12.00',
            tokensToDeduct: 2,
            beforeVAT: '2.00',
            total: '2.42',
            valueOfTokensToDeduct: 10,
        });
    });
    it('calculatePrices() with EUR and 95 percent discount', () => {
        const testProps = {
            ...props,
            course: {
                ...props.course,
                token_cost: 21,
            },
            tokenBalance: 2,
        };
        const testComp = shallow(<PaymentModal {...testProps} />);
        const instance = testComp.instance();
        const result = instance.calculatePrices('EUR', 95);
        expect(result).toEqual({
            coursePrice: 84,
            subTotal: '4.20',
            tokensToDeduct: 1,
            beforeVAT: '0.20',
            total: '0.24',
            valueOfTokensToDeduct: 4,
        });
    });
    it('calculatePrices() throws an error if currency is undefined', () => {
        const testProps = {
            ...props,
            course: {
                ...props.course,
                token_cost: 21,
            },
            tokenBalance: 2,
        };
        const testComp = shallow(<PaymentModal {...testProps} />);
        const instance = testComp.instance();

        expect(() => instance.calculatePrices()).toThrow('currency param is either undefined or not of type string');
    });
    it('calculatePrices() throws an error if currency is not a string', () => {
        const testProps = {
            ...props,
            course: {
                ...props.course,
                token_cost: 21,
            },
            tokenBalance: 2,
        };
        const testComp = shallow(<PaymentModal {...testProps} />);
        const instance = testComp.instance();

        expect(() => instance.calculatePrices(1)).toThrow('currency param is either undefined or not of type string');
    });
});
