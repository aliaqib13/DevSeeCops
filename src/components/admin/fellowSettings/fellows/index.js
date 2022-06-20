import React, { Component } from 'react';
import {
    Button, Modal, Input, Upload, Icon, Table, Dropdown, Menu, message, Select,
} from 'antd';
import './fellows.scss';

const { Column } = Table;
const confirmModal = Modal.confirm;
const { Option } = Select;

class Fellows extends Component {
    state = this.initialState

    get initialState() {
        return {
            fellowModal: false,
            modalType: 'company',
            modelMode: 'create',
            dataType: 'companies',
            fellowPersonsModal: false,
            uploadLoading: false,
            loading: false,
            editFellow: {
                name: '',
                description: '',
                link: '',
                image: null,
                user_id: null,
            },
        };
    }

    showModal = (record, type) => {
        if (record !== undefined) {
            const index = this.props.fellows.findIndex(fellow => fellow.id === record.id);
            this.setState({
                editFellow: { ...this.props.fellows[index] },
                fellowModal: true,
                modalType: type,
                modelMode: 'edit',
            });
        } else {
            this.setState({
                fellowModal: true,
                modalType: type,
                modelMode: 'create',
            });
        }
    };

    submit = () => {
        this.setState({
            loading: true,
        });

        if (this.state.editFellow.id) {
            this.__update();
        } else {
            this.__create();
        }
    };

    __create() {
        if (this.state.modalType === 'persons') {
            if (!this.state.editFellow.link) {
                message.error('Link is required');
                this.setState({
                    loading: false,
                });
                return;
            } if (!this.state.editFellow.user_id) {
                message.error('Person is required');
                this.setState({
                    loading: false,
                });
                return;
            }
        }
        this.props.createFellow(this.state.editFellow).then(res => {
            if (res === true) {
                message.success('Created');
                this.closeModal();
            } else {
                this.setState({
                    loading: false,
                });
                if (res.errors) {
                    message.error(res.errors[0].message);
                } else {
                    message.error(res.message);
                }
            }
        });
    }

    __update() {
        if (this.state.modalType === 'persons') {
            if (!this.state.editFellow.link) {
                message.error('Link is required');
                this.setState({
                    loading: false,
                });
                return;
            } if (!this.state.editFellow.user_id) {
                message.error('Person is required');
                this.setState({
                    loading: false,
                });
                return;
            }
        }
        this.props.updateFellow(this.state.editFellow).then(res => {
            if (res === true) {
                message.success('Updated');
                this.closeModal();
            } else {
                this.setState({
                    loading: false,
                });
                if (res.errors) {
                    message.error(res.errors[0].message);
                } else {
                    message.error(res.message);
                }
            }
        });
    }

    destroy = (e, id) => {
        confirmModal({
            title: 'Are you sure delete this item?',
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
                this.props.deleteFellow(id).then(res => {
                    this.setState({
                        loading: false,
                    });

                    if (res === true) {
                        message.success('Deleted.');
                    } else {
                        message.error(res.message);
                    }
                });
            },
        });
    }

    closeModal = () => {
        this.setState({

            ...this.initialState,
            modalType: this.state.modalType,
            dataType: this.state.dataType,
        });
    };

    handleUpload = file => {
        this.setState({
            editFellow: {
                ...this.state.editFellow,
                image: null,
            },
        });

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

        this.props.uploadFile(data, 'fellows').then(res => {
            if (typeof res !== 'string') {
                message.error('Something went wrong, please try again.');
            } else {
                this.setState({
                    editFellow: {
                        ...this.state.editFellow,
                        image: res,
                    },
                });
                message.success('Image uploaded.');
            }
            this.setState({ uploadLoading: false });
        });
        return false;
    }

    onChangeHandler = e => {
        const { editFellow } = this.state;
        editFellow[e.target.name] = e.target.value;
        this.setState({
            editFellow,
        });
    }

    changePersonId = e => {
        this.setState({
            editFellow: {
                ...this.state.editFellow,
                user_id: e,
            },
        });
    }

    onSearchPerson = e => {
        this.props.fetchFellowSettings(e, this.state.dataType);
    }

    changeDataType = e => {
        this.setState({
            dataType: e,
        });
        this.props.fetchFellowSettings('', e);
    }

    render() {
        const {
            loading, fellowModal, editFellow, modalType, dataType, modelMode,
        } = this.state;
        const { fellows, persons } = this.props;

        const uploadButton = (
            <div>
                <Icon type={this.state.uploadLoading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div className="settings-fellows-tab">
                <div className="header-section">
                    <div>
                        {dataType === 'companies' && <Button type="primary" className="add-fellow-button" onClick={() => this.showModal(undefined, 'company')}>Add Fellow Companies</Button>}
                        {dataType === 'persons' && <Button type="primary" className="add-fellow-button" onClick={() => this.showModal(undefined, 'persons')}>Add Fellow Persons</Button>}
                    </div>
                    <div className="right-side">
                        <Select defaultValue={dataType} onChange={this.changeDataType} style={{ width: 200 }}>
                            <Option value="companies">Companies</Option>
                            <Option value="persons">Persons</Option>
                        </Select>
                    </div>
                </div>
                <Table dataSource={fellows} tableLayout="fixed" className="fellows-table" rowKey={item => item.id}>
                    <Column
                        title='Name'
                        key='name'
                        dataIndex='name'
                        className="fellows-table-row"
                        render={(text, record) => (
                            <div className="fellow-name-container">
                                {record.name}
                            </div>
                        )}
                    />
                    <Column
                        title='Description'
                        className="fellows-table-row"
                        key='description'
                        dataIndex='description'
                        width="500px"
                        ellipses
                        render={(text, record) => (
                            <div className="fellow-description-container">
                                {record.description}
                            </div>
                        )}
                    />
                    <Column
                        title='Link'
                        key='link'
                        className="fellows-table-row"
                        dataIndex='link'
                        width="300px"
                        ellipses
                        render={(text, record) => (
                            <div className="fellow-link-container">
                                {record.link || 'No link'}
                            </div>
                        )}
                    />
                    <Column
                        title='Image'
                        className="fellows-table-row"
                        key='image'
                        dataIndex='image'
                        render={(text, record) => (
                            <div className="fellow-image-container">
                                <img src={record.image} alt="pic" />
                            </div>
                        )}
                    />
                    <Column
                        title='Actions'
                        key='actions'
                        className="fellows-table-row"
                        render={(text, record) => (
                            <div className="fellow-actions-container">
                                <Dropdown overlay={(
                                    <Menu>
                                        <Menu.Item onClick={e => {
                                            if (record.user_id) {
                                                this.showModal(record, 'persons');
                                            } else {
                                                this.showModal(record, 'company');
                                            }
                                        }}
                                        >
                                            Edit Fellow
                                            {' '}
                                            <Icon type="edit" />
                                        </Menu.Item>
                                        <Menu.Item onClick={e => this.destroy(e, record.id)}>
                                            Delete Fellow
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
                    title={modalType === 'persons' ? modelMode === 'create' ? 'Add Fellow Persons' : 'Edit Fellow Persons' : modelMode === 'create' ? 'Add Fellow Companies' : 'Edit Fellow Companies'}
                    visible={fellowModal}
                    onOk={this.submit}
                    onCancel={this.closeModal}
                    okText="Add"
                    className="settings-fellow-modal"
                    confirmLoading={loading}
                    footer={[
                        <Button key="back" onClick={this.closeModal}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.submit}>
                            {modelMode === 'create' ? 'Add' : 'Edit'}
                        </Button>,
                    ]}
                >
                    {modalType !== 'persons' && (
                        <div className="fellow-modal-input">
                            <label htmlFor="fellow-name">Name</label>
                            <Input name="name" value={editFellow.name} onChange={this.onChangeHandler} />
                        </div>
                    )}
                    <div className="fellow-modal-input">
                        <label htmlFor="fellow-description">Description</label>
                        <Input.TextArea
                            maxLength='200'
                            name="description"
                            value={editFellow.description}
                            rows={4}
                            onChange={this.onChangeHandler}
                        />
                    </div>
                    <div className="fellow-modal-input">
                        <label htmlFor="fellow-link">
                            Link
                            {modalType === 'persons' ? '(required)' : '(optional)'}
                        </label>
                        <Input name="link" value={editFellow.link} onChange={this.onChangeHandler} />
                    </div>
                    {modalType === 'persons' && (
                        <div className="fellow-modal-input">
                            <label htmlFor="fellow-description">Person</label>
                            <div>
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={this.changePersonId}
                                    value={editFellow.user_id || ''}
                                    onSearch={this.onSearchPerson}
                                >
                                    {persons.map(e => <Option key={e.id} value={e.id}>{e.email}</Option>)}

                                </Select>
                            </div>
                        </div>
                    )}
                    <Upload
                        accept='image/*'
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={this.handleUpload}
                    >
                        {
                            editFellow.image ? <img src={editFellow.image} alt="fellow" style={{ width: '100%' }} />
                                : uploadButton
                        }
                    </Upload>
                </Modal>
            </div>
        );
    }
}

export default Fellows;
