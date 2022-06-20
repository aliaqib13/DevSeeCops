import React, { Component } from 'react';
import {
    Modal, Form, Input, Button, Select, message, Icon, Upload,
} from 'antd';
import './LearningPaths.scss';

const { Item } = Form;
const { Option } = Select;

class LearningPathEdit extends Component {
    state = this.initialState;

    video = React.createRef();

    requiredFields = ['title', 'description', 'exam_course_id'];

    get initialState() {
        return {
            title: '',
            description: '',
            introduction_course_name: '',
            exam_course_id: '',
            resource_url: '',
            resource_type: 'image',
            selected_courses_titles: [],
            videoVisible: false,
        };
    }

    setData = () => {
        const { learningPath } = this.props;
        this.setState({ ...learningPath });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    isValidData = data => {
        const inValid = this.requiredFields.find(key => !data[key]);
        return !inValid;
    }

    edit = () => {
        if (this.isValidData(this.state)) {
            const data = this.getData();
            const { id } = this.props;
            this.props.editLearningPath(id, data).then(res => {
                if (res === true) {
                    message.success('Updated.');
                    this.props.getLearningPaths();
                    this.closeModal();
                } else {
                    message.error(res.message);
                }
            });
        } else {
            return message.error('Please fill in all the data');
        }
    }

    create = () => {
        if (this.isValidData(this.state)) {
            const data = this.getData();
            this.props.createLearningPath(data).then(res => {
                if (res === true) {
                    message.success('Created.');
                    this.props.getLearningPaths();
                    this.closeModal();
                } else {
                    message.error(res.message);
                }
            });
        } else {
            return message.error('Please fill in all the data');
        }
    }

    getData = () => {
        const data = {};
        const { courses, category } = this.props;
        const { selected_courses_titles, resource_url } = this.state;
        this.requiredFields.forEach(field => {
            data[field] = this.state[field];
        });
        data.selected_courses = courses.filter(course => selected_courses_titles.includes(course.title))
            .map(item => item.id);
        data.resource_url = resource_url;
        data.category_id = category.id;
        return data;
    }

    selectIntro = name => {
        this.setState({
            introduction_course_name: name,
        });
    }

    selectExam = id => {
        this.setState({
            exam_course_id: id,
        });
    }

    closeModal = () => {
        this.props.closeModal();
        this.setState({ ...this.initialState });
    }

    handleVideo = () => {
        this.setState({ videoVisible: !this.state.videoVisible }, () => {
            setTimeout(() => {
                const video = this.video.current;
                if (video) {
                    this.state.videoVisible ? video.play() : video.pause();
                }
            }, 1000);
        });
    }

    uploadImage = e => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        this.props.uploadImage(data, 'learning-paths').then(res => {
            if (res.message) {
                message.error('Something went wrong, please try again.');
            } else {
                this.setState({
                    resource_url: res,
                });
                message.success('Image uploaded.');
            }
        });
    }

    uploadCourseVideo = file => {
        const isLt100M = file.size / 1024 / 1024 < 100;
        if (!isLt100M) {
            message.error('Video must be smaller than 100MB!');
            return false;
        }
        const data = new FormData();
        data.append('file', file);

        const loader = message.loading('Uploading...', 0);
        this.props.uploadVideo(data, 'learning-paths').then(res => {
            if (typeof res !== 'string') {
                message.error('Something went wrong, please try again.');
            } else {
                this.setState({
                    resource_url: res,
                });
                loader();
                message.success('Video uploaded.');
            }
        });
        return false;
    }

    selectResourceType = resource_type => {
        this.setState({ resource_type });
    }

    onDeselected = title => {
        const { selected_courses_titles } = this.state;
        const { courses } = this.props;
        const course = courses.find(course => course.title === title);
        if (course && selected_courses_titles.includes(course.title)) {
            selected_courses_titles.splice(selected_courses_titles.indexOf(course.title), 1);
            this.setState({ selected_courses_titles });
        }
    }

    onSelected = title => {
        const { selected_courses_titles } = this.state;
        const { courses } = this.props;
        const course = courses.find(course => course.title === title);
        if (course && !selected_courses_titles.includes(course.title)) {
            selected_courses_titles.push(course.title);
            this.setState({ selected_courses_titles });
        }
    }

    render() {
        const {
            visible, typeOfAction, category, examCourses, courses,
        } = this.props;
        const {
            title, description, introduction_course_name, exam_course_id,
            resource_url, videoVisible, resource_type, selected_courses_titles,
        } = this.state;
        const type = typeOfAction[0].toUpperCase() + typeOfAction.slice(1);
        return (
            <>
                <Modal
                    title={`${type} learning path`}
                    visible={visible}
                    onCancel={this.closeModal}
                    footer={[
                        <Button key="back" onClick={this.closeModal}>
                            Cancel
                        </Button>,
                        <Button key={typeOfAction} type="primary" loading={false} onClick={typeOfAction === 'edit' ? this.edit : this.create}>
                            {type}
                        </Button>,
                    ]}
                >
                    <div className="learning-path-edit">
                        <Form layout="vertical">
                            <Item label="Title">
                                <Input type="text" name="title" value={title} onChange={this.handleChange} />
                            </Item>
                            <Item label="Description">
                                <Input type="description" name="description" value={description} onChange={this.handleChange} />
                            </Item>
                            <Item>
                                <div className="categorySelect">
                                    <span className="inputSpan">Select Category</span>
                                    <Input value={category.name} disabled />
                                </div>
                            </Item>
                            <Item>
                                <div className="categorySelect">
                                    <span className="inputSpan">Introduction Module based on category</span>
                                    <Input value={introduction_course_name} disabled />
                                </div>
                            </Item>
                            <Item>
                                <div className="categorySelect">
                                    <span className="inputSpan">Select Exam</span>
                                    <Select className="filterSelect" value={exam_course_id} onChange={this.selectExam}>
                                        {
                                            examCourses.map((item, key) => <Option value={item.id} key={key}>{item.title}</Option>)
                                        }
                                    </Select>
                                </div>
                            </Item>
                            <Item>
                                <div className="categorySelect">
                                    <span className="inputSpan">Select Courses</span>
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Select Multiple"
                                        value={selected_courses_titles}
                                        notFoundContent={null}
                                        onDeselect={this.onDeselected}
                                        onSelect={this.onSelected}
                                        filterOption
                                    >
                                        { courses.map(item => (
                                            <Select.Option key={item.id} value={item.title}>
                                                {item.title}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>
                            </Item>
                            <Item label="Resource Url">
                                <Select className="resource-type" value={resource_type} onChange={this.selectResourceType}>
                                    <Option value="image" key="image">Image</Option>
                                    <Option value="video" key="video">Video</Option>
                                </Select>
                                <Input type="text" name="resource_url" value={resource_url} onChange={this.handleChange} disabled />
                                {resource_type === 'video'
                                    ? (
                                        <div>
                                            {resource_url.split('.').pop() === 'mp4'
                                        && (
                                            <div className="video-cont">
                                                <div onClick={this.handleVideo} className="video-play-arrow">
                                                    <Icon type="play-circle" />
                                                </div>
                                                <video width='190'>
                                                    <source src={resource_url} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        ) }
                                            <Upload
                                                accept='video/*'
                                                beforeUpload={file => this.uploadCourseVideo(file)}
                                                maxCount={1}
                                                showUploadList={false}
                                            >
                                                <Button>
                                                    <Icon type="upload" />
                                                    {' '}
                                                    Select Video
                                                </Button>
                                            </Upload>
                                        </div>
                                    )
                                    : (
                                        <div className="imageContainer">
                                            <br />
                                            <div className="uploadImage">
                                                <div className="imageUploader" onClick={() => this.refs.fileUploader.click()}>
                                                    <img src="/img/photo-camera.svg" alt="Camera" />
                                                    <input type="file" name="avatar" ref="fileUploader" hidden onChange={this.uploadImage} />
                                                    <span>Add Image</span>
                                                </div>
                                                {resource_url && resource_url.split('.').pop() !== 'mp4' && (
                                                    <div className="imageDiv">
                                                        <img src={resource_url} alt="courseImage" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                            </Item>
                        </Form>
                    </div>
                </Modal>
                <Modal
                    width="50%"
                    onCancel={this.handleVideo}
                    visible={videoVisible}
                    footer={null}
                >
                    <video ref={this.video} controls style={{ width: '100%' }}>
                        <source src={resource_url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Modal>
            </>
        );
    }
}

export default LearningPathEdit;
