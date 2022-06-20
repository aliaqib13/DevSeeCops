import React from 'react';
import { shallow } from 'enzyme';
import ReferralScheme from './ReferralScheme';

describe('ReferralScheme', () => {
    let component;
    const props = {
        config: {
            referrerDiscount: 0,
            newCustomerDiscount: 0,
            referrerEmailText: 'test',
            newCustomerEmailText: 'test',
        },
        id: 2,
        updateCampaignConfig: jest.fn(() => Promise.resolve(true)),
        fetchCampaigns: jest.fn(() => Promise.resolve(true)),
        closeModal: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = shallow(<ReferralScheme {...props} />);
    });

    it('should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render inputs successfully', () => {
        const referrerDiscount = component.find('.referrer-discount');
        const newCustomerDiscount = component.find('.new-customer-discount');
        expect(referrerDiscount.exists()).toBeTruthy();
        expect(newCustomerDiscount.exists()).toBeTruthy();
    });
    it('the discount toggles set the value to 100 if on', () => {
        const referrerDiscount = component.find('.referrer-discount');
        const newCustomerDiscount = component.find('.new-customer-discount');
        referrerDiscount.props().children[1].props.children.props.onChange(true, 'referrerDiscount');
        newCustomerDiscount.props().children[1].props.children.props.onChange(true, 'newCustomerDiscount');
        expect(component.instance().state.referrerDiscount).toBe(100);
        expect(component.instance().state.newCustomerDiscount).toBe(100);
    });

    it('the discount toggles set the value to 0 if off', () => {
        const referrerDiscount = component.find('.referrer-discount');
        const newCustomerDiscount = component.find('.new-customer-discount');
        referrerDiscount.props().children[1].props.children.props.onChange(false, 'referrerDiscount');
        newCustomerDiscount.props().children[1].props.children.props.onChange(false, 'newCustomerDiscount');
        expect(component.instance().state.referrerDiscount).toBe(0);
        expect(component.instance().state.newCustomerDiscount).toBe(0);
    });

    it('should get data CKEditor successfully', () => {
        const getData = jest.fn();
        const ckRef = component.find('.referrerEmailContent');
        const ckNewCustomer = component.find('.newCustomerEmailContent');
        ckRef.props().children[1].props.onChange({ editor: { getData } });
        ckNewCustomer.props().children[1].props.onChange({ editor: { getData } });
        expect(getData).toBeCalledTimes(2);
    });

    it('should render button successfully', () => {
        component.setState({ ...props.config });
        const button = component.find('Button');
        expect(button.props().children).toBe('Update');
        button.props().onClick();
        expect(props.updateCampaignConfig).toHaveBeenCalled();
    });
});
