import React, { Component } from 'react';
import {
    List, Avatar, Button, message, Modal, Popover,
} from 'antd';
import copy from 'copy-to-clipboard';
import UploadImage from './upload-image';
import './step-imags.scss';

const confirmModal = Modal.confirm;

export default class StepImages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            deleteImageLoader: false,
            previewModal: false,
            previewImage: '',
        };
    }

    componentDidMount() {
        this.setState({
            loading: true,
        });

        this.props.fetchStepsImages(this.props.courseId).then(res => {
            this.setState({
                loading: false,
            });
        });
    }

    copyUrl = url => {
        copy(url);
        message.success('Copied.');
    }

    closePreviewModal = () => {
        this.setState({
            previewModal: false,
            previewImage: '',
        });
    }

    showPreviewModal = image => {
        this.setState({
            previewModal: true,
            previewImage: image,
        });
    }

    removeStepImage = id => {
        confirmModal({
            title: 'Are you sure clear remove this image?',
            okText: 'Yes',
            okType: 'warning',
            cancelText: 'No',
            onOk: () => {
                this.setState({
                    deleteImageLoader: true,
                });
                this.props.removeStepImage(id).then(res => {
                    this.setState({
                        deleteImageLoader: false,
                    });
                    if (res === true) {
                        message.success('Deleted');
                    } else {
                        res.error ? message.error(res.error.message) : message.error(res.message);
                    }
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    uploadImage = async uri => await this.props.uploadStepImage(this.props.courseId, uri)

    render() {
        const {
            loading, deleteImageLoader, previewModal, previewImage,
        } = this.state;
        const { images } = this.props;

        return (
            <div className="step-images">
                <UploadImage
                    uploadImage={this.uploadImage}
                />
                <List
                    className="steps-images-list"
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={images}
                    pagination
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <Popover content="Preview">
                                    <Button className="img-preview-button" type="default" shape="circle" icon="eye" onClick={() => this.showPreviewModal(item.image)} />
                                </Popover>,
                                <Popover content="Copy image url">
                                    <Button type="primary" shape="circle" icon="copy" onClick={() => this.copyUrl(item.image)} />
                                </Popover>,
                                <Popover content="Delete">
                                    <Button className="img-delete-button" type="danger" shape="circle" icon="delete" onClick={() => this.removeStepImage(item.id)} loading={deleteImageLoader} />
                                </Popover>,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={item.image} />
                                }
                                description={item.image}
                            />
                        </List.Item>
                    )}
                />
                <Modal
                    title="Image Preview"
                    visible={previewModal}
                    onCancel={this.closePreviewModal}
                    width="50%"
                    className="steps-image-preview-modal"
                    footer={[
                        <Button key="close" onClick={this.closePreviewModal}>Close</Button>,
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
