import React from 'react';
import { shallow } from 'enzyme';
import Kubernetes from './Kubernetes';

const props = {
    index: 6,
    events: ['VALID_HADOLINT', 'VALID_DOCKERFILE', 'VALID_CLAIR_CONFIG', 'VALID_PIPELINE_BREAK',
        'VALID_TEST', 'VALID_PIPELINE_TEST', 'VALID_TESTING', 'VALID_GITLAB_PIPELINE',
        'VALID_BOOTSTRAP_STATIC', 'VALID_BOOTSTRAP_STATIC_2'],
    containerLength: 10,
    selectedEvents: ['VALID_HADOLINT', 'VALID_DOCKERFILE', 'VALID_CLAIR_CONFIG'],
    item: {
        resources: ['Test'],
        resource: '',
        resourceNames: '',
        logs: '',
        event: 'VALID_PIPELINE_TEST',
    },
    deleteBlock: jest.fn(() => Promise.resolve(true)),
    giveData: jest.fn(() => Promise.resolve(true)),
    handleEventChange: jest.fn(() => Promise.resolve(true)),
    moveDown: jest.fn(() => Promise.resolve(true)),
    moveUp: jest.fn(() => Promise.resolve(true)),
};

describe('Kubernetes', () => {
    let component;
    beforeEach(() => {
        component = shallow(<Kubernetes {...props} />);
    });

    it('Should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should render state block successfully', () => {
        const stateBlock = component.find('.state-block');
        expect(stateBlock.exists()).toBeTruthy();
    });

    it('Should render delete block button successfully', () => {
        const stateBlock = component.find('.state-block').at(0);
        const button = stateBlock.find('Button').at(0);
        expect(button.props().type).toBe('danger');
        expect(button.props().children.props.type).toBe('delete');
        button.props().onClick();
        expect(props.deleteBlock).toBeCalledTimes(1);
    });

    it('Should render heading and arrows', () => {
        const stateBlock = component.find('.state-block').at(0);
        const content = stateBlock.props().children[1];
        const headingAndArrows = content.props.children[1];
        expect(headingAndArrows.props.children[0].props.children).toBe('Kubernetes');
        expect(headingAndArrows.props.children[1].props.type).toBe('up-circle');
        expect(headingAndArrows.props.children[2].props.type).toBe('down-circle');
        headingAndArrows.props.children[2].props.onClick();
        expect(props.moveDown).toBeCalledTimes(1);
        headingAndArrows.props.children[1].props.onClick();
        expect(props.moveUp).toBeCalledTimes(1);
    });

    it('Should render resources', () => {
        const stateBlock = component.find('.state-block').at(0);
        const content = stateBlock.props().children[1];
        const resources = content.props.children[2];
        const resourceItem = component.find('.medium-text');
        expect(resources.props.children[0].props.children).toBe('Resources');
        expect(resourceItem.props().children).toBe(props.item.resources[0]);
    });

    it('Should render resource input', () => {
        const stateBlock = component.find('.state-block').at(0);
        const content = stateBlock.props().children[1];
        const resource = content.props.children[3];
        expect(resource.props.children[0].props.children).toBe('Resource');
        expect(resource.props.children[1].props.name).toBe('resource');
    });

    it('Should render resource name input and check data change', () => {
        const stateBlock = component.find('.state-block').at(0);
        const content = stateBlock.props().children[1];
        const resourceName = content.props.children[4];
        expect(resourceName.props.children[0].props.children).toBe('Resource Name');
        expect(resourceName.props.children[1].props.name).toBe('resourceNames');

        const testValue = 'Test new';
        const giveData = jest.spyOn(props, 'giveData');
        expect(component.state().resourceName).toBe(props.item.resourceName);
        resourceName.props.children[1].props.onChange({ target: { value: testValue, name: 'resourceName' } });
        expect(component.state().resourceName).toBe(testValue);
        expect(giveData).toHaveBeenCalledTimes(1);
    });

    it('Should render logs name input', () => {
        const stateBlock = component.find('.state-block').at(0);
        const content = stateBlock.props().children[1];
        const logs = content.props.children[5];
        expect(logs.props.children[0].props.children).toBe('Logs');
        expect(logs.props.children[1].props.name).toBe('logs');
    });

    it('Should render events dropdown', () => {
        const filterSelect = component.find('.filterSelect');
        expect(filterSelect.props().name).toBe('event');
        expect(filterSelect.props().children[1].length).toBe(props.events.length);
    });

    it('Should set new props and thus call UNSAFE_componentWillReceiveProps to update the state', () => {
        const receiveProps = jest.spyOn(Kubernetes.prototype, 'UNSAFE_componentWillReceiveProps');
        component.setProps({ event: props.events[0] });
        expect(receiveProps).toHaveBeenCalledTimes(1);
        expect(component.instance().props.event).toBe(props.events[0]);
    });
});
