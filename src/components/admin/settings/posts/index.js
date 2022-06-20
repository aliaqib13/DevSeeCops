import React, { Component } from 'react';
import {
    Table, Button, message, Modal,
} from 'antd';
import PostModal from './PostModal';

const { Column } = Table;
const confirmModal = Modal.confirm;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createModalVisible: false,
            selectedStep: null,
            perPage: 10,
            currentPage: 1,
        };
    }

    componentDidMount() {
    }

    toggleModal = () => {
        const { createModalVisible } = this.props;
        this.setState({
            createModalVisible: !createModalVisible,
        });
    }

    addPost = () => {
        this.setState({
            selectedStep: null,
        });
        this.toggleModal();
    }

    updatePost = id => {
        const posts = [...this.props.posts.posts];
        const selectedStep = posts[posts.findIndex(post => post.id === id)];
        this.setState({ selectedStep });
        this.toggleModal();
    }

    deletePost = id => confirmModal({
        title: 'Are you sure to delete this post',
        okText: 'Yes',
        okType: 'primary',
        cancelText: 'No',
        onOk: () => {
            const loader = message.loading('deleting...');
            this.props.removePost(id).then(res => {
                if (res === true) {
                    loader();
                    message.success('deleted');
                } else {
                    message.error('something went wrong please try again');
                }
            });
        },
    })

    paginate = page => {
        const { fetchPosts } = this.props;
        this.setState({
            currentPage: page,
        });
        return fetchPosts(page);
    }

    render() {
        const { posts } = this.props;
        const { createModalVisible, perPage, currentPage } = this.state;
        return (
            <div className="posts-container">
                <Button type="primary" onClick={this.addPost}>Add New Post</Button>
                {
                    posts
                    && (
                        <Table
                            dataSource={posts.posts}
                            rowKey={item => item.id}
                            pagination={{
                                onChange: this.paginate,
                                pageSize: perPage,
                                position: 'both',
                                total: posts.total,
                                defaultCurrent: 1,
                                current: currentPage,
                            }}
                        >
                            <Column title="Title" dataIndex="title" key="title" />
                            <Column title="Type" dataIndex="type" key="type" />
                            <Column
                                title="Image"
                                key="text"
                                render={record => (
                                    record.image
                                        ? <img src={record.image} alt="" width={70} />
                                        : <img src='/img/photo-camera.svg' alt="" width={70} />
                                )}
                            />
                            <Column
                                title="Actions"
                                key="actions"
                                render={record => (
                                    <div>
                                        <Button type="danger" onClick={() => this.deletePost(record.id)} shape="round">Delete</Button>
                                        <Button type="primary" style={{ marginLeft: '2%' }} onClick={() => this.updatePost(record.id)} shape="round">Update </Button>
                                    </div>
                                )}
                            />
                        </Table>
                    )
                }

                {
                    createModalVisible
                    && (
                        <PostModal
                            toggleModal={this.toggleModal}
                            visible={createModalVisible}
                            searchUserByEmail={this.props.searchUserByEmail}
                            searchCourse={this.props.searchCourse}
                            uploadImage={this.props.uploadImage}
                            createPost={this.props.createPost}
                            selectedStep={this.state.selectedStep}
                            updatePost={this.props.updatePost}
                            fetchPostTags={this.props.fetchPostTags}
                            updateTags={this.props.updateTags}
                            searchPostTag={this.props.searchPostTag}
                        />
                    )
                }

            </div>
        );
    }
}

export default Index;
