import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchJobs, deleteJob, changeJobStatus, bulkDeleteJobs,
} from '../../../store/actions/admin/jobs';
import {
    Table, message, Typography, Tag, Progress, Select, Button, Modal, Input, Popover, Menu, Dropdown, Icon,
} from 'antd';
import './adminJobs.scss';
import moment from 'moment';

const { Title } = Typography;
const { Column } = Table;
const { Option } = Select;
const confirmModal = Modal.confirm;

class Jobs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobType: null,
            loading: false,
            userSearch: '',
            changeStatusLoading: false,
            bulkDeleteLoading: false,
            selectedJobsIds: [],
            currentPage: 1,
        };
    }

    componentDidMount() {
        let user = '';
        const { query } = this.props.location;
        const { params: { aLabId } } = this.props.match;
        if (query) {
            user = query.user;
        }
        const loader = message.loading('Loading..');
        this.setState({
            loading: true,
        });
        this.props.fetchJobs({
            type: '',
            user,
            page: 1,
            activeLabId: aLabId,
        }).then(res => {
            loader();
            this.setState({
                loading: false,
            });
            if (res === false) {
                message.error('Something went wrong, please try again.');
            }
        });
    }

    selectType = type => {
        this.setState({
            jobType: type,
            loading: true,
            selectedJobsIds: [],
            currentPage: 1,
        });

        const params = {
            type,
            user: this.state.userSearch,
            page: 1,
        };

        this.props.fetchJobs(params).then(res => {
            this.setState({
                loading: false,
            });
            if (res === false) {
                message.error('Something went wrong, please try again.');
            }
        });
    }

    removeJob = (e, id) => {
        confirmModal({
            title: 'Are you sure delete this job?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.props.deleteJob(id).then(res => {
                    if (res === true) {
                        message.success('Deleted.');
                    } else {
                        message.error(res.message);
                    }
                });
            },
        });
    }

    showInfo = (debug_info, job_resources) => {
        this.props.history.push('/platform/admin/jobs/info', {
            debug_info,
            job_resources,
        });
    }

    searchUser = e => {
        this.setState({
            userSearch: e.target.value,
            currentPage: 1,
        });

        const { jobType } = this.state;

        this.props.fetchJobs({
            type: jobType,
            user: e.target.value,
            page: 1,
        });
    }

    changeStatus = (id, status) => {
        confirmModal({
            title: `Are you sure you want to change this job status to '${status}'?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.setState({
                    changeStatusLoading: true,
                });
                this.props.changeJobStatus(id, status).then(res => {
                    if (res === true) {
                        message.success('Job status changed.');
                    } else {
                        message.error(res.message);
                    }

                    this.setState({
                        changeStatusLoading: false,
                    });
                });
            },
        });
    }

    onJobSelectChange = selectedJobsIds => {
        this.setState({
            selectedJobsIds,
        });
    }

    bulkDelete = () => {
        confirmModal({
            title: `Are you sure you want to delete selected ${this.state.selectedJobsIds.length} jobs?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => {
                this.setState({
                    bulkDeleteLoading: true,
                });

                this.props.bulkDeleteJobs(this.state.selectedJobsIds).then(res => {
                    if (res === true) {
                        this.setState({
                            selectedJobsIds: [],
                            bulkDeleteLoading: false,
                        });
                        message.success('Deleted.');
                    } else {
                        message.error(res.error);
                    }
                });
            },
        });
    }

    paginate = page => {
        const currentPage = page.current;

        this.setState({
            currentPage,
        });

        this.props.fetchJobs({
            user: this.state.userSearch,
            type: this.state.jobType,
            page: currentPage,
        });
    }

    menu = (id, status) => (
        <Menu className={`delete-job-dropdown-${status}`}>
            { status !== 'CREATING' && <Menu.Item key="CREATING" onClick={() => this.changeStatus(id, 'CREATING')}>CREATING</Menu.Item> }
            { status !== 'DESTROYING' && <Menu.Item key="DESTROYING" onClick={() => this.changeStatus(id, 'DESTROYING')}>DESTROYING</Menu.Item> }
            { status !== 'CREATED' && <Menu.Item key="CREATED" onClick={() => this.changeStatus(id, 'CREATED')}>CREATED</Menu.Item> }
            { status !== 'ERROR' && <Menu.Item key="ERROR" onClick={() => this.changeStatus(id, 'ERROR')}>ERROR</Menu.Item> }
        </Menu>
    )

    render() {
        const { data } = this.props.adminJobs;

        const {
            jobType, loading, userSearch, changeStatusLoading, selectedJobsIds, bulkDeleteLoading, currentPage,
        } = this.state;
        const jobSelection = {
            selectedRowKeys: selectedJobsIds,
            onChange: this.onJobSelectChange,
        };

        return (
            <div className="admin-jobs-container">
                <div className="page-title">
                    <Title>
                        Jobs
                    </Title>
                </div>

                <div className="select-box-container">
                    <Title level={4}>Status</Title>
                    <Select className="select-type" value={jobType} onChange={this.selectType}>
                        <Option value={null}>All</Option>
                        <Option value="in-progress">In progress</Option>
                        <Option value="creating">Creating</Option>
                        <Option value="destroying">Destroying</Option>
                        <Option value="created">Created</Option>
                        <Option value="failed">Failed</Option>
                    </Select>
                </div>

                <div className="delete-rows-box" hidden={!selectedJobsIds.length}>
                    <Button type="danger" onClick={this.bulkDelete} loading={bulkDeleteLoading}>Delete</Button>
                    <span className="jobs-count">
                        Selected jobs:
                        {selectedJobsIds.length}
                    </span>
                </div>

                <Table
                    rowSelection={jobSelection}
                    dataSource={data.data}
                    rowKey={item => item.id}
                    loading={loading}
                    onChange={this.paginate}
                    pagination={{
                        position: 'bottom',
                        current: currentPage,
                        pageSize: 10,
                        total: data.total,
                        defaultCurrent: 1,
                    }}
                >
                    <Column title="Id" dataIndex="id" key="id" />
                    <Column
                        title={() => (
                            <Input
                                value={userSearch}
                                placeholder="Search job by user"
                                onChange={this.searchUser}
                            />
                        )}
                        key="user"
                        render={(text, record) => (record.user.email)}
                    />
                    <Column
                        title="Status"
                        key="status"
                        render={(text, record) => {
                            const color = record.status === 'CREATING' ? 'blue' : record.status === 'CREATED' ? 'green' : 'red';
                            return (
                                <div className="dropdown-btn">
                                    <Tag color={color}>{record.status}</Tag>
                                    <Dropdown overlay={this.menu(record.id, record.status)}>
                                        <Button size="small" className={`color-btn-${color}`} loading={changeStatusLoading}>
                                            <Icon type="down" />
                                        </Button>
                                    </Dropdown>
                                </div>
                            );
                        }}
                    />
                    <Column
                        title="Progress"
                        key="progress"
                        render={(text, record) => {
                            const color = record.status === 'CREATING' ? '#1890ff' : record.status === 'CREATED' ? '#52c41a' : 'red';
                            return (<Progress percent={record.progress || 0} strokeColor={color} />);
                        }}
                    />
                    <Column
                        title="Scheduled deletion time"
                        render={(text, record) => (
                            record.scheduled_deletion_time
                                ? moment(record.scheduled_deletion_time).format('DD-MM-YYYY HH:mm:ss') : ''
                        )}
                    />
                    <Column
                        title="Actions"
                        key="actions"
                        width={200}
                        render={(text, record) => (
                            <div className="actions">
                                <Popover content="Show job info">
                                    <Button type="primary" shape="circle" icon="info-circle" onClick={() => this.showInfo(record.debug_info, record.job_resources)} />
                                </Popover>
                                <Popover content="Delete job">
                                    <Button type="danger" shape="circle" icon="delete" onClick={e => this.removeJob(e, record.id)} />
                                </Popover>
                            </div>
                        )}
                    />
                </Table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        adminJobs: state.adminJobs,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchJobs: params => dispatch(fetchJobs(params)),
        deleteJob: id => dispatch(deleteJob(id)),
        changeJobStatus: (id, status) => dispatch(changeJobStatus(id, status)),
        bulkDeleteJobs: ids => dispatch(bulkDeleteJobs(ids)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
