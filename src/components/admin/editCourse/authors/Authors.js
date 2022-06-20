import React, { Component } from 'react';
import {
    Table, Button, Modal, AutoComplete, Input, Icon, message,
} from 'antd';

const { Column } = Table;
const confirmModal = Modal.confirm;

export default class Authors extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            loading: false,
            removeLoading: false,
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

    addAuthor = () => {
        this.setState({
            loading: true,
        });
        this.props.addAuthor(this.state.value, this.props.course_id).then(res => {
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

    removeAuthor = user_id => {
        confirmModal({
            title: 'Are you sure remove from authors?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.setState({
                    removeLoading: true,
                });
                this.props.removeAuthor(user_id, this.props.course_id).then(res => {
                    if (res === true) {
                        message.success('Removed');
                    } else {
                        message.error(res.message);
                    }

                    this.setState({
                        removeLoading: false,
                    });
                });
            },
        });
    }

    onChangeHandler = value => {
        this.setState({
            value,
        });
        const fellowOnly = true;
        this.props.searchByEmail(value, fellowOnly).then(res => {
            if (res === false) {
                return;
            }
            this.setState({
                data: res,
            });
        });
    }

    render() {
        const { authors } = this.props;
        const {
            visible, loading, removeLoading, value, data,
        } = this.state;

        return (
            <div className="course-authors">
                <Button type="default" onClick={this.openModal}>Add Author</Button>
                <Table dataSource={authors} rowKey={item => item.id} pagination={false}>
                    <Column
                        title="Name"
                        key="name"
                        render={record => (
                            <>
                                {record.firstname}
                                {' '}
                                {record.lastname}
                            </>
                        )}
                    />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column
                        title="Actions"
                        key="actions"
                        render={record => (
                            <Button type="danger" loading={removeLoading} onClick={() => this.removeAuthor(record.id)}>Remove</Button>
                        )}
                    />
                </Table>
                <Modal
                    title="Add author"
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
                                    onClick={this.addAuthor}
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
