import React, { Component } from 'react';
import {
    Button, Upload, Icon, message, InputNumber, Modal,
} from 'antd';
import Resizer from 'react-image-file-resizer';

const confirmModal = Modal.confirm;

export default class UploadImage extends Component {
    state = {
        loading: false,
        uploadImageLoader: false,
        imageUrl: '',
        height: 1,
        width: 1,
        heightRatio: 0,
        widthRatio: 0,
        previewModal: false,
        file: null,
    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                file: info.file.originFileObj,
                loading: false,
            }));
        }
    }

    onChangeHeight = height => {
        this.setState({
            height,
            width: (height * this.state.widthRatio).toFixed(),
        });
    }

    onChangeWidth = width => {
        this.setState({
            width,
            height: (width * this.state.heightRatio).toFixed(),
        });
    }

    clear = () => {
        confirmModal({
            title: 'Are you sure clear uploaded image?',
            okText: 'Yes',
            okType: 'warning',
            cancelText: 'No',
            onOk: () => {
                this.setState({
                    loading: false,
                    uploadImageLoader: false,
                    imageUrl: '',
                    height: 1,
                    width: 1,
                    heightRatio: 0,
                    widthRatio: 0,
                    previewModal: false,
                    file: null,
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    preview = () => {
        if (this.state.imageUrl) {
            this.setState({
                previewModal: true,
            });
        }
    }

    closeModal = () => {
        this.setState({
            previewModal: false,
        });
    }

    imageOnLoad = ({ target: img }) => {
        const height = img.naturalHeight;
        const width = img.naturalWidth;
        const heightRatio = (height / width).toFixed(1);
        const widthRatio = (width / height).toFixed(1);

        this.setState({
            height,
            width,
            heightRatio,
            widthRatio,
        });
    }

    uploadImage = () => {
        const { file, height, width } = this.state;
        this.setState({
            uploadImageLoader: true,
        });
        Resizer.imageFileResizer(
            file,
            width,
            height,
            'png',
            95,
            0,
            uri => {
                this.props.uploadImage(uri).then(res => {
                    if (res === true) {
                        message.success('Uploaded.');

                        this.setState({
                            loading: false,
                            uploadImageLoader: false,
                            imageUrl: '',
                            height: 1,
                            width: 1,
                            heightRatio: 0,
                            widthRatio: 0,
                            previewModal: false,
                            file: null,
                        });
                    } else {
                        this.setState({
                            uploadImageLoader: false,
                        });
                        res.error ? message.error(res.error.message) : message.error(res.message);
                    }
                });
            },
            'base64',
        );
    }

    render() {
        const {
            imageUrl, loading, uploadImageLoader, height, width, heightRatio, widthRatio, previewModal,
        } = this.state;
        const uploadButton = (
            <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload Image</div>
            </div>
        );

        return (
            <div className="upload-image">
                <Upload
                    name="step"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    customRequest={({ file, onSuccess }) => setTimeout(() => onSuccess('uploaded'), 0)}
                    beforeUpload={file => {
                        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                        if (!isJpgOrPng) {
                            message.error('You can only upload JPG/PNG file!');
                        }

                        return isJpgOrPng;
                    }}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="step" style={{ width: '100%' }} onLoad={this.imageOnLoad} /> : uploadButton}
                </Upload>
                <div className="resize-inputs">
                    <label>Height</label>
                    <InputNumber disabled={!heightRatio} size="small" min={1} max={5000} value={height} onChange={this.onChangeHeight} />
                    <label>Width</label>
                    <InputNumber disabled={!widthRatio} size="small" min={1} max={5000} value={width} onChange={this.onChangeWidth} />
                </div>
                <div className="actions">
                    <Button size="small" disabled={!imageUrl} onClick={this.preview}>Preview</Button>
                    <Button size="small" type="primary" disabled={!imageUrl} onClick={this.uploadImage} loading={uploadImageLoader}>Resize and Upload</Button>
                    <Button size="small" type="danger" disabled={!imageUrl} onClick={this.clear}>Clear</Button>
                </div>
                <Modal
                    title={`Image Preview: ${height} x ${width}`}
                    visible={previewModal}
                    confirmLoading={uploadImageLoader}
                    onOk={this.uploadImage}
                    okText="Resize and Upload"
                    cancelText="Close"
                    onCancel={this.closeModal}
                    width="70%"
                >
                    <div style={{ display: 'flex' }}>
                        <img src={imageUrl} alt="step" style={{ maxWidth: '100%' }} width={width} height={height} />
                    </div>
                </Modal>
            </div>
        );
    }
}
