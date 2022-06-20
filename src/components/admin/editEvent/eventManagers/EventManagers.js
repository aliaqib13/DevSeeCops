import React, { Component } from 'react';
import {
    Table, Button, Modal, AutoComplete, Input, Icon, message,
} from 'antd';

const { Column } = Table;
const confirmModal = Modal.confirm;

export default class EventManagers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            loading: false,
            data: [],
            value: '',
        };
    }

    onSelect = email => {
        this.setState({
            value: email,
        });
    }

    openModal = () => {
        this.setState({
            visible: true,
        });
    }

    closeModal = () => {
        this.setState({
            visible: false,
            value: '',
        });
    }

    addEventManager = () => {
        this.setState({
            loading: true,
        });
        this.props.addEventManager(this.state.value, this.props.event_id).then(res => {
            if (res === true) {
                message.success('User added');
                this.setState({
                    visible: false,
                    value: '',
                    data: [],
                });
            } else {
                message.error(res.message);
            }

            this.setState({
                loading: false,
            });
        });
    }

    removeEventManager = user_id => {
        confirmModal({
            title: 'Are you sure to remove this user from event managers?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.props.removeEventManager(user_id, this.props.event_id).then(res => {
                    if (res === true) {
                        message.success('Removed');
                    } else {
                        message.error(res.message);
                    }
                });
            },
        });
    }

    onChangeHandler = value => {
        this.setState({
            value,
        });
        this.props.searchByEmail(value).then(res => {
            if (res === false) {
                return;
            }
            this.setState({
                data: res,
            });
        });
    }

    render() {
        const { eventManagers } = this.props;
        const {
            visible, loading, value, data,
        } = this.state;

        return (
            <div className="course-authors">
                <Button type="default" onClick={this.openModal}>Add Event Manager</Button>
                <Table dataSource={eventManagers} rowKey={item => item.id} pagination={false}>
                    <Column
                        title="Name"
                        key="name"
                        render={record => (
                            <>
                                {record.user.firstname}
                                {' '}
                                {record.user.lastname}
                            </>
                        )}
                    />
                    <Column title="Email" key="email" render={record => (<>{record.user.email}</>)} />
                    <Column
                        title="Actions"
                        key="actions"
                        render={record => (
                            <Button type="danger" onClick={() => this.removeEventManager(record.user.id)}>Remove</Button>
                        )}
                    />
                </Table>
                <Modal
                    title="Add Event Manager"
                    visible={visible}
                    confirmLoading={false}
                    onCancel={this.closeModal}
                    footer={[
                        <Button key="submit" type="default" onClick={this.closeModal}>
                            Cancel
                        </Button>,
                    ]}
                >
                    <AutoComplete
                        size="large"
                        style={{ width: '100%' }}
                        dataSource={data}
                        onSelect={this.onSelect}
                        placeholder="search by email"
                        onSearch={this.onChangeHandler}
                        value={value}
                    >
                        <Input
                            suffix={(
                                <Button
                                    style={{ marginRight: -12 }}
                                    size="large"
                                    type="primary"
                                    onClick={this.addEventManager}
                                    loading={loading}
                                >
                                    <Icon type="user-add" />
                                </Button>
                            )}
                        />
                    </AutoComplete>
                </Modal>
            </div>
        );
    }
}
