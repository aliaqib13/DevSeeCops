import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Button, message, Modal, Table, Empty, Input, Dropdown, Menu, Icon, Form,
} from 'antd';
import {
    fetchCategories, deleteCategory, createCategory,
} from '../../../store/actions/admin/course';
import './categories.scss';

const { TextArea } = Input;
const { Column } = Table;
const confirmModal = Modal.confirm;
const { Item } = Form;

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            name: '',
            description: '',
        };
    }

    componentDidMount() {
        const loader = message.loading('loading...', 0);
        const { fetchCategoriesFunc } = this.props;
        fetchCategoriesFunc().then(res => {
            loader();
            if (res === true) {
                return message.success('loaded!');
            }
            return message.error('something went wrong, cant load categories!');
        });
    }

    openCreateModal = () => {
        this.setState({
            name: '',
            description: '',
        });
        this.toggleModal();
    }

    toggleModal = () => {
        this.setState(prevState => ({
            visible: !prevState.visible,
        }));
    }

    addCategory = () => {
        const { name, description } = this.state;
        const { createCategoryFunc } = this.props;
        createCategoryFunc({
            name,
            description,
        }).then(res => {
            if (res === true) {
                this.toggleModal();
                return message.success('Category created.');
            }
            return message.error(res.message);
        });
    }

    deleteCategory = (e, id) => {
        const { deleteCategoryFunc } = this.props;
        confirmModal({
            title: 'Are you sure delete this category?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                deleteCategoryFunc(1, id).then(res => {
                    if (res === true) {
                        return message.success('Deleted.');
                    }
                    return message.error(res.message);
                });
            },
        });
    }

    goToEditCategory = id => {
        const { history } = this.props;
        history.push(`/platform/admin/categories/${id}`);
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    goToEditCoursePage = id => {
        const { history } = this.props;
        history.push(`/platform/admin/edit-course/${id}`);
    }

    render() {
        const { categories } = this.props;
        const {
            visible, name, description,
        } = this.state;

        return (
            <div className="categories-container">
                <Button type="primary" onClick={this.openCreateModal}>Add New Category</Button>
                {
                    categories
                        ? (
                            <Table dataSource={categories} rowKey={item => item.key}>
                                <Column
                                    title="Category Name"
                                    dataIndex="name"
                                    key="name"
                                />
                                <Column
                                    title="Description"
                                    dataIndex="description"
                                    key="description"
                                />
                                <Column
                                    title="Actions"
                                    key="actions"
                                    render={record => (
                                        <div>
                                            {
                                                (record.courses && record.courses.length === 0)
                                                && (record.learningPaths && record.learningPaths.length === 0)
                                            && (
                                                <Button
                                                    type="danger"
                                                    style={{ marginLeft: '2%' }}
                                                    onClick={e => this.deleteCategory(e, record.id)}
                                                    shape="round"
                                                >
                                                    Delete
                                                </Button>
                                            )
                                            }
                                            <Button
                                                type="primary"
                                                style={{ marginLeft: '2%' }}
                                                onClick={() => this.goToEditCategory(record.id)}
                                                shape="round"
                                            >
                                                Update
                                            </Button>
                                        </div>
                                    )}
                                />
                                <Column
                                    title="Courses"
                                    key="courses"
                                    render={record => (
                                        (record.courses && record.courses.length > 0)
                                            ? (
                                                <>
                                                    <Dropdown overlay={(
                                                        <Menu>
                                                            {
                                                                record.courses.map(item => (
                                                                    <Menu.Item
                                                                        key={item.id}
                                                                        onClick={() => this.goToEditCoursePage(item.id)}
                                                                    >
                                                                        {item.title}
                                                                    </Menu.Item>
                                                                ))
                                                            }
                                                        </Menu>
                                                    )}
                                                    >
                                                        <Button>
                                                            Courses
                                                            {' '}
                                                            <Icon type="down" />
                                                        </Button>
                                                    </Dropdown>
                                                    <span>
                                                        {' '}
                                                        Count (
                                                        {record.courses.length}
                                                        )
                                                        {' '}
                                                    </span>
                                                </>
                                            )
                                            : <>Haven`t Assigned Courses</>
                                    )}
                                />
                            </Table>
                        ) : <Empty />
                }

                <Modal
                    title='Create Category'
                    visible={visible}
                    onCancel={this.toggleModal}
                    footer={[
                        <Button key="back" onClick={this.toggleModal}>
                            Cancel
                        </Button>,
                        <Button
                            key="save"
                            type="primary"
                            onClick={this.addCategory}
                        >
                            Create
                        </Button>,
                    ]}
                >
                    <Item label="Name">
                        <Input onChange={this.handleOnChange} name="name" value={name} />
                    </Item>
                    <Item label="Description">
                        <TextArea rows={3} name='description' value={description} onChange={this.handleOnChange} />
                    </Item>
                </Modal>
            </div>
        );
    }
}

Categories.propTypes = () => ({
    fetchCategoriesFunc: PropTypes.func,
    createCategoryFunc: PropTypes.func,
    deleteCategoryFunc: PropTypes.func,
});

const mapStateToProps = state => ({
    categories: state.adminCourse.categories,
});
const mapDispatchToProps = dispatch => ({
    fetchCategoriesFunc: () => dispatch(fetchCategories()),
    createCategoryFunc: data => dispatch(createCategory(data)),
    deleteCategoryFunc: (index, id) => dispatch(deleteCategory(index, id)),
});
export { Categories };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Categories));
