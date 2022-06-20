import React, { Component } from 'react';
import { Typography, Table, Progress } from 'antd';
import './manager.scss';

const { Title, Text } = Typography;
const { Column } = Table;

const dataSource = [
    {
        key: '1',
        groupName: 'Stratus',
        members: 25,
        progress: 25,
        status: 'Available',
        assignedCourses: 10,
        coursesInProgress: 6,
        finishedCourses: 4,
    },
    {
        key: '2',
        groupName: 'Solo',
        members: 32,
        progress: 97,
        status: 'Available',
        assignedCourses: 8,
        coursesInProgress: 1,
        finishedCourses: 7,
    },
    {
        key: '3',
        groupName: 'Pipes',
        members: 16,
        progress: 33,
        status: 'Available',
        assignedCourses: 11,
        coursesInProgress: 5,
        finishedCourses: 6,
    },
    {
        key: '4',
        groupName: 'Tikkie',
        members: 7,
        progress: 10,
        status: 'Available',
        assignedCourses: 7,
        coursesInProgress: 5,
        finishedCourses: 2,
    },
    {
        key: '5',
        groupName: 'Channels',
        members: 23,
        progress: 56,
        status: 'Available',
        assignedCourses: 9,
        coursesInProgress: 6,
        finishedCourses: 3,
    },
    {
        key: '6',
        groupName: 'Open Banking',
        members: 14,
        progress: 27,
        status: 'Available',
        assignedCourses: 13,
        coursesInProgress: 9,
        finishedCourses: 4,
    },
];

class Manager extends Component {
    render() {
        return (
            <div className="admin-manager-container">
                <div className="manager-header">
                    <Title>Manager Dashboard</Title>
                </div>
                <div className="manager-body">
                    <div className="manager-body-cards">
                        <div className="manager-body-cards-item">
                            <Text strong>Contracted</Text>
                            <Text strong>100</Text>
                        </div>
                        <div className="manager-body-cards-item">
                            <Text strong>Assigned to members</Text>
                            <Text strong>58</Text>
                        </div>
                        <div className="manager-body-cards-item">
                            <Text strong>Open for assignment</Text>
                            <Text strong>42</Text>
                        </div>
                    </div>
                    <Table dataSource={dataSource}>
                        <Column
                            title='#'
                            dataIndex='key'
                        />
                        <Column
                            title='Group name'
                            dataIndex='groupName'
                            key='groupName'
                            align="left"
                        />
                        <Column
                            title='Members'
                            dataIndex='members'
                            key='members'
                            align="center"
                        />
                        <Column
                            title='Progress (%)'
                            dataIndex='progress'
                            key='progress'
                            align="center"
                            render={percent => (
                                <Progress percent={percent} status="active" size="small" showInfo={false} />
                            )}
                        />
                        <Column
                            title='Status'
                            dataIndex='status'
                            key='status'
                            align="center"
                            render={text => (
                                <Text style={{ color: '#52c41a' }}>{text}</Text>
                            )}
                        />
                        <Column
                            title='Assigned courses'
                            dataIndex='assignedCourses'
                            key='assignedCourses'
                            align="center"
                        />
                        <Column
                            title='Courses in progress'
                            dataIndex='coursesInProgress'
                            key='coursesInProgress'
                            align="center"
                        />
                        <Column
                            title='Finished courses'
                            dataIndex='finishedCourses'
                            key='finishedCourses'
                            align="center"
                        />
                    </Table>
                </div>
            </div>

        );
    }
}
export default Manager;
