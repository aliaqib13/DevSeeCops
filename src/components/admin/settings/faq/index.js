import React, { Component } from 'react';
import {
    Collapse, Icon, Modal, Input, Button, message,
} from 'antd';
import './faq.scss';

const { Panel } = Collapse;
const confirmModal = Modal.confirm;

export default class FaqTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            faqModal: false,
            loading: false,
            editFaq: {
                id: 0,
                question: '',
                answer: '',
            },
        };
    }

    openModal = (e, index) => {
        e.stopPropagation();

        if (index !== undefined) {
            this.setState({
                editFaq: { ...this.props.faq[index] },
                faqModal: true,
            });
        } else {
            this.setState({
                faqModal: true,
            });
        }
    }

    closeModal = () => {
        this.setState({
            editFaq: {
                id: 0,
                question: '',
                answer: '',
            },
            faqModal: false,
        });
    }

    onChangeHandler = e => {
        const { editFaq } = this.state;
        editFaq[e.target.name] = e.target.value;
        this.setState({
            editFaq,
        });
    }

    onSubmit = () => {
        const { id, question, answer } = this.state.editFaq;
        this.setState({
            loading: true,
        });

        if (id === 0) {
            this.__create(question, answer);
        } else {
            this.__update(id, question, answer);
        }
    }

    __create(question, answer) {
        this.props.createFaq({
            question,
            answer,
        }).then(res => {
            if (res === true) {
                message.success('Created');
                this.setState({
                    loading: false,
                    faqModal: false,
                    editFaq: {
                        id: 0,
                        question: '',
                        answer: '',
                    },
                });
            } else {
                this.setState({
                    loading: false,
                });
                if (res.errors) {
                    message.error(res.errors[0].message);
                } else {
                    message.error(res.message);
                }
            }
        });
    }

    __update(id, question, answer) {
        this.props.updateFaq(id, {
            question,
            answer,
        }).then(res => {
            if (res === true) {
                message.success('Update');
                this.setState({
                    loading: false,
                    faqModal: false,
                    editFaq: {
                        id: 0,
                        question: '',
                        answer: '',
                    },
                });
            } else {
                this.setState({
                    loading: false,
                });
                if (res.errors) {
                    message.error(res.errors[0].message);
                } else {
                    message.error(res.message);
                }
            }
        });
    }

    delete = (e, id) => {
        e.stopPropagation();
        confirmModal({
            title: 'Are you sure delete this item?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            okButtonProps: {
                loading: this.state.loading,
            },
            onOk: () => {
                this.setState({
                    loading: true,
                });
                this.props.deleteFaq(id).then(res => {
                    this.setState({
                        loading: false,
                    });

                    if (res === true) {
                        message.success('Deleted.');
                    } else {
                        message.error(res.message);
                    }
                });
            },
        });
    }

    render() {
        const { faq } = this.props;
        const { faqModal, loading, editFaq } = this.state;

        return (
            <div className="settings-faq-tab">

                <Button type="primary" className="add-btn" onClick={this.openModal}>Add</Button>

                <Collapse
                    expandIconPosition="left"
                >
                    {
                        (faq || []).map((item, key) => (
                            <Panel
                                key={key}
                                header={item.question}
                                extra={(
                                    <div className="action-buttons">
                                        <Icon type="edit" onClick={e => this.openModal(e, key)} />
                                        <Icon type="delete" onClick={e => this.delete(e, item.id)} />
                                    </div>
                                )}
                            >
                                <div>{item.answer}</div>
                            </Panel>
                        ))
                    }
                </Collapse>

                <Modal
                    title="Add FAQ"
                    visible={faqModal}
                    onOk={this.onSubmit}
                    onCancel={this.closeModal}
                    okText="Ok"
                    cancelText="Cancel"
                    confirmLoading={loading}
                >
                    <Input.TextArea name="question" rows={2} className="faq-modal-input" value={editFaq.question} onChange={this.onChangeHandler} />
                    <Input.TextArea name="answer" rows={4} className="faq-modal-input" value={editFaq.answer} onChange={this.onChangeHandler} />
                </Modal>
            </div>
        );
    }
}
