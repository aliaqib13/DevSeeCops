import React, { Component } from 'react';
import {
    Input, Button, Icon, Select,
} from 'antd';

const { Option } = Select;
class Gitlab extends Component {
    constructor(props) {
        super(props);
        const {
            file, contentMissing, contentExists, valueMissing, valuePresent, event,
        } = props.item;
        this.state = {
            file,
            contentMissing,
            contentExists,
            valueMissing,
            valuePresent,
            event,
        };
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({ ...props.item });
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value }, this.giveData);
    }

    addPresentContent = () => {
        const { contentExists, valuePresent } = this.state;
        if (valuePresent) {
            contentExists.push({ value: valuePresent });
            this.setState({ contentExists, valuePresent: '' }, this.giveData);
        }
    }

    addMissingContent = () => {
        const { contentMissing, valueMissing } = this.state;
        if (valueMissing) {
            contentMissing.push({ value: valueMissing });
            this.setState({ contentMissing, valueMissing: '' }, this.giveData);
        }
    }

    removeGitLabContent = (innerIndex, type) => {
        const content = this.state[type];
        content.splice(innerIndex, 1);
        this.setState({ [type]: content }, this.giveData);
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
            file, contentMissing, contentExists, valueMissing, valuePresent, event,
        } = this.state;
        return (
            <div className="state-block" key={index}>
                <Button
                    type="danger"
                    className="delete-block"
                    onClick={() => this.props.deleteBlock(index)}
                >
                    <Icon type="delete" />
                </Button>
                <div style={{ width: '80%' }}>
                    <hr />
                    <div className="config-block">
                        <span>GitLab</span>
                        {index > 0 && <Icon type="up-circle" onClick={() => this.props.moveUp(index)} /> }
                        {index < containerLength - 1
                        && <Icon type="down-circle" onClick={() => this.props.moveDown(index)} />}
                    </div>
                    <div className="small-input">
                        <span className="inputSpan">File</span>
                        <Input
                            name="file"
                            value={file}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="state-block" style={{ width: '60%' }}>
                        <h4>Present Content</h4>
                        <div>
                            {contentExists.map((item, innerIndex) => (
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
                                        onClick={() => this.removeGitLabContent(innerIndex, 'contentExists')}
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
                                onClick={() => this.addPresentContent()}
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
                                        type="danger"
                                        className="space-left"
                                        size="small"
                                        onClick={() => this.removeGitLabContent(innerIndex, 'contentMissing')}
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
                                onClick={() => this.addMissingContent()}
                                className="left-space-for-button"
                            >
                                Add Missing Content
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

export default Gitlab;
