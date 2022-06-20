import React from 'react';
import { shallow } from 'enzyme';
import StateMachine from './StateMachine';

const props = {
    saveStateMachine: jest.fn(() => Promise.resolve(true)),
    id: 101,
    data: {
        idle: { event: 'SUBMIT', nextState: 'hadolint_check' },
        finish: {},
        initial: 'idle',
        hadolint_check: { event: 'VALID_HADOLINT', nextState: 'dockerfile_check' },
        dockerfile_check: { event: 'VALID_DOCKERFILE', nextState: 'trustedRegistries_check' },
        clair_config_check: { event: 'VALID_CLAIR_CONFIG', nextState: 'pipeline_break_check' },
        pipeline_break_check: { event: 'VALID_PIPELINE_BREAK', nextState: 'dockerfile_security_fix' },
        dockerfile_security_fix: { event: 'VALID_DOCKERFILE_SECURITY', nextState: 'finish' },
        trustedRegistries_check: { event: 'VALID_TRUSTED_REGISTRIES', nextState: 'clair_config_check' },
    },
};

describe('StateMachine', () => {
    let component; let
        container;
    beforeEach(() => {
        component = shallow(<StateMachine {...props} />);
        container = component.find('.actions-top-block');
    });

    it('Should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should render container successfully', () => {
        expect(container.exists()).toBeTruthy();
    });

    it('Should render add state button successfully', () => {
        const addStateButton = container.childAt(1);
        expect(addStateButton.exists()).toBeTruthy();
        expect(addStateButton.props().children[0]).toBe('Add State');
        expect(addStateButton.props().children[1].props.type).toBe('save');
    });

    it('Should render delete state button and arrows successfully', () => {
        const arrowButtonContent = container.childAt(2);
        const content = arrowButtonContent.childAt(0);
        const arrow = content.childAt(0);
        const button = content.childAt(1);
        expect(arrow.props().children[1].props.type).toBe('down-circle');
        expect(button.props().children[0]).toBe('Delete State');
        expect(button.props().children[1].props.type).toBe('delete');
    });

    it('Should render save states button successfully', () => {
        const saveStateButton = container.props().children[3];
        expect(saveStateButton.props.children[0]).toBe('Save State Machine');
        expect(saveStateButton.props.children[1].props.type).toBe('save');
    });
});
