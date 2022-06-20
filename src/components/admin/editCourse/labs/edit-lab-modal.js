import React, { Component } from 'react';
import {
    Modal, Form, Input, Select, Button, message, Icon, Switch,
} from 'antd';

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;

const initialState = {
    name: '',
    description: '',
    platform: '',
    application_language: '',
    slug: '',
    available_time: '',
    max_hint_count: '',
    hands_on_desc: '',
    hands_on_title: '',
    loading: false,
    automated_checking: false,
    is_hidden: false,
    automated_checking_lab_steps: false,
};

const platforms = [
    {
        title: 'AWS',
        value: 'AWS',
    },
    {
        title: 'Azure',
        value: 'Azure',
    },
    {
        title: 'GCP',
        value: 'GCP',
    },
    {
        title: 'Ali Cloud',
        value: 'Alibaba Cloud',
    },
    {
        title: 'DigitalOcean',
        value: 'DigitalOcean',
    },
    {
        title: 'Empty',
        value: '',
    },
];
const languages = [
    {
        title: 'Java',
        value: 'Java',
    },
    {
        title: '.Net',
        value: '.Net',
    },
    {
        title: 'Python',
        value: 'Python',
    },
    {
        title: 'Go',
        value: 'Go',
    },
    {
        title: 'PHP',
        value: 'PHP',
    },
    {
        title: 'Empty',
        value: '',
    },
];

class EditLabModal extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lab !== this.props.lab) {
            this.setState({
                ...this.props.lab,
            });
        }
    }

    handleOk = e => {
        e.preventDefault();
        this.setState({
            loading: true,
        });
        const {
            name, description, platform, slug,
            hands_on_desc, available_time, max_hint_count,
            hands_on_title, application_language, automated_checking,
            is_hidden, automated_checking_lab_steps,
        } = this.state;
        const { id } = this.props.lab;
        this.props.editLab(id, {
            name,
            description,
            platform,
            slug,
            available_time: available_time.replace('m', ''),
            max_hint_count,
            hands_on_desc,
            hands_on_title,
            application_language,
            automated_checking,
            is_hidden,
            automated_checking_lab_steps,
        }).then(res => {
            this.setState({
                loading: false,
            });
            if (res === true) {
                message.success('Edited');
                this.setState(initialState);
                this.props.toggleModal();
            } else {
                message.error(res.message);
            }
        });
    }

    onChangeHandle = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    platformChangeHandle = value => {
        this.setState({
            platform: value,
        });
    }

    languageChangeHandle = value => {
        this.setState({
            application_language: value,
        });
    }

    handleCancel = e => {
        this.setState(initialState);
        this.props.toggleModal();
    }

    changeCheck = () => {
        this.setState({
            automated_checking: !this.state.automated_checking,
        });
    }

    changeHidden = () => {
        this.setState({
            is_hidden: !this.state.is_hidden,
        });
    }

    changeAutoCheckLabSteps = () => {
        this.setState({
            automated_checking_lab_steps: !this.state.automated_checking_lab_steps,
        });
    }

    render() {
        const { visible, toggleModal, isAdmin } = this.props;
        const {
            name, description, platform, slug,
            available_time, max_hint_count, hands_on_desc,
            hands_on_title, loading, application_language,
            automated_checking, is_hidden, automated_checking_lab_steps,
        } = this.state;
        return (
            <Modal
                onCancel={toggleModal}
                title="Edit Lab"
                visible={visible}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="create" type="primary" loading={loading} onClick={this.handleOk}>
                        Edit
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Item label="Lab name">
                        <Input type="text" name="name" value={name} onChange={this.onChangeHandle} />
                    </Item>
                    <Item label="Hands on title">
                        <Input
                            type="text"
                            name="hands_on_title"
                            value={hands_on_title}
                            onChange={this.onChangeHandle}
                        />
                    </Item>
                    <Item label="Available Time">
                        <Input type="text" name="available_time" value={available_time.replace('m', '')} onChange={this.onChangeHandle} />
                    </Item>
                    <Item label="Max hint count">
                        <Input type="text" name="max_hint_count" value={max_hint_count} onChange={this.onChangeHandle} />
                    </Item>
                    {
                        isAdmin
                        && (
                            <Item label="Slug">
                                <Input type="text" name="slug" value={slug} onChange={this.onChangeHandle} />
                            </Item>
                        )
                    }

                    <Item label="Description">
                        <TextArea rows={3} name="description" value={description} onChange={this.onChangeHandle} />
                    </Item>
                    <Item label="Hands on description">
                        <TextArea rows={3} name="hands_on_desc" value={hands_on_desc} onChange={this.onChangeHandle} />
                    </Item>
                    <Item label="Select Platform">
                        <Select
                            placeholder="Select Platform"
                            name="platform"
                            value={platform}
                            onChange={this.platformChangeHandle}
                        >
                            {
                                platforms.map((item, key) => <Option key={key} value={item.value}>{item.title}</Option>)
                            }
                        </Select>
                    </Item>
                    <Item label="Select Application Language">
                        <Select
                            placeholder="Select Application Language"
                            value={application_language}
                            onChange={this.languageChangeHandle}
                        >
                            {
                                languages.map((item, key) => <Option key={key} value={item.value}>{item.title}</Option>)
                            }
                        </Select>
                    </Item>
                    <div style={{ display: 'flex' }}>
                        <Item label="Automated Lab Checking using AI">
                            <Switch
                                className='automated_lab_checking'
                                checked={!!automated_checking}
                                onChange={this.changeCheck}
                                checkedChildren={<Icon type="check" />}
                                unCheckedChildren={<Icon type="close" />}
                            />
                        </Item>
                        <Item label="Lab Is Hidden" style={{ marginLeft: '36%' }}>
                            <Switch
                                className='automated_lab_checking'
                                checked={!!is_hidden}
                                onChange={this.changeHidden}
                                checkedChildren={<Icon type="check" />}
                                unCheckedChildren={<Icon type="close" />}
                            />
                        </Item>
                    </div>
                    <Item label="Automated Checking for steps">
                        <Switch
                            className='automated_lab_checking'
                            checked={!!automated_checking_lab_steps}
                            onChange={this.changeAutoCheckLabSteps}
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                        />
                    </Item>
                </Form>

            </Modal>
        );
    }
}

export default EditLabModal;
