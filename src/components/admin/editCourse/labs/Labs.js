import React, { Component } from 'react';
import {
    Table, Button, message, Modal, Icon, Dropdown, Menu,
} from 'antd';
import { withRouter, Link } from 'react-router-dom';
import CreateLabModal from './create-lab-modal';
import EditLabModal from './edit-lab-modal';

import SignatureModal from './signature-modal';
import './Labs.scss';

const { Column } = Table;
const confirmModal = Modal.confirm;

class Labs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labCreateModalVisible: false,
            labUpdateModalVisible: false,
            signatureModalVisible: false,
            editingLab: null,
            signLabId: 0,
        };
    }

    editLabSteps = id => {
        const { course_id: courseId } = this.props;
        this.props.history.push(`/platform/admin/edit-lab-steps/${id}/${courseId}`);
    }

    toggleLabCreateModal = () => {
        this.setState({
            labCreateModalVisible: !this.state.labCreateModalVisible,
        });
    }

    toggleLabEditModal = () => {
        this.setState({
            labUpdateModalVisible: !this.state.labUpdateModalVisible,
        });
    }

    toggleSignatureModal = (id = 0) => {
        this.setState({
            signatureModalVisible: !this.state.signatureModalVisible,
            signLabId: id,
        });
    }

    editLab = id => {
        const { labs } = this.props;
        const lab = labs.find(x => x.id === id);
        this.setState({
            editingLab: lab,
        });
        this.toggleLabEditModal();
    }

    showDeleteConfirm = id => {
        confirmModal({
            title: 'Are you sure delete this lab?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.props.deleteLab(id).then(res => {
                    if (res === true) {
                        message.success('Deleted');
                    } else {
                        message.error(res.message);
                    }
                });
            },
        });
    }

    render() {
        const { labs, course_id: courseId, isAdmin } = this.props;
        const {
            labCreateModalVisible, labUpdateModalVisible, signatureModalVisible, editingLab, signLabId,
        } = this.state;

        return (
            <div className="edit-course-labs">
                <Button type="primary" onClick={this.toggleLabCreateModal}>Add new lab</Button>
                <Table dataSource={labs} rowKey={item => item.id} pagination={false} scroll={{ x: true }}>
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column title="Platform" dataIndex="platform" key="platform" />
                    <Column
                        title="Automated Checking"
                        dataIndex="automated_checking"
                        key="automated_checking"
                        render={(text, record) => (
                            record.automated_checking ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> : <Icon type="close-circle" theme="twoTone" twoToneColor="#FF0000" />
                        )}
                    />
                    <Column
                        title="Visible for Users"
                        dataIndex="is_hidden"
                        key="is_hidden"
                        render={(text, record) => (
                            !record.is_hidden ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> : <Icon type="close-circle" theme="twoTone" twoToneColor="#FF0000" />
                        )}
                    />
                    <Column title="Slug" dataIndex="slug" key="slug" />
                    <Column
                        title="Action"
                        key="actions"
                        render={(text, record) => (
                            <Dropdown overlay={(
                                <Menu>
                                    <Menu.Item onClick={() => {
                                        this.editLabSteps(record.id);
                                    }}
                                    >
                                        Edit steps
                                    </Menu.Item>
                                    <Menu.Item onClick={() => this.toggleSignatureModal(record.id)}>
                                        {record.signature_author_id ? 'Change Signature' : 'Sign Lab'}
                                    </Menu.Item>
                                    <Menu.Item onClick={() => { this.editLab(record.id); }}>
                                        Edit Lab
                                        {' '}
                                        <Icon type="edit" />
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to={`/platform/admin/lab-states/${record.id}`}>
                                            {!record.state_machine_created ? 'Create State Machine' : 'Update State Machine'}
                                        </Link>
                                    </Menu.Item>
                                    { isAdmin
                                        && (
                                            <Menu.Item onClick={() => this.showDeleteConfirm(record.id)}>
                                                Delete
                                                {' '}
                                                <Icon type="delete" />
                                            </Menu.Item>
                                        )}
                                </Menu>
                            )}
                            >
                                <Button>
                                    Actions
                                    {' '}
                                    <Icon type="down" />
                                </Button>
                            </Dropdown>
                        )}
                    />
                </Table>
                <CreateLabModal
                    toggleModal={this.toggleLabCreateModal}
                    visible={labCreateModalVisible}
                    course_id={courseId}
                    createLab={data => this.props.addNewLab(data)}

                />
                <EditLabModal
                    toggleModal={this.toggleLabEditModal}
                    visible={labUpdateModalVisible}
                    lab={editingLab}
                    editLab={(id, data) => this.props.editLab(id, data)}
                    isAdmin={this.props.isAdmin}
                />
                <SignatureModal
                    toggleModal={this.toggleSignatureModal}
                    visible={signatureModalVisible}
                    saveSignature={this.props.saveSignature}
                    labId={signLabId}
                />

            </div>
        );
    }
}

export default withRouter(Labs);
