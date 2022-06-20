import React, { Component } from 'react';
import {
    Button, Table, Modal, message,
} from 'antd';
import CreateHintModal from './create-hint-modal';
import EditHintModal from './edit-hint-modal';
import './hints.scss';
import HTMLSanitize from '../../../HTMLSanitize/HTMLSanitize';

const { Column } = Table;
const confirmModal = Modal.confirm;

class Hints extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createModalVisible: false,
            editModalVisible: false,
            maxLength: 600,
        };
    }

    deleteHint = id => {
        confirmModal({
            title: 'Are You Sure to delete this hint?',
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk: () => {
                this.props.deleteHint(id).then(res => {
                    if (res === true) {
                        message.success('Deleted!');
                    } else {
                        message.error(res.message);
                    }
                });
            },
        });
    }

    toggleCreateModal = () => {
        this.setState({
            createModalVisible: !this.state.createModalVisible,
        });
    }

    toggleEditModal = hint => {
        this.setState({
            editModalVisible: !this.state.editModalVisible,
            editedHint: hint,
        });
    }

    render() {
        const {
            hints, addHint, course_id, editHint, toggleHintModal, visible,
        } = this.props;
        const {
            createModalVisible, editModalVisible, editedHint, maxLength,
        } = this.state;
        return (
            <Modal
                onCancel={toggleHintModal}
                title="Add Hint Message"
                visible={visible}
                footer={null}
                width={1000}
            >
                <div className="hints-container">
                    <div className="hints-list">
                        <Button className='add-hint' onClick={this.toggleCreateModal}> Add Hint</Button>
                        {
                            hints
                                ? (
                                    <Table
                                        dataSource={hints}
                                        rowKey={item => item.id}
                                        pagination={{ position: 'bottom', pageSize: 10 }}
                                    >
                                        <Column
                                            title="Hint Message "
                                            render={(text, record) => (
                                                <div>
                                                    <p><HTMLSanitize content={record.message.length > maxLength ? `${(record.message).substring(0, maxLength - 3)}...` : record.message} /></p>
                                                    )
                                                </div>
                                            )}
                                            key="message"
                                        />
                                        <Column
                                            title="Actions"
                                            key="actions"
                                            width={200}
                                            render={(text, record) => (
                                                <div className="actions-btns">
                                                    <Button
                                                        type="primary"
                                                        onClick={() => this.toggleEditModal(record)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        type="danger"
                                                        style={{ marginLeft: '10px' }}
                                                        onClick={() => this.deleteHint(record.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            )}
                                        />
                                    </Table>
                                )
                                : <div>There is no any hint items</div>
                        }
                        {
                            createModalVisible
                            && (
                                <CreateHintModal
                                    key="create-hint-modal"
                                    visible={createModalVisible}
                                    toggleModal={this.toggleCreateModal}
                                    addHint={addHint}
                                    course_id={course_id}
                                />
                            )
                        }

                        {
                            editModalVisible
                            && (
                                <EditHintModal
                                    visible={editModalVisible}
                                    toggleModal={this.toggleEditModal}
                                    hint={editedHint}
                                    editHint={editHint}
                                />
                            )
                        }

                    </div>
                </div>
            </Modal>
        );
    }
}

export default Hints;
