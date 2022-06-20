import React, { Component } from 'react';
import {
    Button, Input, Table, message, Select, Typography, Icon, Badge, Spin, Form, Row,
} from 'antd';
import CKEditor from 'ckeditor4-react';
import './draft-course.scss';
import parse from 'html-react-parser';

const { Column } = Table;
const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

class DraftCourseTable extends Component {
    state = {
        drafts: [],
        saveDraftsLoader: false,
        saveCourseLoader: false,
        submitLoader: false,
        clearDraftsLoader: false,
        status: { key: 0, name: '' },
        required_exp: { key: 0, name: '' },
        GD: [],
        UseCase: [],
        CC: [],
        requiredFields: [],
        course_is_for: [],
        course_is_for_field: '',
        will_learn: [],
        will_learn_field: '',
        course_tags: [],
        course_tags_field: [],
        fetching: true,
        existing_tags: [],
        existing_tags_info: [],
        submitted: false,
    }

    componentDidMount() {
        const { CC, GD, UseCase } = this.state;
        this.setState({
            drafts: this.props.draft,
        }, () => {
            if (this.props.scenario) {
                this.setCategory();
                this.setVulnerableObject();
            }
            this.setCourseOwner();
        });
        this.props.draft.forEach((item, key) => {
            const formattedKeys = ['course_tags', 'will_learn', 'course_is_for'];
            if (item.type === 'note') {
                const status = { key, name: item.draftCourse ? item.draftCourse.value : '' };
                this.setState({
                    status,
                });
            }
            if (formattedKeys.includes(item.course_column) && item.draftCourse && item.draftCourse.value) {
                this.setState({ [item.course_column]: JSON.parse(item.draftCourse.value) });
                if (item.course_column === 'course_tags') {
                    const course_tags = JSON.parse(item.draftCourse.value);
                    const course_tags_field = course_tags.map(item => item.title);
                    this.setState({ course_tags_field });
                }
            }
            if (item.course_column === 'required_exp') {
                const { required_exp } = this.state;
                required_exp.name = item.draftCourse ? item.draftCourse.value : '';
                this.setState({ required_exp });
            }
            if (item.category === 'Generic Description') {
                GD.push(item);
            } else if (item.category === 'Course Categorisation') {
                CC.push(item);
            } else if (item.category === 'Use Case') {
                UseCase.push(item);
            } else {

            }
        });
        if (this.props.user_id) {
            this.props.getCourseRequiredFields().then(res => {
                if (res && res.length) {
                    const requiredFields = res.map(item => item.id);
                    this.setState({ requiredFields });
                }
            });
        }

        this.saveDraftInterval = setInterval(() => {
            if (this.props.activeKey === '2') {
                const drafts = this.getDraftsFormatted();
                this.props.saveDrafts(drafts, this.props.user_id);
            }
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.saveDraftInterval);
        this.saveDraftInterval = null;
    }

    onChange = (e, field_index) => {
        const drafts = [...this.state.drafts];
        const draftsIndex = drafts.findIndex(draft => draft.id === field_index);

        const draft = drafts.find(draft => draft.id === field_index);

        if (!draft.draftCourse) {
            draft.draftCourse = {
                field_id: draft.id,
                value: e.target.value,
            };
        } else {
            draft.draftCourse.value = e.target.value;
        }

        drafts[draftsIndex] = draft;

        this.setState({
            drafts,
        });
    }

    onInputChange(e, record) {
        const { CC, GD, UseCase } = this.state;
        const { id, category } = record;
        this.onChange(e, id, record);
        if (category === 'Generic Description') {
            const draft = GD.find(item => item.id === record.id);
            if (!draft.draftCourse) {
                draft.draftCourse = {
                    field_id: draft.id,
                    value: e.target.value,
                };
            } else {
                draft.draftCourse.value = e.target.value;
            }
            this.setState({
                GD,
            });
            return true;
        } if (category === 'Course Categorisation') {
            const draft = CC.find(item => item.id === record.id);
            if (!draft.draftCourse) {
                draft.draftCourse = {
                    field_id: draft.id,
                    value: e.target.value,
                };
            } else {
                draft.draftCourse.value = e.target.value;
            }
            this.setState({
                GD,
            });
            return true;
        }
        const draft = UseCase.find(item => item.id === record.id);
        if (!draft.draftCourse) {
            draft.draftCourse = {
                field_id: draft.id,
                value: e.target.value,
            };
        } else {
            draft.draftCourse.value = e.target.value;
        }
        this.setState({
            UseCase,
        });
    }

    setCategory = () => {
        const { category } = this.props;
        const { GD, drafts } = this.state;
        const name = 'Choose the DevSecOps Category';
        const index = GD.findIndex(item => item.name.includes(name));
        const draft = drafts.find(draft => draft.name.includes(name));
        if (draft) {
            this.changeCategory(category, index, draft.id);
        }
    }

    setCourseOwner = () => {
        const { user, fellowName } = this.props;
        const { GD, drafts } = this.state;
        const name = 'What is the name of the course-owner';
        const draft = drafts.find(draft => draft.name.includes(name));
        const draftGD = GD.find(item => item.id === draft.id);
        if (draft && (!draft.draftCourse || !draft.draftCourse.value)) {
            draft.draftCourse = {
                field_id: draft.id,
                value: fellowName || `${user.firstname} ${user.lastname}`,
            };
            draftGD.draftCourse = {
                field_id: draft.id,
                value: fellowName || `${user.firstname} ${user.lastname}`,
            };
            this.setState({
                drafts, GD,
            });
        }
    }

    setVulnerableObject = () => {
        const { object } = this.props;
        const { UseCase, drafts } = this.state;
        const name = 'In your course, which object in the DevOps chain will you be focusing on that can have a problem';
        const draft = drafts.find(draft => draft.name.includes(name));
        const draftUseCase = UseCase.find(item => item.id === draft.id);
        if (draft) {
            if (!draft.draftCourse) {
                draft.draftCourse = {
                    field_id: draft.id,
                    value: object,
                };
                draftUseCase.draftCourse = {
                    field_id: draft.id,
                    value: object,
                };
            } else {
                draft.draftCourse.value = object;
                draftUseCase.draftCourse.value = object;
            }
            this.setState({
                drafts, UseCase,
            });
        }
    }

    changeCategory = (value, index, field_index) => {
        const { GD } = this.state;
        const drafts = [...this.state.drafts];
        const draft = GD[index];
        const draftsIndex = drafts.findIndex(draft => draft.id === field_index);

        if (!draft.draftCourse) {
            draft.draftCourse = {
                field_id: draft.id,
                value,
            };
        } else {
            draft.draftCourse.value = value;
        }
        drafts[draftsIndex] = draft;

        this.setState({
            drafts,
        });
    }

    isJson = data => {
        try {
            JSON.parse(data);
        } catch (err) {
            return false;
        }
        return true;
    }

    save = () => {
        this.setState({
            saveDraftsLoader: true,
        });

        const drafts = this.getDraftsFormatted();

        this.props.saveDrafts(drafts, this.props.user_id).then(res => {
            this.setState({
                saveDraftsLoader: false,
            });

            if (res === true) {
                message.success('Saved.');
            } else {
                message.error('Something went wrong, please try again.');
            }
        });
    }

    getDraftsFormatted = () => {
        const formattedKeys = ['course_tags', 'will_learn', 'course_is_for'];
        const drafts = this.state.drafts.map(item => {
            const data = {
                field_id: item.id,
            };
            if (item.draftCourse) {
                if (formattedKeys.includes(item.course_column) && !this.isJson(item.draftCourse.value)) {
                    data.value = JSON.stringify(item.draftCourse.value);
                } else {
                    data.value = item.draftCourse.value;
                }
            } else if (formattedKeys.includes(item.course_column)) {
                data.value = JSON.stringify([]);
            } else {
                data.value = '';
            }
            return data;
        });
        return drafts;
    }

    onChangeStatus = e => {
        const { status, drafts } = this.state;
        const value = e.editor.getData();
        const draft = drafts[status.key];

        if (!draft.draftCourse) {
            draft.draftCourse = {
                field_id: draft.id,
                value,
            };
        } else {
            draft.draftCourse.value = value;
        }
        drafts[status.key] = draft;

        status.name = value;
        this.setState({
            status,
            drafts,
        });
    }

    onChangeRequiredExp = e => {
        const { required_exp, drafts } = this.state;
        const value = e.editor.getData();
        const draft = drafts.find(item => item.course_column === 'required_exp');

        if (!draft.draftCourse) {
            draft.draftCourse = {
                field_id: draft.id,
                value,
            };
        } else {
            draft.draftCourse.value = value;
        }

        required_exp.name = value;
        this.setState({
            required_exp,
            drafts,
        });
    }

    createCourseFromDraft = () => {
        const { GD, drafts } = this.state;
        const draftsFormated = this.getDraftsFormatted();
        const requiredFields = drafts.filter(draft => this.state.requiredFields.includes(draft.id));
        const invalid = requiredFields.find(field => !field.draftCourse || !field.draftCourse.value);
        if (invalid) {
            message.error('Please fill in the required fields');
        } else {
            this.setState({
                saveCourseLoader: true,
            });
            const data = requiredFields.map(field => ({
                field_id: field.id,
                course_column: field.course_column,
                field_value: this.isJson(field.draftCourse.value) ? JSON.parse(field.draftCourse.value) : field.draftCourse.value,
            }));
            const name = 'What is the name of the course-owner';
            const draft = drafts.find(draft => draft.name.includes(name));
            const draftGD = GD.find(item => item.id === draft.id);
            if (draft && draft.draftCourse && draft.draftCourse.value) {
                data.push({
                    field_id: draftGD.id,
                    field_value: draft.draftCourse.value,
                    course_column: 'author',
                });
            }
            this.props.createCourse(data, draftsFormated, this.props.user_id).then(res => {
                this.setState({
                    saveCourseLoader: false,
                });
                if (res === true) {
                    message.success('Course created');
                } else {
                    message.error(res.message);
                }
            });
        }
    }

    checkRequired = record => {
        if (this.state.requiredFields.includes(record.id)) {
            return (
                <div>
                    <span className="required-asterics">*</span>
                    <div className="required-input-cont">
                        {' '}
                        {parse(record.name)}
                        {' '}
                    </div>
                </div>
            );
        }
        return parse(record.name);
    }

    addItem = name => {
        const arr = this.state[name];
        const input = this.state[`${name}_field`];
        const { GD } = this.state;
        const draft = GD.find(obj => obj.course_column === name);

        if (input) {
            arr.push(input);

            if (!draft.draftCourse) {
                draft.draftCourse = {
                    field_id: draft.id,
                    value: arr,
                };
            } else {
                draft.draftCourse.value = arr;
            }
            this.setState({
                [name]: arr,
                [`${name}_field`]: '',
                GD,
            });
        }
    }

    deleteItem = (index, name) => {
        const arr = this.state[name];
        const { GD } = this.state;
        const draft = GD.find(obj => obj.course_column === name);
        arr.splice(index, 1);
        if (!draft.draftCourse) {
            draft.draftCourse = {
                field_id: draft.id,
                value: arr,
            };
        } else {
            draft.draftCourse.value = arr;
        }
        this.setState({
            [name]: arr,
            GD,
        });
    }

    changeHandler = e => {
        this.setState({
            [`${e.target.name}_field`]: e.target.value,
        });
    }

    onChangeTags = course_tags_field => {
        this.setState({
            course_tags_field,
        });
    }

    onDeselected = (value, params) => {
        const { key } = params;
        const { course_tags, existing_tags_info } = this.state;
        if (key !== value) {
            const existing_tag = existing_tags_info.find(item => item.id === parseInt(key));
            course_tags.splice(course_tags.findIndex(item => item.title === existing_tag.title), 1);
            existing_tags_info.splice(existing_tags_info.findIndex(item => item.id === parseInt(key)), 1);
        } else {
            course_tags.splice(course_tags.findIndex(item => item.title === value), 1);
        }
        this.updateDraftCourseTags(course_tags);
        this.setState({
            course_tags,
            existing_tags_info,
        });
    }

    onSelected = value => {
        const item = { title: value };
        const { course_tags } = this.state;
        course_tags.push(item);
        this.updateDraftCourseTags(course_tags);
        this.setState({
            course_tags,
        });
    }

    onSearchTags = tags => {
        if (tags.length >= 1 && tags.length < 200) {
            this.setState({
                fetching: true,
                existing_tags: [],
            });
            this.props.searchByCourseTags(tags).then(res => {
                if (res !== false) {
                    this.setState({
                        existing_tags: res,
                        existing_tags_info: res.length ? res : this.state.existing_tags_info,
                        fetching: false,
                    });
                } else {
                    message.error('something went wrong');
                }
            });
        }
    }

    updateDraftCourseTags = data => {
        const { GD } = this.state;
        const draft = GD.find(obj => obj.course_column === 'course_tags');
        if (!draft.draftCourse) {
            draft.draftCourse = {
                field_id: draft.id,
                value: data,
            };
        } else {
            draft.draftCourse.value = data;
        }
        this.setState({
            GD,
        });
    }

    submit = () => {
        const invalid = this.state.drafts.find(item => item.type !== 'note' && (!item.draftCourse || !item.draftCourse.value));
        if (invalid) {
            message.error('Please provide all the fields for submission');
        } else {
            const drafts = this.getDraftsFormatted();
            this.props.submitDrafts(drafts, this.props.user_id).then(res => {
                if (res) {
                    message.success('Submitted! Upon review our team will contact you');
                    this.setState({
                        submitted: true,
                    });
                }
            });
        }
    }

    clear = () => {
        this.props.clearDrafts(this.props.user_id).then(res => {
            if (!res.message) {
                message.success('Drafts are cleared');
            } else {
                message.error(res.message);
            }
        });
    }

    render() {
        const { categories, scenario, object } = this.props;
        const {
            saveDraftsLoader, saveCourseLoader, submitLoader, clearDraftsLoader, status, GD, UseCase, course_tags_field,
            required_exp, fetching, existing_tags, submitted,
        } = this.state;
        return (
            <div className="draft-course-table">
                <p className="draft-tab-info">
                    The ‘Draft course’ tab is meant to collectively describe a new course.
                    In case you pre-selected a scenario some of the fields will be pre-populated.
                    You can save the input using “Save Drafts” at any moment. For submitting a draft all fields are required.
                    After successful submission, the draft design of the course will be reviewed.
                    When approved, the information on this page will be used to create a development domain for the new course.
                </p>
                <div className="draft-buttons">
                    <p><Button className="draft-button" onClick={this.save} loading={saveDraftsLoader}>Save Drafts</Button></p>
                    <p><Button className="draft-button" onClick={this.submit} loading={submitLoader} disabled={submitted}>Submit</Button></p>
                    <p><Button className="draft-button" onClick={this.clear} loading={clearDraftsLoader}>Clear</Button></p>
                    {this.props.user_id && <p><Button className="draft-button" onClick={this.createCourseFromDraft} loading={saveCourseLoader}>Create Course</Button></p>}
                </div>
                <div className="descriptionText draft-editor">
                    <Title level={3}>
                        Free input field for notes.
                    </Title>
                    For instance to describe meeting notes and next steps
                    <CKEditor
                        name="status"
                        data={status.name}
                        onChange={this.onChangeStatus}
                        onBeforeLoad={cke => (cke.disableAutoInline = true)}
                    />
                </div>
                <p style={{ marginTop: '25px' }}>All fields below are required for submitting a draft for a new course.</p>
                {this.props.user_id && (
                    <p style={{ marginTop: '15px' }}>
                        <span className="required-asterics">*</span>
                        {' '}
                        required for course creation
                    </p>
                )}
                {scenario && (
                    <p style={{ marginTop: '15px' }}>
                        <span className="chosen-scenario">
                            Chosen Scenario :
                            {scenario}
                        </span>
                    </p>
                )}
                <div className="use-case-container">
                    <div className="table-title">
                        <Title level={4}>Describe the Use Case to explain "Why this course"?</Title>
                    </div>
                    <Table
                        dataSource={UseCase}
                        rowKey={item => item.id}
                        showHeader={false}
                        pagination={false}
                        rowClassName={(record, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
                    >
                        <Column
                            key="inputs"
                            render={(text, record) => {
                                const draftCourse = record.draftCourse || { value: '' };
                                return (
                                    <div>
                                        <Row key="title">
                                            <span>{this.checkRequired(record)}</span>

                                        </Row>
                                        <Row key="field">
                                            <TextArea
                                                rows={4}
                                                onChange={e => this.onInputChange(e, record)}
                                                value={draftCourse.value}
                                                disabled={record.name.includes('In your course, which object in the DevOps chain will you be focusing on that can have a problem?')
                                              && object}
                                            />
                                        </Row>
                                    </div>
                                );
                            }}
                        />
                    </Table>
                </div>
                <div className="generic-description-container">
                    <div className="table-title">
                        <Title level={4}>Generic Description</Title>
                    </div>
                    <Table
                        dataSource={GD}
                        rowKey={item => item.id}
                        rowClassName={(record, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
                        showHeader={false}
                        pagination={false}
                    >
                        <Column
                            key="inputs"
                            render={(text, record, key) => {
                                const draftCourse = record.draftCourse || { value: '' };
                                const field = () => {
                                    if (record.type === 'dropdown') {
                                        return (
                                            <Select
                                                style={{ width: 700 }}
                                                value={draftCourse.value}
                                                disabled={!!scenario}
                                                onChange={val => this.changeCategory(val, key, record.id)}
                                            >
                                                {
                                                    categories.map((item, index) => (<Option key={index} value={item.name}>{item.name}</Option>))
                                                }
                                            </Select>
                                        );
                                    } if (record.course_column === 'course_is_for'
                                            || record.course_column === 'will_learn') {
                                        return (
                                            <div className="multipleSelection">
                                                <ul>
                                                    {(this.state[record.course_column] || []).map((item, index) => (
                                                        <li key={index}>
                                                            <span>
                                                                <Badge status="processing" />
                                                                {item}
                                                            </span>
                                                            <Icon type="delete" theme="twoTone" twoToneColor="#f5222d" onClick={() => this.deleteItem(index, record.course_column)} />
                                                        </li>
                                                    ))}
                                                </ul>
                                                <Input
                                                    addonAfter={<Icon type="plus" onClick={() => this.addItem(record.course_column)} />}
                                                    placeholder="Add info"
                                                    name={record.course_column}
                                                    value={this.state[`${record.course_column}_field`]}
                                                    onChange={this.changeHandler}
                                                    onPressEnter={() => this.addItem(record.course_column)}
                                                />
                                            </div>
                                        );
                                    } if (record.course_column === 'course_tags') {
                                        return (
                                            <div className="assignTagsToCourse">
                                                <Form.Item key="assign-course-tags">
                                                    <Select
                                                        mode="tags"
                                                        style={{ width: '100%' }}
                                                        placeholder="Tags Mode"
                                                        value={course_tags_field}
                                                        notFoundContent={fetching ? <Spin size="small" /> : null}
                                                        onChange={this.onChangeTags}
                                                        onDeselect={this.onDeselected}
                                                        onSelect={this.onSelected}
                                                        onSearch={this.onSearchTags}
                                                        filterOption={false}
                                                    >
                                                        {existing_tags.map(item => (
                                                            <Select.Option key={item.id} value={item.title}>
                                                                {item.title}
                                                            </Select.Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        );
                                    } if (record.course_column === 'required_exp') {
                                        return (
                                            <CKEditor
                                                name="required_exp"
                                                data={required_exp.name}
                                                onChange={this.onChangeRequiredExp}
                                                onBeforeLoad={cke => (cke.disableAutoInline = true)}
                                            />
                                        );
                                    } if (record.type !== 'note') {
                                        return (
                                            <TextArea
                                                rows={4}
                                                onChange={e => this.onInputChange(e, record)}
                                                value={draftCourse.value}
                                            />
                                        );
                                    }
                                    return null;
                                };
                                return (
                                    <div>
                                        <Row key="title">
                                            <span>{this.checkRequired(record)}</span>
                                        </Row>
                                        <Row key="fields">
                                            <span>
                                                {' '}
                                                { field() }
                                                {' '}
                                            </span>
                                        </Row>
                                    </div>
                                );
                            }}
                        />
                    </Table>
                </div>
                {/* <div className={'course-categorisation-container'}>
                    <div className={'table-title'}>
                        <Title level={4}>Course Categorisation</Title>
                    </div>
                    <Table dataSource={CC} rowKey={item => item.id} showHeader={false}>
                        <Column key={'inputs'} render={(text, record, key) => {
                            const draftCourse = record.draftCourse || {value: ''}
                            return <div>
                                    <Row key={'title'}>
                                        <span>{record.name}</span>

                                    </Row>
                                    <Row key={'field'}>
                                        <TextArea rows={4} onChange={e => this.onInputChange(e, record)}
                                          value={draftCourse.value}/>
                                    </Row>
                                  </div>
                        }}/>
                    </Table>
                </div>                */}
            </div>
        );
    }
}

export default DraftCourseTable;
