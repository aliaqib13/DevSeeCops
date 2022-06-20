import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import AddCourse from '../../editCourse/add/AddCourse';

export default class AddCourseModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmLoading: false,
        };
    }

    onClose = () => {
        this.props.onClose();
    }

    render() {
        const {
            confirmLoading, visible, courseTemplates, courseTypes,
        } = this.props;
        return (
            <Modal
                title="Add Course"
                width={960}
                visible={visible}
                confirmLoading={confirmLoading}
                onCancel={this.onClose}
                destroyOnClose
                footer={[
                    <Button onClick={this.onClose} key="onCancel">Close</Button>,
                ]}
            >
                <AddCourse
                    addNewCategory={this.props.addNewCategory}
                    deleteCategory={this.props.deleteCategory}
                    categories={this.props.categories}
                    createCourse={this.props.createCourse}
                    uploadCourseImage={this.props.uploadCourseImage}
                    uploadVideo={this.props.uploadFile}
                    updateTags={this.props.updateTags}
                    fetchTags={this.props.fetchTags}
                    searchByCourseTags={this.props.searchByCourseTags}
                    courseTemplates={courseTemplates}
                    courseTypes={courseTypes}
                />
            </Modal>
        );
    }
}
