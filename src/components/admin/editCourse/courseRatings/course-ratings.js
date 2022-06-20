import React, { Component } from 'react';
import './course-ratings.scss';
import {
    Button,
    Input,
    Rate,
    List,
    Card,
    Modal,
    Form,
    Avatar,
    message,
    Icon,
    Switch,
    Descriptions,
    AutoComplete,
} from 'antd';
import UploadImage from '../step-images/upload-image';

const { TextArea } = Input;
const { Meta } = Card;
const confirmModal = Modal.confirm;

const initialState = {
    visible: false,
    loading: false,
    updateRatingId: 0,
    userImage: '',
    authorName: '',
    rate: 0,
    text: '',
    generic_rating: 0,
    searchList: [],
    inputValue: '',
    searchResult: [],
    author_id: null,
};

class CourseRatings extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        const loader = message.loading('Loading..', 0);
        this.props.fetchRatings(this.props.courseId).then(res => {
            loader();
        });
    }

    openModal = ({
        id, author_name, image, rate, text, generic_rating, user_id,
    }) => {
        if (id) {
            this.setState({
                updateRatingId: id,
                authorName: author_name,
                author_id: user_id,
                userImage: image,
                rate,
                text,
                visible: true,
                generic_rating,
            });
        } else {
            this.setState({
                visible: true,
            });
        }
    }

    closeModal = () => {
        this.setState({
            visible: false,
            loading: false,
            userImage: '',
            authorName: '',
            rate: 0,
            text: '',
            generic_rating: 0,
        });
    }

    uploadImage = async uri => {
        this.setState({
            userImage: uri,
        });
        return Promise.resolve(true);
    }

    changeRateHandler = rate => {
        this.setState({
            rate,
        });
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    createRating = () => {
        const {
            userImage, authorName, rate, text, generic_rating, author_id,
        } = this.state;
        this.setState({
            loading: true,
        });

        this.props.addRating(this.props.courseId, {
            image: userImage,
            author_name: authorName,
            user_id: author_id,
            rate,
            text,
            generic_rating,
        }).then(res => {
            this.setState({ loading: false });

            if (res === true) {
                message.success('Created.');
                this.setState(initialState);
                this.closeModal();
            } else if (res.errors) {
                res.errors.forEach(error => {
                    message.error(error.message);
                });
            } else {
                message.error(res.message);
            }
        });
    }

    changeGenericRating = () => {
        this.setState({
            generic_rating: !this.state.generic_rating,
        });
    }

    updateRating = () => {
        const {
            userImage, authorName, rate, text, updateRatingId, generic_rating, author_id,
        } = this.state;
        this.setState({ loading: true });

        this.props.updateRating(updateRatingId, {
            image: userImage,
            author_name: authorName,
            user_id: author_id,
            rate,
            text,
            generic_rating,
        }).then(res => {
            this.setState({ loading: false });
            if (res === true) {
                message.success('Updated.');
                this.setState(initialState);
                this.closeModal();
            } else if (res.errors) {
                res.errors.forEach(error => {
                    message.error(error.message);
                });
            } else {
                message.error(res.message);
            }
        });
    }

    deleteRating = id => {
        confirmModal({
            title: 'Are you sure you want to delete this rating?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            okButtonProps: {
                loading: this.state.loading,
            },
            onOk: () => {
                this.setState({ loading: true });

                this.props.deleteRating(id).then(res => {
                    this.setState({ loading: false });
                    if (res === true) {
                        message.success('Deleted');
                    } else {
                        message.error(res.message);
                    }
                });
            },
        });
    }

    onSearchUser = value => {
        if (value.length >= 3 && value.length < 255) {
            this.props.searchUserByEmail(value).then(res => {
                if (res !== false) {
                    const searchList = [];
                    res.forEach(item => {
                        searchList.push(item.email);
                    });
                    this.setState({
                        searchList,
                        searchResult: res,
                    });
                }
            });
        }
    }

    onSelectUser = value => {
        const { searchResult } = this.state;
        const author = searchResult[searchResult.findIndex(item => item.email === value)];
        this.setState({
            authorName: `${author.firstname} ${author.lastname}`,
            author_id: author.id,
            searchList: [],

        });
    }

    onChangeUserName = inputValue => {
        this.setState({
            inputValue,
        });
    }

    render() {
        const {
            visible, authorName, text, rate, userImage, loading, updateRatingId, generic_rating, searchList, inputValue,
        } = this.state;
        const { courseRatings } = this.props;

        const footerOkButton = updateRatingId
            ? <Button key="update" type="primary" onClick={this.updateRating} loading={loading}>Update</Button>
            : <Button key="delete" type="primary" onClick={this.createRating} loading={loading}>Add</Button>;

        return (
            <div className="course-ratings-container">
                <Button type="default" onClick={this.openModal}>Add Rating</Button>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={courseRatings}
                    pagination={{
                        pagination: 'bottom',
                        pageSize: 8,
                        total: courseRatings.length,
                        defaultCurrent: 1,
                    }}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                actions={[
                                    <Icon type="edit" key="edit" onClick={() => this.openModal(item)} />,
                                    <Icon type="delete" key="delete" onClick={() => this.deleteRating(item.id)} />,
                                ]}
                            >
                                <Meta
                                    avatar={
                                        <Avatar src={item.image} size="large" />
                                    }
                                    title={item.author_name}
                                />
                                <div className="card-body">
                                    <Rate allowHalf disabled value={item.rate} />
                                    <p>{item.text}</p>
                                </div>

                            </Card>
                        </List.Item>
                    )}
                />
                <Modal
                    title="Add Rating"
                    visible={visible}
                    destroyOnClose
                    onCancel={this.closeModal}
                    footer={[
                        <Button key="cancel" type="default" onClick={this.closeModal}>Cancel</Button>,
                        footerOkButton,
                    ]}
                >
                    <div className="add-rating">
                        <UploadImage
                            uploadImage={this.uploadImage}
                        />
                        <Form layout="vertical">
                            {
                                userImage
                                    ? (
                                        <Form.Item>
                                            <Avatar size="large" icon="user" src={userImage} />
                                        </Form.Item>
                                    ) : <></>
                            }
                            <Form.Item label="Author name">
                                <Input name="authorName" value={authorName} onChange={this.onChangeHandler} />
                            </Form.Item>
                            <Form.Item label="Add Author name by existing users email">
                                <AutoComplete
                                    size="large"
                                    style={{ width: '100%' }}
                                    dataSource={searchList}
                                    onSelect={this.onSelectUser}
                                    placeholder="search by email"
                                    onSearch={this.onSearchUser}
                                    value={inputValue}
                                    onChange={this.onChangeUserName}
                                >
                                    <Input
                                        suffix={(
                                            <Button
                                                size="large"
                                                style={{ marginRight: -12 }}
                                                type="primary"
                                                onClick={() => this.addUserCourse()}
                                                // loading={addUserLoader}
                                            >
                                                <Icon type="user-add" />
                                            </Button>
                                        )}
                                    />
                                </AutoComplete>
                            </Form.Item>
                            <Form.Item label="Rating">
                                <Rate allowHalf value={rate} onChange={this.changeRateHandler} />
                            </Form.Item>
                            <Form.Item label="Text" onChange={this.onChangeHandler}>
                                <TextArea name="text" value={text} maxLength={400} rows={4} />
                            </Form.Item>
                            <Descriptions>
                                <Descriptions.Item label="Generic rating">
                                    <Switch
                                        className='generic_rating'
                                        checked={Boolean(generic_rating)}
                                        onChange={this.changeGenericRating}
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="close" />}
                                    />
                                </Descriptions.Item>
                            </Descriptions>
                        </Form>
                    </div>

                </Modal>
            </div>
        );
    }
}

export default CourseRatings;
