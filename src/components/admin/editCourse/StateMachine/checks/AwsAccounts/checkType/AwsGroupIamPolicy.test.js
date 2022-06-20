import React from 'react';
import { mount } from 'enzyme';
import AwsGroupIamPolicy from './AwsGroupIamPolicy';

const props = {
    groupName: '',
    policyName: '',
    handleInputChange: jest.fn(() => Promise.resolve(true)),
};

describe('AwsGroupIamPolicy component', () => {
    let component;
    beforeEach(() => {
        component = mount(<AwsGroupIamPolicy {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should render component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should render `awsGroupName`  Container successfully', () => {
        const awsGroupName = component.find('[data-testid="groupName-container"]');

        expect(awsGroupName).toHaveLength(1);

        // awsGroupName   Headings
        const awsGroupNameHeading = awsGroupName.find('span').at(0);
        expect(awsGroupNameHeading.text()).toBe('Group Name');

        // awsGroupName Input field
        const awsGroupNameInput = awsGroupName.find('Input').at(0);
        expect(awsGroupNameInput.props().name).toBe('groupName');
        awsGroupNameInput.props().onChange('test1');

        expect(props.handleInputChange).toHaveBeenCalledTimes(1);
        expect(props.handleInputChange).toHaveBeenCalledWith('test1');
    });

    it('Should render `awsGroupPolicyName`  Container successfully', () => {
        const awsGroupPolicyName = component.find('[data-testid="awsGroupPolicyName-container"]');

        expect(awsGroupPolicyName).toHaveLength(1);

        // awsGroupPolicyName  Headings
        const awsGroupPolicyNameHeading = awsGroupPolicyName.find('span').at(0);
        expect(awsGroupPolicyNameHeading.text()).toBe('Policy Name');

        // resourcePath Input field
        const awsGroupPolicyNameInput = awsGroupPolicyName.find('Input').at(0);
        expect(awsGroupPolicyNameInput.props().name).toBe('policyName');
        awsGroupPolicyNameInput.props().onChange('test2');

        expect(props.handleInputChange).toHaveBeenCalledTimes(1);
        expect(props.handleInputChange).toHaveBeenCalledWith('test2');
    });
});
