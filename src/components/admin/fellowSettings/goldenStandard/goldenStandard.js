import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Button, Card, Descriptions, Input, List, message, Modal, Row, Tooltip, Typography,
} from 'antd';
import AddCourseModal from './AddCourseModal';
import './golden-standard.scss';
import { COURSE_STATUSES } from '../../../../constants';

const { Title, Text } = Typography;

class GoldenStandard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coursesCount: 8,
            addCourseModalVisible: false,
            courseSlugModel: false,
            courseSlug: '',
        };
    }

    componentDidMount() {
        const { getGoldenStandardTag } = this.props;
        getGoldenStandardTag().then(res => {
            if (res !== false) {
                this.setState({
                    courseSlug: res,
                });
            }
        }).catch(console.error);
    }

    toggleAddCourseModal = () => {
        this.setState(prevState => ({ addCourseModalVisible: !prevState.addCourseModalVisible }));
    }

    toggleSlugModel = () => {
        this.setState(prevState => ({ courseSlugModel: !prevState.courseSlugModel }));
    }

    addSlug = () => {
        const { courseSlug } = this.state;
        const { addGoldenStandardSlug } = this.props;
        const loader = message.loading('', 0);
        addGoldenStandardSlug({ courseSlug }).then(res => {
            loader();
            if (res !== false) {
                message.success('updated..');
                this.toggleSlugModel();
            } else {
                message.error('something went wrong please try again');
            }
        }).catch(console.error);
    }

    onChangeSlug = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    editCourse(e, courseId) {
        const { history } = this.props;
        history.push(`/platform/admin/edit-course/${courseId}`);
    }

    render() {
        const {
            courseTemplates, courseTypes, createCategory, deleteCategory, categories, createCourse, uploadFile,
            updateTags, fetchTags, searchByCourseTags,
        } = this.props;
        const {
            coursesCount, addCourseModalVisible, courseSlugModel, courseSlug,
        } = this.state;

        return (
            <div className="golden-standard-container">
                <div>
                    <Button type="primary" className="add-fellow-button" onClick={this.toggleAddCourseModal}>
                        Create
                        Golden Standard
                    </Button>
                    <Button type="primary" className="add-slug-btn" onClick={this.toggleSlugModel}>
                        Set Default Golden
                        Standard
                    </Button>
                </div>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    className="antList"
                    dataSource={courseTemplates}
                    pagination={{
                        pageSize: coursesCount,
                        position: 'both',
                    }}
                    renderItem={item => {
                        const courseDuration = item.theory_duration ? +item.theory_duration.replace('m', '') : null;
                        return (
                            <List.Item className="courses-item">
                                <Card
                                    className="courses-card"
                                    cover={(
                                        <div>
                                            <div className="coursesImageDiv" style={{ background: `url(${item.image})` }} />
                                        </div>
                                    )}
                                    extra={(
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                            <Tooltip mouseEnterDelay={0.5} title="Value rating">
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src="/img/star.svg" alt="star" />
                                                    <div
                                                        className="value-rating"
                                                        style={{
                                                            marginLeft: '8px',
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        { item.value_rating || 0 }
                                                    </div>
                                                </div>
                                            </Tooltip>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }} />
                                        </div>
                                    )}
                                    key={item.title}
                                    hoverable={item.status === COURSE_STATUSES.PRODUCTION || !!item.publicly_visible}
                                >
                                    <Row align="middle" justify="center" style={{ width: '100%' }}>
                                        <div className="durationContainer">
                                            <Button
                                                className="edit-course-bnt"
                                                name="edit-course"
                                                shape="circle"
                                                icon="edit"
                                                onClick={e => this.editCourse(e, item.id)}
                                            />
                                            <div className="timerContainer">
                                                <Tooltip
                                                    mouseEnterDelay={0.5}
                                                    title="Estimated time to complete the course"
                                                >
                                                    <img src="/img/timer.svg" alt="timer" />
                                                    <span style={{
                                                        color: '#fff',
                                                        marginLeft: '11px',
                                                    }}
                                                    >
                                                        {`${courseDuration}m`}
                                                    </span>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </Row>
                                    <Row className="categoryRow">
                                        <div className="courseCategory">
                                            <Tooltip mouseEnterDelay={0.5} title="DevSecOps category">
                                                <Text>{item.category ? item.category.name : ''}</Text>
                                            </Tooltip>
                                        </div>
                                        <div className="courseTitle">
                                            <Title level={4} style={{ fontWeight: 'normal' }}>{item.title}</Title>
                                        </div>
                                    </Row>
                                </Card>
                            </List.Item>
                        );
                    }}
                />

                <AddCourseModal
                    onClose={this.toggleAddCourseModal}
                    visible={addCourseModalVisible}
                    addNewCategory={createCategory}
                    deleteCategory={deleteCategory}
                    categories={categories}
                    createCourse={createCourse}
                    uploadCourseImage={uploadFile}
                    uploadFile={uploadFile}
                    updateTags={updateTags}
                    fetchTags={fetchTags}
                    searchByCourseTags={searchByCourseTags}
                    courseTypes={courseTypes}
                />
                <Modal
                    title="Add Slug"
                    visible={courseSlugModel}
                    onCancel={this.toggleSlugModel}
                    destroyOnClose
                    footer={[
                        <Button onClick={this.toggleSlugModel} key="onCancel">Close</Button>,
                        <Button onClick={this.addSlug} key="addSlug">Add</Button>,
                    ]}
                >
                    <Descriptions.Item label="Author Bio">
                        <Input
                            name="courseSlug"
                            placeholder="Course Slug"
                            value={courseSlug}
                            onChange={this.onChangeSlug}
                        />
                    </Descriptions.Item>
                </Modal>
            </div>
        );
    }
}

GoldenStandard.propTypes = () => ({
    fetchFellowSettingsFunc: PropTypes.func,
});

export default withRouter(GoldenStandard);
