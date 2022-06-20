import React, { Component } from 'react';
import {
    Input, Button, Select, message, Form, Modal,
} from 'antd';

const { Item } = Form;
const { Option } = Select;

class CourseScenariosEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            category_id: '',
            object: '',
            selected_lab_blocks: [],
            selected_lab_blocks_titles: [],
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { editingCourseScenario, labBlocks } = this.props;
        if (editingCourseScenario && JSON.stringify(editingCourseScenario) !== JSON.stringify(prevProps.editingCourseScenario)) {
            const selected_lab_blocks = editingCourseScenario.lab_blocks ? JSON.parse(editingCourseScenario.lab_blocks) : [];
            const selected_lab_blocks_titles = selected_lab_blocks.map(item => {
                const block = labBlocks.find(block => block.id === item) || {};
                return block.title;
            });
            this.setState({
                title: editingCourseScenario.title,
                object: editingCourseScenario.object,
                category_id: editingCourseScenario.category_id,
                selected_lab_blocks,
                selected_lab_blocks_titles,
            });
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCategoryChange = value => {
        this.setState({ category_id: value });
    }

    updateScenario = () => {
        const {
            title, category_id, object, selected_lab_blocks,
        } = this.state;
        if (!title || !category_id || !object || !selected_lab_blocks.length) {
            message.error('Please complete all the fields');
        } else {
            const lab_blocks = JSON.stringify(selected_lab_blocks);
            this.props.updateCourseScenarios(this.props.editingCourseScenario.id,
                {
                    title, category_id, object, lab_blocks,
                }).then(res => {
                if (res) {
                    message.success('Updated');
                    this.props.toggleEdit();
                } else {
                    message.error('Something went wrong');
                }
            });
        }
    }

    onDeselected = value => {
        const { selected_lab_blocks, selected_lab_blocks_titles } = this.state;
        const { labBlocks } = this.props;
        const labBlock = labBlocks.find(item => item.title === value);
        selected_lab_blocks.splice(selected_lab_blocks.indexOf(labBlock.id), 1);
        selected_lab_blocks_titles.splice(selected_lab_blocks_titles.indexOf(labBlock.title), 1);
        this.setState({
            selected_lab_blocks,
            selected_lab_blocks_titles,
        });
    }

    onSelected = value => {
        const { selected_lab_blocks, selected_lab_blocks_titles } = this.state;
        const { labBlocks } = this.props;
        const labBlock = labBlocks.find(item => item.title === value);
        selected_lab_blocks.push(labBlock.id);
        selected_lab_blocks_titles.push(labBlock.title);
        this.setState({
            selected_lab_blocks,
            selected_lab_blocks_titles,
        });
    }

    render() {
        const {
            title, category_id, object, selected_lab_blocks_titles,
        } = this.state;
        const {
            categories, labBlocks, toggleEdit, showEditingModal,
        } = this.props;
        return (
            <Modal
                onCancel={toggleEdit}
                title="Edit Scenario"
                visible={showEditingModal}
                footer={[
                    <Button key="back" onClick={toggleEdit}>
                        Cancel
                    </Button>,
                    <Button key="create" type="primary" onClick={this.updateScenario}>
                        Update
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Item label="Course Scenario">
                        <Input type="title" name="title" onChange={this.handleChange} value={title} />
                    </Item>
                    <Item label="DevSecOps Category">
                        <Select
                            style={{ width: '100%' }}
                            name="category_id"
                            value={category_id}
                            onChange={this.handleCategoryChange}
                        >
                            {
                                categories.map((item, index) => (<Option key={index} value={item.id}>{item.name}</Option>))
                            }
                        </Select>
                    </Item>
                    <Item label="What is the Vulnerable Object?">
                        <Input type="object" name="object" onChange={this.handleChange} value={object} />
                    </Item>
                    <Item label="Lab blocks">
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Select Multiple"
                            value={selected_lab_blocks_titles}
                            notFoundContent={null}
                            onDeselect={this.onDeselected}
                            onSelect={this.onSelected}
                            filterOption
                        >
                            { labBlocks.map(item => (
                                <Select.Option key={item.id} value={item.title}>
                                    {item.title}
                                </Select.Option>
                            ))}
                        </Select>
                    </Item>
                </Form>
            </Modal>

        );
    }
}

export default CourseScenariosEdit;
