import React, { Component } from 'react';
import {
    Button, Table, Modal,
} from 'antd';

const confirmModal = Modal.confirm;
const { Column } = Table;

class InterestedCourses extends Component {
    componentDidMount() {
        const { getPlannedCourses } = this.props;
        getPlannedCourses();
    }

    removeInterestedCourse = courseId => {
        const { deleteNotifyCourse, getPlannedCourses } = this.props;
        deleteNotifyCourse(courseId).then(() => {
            getPlannedCourses();
        }).catch(console.error);
    }

    handleRemove = courseId => {
        confirmModal({
            title: 'Are you sure delete this course?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.removeInterestedCourse(courseId);
            },
        });
    }

    render() {
    	const { notifyCourses } = this.props;
        return (
            <div>
                <Table dataSource={notifyCourses} rowKey='id'>
                    <Column
                        key='title'
                        title='Title'
                        dataIndex='course.title'
                    />

                    <Column
                        key='remove'
                        title="Remove"
                        render={item => (
                            <Button key={item.id} onClick={() => this.handleRemove(item.course_id)}>Remove</Button>
                        )}
                    />
                </Table>
            </div>
        );
    }
}

export default InterestedCourses;
