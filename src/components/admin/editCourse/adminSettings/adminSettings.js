import React, { Component } from 'react';
import {
    Input, Button, Switch, message, Icon, Descriptions, Rate, Divider,
    Modal, DatePicker, Typography, Tooltip, Card, Select, Spin,
} from 'antd';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import AdminUploadFileModal from './AdminUploadFileModal';
import './adminSettings.scss';
import TagsModal from '../edit/tagsModal';
import CourseInformationModal from '../../../course-information/CourseInformationModal/CourseInformationModal';
import { COURSE_TYPE } from '../../../../constants';

const confirmModal = Modal.confirm;
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

class AdminSettings extends Component {
    constructor(props) {
        super(props);

        const { course } = props;
        const { courseTags } = course;
        const tags = [];
        const updatedTags = [];
        if (courseTags) {
            courseTags.map(item => tags.push(item.title));
            courseTags.map(item => updatedTags.push(item.id));
        }
        this.state = {
            loading: false,
            exportCourseLoader: false,
            showImagesModal: false,
            adminUploadFileModalVisible: false,
            visible: false,

            additionalDesiredInfo: course.additional_desired_description,
            token_cost: parseInt(course.token_cost),
            slug: course.slug,
            version: course.version,
            difficulty: parseFloat(course.difficulty),
            cert_badge: Boolean(course.cert_badge),
            certificate_of_completion: Boolean(course.certificate_of_completion),
            version_date: course.version_date,
            value_rating: parseFloat(course.value_rating),
            number_of_ratings: course.number_of_ratings,
            enrolled_students: course.enrolled_students,
            publicly_visible: Boolean(course.publicly_visible),
            free_access: Boolean(course.free_access),
            lab_steps_in_personal_archive: Boolean(course.lab_steps_in_personal_archive),
            access_request: Boolean(course.access_request),

            fetching: true,
            fileList: [],
            notifyFellowData: {
                title: '',
                description: '',
                file: '',
            },
            tags,
            updatedTags,
            mailFellowsLoading: false,
            existing_tags: [],
            status: course.status,
            tagsModal: false,
            type: course.type,
            hasIntro: null,
            introCourseId: null,
        };
    }

    componentDidMount() {
        this.getIntroByCategory();
    }

    getIntroByCategory = () => {
        const { course, checkIntroByCategory } = this.props;
        if (course) {
            checkIntroByCategory(course.category.id).then(res => {
                this.setState({
                    hasIntro: res.hasIntro,
                    introCourseId: res.courseId,
                });
            });
        }
    }

    componentDidUpdate(prevProps) {
        const { course: { id }, course } = this.props;
        if (prevProps.course.id !== id) {
            const { courseTags } = course;
            const tags = [];
            const updatedTags = [];
            if (courseTags) {
                courseTags.map(item => tags.push(item.title));
                courseTags.map(item => updatedTags.push(item.id));
            }

            this.setState({

                additionalDesiredInfo: course.additional_desired_description,
                token_cost: parseInt(course.token_cost),
                slug: course.slug,
                version: course.version,
                difficulty: parseFloat(course.difficulty),
                cert_badge: Boolean(course.cert_badge),
                certificate_of_completion: Boolean(course.certificate_of_completion),
                version_date: course.version_date,
                publicly_visible: Boolean(course.publicly_visible),
                value_rating: parseFloat(course.value_rating),
                number_of_ratings: course.number_of_ratings,
                enrolled_students: course.enrolled_students,
                lab_steps_in_personal_archive: Boolean(course.lab_steps_in_personal_archive),
                status: course.status,
                access_request: Boolean(course.access_request),
                tags,
                updatedTags,
            });
        }
    }

    UNSAFE_componentWillReceiveProps(props) {
        const { token_cost: tokenCost, type } = this.state;
        const { course } = props;
        if (Number(course.token_cost) !== Number(tokenCost)) {
            this.setState({ token_cost: course.token_cost });
        }
        if (course.type !== type) {
            this.setState({ type: course.type });
        }
        this.getIntroByCategory();
    }

    toggleUserCreateModal = () => {
        this.setState(prevState => ({
            adminUploadFileModalVisible: !prevState.adminUploadFileModalVisible,
        }));
    }

    changeLabStepsInArchive = () => {
        this.setState(prevState => ({
            lab_steps_in_personal_archive: !prevState.lab_steps_in_personal_archive,
        }));
    }

    changeAccessRequest = () => {
        this.setState(prevState => ({
            access_request: !prevState.access_request,
        }));
    }

    inputChangeHandler = e => {
        const { free_access: freeAccess, type } = this.state;
        if (e.target.name === 'token_cost') {
            if ((parseInt(e.target.value) >= 0 && Number(e.target.value) !== 0) || freeAccess || type === COURSE_TYPE.INTRODUCTION) {
                this.setState({ show_token_cost_error: false });
            } else {
                this.setState({ show_token_cost_error: true });
            }
        }
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    selectStatus = value => {
        this.setState({
            status: value,
        });
    }

    selectCourseType = type => {
        this.setState({
            type,
        });
    }

    updateCourse = e => {
        e.preventDefault();
        const {
            token_cost: tokenCost,
            slug,
            version,
            difficulty,
            cert_badge: certBadge,
            version_date: versionDate,
            value_rating: valueRating,
            number_of_ratings: numberOfRatings,
            publicly_visible: publiclyVisible,
            enrolled_students: enrolledStudents,
            certificate_of_completion: certificateOfCompletion,
            show_token_cost_error: showTokenCostError,
            am_level_available: amLevelAvailable,
            lab_steps_in_personal_archive: labStepsInPersonalArchive,
            access_request: accessRequest,
            status,
            updatedTags,
            free_access: freeAccess,
            type,
            additionalDesiredInfo,
        } = this.state;

        const { updateCourseAdmin, course: { id }, getData } = this.props;
        if (showTokenCostError) {
            message.error('Check Token cost');
            return;
        }
        if (tokenCost > 0 && freeAccess) {
            message.error('Token cost should be 0 in case of free access');
            return;
        }
        if (tokenCost > 0 && type === COURSE_TYPE.INTRODUCTION) {
            message.error('Token cost should be 0 in case of Introduction Module');
            return;
        }

        this.setState({
            loading: true,
        });

        updateCourseAdmin(id, {
            additional_desired_description: additionalDesiredInfo,
            token_cost: tokenCost || 0,
            slug,
            version,
            difficulty,
            cert_badge: certBadge,
            version_date: versionDate,
            value_rating: valueRating,
            number_of_ratings: numberOfRatings,
            enrolled_students: enrolledStudents,
            certificate_of_completion: certificateOfCompletion,
            publicly_visible: publiclyVisible,
            am_level_available: amLevelAvailable,
            lab_steps_in_personal_archive: labStepsInPersonalArchive,
            access_request: accessRequest,
            status,
            updatedTags,
            free_access: freeAccess,
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
        this.setState(prevState => ({
            cert_badge: !prevState.cert_badge,
        }));
    }

    changeCertificateOfCompletion = () => {
        this.setState(prevState => ({
            certificate_of_completion: !prevState.certificate_of_completion,
        }));
    }

    changePubliclyVisible = () => {
        this.setState(prevState => ({
            publicly_visible: !prevState.publicly_visible,
        }));
    }

    changeFreeAccess = () => {
        this.setState(prevState => ({
            free_access: !prevState.free_access,
        }), () => {
            const { free_access: freeAccess, token_cost: tokenCost } = this.state;
            if (freeAccess) {
                this.setState({
                    token_cost: 0, show_token_cost_error: false,
                });
            } else if (parseInt(tokenCost) >= 0 && Number(tokenCost) !== 0) {
                this.setState({ show_token_cost_error: false });
            } else {
                this.setState({ show_token_cost_error: true });
            }
        });
    }

    onChangeTags = tags => {
        this.setState({
            tags,
        });
    }

    onDeselected = (value, params) => {
        const { updatedTags } = this.state;
        const { key } = params;
        const newUpdatedTags = [...updatedTags];
        if (key !== value) {
            newUpdatedTags.splice(updatedTags.indexOf(parseInt(key)), 1);
            this.setState({
                updatedTags: newUpdatedTags,
            });
        }
    }

    onSelected = (value, params) => {
        const { updatedTags } = this.state;
        const { key } = params;
        const newUpdatedTags = [...updatedTags];
        if (key === value) {
            return message.info('please choose by existing tags');
        }
        newUpdatedTags.push(parseInt(key));
        this.setState({
            updatedTags: newUpdatedTags,
        });
    }

    onSearchTags = tags => {
        const { searchByCourseTags } = this.props;
        if (tags.length >= 2 && tags.length < 254) {
            this.setState({
                fetching: true,
                existing_tags: [],
            });
            searchByCourseTags(tags).then(res => {
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

    toggleTagsModal = () => {
        this.setState(prevState => ({ tagsModal: !prevState.tagsModal }));
    }

    deleteCourse = courseId => {
        const { deleteCourse, history } = this.props;
        confirmModal({
            title: 'Are you sure delete this course?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                const loader = message.loading('Deleting..');
                deleteCourse(courseId).then(res => {
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

    exportToJson = courseId => {
        const { exportCourseData } = this.props;
        this.setState({
            exportCourseLoader: true,
        });
        exportCourseData(courseId).then(res => {
            this.setState({
                exportCourseLoader: false,
            });
            if (res === false) {
                message.error('Something went wrong, please try again.');
                return;
            }

            const dataStr = JSON.stringify(res);
            const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

            const exportFileDefaultName = `${res.course.title.replace(/<|>|:|;|"|\/|\\|\?|\*|\|/g, '')}.json`;

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();

            linkElement.remove();
        });
    }

    onChangeDate = (date, dateString) => {
        this.setState({ version_date: dateString });
    }

    toggleLoadingModal = load => {
        this.setState({
            loadingModal: load,
        });
    }

    uploadFilesForFellows = (formData, fileName) => {
        const { uploadFile } = this.props;
        uploadFile(formData, 'fellow-files').then(res => {
            if (res.error) {
                message.error(res.error.message);
                this.setState({
                    uploading: false,
                });
                return;
            }
            this.setState(prevState => ({
                loadingModal: false,
                notifyFellowData: {
                    ...prevState.notifyFellowData,
                    file: res,
                    fileName,
                },
            }));
        });
    }

    editFellowTitleInput = e => {
        this.setState(prevState => ({
            notifyFellowData: {
                ...prevState.notifyFellowData,
                title: e.target.value,
            },
        }));
    }

    editFellowDescriptionInput = e => {
        this.setState(prevState => ({
            notifyFellowData: {
                ...prevState.notifyFellowData,
                description: e.target.value,
            },
        }));
    }

    sendMailFellows = () => {
        const { mailFellows, course_id: courseId } = this.props;
        const { notifyFellowData: { title, description }, notifyFellowData } = this.state;
        if (!title) {
            return message.error('Title is required');
        }
        if (!description) {
            return message.error('Description is required');
        }
        this.setState({
            mailFellowsLoading: true,
        });
        mailFellows(courseId, notifyFellowData).then(res => {
            if (res.message || res.error) {
                message.error('Something went wrong, please try later');
            } else {
                message.success('Mail Success');
                this.setState(prevState => ({
                    ...prevState,
                    notifyFellowData: {},
                }));
            }
            this.setState({
                mailFellowsLoading: false,
            });
        });
    }

    deleteFileData = () => {
        this.setState(state => ({
            ...state,
            notifyFellowData: {
                ...state.notifyFellowData,
                file: '',
                fileName: '',
            },
        }));
    }

    toggleModal = () => {
        this.setState(prevState => ({ visible: !prevState.visible }));
    }

    render() {
        const {
            course, statuses, courseTypes, updateTags, fetchTags,
        } = this.props;
        const {
            token_cost: tokenCost,
            slug,
            loading,
            exportCourseLoader,
            version,
            cert_badge: certBadge,
            difficulty,
            fetching,
            version_date: versionDate,
            value_rating: valueRating,
            number_of_ratings: numberOfRatings,
            enrolled_students: enrolledStudents,
            certificate_of_completion: certificateOfCompletion,
            show_token_cost_error: showTokenCostError,
            lab_steps_in_personal_archive: labStepsInPersonalArchive,
            tags,
            adminUploadFileModalVisible,
            notifyFellowData,
            mailFellowsLoading,
            publicly_visible: publiclyVisible,
            access_request: accessRequest,
            status,
            existing_tags: existingTags,
            tagsModal,
            free_access: freeAccess,
            type,
            hasIntro,
            introCourseId,
            additionalDesiredInfo,
            visible,
        } = this.state;

        const courseTags = course.courseTags || [];
        let fetchingTags;
        existingTags.length > 0 ? fetchingTags = existingTags : fetchingTags = courseTags;

        return (
            <>
                {
                    course
                        ? (
                            <div className="editCourse">
                                <div className="actions-top-block">
                                    <Button type="primary" loading={exportCourseLoader} onClick={() => this.exportToJson(course.id)}>
                                        Export JSON
                                        {' '}
                                        <Icon type="export" />
                                    </Button>
                                    <Button className="btn-primary" type="primary" style={{ float: 'right' }} onClick={this.toggleModal}>
                                        Preview
                                    </Button>
                                </div>
                                <div className="small-input">
                                    <span className="inputSpan">Course slug</span>
                                    <Input value={slug} name="slug" placeholder="Course slug" onChange={this.inputChangeHandler} />
                                </div>
                                <div className="categorySelect">
                                    <span className="inputSpan">Select Status</span>
                                    <Select className="filterSelect" value={status} onChange={this.selectStatus}>
                                        {
                                            statuses.map((item, key) => <Option value={item} key={key}>{item}</Option>)
                                        }
                                    </Select>
                                </div>
                                {status === 'Desired'
                                    ? (
                                        <div className='categorySelect'>
                                            <span className="inputSpan">Proposal Description</span>
                                            <TextArea
                                                name='additionalDesiredInfo'
                                                value={additionalDesiredInfo}
                                                onChange={this.inputChangeHandler}
                                                placeholder='Enter any additional information to describe this desired course'
                                            />
                                        </div>
                                    )
                                    : null}
                                <div className="categorySelect">
                                    <span className="inputSpan">Select Course Types</span>
                                    <Select className="filterSelect" value={type} onChange={this.selectCourseType}>
                                        {
                                            courseTypes.map((item, key) => (
                                                <Option
                                                    value={item}
                                                    key={key}
                                                    disabled={item === COURSE_TYPE.INTRODUCTION
                                                        && hasIntro
                                                        && introCourseId !== course.id}
                                                    style={{ display: 'flex', justifyContent: 'space-between' }}
                                                >
                                                    <span>
                                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                                    </span>
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                </div>
                                <Descriptions layout="vertical" className="courseDescriptionContainerGroup">
                                    <Descriptions.Item label={showTokenCostError ? 'Token cost is incorrect' : 'Token cost'} state={{ color: 'red' }} className={showTokenCostError && 'tokenCost-validation'}>
                                        <Input name="token_cost" placeholder="Token cost" value={tokenCost} type="number" min={1} onChange={this.inputChangeHandler} />
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
                                        <DatePicker name="version_date" value={versionDate ? moment(versionDate) : null} onChange={this.onChangeDate} />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Value Rating">
                                        <div className="rate-container">
                                            <Rate
                                                name="value_rating"
                                                allowClear
                                                allowHalf
                                                value={valueRating}
                                                onChange={this.changeRatingValue}
                                            />
                                        </div>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Number of ratings">
                                        <Input name="number_of_ratings" value={numberOfRatings} placeholder="Number of ratings" onChange={this.inputChangeHandler} />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Enrolled students">
                                        <Input name="enrolled_students" value={enrolledStudents} placeholder="Enrolled students" onChange={this.inputChangeHandler} />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Publicly visible">
                                        <Switch
                                            className='publicly_visible'
                                            checked={publiclyVisible}
                                            onChange={this.changePubliclyVisible}
                                            checkedChildren={<Icon type="check" />}
                                            unCheckedChildren={<Icon type="close" />}
                                        />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Badge of certification">
                                        <Switch
                                            checked={certBadge}
                                            className='badge_of_certification'
                                            onChange={this.changeCertificationInclude}
                                            checkedChildren={<Icon type="check" />}
                                            unCheckedChildren={<Icon type="close" />}
                                        />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Certificate of completion">
                                        <Switch
                                            className='certificate_of_completion'
                                            checked={certificateOfCompletion}
                                            onChange={this.changeCertificateOfCompletion}
                                            checkedChildren={<Icon type="check" />}
                                            unCheckedChildren={<Icon type="close" />}
                                        />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Free access">
                                        <Switch
                                            className='free_access'
                                            checked={freeAccess}
                                            onChange={this.changeFreeAccess}
                                            checkedChildren={<Icon type="check" />}
                                            unCheckedChildren={<Icon type="close" />}
                                        />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Lab steps in personal archive">
                                        <Switch
                                            className='lab_steps_in_personal_archive'
                                            checked={labStepsInPersonalArchive}
                                            onChange={this.changeLabStepsInArchive}
                                            checkedChildren={<Icon type="check" />}
                                            unCheckedChildren={<Icon type="close" />}
                                        />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Access Request">
                                        <Switch
                                            className='access_request'
                                            checked={accessRequest}
                                            onChange={this.changeAccessRequest}
                                            checkedChildren={<Icon type="check" />}
                                            unCheckedChildren={<Icon type="close" />}
                                        />
                                    </Descriptions.Item>
                                </Descriptions>
                                <Divider />
                                <Card
                                    title="Assign tags for this course"
                                    className="courseDescriptionSection"
                                    extra={<Button type="primary" shape="round" icon="tag" onClick={this.toggleTagsModal}>Add Tag</Button>}
                                >
                                    <div className="assignTagsToCourse">
                                        <Select
                                            mode="tags"
                                            style={{ width: '100%' }}
                                            placeholder="Tags Mode"
                                            value={tags}
                                            notFoundContent={fetching ? <Spin size="small" /> : null}
                                            onChange={this.onChangeTags}
                                            onDeselect={this.onDeselected}
                                            onSelect={this.onSelected}
                                            onSearch={this.onSearchTags}
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
                                {
                                    tagsModal
                                && (
                                    <TagsModal
                                        visible={tagsModal}
                                        toggleTagsModal={this.toggleTagsModal}
                                        updateTags={updateTags}
                                        fetchTags={fetchTags}
                                    />
                                )
                                }
                                <div className="buttonsContainer">
                                    <div className="savePreviewContainer">
                                        <Button type="primary" loading={loading} onClick={this.updateCourse}>
                                            Save
                                            {' '}
                                            <Icon type="save" />
                                        </Button>
                                        <Button type="primary" loading={exportCourseLoader} onClick={() => this.exportToJson(course.id)}>
                                            Export JSON
                                            {' '}
                                            <Icon type="export" />
                                        </Button>
                                        <Button type="danger" onClick={() => this.deleteCourse(course.id)}>
                                            Delete
                                            {' '}
                                            <Icon type="delete" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="courseDescriptionContainer">
                                    <Title level={4}>Issue Management</Title>
                                    <span className="inputSpan">Notify Fellow of issue</span>
                                    <Input placeholder="title" onChange={this.editFellowTitleInput} value={notifyFellowData.title} />
                                    <div className="descriptionText">
                                        <Input.TextArea rows={3} placeholder='description' value={notifyFellowData.description} onChange={this.editFellowDescriptionInput} />
                                    </div>
                                    <Button style={{ marginTop: '10px' }} type="primary" onClick={this.toggleUserCreateModal}>Upload File</Button>
                                    {notifyFellowData.fileName && notifyFellowData.file && (
                                        <div style={{ marginTop: '10px' }}>
                                            Uploaded file:
                                            <a href={notifyFellowData.file}>
                                                <Icon type="link" />
                                                {' '}
                                                {notifyFellowData.fileName}
                                                {' '}
                                            </a>
                                            <Tooltip title="delete file">
                                                <Icon style={{ cursor: 'pointer' }} onClick={this.deleteFileData} type="delete" />
                                            </Tooltip>
                                        </div>
                                    )}
                                </div>
                                <div className="buttonsContainer">
                                    <div className="send-email-container">
                                        <Button type="primary" loading={mailFellowsLoading} onClick={this.sendMailFellows}>
                                            Send Mail Fellows
                                            {' '}
                                            <Icon type="save" />
                                        </Button>
                                    </div>
                                </div>
                                <AdminUploadFileModal
                                    toggleModal={this.toggleUserCreateModal}
                                    visible={adminUploadFileModalVisible}
                                    uploadFilesForFellows={this.uploadFilesForFellows}
                                    toggleLoadingModal={this.toggleLoadingModal}
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
                                    width="90%"
                                >
                                    <CourseInformationModal
                                        course={this.state}
                                        courseData={course}
                                    />
                                </Modal>
                            </div>
                        )
                        : (
                            <div>
                                <h3>Course not found</h3>
                            </div>
                        )
                }
            </>
        );
    }
}

export { AdminSettings };
export default withRouter(AdminSettings);
