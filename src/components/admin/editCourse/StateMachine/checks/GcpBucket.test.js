import React from 'react';
import { shallow } from 'enzyme';
import GcpBucket from './GcpBucket';

const props = {
    index: 3,
    events: ['VALID_HADOLINT', 'VALID_DOCKERFILE', 'VALID_CLAIR_CONFIG', 'VALID_PIPELINE_BREAK',
        'VALID_TEST', 'VALID_PIPELINE_TEST', 'VALID_TESTING', 'VALID_GITLAB_PIPELINE',
        'VALID_BOOTSTRAP_STATIC', 'VALID_BOOTSTRAP_STATIC_2'],
    containerLength: 10,
    selectedEvents: ['VALID_HADOLINT', 'VALID_DOCKERFILE', 'VALID_CLAIR_CONFIG'],
    item: {
        bucketId: 1,
        checkType: 'files',
        contentMissing: [{ value: 'Test' }],
        contentExists: [{ value: 'Test' }],
        valueMissing: '',
        valuePresent: '',
        event: 'VALID_BOOTSTRAP_STATIC_2',
    },
    deleteBlock: jest.fn(() => Promise.resolve(true)),
    giveData: jest.fn(() => Promise.resolve(true)),
    handleEventChange: jest.fn(() => Promise.resolve(true)),
    moveDown: jest.fn(() => Promise.resolve(true)),
    moveUp: jest.fn(() => Promise.resolve(true)),
};

describe('GcpBucket', () => {
    let component;
    beforeEach(() => {
        component = shallow(<GcpBucket {...props} />);
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
        expect(headingAndArrows.props.children[0].props.children).toBe('GCP Bucket');
        expect(headingAndArrows.props.children[1].props.type).toBe('up-circle');
        expect(headingAndArrows.props.children[2].props.type).toBe('down-circle');
        headingAndArrows.props.children[2].props.onClick();
        expect(props.moveDown).toBeCalledTimes(1);
        headingAndArrows.props.children[1].props.onClick();
        expect(props.moveUp).toBeCalledTimes(1);
    });

    it('Should render bucket id input and change its value correctly', () => {
        const stateBlock = component.find('.state-block').at(0);
        const content = stateBlock.props().children[1];
        const bucketId = content.props.children[2];

        expect(component.state().bucketId).toBe(1);
        bucketId.props.children[1].props.onChange({ target: { name: 'bucketId', value: -2 } });
        expect(component.state().bucketId).toBe(1);

        bucketId.props.children[1].props.onChange({ target: { name: 'bucketId', value: 2 } });
        expect(component.state().bucketId).toBe(2);

        expect(bucketId.props.children[0].props.children).toBe('Bucket ID');
        expect(bucketId.props.children[1].props.name).toBe('bucketId');
    });

    it('Should render content exists and content missing blocks', () => {
        const stateBlock = component.find('.state-block').at(0);
        const content = stateBlock.props().children[1];
        const presentMissingContent = content.props.children[4];
        const contentExistValue = component.find('.medium-text').at(0).children[1];
        const contentMissingValue = component.find('.medium-text').at(1).children[1];
        expect(presentMissingContent.props.children[0].props.children).toBe('Contains Content');
        expect(contentExistValue).toBe(props.item.contentExists.value);
        expect(presentMissingContent.props.children[3].props.children).toBe('Missing Content');
        expect(contentMissingValue).toBe(props.item.contentMissing.value);
    });

    it('Should render check types dropdown', () => {
        const filterSelect = component.find('.filterSelect').at(0);
        expect(filterSelect.props().name).toBe('checkType');
        expect(filterSelect.props().children[0].props.value).toBe('files');
        expect(filterSelect.props().children[1].props.value).toBe('iam');

        expect(component.state().checkType).toBe('files');
        filterSelect.props().onChange('iam');
        expect(component.state().checkType).toBe('iam');
    });

    it('Should render events dropdown', () => {
        const filterSelect = component.find('.filterSelect').at(1);
        expect(filterSelect.props().name).toBe('event');
        expect(filterSelect.props().children[1].length).toBe(props.events.length);
    });

    it('Should set new props and thus call UNSAFE_componentWillReceiveProps to update the state', () => {
        const receiveProps = jest.spyOn(GcpBucket.prototype, 'UNSAFE_componentWillReceiveProps');
        component.setProps({ event: props.events[0] });
        expect(receiveProps).toHaveBeenCalledTimes(1);
        expect(component.instance().props.event).toBe(props.events[0]);
    });
});
