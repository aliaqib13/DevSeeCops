import React from 'react';
import { shallow } from 'enzyme';
import PromotionCodes from './PromotionCodes';

describe('Promotion Codes', () => {
    let component;
    const coupons = [
        {
            id: 'GYWPgjsG',
            name: 'Test Coupon',
        },
        {
            id: 'PYWPgjdG',
            name: 'Test',
        },
    ];
    const props = {
        fetchCoupons: jest.fn(() => Promise.resolve(coupons)),
    };
    beforeEach(() => {
        component = shallow(<PromotionCodes {...props} />);
    });

    it('should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should  render coupons select box successfully', () => {
        const couponFormItem = component.find('FormItem[label="Choose a Coupon"]');
        expect(couponFormItem.find('Select').exists()).toBeTruthy();
    });

    it('should render DatePicker successfully', () => {
        const dataPickerFormItem = component.find('FormItem[label="Expiration Date"]');
        expect(dataPickerFormItem.find('PickerWrapper').exists()).toBeTruthy();
    });

    it('should render promo code form item successfully', () => {
        const promoCodeInput = component.find('FormItem[label="Promo Code Name"]');
        expect(promoCodeInput.find('Input').exists()).toBeTruthy();
    });

    it('should render users select form item successfully', () => {
        const userSelect = component.find('FormItem[label="Add Existing Users"]');
        expect(userSelect.find('Select').exists()).toBeTruthy();
    });

    it('should render email text ckEditor successfully ', () => {
        const EmailTextArea = component.find('FormItem[label="Email Text"]');
        expect(EmailTextArea.find('TextArea').exists()).toBeTruthy();
    });

    it('should render SCV uploader', () => {
        const CsvUploader = component.find('Upload[accept=".csv"]');
        expect(CsvUploader.exists()).toBeTruthy();
    });

    it('should render test button and send all buttons successfully', () => {
        expect(component.find('.send-test-email').props().children).toEqual('Test');
        expect(component.find('.send-all').at(0).props().children).toEqual('Send All');
        expect(component.find('.send-all').at(1).props().children).toEqual('Send All');
    });

    it('should render test email auto complete input successfully', () => {
        expect(component.find('.search-test-email').exists()).toBeTruthy();
    });
});
