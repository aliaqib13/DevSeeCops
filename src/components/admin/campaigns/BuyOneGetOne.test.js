import React from 'react';
import { shallow } from 'enzyme';
import BuyOneGetOne from './BuyOneGetOne';

describe('BuyOneGetOne', () => {
    let component;
    const props = {
        config: { emailText: 'test', bellowButtonText: 'test' },
        id: 1,
        updateCampaignConfig: jest.fn(() => Promise.resolve(true)),
        fetchCampaigns: jest.fn(() => Promise.resolve(true)),
        closeModal: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = shallow(<BuyOneGetOne {...props} />);
    });

    it('should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render inputs successfully', () => {
        const emailContent = component.find('.descriptionText');
        const textBellowPurchaseButton = component.find('.small-input');
        expect(emailContent.exists()).toBeTruthy();
        expect(textBellowPurchaseButton.exists()).toBeTruthy();

        expect(component.instance().state.emailText).toBe(props.config.emailText);
        emailContent.props().children[1].props.onChange({ target: { name: 'emailText', value: 'testing emailText' } });
        expect(component.instance().state.emailText).toBe('testing emailText');

        expect(component.instance().state.bellowButtonText).toBe(props.config.bellowButtonText);
        textBellowPurchaseButton.props().children[1].props.onChange({ target: { name: 'bellowButtonText', value: 'testing bellowButtonText' } });
        expect(component.instance().state.bellowButtonText).toBe('testing bellowButtonText');
    });

    it('should render button successfully', () => {
        component.setState({ ...props.config });
        const button = component.find('Button');
        expect(button.props().children).toBe('Update');
        button.props().onClick();
        expect(props.updateCampaignConfig).toHaveBeenCalled();
    });
});
