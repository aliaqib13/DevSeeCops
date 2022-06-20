import React from 'react';
import { mount } from 'enzyme';
import Ec2SecurityGroups from './Ec2SecurityGroups';

const props = {
    securityGroupName: '',
    handleInputChange: jest.fn(() => Promise.resolve(true)),
};

describe('Ec2SecurityGroups Component', () => {
    let component;
    beforeEach(() => {
        component = mount(<Ec2SecurityGroups {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should render component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should render `securityGroupName`  Container successfully', () => {
        const securityGroupName = component.find('[data-testid="securityGroupName-container"]');

        expect(securityGroupName).toHaveLength(1);

        // Security Group Name Headings
        const securityGroupHeading = securityGroupName.find('span').at(0);
        expect(securityGroupHeading.text()).toBe('Security Group Name');

        // Security Group Name Input
        const securityGroupInput = securityGroupName.find('Input').at(0);
        expect(securityGroupInput.props().name).toBe('securityGroupName');

        securityGroupInput.props().onChange('test'); // change input

        expect(props.handleInputChange).toHaveBeenCalledTimes(1);
        expect(props.handleInputChange).toHaveBeenCalledWith('test');
    });
});
