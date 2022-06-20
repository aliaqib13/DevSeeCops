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
        const { onClose } = this.props;
        onClose();
    }

    render() {
        const {
            visible, courseTypes, addNewCategory, deleteCategory, categories, createCourse,
            uploadCourseImage, uploadFile, updateTags, fetchTags, searchByCourseTags,
        } = this.props;
        const { confirmLoading } = this.state;
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
                    addNewCategory={addNewCategory}
                    deleteCategory={deleteCategory}
                    categories={categories}
                    createCourse={createCourse}
                    uploadCourseImage={uploadCourseImage}
                    is_template
                    uploadVideo={uploadFile}
                    updateTags={updateTags}
                    fetchTags={fetchTags}
                    searchByCourseTags={searchByCourseTags}
                    courseTypes={courseTypes}
                />
            </Modal>
        );
    }
}
