import React, { Component } from 'react';
import {
    Button, Icon, Input, Form, Modal, Table, message,
} from 'antd';
import Column from 'antd/es/table/Column';
import PreviewSteps from './previewFavoriteSteps';

const confirmModal = Modal.confirm;

export default class AddStep extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showInput: false,
            stepName: '',
            showFavoriteSteps: false,
            searchTitle: '',
            previewStep: [],
            showPreviewSteps: false,
            mod_width: 1000,
        };
    }

    componentDidMount() {
        const loader = message.info('loading...', 0);
        this.props.fetchFavoriteSteps().then(res => {
            if (res === true) {
                loader();
            } else {
                message.error('Something went wrong please try again!');
            }
        });
    }

    toggleModal = () => {
        this.setState({
            showFavoriteSteps: !this.state.showFavoriteSteps,
            mod_width: 1000,
        });
    }

    showInput = () => {
        this.setState({
            showInput: true,
        });
    }

    togglePreviewStepModal = () => {
        this.setState({
            showPreviewSteps: !this.state.showPreviewSteps,
        });
    }

    previewSteps = step => {
        this.setState({
            previewStep: step,
            showPreviewSteps: !this.state.showPreviewSteps,
        });
    }

    onChange = e => {
        this.setState({
            stepName: e.target.value,
        });
    }

    searchTitle = e => {
        const searchData = e.target.value;
        this.setState({
            searchTitle: searchData,
        });
        if (e.target.value.length < 254) {
            this.props.fetchFavoriteSteps(`${searchData}`);
        }
    }

    addNewStep = () => {
        const { stepName } = this.state;
        this.props.addStep(stepName);
        this.setState({
            showInput: false,
            stepName: '',
        });
    }

    restoreStep = step => {
        this.props.restoreStep(step);
        this.toggleModal();
    }

    deleteFavoriteStep = id => {
        confirmModal({
            title: 'Are you sure to delete this step',
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk: () => {
                this.props.deleteFavoriteStep(id).then(res => {
                    if (res === true) {
                        this.setState({
                            mod_width: this.state.mod_width - 1,
                        });
                        message.success('Saved Step Successfully deleted');
                    } else {
                        message.error('something went wrong please try again');
                    }
                });
            },
        });
    }

    render() {
        const {
            showInput, showFavoriteSteps, searchTitle, showPreviewSteps, previewStep, mod_width,
        } = this.state;
        const { favoriteSteps } = this.props;
        return (
            <>
                {
                    showInput
                        ? (
                            <Form layout="inline">
                                <Form.Item>
                                    <Input type="primary" placeholder="Step name" onChange={this.onChange} />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" onClick={this.addNewStep}>Save</Button>
                                </Form.Item>
                            </Form>
                        )
                        : (
                            <>
                                <Button type="link" size="large" onClick={this.showInput}>
                                    <Icon type="plus-circle" />
                                    Add step
                                </Button>
                                <Button className="addSavedSteps" type="link" size="large" onClick={this.toggleModal}>
                                    <Icon type="plus-circle" />
                                    Add Saved Steps
                                </Button>
                            </>
                        )

                }
                <Modal
                    className="savedSteps"
                    title="Saved Steps"
                    width={mod_width}
                    visible={showFavoriteSteps}
                    onCancel={this.toggleModal}
                    footer={null}
                >
                    <Table dataSource={favoriteSteps} rowKey={item => item.id} pagination={{ position: 'bottom', pageSize: 10 }}>
                        <Column title="title" dataIndex="title" key="title" />
                        <Column
                            title={() => (
                                <Input
                                    value={searchTitle}
                                    placeholder="Search by title"
                                    onChange={this.searchTitle}
                                />
                            )}
                            key="search"
                        />
                        <Column
                            title="actions"
                            key="action"
                            render={(text, record) => (
                                <div>
                                    <Button shape="circle" type="default" className="favorite-steps-btn" icon="info-circle" onClick={() => this.previewSteps(record.step)} />
                                    <Button type="danger" shape="circle" icon="delete" className="favorite-steps-btn" onClick={() => this.deleteFavoriteStep(record.id)} />
                                    <Button shape="circle" type="primary" onClick={() => this.restoreStep(record)} className="restore-step-btn" icon="check" />
                                </div>
                            )}
                        />
                    </Table>

                </Modal>
                <Modal
                    title="Preview Steps"
                    className="preview-steps-modal"
                    visible={showPreviewSteps}
                    onCancel={this.togglePreviewStepModal}
                    width="95%"
                    footer={null}
                >
                    <PreviewSteps step={previewStep} steps_images={this.props.steps_images} getHintMessage={this.props.getHintMessage} />
                </Modal>
            </>
        );
    }
}
