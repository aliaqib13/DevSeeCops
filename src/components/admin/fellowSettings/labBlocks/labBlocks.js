import React, { Component } from 'react';
import {
    message, Table, Button, Modal, Input, Upload, Icon, Dropdown, Menu,
} from 'antd';
import './labBlocks.scss';

const { Column } = Table;
const { TextArea } = Input;
const confirmModal = Modal.confirm;

class LabBlocks extends Component {
    state = this.initialState

    get initialState() {
        return {
            showAddModal: false,
            loading: false,
            uploadLoading: false,
            title: '',
            description: '',
            image: '',
            labBlockId: null,
        };
    }

    toggleAddModal = () => {
        this.setState({
            showAddModal: !this.state.showAddModal,
        });
    }

    openAddModal = () => {
        this.setState(this.initialState);
        this.toggleAddModal();
    }

    cancelModal = () => {
        this.setState(this.initialState);
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            return false;
        }

        const isLt100M = file.size / 1024 / 1024 < 100;
        if (!isLt100M) {
            message.error('Image must smaller than 100MB!');
            return false;
        }

        this.setState({ uploadLoading: true });
        const data = new FormData();
        data.append('file', file);

        this.props.uploadFile(data, 'labBlocks').then(res => {
            if (typeof res !== 'string') {
                message.error('Something went wrong, please try again.');
            } else {
                this.setState({
                    image: res,
                });
                message.success('Image uploaded.');
            }
            this.setState({ uploadLoading: false });
        });
        return false;
    }

    editModal = (e, record) => {
        this.toggleAddModal();
        this.setState({
            labBlockId: record.id,
            title: record.title,
            image: record.image,
            description: record.description,
        });
    }

    __create = () => {
        const { title, image, description } = this.state;
        this.props.createLabBlock({ title, image, description }).then(res => {
            if (res === true) {
                message.success('Created');
            } else {
                message.error('something went wrong please try again');
            }
        });
        this.cancelModal();
    }

    __update = () => {
        const {
            image, title, labBlockId, description,
        } = this.state;
        console.log('ss', this.props);
        this.props.updateLabBlock(labBlockId, { image, title, description }).then(res => {
            if (res === true) {
                message.success('Updated');
                this.props.fetchFellowSettings();
            } else {
                message.error('something went wrong please try again');
            }
            this.cancelModal();
        });
    }

    destroyLabBlock = (e, id) => {
        confirmModal({
            title: 'Are you sure you want to delete this item?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            okButtonProps: {
                loading: this.state.loading,
            },
            onOk: () => {
                this.setState({
                    loading: true,
                });
                this.props.deleteLabBlocks(id).then(res => {
                    if (res === true) {
                        message.success('Deleted');
                        this.props.fetchFellowSettings();
                    } else {
                        message.error('something went wrong please try again');
                    }
                    this.cancelModal();
                });
            },
        });
    }

    submit = () => {
        const validate = this.validateData();
        if (validate === true) {
            if (this.state.labBlockId) {
                this.__update();
            } else {
                this.__create();
            }
        }
    }

    validateData = () => {
        const { title, image, description } = this.state;

        if (title === '') {
            return message.error('Title field is required');
        }
        if (description === '') {
            return message.error('Description field is required');
        }
        if (title.length > 255) {
            return message.error('the Title field should not be greater than 255 characters');
        }
        if (image === '') {
            return message.error('Image field is required');
        }
        return true;
    }

    render() {
        const {
            showAddModal, loading, title, image, uploadLoading, labBlockId, description,
        } = this.state;
        const { labBlocks } = this.props;
        const uploadButton = (
            <div>
                <Icon type={uploadLoading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div className="lab-blocks-container">
                <Button type="primary" className="add-lab-block-button" onClick={this.openAddModal}>Add Lab Block</Button>

                <Table dataSource={labBlocks || []} tableLayout="fixed" className="lab-blocks-table" rowKey={item => item.id}>
                    <Column
                        title='Name'
                        key='name'
                        dataIndex='name'
                        className="lab-blocks-table-col"
                        render={(text, record) => (
                            <div className="lab-blocks-title-container">
                                {record.title}
                            </div>
                        )}
                    />

                    <Column
                        title='Image'
                        className="lab-blocks-table-col"
                        key='image'
                        dataIndex='image'
                        render={(text, record) => (
                            <div className="lab-blocks-image-container">
                                <img src={record.image} alt="pic" width={80} />
                            </div>
                        )}
                    />

                    <Column
                        title='Actions'
                        key='actions'
                        className="lab-blocks-table-col"
                        render={(text, record) => (
                            <div className="lab-blocks-actions-container">
                                <Dropdown overlay={(
                                    <Menu>
                                        <Menu.Item onClick={e => this.editModal(e, record)}>
                                            Edit Lab Block
                                            {' '}
                                            <Icon type="edit" />
                                        </Menu.Item>
                                        <Menu.Item onClick={e => this.destroyLabBlock(e, record.id)}>
                                            Delete Lab Block
                                            {' '}
                                            <Icon type="delete" />
                                        </Menu.Item>
                                    </Menu>
                                )}
                                >
                                    <Button>
                                        Actions
                                        {' '}
                                        <Icon type="down" />
                                    </Button>
                                </Dropdown>
                            </div>
                        )}
                    />
                </Table>

                <Modal
                    title="Add Lab Building Block"
                    visible={showAddModal}
                    onCancel={this.toggleAddModal}
                    okText="Add"
                    className="lab-blocks-modal"
                    confirmLoading={loading}
                    footer={[
                        <Button key="back" onClick={this.cancelModal}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" className="test-test" loading={loading} onClick={this.submit}>
                            {labBlockId ? 'Edit' : 'Add'}
                        </Button>,
                    ]}
                >
                    <div className="lab-blocks-input">
                        <label htmlFor="lab-block-title">Title</label>
                        <Input name="title" value={title} onChange={this.onChangeHandler} />
                    </div>
                    <div className="lab-blocks-input">
                        <label htmlFor="lab-block-title">Description</label>
                        <TextArea
                            name="description"
                            value={description}
                            onChange={this.onChangeHandler}
                            allowClear
                            autoSize={{ minRows: 2, maxRows: 5 }}
                            maxLength={200}
                            placeholder="Not more than 200 characters"
                        />
                    </div>
                    <Upload
                        accept='image/*'
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={this.handleUpload}
                    >
                        {
                            image ? <img src={image} alt="lab-block" style={{ width: '100%' }} />
                                : uploadButton
                        }
                    </Upload>

                </Modal>
            </div>
        );
    }
}

export default LabBlocks;
