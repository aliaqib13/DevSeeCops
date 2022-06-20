import React, { Component } from 'react';
import {
    Table, Typography, Button, Icon,
} from 'antd';
import CourseStatusDrawer from '../course-status-drawer';

const { Title } = Typography;
const { Column } = Table;

class CourseDevelopmentDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            drawerVisible: false,
            status: '',
        };
    }

    showDrawer = status => {
        this.toggleDrawer(status);
        this.props.getCoursesByStatus(status);
    }

    toggleDrawer = status => {
        this.setState({ drawerVisible: !this.state.drawerVisible, status });
    }

    render() {
        const { statuses, coursesByStatus, getCoursesByStatus } = this.props;
        const { drawerVisible, status } = this.state;
        return (
            <>
                <Title>
                    Course Statuses
                </Title>
                <Table dataSource={statuses} rowKey={item => item.name}>
                    <Column title="Status" key="status" dataIndex="name" />
                    <Column title="Number of courses" key="number_of_courses" dataIndex="number" />
                    <Column
                        title="Actions"
                        key="actions"
                        render={(text, record) => (
                            <Button type="link" onClick={() => this.showDrawer(record.name)}>
                                View
                                <Icon type="right" />
                            </Button>
                        )}
                    />
                </Table>
                <CourseStatusDrawer
                    visible={drawerVisible}
                    onClose={() => this.toggleDrawer('')}
                    coursesByStatus={coursesByStatus}
                    status={status}
                    getCoursesByStatus={getCoursesByStatus}
                />
            </>
        );
    }
}

export default CourseDevelopmentDashboard;
