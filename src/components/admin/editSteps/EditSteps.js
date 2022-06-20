import React, { Component } from 'react';
import {
    Row, Col, Table, Button, message, Input, Modal, Icon, Affix, Form, Select, Switch, Typography,
} from 'antd';
import './editLabsSteps.scss';
import AddStep from './addStep';
import ImportSteps from './ImportSteps';
import ContentBlocks from './contentBlocks';
import PreviewSteps from '../../../containers/admin/previewSteps/previewSteps';
import { arrayMoveElement } from '../../../util/utils';

const { Column } = Table;
const confirmModal = Modal.confirm;
const { Title } = Typography;

class EditSteps extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            course_id: 0,
            theory_title: '',
            theory_desc: '',
            steps: [],
            selectedStep: null,
            selectedIndex: null,
            loadingSaveSteps: false,
            visible: false,
            openFavoriteStep: false,
            stepTitle: '',
            titleRequiredError: false,
            favoriteStep: {},
            showAddState: false,
            mod_width: 500,
            existing_states: [],
            states: [],
            removedComponents: [],
            removedSteps: [],
            showContentModal: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        // window.scrollTo({top: 0});
        this.setState({
            ...this.props.theory,
            steps: this.props.steps,
        });
        if (this.props.type !== 'theory') {
            this.props.getStateMachine(this.props.id).then(res => {
                const existing_states = Object.keys(res);
                this.setState({ existing_states });
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this._isMounted) {
            if (prevProps.steps.length !== this.props.steps.length) {
                this.setState({
                    steps: this.props.steps,
                });
            }

            if (this.props.type === 'theory' && prevProps.theory.theory_title !== this.props.theory.theory_title) {
                this.setState({
                    ...this.props.theory,
                });
            }
        }
    }

    changeTheoryInfo = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    changePosition = (index, dir) => {
        const steps = this.state.steps.slice();
        const to = dir === 'up' ? parseInt(index) - 1 : parseInt(index) + 1 >= steps.length ? 0 : parseInt(index) + 1;
        const from = parseInt(index);
        const newSteps = arrayMoveElement([...steps], from, to);
        this.setState({
            steps: newSteps,
            selectedStep: null,
            selectedIndex: null,
        });
    }

    __moveEditedStep = (from, to) => {
        const { selectedIndex } = this.state;
        const steps = this.state.steps.slice();
        if (selectedIndex === from) {
            const currentIndex = to < 0 ? steps.length - 1 : to;
            this.setState({
                selectedIndex: currentIndex,
            });
        } else if (selectedIndex === to) {
            this.setState({
                selectedIndex: from,
            });
        }
    }

    __getBlockType = type => {
        const blockTypes = {
            InformationBox: {
                type: 'InformationBox',
                content: {
                    titles: [''],
                    text: [''],
                },
            },
            BulletText: {
                type: 'BulletText',
                content: {
                    titles: [''],
                    text: [''],
                },
            },
            GreyBox: {
                type: 'GreyBox',
                content: {
                    titles: [''],
                    text: [''],
                },
            },
            HeartBox: {
                type: 'HeartBox',
                content: {
                    titles: [''],
                    text: [''],
                },
            },
            SingleText: {
                type: 'SingleText',
                content: {
                    text: '',
                },
            },
            TitleBox: {
                type: 'TitleBox',
                content: {
                    title: '',
                    subtitle: '',
                    image: '',
                },
            },
            CodeSnippet: {
                type: 'CodeSnippet',
                content: {
                    code: '',
                    language: '',
                },
            },
            InfinityLoop: {
                type: 'InfinityLoop',
                content: {
                    text: [],
                    stage: [],
                },
            },
            Image: {
                type: 'Image',
                content: {
                    image: '',
                },
            },
            Image2: {
                type: 'Image2',
                content: {
                    uuid: '',
                },
            },
            Video: {
                type: 'Video',
                content: {
                    video: '',
                },
            },
            ParagraphTitle: {
                type: 'ParagraphTitle',
                content: {
                    text: '',
                },
            },
            DropdownHint: {
                type: 'DropdownHint',
                content: {
                    remember_token: Math.random().toString(36).substring(5),
                    hint_id: null,
                    hintTitle: 'Do you need a hint?',
                    warningMessage: 'In case you chose to do this course in Advanced level, then please check “Remaining Hints” in the top right of this screen. Taking this hint might drop your level to Medior',

                },
            },
            CopyField: {
                type: 'CopyField',
                content: {
                    text: '',
                },
            },
            UploadImageByUser: {
                type: 'UploadImageByUser',
                content: {
                    image_token: Math.random().toString(36).substring(5),
                },
            },
            LearningPath: {
                type: 'LearningPath',
                content: {
                    id: '',
                },
            },
        };
        return { ...blockTypes[type] };
    }

    removeStep = index => {
        const steps = [...this.state.steps];
        if (steps[index].is_compulsory) {
            this.props.removeAllCompulsorySteps({ uuid: steps[index].uuid, type: this.props.type }).then(res => {
                if (res === true) {
                    message.success('deleted');
                    steps.splice(index, 1);

                    this.setState({
                        steps,
                        selectedStep: null,
                        selectedIndex: null,
                    });
                } else {
                    message.error('something went wrong please try again.');
                }
            });
            return false;
        }

        if (steps[index].uuid) {
            const removedSteps = [...this.state.removedSteps];
            removedSteps.push(steps[index].uuid);
            this.setState({
                removedSteps,
            });
        }
        steps.splice(index, 1);

        this.setState({
            steps,
            selectedStep: null,
            selectedIndex: null,
        });
    }

    showDeleteConfirm = index => {
        Modal.confirm({
            title: 'Are you sure you want to delete this information?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.removeStep(index);
            },
            onCancel() {},
        });
    }

    editStep = index => {
        this.setState({
            selectedIndex: index,
            selectedStep: null,
        });
        setTimeout(() => {
            this.setState({
                selectedStep: this.state.steps[index],
            });
        }, 100);
    }

    addStep = name => {
        if (!name) {
            message.error('Step name is required.');
            return;
        }

        const steps = this.state.steps.slice();
        steps.push({
            title: name,
            contentBlocks: [],
        });

        this.setState({
            steps,
        });
    }

    changeTitle = e => {
        const { selectedIndex } = this.state;
        const steps = this.state.steps.slice();
        steps[selectedIndex].title = e.target.value;
        this.setState({
            steps,
        });
    }

    closeContentModal = () => this.setState({ showContentModal: false })

    onChangeContentType = (type, index, saveContent) => {
        const selectedStep = { ...this.state.selectedStep };
        const { contentBlocks } = selectedStep;
        // .code = content from code snippet component
        const contentToSave = contentBlocks[index].content.text || contentBlocks[index].content.code;
        let contentNeedsSave = false;

        // Different component use different data structures,
        // check if there's any content before bothering the user with a modal
        switch (typeof contentToSave) {
        case undefined:
            contentNeedsSave = false;
            break;
        case 'string':
            if (contentToSave.length > 0) {
                contentNeedsSave = true;
            }
            break;
        case 'object':
            if (contentToSave[0].length > 0) {
                contentNeedsSave = true;
            }
            break;
        default:
            break;
        }

        if (saveContent === 'warnContent' && contentNeedsSave) {
            // Send warning messsage
            return confirmModal({
                title: 'Content might be lost',
                content: 'If you switch components content will be lost',
                okText: 'Switch component',
                okType: 'danger',
                onOk: () => {
                    // Swap component
                    this.changeContentType(type, index);
                },
                onCancel() {
                    // Cancel, do nothing

                },
            });
        }
        return this.changeContentType(type, index);
    }

    changeContentType = (type, index, contentToSave) => {
        const selectedStep = { ...this.state.selectedStep };
        this.getRemovedComponents(selectedStep.contentBlocks[index].uuid);
        selectedStep.contentBlocks[index] = { ...this.__getBlockType(type) };
        if (contentToSave) {
            selectedStep.contentBlocks[index].content.text = contentToSave;
        }
        this.setState({
            selectedStep,
        }, () => {
            this.onChangeState(selectedStep.contentBlocks);
        });
    }

    onChangeState = contentBlocks => {
        const selectedStep = { ...this.state.selectedStep };
        const steps = [...this.state.steps];
        const { selectedIndex } = this.state;
        steps[selectedIndex].contentBlocks = [...contentBlocks];
        selectedStep.contentBlocks = [...contentBlocks];
        this.setState({
            selectedStep,
            steps,
        });
    }

    onChangeBlocksPosition = contentBlocks => {
        const selectedStep = { ...this.state.selectedStep };
        const steps = [...this.state.steps];
        const { selectedIndex } = this.state;

        this.setState({
            selectedStep: null,
        }, () => {
            steps[selectedIndex].contentBlocks = [...contentBlocks];
            selectedStep.contentBlocks = [...contentBlocks];
            this.setState({
                selectedStep,
                steps,
            });
        });
    }

    addComponent = (addOnTop = false) => {
        const selectedStep = { ...this.state.selectedStep };
        const newBlock = this.__getBlockType('SingleText');

        newBlock.id = Math.random().toString(36).slice(2); // Provide a psuedorandom id for use as the key
        if (addOnTop) {
            selectedStep.contentBlocks.unshift(newBlock);
        } else {
            selectedStep.contentBlocks.push(newBlock);
        }
        this.setState({
            selectedStep,
        });
    }

    addSavedComponent = (component, addOnTop) => {
        const { selectedIndex, steps } = this.state;
        const selectedStep = { ...this.state.selectedStep };
        const newComponent = { ...component };
        newComponent.uuid = '';
        if (addOnTop) {
            selectedStep.contentBlocks.unshift(newComponent);
            // sometimes global steps object's content contains the component, so we should check to avoid duplicates
            if (!steps[selectedIndex].contentBlocks.find(item => item.id === newComponent.id)) {
                steps[selectedIndex].contentBlocks.unshift(newComponent);
            }
        } else {
            selectedStep.contentBlocks.push(newComponent);
            // sometimes global steps object's content contains the component, so we should check to avoid duplicates
            if (!steps[selectedIndex].contentBlocks.find(item => item.id === newComponent.id)) {
                steps[selectedIndex].contentBlocks.push(newComponent);
            }
        }
        this.setState({
            selectedStep,
            steps,
        });
    }

    toggleModal = () => {
        this.setState({
            visible: !this.state.visible,
        });
    }

    save = () => {
        this.setState({
            loadingSaveSteps: true,
        });
        const {
            steps, theory_title, theory_desc, removedComponents, removedSteps, selectedIndex,
        } = this.state;

        // If "theory" steps, we need a theory title and description
        if ((this.props.type === 'theory') && (theory_title.length === 0 || theory_desc.length === 0)) {
            message.error('Please Fill Theory Title and Description');
            this.setState({
                loadingSaveSteps: false,
            });
            return false;
        }

        // Save the steps
        this.props.saveSteps(this.props.id, {
            content: steps,
            title: theory_title,
            desc: theory_desc,
            removedComponents,
            removedSteps,
        }).then(res => {
            if (res === true) {
                message.success('Saved!');
                if (this.props.type === 'theory') {
                    this.props.updateTheorySteps();
                }
                this.setState({
                    steps: this.props.steps,
                    selectedStep: this.props.steps[selectedIndex],
                });
            } else if (res.errors) {
                res.errors.forEach(item => {
                    message.error(`${item.field} is ${item.validation}`);
                });
            } else {
                message.error('Something went wrong, please try again.');
            }
            this.setState({
                loadingSaveSteps: false,
            });
        });
    }

    saveModal = () => {
        this.save();
        this.toggleModal();
    }

    pushSteps = (data, position) => {
        let steps = [];
        if (position === 'top') {
            steps = [...data, ...this.state.steps];
        } else {
            steps = [...this.state.steps, ...data];
        }

        this.setState({
            selectedStep: null,
            selectedIndex: null,
            steps,
        });
    }

    goToCourseMenu = () => {
        const { course_id } = this.props;
        this.props.history.push(`/platform/admin/edit-course/${course_id}`);
    }

    saveFavoriteStep = () => {
        const { stepTitle, favoriteStep } = this.state;

        if (stepTitle === '') {
            this.setState({
                titleRequiredError: true,
            });
            return;
        }
        this.props.storeFavoriteStep({ title: stepTitle, step: favoriteStep }).then(res => {
            if (res === true) {
                message.success('Step Saved Successfully');
            } else {
                message.error('Something went wrong please try again letter');
            }
            this.setState({
                openFavoriteStep: !this.state.openFavoriteStep,
                stepTitle: '',
            });
        });
    }

    toggleSaveStepModal = index => {
        this.setState({
            favoriteStep: this.state.steps[index],
            openFavoriteStep: !this.state.openFavoriteStep,
            titleRequiredError: false,
        });
    }

    onChangeFavoriteStep = e => {
        const { titleRequiredError } = this.state;
        if (titleRequiredError && e.target.value.trim()) {
            this.setState({
                titleRequiredError: true,
            });
        }
        this.setState({
            stepTitle: e.target.value,
        });
    }

    restoreStep = step => {
        const { steps } = this.state;
        const newStep = JSON.parse(JSON.stringify(step.step));
        steps.push(newStep);
        this.setState({
            steps,
        });
    }

    toggleStateModal = () => {
        this.setState({
            showAddState: !this.state.showAddState,
            mod_width: 500,
        });
    }

    handleAddState = index => {
        this.setState({
            selectedIndex: index,
        }, this.mapStateToValue);
        this.toggleStateModal();
    }

    mapStateToValue = () => {
        const { selectedIndex } = this.state;
        const steps = this.state.steps.slice();
        let stepStates = [];
        if (steps[selectedIndex].states) {
            stepStates = steps[selectedIndex].states.map(index => {
                if (index.title) {
                    return { title: index.title, help_message: index.help_message || '' };
                }
                return index;
            });
        }
        this.setState({
            states: stepStates,
        });
    }

    addStateToStep = () => {
        const { selectedIndex } = this.state;
        const steps = this.state.steps.slice();
        steps[selectedIndex].states = this.state.states;
        this.setState({
            steps, states: [],
        });
        this.toggleStateModal();
    }

    onDeselected = key => {
        const states = [...this.state.states];
        states.splice(states.indexOf(key), 1);
        this.setState({
            states,
        });
    }

    onSelected = value => {
        const states = [...this.state.states];
        states.push({ title: value, help_message: '' });
        this.setState({
            states,
        });
    }

    getRemovedComponents = data => {
        const removedComponents = [...this.state.removedComponents];
        removedComponents.push(data);
        this.setState({
            removedComponents,
        });
    }

    changeCompulsory = (checked, index) => {
        const steps = [...this.state.steps];
        const { type } = this.props;
        if (checked) {
            steps[index].is_compulsory = 1;
        } else {
            steps[index].is_compulsory = 0;
        }
        const loader = message.loading('updating...', 0);
        this.props.updateIsCompulsory({ checked, type, uuid: steps[index].uuid }).then(res => {
            if (res === true) {
                loader();
                this.setState({
                    steps,
                }, () => message.success('updated'));
            } else {
                message.error('something went wrong please try again');
            }
        });
    }

    pushChanges = index => {
        const { selectedIndex } = this.state;
        const loader = message.loading('updating...');
        const step = this.state.steps[index];
        const { type } = this.props;
        this.props.updateSteps({ step, type }).then(res => {
            loader();
            if (res === false) {
                message.error('something went wrong please try again');
            } else {
                if (index === selectedIndex) {
                    this.setState({
                        selectedStep: res[index],
                    });
                }
                this.setState({
                    steps: res,
                });
                message.success('updated');
            }
        });
    }

    handleHelpMessageChange = (value, index) => {
        const { states } = this.state;
        const changedStates = states.map((e, idx) => {
            if (idx === index) {
                return { ...e, help_message: value };
            }
            return e;
        });
        this.setState({
            states: changedStates,
        });
    }

    render() {
        const {
            steps, selectedIndex, selectedStep, loadingSaveSteps, theory_title, theory_desc,
            titleRequiredError, stepTitle, showAddState, mod_width, states, existing_states,
        } = this.state;
        const {
            type, isAdmin, favorites, loadingSteps, favoriteSteps, fetchFavoriteSteps, isTemplate, learningPaths, user,
        } = this.props;

        return (
            <div>
                <Modal
                    title="Add State"
                    width={mod_width}
                    visible={showAddState}
                    onCancel={this.toggleStateModal}
                    footer={null}
                >
                    {states.length ? <Title level={4}>Add Custom Messages</Title> : ''}
                    {states.map((item, index) => (
                        <Row key={item.title} className='single-state-option'>
                            <Col span={8}>{item.title}</Col>
                            <Col span={16}>
                                <Input
                                    onChange={e => this.handleHelpMessageChange(e.target.value, index)}
                                    value={item.help_message}
                                />
                            </Col>
                        </Row>
                    ))}
                    <Form>
                        <Form.Item>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Select Multiple"
                                value={states.map(e => e.title)}
                                notFoundContent={null}
                                onDeselect={this.onDeselected}
                                onSelect={this.onSelected}
                                filterOption
                            >
                                {existing_states.map(item => (
                                    <Select.Option key={item} value={item}>
                                        {item}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' onClick={this.addStateToStep}>Save States And Messages</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Row>
                    <Col span={13}>
                        {
                            this.state.selectedStep
                                ? (
                                    <Affix offsetTop={64}>
                                        <h2 className="selectedStep">
                                            {this.state.selectedIndex + 1}
                                            .
                                            {' '}
                                            {this.state.selectedStep.title}
                                        </h2>
                                    </Affix>
                                ) : null
                        }
                        {
                            isAdmin
                                ? (
                                    <div className="small-input">
                                        <ImportSteps
                                            parseCsv={this.props.parseCsv}
                                            theory_id={this.props.id}
                                            pushSteps={this.pushSteps}
                                        />
                                    </div>
                                ) : <></>
                        }

                        {type === 'theory'
                            ? (
                                <>
                                    <div className="small-input">
                                        <span className="inputSpan">Preparation lab title</span>
                                        <Input name="theory_title" placeholder="Theory title" value={theory_title} onChange={this.changeTheoryInfo} />
                                    </div>
                                    <div className="small-input">
                                        <span className="inputSpan">Preparation lab description</span>
                                        <Input name="theory_desc" placeholder="Theory description" value={theory_desc} onChange={this.changeTheoryInfo} />
                                    </div>
                                </>
                            )
                            : <></>}
                    </Col>
                    <Col span={11} style={{ marginTop: '5%' }}>
                        <div className="save-container">
                            <Button className="btn-primary course-edit-menu-button" onClick={this.goToCourseMenu}>
                                <Icon type="left" />
                                Course edit menu
                            </Button>
                            <Button className="btn-save" loading={loadingSaveSteps} onClick={this.save} type="primary">Save</Button>
                            <Button className="btn-primary" type="primary" disabled={!steps.length} onClick={this.toggleModal}>Preview </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={isTemplate ? 13 : 11} className="lab-steps-list">
                        <Table
                            dataSource={steps}
                            pagination={false}
                            rowKey={(item, index) => index}
                            loading={loadingSteps}
                            footer={() => (
                                <AddStep
                                    restoreStep={this.restoreStep}
                                    fetchFavoriteSteps={fetchFavoriteSteps}
                                    favoriteSteps={favoriteSteps}
                                    addStep={this.addStep}
                                    steps_images={this.props.steps_images}
                                    getHintMessage={this.props.getHintMessage}
                                    deleteFavoriteStep={this.props.deleteFavoriteStep}
                                />
                            )}
                            rowClassName={(item, index) => (selectedIndex === index && selectedStep ? 'selectedStepTable' : null)}
                        >
                            <Column title="Step" key="index" render={(text, record, index) => index + 1} />
                            <Column
                                title="Title"
                                render={(text, record, index) => (
                                    <>
                                        {
                                            selectedIndex === index && selectedStep ? <Input value={selectedStep.title} onChange={this.changeTitle} /> : record.title
                                        }
                                    </>
                                )}
                            />
                            <Column
                                title="Actions"
                                key="actions"
                                id='actions'
                                render={(text, record, index) => (
                                    <>
                                        <Button type="primary" className="change-pos-btn" shape="circle" icon="arrow-up" onClick={() => this.changePosition(index, 'up')} />
                                        <Button type="primary" className="change-pos-btn" shape="circle" icon="arrow-down" onClick={() => this.changePosition(index, 'down')} />
                                        {
                                            (!record.is_compulsory || !!isTemplate)
                                                    && (
                                                        <>
                                                            <Button type="danger" shape="circle" icon="delete" onClick={() => this.showDeleteConfirm(index)} />
                                                            <Button type="primary" shape="circle" icon="edit" onClick={() => this.editStep(index)} />
                                                            <Button
                                                                type="danger"
                                                                className="change-pos favorite"
                                                                shape="circle"
                                                                icon="star"
                                                                onClick={() => this.toggleSaveStepModal(index)}
                                                            />
                                                            {type !== 'theory' && (
                                                                <Button
                                                                    type="danger"
                                                                    className="change-pos favorite"
                                                                    shape="circle"
                                                                    icon="plus"
                                                                    onClick={() => this.handleAddState(index)}
                                                                />
                                                            )}
                                                            { (!!isTemplate && record.uuid)
                                                        && (
                                                            <>
                                                                <Switch
                                                                    checked={!!record.is_compulsory}
                                                                    checkedChildren="Is Compulsory"
                                                                    onChange={checked => this.changeCompulsory(checked, index)}
                                                                    unCheckedChildren="Is Compulsory"
                                                                />
                                                                {
                                                                    !!record.is_compulsory
                                                                && (
                                                                    <Button
                                                                        type="primary"
                                                                        icon="issues-close"
                                                                        shape="circle"
                                                                        onClick={() => this.pushChanges(index)}
                                                                    />
                                                                )
                                                                }

                                                            </>
                                                        )}
                                                        </>
                                                    )
                                        }
                                    </>
                                )}
                            />

                        </Table>

                    </Col>
                    <Col span={isTemplate ? 11 : 13}>
                        <Row>
                            {
                                selectedIndex !== null && selectedStep
                                    ? (
                                        <ContentBlocks
                                            blocks={selectedStep.contentBlocks}
                                            onChangeContentType={this.onChangeContentType}
                                            onChangeState={this.onChangeState}
                                            onChangeBlocksPosition={this.onChangeBlocksPosition}
                                            addComponent={this.addComponent}
                                            addSavedComponent={this.addSavedComponent}
                                            uploadFile={this.props.uploadFile}
                                            hints={this.props.hints}
                                            addHint={this.props.addHint}
                                            editHint={this.props.editHint}
                                            deleteHint={this.props.deleteHint}
                                            course_id={this.props.course_id}
                                            storeSavedComponent={this.props.storeSavedComponent}
                                            favorites={favorites}
                                            type={this.props.type}
                                            fetchFavoriteComponents={this.props.fetchFavoriteComponents}
                                            steps_images={this.props.steps_images}
                                            getRemovedComponents={this.getRemovedComponents}
                                            isTemplate={isTemplate}
                                            updateStepContent={this.props.updateStepContent}
                                            is_compulsory={selectedStep.is_compulsory}
                                            learningPaths={learningPaths}
                                        />
                                    )
                                    : <></>
                            }
                        </Row>
                        <Row>
                            <Col>
                                {
                                    selectedIndex !== null && selectedStep
                                        ? (
                                            <div className="save-container">
                                                <Button className="btn-save" loading={loadingSaveSteps} onClick={this.save} type="primary">Save</Button>
                                                <Button className="btn-primary" type="primary" onClick={this.toggleModal}>Preview</Button>
                                            </div>
                                        )
                                        : <></>

                                }
                            </Col>
                        </Row>

                    </Col>
                </Row>
                <Modal
                    title="Preview Steps"
                    className="preview-steps-modal"
                    visible={this.state.visible}
                    onOk={this.saveModal}
                    okText="Save"
                    onCancel={this.toggleModal}
                    width="95%"
                >
                    <PreviewSteps
                        chapters={this.state.steps}
                        steps_images={this.props.steps_images}
                        getHintMessage={this.props.getHintMessage}
                        currentStep={selectedIndex}
                        learningPaths={learningPaths}
                        user={user}
                    />
                </Modal>

                <Modal
                    title="Save Favorite Step"
                    visible={this.state.openFavoriteStep}
                    onOk={this.saveFavoriteStep}
                    okText="Save Step"
                    onCancel={this.toggleSaveStepModal}
                    className="save-component-modal"
                >
                    <Input
                        className={`${titleRequiredError ? 'required-input' : ''}`}
                        placeholder='Title for Favorite Lab Step'
                        value={stepTitle}
                        onChange={this.onChangeFavoriteStep}
                        maxLength={100}
                    />
                    {titleRequiredError && <span className='required-warning'>Title is required!</span>}
                </Modal>
            </div>
        );
    }
}

export default EditSteps;
