import React, { Component } from 'react';
import {
    Modal, Upload, Button, Icon, message,
} from 'antd';

export default class UploadCourseModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fileList: [],
            uploading: false,
        };
    }

    handleUpload = () => {
        this.setState({
            uploading: true,
        });

        const formData = new FormData();
        formData.append('file', this.state.fileList[0]);

        this.props.importCourse(formData).then(res => {
            if (res === true) {
                message.success('Uploaded');
                this.onClose();
            } else {
                this.setState({
                    uploading: false,
                });

                if (res.errors) {
                    res.errors.forEach(item => {
                        message.error(item.message);
                    });
                } else {
                    message.error(res.message);
                }
            }
        });
    }

    onClose = () => {
        this.setState({
            fileList: [],
            uploading: false,
        });
        this.props.onClose();
    }

    render() {
        const { visible } = this.props;
        const { fileList, uploading } = this.state;

        const props = {
            onRemove: () => {
                this.setState({
                    fileList: [],
                });
            },
            beforeUpload: file => {
                if (file.type !== 'application/json') {
                    message.error('Wrong file type, please select json file');
                } else {
                    this.setState({
                        fileList: [file],
                    });
                }

                return false;
            },
            fileList,
        };

        return (
            <Modal
                title="Import Course from JSON"
                visible={visible}
                onCancel={this.onClose}
                destroyOnClose
                footer={[
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
                ]}
            >
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" />
                        {' '}
                        Select File
                    </Button>
                </Upload>

            </Modal>
        );
    }
}
