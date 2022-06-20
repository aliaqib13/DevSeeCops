import React, { Component } from 'react';
import { Button, Modal, List } from 'antd';

export default class SelectImage extends Component {
    state = {
        previewImage: '',
    }

    togglePreviewModal = image => {
        this.setState({
            previewModal: !this.state.previewModal,
            previewImage: image || '',
        });
    }

    selectAuthorImage = uuid => {
        if (this.props.selectedImage === 1) {
            this.props.selectImage(uuid);
        } else {
            this.props.selectSecondAuthorPic(uuid);
        }

        this.props.closeModal();
    }

    render() {
        const { images, visible } = this.props;
        const { previewModal, previewImage } = this.state;

        return (
            <>
                <Modal
                    title="Images"
                    visible={visible}
                    style={{ top: 180 }}
                    width="50%"
                    onCancel={this.props.closeModal}
                    zIndex={1}
                    footer={[
                        <Button key="close-modal" type="default" onClick={this.props.closeModal}>Close</Button>,
                    ]}
                >
                    <List
                        loading={false}
                        itemLayout="horizontal"
                        dataSource={images}
                        pagination
                        renderItem={item => (
                            <List.Item

                                actions={[
                                    <Button type="default" shape="circle" icon="eye" onClick={() => this.togglePreviewModal(item.image)} />,
                                    <Button type="primary" shape="circle" icon="plus" onClick={() => this.selectAuthorImage(item.uuid)} />,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={(
                                        <img
                                            width={150}
                                            style={{ maxHeight: '100px', objectFit: 'contain' }}
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
                    style={{ top: 180 }}
                    width="50%"
                    onCancel={this.togglePreviewModal}
                    zIndex={2}
                    footer={[
                        <Button key="close-modal" type="default" onClick={this.togglePreviewModal}>Close</Button>,
                    ]}
                >
                    <div style={{ display: 'flex' }}>
                        <img src={previewImage} style={{ maxWidth: '100%', objectFit: 'contain' }} alt="step" />
                    </div>
                </Modal>
            </>
        );
    }
}
