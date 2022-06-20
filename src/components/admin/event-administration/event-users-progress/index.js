import React, { Component } from 'react';
import {
    Table, Empty, Typography, Button, Select,
} from 'antd';
import moment from 'moment';
import { CSVLink } from 'react-csv';

const { Column } = Table;
const { Title } = Typography;
const { Option } = Select;

export default class EventUsersProgress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            loadingTable: false,
            perPage: 10,
        };
    }

    paginate = page => {
        const { event_id } = this.props;
        const { perPage } = this.state;
        this.setState({
            currentPage: page,
            loadingTable: true,
        });

        this.props.getEventUsersProgress(event_id, page, perPage).then(() => {
            this.setState({
                loadingTable: false,
            });
        });
    }

    handleChange = value => {
        const { event_id } = this.props;
        this.setState({ perPage: value, loadingTable: true });
        this.props.getEventUsersProgress(event_id, 1, value).then(() => {
            this.setState({
                loadingTable: false,
            });
        });
    }

    render() {
        const { usersProgress } = this.props;
        const tableData = usersProgress && usersProgress.data && usersProgress.data.length ? usersProgress.data.map(item => {
            let hands_on_lab;
            if (item.hands_on_lab && item.hands_on_lab.total_spin_up_time) {
                const d = moment.duration(item.hands_on_lab.total_spin_up_time, 'milliseconds');
                const hours = Math.floor(d.asHours());
                const mins = Math.floor(d.asMinutes()) - hours * 60;
                hands_on_lab = `Total spin up time - ${`${hours}h:${mins}m`}, Total spin ups - ${item.hands_on_lab.total_spin_ups}`;
            } else {
                hands_on_lab = 'Not Completed';
            }

            return {
                user_name: item.user_name,
                course_name: item.course_name,
                user_level: item.user_level,
                quiz: item.quiz && item.quiz.failed >= 0
                    ? `Failed - ${item.quiz.failed}, Succeeded - ${item.quiz.succeeded}`
                    : 'Not completed',
                hands_on_lab,
            };
        }) : [];
        const showStyle = { marginLeft: '20px', marginRight: '10px' };
        return (
            <>
                {usersProgress && usersProgress.data && usersProgress.data.length
                    ? (
                        <>
                            <Title level={4}>
                                Users Progress for event -
                                {' '}
                                {usersProgress.eventName}
                            </Title>
                            <CSVLink
                                data={tableData}
                                filename="users-progress-data.csv"
                                target="_blank"
                            >
                                <Button type="primary" style={{ marginLeft: '20px' }}>Export CSV</Button>
                            </CSVLink>
                            <span style={showStyle}>Show</span>
                            <Select value={this.state.perPage} onChange={this.handleChange}>
                                <Option value="10">10</Option>
                                <Option value="all">All</Option>
                            </Select>
                            <Table
                                size="lg"
                                pagination={this.state.perPage !== 'all' ? {
                                    onChange: this.paginate,
                                    pageSize: this.state.perPage,
                                    total: usersProgress.total,
                                    current: this.state.currentPage,
                                    position: 'bottom',
                                    defaultCurrent: 1,
                                } : false}
                                dataSource={tableData}
                                loading={this.state.loadingTable}
                                rowKey={item => item.id}
                            >
                                <Column title="User Name" key="user_name" dataIndex="user_name" />
                                <Column title="Course Name" key="course_name" dataIndex="course_name" />
                                <Column title="User Level" key="user_level" dataIndex="user_level" />
                                <Column title="Quiz" key="quiz" dataIndex="quiz" />
                                <Column title="Hands On Lab" key="hands_on_lab" dataIndex="hands_on_lab" />
                            </Table>
                        </>
                    ) : <Empty />}
            </>
        );
    }
}
