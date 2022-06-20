import React, { Component } from 'react';
import {
    Input, Button, Icon, Select,
} from 'antd';

const { Option } = Select;

class GitlabDynamicConfigs extends Component {
    constructor(props) {
        super(props);
        const { file, contentExistBlock, event } = props.item;
        this.state = {
            file,
            contentExistBlock,
            event,
        };
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({ ...props.item });
    }

    addPresentContent = middleIndex => {
        const { contentExistBlock } = this.state;
        const { contentExists, valuePresent } = contentExistBlock[middleIndex];
        if (valuePresent) {
            contentExists.push({ value: valuePresent });
            contentExistBlock[middleIndex].valuePresent = '';
            this.setState({ contentExistBlock }, this.giveData);
        }
    }

    removeContent = (innerIndex, middleIndex) => {
        const { contentExistBlock } = this.state;
        const { contentExists } = contentExistBlock[middleIndex];
        contentExists.splice(innerIndex, 1);
        this.setState({ contentExistBlock }, this.giveData);
    }

    addConfig = () => {
        const { contentExistBlock } = this.state;
        contentExistBlock.push({
            contentExists: [],
            valuePresent: '',
        });
        this.setState({ contentExistBlock }, this.giveData);
    }

    deletePresentContents = middleIndex => {
        const { contentExistBlock } = this.state;
        contentExistBlock.splice(middleIndex, 1);
        this.setState({ contentExistBlock }, this.giveData);
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value }, this.giveData);
    }

    handleContentInputChange = (e, middleIndex) => {
        const { contentExistBlock } = this.state;
        contentExistBlock[middleIndex].valuePresent = e.target.value;
        this.setState({ contentExistBlock }, this.giveData);
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
        const { contentExistBlock, file, event } = this.state;
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
                        <span>GitLab Dynamic Configs</span>
                        {index > 0 && <Icon type="up-circle" onClick={() => this.props.moveUp(index)} /> }
                        {index < containerLength - 1
                        && <Icon type="down-circle" onClick={() => this.props.moveDown(index)} />}
                    </div>
                    <Button type="primary" onClick={this.addConfig}>
                        Add Config
                        {' '}
                        <Icon type="save" />
                    </Button>
                    {contentExistBlock.map((obj, middleIndex) => (
                        <div className="state-block" style={{ width: '60%' }} key={middleIndex}>
                            {middleIndex >= 1 && <span>OR</span>}
                            <h4>
                                Contains Content
                                {middleIndex >= 1
                                    && (
                                        <Button
                                            type="danger"
                                            className="delete-content-contains"
                                            size="small"
                                            onClick={() => this.deletePresentContents(middleIndex)}
                                        >
                                            <Icon type="delete" />
                                        </Button>
                                    )}
                            </h4>

                            <div>
                                {obj.contentExists.map((item, innerIndex) => (
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
                                            onClick={() => this.removeContent(innerIndex, middleIndex)}
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
                                    value={obj.valuePresent}
                                    onChange={e => this.handleContentInputChange(e, middleIndex)}
                                />
                                <Button
                                    type="primary"
                                    onClick={() => this.addPresentContent(middleIndex)}
                                    className="left-space-for-button"
                                >
                                    Add Present Content
                                    {' '}
                                    <Icon type="save" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className="small-input">
                        <span className="inputSpan">File</span>
                        <Input
                            name="file"
                            value={file}
                            onChange={this.handleInputChange}
                        />
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

export default GitlabDynamicConfigs;
