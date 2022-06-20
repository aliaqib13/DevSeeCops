import React, { Component } from 'react';
import {
    Select, Button, Col, Modal, Input, message,
} from 'antd';

const { Option } = Select;

class SelectBlockType extends Component {
        state = {
            visible: false,
            title: '',
            confirmLoading: false,
            titleRequiredError: false,
            types: [
                // {
                //     title: 'Title Box',
                //     value: 'TitleBox'
                // },
                {
                    title: 'Information Box',
                    value: 'InformationBox',
                    saveTextContent: true,
                },
                // {
                //     title: 'Bullet Text',
                //     value: 'BulletText'
                // },
                {
                    title: 'Text Box',
                    value: 'SingleText',
                    saveTextContent: true,
                },
                {
                    title: 'Heart Box',
                    value: 'HeartBox',
                    saveTextContent: true,
                },
                {
                    title: 'Code Snippet',
                    value: 'CodeSnippet',
                    saveTextContent: true,
                },
                {
                    title: 'Grey Box',
                    value: 'GreyBox',
                    saveTextContent: true,
                },
                // Not being able to be selected anymore, decision: Hans @ 28/12/2021
                // {
                //     title: 'Infinity Loop',
                //     value: 'InfinityLoop',
                // },
                // {
                //     title: 'Paragraph Title',
                //     value: 'ParagraphTitle'
                // },
                {
                    title: 'Image',
                    value: 'Image',
                },
                {
                    title: 'Saved Image',
                    value: 'Image2',
                },
                {
                    title: 'Video',
                    value: 'Video',
                },
                {
                    title: 'Dropdown Hint',
                    value: 'DropdownHint',
                },
                {
                    title: 'Copy-to-clipboard',
                    value: 'CopyField',
                    saveTextContent: true,
                },
                {
                    title: 'Upload Image By User',
                    value: 'UploadImageByUser',
                },
                {
                    title: 'Learning Path',
                    value: 'LearningPath',
                },
            ],
        };

        componentDidMount() {
            const { type } = this.props;
            const types = [...this.state.types];
            if (type === 'theory') {
                types.splice(9, 1);
            }
            this.setState({
                types,
            });
        }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    saveComponent = () => {
        const { title, confirmLoading } = this.state;
        const { item } = this.props;

        if (!title.trim()) {
            this.setState({
                titleRequiredError: true,
            });
            return;
        }

        this.setState({
            confirmLoading: true,
        });

        this.props.storeSavedComponent({
            title,
            component: item,
        }).then(res => {
            if (res === true) {
                message.success('Component successfully saved');
            } else {
                message.error('Something went wrong, please try again');
            }

            this.setState({
                visible: false,
                confirmLoading,
            });
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    resetState= () => {
        this.setState({
            title: '',
            titleRequiredError: false,
        });
    }

    onChange = e => {
        const { titleRequiredError } = this.state;
        if (titleRequiredError && e.target.value.trim()) {
            this.setState({
                titleRequiredError: false,
            });
        }
        this.setState({
            title: e.target.value,
        });
    }

    checkSaveContent = targetBlock => {
        const { types } = this.state;
        const { selected, index, onChangeContentType } = this.props;

        // Check if originalContent needs to be saved
        const originalContent = types.filter(target => target.value === selected).find(block => block.saveTextContent === true);
        // Check if originalBlock holds text
        if (originalContent) {
            // Add 'warnContent' flag to onChangeContentType fn to figure out further action in parent component
            return onChangeContentType(targetBlock, index, 'warnContent');
        }
        return onChangeContentType(targetBlock, index);
    }

    render() {
        const {
            title, visible, confirmLoading, titleRequiredError, types,
        } = this.state;
        const {
            changePosition, pushContentChanges, removeBlock, isTemplate, is_compulsory, item,
        } = this.props;
        return (
            <div>
                <Col span={12}>
                    <Select
                        value={this.props.selected}
                        style={{ width: '100%' }}
                        onChange={targetBlock => this.checkSaveContent(targetBlock)}
                    >
                        {
                            types.map((item, key) => (
                                <Option key={key} value={item.value}>{item.title}</Option>
                            ))
                        }
                    </Select>
                </Col>
                <Col span={8}>
                    <div className="position-buttons">
                        <Button type="primary" className="change-pos-btn" shape="circle" icon="arrow-up" onClick={() => changePosition(this.props.index, 'up')} />
                        <Button type="primary" className="change-pos-btn" shape="circle" icon="arrow-down" onClick={() => changePosition(this.props.index, 'down')} />
                        <Button type="danger" className="change-pos favorite" shape="circle" icon="star" onClick={this.showModal} />
                        {

                            (!!isTemplate && !!is_compulsory && item.uuid)
                            && <Button type="primary" className="change-pos push-changes" icon="issues-close" shape="circle" onClick={() => pushContentChanges(this.props.index)} />
                        }

                    </div>

                </Col>
                <Col span={3}>
                    <div className="position-buttons">
                        <Button type="danger" className="change-pos" shape="circle" icon="delete" onClick={() => removeBlock(this.props.index)} />
                    </div>
                </Col>
                <Modal
                    title="Save as stored component"
                    visible={visible}
                    onOk={this.saveComponent}
                    onCancel={this.handleCancel}
                    okText="Save"
                    afterClose={this.resetState}
                    confirmLoading={confirmLoading}
                    className="save-component-modal"
                >
                    <div>
                        <Input className={`${titleRequiredError ? 'required-input' : ''}`} placeholder='Title for stored component' value={title} onChange={this.onChange} maxLength={255} />
                        {titleRequiredError && <span className='required-warning'>Title is required!</span>}
                    </div>
                </Modal>
            </div>
        );
    }
}

export default SelectBlockType;
