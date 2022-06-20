import React, { Component } from 'react';
import {
    Input, Button, Switch, Typography, message,
} from 'antd';
import './generalNotification.scss';

const { TextArea } = Input;
const { Title } = Typography;

class GeneralNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            created: false,
            text: '',
            active: false,
            loading: false,
        };
    }

    componentDidMount() {
        const { globalNotification } = this.props;

        if (globalNotification) {
            this.setState({
                text: globalNotification.text,
                active: !!globalNotification.active,
                created: true,
            });
        }
    }

    changeActive = e => {
        this.setState({ active: e });
    }

    saveOrUpdate = e => {
        const { text, active, created } = this.state;
        const { updateGlobalNotification, createGlobalNotification, fetchGeneralNotification } = this.props;
        const data = { text, active };
        this.setState({ loading: true });

        if (created) {
            updateGlobalNotification(data).then(response => {
                const { data } = response;
                data.success ? message.success(data.success) : message.error(data.message);
                this.props.fetchGeneralNotification();
                this.setState({ loading: false });
            });
        } else {
            createGlobalNotification(data).then(response => {
                const { data } = response;
                this.setState({ loading: false });
                if (data.success) {
                    this.setState({ created: true });
                    fetchGeneralNotification();
                    message.success(data.success);
                } else {
                    message.error(data.message);
                }
            });
        }
    }

    changeText = e => {
        this.setState({ text: e.target.value });
    }

    render() {
        const { text, active, loading } = this.state;

        return (
            <div className="settings-general-notification-tab">
                <Title className="general-title" level={3}>General Notification</Title>
                <div className="general general-text-area">
                    <TextArea rows={4} value={text} onChange={this.changeText} />
                </div>
                <div className="general general-switch">
                    <Switch checkedChildren="enabled" unCheckedChildren="disabled" checked={active} onChange={this.changeActive} />
                </div>
                <div className="general general-button">
                    <Button type="primary" loading={loading} className="btn btn-primary" onClick={this.saveOrUpdate}>Save</Button>
                </div>
            </div>
        );
    }
}

export default GeneralNotification;
