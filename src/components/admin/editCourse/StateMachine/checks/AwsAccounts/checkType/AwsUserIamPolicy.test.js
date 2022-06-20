import React from 'react';
import { mount } from 'enzyme';
import AwsUserIamPolicy from './AwsUserIamPolicy';

const props = {
    userName: '',
    policyName: '',
    handleInputChange: jest.fn(() => Promise.resolve(true)),
};

describe('AwsUserIamPolicy component', () => {
    let component;
    beforeEach(() => {
        component = mount(<AwsUserIamPolicy {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should render component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should render `userName`  Container successfully', () => {
        const awsUserName = component.find('[data-testid="username-container"]');

        expect(awsUserName).toHaveLength(1);

        // User name Headings
        const awsUserNameHeading = awsUserName.find('span').at(0);
        expect(awsUserNameHeading.text()).toBe('User name');

        // userName Input
        const awsUserNameInput = awsUserName.find('Input').at(0);
        expect(awsUserNameInput.props().name).toBe('userName');

        // Should call `.handleInputChange()` when input field change
        awsUserNameInput.props().onChange('test'); // change input

        expect(props.handleInputChange).toHaveBeenCalledTimes(1);
        expect(props.handleInputChange).toHaveBeenCalledWith('test');
    });

    it('Should render `policyName` Container successfully', () => {
        const awsPolicyName = component.find('[data-testid="policyName-container"]');

        expect(awsPolicyName).toHaveLength(1);

        // Policy Name Headings
        const awsPolicyNameHeading = awsPolicyName.find('span').at(0);
        expect(awsPolicyNameHeading.text()).toBe('Policy name');

        // policyName Input
        const awsPolicyNameInput = awsPolicyName.find('Input').at(0);
        expect(awsPolicyNameInput.props().name).toBe('policyName');

        // Should call `.handleInputChange()` when input field change

        awsPolicyNameInput.props().onChange('test2'); // change input
        expect(props.handleInputChange).toHaveBeenCalledTimes(1);
        expect(props.handleInputChange).toHaveBeenCalledWith('test2');
    });
});
