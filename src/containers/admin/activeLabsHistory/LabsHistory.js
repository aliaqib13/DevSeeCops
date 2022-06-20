import React, { Component } from 'react';
import {
    Checkbox, Typography, Table, Button, Progress, message, Modal, Input, Select, Tag, Dropdown, Icon, Menu,
} from 'antd';
import moment from 'moment';
import './activeLabHistory.scss';

const { Title } = Typography;
const { TextArea } = Input;
const { Column } = Table;
const confirmModal = Modal.confirm;
const { Option, OptGroup } = Select;

const JOB_STATUSES = {
    SCHEDULED: 'SCHEDULED',
    CREATING: 'CREATING',
    CREATED: 'CREATED',
    DESTROYING: 'DESTROYING',
    DESTROYED: 'DESTROYED',
    ERROR: 'ERROR',
};

class LabsHistory extends Component {
    constructor(props) {
        super(props);
        this.interval = null;
        this.debounceTimer = null;
        this.state = {
            loading: true,
            userSearch: '',
            statusSearch: '',
            progressSearch: '',
            currentPage: 1,
            filterOutDSOA: false,
            emailModal: false,
            selectedLab: null,
            emailText: '',
            sendEmail: true,
        };
    }

    fetchActiveLabsHistory() {
        const { fetchActiveLabsHistory } = this.props;
        const {
            userSearch, statusSearch, filterOutDSOA, progressSearch, currentPage,
        } = this.state;
        this.setState({
            loading: true,
        }, () => fetchActiveLabsHistory({
            userSearch, statusSearch, filterOutDSOA, progressSearch,
        }, currentPage).then(() => {
            this.setState({
                loading: false,
            });
            this.__setActiveLabsInterval();
        }).catch(error => console.log('Something went wrong fetching labs: ', error)));
    }

    componentDidMount() {
        this.fetchActiveLabsHistory();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.interval = null;
    }

    debounceInput(func, delay) {
        clearTimeout(this.debounceTimer);

        this.debounceTimer = setTimeout(func, delay);
    }

    __setActiveLabsInterval() {
        clearInterval(this.interval);
        this.interval = setInterval(() => this.fetchActiveLabsHistory(), 15000);
    }

    handleSearch = e => {
        this.setState({
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
            currentPage: 1,
        },
        this.debounceInput(() => this.fetchActiveLabsHistory(), 500));
    }

    jobInfo = (email, aLabId) => {
        const { history } = this.props;
        history.push({
            pathname: `/platform/admin/jobs/${aLabId}`,
            query: { user: email },
        });
    }

    destroyLab = (email, courseId, labId, aLabId) => {
        const { deleteActiveLabHistory } = this.props;
        confirmModal({
            title: 'Are you sure delete this active lab?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                const loader = message.loading('Loading..');
                deleteActiveLabHistory({
                    email,
                    course_id: courseId,
                    lab_id: labId,
                }, aLabId).then(res => {
                    if (res === true) {
                        this.fetchActiveLabsHistory();
                        message.success('Lab destroying process started.');
                    } else {
                        message.error(res.message);
                    }
                    loader();
                });
            },
        });
    }

    selectTime = (value, id) => {
        const { setDuration } = this.props;
        setDuration(id, value).then(res => {
            if (res === true) {
                message.success('Duration changed!');
            } else {
                message.error(res.message);
            }
        });
    }

    success = () => {
        const hide = message.loading('Fetching report and opening in new tab...', 0);
        // Dismiss manually and asynchronously
        setTimeout(hide, 2500);
    }

    getLabReport = id => {
        const { getLabReport } = this.props;
        this.success();
        getLabReport(id).then(res => {
            if (res) {
                window.open(res.data, '_blank');
            } else {
                message.error(res.message);
            }
        });
    }

    getLabStages = id => {
        const { checkLabStages } = this.props;
        checkLabStages(id).then(res => {
            if (res) {
                Modal.success({
                    content: JSON.stringify(res.data),
                });
            } else {
                message.error(res.message);
            }
        });
    }

    confirmChangeStatus =(e, id) => {
        e.preventDefault();
        const { updateActiveLabStatus } = this.props;
        const data = { completed: true };

        confirmModal({
            title: 'Are you sure Change this lab status to Completed?',
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk: () => {
                const loader = message.loading('Complete Lab and generate Certificate', 0);
                updateActiveLabStatus(id, data).then(res => {
                    loader();
                    if (res === true) {
                        this.fetchActiveLabsHistory();
                        message.success(('Lab is Completed'));
                    } else {
                        message.error(res.message);
                    }
                });
            },
        });
    }

    onChangeSendEmailState = () => {
        this.setState(prevState => ({
            sendEmail: !prevState.sendEmail,
        }));
    };

    handleLabReject = id => {
        const { sendEmail } = this.state;
        const { updateActiveLabStatus } = this.props;
        const data = { completed: false, sendEmail };
        return updateActiveLabStatus(id, data).then(res => {
            if (res === true) {
                this.fetchActiveLabsHistory();
                message.success(('Lab is rejected'));
            } else {
                message.error(res.message);
            }
        });
    }

    confirmChangeStatusReject = (e, id) => {
        e.preventDefault();
        confirmModal({
            title: 'Are you sure you want to reject this lab?',
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            content:
    <Checkbox
        className="send-email-checkbox"
        defaultChecked
        onChange={() => this.onChangeSendEmailState()}
    >
        Send an email
    </Checkbox>,
            onOk: () => this.handleLabReject(id),
        });
    }

    paginate = page => {
        this.setState({
            currentPage: page.current,
        },
        () => this.fetchActiveLabsHistory());
    }

    resetChecker = activeLabId => {
        const { resetChecker } = this.props;
        confirmModal({
            title: 'Are you sure you want to reset the checker for this active lab?',
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk: () => {
                resetChecker(activeLabId).then(res => {
                    if (res === true) {
                        message.success(('Lab checker is reset'));
                    } else {
                        message.error(res.message || 'Something went wrong');
                    }
                });
            },
        });
    }

    resetLab = (email, courseId, labId, aLabId, isReset = true) => {
        const {
            getAuthUser,
            adminActiveLabsHistory,
            notifyUserAboutLabReset,
            deleteActiveLabHistory,
        } = this.props;
        confirmModal({
            title: 'Are you sure to reset this active lab?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                message.loading('Loading..');
                deleteActiveLabHistory({
                    email,
                    course_id: courseId,
                    lab_id: labId,
                    is_reset: isReset,
                }, aLabId)
                    .then(res => {
                        if (res === true) {
                            this.fetchActiveLabsHistory();
                            getAuthUser();
                            message.success('Lab destroying process started. Please wait...');
                            const interrval = setInterval(() => {
                                const { labs } = adminActiveLabsHistory;
                                const activeLab = labs.data.find(item => item.id === aLabId);
                                if (activeLab && activeLab.jobs.length > 0 && activeLab.jobs[activeLab.jobs.length - 1]
                                && activeLab.jobs[activeLab.jobs.length - 1].status === 'DESTROYED') {
                                    notifyUserAboutLabReset(email, activeLab.lab.name);
                                    clearInterval(interrval);
                                    message.success('Active lab is successfully reset!');
                                }
                            }, 3000);
                        } else {
                            message.error(res.message);
                        }
                    });
            },
        });
    }

    toggleEmailModal = (id, firstname) => {
        const { adminActiveLabsHistory } = this.props;
        const { emailModal } = this.state;
        const { data } = adminActiveLabsHistory.labs;
        const selectedLab = data.find(item => item.id === id);
        this.setState({
            selectedLab,
            emailModal: !emailModal,
            emailText: `Hi ${firstname},\n\nKind regards,\nDevSecOps Academy Team`,
        });
    }

    changeEmailText = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    closeModal = () => {
        this.setState({
            emailText: '',
            emailModal: false,
            selectedLab: null,
        });
    }

    sendEmail = () => {
        const { selectedLab } = this.state;
        const { sendEmailToUser } = this.props;
        const { user } = selectedLab;
        const { emailText } = this.state;
        if (!emailText) {
            return message.error('Please insert data');
        }
        const loader = message.loading('send email....', 0);
        sendEmailToUser({ user, text: emailText }).then(res => {
            loader();
            if (res === true) {
                message.success('email sent');
                return this.closeModal();
            }
            return message.error(res);
        }).catch(err => console.log('Error sending email: ', err));
    }

    static getRelevantJob(jobs = []) {
        // Determine the relevant job for this lab from a collection of jobs:
        const latestJob = jobs[jobs.length - 1];
        const secondToLastJob = jobs[jobs.length - 2];

        const relevantJob = (
            !!secondToLastJob // check second to last job exists
            && (
                secondToLastJob.status === JOB_STATUSES.CREATING // if it's CREATING
                || (secondToLastJob.status === JOB_STATUSES.CREATED && latestJob.progress === 0) // or is CREATED and the next job has no progress
            )
        ) ? secondToLastJob : latestJob;

        return relevantJob;
    }

    render() {
        const { adminActiveLabsHistory: { labs } } = this.props;
        const {
            userSearch, filterOutDSOA, loadingDestroyLab, loading, currentPage, emailModal, selectedLab, emailText,
        } = this.state;

        return (
            <div className="active-lab-container">
                <div className="page-title">
                    <Title>
                        Labs History
                    </Title>
                    <Checkbox
                        onChange={this.handleSearch}
                        name='filterOutDSOA'
                        checked={filterOutDSOA}
                    >
                        Hide labs from info@devsecops-academy.com
                    </Checkbox>
                </div>
                {
                    labs
                    && (
                        <div>
                            <Table
                                loading={loading}
                                dataSource={labs.data}
                                rowKey={item => item.id}
                                onChange={this.paginate}
                                pagination={{
                                    position: 'bottom',
                                    current: currentPage,
                                    pageSize: 10,
                                    total: labs.total,
                                    defaultCurrent: 1,

                                }}
                                data-testid="activeLabHistoryTable"
                            >
                                <Column title="Name" dataIndex="lab.name" key="name" />
                                <Column title="Platform" dataIndex="lab.platform" key="platform" />
                                <Column
                                    title={() => (
                                        <Input
                                            value={userSearch}
                                            placeholder="Search lab by user"
                                            onChange={this.handleSearch}
                                            name="userSearch"
                                        />
                                    )}
                                    dataIndex="user.email"
                                    key="info"
                                />
                                <Column
                                    title="Start time"
                                    render={record => {
                                        const { start_time: startTime } = record;
                                        const time = moment(startTime).format('DD-MM-YYYY HH:mm:ss');
                                        const timeSinceStart = moment(startTime).fromNow();
                                        const validTime = timeSinceStart !== 'Invalid date';
                                        return (
                                            <>
                                                <p style={{ marginBottom: '2px' }}>{time}</p>
                                                {validTime && <span>{timeSinceStart}</span>}
                                            </>
                                        );
                                    }}
                                />
                                <Column
                                    title="End time"
                                    render={(text, record) => (
                                        record.lab_end_at ? moment.unix(record.lab_end_at).format('DD-MM-YYYY HH:mm:ss') : 'Lab is reset'
                                    )}
                                />
                                <Column
                                    title={() => (
                                        <Select
                                            placeholder="Search By Progress"
                                            style={{ width: 200 }}
                                            onChange={e => this.handleSearch({ target: { name: 'progressSearch', value: e } })}
                                        >
                                            <OptGroup label="Progress">
                                                <Option value="" key="all">All</Option>
                                                {Object.values(JOB_STATUSES).map(progress => (
                                                    <Option value={progress} key={progress}>{progress}</Option>
                                                ))}
                                            </OptGroup>
                                        </Select>
                                    )}
                                    dataIndex="progress"
                                    key="progress"
                                    render={(text, record) => {
                                        const relevantJob = LabsHistory.getRelevantJob(record.jobs);

                                        // If we can't find a relevant job, return default:
                                        if (!relevantJob) {
                                            return (<Progress percent={0} strokeColor="red" />);
                                        }

                                        // Determine colour of the progress bar:
                                        const COLOUR_MAP = {
                                            [JOB_STATUSES.CREATING]: '#1890ff',
                                            [JOB_STATUSES.CREATED]: '#52c41a',
                                        };
                                        // Create progress bar:
                                        return (<Progress percent={relevantJob.progress || 0} strokeColor={COLOUR_MAP[relevantJob.status] || 'red'} />);
                                    }}
                                />
                                <Column
                                    title="Duration"
                                    dataIndex="duration"
                                    key="duration"
                                    render={(text, record) => (
                                        <Select
                                            value={`${record.duration}h`}
                                            style={{ width: 120 }}
                                            onChange={value => this.selectTime(value, record.id)}
                                        >
                                            <Option value="24">24h</Option>
                                            <Option value="12">12h</Option>
                                            <Option value="8">8h</Option>
                                            <Option value="4">4h</Option>
                                            <Option value="3">3h</Option>
                                            <Option value="2">2h</Option>
                                            <Option value="1">1h</Option>
                                            <Option value="0.1">6m</Option>
                                        </Select>
                                    )}
                                />
                                <Column
                                    title='Actions'
                                    key='actions'
                                    render={(text, record) => {
                                        // Get relevant job, or default to empty object
                                        const relevantJob = LabsHistory.getRelevantJob(record.jobs) || {};
                                        return (
                                            <div className="active-labs-actions-container">
                                                <Dropdown overlay={(
                                                    <Menu>
                                                        <Menu.Item
                                                            onClick={() => this.jobInfo(record.user.email, record.id)}
                                                        >
                                                            Jobs
                                                        </Menu.Item>
                                                        <Menu.Item
                                                            onClick={() => this.resetLab(record.user.email,
                                                                record.activeCourse.course_id,
                                                                record.lab_id,
                                                                record.id)}
                                                        >
                                                            Reset
                                                        </Menu.Item>
                                                        <Menu.Item onClick={() => this.resetChecker(record.id)}>
                                                            Reset Checker
                                                        </Menu.Item>
                                                        <Menu.Item
                                                            onClick={() => this.toggleEmailModal(record.id,
                                                                record.user.firstname)}
                                                        >
                                                            Send Email
                                                        </Menu.Item>
                                                        <Menu.Item
                                                            loading={loadingDestroyLab}
                                                            onClick={() => this.destroyLab(record.user.email,
                                                                record.activeCourse.course_id,
                                                                record.lab_id,
                                                                record.id)}
                                                        >
                                                            Delete
                                                            {' '}
                                                            <Icon type="delete" />
                                                        </Menu.Item>
                                                        {
                                                            record.lab.automated_checking && relevantJob.status === 'CREATED' ? (
                                                                <Menu.Item onClick={() => this.getLabReport(record.id)}>
                                                                    Report
                                                                    {' '}
                                                                    <Icon type="solution" />
                                                                </Menu.Item>
                                                            )
                                                                : ''
                                                        }
                                                        {
                                                            record.lab.automated_checking && relevantJob.status === 'CREATED' ? (
                                                                <Menu.Item onClick={() => this.getLabStages(record.id)}>
                                                                    Automatic Check
                                                                    {' '}
                                                                    <Icon type="bars" />
                                                                </Menu.Item>
                                                            )
                                                                : ''
                                                        }
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
                                        );
                                    }}
                                />
                                <Column
                                    title={() => (
                                        <Select
                                            placeholder="Search By Status"
                                            style={{ width: 200 }}
                                            onChange={e => this.handleSearch({ target: { name: 'statusSearch', value: e } })}
                                        >
                                            <OptGroup label="Status">
                                                <Option value="">All</Option>
                                                <Option value="Pending">Pending</Option>
                                                <Option value="Done">Done</Option>
                                                <Option value="Completed">Completed</Option>
                                            </OptGroup>
                                        </Select>
                                    )}
                                    key="status"
                                    render={record => {
                                        const { id } = record;
                                        return (
                                            <div className="actions-btns">

                                                {
                                                    record.progress === 'Pending'
                                                        ? <Tag color="grey">{record.progress}</Tag> : ''
                                                }

                                                {
                                                    record.progress === 'Done'
                                                        ? (
                                                            <>
                                                                <Button type="primary" className="approve-btn" shape="round" onClick={e => this.confirmChangeStatus(e, id)}>
                                                                    Approve
                                                                </Button>
                                                                <Button type="danger" className="reject-btn" shape="round" onClick={e => this.confirmChangeStatusReject(e, id)}>Reject</Button>
                                                            </>
                                                        ) : ''
                                                }

                                                {
                                                    record.progress === 'Completed'
                                                        ? <Tag color="green">{record.progress}</Tag> : ''
                                                }

                                            </div>
                                        );
                                    }}
                                />
                            </Table>
                        </div>
                    )
                }
                {
                    (emailModal)
                    && (
                        <Modal
                            visible={emailModal}
                            title={`Send Email to ${selectedLab.user.firstname} ${selectedLab.user.lastname} (${selectedLab.user.email})`} // eslint-disable-line max-len
                            onOk={this.handleOk}
                            onCancel={this.closeModal}
                            footer={[
                                <Button key="back" onClick={this.closeModal}>
                                    Cancel
                                </Button>,
                                <Button key="submit" type="primary" loading={loading} onClick={this.sendEmail}>
                                    Send Email
                                </Button>,
                            ]}
                        >
                            <TextArea autoSize={{ minRows: 7, maxRows: 50 }} name="emailText" value={emailText} onChange={this.changeEmailText} />
                        </Modal>
                    )
                }
            </div>
        );
    }
}

export default LabsHistory;
