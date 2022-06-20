import React, { Component } from 'react';
import {
    Input, Button, Icon, Select,
} from 'antd';
import AwsUserIamPolicy from './checkType/AwsUserIamPolicy';
import Ec2SecurityGroups from './checkType/Ec2SecurityGroups';
import S3Bucket from './checkType/S3Bucket';
import Lambda from './checkType/Lambda';
import ApiGateway from './checkType/ApiGateway';
import AwsGroupIamPolicy from './checkType/AwsGroupIamPolicy';

const { Option } = Select;

const CHECK_TYPE_OPTIONS = ['aws-user-iam-policy', 'guard-duty', 'ec2-security-groups', 's3-bucket', 'lambda', 'api-gateway', 'aws-group-iam-policy'];

class AwsAccounts extends Component {
    constructor(props) {
        super(props);
        const {
            event,
            checkType,
            userName,
            policyName,
            securityGroupName,
            contentMissing,
            contentExists,
            valueMissing,
            valuePresent,
            configCheck,
            bucketPrefixRegex,
            functionName,
            resourcePath,
            stage,
            method,
            groupName,
            platform,
        } = props.item;
        this.state = {
            platform,
            checkType,
            contentMissing,
            contentExists,
            valueMissing,
            valuePresent,
            event,
            userName,
            policyName,
            securityGroupName,
            configCheck,
            bucketPrefixRegex,
            functionName,
            resourcePath,
            stage,
            method,
            groupName,
        };
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({ ...props.item });
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value }, this.giveData);
    };

    addPresentContent = () => {
        const { contentExists, valuePresent } = this.state;
        if (valuePresent) {
            contentExists.push({ value: valuePresent });
            this.setState({ contentExists, valuePresent: '' }, this.giveData);
        }
    };

    addMissingContent = () => {
        const { contentMissing, valueMissing } = this.state;
        if (valueMissing) {
            contentMissing.push({ value: valueMissing });
            this.setState({ contentMissing, valueMissing: '' }, this.giveData);
        }
    };

    removeContent = (innerIndex, type) => {
        const content = this.state[type];
        content.splice(innerIndex, 1);
        this.setState({ [type]: content }, this.giveData);
    };

    checkDisabled = event => {
        const { selectedEvents } = this.props;
        return selectedEvents.includes(event);
    };

    giveData = () => {
        this.props.giveData(this.props.index, this.state);
    }

    handleCheckTypeChange = checkType => {
        this.setState({ checkType }, this.giveData);
    };

    handleConfigCheck = configCheck => {
        this.setState({ configCheck }, this.giveData);
    };

    handleApiGatewayMethod = method => {
        this.setState({ method }, this.giveData);
    };

    renderCheckTypeSwitch(checkType) {
        const {
            userName,
            policyName,
            securityGroupName,
            configCheck,
            bucketPrefixRegex,
            functionName,
            resourcePath,
            stage,
            method,
            groupName,
        } = this.state;

        switch (checkType) {
        case 'aws-user-iam-policy':
            return (
                <AwsUserIamPolicy
                    userName={userName}
                    handleInputChange={this.handleInputChange.bind(this)}
                    policyName={policyName}
                />

            );
        case 'ec2-security-groups':
            return (
                <Ec2SecurityGroups
                    securityGroupName={securityGroupName}
                    handleInputChange={this.handleInputChange.bind(this)}
                />

            );
        case 's3-bucket':
            return (
                <S3Bucket
                    configCheck={configCheck}
                    handleConfigCheck={this.handleConfigCheck.bind(this)}
                    bucketPrefixRegex={bucketPrefixRegex}
                    handleInputChange={this.handleInputChange.bind(this)}
                />

            );
        case 'lambda':
            return (
                <Lambda
                    configCheck={configCheck}
                    handleConfigCheck={this.handleConfigCheck.bind(this)}
                    functionName={functionName}
                    handleInputChange={this.handleInputChange.bind(this)}
                />

            );
        case 'api-gateway':
            return (
                <ApiGateway
                    configCheck={configCheck}
                    handleConfigCheck={this.handleConfigCheck.bind(this)}
                    method={method}
                    handleApiGatewayMethod={this.handleApiGatewayMethod.bind(this)}
                    stage={stage}
                    handleInputChange={this.handleInputChange.bind(this)}
                    resourcePath={resourcePath}
                />
            );
        case 'aws-group-iam-policy':
            return (
                <AwsGroupIamPolicy
                    groupName={groupName}
                    policyName={policyName}
                    handleInputChange={this.handleInputChange.bind(this)}
                />

            );
        default:
            return <div />;
        }
    }

    render() {
        const { events, index, containerLength } = this.props;
        const {
            checkType, contentMissing, contentExists, valueMissing, valuePresent, event,
        } = this.state;

        return (
            <div className="state-block" key={index}>
                <Button
                    type="danger"
                    className="delete-block"
                    onClick={() => { this.props.deleteBlock(index); }}
                >
                    <Icon type="delete" />
                </Button>
                <div style={{ width: '80%' }}>
                    <hr />
                    <div className="config-block">
                        <span>AWS Accounts</span>
                        {index > 0 && <Icon type="up-circle" onClick={() => this.props.moveUp(index)} />}
                        {index < containerLength - 1
                            && <Icon type="down-circle" onClick={() => this.props.moveDown(index)} />}
                    </div>

                    <div className="small-input">
                        <span className="inputSpan">Check Type</span>
                        <Select
                            className="filterSelect"
                            style={{ width: '100%' }}
                            name="checkType"
                            value={checkType}
                            onChange={checkType => this.handleCheckTypeChange(checkType)}
                        >
                            <Option key="select" value="" disabled selected>Select</Option>

                            {
                                CHECK_TYPE_OPTIONS.map(option => <Option key={option} value={option}>{option}</Option>)
                            }

                        </Select>
                    </div>
                    {this.renderCheckTypeSwitch(checkType)}

                    <div className="small-input " style={{ width: '60%' }}>
                        <h4>Contains Content</h4>
                        <div>
                            {contentExists.map((item, innerIndex) => (
                                <p key={innerIndex}>
                                    <span className="medium-text">
                                        Value -
                                        {' '}
                                        {item.value}
                                    </span>
                                    <Button
                                        data-testid="remove-exist-value"
                                        type="danger"
                                        className="space-left"
                                        size="small"
                                        onClick={() => this.removeContent(innerIndex, 'contentExists')}
                                    >
                                        <Icon className="small-text" type="delete" />
                                    </Button>
                                </p>
                            ))}
                        </div>
                        <div className="small-input">
                            <span className="inputSpan">Value</span>
                            <Input
                                name="valuePresent"
                                value={valuePresent}
                                onChange={this.handleInputChange}
                            />
                            <Button
                                type="primary"
                                onClick={this.addPresentContent.bind(this)}
                                className="left-space-for-button"
                            >
                                Add Present Content
                                {' '}
                                <Icon type="save" />
                            </Button>
                        </div>
                        <h4>Missing Content</h4>
                        <div>
                            {contentMissing.map((item, innerIndex) => (
                                <p key={innerIndex}>
                                    <span className="medium-text">
                                        Value -
                                        {' '}
                                        {item.value}
                                    </span>
                                    <Button
                                        data-testid="remove-missing-value"
                                        type="danger"
                                        className="space-left"
                                        size="small"
                                        onClick={() => this.removeContent(innerIndex, 'contentMissing')}
                                    >
                                        <Icon className="small-text" type="delete" />
                                    </Button>
                                </p>
                            ))}
                        </div>
                        <div className="small-input">
                            <span className="inputSpan">Value</span>
                            <Input
                                name="valueMissing"
                                value={valueMissing}
                                onChange={this.handleInputChange}
                            />
                            <Button
                                type="primary"
                                onClick={this.addMissingContent.bind(this)}
                                className="left-space-for-button"
                            >
                                Add Missing Content
                                {' '}
                                <Icon type="save" />
                            </Button>
                        </div>
                    </div>
                    <div
                        className="small-input "
                        data-testid="event-dropdown"
                    >
                        <span className="inputSpan">Event</span>
                        <Select
                            className="filterSelect"
                            style={{ width: '100%' }}
                            name="event"
                            value={event}
                            onChange={event => this.props.handleEventChange(event, index)}
                        >
                            <Option key="select" value="">
                                Select
                            </Option>
                            {events.map(event => (
                                <Option
                                    key={event}
                                    value={event}
                                    disabled={this.checkDisabled(event)}
                                >
                                    {event}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>
        );
    }
}

export default AwsAccounts;

export const AwsAccountCheckConfig = {
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
};
