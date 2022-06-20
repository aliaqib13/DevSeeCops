import React from 'react';
import { shallow } from 'enzyme';
import AwsAccounts from './AwsAccounts';

const props = {
    index: 3,
    events: ['VALID_HADOLINT', 'VALID_DOCKERFILE', 'VALID_CLAIR_CONFIG', 'VALID_PIPELINE_BREAK',
        'VALID_TEST', 'VALID_PIPELINE_TEST', 'VALID_TESTING', 'VALID_GITLAB_PIPELINE',
        'VALID_BOOTSTRAP_STATIC', 'VALID_BOOTSTRAP_STATIC_2'],
    containerLength: 10,
    selectedEvents: ['VALID_HADOLINT', 'VALID_DOCKERFILE', 'VALID_CLAIR_CONFIG'],
    item: {
        event: '',
        platform: 'aws-accounts',
        checkType: '',
        userName: '',
        policyName: '',
        contentMissing: [],
        contentExists: [],
        valueMissing: '',
        valuePresent: '',
        securityGroupName: '',
        configCheck: '',
        bucketPrefixRegex: '',
        functionName: '',
        resourcePath: '',
        stage: '',
        method: '',
        groupName: '',
    },
    deleteBlock: jest.fn(() => Promise.resolve(true)),
    giveData: jest.fn(() => Promise.resolve(true)),
    handleEventChange: jest.fn(() => Promise.resolve(true)),
    moveDown: jest.fn(() => Promise.resolve(true)),
    moveUp: jest.fn(() => Promise.resolve(true)),

};

describe('AwsAccounts check component', () => {
    let component;
    beforeEach(() => {
        component = shallow(<AwsAccounts {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should render component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should render state-block container successfully', () => {
        const stateBlock = component.find('.state-block');
        expect(stateBlock).toHaveLength(1);
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
        expect(headingAndArrows.props.children[0].props.children).toBe('AWS Accounts');
        expect(headingAndArrows.props.children[1].props.type).toBe('up-circle');
        expect(headingAndArrows.props.children[2].props.type).toBe('down-circle');
        headingAndArrows.props.children[2].props.onClick();
        expect(props.moveDown).toBeCalledTimes(1);
        headingAndArrows.props.children[1].props.onClick();
        expect(props.moveUp).toBeCalledTimes(1);
    });

    it('Should render `AWS Account` title', () => {
        const awsAccountsTitle = component.find('.config-block').find('span');
        expect(awsAccountsTitle.text()).toBe('AWS Accounts');
    });

    it('Should render check types dropdown and update state when selected', () => {
        // find check type title
        const checkTypeTitle = component.find('.inputSpan').at(0);
        expect(checkTypeTitle.text()).toBe('Check Type');

        // check type dropdown menu
        const selectCheckType = component.find('.filterSelect').at(0);
        expect(selectCheckType.props().name).toBe('checkType');

        // Check type dropdown menu options
        const checkTypeOptions = selectCheckType.find('Option');
        expect(checkTypeOptions.at(0).props().children).toBe('Select');
        expect(checkTypeOptions.at(0).props().selected).toBe(true);
        expect(checkTypeOptions.at(1).props().value).toBe('aws-user-iam-policy');
        expect(checkTypeOptions.at(1).props().children).toBe('aws-user-iam-policy');
        expect(checkTypeOptions.at(2).props().value).toBe('guard-duty');
        expect(checkTypeOptions.at(2).props().children).toBe('guard-duty');
        expect(checkTypeOptions.at(3).props().value).toBe('ec2-security-groups');
        expect(checkTypeOptions.at(3).props().children).toBe('ec2-security-groups');
        expect(checkTypeOptions.at(4).props().value).toBe('s3-bucket');
        expect(checkTypeOptions.at(4).props().children).toBe('s3-bucket');
        expect(checkTypeOptions.at(5).props().value).toBe('lambda');
        expect(checkTypeOptions.at(5).props().children).toBe('lambda');
        expect(checkTypeOptions.at(6).props().value).toBe('api-gateway');
        expect(checkTypeOptions.at(6).props().value).toBe('api-gateway');
        expect(checkTypeOptions.at(7).props().value).toBe('aws-group-iam-policy');
        expect(checkTypeOptions.at(7).props().children).toBe('aws-group-iam-policy');

        // Selected option will call .handleCheckTypeChange() and update state
        const instance = component.instance();
        const selectSpy = jest.spyOn(instance, 'handleCheckTypeChange');

        expect(component.state().checkType).toBe(''); // initial state is empty string
        selectCheckType.props().onChange('guard-duty'); // will trigger .handleCheckTypeChange() and update state
        expect(selectSpy).toHaveBeenCalledTimes(1);
        expect(selectSpy).toHaveBeenCalledWith('guard-duty');
        expect(component.state().checkType).toBe('guard-duty'); // expected state to be 'guard-duty'

        selectCheckType.props().onChange('lambda'); // Select Again for assurance of drop down
        expect(component.state().checkType).toBe('lambda'); // expected state to be 'lambda'
    });

    it('Should render `AwsUserIamPolicy` component when checkType `aws-user-iam-policy` selected ', () => {
        // check type dropdown menu
        const selectCheckType = component.find('.filterSelect').at(0);

        selectCheckType.props().onChange('aws-user-iam-policy');
        const awsUserIamPolicy = component.find('AwsUserIamPolicy');
        expect(awsUserIamPolicy).toHaveLength(1);
    });

    it('Should render `Ec2SecurityGroups` component when checkType `ec2-security-groups` selected ', () => {
        // check type dropdown menu
        const selectCheckType = component.find('.filterSelect').at(0);

        selectCheckType.props().onChange('ec2-security-groups');
        const ec2SecurityGroups = component.find('Ec2SecurityGroups');
        expect(ec2SecurityGroups).toHaveLength(1);
    });

    it('Should render `S3Bucket` component when checkType `s3-bucket` selected ', () => {
        // check type dropdown menu
        const selectCheckType = component.find('.filterSelect').at(0);

        selectCheckType.props().onChange('s3-bucket');
        const s3Bucket = component.find('S3Bucket');
        expect(s3Bucket).toHaveLength(1);
    });

    it('Should render `Lambda` component when checkType `lambda` selected ', () => {
        // check type dropdown menu
        const selectCheckType = component.find('.filterSelect').at(0);

        selectCheckType.props().onChange('lambda');
        const lambda = component.find('Lambda');
        expect(lambda).toHaveLength(1);
    });

    it('Should render `ApiGateway` component when checkType `api-gateway` selected ', () => {
        // check type dropdown menu
        const selectCheckType = component.find('.filterSelect').at(0);

        selectCheckType.props().onChange('api-gateway');
        const apiGateway = component.find('ApiGateway');
        expect(apiGateway).toHaveLength(1);
    });

    it('Should render `AwsGroupIamPolicy` component when checkType `aws-group-iam-policy` selected ', () => {
        // check type dropdown menu
        const selectCheckType = component.find('.filterSelect').at(0);

        selectCheckType.props().onChange('aws-group-iam-policy');
        const awsGroupIamPolicy = component.find('AwsGroupIamPolicy');
        expect(awsGroupIamPolicy).toHaveLength(1);
    });

    it('Should render `Contains Content` blocks and add values', () => {
        const blockContainer = component.find('.small-input');

        // Contains Content heading
        const containContentTitle = blockContainer.find('h4').at(0);
        const containContentSubTitle = blockContainer.find('.inputSpan').at(1);
        expect(containContentTitle.text()).toBe('Contains Content');
        expect(containContentSubTitle.text()).toBe('Value');

        // `Add Present Content` Button
        const addPresentContentBtn = component.find('.left-space-for-button').at(0);
        expect(addPresentContentBtn.props().children[0]).toBe('Add Present Content');

        // `Add Present Content` Button will add values if clicked
        const instance = component.instance();

        const addPresentValueInput = component.find('[name="valuePresent"]');
        expect(component.state().valuePresent).toBe(''); // initial state is empty string
        addPresentValueInput.props().onChange({ target: { name: 'valuePresent', value: 'testPresent' } });
        expect(component.state().valuePresent).toBe('testPresent'); // expect state to be `test` after update
        addPresentContentBtn.props().onClick(); // value will be added to `contentExists`
        expect(component.state().contentExists[0].value).toBe('testPresent');
        expect(component.state().valuePresent).toBe(''); // valuePresent will restore to be empty

        // Remove value button is present and delete value from `contentExists` state
        const removeSpy = jest.spyOn(instance, 'removeContent');
        expect(component.state().contentExists).toHaveLength(1);
        const removeBtn = component.find('[data-testid="remove-exist-value"]');
        removeBtn.props().onClick();
        expect(removeSpy).toHaveBeenCalledTimes(1);
        expect(component.state().contentExists).toHaveLength(0);
    });

    it('Should render `Missing content` blocks and add values', () => {
        const blockContainer = component.find('.small-input');

        // Container Content & Missing Content heading
        const missingContentTitle = blockContainer.find('h4').at(1);
        const missingContentSubTitle = blockContainer.find('.inputSpan').at(1);
        expect(missingContentTitle.text()).toBe('Missing Content');
        expect(missingContentSubTitle.text()).toBe('Value');

        // `Add Missing Content` Button
        const addMissingContentBtn = component.find('.left-space-for-button').at(1);
        expect(addMissingContentBtn.props().children[0]).toBe('Add Missing Content');

        // `Add Missing Content` Button will add values if clicked
        const instance = component.instance();

        const addMissingValueInput = component.find('[name="valueMissing"]');
        expect(component.state().valueMissing).toBe(''); // initial state is empty string
        addMissingValueInput.props().onChange({ target: { name: 'valueMissing', value: 'testMissing' } });
        expect(component.state().valueMissing).toBe('testMissing'); // expect state to be `test` after update
        addMissingContentBtn.props().onClick(); // value will be added to `contentMissing`
        expect(component.state().contentMissing[0].value).toBe('testMissing');
        expect(component.state().valueMissing).toBe(''); // valueMissing will restore to be empty

        // Remove value button is present and delete value from `contentExists` state
        const removeSpy = jest.spyOn(instance, 'removeContent');
        expect(component.state().contentMissing).toHaveLength(1);
        const removeBtn = component.find('[data-testid="remove-missing-value"]');
        removeBtn.props().onClick();
        expect(removeSpy).toHaveBeenCalledTimes(1);
        expect(component.state().contentMissing).toHaveLength(0);
    });

    it('Should render `Event` DropDown and call `.handleEventChange()` when option selected', () => {
        const eventContainer = component.find('[data-testid="event-dropdown"]');

        // Event DropDown heading
        const eventHeading = eventContainer.find('span');
        expect(eventHeading.text()).toBe('Event');

        // Select Options are equal to The Events Provided by props
        const selectOptions = eventContainer.find('.filterSelect').at(0);
        expect(selectOptions.props().name).toBe('event');
        expect(selectOptions.props().children[1]).toHaveLength(props.events.length);

        // Selected option will call .handleEventChange()
        selectOptions.props().onChange('VALID_HADOLINT');
        expect(props.handleEventChange).toHaveBeenCalledTimes(1);
    });

    it('Should set new props and thus call UNSAFE_componentWillReceiveProps to update the state', () => {
        const receiveProps = jest.spyOn(AwsAccounts.prototype, 'UNSAFE_componentWillReceiveProps');
        component.setProps({ event: props.events[0] });
        expect(receiveProps).toHaveBeenCalledTimes(1);
        expect(component.instance().props.event).toBe(props.events[0]);
    });

    it('Should call .handleConfigCheck() and update `configCheck` state', () => {
        const instance = component.instance();
        const handleSpy = jest.spyOn(instance, 'handleConfigCheck');

        expect(component.state().configCheck).toBe(''); // initial state is empty string
        component.instance().handleConfigCheck('test');
        expect(component.state().configCheck).toBe('test');
        expect(handleSpy).toHaveBeenCalledTimes(1);
    });

    it('Should call .handleApiGatewayMethod() and update `method` state', () => {
        const instance = component.instance();
        const handleSpy = jest.spyOn(instance, 'handleApiGatewayMethod');

        expect(component.state().method).toBe(''); // initial state is empty string
        component.instance().handleApiGatewayMethod('test');
        expect(component.state().method).toBe('test');
        expect(handleSpy).toHaveBeenCalledTimes(1);
    });
});
