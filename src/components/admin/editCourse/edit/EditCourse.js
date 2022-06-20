import React, { Component } from 'react';
import {
    Select, Input, Button, message, Icon, Card, Descriptions, Divider,
    Badge, Modal, Upload, Form,
} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import CKEditor from 'ckeditor4-react';
import SelectImageModal from '../../selectImage';
import './edit.scss';
import CourseInformationModal from '../../../course-information/CourseInformationModal/CourseInformationModal';

const { Option } = Select;
const confirmModal = Modal.confirm;

class EditCourse extends Component {
    constructor(props) {
        super(props);

        const { course } = props;

        this.state = {
            loading: false,
            exportCourseLoader: false,
            showImagesModal: false,
            visible: false,

            title: course.title,
            content: course.content,
            image: course.image,
            theory_duration: course.theory_duration,
            description: course.description,
            category: course.category_id,
            preview_video: course.preview_video,
            preview_video2: course.preview_video2,
            author: course.author,
            author_bio: course.author_bio,
            author_pic: course.author_pic,
            second_author: course.second_author,
            second_author_bio: course.second_author_bio,
            second_author_pic: course.second_author_pic,
            linkedIn_url: course.linkedIn_url,
            second_linkedIn_url: course.second_linkedIn_url,
            will_learn: course.will_learn || [],
            will_learn_field: '',
            tools_used: course.tools_used || [],
            tools_used_filed: '',

            course_is_for: course.course_is_for || [],
            course_is_for_field: '',
            required_exp: course.required_exp,
            fetching: true,
            selectedImage: null,
            type: course.type,
        };
    }

    componentDidMount() {
        const { stepsImages, fetchStepsImages, match } = this.props;
        if (!stepsImages.length) {
            fetchStepsImages(match.params.id);
        }
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.getData(props);
    }

    componentDidUpdate(prevProps) {
        this.getData(prevProps);
    }

    getData = (prevProps, shouldUpdate) => {
        const { course: propCourse } = this.props;
        if (prevProps.course.id !== propCourse.id
            || prevProps.course.type !== propCourse.type
            || prevProps.course.category.id !== propCourse.category.id
            || shouldUpdate) {
            const { course } = this.props;
            this.setState({
                title: course.title,
                content: course.content,
                image: course.image,
                theory_duration: course.theory_duration,
                token_cost: parseInt(course.token_cost),
                slug: course.slug,
                description: course.description,
                category: course.category_id,
                preview_video: course.preview_video,
                preview_video2: course.preview_video2,
                author: course.author,
                author_bio: course.author_bio,
                second_author_pic: course.second_author_pic,
                second_author: course.second_author,
                second_author_bio: course.second_author_bio,
                author_pic: course.author_pic,
                version: course.version,
                difficulty: parseFloat(course.difficulty),
                linkedIn_url: course.linkedIn_url,
                second_linkedIn_url: course.second_linkedIn_url,
                cert_badge: Boolean(course.cert_badge),
                certificate_of_completion: Boolean(course.certificate_of_completion),
                publicly_visible: Boolean(course.publicly_visible),
                will_learn: course.will_learn,
                tools_used: course.tools_used,
                course_is_for: course.course_is_for,
                required_exp: course.required_exp,
                version_date: course.version_date,
                value_rating: parseFloat(course.value_rating),
                number_of_ratings: course.number_of_ratings,
                enrolled_students: course.enrolled_students,
                selectedImage: null,
                type: course.type,
            });
        }
    }

    inputChangeHandler = e => {
        if (e.target.name === 'token_cost') {
            if ((parseInt(e.target.value) >= 0 && Number(e.target.value) !== 0) || this.state.type === 'introduction') {
                this.setState({ show_token_cost_error: false });
            } else {
                this.setState({ show_token_cost_error: true });
            }
        }

        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    updateCourse = e => {
        e.preventDefault();
        const {
            title, content, category, description, image, theory_duration, preview_video, preview_video2,
            author, author_bio, author_pic, will_learn, tools_used, course_is_for, required_exp, am_level_available,
            linkedIn_url, second_author, second_author_bio, second_author_pic, second_linkedIn_url, type,
        } = this.state;
        const { updateCourse, getData } = this.props;
        this.setState({
            loading: true,
        });
        updateCourse(this.props.course.id, {
            title,
            content,
            image,
            category,
            description,
            preview_video,
            preview_video2,
            author,
            author_bio,
            author_pic,
            will_learn,
            tools_used,
            course_is_for,
            required_exp,
            theory_duration: theory_duration.replace('m', ''),
            am_level_available,
            linkedIn_url,
            second_author,
            second_author_bio,
            second_author_pic,
            second_linkedIn_url,
            type,
        }).then(res => {
            this.setState({
                loading: false,
            });
            if (res === true) {
                message.success('Updated.');
                getData();
            } else if (res.errors) {
                res.errors.forEach(item => {
                    message.error(item.message);
                });
            } else if (res.message) {
                message.error(res.message);
            } else {
                message.error('Something went wrong, please try again.');
            }
        });
    }

    selectCategory = id => {
        this.setState({
            category: id,
        });
    }

    uploadImage = e => {
        const { uploadCourseImage } = this.props;
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        uploadCourseImage(data, 'courses').then(res => {
            if (res.message) {
                message.error('Something went wrong, please try again.');
            } else {
                this.setState({
                    image: res,
                });
                message.success('Image uploaded.');
            }
        }).catch(console.error);
    }

    addItem = name => {
        const arr = this.state[name];
        const input = this.state[`${name}_field`];

        if (input) {
            arr.push(input);
            this.setState({
                [name]: arr,
                [`${name}_field`]: '',
            });
        }
    }

    deleteItem = (index, name) => {
        const arr = this.state[name];
        arr.splice(index, 1);
        this.setState({
            [name]: arr,
        });
    }

    onChangeReqExp = e => {
        this.setState({
            required_exp: e.editor.getData(),
        });
    }

    deleteCourse = course_id => {
        confirmModal({
            title: 'Are you sure delete this course?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                const { deleteCourse, history } = this.props;
                const loader = message.loading('Deleting..');
                deleteCourse(course_id).then(res => {
                    loader();
                    if (res === true) {
                        message.success('Deleted');
                        history.push('/platform/courses');
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

    goToEditPreplab = courseId => {
        const { history } = this.props;
        history.push(`/platform/admin/edit-steps/theory/${courseId}`);
    }

    toggleImagesModal = num => {
        this.setState(prevState => ({
            showImagesModal: !prevState.showImagesModal,
            selectedImage: num,
        }));
    }

    selectAuthorPic = uuid => {
        this.setState({
            author_pic: uuid,
        });
    }

    selectSecondAuthorPic = uuid => {
        this.setState({
            second_author_pic: uuid,
        });
    }

    uploadCourseVideo = (file, video_state) => {
        const isLt100M = file.size / 1024 / 1024 < 100;
        const { uploadVideo } = this.props;
        if (!isLt100M) {
            message.error('Image must smaller than 100MB!');
            return false;
        }
        const data = new FormData();
        data.append('file', file);

        const loader = message.loading('Uploading...', 0);
        uploadVideo(data, 'course-videos').then(res => {
            if (typeof res !== 'string') {
                message.error('Something went wrong, please try again.');
            } else {
                this.setState({
                    [video_state]: res,
                });
                loader();
                message.success('Video uploaded.');
            }
        });
        return false;
    }

    toggleModal = () => {
        this.setState(prevState => ({
            visible: !prevState.visible,
        }));
    }

    render() {
        const {
            course, categories, form, stepsImages,
        } = this.props;
        const {
            title, content, category, description, theory_duration, loading, preview_video, preview_video2, author,
            author_bio, author_pic, will_learn, will_learn_field, tools_used, tools_used_field, course_is_for,
            course_is_for_field, required_exp, linkedIn_url, second_author_pic, second_author, second_author_bio,
            second_linkedIn_url, selectedImage, showImagesModal, visible,
        } = this.state;
        const { getFieldDecorator } = form;
        const authorPic = stepsImages.find(item => item.uuid === author_pic);
        const secondAuthorPic = stepsImages.find(item => item.uuid === second_author_pic);
        return (
            <>
                {
                    course
                        ? (
                            <div className="editCourse">
                                <div className="actions-top-block">
                                    <Button type='default' onClick={() => this.goToEditPreplab(course.id)}>
                                        Edit Preplab
                                        {' '}
                                        <Icon type="edit" />
                                    </Button>
                                    <Button type='primary' loading={loading} onClick={this.updateCourse}>
                                        Save
                                        {' '}
                                        <Icon type="save" />
                                    </Button>
                                    <Button className='btn-primary preview-course-btn' type="primary" style={{ float: 'right' }} onClick={this.toggleModal}>
                                        Preview
                                    </Button>
                                </div>
                                <div className="categorySelect">
                                    <span className="inputSpan">Select Category</span>
                                    <Select className="filterSelect" value={category} onChange={this.selectCategory}>
                                        {
                                            categories.map((item, key) => <Option value={item.id} key={key}>{item.name}</Option>)
                                        }
                                    </Select>
                                </div>
                                <div className="small-input">
                                    <span className="inputSpan">Course name</span>
                                    <Form.Item>
                                        {getFieldDecorator('title', {
                                            initialValue: title,
                                            rules: [
                                                {
                                                    max: 95,
                                                    message: 'Course Title cannot be longer then 95 characters',
                                                },
                                            ],
                                        })(<Input
                                            name='title'
                                            onChange={this.inputChangeHandler}
                                            placeholder="Course name"
                                        />)}
                                    </Form.Item>
                                </div>
                                <div className="small-input">
                                    <span className="inputSpan">Theory duration /min</span>
                                    <Input value={theory_duration && theory_duration.replace('m', '')} name='theory_duration' placeholder="Theory duration" onChange={this.inputChangeHandler} />
                                </div>
                                <div className="courseDescriptionContainer">
                                    <span className="inputSpan">Subtitle description</span>
                                    <div className="descriptionText">
                                        <Input.TextArea rows={3} name='content' value={content} onChange={this.inputChangeHandler} />
                                    </div>
                                </div>
                                <div className="courseDescriptionContainer">
                                    <span className="inputSpan">Course description</span>
                                    <div className="descriptionText">
                                        <Input.TextArea rows={3} name='description' value={description} onChange={this.inputChangeHandler} />
                                    </div>
                                </div>
                                <div className="small-input">
                                    <span className="inputSpan">Course Preview url</span>
                                    <Input name='preview_video' value={preview_video} placeholder="Course Preview url" onChange={this.inputChangeHandler} />
                                </div>
                                <div className="small-input">
                                    <span className="inputSpan">Course Preview 2 url</span>
                                    <Input name='preview_video2' value={preview_video2} placeholder="Course Preview 2 url" onChange={this.inputChangeHandler} />
                                </div>

                                <Descriptions layout="vertical" className="courseDescriptionContainerGroup">
                                    <Descriptions.Item label="Author">
                                        <Input name='author' value={author} placeholder="Author" onChange={this.inputChangeHandler} />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Author Bio">
                                        <Input name='author_bio' value={author_bio} placeholder="Author Bio" onChange={this.inputChangeHandler} />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Author Picture">
                                        {authorPic ? <img alt='author_pic' className='author-pic' src={authorPic.image} /> : ''}
                                        <Button
                                            size="small"
                                            style={{ marginLeft: 16, verticalAlign: 'middle' }}
                                            onClick={() => this.toggleImagesModal(1)}
                                        >
                                            Select
                                        </Button>
                                        <Button
                                            size="small"
                                            type='danger'
                                            shape='circle'
                                            icon='delete'
                                            style={{ marginLeft: 6, verticalAlign: 'middle' }}
                                            onClick={() => this.selectAuthorPic('')}
                                        />
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Second Author">
                                        <Input name='second_author' value={second_author} placeholder="Second Author" onChange={this.inputChangeHandler} />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Second Author Bio">
                                        <Input name='second_author_bio' value={second_author_bio} placeholder="Second Author Bio" onChange={this.inputChangeHandler} />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Second Author Picture">
                                        {secondAuthorPic ? <img alt='second_author_pic' className='author-pic' src={secondAuthorPic.image} /> : ''}
                                        <Button
                                            size="small"
                                            style={{ marginLeft: 16, verticalAlign: 'middle' }}
                                            onClick={() => this.toggleImagesModal(2)}
                                        >
                                            Select
                                        </Button>
                                        <Button
                                            size="small"
                                            type='danger'
                                            shape='circle'
                                            icon='delete'
                                            style={{ marginLeft: 6, verticalAlign: 'middle' }}
                                            onClick={() => this.selectSecondAuthorPic('')}
                                        />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="LinkedIn URL">
                                        <Input className='linkedin_url' name='linkedIn_url' value={linkedIn_url} placeholder="LinkedIn URL" onChange={this.inputChangeHandler} />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Second LinkedIn URL">
                                        <Input className='linkedin_url' name='second_linkedIn_url' value={second_linkedIn_url} placeholder="Second LinkedIn URL" onChange={this.inputChangeHandler} />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Course Video">
                                        <Upload
                                            accept='video/*'
                                            beforeUpload={file => this.uploadCourseVideo(file, 'preview_video')}
                                        >
                                            <Button>
                                                <Icon type="upload" />
                                                {' '}
                                                Select Video
                                            </Button>
                                        </Upload>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Course Video 2">
                                        <Upload
                                            accept='video/*'
                                            beforeUpload={file => this.uploadCourseVideo(file, 'preview_video2')}
                                        >
                                            <Button>
                                                <Icon type="upload" />
                                                {' '}
                                                Select Video
                                            </Button>
                                        </Upload>
                                    </Descriptions.Item>
                                </Descriptions>
                                <Divider />
                                <Card title="Tools you will use in the hands-on lab" className="courseDescriptionSection">
                                    <div className="toolsHandsOnLab">
                                        <ul>
                                            {(tools_used || []).map((item, index) => (
                                                <li key={index}>
                                                    <span>
                                                        <Icon type="check-circle" theme="twoTone" />
                                                        {item}
                                                    </span>
                                                    <Icon type="delete" theme="twoTone" twoToneColor="#f5222d" onClick={() => this.deleteItem(index, 'tools_used')} />
                                                </li>
                                            ))}
                                        </ul>
                                        <Input
                                            addonAfter={<Icon type="plus" onClick={() => this.addItem('tools_used')} />}
                                            placeholder="Tools you will use in the hands-on lab"
                                            name="tools_used_field"
                                            value={tools_used_field}
                                            onChange={this.inputChangeHandler}
                                            onPressEnter={() => this.addItem('tools_used')}
                                        />
                                    </div>
                                </Card>
                                <Card title="What you will learn" className="courseDescriptionSection">
                                    <div className="whatYouWillLearn">
                                        <ul>
                                            {(will_learn || []).map((item, index) => (
                                                <li key={index}>
                                                    <span>
                                                        <Icon type="check-circle" theme="twoTone" />
                                                        {item}
                                                    </span>
                                                    <Icon type="delete" theme="twoTone" twoToneColor="#f5222d" onClick={() => this.deleteItem(index, 'will_learn')} />
                                                </li>
                                            ))}
                                        </ul>
                                        <Input
                                            addonAfter={<Icon type="plus" onClick={() => this.addItem('will_learn')} />}
                                            placeholder="What you will learn"
                                            name="will_learn_field"
                                            value={will_learn_field}
                                            onChange={this.inputChangeHandler}
                                            onPressEnter={() => this.addItem('will_learn')}
                                        />
                                    </div>
                                </Card>
                                <Card title="Who this course is for" className="courseDescriptionSection">
                                    <div className="whoThisCourseIsFor">
                                        <ul>
                                            {(course_is_for || []).map((item, index) => (
                                                <li key={index}>
                                                    <span>
                                                        <Badge status="processing" />
                                                        {item}
                                                    </span>
                                                    <Icon type="delete" theme="twoTone" twoToneColor="#f5222d" onClick={() => this.deleteItem(index, 'course_is_for')} />
                                                </li>
                                            ))}
                                        </ul>
                                        <Input
                                            addonAfter={<Icon type="plus" onClick={() => this.addItem('course_is_for')} />}
                                            placeholder="Who this course is for"
                                            name="course_is_for_field"
                                            value={course_is_for_field}
                                            onChange={this.inputChangeHandler}
                                            onPressEnter={() => this.addItem('course_is_for')}
                                        />
                                    </div>
                                </Card>
                                <div className="courseDescriptionContainer">
                                    <span className="inputSpan">Required Experience</span>
                                    <div className="descriptionText">
                                        <CKEditor
                                            name="required_exp"
                                            data={required_exp}
                                            onChange={this.onChangeReqExp}
                                            onBeforeLoad={cke => (cke.disableAutoInline = true)}
                                        />
                                    </div>
                                </div>

                                <div className="imageContainer">
                                    <span className="inputSpan">Image</span>
                                    <input type="file" style={{ display: 'none' }} id="uploadImageInput" />
                                    <div className="uploadImage">
                                        <div className="imageUploader" onClick={() => this.refs.fileUploader.click()}>
                                            <img src="/img/photo-camera.svg" alt="Camera" />
                                            <input type="file" name="avatar" ref="fileUploader" hidden onChange={this.uploadImage} />
                                            <span>Add Image</span>
                                        </div>
                                        {course.image && (
                                            <div className="imageDiv">
                                                <img src={course.image} alt="courseImage" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="buttonsContainer">
                                    <div className="courseTypeContainer">
                                        <Link to={`/platform/admin/edit-steps/theory/${course.id}`}>
                                            <Button>Edit Preplab</Button>
                                        </Link>
                                    </div>
                                    <div className="savePreviewContainer">
                                        <Button type='primary' loading={loading} onClick={this.updateCourse}>
                                            Save
                                            {' '}
                                            <Icon type="save" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                        : (
                            <div>
                                <h3>Course not found</h3>
                            </div>
                        )
                }
                <SelectImageModal
                    images={stepsImages}
                    selectImage={this.selectAuthorPic}
                    selectSecondAuthorPic={this.selectSecondAuthorPic}
                    visible={showImagesModal}
                    closeModal={this.toggleImagesModal}
                    author_pic={author_pic}
                    selectedImage={selectedImage}
                />
                <Modal
                    title="Preview Course"
                    className="preview-steps-modal"
                    visible={visible}
                    footer={[
                        <Button key="back" onClick={this.toggleModal}>
                            Cancel
                        </Button>,
                    ]}
                    onCancel={this.toggleModal}
                    width='90%'
                >
                    <CourseInformationModal
                        course={this.state}
                        courseData={course}
                        authorPicUrl={authorPic ? authorPic.image : ''}
                        secondAuthorPicUrl={secondAuthorPic ? secondAuthorPic.image : ''}
                    />
                </Modal>
            </>
        );
    }
}

export { EditCourse };
export default Form.create({ name: 'add_course' })(withRouter(EditCourse));
