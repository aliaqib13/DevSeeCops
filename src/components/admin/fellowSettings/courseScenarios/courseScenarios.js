import React, { Component } from 'react';
import {
    Button, Table, Dropdown, Menu, Icon, Modal, message, Tooltip,
} from 'antd';
import CourseScenariosCreate from './courseScenariosCreate';
import CourseScenariosEdit from './courseScenariosEdit';
import './courseScenarios.scss';

const { Column } = Table;
const confirmModal = Modal.confirm;

class CourseScenarios extends Component {
    constructor(props) {
        super(props);

        this.state = {
            creating: false,
            editing: false,
            editingCourseScenario: '',
        };
    }

    toggleCreate = () => {
        this.setState({
            creating: !this.state.creating,
        });
    }

    toggleEdit = () => {
        this.setState({
            editing: !this.state.editing,
        });
    }

    edit = id => {
        const { courseScenarios } = this.props;
        const courseScenario = courseScenarios.find(item => item.id === id);
        this.setState({
            editingCourseScenario: courseScenario,
        });
        this.toggleEdit();
    }

    showDeleteConfirm = id => {
        confirmModal({
            title: 'Are you sure delete this course scenario?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.props.deleteCourseScenarios(id).then(res => {
                    if (res === true) {
                        message.success('Deleted');
                    } else {
                        message.error(res.message);
                    }
                });
            },
        });
    }

    render() {
        const { creating, editing, editingCourseScenario } = this.state;
        const {
            categories, labBlocks, createCourseScenarios, courseScenarios, updateCourseScenarios,
        } = this.props;
        return (
            <>
                <Button type="primary" className="createToggleButton" onClick={this.toggleCreate}>Create</Button>
                <Table dataSource={courseScenarios} pagination={false}>
                    <Column title="Course Scenario" render={(text, record, index) => record.title} />
                    <Column title="Category" render={(text, record, index) => record.category.name} />
                    <Column title="Object" render={(text, record, index) => record.object} />
                    <Column
                        title="Lab Building blocks"
                        render={(text, record, index) => (record.labBlockContent.length ? record.labBlockContent.map((item, index) => (
                            <Tooltip title={item.description}>
                                {item.title}
                                {(index >= record.labBlockContent.length - 1) ? '' : ', '}
                            </Tooltip>
                        )) : 'Does not exist')}
                    />
                    <Column
                        title="Action"
                        key="actions"
                        render={(text, record) => (
                            <Dropdown overlay={(
                                <Menu>
                                    <Menu.Item onClick={() => this.edit(record.id)}>
                                        Edit
                                    </Menu.Item>
                                    <Menu.Item onClick={() => this.showDeleteConfirm(record.id)}>
                                        Delete
                                        {' '}
                                        <Icon type="delete" />
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
                <CourseScenariosCreate
                    categories={categories}
                    createCourseScenarios={createCourseScenarios}
                    labBlocks={labBlocks}
                    toggleCreate={this.toggleCreate}
                    showCreateModal={creating}
                />
                <CourseScenariosEdit
                    categories={categories}
                    updateCourseScenarios={updateCourseScenarios}
                    labBlocks={labBlocks}
                    toggleEdit={this.toggleEdit}
                    editingCourseScenario={editingCourseScenario}
                    showEditingModal={editing}
                />
            </>

        );
    }
}

export default CourseScenarios;
