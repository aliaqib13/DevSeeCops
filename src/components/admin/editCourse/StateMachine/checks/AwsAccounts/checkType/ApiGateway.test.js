import React from 'react';
import { shallow } from 'enzyme';
import ApiGateway from './ApiGateway';

const props = {
    configCheck: '',
    method: '',
    stage: '',
    resourcePath: '',
    handleInputChange: jest.fn(() => Promise.resolve(true)),
    handleConfigCheck: jest.fn(() => Promise.resolve(true)),
    handleApiGatewayMethod: jest.fn(() => Promise.resolve(true)),
};

describe('ApiGateway Component', () => {
    let component;
    beforeEach(() => {
        component = shallow(<ApiGateway {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should render component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should render `apiGatewayConfigCheck`  Container successfully', () => {
        const apiGatewayConfigCheck = component.find('[data-testid="apiGatewayConfigCheck-container"]');

        expect(apiGatewayConfigCheck).toHaveLength(1);

        // apiGatewayConfigCheck Headings
        const apiGatewayConfigCheckHeading = apiGatewayConfigCheck.find('span').at(0);
        expect(apiGatewayConfigCheckHeading.text()).toBe('Checking config');

        // apiGatewayConfigCheck DropDown menu and options
        const apiGatewayConfigCheckSelect = apiGatewayConfigCheck.find('Select').at(0);
        const apiGatewayConfigCheckOptions = apiGatewayConfigCheckSelect.find('Option');

        expect(apiGatewayConfigCheckSelect.props().name).toBe('configCheck');
        expect(apiGatewayConfigCheckOptions.at(0).props().children).toBe('Select');
        expect(apiGatewayConfigCheckOptions.at(1).props().value).toBe('api-response-data');

        apiGatewayConfigCheckSelect.props().onChange('api-response-data');
        expect(props.handleConfigCheck).toHaveBeenCalledTimes(1);
        expect(props.handleConfigCheck).toHaveBeenCalledWith('api-response-data');
    });
    it('Should render `method`  Container successfully', () => {
        const method = component.find('[data-testid="method-container"]');

        expect(method).toHaveLength(1);

        // method Headings

        const methodHeading = method.find('span').at(0);
        expect(methodHeading.text()).toBe('Method');

        // method DropDown menu and options
        const methodSelect = method.find('Select').at(0);
        const methodOptions = methodSelect.find('Option');

        expect(methodSelect.props().name).toBe('method');
        expect(methodOptions.at(0).props().children).toBe('Select');
        expect(methodOptions.at(1).props().value).toBe('GET');

        methodSelect.props().onChange('GET'); // will and update state
        expect(props.handleApiGatewayMethod).toHaveBeenCalledTimes(1);
        expect(props.handleApiGatewayMethod).toHaveBeenCalledWith('GET');
    });
    it('Should render `stage`  Container successfully', () => {
        const stage = component.find('[data-testid="stage-container"]');

        expect(stage).toHaveLength(1);

        // stage Headings

        const stageHeading = stage.find('span').at(0);
        expect(stageHeading.text()).toBe('Stage');

        // stage Input field
        const stageInput = stage.find('Input').at(0);
        expect(stageInput.props().name).toBe('stage');

        stageInput.props().onChange('test1');
        expect(props.handleInputChange).toHaveBeenCalledTimes(1);
        expect(props.handleInputChange).toHaveBeenCalledWith('test1');
    });
    it('Should render `resourcePath`  Container successfully', () => {
        const resourcePath = component.find('[data-testid="resourcePath-container"]');

        expect(resourcePath).toHaveLength(1);

        // resourcePath Headings

        const resourcePathHeading = resourcePath.find('span').at(0);
        expect(resourcePathHeading.text()).toBe('Resource Path');

        // resourcePath Input field
        const resourcePathInput = resourcePath.find('Input').at(0);
        expect(resourcePathInput.props().name).toBe('resourcePath');
        resourcePathInput.props().onChange('test2');
        expect(props.handleInputChange).toHaveBeenCalledTimes(1);
        expect(props.handleInputChange).toHaveBeenCalledWith('test2');
    });
});
