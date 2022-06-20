import React, { Component } from 'react';
import {
    Button, Drawer, Icon, Input, message, Table, Modal,
} from 'antd';

const { Column } = Table;

export default class LabtimeRequestDrawer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            searchEmail: '',
            timeModalVisible: false,
            currentRequest: {},
        };
    }

    handleChangeStatus = (labtimeRequest, status) => {
        this.setState({
            timeModalVisible: true,
            currentRequest: {
                id: labtimeRequest.id,
                status,
                defaultLabtime: labtimeRequest.activeLabs.lab.available_time,
                lab_id: labtimeRequest.activeLabs.lab.id,
                user_id: labtimeRequest.user_id,
                active_course_id: labtimeRequest.activeLabs.active_course_id,
            },
        });
    }

    changeStatus = (id, status, lab_id, user_id, active_course_id, time) => {
        const loader = message.loading('Loading..', 0);
        this.onClose();
        this.props.changeLabtimeRequestStatus({
            id, status, lab_id, user_id, active_course_id, time,
        }).then(res => {
            if (res.error) {
                message.error(res.error.message);
            } else {
                message.success(`Status changed${time ? ' and time granted!' : ''}`);
            }
            this.updateData();
            loader();
        });
    }

    onClose = () => {
        this.setState({ timeModalVisible: false, currentRequest: {}, defaultLabtime: 0 });
    }

    requestDeleteHandler = id => {
        const loader = message.loading('Loading..', 0);
        this.props.deleteLabtimeRequest(id).then(res => {
            if (!res.error) {
                message.success('request deleted');
                this.updateData();
            } else {
                message.error(res.error.message);
            }
            loader();
        });
    }

    updateData = () => {
        const { selectedLabtimeRequest, labtimeRequests } = this.props;
        const { searchEmail, currentPage } = this.state;

        this.props.getLabtimeRequests(selectedLabtimeRequest, currentPage, labtimeRequests.perPage || 10, searchEmail);
        this.props.getLabs();
    }

    paginate = page => {
        const { selectedLabtimeRequest, labtimeRequests } = this.props;
        const { searchEmail } = this.state;

        this.setState({
            currentPage: page,
        });

        this.props.getLabtimeRequests(selectedLabtimeRequest, page, labtimeRequests.perPage, searchEmail);
    }

    changeSearchEmail = e => {
        this.setState({
            searchEmail: e.target.value,
        });
        const { currentPage } = this.state;
        const { selectedLabtimeRequest, labtimeRequests } = this.props;
        this.props.getLabtimeRequests(selectedLabtimeRequest, currentPage, labtimeRequests.perPage, e.target.value);
    }

    render() {
        const {
            visible, showRequestLoader, labtimeRequests, onClose,
        } = this.props;
        const {
            currentPage, searchEmail, timeModalVisible, currentRequest,
        } = this.state;
        return (
            <Drawer
                title="Lab time requests"
                className="course-access-drawer"
                width={550}
                placement="right"
                onClose={() => {
                    this.setState({ searchEmail: '' });
                    onClose();
                }}
                visible={visible}
                switchScrollingEffect={false}
            >

                <Table
                    size="lg"
                    loading={showRequestLoader}
                    dataSource={labtimeRequests ? labtimeRequests.data : []}
                    rowKey={item => item.id}
                    pagination={{
                        onChange: this.paginate,
                        pageSize: labtimeRequests ? labtimeRequests.perPage : 10,
                        total: labtimeRequests ? labtimeRequests.total : 100,
                        current: currentPage,
                        position: 'top',
                        defaultCurrent: 1,
                    }}
                    rowClassName="drawer-requests-row"
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
                                {record.status === 'pending' ? (
                                    <div className="request-action-buttons">
                                        <Button
                                            id={record.id}
                                            name="accepted"
                                            onClick={event => this.handleChangeStatus(record, 'accepted')}
                                            type="primary"
                                            shape="circle"
                                        >
                                            <Icon type="check" />
                                        </Button>
                                        <Button
                                            id={record.id}
                                            name="rejected"
                                            onClick={event => this.changeStatus(record.id, 'rejected', record.activeLabs.lab.id, record.user_id, record.activeLabs.active_course_id)}
                                            type="danger"
                                            shape="circle"
                                        >
                                            <Icon type="stop" />
                                        </Button>
                                        <Button onClick={() => this.requestDeleteHandler(record.id)} type="danger" shape="circle"><Icon type="delete" /></Button>
                                    </div>
                                ) : record.status === 'accepted' ? (

                                    <div className="request-action-buttons">
                                        <span style={{ color: 'green' }}>Accepted</span>
                                        <Button onClick={() => this.requestDeleteHandler(record.id)} type="danger" shape="circle" icon="delete" />
                                    </div>
                                ) : record.status === 'rejected' ? (
                                    <div className="request-action-buttons">
                                        <span style={{ color: 'red' }}>Rejected</span>
                                        <Button onClick={() => this.requestDeleteHandler(record.id)} type="danger" shape="circle" icon="delete" />
                                    </div>
                                ) : null}
                            </div>
                        )}
                    />
                </Table>
                <Modal
                    title="Time to be added"
                    width={320}
                    visible={timeModalVisible}
                    onCancel={this.onClose}
                    destroyOnClose
                    footer={null}
                >
                    <div>
                        <Button
                            style={{ margin: '10px' }}
                            onClick={() => this.changeStatus(currentRequest.id, currentRequest.status,
                                currentRequest.lab_id, currentRequest.user_id, currentRequest.active_course_id, 30)}
                        >
                            30m
                        </Button>
                        <Button
                            style={{ margin: '10px' }}
                            onClick={() => this.changeStatus(currentRequest.id, currentRequest.status,
                                currentRequest.lab_id, currentRequest.user_id, currentRequest.active_course_id, 60)}
                        >
                            60m
                        </Button>
                        <Button
                            style={{ margin: '10px' }}
                            onClick={() => this.changeStatus(currentRequest.id, currentRequest.status,
                                currentRequest.lab_id, currentRequest.user_id, currentRequest.active_course_id, parseInt(currentRequest.defaultLabtime))}
                        >
                            {currentRequest.defaultLabtime}
                        </Button>
                    </div>
                </Modal>
            </Drawer>
        );
    }
}
