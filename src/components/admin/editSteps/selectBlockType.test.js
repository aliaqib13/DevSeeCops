import React from 'react';
import { shallow } from 'enzyme';
import SelectBlockType from './selectBlockType';

describe('SelectBlockType', () => {
    let component;
    const props = {
        storeSavedComponent: jest.fn(() => Promise.resolve(true)),
        isTemplate: 1,
        is_compulsory: 1,
        selected: 'SingleText',
        index: 0,
        item: {
            step_id: 1,
            type: 'SingleText',
            content: { text: ['We will be using the spring-cloud-vault library (https://github.com/spring-cloud/spring-cloud-vault) to interface with Vault from our Spring-based Java web application. We need to add the following dependencies to build.gradle. Don\'t commit your changes yet!:'] },
            uuid: '8d99b34d-a5b4-4965-92a8-6599b066721a',
            order_number: 1,
            saveTextContent: true,
        },
        onChangeContentType: jest.fn(),
    };
    const state = {
        types: [
            {
                title: 'Information Box',
                value: 'InformationBox',
                saveTextContent: true,
            },
            {
                title: 'Text Box',
                value: 'SingleText',
                saveTextContent: true,
            },
            {
                title: 'Image',
                value: 'Image',
            },
        ],
    };

    beforeEach(() => {
        component = shallow(<SelectBlockType {...props} />);
        component.setState({ ...state });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should render button for storing components as saved components', () => {
        const button = component.find('Button.favorite');
        expect(button.exists()).toBeTruthy();
    });

    it('Should open modal when clicked on "make favorite" icon', () => {
        const icon = component.find('Button.favorite');
        const modal = component.find('Modal');
        expect(modal.props().visible).toBe(false);
        icon.simulate('click');
        expect(component.find('Modal').props().visible).toBeTruthy();
    });

    it('Modal for storing components as saved components should has an input field', () => {
        const modal = component.find('Modal');
        const input = modal.find('Input');
        expect(input.exists()).toBeTruthy();
    });

    it('Should set titleRequiredError to true if modal submitted with empty input', () => {
        const modal = component.find('Modal');
        modal.props().onOk();
        expect(component.state().titleRequiredError).toBeTruthy();
    });

    it('Should call storeSavedComponent method when the modal is submitted with not empty input', () => {
        component.setState({ title: 'test title' });
        const modal = component.find('Modal');
        modal.props().onOk();
        expect(props.storeSavedComponent).toBeCalledTimes(1);
    });

    it('should render push button', () => {
        const positionButtonsBlock = component.find('.position-buttons');
        const pushComponentChanges = positionButtonsBlock.find('.push-changes');
        expect(pushComponentChanges.props().icon).toBe('issues-close');
    });

    it('Calls props.onChangeContentType with \'warnContent\' if current component can hold text', async () => {
        const instance = component.instance();
        await instance.checkSaveContent('SingleText');

        expect(props.onChangeContentType).toHaveBeenCalledWith('SingleText', 0, 'warnContent');
    });

    it('Calls props.onChangeContentType without \'warnContent\' if current component can not hold text', async () => {
        const newProps = {
            selected: 'Image',
            index: 0,
            item: {
                step_id: 1,
                type: 'Image',
                uuid: '8d99b34d-a5b4-4965-92a8-6599b066721a',
                order_number: 1,
            },
            onChangeContentType: jest.fn(),
        };
        const testComponent = shallow(<SelectBlockType {...newProps} />);
        testComponent.setState({ ...state });
        const instance = testComponent.instance();
        await instance.checkSaveContent('Image');

        expect(newProps.onChangeContentType).toHaveBeenCalledWith('Image', 0);
    });
});
