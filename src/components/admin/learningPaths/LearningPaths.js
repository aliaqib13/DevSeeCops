import React, { Component } from 'react';
import {
    Table, Button, Dropdown, Menu, Icon, Typography, Modal, message,
} from 'antd';
import LearningPathEdit from './LearningPathEdit';

const { Column } = Table;
const { Title } = Typography;
const confirmModal = Modal.confirm;

class LearningPaths extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            learningPath: {},
            type: 'edit',
            deleteLoading: false,
            currentId: '',
        };
        this.editModal = React.createRef();
    }

    openEditModal = id => {
        const { introByCategory, learningPaths } = this.props;
        const learningPathObj = learningPaths.find(item => item.id === id);
        const keys = ['title', 'description', 'category_id', 'exam_course_id', 'resource_url'];
        const learningPath = Object.keys(learningPathObj).filter(key => keys.includes(key)).reduce((obj, key) => {
            obj[key] = learningPathObj[key];
            return obj;
        }, {});
        const resourceType = learningPathObj.resource_url && learningPathObj.resource_url.split('.').pop() === 'mp4' ? 'video' : 'image';
        learningPath.resource_type = resourceType;
        learningPath.selected_courses_titles = learningPathObj.courses.map(item => item.course.title);
        learningPath.introduction_course_name = introByCategory ? introByCategory.title : null;
        this.setState({
            visible: true, learningPath, type: 'edit', currentId: id,
        }, () => {
            this.editModal.current && this.editModal.current.setData();
        });
    }

    closeModal = () => {
        this.setState({ visible: false });
    }

    delete = id => {
        confirmModal({
            title: 'Are you sure you want to delete this learning path?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.setState({
                    deleteLoading: true,
                });
                message.loading('Deleting...');
                this.props.deleteLearningPath(id).then(res => {
                    this.setState({
                        deleteLoading: false,
                    });

                    if (res === true) {
                        message.destroy();
                        message.success('Deleted.');
                        this.props.getLearningPaths();
                    } else if (res.errors) {
                        res.errors.forEach(item => {
                            message.error(item.message);
                        });
                    } else {
                        message.error(res.message);
                    }
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    openAddModal = () => {
        const { introByCategory, category } = this.props;
        const learningPath = {};
        learningPath.introduction_course_name = introByCategory ? introByCategory.title : null;
        learningPath.category_id = category.id;
        this.setState({ visible: true, learningPath, type: 'create' }, () => {
            this.editModal.current && this.editModal.current.setData();
        });
    }

    render() {
        const {
            learningPaths, category, introCourses, examCourses, courses, uploadImage, uploadVideo,
            createLearningPath, editLearningPath, getLearningPaths, getIntroductionByCategory, introByCategory,
        } = this.props;
        const {
            visible, learningPath, type, deleteLoading, currentId,
        } = this.state;
        return (
            <div className='learning-paths-list'>
                <Title>Learning Paths</Title>
                <Button type="primary" onClick={this.openAddModal}>Create</Button>
                <Table size="lg" loading={false} dataSource={learningPaths} rowKey={item => item.id} pagination={false}>
                    <Column title="Title" key="title" dataIndex="title" />
                    <Column title="Description" key="description" dataIndex="description" />
                    <Column
                        title="Actions"
                        key="actions"
                        render={item => (
                            <Dropdown overlay={(
                                <Menu>
                                    <Menu.Item onClick={() => this.openEditModal(item.id)}>
                                        Edit
                                        {' '}
                                        <Icon type="edit" />
                                    </Menu.Item>
                                    <Menu.Item onClick={() => this.delete(item.id)}>
                                        Delete
                                        {' '}
                                        {deleteLoading ? <Icon type="loading" /> : <Icon type="delete" />}
                                    </Menu.Item>
                                </Menu>
                            )}
                            >
                                <Button>
                                    Actions
                                    {' '}
                                    <Icon type="down" />
                                </Button>
                            </Dropdown>
                        )}
                    />
                </Table>
                <LearningPathEdit
                    visible={visible}
                    closeModal={this.closeModal}
                    learningPath={learningPath}
                    ref={this.editModal}
                    typeOfAction={type}
                    category={category}
                    introCourses={introCourses}
                    examCourses={examCourses}
                    courses={courses}
                    uploadVideo={uploadVideo}
                    uploadImage={uploadImage}
                    createLearningPath={createLearningPath}
                    editLearningPath={editLearningPath}
                    id={currentId}
                    getLearningPaths={getLearningPaths}
                    getIntroductionByCategory={getIntroductionByCategory}
                    introByCategory={introByCategory}
                />
            </div>
        );
    }
}

export default LearningPaths;
