import React from 'react';
import { shallow } from 'enzyme';
import Lambda from './Lambda';

const props = {
    configCheck: '',
    functionName: '',
    handleInputChange: jest.fn(() => Promise.resolve(true)),
    handleConfigCheck: jest.fn(() => Promise.resolve(true)),
};

describe('Lambda Component', () => {
    let component;
    beforeEach(() => {
        component = shallow(<Lambda {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should render component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should render `lambdaConfigCheck`  Container successfully', () => {
        const lambdaConfigCheck = component.find('[data-testid="lambdaConfigCheck-container"]');

        expect(lambdaConfigCheck).toHaveLength(1);

        // lambdaConfigCheck Headings
        const lambdaConfigCheckHeading = lambdaConfigCheck.find('span').at(0);
        expect(lambdaConfigCheckHeading.text()).toBe('Checking config');

        // lambdaConfigCheck DropDown menu and options
        const lambdaConfigCheckSelect = lambdaConfigCheck.find('Select').at(0);
        const lambdaConfigCheckOptions = lambdaConfigCheckSelect.find('Option');

        expect(lambdaConfigCheckSelect.props().name).toBe('configCheck');
        expect(lambdaConfigCheckOptions.at(0).props().children).toBe('Select');
        expect(lambdaConfigCheckOptions.at(1).props().value).toBe('function-code-signing-config');

        lambdaConfigCheckSelect.props().onChange('function-code-signing-config');
        expect(props.handleConfigCheck).toHaveBeenCalledTimes(1);
        expect(props.handleConfigCheck).toHaveBeenCalledWith('function-code-signing-config');
    });

    it('Should render `functionName`  Container successfully', () => {
        const functionName = component.find('[data-testid="functionName-container"]');

        expect(functionName).toHaveLength(1);

        // functionName Headings
        const functionNameHeading = functionName.find('span').at(0);
        expect(functionNameHeading.text()).toBe('Function Name');

        // functionName Input field
        const functionNameInput = functionName.find('Input').at(0);
        expect(functionNameInput.props().name).toBe('functionName');

        functionNameInput.props().onChange('test');
        expect(props.handleInputChange).toHaveBeenCalledTimes(1);
        expect(props.handleInputChange).toHaveBeenCalledWith('test');
    });
});
