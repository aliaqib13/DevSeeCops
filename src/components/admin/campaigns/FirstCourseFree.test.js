import React from 'react';
import { shallow } from 'enzyme';
import FirstCourseFree from './FirstCourseFree';

describe('FirstCourseFree', () => {
    let component;
    const props = {
        config: { emailText: 'test', aboveButtonText: 'test' },
        id: 1,
        updateCampaignConfig: jest.fn(() => Promise.resolve(true)),
        fetchCampaigns: jest.fn(() => Promise.resolve(true)),
        closeModal: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = shallow(<FirstCourseFree {...props} />);
    });

    it('should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render inputs successfully', () => {
        const emailContent = component.find('.descriptionText');
        const aboveButtonText = component.find('.small-input');
        expect(emailContent.exists()).toBeTruthy();
        expect(aboveButtonText.exists()).toBeTruthy();

        expect(component.instance().state.emailText).toBe(props.config.emailText);
        emailContent.props().children[1].props.onChange({ target: { name: 'emailText', value: 'testing emailText' } });
        expect(component.instance().state.emailText).toBe('testing emailText');

        expect(component.instance().state.aboveButtonText).toBe(props.config.aboveButtonText);
        aboveButtonText.props().children[1].props.onChange({ target: { name: 'aboveButtonText', value: 'testing aboveButtonText' } });
        expect(component.instance().state.aboveButtonText).toBe('testing aboveButtonText');
    });

    it('should render button successfully', () => {
        component.setState({ ...props.config });
        const button = component.find('Button');
        expect(button.props().children).toBe('Update');
        button.props().onClick();
        expect(props.updateCampaignConfig).toHaveBeenCalled();
    });
});
