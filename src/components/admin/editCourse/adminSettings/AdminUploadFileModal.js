import React, { Component } from 'react';
import {
    Modal, Upload, Button, Icon,
} from 'antd';

export default class AdminUploadFileModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            uploading: false,
            hasError: false,

        };
    }

    handleUpload = () => {
        this.setState({
            uploading: true,
        });
        this.props.toggleLoadingModal(true);
        const formData = new FormData();
        formData.append('file', this.state.fileList[0]);
        this.props.uploadFilesForFellows(formData, this.state.fileList[0].name).then(() => {
            this.onClose();
        });
    }

    onClose = () => {
        this.setState({
            fileList: [],
            uploading: false,
        });
        this.props.toggleModal();
    }

    render() {
        const { visible } = this.props;
        const { fileList, uploading } = this.state;

        const footer = [
            <Button onClick={this.onClose} key="onCancel">Close</Button>,
            <Button
                key="uploadFile"
                type="primary"
                onClick={this.handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
            >
                {uploading ? 'Uploading..' : 'Start Upload'}
            </Button>,
        ];

        const props = {
            onRemove: () => {
                this.setState({
                    fileList: [],
                });
            },
            beforeUpload: file => {
                this.setState({
                    fileList: [file],
                });

                return false;
            },
            fileList,
        };

        return (
            <>
                <Modal
                    title="Select file to upload"
                    visible={visible}
                    onCancel={this.onClose}
                    destroyOnClose
                    footer={footer}
                >

                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" />
                            {' '}
                            Select File
                        </Button>
                    </Upload>

                </Modal>
            </>
        );
    }
}
