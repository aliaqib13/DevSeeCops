import React, { Component } from 'react';
import {
    Table, Empty, Typography, Button, Select,
} from 'antd';
import moment from 'moment';
import { CSVLink } from 'react-csv';

const { Column } = Table;
const { Title } = Typography;
const { Option } = Select;

export default class EventCertificates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            loadingTable: false,
            perPage: 10,
        };
    }

    paginate = page => {
        const { event_id: eventId, getEventCertificates } = this.props;
        const { perPage } = this.state;
        this.setState({
            currentPage: page,
            loadingTable: true,
        });

        return getEventCertificates(eventId, page, perPage).then(() => this.setState({
            loadingTable: false,
        }));
    }

    handleChange = value => {
        const { event_id: eventId, getEventCertificates } = this.props;
        this.setState({ perPage: value, loadingTable: true });
        return getEventCertificates(eventId, 1, value).then(() => this.setState({
            loadingTable: false,
        }));
    }

    render() {
        const { eventCertificates } = this.props;
        const { perPage, currentPage, loadingTable } = this.state;

        const tableData = eventCertificates && eventCertificates.data && eventCertificates.data.length
            ? eventCertificates.data.map(item => {
                let labTime;
                if (item.activeLab && item.activeLab.total_spin_up_time) {
                    const d = moment.duration(item.activeLab.total_spin_up_time, 'milliseconds');
                    const hours = Math.floor(d.asHours());
                    const mins = Math.floor(d.asMinutes()) - hours * 60;
                    labTime = `${hours}h:${mins}m`;
                } else {
                    labTime = 'None';
                }

                return {
                    user_name: `${item.users.firstname} ${item.users.lastname}`,
                    user_email: item.users.email,
                    course_name: item.courses.title,
                    lab_time: labTime,
                    lab_start_time: item.activeLab && item.activeLab.start_time ? moment(item.activeLab.start_time).format('MMM Do YYYY hh:mm') : 'None',
                    lab_end_time: item.activeLab && item.activeLab.lab_end_at ? moment(item.activeLab.lab_end_at * 1000.0).format('MMM Do YYYY hh:mm') : 'None',
                };
            }) : [];
        const showStyle = { marginLeft: '20px', marginRight: '10px' };
        return (
            <>
                {eventCertificates && eventCertificates.data && eventCertificates.data.length
                    ? (
                        <>
                            <Title level={4}>
                                Course Certificates for event -
                                {' '}
                                {eventCertificates.eventName}
                            </Title>
                            <CSVLink
                                className='export-csv'
                                data={tableData}
                                filename="event-certificates-data.csv"
                                target="_blank"
                            >
                                <Button type="primary" style={{ marginLeft: '20px' }}>Export CSV</Button>
                            </CSVLink>
                            <span style={showStyle}>Show</span>
                            <Select value={perPage} onChange={this.handleChange}>
                                <Option value="10">10</Option>
                                <Option value="all">All</Option>
                            </Select>
                            <Table
                                className='event-certificates-table'
                                size="lg"
                                pagination={perPage !== 'all' ? {
                                    onChange: this.paginate,
                                    pageSize: perPage,
                                    total: eventCertificates.total,
                                    current: currentPage,
                                    position: 'bottom',
                                    defaultCurrent: 1,
                                } : false}
                                dataSource={tableData}
                                loading={loadingTable}
                                rowKey={item => item.id}
                            >
                                <Column title="User Name" key="user_name" dataIndex="user_name" />
                                <Column title="User Email" key="user_email" dataIndex="user_email" />
                                <Column title="Course Name" key="course_name" dataIndex="course_name" />
                                <Column title="Lab time" key="lab_time" dataIndex="lab_time" />
                                <Column title="Lab Start Time" key="lab_start_time" dataIndex="lab_start_time" />
                                <Column title="Lab End Time" key="lab_end_time" dataIndex="lab_end_time" />
                            </Table>
                        </>
                    ) : <Empty />}
            </>
        );
    }
}
