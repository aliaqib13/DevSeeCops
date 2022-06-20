import React, { Component } from 'react';
import {
    Input, Button, Icon, Select,
} from 'antd';

const { Option } = Select;

class AwsS3 extends Component {
    constructor(props) {
        super(props);
        const {
            checkType, responseContains, value, event,
        } = props.item;
        this.state = {
            checkType,
            responseContains,
            value,
            event,
        };
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({ ...props.item });
    }

    handleCheckTypeChange = checkType => {
        this.setState({ checkType }, this.giveData);
    }

    addResponseContains = () => {
        const { responseContains, value } = this.state;
        if (value) {
            responseContains.push({ value });
            this.setState({ responseContains, value: '' }, this.giveData);
        }
    }

    removeResponseContains = innerIndex => {
        const { responseContains } = this.state;
        responseContains.splice(innerIndex, 1);
        this.setState({ responseContains }, this.giveData);
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value }, this.giveData);
    }

    checkDisabled = event => {
        const { selectedEvents } = this.props;
        return selectedEvents.includes(event);
    }

    giveData = () => {
        this.props.giveData(this.props.index, this.state);
    }

    render() {
        const { index, events, containerLength } = this.props;
        const {
            checkType, responseContains, value, event,
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
                        <span>AWS S3</span>
                        {index > 0 && <Icon type="up-circle" onClick={() => this.props.moveUp(index)} /> }
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
                            <Option key="select" value=""> Select </Option>
                            <Option key="contents" value="contents"> contents </Option>
                            <Option key="logging" value="logging"> logging </Option>
                            <Option key="public-access-block" value="public-access-block"> public-access-block </Option>
                            <Option key="versioning" value="versioning"> versioning </Option>
                            <Option key="encryption" value="encryption"> encryption </Option>
                        </Select>
                    </div>
                    <div style={{ width: '60%' }}>
                        <h4>Response Contains</h4>
                        {responseContains.map((item, innerIndex) => (
                            <p key={innerIndex}>
                                <span className="medium-text">
                                    Value -
                                    {' '}
                                    {item.value}
                                </span>
                                <Button
                                    type="danger"
                                    className="space-left"
                                    size="small"
                                    onClick={() => this.removeResponseContains(innerIndex)}
                                >
                                    <Icon className="small-text" type="delete" />
                                </Button>
                            </p>
                        ))}
                        <div className="small-input">
                            <span className="inputSpan">Value</span>
                            <Input
                                name="value"
                                value={value}
                                onChange={this.handleInputChange}
                            />
                            <Button
                                type="primary"
                                onClick={this.addResponseContains}
                                className="left-space-for-button"
                            >
                                Add Response Contains
                                {' '}
                                <Icon type="save" />
                            </Button>
                        </div>
                    </div>
                    <div className="small-input state-block">
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

export default AwsS3;
