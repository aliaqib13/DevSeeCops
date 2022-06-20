import React from 'react';
import { shallow } from 'enzyme';
import GitlabDynamicConfigs from './GitlabDynamicConfigs';

const props = {
    index: 2,
    events: ['VALID_HADOLINT', 'VALID_DOCKERFILE', 'VALID_CLAIR_CONFIG', 'VALID_PIPELINE_BREAK',
        'VALID_TEST', 'VALID_PIPELINE_TEST', 'VALID_TESTING', 'VALID_GITLAB_PIPELINE',
        'VALID_BOOTSTRAP_STATIC', 'VALID_BOOTSTRAP_STATIC_2'],
    containerLength: 10,
    selectedEvents: ['VALID_HADOLINT', 'VALID_DOCKERFILE', 'VALID_CLAIR_CONFIG'],
    item: {
        file: '',
        contentExistBlock: [{
            contentExists: [],
            valuePresent: '',
        }],
        event: 'VALID_DOCKERFILE',
    },
    deleteBlock: jest.fn(() => Promise.resolve(true)),
    giveData: jest.fn(() => Promise.resolve(true)),
    handleEventChange: jest.fn(() => Promise.resolve(true)),
    moveDown: jest.fn(() => Promise.resolve(true)),
    moveUp: jest.fn(() => Promise.resolve(true)),
};

describe('GitlabDynamicConfigs', () => {
    let component;
    beforeEach(() => {
        component = shallow(<GitlabDynamicConfigs {...props} />);
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
        expect(headingAndArrows.props.children[0].props.children).toBe('GitLab Dynamic Configs');
        expect(headingAndArrows.props.children[1].props.type).toBe('up-circle');
        expect(headingAndArrows.props.children[2].props.type).toBe('down-circle');
        headingAndArrows.props.children[2].props.onClick();
        expect(props.moveDown).toBeCalledTimes(1);
        headingAndArrows.props.children[1].props.onClick();
        expect(props.moveUp).toBeCalledTimes(1);
    });

    it('Should render file input and check data change', () => {
        const stateBlock = component.find('.state-block').at(0);
        const content = stateBlock.props().children[1];
        const file = content.props.children[4];
        expect(file.props.children[0].props.children).toBe('File');
        expect(file.props.children[1].props.name).toBe('file');

        const testValue = 'Test';
        const giveData = jest.spyOn(props, 'giveData');
        expect(component.state().file).toBe(props.item.file);
        file.props.children[1].props.onChange({ target: { value: testValue, name: 'file' } });
        expect(component.state().file).toBe(testValue);
        expect(giveData).toHaveBeenCalledTimes(1);
    });

    it('Should render events dropdown', () => {
        const filterSelect = component.find('.filterSelect');
        expect(filterSelect.props().name).toBe('event');
        expect(filterSelect.props().children[1].length).toBe(props.events.length);
    });

    it('Should set new props and thus call UNSAFE_componentWillReceiveProps to update the state', () => {
        const receiveProps = jest.spyOn(GitlabDynamicConfigs.prototype, 'UNSAFE_componentWillReceiveProps');
        component.setProps({ event: props.events[0] });
        expect(receiveProps).toHaveBeenCalledTimes(1);
        expect(component.instance().props.event).toBe(props.events[0]);
    });
});
