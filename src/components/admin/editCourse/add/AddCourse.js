import React, { Component } from 'react';
import {
    Select,
    Input,
    Button,
    Switch,
    Modal,
    message,
    Icon,
    Card,
    Descriptions,
    Rate,
    Divider,
    Badge,
    DatePicker,
    Upload,
    Spin,
    Form,
} from 'antd';
import { withRouter } from 'react-router-dom';
import CKEditor from 'ckeditor4-react';
import moment from 'moment';
import './add.scss';
import TagsModal from '../edit/tagsModal';
import { COURSE_TYPE } from '../../../../constants';

const { Option } = Select;
const confirmModal = Modal.confirm;

const DEFAULT_STATE = {
    title: '',
    slug: '',
    content: '',
    image: '',
    description: '',
    theory_duration: '',
    token_cost: '',
    author_bio: '',
    category: 'Category',
    showAddCategory: false,
    new_category: '',
    loading: false,
    createCategoryLoading: false,
    deleteCategoryLoading: false,

    preview_video: '',
    author: '',
    version: '1.0.0',
    difficulty: 0,
    cert_badge: false,
    certificate_of_completion: true,
    lab_steps_in_personal_archive: true,
    publicly_visible: false,
    access_request: false,

    will_learn: [],
    will_learn_field: '',
    tools_used: [],
    tools_used_field: '',
    fetching: false,
    tags: [],
    updatedTags: [],
    existing_tags: [],

    course_is_for: [],
    course_is_for_field: '',
    required_exp: '',
    version_date: '',
    value_rating: 0,
    number_of_ratings: '',
    enrolled_students: '',
    linkedIn_url: '',
    tagsModal: false,
    course_template_id: null,
    second_author_bio: '',
    second_author: '',
    second_linkedIn_url: '',
    type: '',

};
class AddCourse extends Component {
    constructor(props) {
        super(props);

        this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }

    selectCategory = id => {
        this.setState({
            category: id,
        });
    }

    toggleAddCategory = () => {
        this.setState({
            showAddCategory: !this.state.showAddCategory,
        });
    }

    addCategory = () => {
        this.setState({
            createCategoryLoading: true,
        });

        this.props.addNewCategory({
            name: this.state.new_category,
        }).then(res => {
            this.setState({
                createCategoryLoading: false,
            });

            if (res === true) {
                message.success('Category created.');
                this.setState({
                    new_category: '',
                });

                this.toggleAddCategory();
            } else if (res.errors) {
                res.errors.forEach(item => {
                    message.error(item.message);
                });
            } else {
                message.error(res.message);
            }
        });
    }

    showDeleteConfirm = (e, index, id) => {
        e.preventDefault();

        confirmModal({
            title: 'Are you sure delete this category?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.setState({
                    deleteCategoryLoading: true,
                    category: 1,
                });

                this.props.deleteCategory(index, id).then(res => {
                    this.setState({
                        deleteCategoryLoading: false,
                    });

                    if (res === true) {
                        message.success('Deleted.');
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

    inputChangeHandler = e => {
        if (e.target.name === 'token_cost') {
            if (e.target.value.length >= 2 && e.target.value[0] === '0' && e.target.value[1] !== '.') {
                return;
            }
            if ((parseInt(e.target.value) >= 0 && Number(e.target.value) !== 0) || this.state.type === COURSE_TYPE.INTRODUCTION) {
                this.setState({ show_token_cost_error: false });
            } else {
                this.setState({ show_token_cost_error: true });
            }
        }
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    createCourse = () => {
        this.setState({
            loading: true,
        });

        const {
            title, content, category, description, image, theory_duration, token_cost, slug,
            preview_video, author, version, difficulty, cert_badge,
            will_learn, tools_used, course_is_for, required_exp, version_date, value_rating, number_of_ratings, enrolled_students,
            certificate_of_completion, lab_steps_in_personal_archive, show_token_cost_error, author_bio, linkedIn_url,
            publicly_visible, updatedTags, course_template_id, access_request, second_author_bio, second_author, second_linkedIn_url, type,
        } = this.state;
        let is_template;
        let template_id;
        (isNaN(parseInt(course_template_id))) ? template_id = null : template_id = parseInt(course_template_id);
        this.props.is_template ? is_template = true : is_template = false;
        if (show_token_cost_error) {
            message.error('Check Price');
            this.setState({
                loading: false,
            });
            return;
        }

        if (this.state.type === COURSE_TYPE.INTRODUCTION && token_cost > 0) {
            message.error('Token Cost should be 0 in case of Introduction Module');
            this.setState({
                loading: false,
            });
            return;
        }

        this.props.createCourse({
            title,
            content,
            image,
            category,
            description,
            theory_duration,
            token_cost: token_cost || 0,
            slug,
            preview_video,
            author,
            version,
            difficulty,
            cert_badge,
            will_learn,
            course_is_for,
            required_exp,
            version_date,
            value_rating,
            number_of_ratings,
            enrolled_students,
            certificate_of_completion,
            lab_steps_in_personal_archive,
            is_template,
            author_bio,
            linkedIn_url,
            publicly_visible,
            tools_used,
            updatedTags,
            template_id,
            access_request,
            second_author_bio,
            second_author,
            second_linkedIn_url,
            type,
        }).then(res => {
            this.setState({
                loading: false,
            });

            if (!isNaN(parseInt(res))) {
                message.success('Created.');

                this.setState(JSON.parse(JSON.stringify(DEFAULT_STATE)));

                this.props.history.push(`/platform/admin/edit-course/${res}`);
            } else if (res.errors) {
                res.errors.forEach(item => {
                    message.error(item.message);
                });
            } else {
                message.error(res.message);
            }
        });
    }

    uploadImage = e => {
        const loader = message.loading('uploading');
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        this.props.uploadCourseImage(data, 'courses').then(res => {
            if (res.message) {
                message.error('Something went wrong, please try again.');
            } else {
                this.setState({
                    image: res,
                });
                loader();
                message.success('Image uploaded.');
            }
        });
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

    changeDifficulty = value => {
        this.setState({
            difficulty: value,
        });
    }

    changeRatingValue = value => {
        this.setState({
            value_rating: value,
        });
    }

    changeCertificationInclude = () => {
        this.setState({
            cert_badge: !this.state.cert_badge,
        });
    }

    changeCertificateOfCompletion = () => {
        this.setState({
            certificate_of_completion: !this.state.certificate_of_completion,
        });
    }

    changeLabStepsInArchive = () => {
        this.setState({
            lab_steps_in_personal_archive: !this.state.lab_steps_in_personal_archive,
        });
    }

    changePubliclyVisible = () => {
        this.setState({
            publicly_visible: !this.state.publicly_visible,
        });
    }

    changeAccessRequest = () => {
        this.setState({
            access_request: !this.state.access_request,
        });
    }

    onChangeReqExp = e => {
        this.setState({
            required_exp: e.editor.getData(),
        });
    }

    onChangeDate = (date, dateString) => {
        this.setState({ version_date: dateString });
    }

    uploadCourseVideo = file => {
        const isLt100M = file.size / 1024 / 1024 < 100;
        if (!isLt100M) {
            message.error('Image must smaller than 100MB!');
            return false;
        }
        const data = new FormData();
        data.append('file', file);

        const loader = message.loading('Uploading...', 0);
        this.props.uploadVideo(data, 'course-videos').then(res => {
            if (typeof res !== 'string') {
                message.error('Something went wrong, please try again.');
            } else {
                this.setState({
                    preview_video: res,
                });
                loader();
                message.success('Video uploaded.');
            }
        });
        // Return false since we handle upload
        return false;
    }

    onChangeTags = tags => {
        this.setState({
            tags,
        });
    }

    onSearchTags = tags => {
        if (tags.length >= 2 && tags.length < 254) {
            this.setState({
                fetching: true,
                existing_tags: [],
            });
            this.props.searchByCourseTags(tags).then(res => {
                if (res !== false) {
                    this.setState({
                        existing_tags: res,
                        fetching: false,
                    });
                } else {
                    message.error('something went wrong');
                }
            });
        }
    }

    onDeselected = (value, params) => {
        const { key } = params;
        const updatedTags = [...this.state.updatedTags];
        if (key !== value) {
            updatedTags.splice(updatedTags.indexOf(parseInt(key)), 1);
            this.setState({
                updatedTags,
            });
        }
    }

    onSelected = (value, params) => {
        const { key } = params;
        const updatedTags = [...this.state.updatedTags];
        if (key === value) {
            return message.info('please choose by existing tags');
        }
        updatedTags.push(parseInt(key));
        this.setState({
            updatedTags,
        });
    }

    toggleTagsModal = () => {
        this.setState({
            tagsModal: !this.state.tagsModal,
        });
    }

    selectCourseTemplate = id => {
        this.setState({
            course_template_id: id,
        });
    }

    selectCourseType = type => {
        this.setState({
            type,
        });
    }

    render() {
        const {
            categories, courseTemplates, is_template, courseTypes,
        } = this.props;
        const {
            title, content, description, showAddCategory, loading,
            createCategoryLoading, deleteCategoryLoading, image, theory_duration,
            token_cost, slug, category, preview_video, author, version, difficulty, cert_badge,
            will_learn, will_learn_field, tools_used, tools_used_field, course_is_for, course_is_for_field, required_exp,
            version_date, value_rating, number_of_ratings, enrolled_students,
            certificate_of_completion, tags, fetching, existing_tags, tagsModal,
            lab_steps_in_personal_archive, show_token_cost_error, author_bio, linkedIn_url, publicly_visible,
            course_template_id, access_request, second_author_bio, second_author, second_linkedIn_url, type,
        } = this.state;

        const { getFieldDecorator } = this.props.form;
        let fetchingTags;
        existing_tags.length > 0 ? fetchingTags = existing_tags : fetchingTags = [];

        return (
            <div className="addCourse">
                <div className="categorySelect">
                    <span className="inputSpan">Select Category</span>
                    <Select className="filterSelect" value={category} onChange={this.selectCategory}>
                        {
                            categories.map((item, key) => (
                                <Option value={item.id} key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>
                                        {item.name}
                                    </span>
                                    <span onClick={e => this.showDeleteConfirm(e, key, item.id)} className="deleteCategory">
                                        {
                                            deleteCategoryLoading ? <Icon type="loading" /> : <Icon type="delete" />
                                        }
                                    </span>
                                </Option>
                            ))
                        }
                    </Select>
                    <div className="addContainer" data-testid="categorySelect">
                        {!showAddCategory && (
                            <div>
                                <span onClick={() => {}}>
                                    <img src="/img/add.svg" alt="Add" />
                                    <span data-testid="addCategorySelect" style={{ paddingTop: '2px' }} onClick={this.toggleAddCategory}>Add Category</span>
                                </span>
                            </div>
                        )}
                        {showAddCategory && (
                            <div className="addCategoryNameForm">
                                <Input placeholder="Category name" name="new_category" onChange={this.inputChangeHandler} style={{ width: '250px' }} />
                                <div className="addButtonsContainer">
                                    <Button onClick={this.toggleAddCategory}>Cancel</Button>
                                    <Button loading={createCategoryLoading} onClick={this.addCategory}>Create</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {
                    !is_template
                        ? (
                            <div className="addTemplateCourse">
                                <span className="inputSpan">Select Course Template</span>
                                <Select className="filterSelect" value={course_template_id || 'Select Golden Standard Templates'} onChange={this.selectCourseTemplate}>
                                    {
                                        courseTemplates.map((item, key) => (
                                            <Option value={item.id} key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>
                                                    {item.title}
                                                </span>
                                            </Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        ) : ''
                }
                <div className="selectCourseType">
                    <span className="inputSpan">Select Course Types</span>
                    <Select className="filterSelect" value={type} onChange={this.selectCourseType}>
                        {
                            courseTypes.map((item, key) => (
                                <Option value={item} key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </span>
                                </Option>
                            ))
                        }
                    </Select>
                </div>
                <div className="small-input" data-testid="courseName">
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
                            name="title"
                            onChange={this.inputChangeHandler}
                            placeholder="Course name"
                        />)}
                    </Form.Item>
                </div>

                <div className="small-input" data-testid="courseSlug">
                    <span className="inputSpan">Course slug</span>
                    <Input value={slug} name="slug" placeholder="Course slug" onChange={this.inputChangeHandler} />
                </div>
                <div className="small-input" data-testid="theoryDuration">
                    <span className="inputSpan">Theory duration /min</span>
                    <Input value={theory_duration.replace('m', '')} name="theory_duration" placeholder="Theory duration" onChange={this.inputChangeHandler} />
                </div>
                <div className="courseDescriptionContainer">
                    <span className="inputSpan">Subtitle description</span>
                    <div className="descriptionText">
                        <Input.TextArea rows={3} value={content} name="content" onChange={this.inputChangeHandler} />
                    </div>
                </div>
                <div className="courseDescriptionContainer">
                    <span className="inputSpan">Course description</span>
                    <div className="descriptionText">
                        <Input.TextArea rows={3} value={description} name="description" onChange={this.inputChangeHandler} />
                    </div>
                </div>
                <div className="small-input" data-testid="coursePreviewUrl">
                    <span className="inputSpan">Course Preview url</span>
                    <Input name="preview_video" value={preview_video} placeholder="Course Preview url" onChange={this.inputChangeHandler} />
                </div>
                <Descriptions layout="vertical" className="courseDescriptionContainerGroup">
                    <Descriptions.Item label={show_token_cost_error ? 'Token Cost is Incorrect' : 'Token Cost'} style={{ color: 'red' }} className={show_token_cost_error && 'price-validation'}>
                        <Input name="token_cost" placeholder="Token Cost" value={token_cost} type="number" min={0} onChange={this.inputChangeHandler} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Author">
                        <Input name="author" placeholder="Author" value={author} onChange={this.inputChangeHandler} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Author Bio">
                        <Input name="author_bio" value={author_bio} placeholder="Author Bio" onChange={this.inputChangeHandler} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Second Author">
                        <Input name="second_author" placeholder="Second Author" value={second_author} onChange={this.inputChangeHandler} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Second Author Bio">
                        <Input name="second_author_bio" value={second_author_bio} placeholder="Second Author Bio" onChange={this.inputChangeHandler} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Version">
                        <Input name="version" value={version} placeholder="Version" onChange={this.inputChangeHandler} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Difficulty">
                        <div className="rate-container">
                            <Rate
                                allowClear
                                allowHalf
                                defaultValue={2.5}
                                value={difficulty}
                                onChange={this.changeDifficulty}
                                character={<Icon type="trophy" />}
                            />
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Version Date">
                        <DatePicker name="version_date" value={version_date ? moment(version_date) : null} onChange={this.onChangeDate} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Value Rating">
                        <div className="rate-container">
                            <Rate
                                name="value_rating"
                                allowClear
                                allowHalf
                                value={value_rating}
                                onChange={this.changeRatingValue}
                            />
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Number of ratings">
                        <Input name="number_of_ratings" value={number_of_ratings} placeholder="Number of ratings" onChange={this.inputChangeHandler} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Enrolled students">
                        <Input name="enrolled_students" value={enrolled_students} placeholder="Enrolled students" onChange={this.inputChangeHandler} />
                    </Descriptions.Item>
                    <Descriptions.Item label="LinkedIn URL">
                        <Input className='linkedin_url' name="linkedIn_url" value={linkedIn_url} placeholder="LinkedIn URL" onChange={this.inputChangeHandler} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Second LinkedIn URL">
                        <Input className='linkedin_url' name="second_linkedIn_url" value={second_linkedIn_url} placeholder="LinkedIn URL" onChange={this.inputChangeHandler} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Course Video">
                        <Upload
                            accept='video/*'
                            beforeUpload={this.uploadCourseVideo}
                        >
                            <Button>
                                <Icon type="upload" />
                                {' '}
                                Select Video
                            </Button>
                        </Upload>
                    </Descriptions.Item>
                    <Descriptions.Item label="Badge of certification">
                        <Switch
                            checked={cert_badge}
                            onChange={this.changeCertificationInclude}
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Certificate of completion">
                        <Switch
                            className='certificate_of_completion'
                            checked={certificate_of_completion}
                            onChange={this.changeCertificateOfCompletion}
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Lab steps in personal archive">
                        <Switch
                            className='lab_steps_in_personal_archive'
                            checked={lab_steps_in_personal_archive}
                            onChange={this.changeLabStepsInArchive}
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Access Request">
                        <Switch
                            className='access_request'
                            checked={access_request}
                            onChange={this.changeAccessRequest}
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Publicly visible">
                        <Switch
                            className='publicly_visible'
                            checked={publicly_visible}
                            onChange={this.changePubliclyVisible}
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                        />
                    </Descriptions.Item>
                </Descriptions>
                <Divider />
                <Card title="Tools you will use in the hands-on lab" className="courseDescriptionSection">
                    <div className="whoThisCourseIsFor">
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
                <Card
                    title="Assign tags for this course"
                    className="courseTagsSection"
                    extra={<Button type="primary" shape="round" icon="tag" onClick={this.toggleTagsModal}>Add Tag</Button>}
                >
                    <div className="whoThisCourseIsFor">
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Tags Mode"
                            value={tags}
                            notFoundContent={fetching ? <Spin size="small" /> : null}
                            onChange={this.onChangeTags}
                            onSearch={this.onSearchTags}
                            onDeselect={this.onDeselected}
                            onSelect={this.onSelected}
                            filterOption={false}
                        >
                            { fetchingTags.map(item => (
                                <Select.Option key={item.id} value={item.title}>
                                    {item.title}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                </Card>

                <Card title="What you will learn" className="courseDescriptionSection">
                    <div className="whoThisCourseIsFor">
                        <ul>
                            {will_learn.map((item, index) => (
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
                            {course_is_for.map((item, index) => (
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
                    <span className="inputSpan asa">Image</span>

                    <div className="uploadImage">
                        <div className="imageUploader" onClick={() => this.refs.fileUploader.click()}>
                            <img src="/img/photo-camera.svg" alt="Camera" />
                            <input type="file" name="avatar" ref="fileUploader" hidden onChange={this.uploadImage} />
                            <span>Add Image</span>
                        </div>
                        {image && (
                            <div className="imageDiv">
                                <img src={image} alt="courseImage" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="buttonsContainer">
                    <div className="savePreviewContainer">
                        <Button className='createCourse' onClick={this.createCourse} loading={loading}>
                            Create
                        </Button>
                    </div>
                </div>
                {
                    tagsModal
                    && (
                        <TagsModal
                            visible={tagsModal}
                            toggleTagsModal={this.toggleTagsModal}
                            updateTags={this.props.updateTags}
                            fetchTags={this.props.fetchTags}
                        />
                    )
                }
            </div>
        );
    }
}

export { AddCourse };
export default Form.create({ name: 'add_course' })(withRouter(AddCourse));
