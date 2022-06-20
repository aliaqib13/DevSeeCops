import React, { Component } from 'react';
import {
    Button, Drawer, Icon, Input, message, Table,
} from 'antd';

const { Column } = Table;

export default class CourseRequestDrawer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            searchEmail: '',
        };
    }

    changeStatus = event => {
        const loader = message.loading('Loading..', 0);
        this.props.changeRequestStatus({
            id: event.target.id,
            status: event.target.name,
        }).then(res => {
            if (res.error) {
                message.error(res.error.message);
            } else {
                message.success('status changed');
            }
            this.updateData();
            loader();
        });
    }

    requestDeleteHandler = id => {
        const loader = message.loading('Loading..', 0);
        this.props.deleteRequest(id).then(res => {
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
        const { selectedRequest, courseRequests } = this.props;
        const { searchEmail, currentPage } = this.state;

        this.props.getCourseRequests(selectedRequest, currentPage, courseRequests.perPage || 10, searchEmail);
    }

    paginate = page => {
        const { selectedRequest, courseRequests } = this.props;
        const { searchEmail } = this.state;

        this.setState({
            currentPage: page,
        });

        this.props.getCourseRequests(selectedRequest, page, courseRequests.perPage, searchEmail);
    }

    changeSearchEmail = e => {
        this.setState({
            searchEmail: e.target.value,
        });
        const { currentPage } = this.state;
        const { selectedRequest, courseRequests } = this.props;
        this.props.getCourseRequests(selectedRequest, currentPage, courseRequests.perPage, e.target.value);
    }

    render() {
        const {
            visible, showRequestLoader, courseRequests, onClose,
        } = this.props;
        const { currentPage, searchEmail } = this.state;
        return (
            <Drawer
                title="Course access requests"
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
                    dataSource={courseRequests ? courseRequests.data : []}
                    rowKey={item => item.id}
                    pagination={{
                        onChange: this.paginate,
                        pageSize: courseRequests.perPage,
                        total: courseRequests.total,
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
                                        <Button id={record.id} name="accepted" onClick={event => this.changeStatus(event)} type="primary" shape="circle"><Icon type="check" /></Button>
                                        <Button id={record.id} name="rejected" onClick={event => this.changeStatus(event)} type="danger" shape="circle"><Icon type="stop" /></Button>
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
            </Drawer>
        );
    }
}
