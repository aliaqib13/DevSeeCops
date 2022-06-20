import React, { Component } from 'react';
import {
    Button, Drawer, Icon, Input, message, Table, Modal, Select,
} from 'antd';

const { Column } = Table;
const { TextArea } = Input;
const { Option } = Select;

export default class EventUsersDrawer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addUserLoader: false,
            inputValue: '',
            searchList: [],
            searchEmail: '',
            currentPage: 1,
            visibleModal: false,
            loading: false,
            filterByValue: '',
            text: '',
            notificationType: '',
        };
    }

    assignEvent = user_id => {
        message.loading('Loading..', 0.5);
        const { currentPage, searchEmail } = this.state;
        const { event_id, eventUsers } = this.props;
        this.props.assignEvent(event_id, user_id).then(res => {
            if (res === true) {
                message.success('Event assigned to the user');
                this.props.getEventUsers(event_id, currentPage, eventUsers.perPage, searchEmail);
            } else {
                message.error(res.message);
            }
        });
    }

    assignAll = () => {
        message.loading('Loading..', 0.5);
        const { currentPage, searchEmail } = this.state;
        const { event_id, eventUsers } = this.props;
        this.props.assignEventToAll(event_id).then(res => {
            if (res === true) {
                message.success('Assigned to all users of the event');
                this.props.getEventUsers(event_id, currentPage, eventUsers.perPage, searchEmail);
            } else {
                message.error(res.message);
            }
        });
    }

    removeUserFromEvent = user_id => {
        message.loading('Loading..', 0.5);
        const { currentPage, searchEmail } = this.state;
        const { event_id, eventUsers } = this.props;
        this.props.removeUserFromEvent(event_id, user_id).then(res => {
            if (res === true) {
                message.success('User deleted from event');
                this.props.getEventUsers(event_id, currentPage, eventUsers.perPage, searchEmail);
            } else {
                message.error(res.message);
            }
        });
    }

    changeSearchEmail = e => {
        this.setState({
            searchEmail: e.target.value,
        });
        const { currentPage } = this.state;
        const { event_id, eventUsers } = this.props;
        this.props.getEventUsers(event_id, currentPage, eventUsers.perPage, e.target.value);
    }

    paginate = page => {
        const { event_id, eventUsers } = this.props;
        const { searchEmail } = this.state;

        this.setState({
            currentPage: page,
        });

        this.props.getEventUsers(event_id, page, eventUsers.perPage, searchEmail);
    }

    handleNotificationModal = () => {
        this.setState({ visibleModal: !this.state.visibleModal });
    }

    createAndSendNotification = () => {
        const { event_id } = this.props;
        const { filterByValue, text, notificationType } = this.state;
        if (!filterByValue || !text || !notificationType) {
            return message.error('Please fill in all the data');
        }
        this.props.createAndSendNotification({
            filterByValue, text, event_id, notificationType,
        }).then(res => {
            if (res.message) {
                message.error(res.message);
            } else {
                message.success('Sent!');
                this.handleNotificationModal();
                this.setState({ text: '', filterByValue: '', notificationType: '' });
            }
        });
    }

    filterBy = value => {
        this.setState({ filterByValue: value });
    }

    changeText = e => {
        this.setState({ text: e.target.value });
    }

    handleNotificationType = value => {
        this.setState({ notificationType: value });
    }

    render() {
        const { visible, eventUsers, loadingDrawer } = this.props;
        const {
            searchEmail, currentPage, visibleModal, loading, filterByValue, text, notificationType,
        } = this.state;
        if (eventUsers && eventUsers.data) {
            const data = eventUsers.data.filter(item => item.user);
            eventUsers.data = data;
        }

        return (
            <>
                <Drawer
                    title="Users"
                    className="course-users-drawer"
                    width={550}
                    placement="right"
                    onClose={this.props.onClose}
                    visible={visible}
                    switchScrollingEffect={false}
                >
                    {eventUsers.data && eventUsers.data.length ? <Button type="primary" onClick={this.assignAll}>Assign All</Button> : ''}
                    {eventUsers.data && eventUsers.data.length ? <Button type="primary" onClick={this.handleNotificationModal} style={{ marginLeft: '15px' }}>Create notification</Button> : ''}
                    <Table
                        size="lg"
                        pagination={{
                            onChange: this.paginate,
                            pageSize: eventUsers.perPage,
                            total: eventUsers.total,
                            current: currentPage,
                            position: 'top',
                            defaultCurrent: 1,
                        }}
                        loading={loadingDrawer}
                        dataSource={eventUsers.data}
                        rowKey={item => item.id}
                        rowClassName="drawer-users-row"
                    >
                        <Column
                            title={() => (
                                <Input
                                    value={searchEmail}
                                    placeholder="Search by Email"
                                    onChange={this.changeSearchEmail}
                                    name="searchEmail"
                                />
                            )}
                            key="email"
                            dataIndex="user.email"
                        />
                        <Column
                            title="actions"
                            key="actions"
                            render={(text, record) => (
                                <div className="requestActionsContainer">
                                    <div className="request-action-buttons">
                                        {!record.is_assigned
                                            ? (
                                                <Button type="primary" shape="circle" id={record.id} name="assign" onClick={event => this.assignEvent(record.user_id)}>
                                                    <Icon type="check" />
                                                </Button>
                                            )
                                            : <span style={{ color: 'green' }}>Assigned </span>}
                                        <Button type="danger" shape="circle" icon="delete" onClick={() => this.removeUserFromEvent(record.user_id)} />
                                    </div>

                                </div>
                            )}
                        />
                    </Table>
                </Drawer>
                <Modal
                    title="Notification info"
                    visible={visibleModal}
                    onCancel={this.handleNotificationModal}
                    footer={[
                        <Button key="back" onClick={this.handleNotificationModal}>
                            Cancel
                        </Button>,
                        <Button key="update" type="primary" loading={loading} onClick={this.createAndSendNotification}>
                            Create and Send
                        </Button>,
                    ]}
                >
                    <span className="inputSpan">Type: </span>
                    {' '}
                    <br />
                    <Select placeholder="Type" value={notificationType} style={{ width: '100%' }} onChange={this.handleNotificationType}>
                        <Option value="both">Both</Option>
                        <Option value="email">Email</Option>
                        <Option value="platform-notification">Platform notification</Option>
                    </Select>
                    <div style={{ marginTop: '10px' }}>
                        <span className="inputSpan">Text: </span>
                        <TextArea autoSize={{ minRows: 2, maxRows: 5 }} name="text" value={text} onChange={this.changeText} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span className="inputSpan">Send To: </span>
                        {' '}
                        <br />
                        <Select placeholder="Filter By" value={filterByValue} style={{ width: '100%' }} onChange={this.filterBy}>
                            <Option value="all">All</Option>
                            <Option value="assigned">Assigned</Option>
                            <Option value="unassigned">Unassigned</Option>
                        </Select>
                    </div>
                </Modal>
            </>
        );
    }
}
