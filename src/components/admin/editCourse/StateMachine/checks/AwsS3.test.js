import React from 'react';
import { shallow } from 'enzyme';
import AwsS3 from './AwsS3';

const props = {
    index: 9,
    events: ['VALID_HADOLINT', 'VALID_DOCKERFILE', 'VALID_CLAIR_CONFIG', 'VALID_PIPELINE_BREAK',
        'VALID_TEST', 'VALID_PIPELINE_TEST', 'VALID_TESTING', 'VALID_GITLAB_PIPELINE',
        'VALID_BOOTSTRAP_STATIC', 'VALID_BOOTSTRAP_STATIC_2'],
    containerLength: 10,
    selectedEvents: ['VALID_HADOLINT', 'VALID_DOCKERFILE', 'VALID_CLAIR_CONFIG'],
    item: {
        checkType: '',
        responseContains: [{ value: 'Test' }],
        value: '',
        event: '',
    },
    deleteBlock: jest.fn(() => Promise.resolve(true)),
    giveData: jest.fn(() => Promise.resolve(true)),
    handleEventChange: jest.fn(() => Promise.resolve(true)),
    moveDown: jest.fn(() => Promise.resolve(true)),
    moveUp: jest.fn(() => Promise.resolve(true)),
};

describe('AwsS3', () => {
    let component;
    beforeEach(() => {
        component = shallow(<AwsS3 {...props} />);
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
        expect(headingAndArrows.props.children[0].props.children).toBe('AWS S3');
        expect(headingAndArrows.props.children[1].props.type).toBe('up-circle');
        expect(headingAndArrows.props.children[2]).toBe(false);
        headingAndArrows.props.children[1].props.onClick();
        expect(props.moveUp).toBeCalledTimes(1);
    });

    it('Should render check types dropdown and check data change', () => {
        const filterSelect = component.find('.filterSelect').at(0);
        expect(filterSelect.props().name).toBe('checkType');

        const testValue = 'contents';
        const giveData = jest.spyOn(props, 'giveData');
        expect(component.state().checkType).toBe(props.item.checkType);
        filterSelect.props().onChange(testValue);
        expect(component.state().checkType).toBe(testValue);
        expect(giveData).toHaveBeenCalledTimes(1);
    });

    it('Should render response contains block', () => {
        const stateBlock = component.find('.state-block').at(0);
        const content = stateBlock.props().children[1];
        const responseContainsBlock = content.props.children[3];
        const responseContainsValue = component.find('.medium-text');
        expect(responseContainsBlock.props.children[0].props.children).toBe('Response Contains');
        expect(responseContainsValue.text()).toBe(`Value - ${props.item.responseContains[0].value}`);
    });

    it('Should render events dropdown', () => {
        const filterSelect = component.find('.filterSelect').at(1);
        expect(filterSelect.props().name).toBe('event');
        expect(filterSelect.props().children[1].length).toBe(props.events.length);
    });

    it('Should set new props and thus call UNSAFE_componentWillReceiveProps to update the state', () => {
        const receiveProps = jest.spyOn(AwsS3.prototype, 'UNSAFE_componentWillReceiveProps');
        component.setProps({ event: props.events[0] });
        expect(receiveProps).toHaveBeenCalledTimes(1);
        expect(component.instance().props.event).toBe(props.events[0]);
    });
});
