import React, { Component } from 'react';
import {
    Input, Button, Icon, Select,
} from 'antd';

const { Option } = Select;

class Kubernetes extends Component {
    constructor(props) {
        super(props);
        const {
            resources, resource, resourceNames, logs, event,
        } = props.item;
        this.state = {
            resources,
            resource,
            resourceNames,
            logs,
            event,
        };
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({ ...props.item });
    }

    addResourcesKubernetes = () => {
        const { resources, resource } = this.state;
        if (resource) {
            resources.push(resource);
            this.setState({ resources, resource: '' }, this.giveData);
        }
    }

    removeResourcesKubernetes = innerIndex => {
        const { resources } = this.state;
        resources.splice(innerIndex, 1);
        this.setState({ resources }, this.giveData);
    }

    componentWillMount() {
        this.setState({ ...this.props.item });
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
            resources, resource, resourceNames, logs, event,
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
                        <span>Kubernetes</span>
                        {index > 0 && <Icon type="up-circle" onClick={() => this.props.moveUp(index)} /> }
                        {index < containerLength - 1
                        && <Icon type="down-circle" onClick={() => this.props.moveDown(index)} />}
                    </div>
                    <div className="small-input">
                        <span className="inputSpan">Resources</span>
                        <div>
                            {resources.map((item, innerIndex) => (
                                <p className="space-left" key={innerIndex}>
                                    <span className="medium-text">{item}</span>
                                    <Button
                                        type="danger"
                                        className="space-left"
                                        size="small"
                                        onClick={() => this.removeResourcesKubernetes(innerIndex)}
                                    >
                                        <Icon className="small-text" type="delete" />
                                    </Button>
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="small-input">
                        <p className="inputSpan">Resource</p>
                        <Input
                            name="resource"
                            style={{ width: '82%' }}
                            value={resource}
                            onChange={this.handleInputChange}
                        />
                        <Button
                            type="primary"
                            className="space-left"
                            onClick={() => this.addResourcesKubernetes()}
                        >
                            {' '}
                            Add
                            {' '}
                            <Icon type="save" />
                        </Button>
                    </div>
                    <div className="small-input">
                        <span className="inputSpan">Resource Name</span>
                        <Input
                            name="resourceNames"
                            value={resourceNames}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="small-input">
                        <span className="inputSpan">Logs</span>
                        <Input
                            name="logs"
                            value={logs}
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

export default Kubernetes;
