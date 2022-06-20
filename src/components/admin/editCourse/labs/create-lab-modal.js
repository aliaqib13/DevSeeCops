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
    max_hint_count: 0,
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
        title: 'Empty',
        value: '',
    },
];

class CreateLabModal extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
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

    saveLab = e => {
        e.preventDefault();
        const {
            name, description, platform, slug, available_time, hands_on_desc, hands_on_title, application_language,
            automated_checking, is_hidden, automated_checking_lab_steps,
        } = this.state;
        this.props.createLab({
            name,
            description,
            platform,
            slug,
            available_time: available_time.replace('m', ''),
            max_hint_count: 0,
            hands_on_desc,
            hands_on_title,
            application_language,
            course_id: this.props.course_id,
            automated_checking,
            is_hidden,
            automated_checking_lab_steps,
        }).then(res => {
            this.setState({
                loading: false,
            });
            if (res === true) {
                message.success('Created');
                this.setState(initialState);
                this.props.toggleModal();
            } else {
                message.error(res.message);
            }
        });
    }

    cancelLab = e => {
        this.setState(initialState);
        this.props.toggleModal();
    }

    render() {
        const {
            loading, platform, name,
            description, slug, available_time,
            max_hint_count, hands_on_desc, hands_on_title,
            application_language, automated_checking, is_hidden, automated_checking_lab_steps,
        } = this.state;
        const { visible } = this.props;

        return (
            <Modal
                onCancel={this.props.toggleModal}
                title="Create Lab"
                visible={visible}
                footer={[
                    <Button key="back" onClick={this.cancelLab}>
                        Cancel
                    </Button>,
                    <Button key="create" type="primary" onClick={this.saveLab} loading={loading}>
                        Create
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Item label="Lab name">
                        <Input type="text" name="name" onChange={this.onChangeHandle} value={name} />
                    </Item>
                    <Item label="Hands on title">
                        <Input
                            type="text"
                            name="hands_on_title"
                            onChange={this.onChangeHandle}
                            value={hands_on_title}
                        />
                    </Item>
                    <Item label="Available Time">
                        <Input
                            type="text"
                            name="available_time"
                            onChange={this.onChangeHandle}
                            value={available_time}
                        />
                    </Item>
                    <Item label="Max hint count">
                        <Input
                            type="text"
                            name="max_hint_count"
                            value={max_hint_count}
                            onChange={this.onChangeHandle}
                        />
                    </Item>
                    <Item label="Slug">
                        <Input type="text" name="slug" onChange={this.onChangeHandle} value={slug} />
                    </Item>
                    <Item label="Description">
                        <TextArea rows={3} name="description" onChange={this.onChangeHandle} value={description} />
                    </Item>
                    <Item label="Hands on description">
                        <TextArea rows={3} name="hands_on_desc" onChange={this.onChangeHandle} value={hands_on_desc} />
                    </Item>
                    <Item label="Select Platform">
                        <Select name="platform" onChange={this.platformChangeHandle} value={platform}>
                            {
                                platforms.map((item, key) => <Option key={key} value={item.value}>{item.title}</Option>)
                            }
                        </Select>
                    </Item>
                    <Item label="Select Application Language">
                        <Select
                            placeholder="Select Application Language"
                            onChange={this.languageChangeHandle}
                            value={application_language}
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
                                checked={automated_checking}
                                onChange={this.changeCheck}
                                checkedChildren={<Icon type="check" />}
                                unCheckedChildren={<Icon type="close" />}
                            />
                        </Item>
                        <Item label="Lab Is Hidden" style={{ marginLeft: '36%' }}>
                            <Switch
                                className='automated_lab_checking'
                                checked={is_hidden}
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

export default CreateLabModal;
