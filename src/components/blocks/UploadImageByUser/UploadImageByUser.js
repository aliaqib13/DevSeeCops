import React, { Component } from 'react';
import {
    Upload, Icon, Modal, message,
} from 'antd';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class UploadImageByUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
        };
    }

    componentDidMount() {
        const { content, demoMode } = this.props;
        if (!demoMode) {
            this.getIabStepImage(content.image_token);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (!nextProps.demoMode) {
            if (this.props.content.image_token !== nextProps.content.image_token) {
                this.getIabStepImage(nextProps.content.image_token);
            }
        }
    }

    getIabStepImage = image_token => {
        let { ...fileList } = this.state;

        this.props.getLabImage(image_token).then(res => {
            if (res.data) {
                const stepImage = {
                    uid: res.data.image_token,
                    name: `${res.data.step_name}.png`,
                    status: 'done',
                    url: res.data.image,
                };
                fileList = [];
                fileList.push(stepImage);
                this.setState({
                    fileList,
                });
            } else {
                this.setState({
                    fileList: [],
                });
            }
        });
    }

    handleCancel = () => {
        this.setState({ previewVisible: false });
    }

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList, file }) => {
        this.uploadImage(file);
        this.setState({ fileList });
    }

    removeImage = () => {
        const { deleteLabImage, demoMode, content } = this.props;
        if (!demoMode) {
            deleteLabImage(content.image_token).then(res => {
                if (res === true) {
                    message.success('image successfully deleted');
                } else {
                    message.error('something went wrong please try again');
                }
            });
        }
    }

    uploadImage = image => {
        const {
            stepTitle, uploadFile, uploadLabImage, lab_id, demoMode, content,
        } = this.props;
        if (demoMode) {
            return true;
        }
        const { image_token } = content;

        const data = new FormData();
        data.append('file', image);

        uploadFile(data, 'lab_step_image').then(res => {
            if (res === false) {
                message.error('Something went wrong, please try again.');
            } else {
                uploadLabImage({
                    image: res, step_name: stepTitle, lab_id, image_token,
                }).then(result => {
                    if (result === true) {
                        message.success('Image uploaded');
                    } else {
                        message.error('Something went wrong please try again');
                    }
                });
            }
        });
    }

    beforeUpload = () => false

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.removeImage}
                    beforeUpload={this.beforeUpload}

                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}
