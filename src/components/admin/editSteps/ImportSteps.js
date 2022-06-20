import React, { Component } from 'react';
import {
    Button, Icon, message, Modal, Upload, Select,
} from 'antd';

const { Option } = Select;

export default class ImportSteps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            fileList: [],
            uploading: false,
            position: 'top',
            delimiter: ';',
            errors: [],
        };
    }

    onClose = () => {
        this.setState({
            visible: false,
            fileList: [],
            uploading: false,
            errors: [],
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleUpload = () => {
        this.setState({
            uploading: true,
            errors: [],
        });

        const formData = new FormData();
        formData.append('file', this.state.fileList[0]);
        formData.append('delimiter', this.state.delimiter);

        this.props.parseCsv(formData, 'test').then(res => {
            this.setState({
                uploading: false,
            });

            if (res.message) {
                message.error(res.message);
                if (res.errors && res.errors.length) {
                    this.setState({
                        errors: res.errors,
                    });
                    return;
                }
                return;
            }

            this.props.pushSteps(res, this.state.position);
            this.onClose();

            message.success('Success.');
        });
    }

    selectPosition = position => {
        this.setState({
            position,
        });
    }

    selectDelimiter = delimiter => {
        this.setState({
            delimiter,
        });
    }

    render() {
        const {
            visible, fileList, uploading, position, errors, delimiter,
        } = this.state;

        const props = {
            onRemove: () => {
                this.setState({
                    fileList: [],
                });
            },
            beforeUpload: file => {
                if (file.type !== 'text/csv') {
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
            <div>
                <Button onClick={this.showModal}>Import steps</Button>
                <Modal
                    title="Import Steps from CSV"
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
                    <div style={{ display: 'inline-flex' }}>
                        <Upload {...props}>
                            <Button>
                                <Icon type="upload" />
                                {' '}
                                Select File
                            </Button>
                        </Upload>
                        <Select value={position} style={{ width: 120, marginLeft: '10px' }} onChange={this.selectPosition}>
                            <Option value="top">Top</Option>
                            <Option value="bottom">Bottom</Option>

                        </Select>
                        <Select value={delimiter} style={{ width: 120, marginLeft: '10px' }} onChange={this.selectDelimiter}>
                            <Option value=";">;</Option>
                            <Option value=",">,</Option>

                        </Select>
                    </div>
                    <div style={{ display: 'grid', marginTop: '20px' }}>
                        {
                            errors.map((item, key) => (
                                <span key={key} style={{ color: 'red', fontSize: '12px' }}>{item}</span>
                            ))
                        }
                    </div>
                </Modal>
            </div>
        );
    }
}
