import React, { Component } from 'react';
import {
    Button, Icon, Input, message, Modal, Tag, Tooltip,
} from 'antd';

export default class PostTagsModal extends Component {
    state = this.initialState

    get initialState() {
        return {
            inputVisible: false,
            inputValue: '',
            tags: [],
            loading: false,
            createdTags: [],
            deletedTags: [],
        };
    }

    componentDidMount() {
        this.props.fetchTags().then(res => {
            if (res !== false) {
                this.setState({
                    tags: res,
                });
            }
        });
    }

    saveInputRef = input => (this.input = input)

    handleInputConfirm = () => {
        const { inputValue, createdTags } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
            createdTags.push(inputValue);
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
            createdTags,

        });
    }

    showInput = () => {
        this.setState({
            inputVisible: !this.state.inputVisible,
        }, () => this.input.focus());
    }

    handleInputChange = e => {
        const { value } = e.target;
        this.setState({
            inputValue: value,
        });
    }

    removeTag = removedTag => {
        const { deletedTags, createdTags } = this.state;

        const tags = this.state.tags.filter(tag => tag !== removedTag);
        if (!createdTags.includes(removedTag)) {
            deletedTags.push(removedTag);
        } else {
            createdTags.splice(createdTags.indexOf(removedTag), 1);
        }
        this.setState({ tags, deletedTags });
    }

    closeModal = () => {
        this.setState(this.initialState);
        this.props.toggleTagsModal();
    }

    saveTags = () => {
        let { createdTags, deletedTags } = this.state;
        createdTags = createdTags.map(item => ({ title: item }));
        deletedTags = Array.from(new Set(deletedTags));
        this.props.updateTags({ createdTags, deletedTags }).then(res => {
            if (res !== false) {
                message.success('updated');
            } else {
                message.error('something went wrong please try again');
            }
        });
        this.props.toggleTagsModal();
    }

    render() {
        const {
            inputVisible, inputValue, tags, loading,
        } = this.state;
        return (
            <Modal
                title="Create Tags"
                visible={this.props.visible}
                onCancel={this.props.toggleTagsModal}
                okText="Add"
                footer={[
                    <Button key="back" onClick={this.closeModal}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={this.saveTags}>
                        Update Tags
                    </Button>,
                ]}
            >
                <div className="tag-modal-container">
                    {tags.map(tag => {
                        const isLongTag = tag.length > 20;
                        const tagElem = (
                            <Tag key={tag} closable onClose={() => this.removeTag(tag)}>
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </Tag>
                        );
                        return isLongTag ? (
                            <Tooltip title={tag} key={tag}>
                                {tagElem}
                            </Tooltip>
                        ) : (
                            tagElem
                        );
                    })}

                    {inputVisible && (
                        <Input
                            ref={this.saveInputRef}
                            type="text"
                            style={{ width: 100 }}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputConfirm}
                            onPressEnter={this.handleInputConfirm}
                        />
                    )}
                    {!inputVisible && (
                        <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                            <Icon type="plus" />
                            {' '}
                            New Tag
                        </Tag>
                    )}
                </div>
            </Modal>
        );
    }
}
