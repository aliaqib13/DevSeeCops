import React, { Component } from 'react';
import {
    Input, Button, Icon, Select,
} from 'antd';

const { Option } = Select;

class GitlabPackageVersions extends Component {
    constructor(props) {
        super(props);
        const {
            file, versions, position, event,
        } = props.item;
        this.state = {
            file,
            versions,
            position,
            event,
        };
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({ ...props.item });
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
            file, versions, position, event,
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
                        <span>GitLab Package Versions</span>
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
                    <div className="small-input">
                        <span className="inputSpan">Versions</span>
                        <Input
                            name="versions"
                            value={versions}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="small-input">
                        <span className="inputSpan">Position</span>
                        <Input
                            name="position"
                            value={position}
                            type="number"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="small-input">
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

export default GitlabPackageVersions;
