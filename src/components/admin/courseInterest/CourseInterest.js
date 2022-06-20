import React, { Component } from 'react';
import {
    Table, Button, Icon, Typography,
} from 'antd';
import CourseInterestDrawer from './CourseInterestDrawer';

const { Column } = Table;
const { Title } = Typography;

class CourseInterest extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            selectedCourseId: null,
        };
    }

    view = courseId => {
        this.setState({ visible: true, selectedCourseId: courseId });
    }

    closeDrawer = () => {
        this.setState({ visible: false });
    }

    getSelectedData = () => {
        const { courseInterests } = this.props;
        const { selectedCourseId } = this.state;
        return selectedCourseId
            ? courseInterests.find(course => selectedCourseId === course.id).plannedCourseUsers
            : [];
    }

    render() {
        const { courseInterests } = this.props;
        const { visible } = this.state;
        return (
            <>
                <Title>Course Interested</Title>
                <Table dataSource={courseInterests} rowKey={item => item.id} pagination={false}>
                    <Column title="Title" dataIndex="title" />
                    <Column
                        title="Users"
                        render={(text, record) => (
                            <Button type="link" onClick={() => this.view(record.id)}>
                                {record.plannedCourseUsers.length}
                                {' '}
                                Users
                                <Icon type="right" />
                            </Button>
                        )}
                    />
                </Table>
                <CourseInterestDrawer
                    visible={visible}
                    data={this.getSelectedData()}
                    closeDrawer={this.closeDrawer}
                />
            </>
        );
    }
}

export default CourseInterest;
