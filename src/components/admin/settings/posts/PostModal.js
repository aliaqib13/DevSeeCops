import React, { Component } from 'react';
import {
    Modal, Form, Input, Select, Button, message, Spin, Card,
} from 'antd';
import CKEditor from 'ckeditor4-react';
import PostTagsModal from './postTagsModal';
import './add.scss';

const { Item } = Form;
const { Option } = Select;

const types = [
    {
        title: 'Academy news',
        value: 'academy_news',
    },
    {
        title: 'Community news',
        value: 'community_news',
    },
];
class PostModal extends Component {
    state = this.initialState

    get initialState() {
        return {
            type: '',
            title: '',
            text: '',
            image: '',
            author_name: '',
            courses: [],
            coursesValue: [],
            searchedCourses: [],
            searchedFellows: [],
            fellows: [],
            fellowsValue: [],
            tags: [],
            tagValues: [],
            searchedTags: [],
            loading: false,
            fetchingUsers: false,
            fetchingCourses: false,
            tagsModal: false,
        };
    }

    componentDidMount() {
        const { selectedStep } = this.props;
        if (selectedStep) {
            const courses = selectedStep.courses.map(item => (item.id));
            const searchedCourses = selectedStep.courses.map(item => ({ id: item.id, title: item.title }));
            const coursesValue = selectedStep.courses.map(item => (item.title));
            const fellows = selectedStep.fellows.map(item => (item.id));
            const searchedFellows = selectedStep.fellows.map(item => ({ id: item.id, email: item.email }));
            const fellowsValue = selectedStep.fellows.map(item => (item.email));
            const tags = selectedStep.tags.map(item => (item.id));
            const searchedTags = selectedStep.tags.map(item => ({ id: item.id, title: item.title }));
            const tagValues = selectedStep.tags.map(item => (item.title));
            this.setState({
                ...this.state,
                ...this.props.selectedStep,
                courses,
                searchedCourses,
                coursesValue,
                fellows,
                searchedFellows,
                fellowsValue,
                tags,
                searchedTags,
                tagValues,
            });
        }
    }

    cancelPost = () => {
        this.setState(this.initialState);
        this.props.toggleModal();
    }

    savePost = () => {
        const {
            type, title, text, image, courses, fellows, author_name, tags,
        } = this.state;
        this.props.createPost({
            type, title, text, image, courses, fellows, author_name, tags,
        }).then(res => {
            if (res === true) {
                message.success('added');
            } else {
                message.error('something went wrong please try again!');
            }
            this.props.toggleModal();
        });
    }

    updatePost = id => {
        const {
            type, title, text, image, courses, fellows, author_name, tags,
        } = this.state;
        const loader = message.loading('updating...');
        this.props.updatePost(id, {
            type, title, text, image, courses, fellows, author_name, tags,
        }).then(res => {
            if (res === true) {
                message.success('updated');
            } else {
                message.error('something went wrong please try again');
            }
            loader();
        });
        this.props.toggleModal();
    }

    onChangePostType = type => {
        this.setState({
            type,
        });
    }

    onChangeHandle = e => {
        if (e.editor) {
            this.setState({
                text: e.editor.getData(),
            });
            return false;
        }
        const { name } = e.target;
        const { value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    onSearchFellowEmail = fellowEmail => {
        if (fellowEmail.length > 3 && fellowEmail.length < 50) {
            this.setState({
                fetchingUsers: true,
                searchedFellows: [],
            });
            this.props.searchUserByEmail(fellowEmail).then(res => {
                if (res !== false) {
                    const searchedFellows = [...res];
                    this.setState({
                        searchedFellows,
                        fetchingUsers: false,
                    });
                }
            });
        }
    }

    onSearchCourse = title => {
        if (title.length > 3 && title.length < 100) {
            this.props.searchCourse(title).then(res => {
                if (res !== false) {
                    const searchedCourses = [...res];
                    this.setState({
                        searchedCourses,
                    });
                } else {
                    message.error('something went wrong please try again!');
                }
            });
        }
    }

    uploadImage = e => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);
        const loader = message.loading('uploading...', 0);
        this.props.uploadImage(data, 'posts').then(res => {
            if (res === false) {
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

    onSelectFellow = (value, props) => {
        const { key } = props;
        if (Number.isNaN(parseInt(key))) {
            return message.error('please select from existing email');
        }
        const fellowsValue = [...this.state.fellowsValue];
        const fellows = [...this.state.fellows];
        fellowsValue.push(value);
        fellows.push(key);
        this.setState({
            fellowsValue,
            fellows,
        });
    }

    onDeselectFellow = (value, props) => {
        const { key } = props;
        const fellowsValue = [...this.state.fellowsValue];
        const fellows = [...this.state.fellows];
        fellowsValue.splice(fellowsValue.indexOf(value), 1);
        fellows.splice(fellows.indexOf(parseInt(key)), 1);
        this.setState({
            fellows,
            fellowsValue,
        });
    }

    onSelectCourse = (value, props) => {
        const { key } = props;
        if (Number.isNaN(parseInt(key))) {
            return message.error('please select from existing courses');
        }
        const coursesValue = [...this.state.coursesValue];
        const courses = [...this.state.courses];
        coursesValue.push(value);
        courses.push(key);
        this.setState({
            courses,
            coursesValue,
        });
    }

    onDeselectCourse = (value, params) => {
        const { key } = params;
        const coursesValue = [...this.state.coursesValue];
        const courses = [...this.state.courses];
        coursesValue.splice(coursesValue.indexOf(value), 1);
        courses.splice(courses.indexOf(parseInt(key)), 1);
        this.setState({
            courses,
            coursesValue,
        });
    }

    toggleTagsModal = () => {
        this.setState({
            tagsModal: !this.state.tagsModal,
        });
    }

    onSearchTags = tag => {
        if (tag.length > 1 && tag.length < 50) {
            this.setState({
                searchedTags: [],
            });
            this.props.searchPostTag(tag).then(res => {
                if (res === false) {
                    message.error('something went wrong please try again');
                } else {
                    const searchedTags = [...res];
                    this.setState({
                        searchedTags,
                    });
                }
            });
        }
    }

    onSelectTags = (value, props) => {
        const { key } = props;
        if (Number.isNaN(parseInt(key))) {
            return message.error('please select from existing Tags');
        }
        const tagValues = [...this.state.tagValues];
        const tags = [...this.state.tags];
        tagValues.push(value);
        tags.push(key);
        this.setState({
            tags,
            tagValues,
        });
    }

    onDeselectTags = (value, props) => {
        const { key } = props;
        const tagValues = [...this.state.tagValues];
        const tags = [...this.state.tags];
        tags.splice(tags.indexOf(key), 1);
        tagValues.splice(tagValues.indexOf(value), 1);
        this.setState({
            tags,
            tagValues,
        });
    }

    render() {
        const {
            type, title, text,
            image, searchedCourses,
            searchedFellows, loading,
            fetchingUsers, fellowsValue,
            fetchingCourses, coursesValue,
            author_name, tagsModal, tagValues, searchedTags,
        } = this.state;
        const { visible, selectedStep } = this.props;
        return (
            <Modal
                onCancel={this.props.toggleModal}
                title={(selectedStep) ? 'Update Post' : 'Create Post'}
                visible={visible}
                footer={[
                    <Button key="back" onClick={this.cancelPost}>
                        Cancel
                    </Button>,
                    (selectedStep)
                        ? (
                            <Button key="create" type="primary" onClick={() => this.updatePost(selectedStep.id)} loading={loading}>
                                Update
                            </Button>
                        )
                        : (
                            <Button key="create" type="primary" onClick={this.savePost} loading={loading}>
                                Create
                            </Button>
                        ),
                ]}
            >
                <Form>
                    <Item label="Select Post Type">
                        <Select placeholder="Select Post Type" onChange={this.onChangePostType} value={type}>
                            {
                                types.map((item, key) => <Option key={key} value={item.value}>{item.title}</Option>)
                            }
                        </Select>
                    </Item>
                    <Card
                        title="Assign tags for this Post"
                        className="post-tags"
                        style={{ marginTop: '3%' }}
                        extra={<Button type="primary" shape="round" icon="tag" onClick={this.toggleTagsModal}>Add Tag</Button>}
                    >
                        <div className="assignTagsToCourse">
                            <Select
                                mode="tags"
                                style={{ width: '100%' }}
                                placeholder="Add Tags"
                                value={tagValues}
                                onDeselect={this.onDeselectTags}
                                onSelect={this.onSelectTags}
                                onSearch={this.onSearchTags}
                            >
                                { searchedTags.map(item => (
                                    <Select.Option key={item.id} value={item.title}>
                                        {item.title}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                    </Card>
                    <Item label="Post Title">
                        <Input type="text" name="title" onChange={this.onChangeHandle} value={title} />
                    </Item>
                    <Item label="Author name">
                        <Input type="text" name="author_name" onChange={this.onChangeHandle} value={author_name} />
                    </Item>
                    <Item label="Post Text">
                        <CKEditor
                            name="text"
                            data={text}
                            onChange={this.onChangeHandle}
                            onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
                        />
                    </Item>
                    <Item label="Add Fellows">
                        <Select
                            mode='tags'
                            style={{ width: '100%' }}
                            placeholder="search by email"
                            value={fellowsValue}
                            notFoundContent={fetchingUsers ? <Spin size="small" /> : null}
                            filterOption={false}
                            onSearch={this.onSearchFellowEmail}
                            onSelect={this.onSelectFellow}
                            onDeselect={this.onDeselectFellow}
                        >
                            {searchedFellows.map(item => (
                                <Select.Option key={item.id} value={item.email}>
                                    {item.email}
                                </Select.Option>
                            ))}
                        </Select>
                    </Item>
                    <Item label="Add Courses">
                        <Select
                            mode='tags'
                            style={{ width: '100%' }}
                            placeholder="search by Course Title"
                            value={coursesValue}
                            notFoundContent={fetchingCourses ? <Spin size="small" /> : null}
                            filterOption={false}
                            onSearch={this.onSearchCourse}
                            onSelect={this.onSelectCourse}
                            onDeselect={this.onDeselectCourse}
                        >
                            {searchedCourses.map(item => (
                                <Select.Option key={item.id} value={item.title}>
                                    {item.title}
                                </Select.Option>
                            ))}
                        </Select>
                    </Item>
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
                </Form>
                {
                    tagsModal
                    && (
                        <PostTagsModal
                            visible={tagsModal}
                            toggleTagsModal={this.toggleTagsModal}
                            updateTags={this.props.updateTags}
                            fetchTags={this.props.fetchPostTags}
                        />
                    )
                }
            </Modal>
        );
    }
}

export default PostModal;
