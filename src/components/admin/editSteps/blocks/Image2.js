import React, { Component } from 'react';
import { Modal, Button, List } from 'antd';

export default class Image2 extends Component {
    state = {
        type: 'ImageSelect',
        previewImage: '',
        visible: false,
        content: {
            uuid: '',
        },
    }

    componentDidMount() {
        this.setState({
            ...this.props.block,
        });
    }

    toggleModal = () => {
        this.setState({
            visible: !this.state.visible,
        });
    }

    togglePreviewModal = image => {
        this.setState({
            previewModal: !this.state.previewModal,
            previewImage: image || '',
        });
    }

    selectImage = uuid => {
        this.setState({
            content: {
                uuid,
            },
            visible: false,
        }, () => this.props.onChangeBlock({
            type: this.state.type,
            content: this.state.content,
        }, this.props.index));
    }

    render() {
        const { content } = this.props.block;
        const { steps_images } = this.props;
        const { visible, previewModal, previewImage } = this.state;

        let image = '';

        if (content.uuid) {
            image = steps_images.find(item => item.uuid === content.uuid).image;
        }

        return (
            <div className="block-item">
                <div className="image2-container">

                    {
                        content.uuid
                            ? (
                                <div className="select-image">
                                    <img src={image} alt="labsImage" />
                                </div>
                            )
                            : <></>
                    }
                    <div className="actions">
                        <Button type="primary" onClick={this.toggleModal}>Add Image</Button>
                        {content.uuid ? <Button type="default" onClick={() => this.togglePreviewModal(image)}>Preview</Button> : <></>}
                    </div>
                </div>
                <Modal
                    title="Images"
                    visible={visible}
                    width="50%"
                    onCancel={this.toggleModal}
                    zIndex={1}
                    footer={[
                        <Button key="close-modal" type="default" onClick={this.toggleModal}>Close</Button>,
                    ]}
                >
                    <List
                        loading={false}
                        itemLayout="horizontal"
                        dataSource={steps_images}
                        pagination
                        renderItem={item => (
                            <List.Item

                                actions={[
                                    <Button type="default" shape="circle" icon="eye" onClick={() => this.togglePreviewModal(item.image)} />,
                                    <Button type="primary" shape="circle" icon="plus" onClick={() => this.selectImage(item.uuid)} />,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={(
                                        <img
                                            width={150}
                                            style={{ maxHeight: '100px' }}
                                            alt="step"
                                            src={item.image}
                                        />
                                    )}
                                    description={item.image}
                                />
                            </List.Item>
                        )}
                    />
                </Modal>
                <Modal
                    title="Preview Image"
                    visible={previewModal}
                    width="50%"
                    onCancel={this.togglePreviewModal}
                    zIndex={2}
                    footer={[
                        <Button key="close-modal" type="default" onClick={this.togglePreviewModal}>Close</Button>,
                    ]}
                >
                    <div style={{ display: 'flex' }}>
                        <img src={previewImage} style={{ maxWidth: '100%' }} alt="step" />
                    </div>
                </Modal>
            </div>
        );
    }
}
