import React, { Component } from 'react';
import {
    Button, Col, Input, message, Modal, Row, Table, Typography,
} from 'antd';
import './fellow-news.scss';
import AddStep from '../fellowGuidelines/addStep';
import Blocks from '../fellowGuidelines/blocks';
import PreviewSteps from '../../../../containers/admin/previewSteps/previewSteps';
import { arrayMoveElement } from '../../../../util/utils';

const { Title } = Typography;
const { Column } = Table;

export default class FellowNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: [],
            selectedStep: null,
            selectedIndex: null,
            visible: false,
        };
    }

    componentDidMount() {
        const loader = message.loading('loading news');
        this.props.getFellowNews().then(res => {
            if (res.status === 200) {
                this.setState({
                    steps: res.data.content,
                });
                loader();
            } else {
                message.error(res);
            }
        });
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
        };
        return { ...blockTypes[type] };
    }

    toggleModal = () => {
        this.setState({
            visible: !this.state.visible,
        });
    }

    saveModal = () => {
        this.save();
        this.toggleModal();
    }

    save = () => {
        const { steps } = this.state;
        this.props.updateFellowNews({
            content: steps,
        }).then(res => {
            if (res.status === 200) {
                this.setState({
                    steps: res.data.content,
                });
                message.success('Saved!');
            } else if (res.errors) {
                res.errors.forEach(item => {
                    message.error(`${item.field} is ${item.validation}`);
                });
            } else {
                message.error('Something went wrong, please try again.');
            }
        });
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

    removeStep = index => {
        const steps = this.state.steps.slice();
        steps.splice(index, 1);

        this.setState({
            steps,
            selectedStep: null,
            selectedIndex: null,
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

    addComponent = (addOnTop = null) => {
        const selectedStep = { ...this.state.selectedStep };
        const newBlock = this.__getBlockType('SingleText');
        if (addOnTop) {
            selectedStep.contentBlocks.unshift(newBlock);
        } else {
            selectedStep.contentBlocks.push(newBlock);
        }
        this.setState({
            selectedStep,
        });
    }

    onChangeContentType = (type, index) => {
        const selectedStep = { ...this.state.selectedStep };
        selectedStep.contentBlocks[index] = { ...this.__getBlockType(type) };
        this.setState({
            selectedStep,
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

    render() {
        const { steps, selectedIndex, selectedStep } = this.state;
        return (
            <div className="fellow-guidelines-container">
                <Title className="fellow-guidelines-title" level={4}> Fellow News</Title>

                <div className="fellow-guidelines-list">
                    <Row>
                        <Col offset={13} span={13}>
                            <div className="save-guideline-container">
                                <Button className="btn-save-guideline" onClick={this.save} type="primary">Save</Button>
                                <Button className="btn-preview-guideline" type="primary" disabled={!this.state.steps.length} onClick={this.toggleModal}>Preview </Button>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={11} className="lab-steps-list">
                            <Table
                                dataSource={steps}
                                pagination={false}
                                rowKey={(item, index) => index}
                                footer={() => (
                                    <AddStep
                                        addStep={this.addStep}
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
                                                selectedIndex === index && selectedStep
                                                    ? <Input value={selectedStep.title} onChange={this.changeTitle} /> : record.title
                                            }
                                        </>
                                    )}
                                />
                                <Column
                                    title="Actions"
                                    key="actions"
                                    render={(text, record, index) => (
                                        <>
                                            <Button type="primary" className="change-pos-btn" shape="circle" icon="arrow-up" onClick={() => this.changePosition(index, 'up')} />
                                            <Button type="primary" className="change-pos-btn" shape="circle" icon="arrow-down" onClick={() => this.changePosition(index, 'down')} />
                                            <Button type="danger" shape="circle" icon="delete" onClick={() => this.removeStep(index)} />
                                            <Button type="primary" shape="circle" icon="edit" onClick={() => this.editStep(index)} />
                                        </>
                                    )}
                                />
                            </Table>
                        </Col>
                        <Col span={13}>
                            {
                                selectedIndex !== null && selectedStep
                                    ? (
                                        <Blocks
                                            blocks={selectedStep.contentBlocks}
                                            onChangeContentType={this.onChangeContentType}
                                            onChangeState={this.onChangeState}
                                            onChangeBlocksPosition={this.onChangeBlocksPosition}
                                            uploadFile={this.props.uploadFile}
                                            addComponent={this.addComponent}
                                        />
                                    )
                                    : <></>
                            }

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
                        <PreviewSteps chapters={this.state.steps} currentStep={selectedIndex} />
                    </Modal>

                </div>
            </div>
        );
    }
}
