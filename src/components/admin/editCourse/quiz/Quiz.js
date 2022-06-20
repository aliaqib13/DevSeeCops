import React, { Component } from 'react';
import {
    Input, Checkbox, Button, Icon, Col, Row, message, Modal, Switch,
} from 'antd';
import './quiz.scss';

const confirmModal = Modal.confirm;

export default class Quiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quizzes: [],
            loaders: {},
            saveAllLoader: false,
            changedQuizzes: {},
        };
    }

    __addToChanged = (quizIdx, quizId = null) => {
        const { changedQuizzes } = this.state;
        changedQuizzes[quizIdx] = quizId;
        this.setState({
            changedQuizzes,
        });
    }

    addQuestion = () => {
        const quizzes = [...this.state.quizzes];
        quizzes.push({
            course_id: this.props.course_id,
            question: '',
            answers: [{
                answer: '',
                is_right: false,
            }],
        });

        this.__addToChanged(quizzes.length - 1);
        this.setState({
            quizzes,
        });
    }

    addAnswer = idx => {
        const quizzes = [...this.state.quizzes];
        quizzes[idx].answers.push({
            answer: '',
            is_right: false,
        });
        this.__addToChanged(idx, quizzes[idx].id);
        this.setState({
            quizzes,
        });
    }

    selectRightAnswers = (e, quizIdx, answerIdx) => {
        const quizzes = [...this.state.quizzes];
        if (!quizzes[quizIdx].is_multiple) {
            quizzes[quizIdx].answers.forEach(item => item.is_right = 0);
        }
        quizzes[quizIdx].answers[answerIdx].is_right = e.target.checked;
        this.__addToChanged(quizIdx, quizzes[quizIdx].id);
        this.setState({
            quizzes,
        });
    }

    changeMultiple = (e, quizIdx) => {
        const quizzes = [...this.state.quizzes];
        quizzes[quizIdx].is_multiple = !quizzes[quizIdx].is_multiple;
        if (!quizzes[quizIdx].is_multiple) {
            const rightAnswers = quizzes[quizIdx].answers.filter(item => item.is_right);
            if (rightAnswers.length > 1) {
                quizzes[quizIdx].answers.forEach(item => item.is_right = 0);
            }
        }
        this.__addToChanged(quizIdx, quizzes[quizIdx].id);
        this.setState({
            quizzes,
        });
    }

    deleteAnswer = (quizIdx, answerIdx) => {
        const quizzes = [...this.state.quizzes];
        quizzes[quizIdx].answers.splice(answerIdx, 1);
        this.__addToChanged(quizIdx, quizzes[quizIdx].id);
        this.setState({
            quizzes,
        });
    }

    onChangeQuiz = (e, quizIdx) => {
        const quizzes = [...this.state.quizzes];
        quizzes[quizIdx].question = e.target.value;
        this.__addToChanged(quizIdx, quizzes[quizIdx].id);
        this.setState({
            quizzes,
        });
    }

    onChangeAnswer = (e, quizIdx, answerIdx) => {
        const quizzes = [...this.state.quizzes];
        quizzes[quizIdx].answers[answerIdx].answer = e.target.value;
        this.__addToChanged(quizIdx, quizzes[quizIdx].id);
        this.setState({
            quizzes,
        });
    }

    saveAllQuizzes = () => {
        const { changedQuizzes, quizzes } = this.state;
        const { course_id } = this.props;
        const data = {
            create: [],
            update: [],
        };
        for (const key in changedQuizzes) {
            if (changedQuizzes[key]) {
                data.update.push(quizzes[key]);
            } else {
                if (!quizzes[key].is_multiple) {
                    quizzes[key].is_multiple = 0;
                }
                data.create.push(quizzes[key]);
            }
        }
        quizzes.forEach((e, i) => e.order_number = i + 1);
        this.setState({
            saveAllLoader: true,
        });

        this.props.saveAllQuizzes(course_id, data).then(res => {
            if (res === true) {
                message.success('Saved!');

                this.setState({
                    quizzes: this.props.quizzes,
                    changedQuizzes: {},
                });
            } else {
                message.error(res.message);
            }

            this.setState({
                saveAllLoader: false,
            });
        });
    }

    saveQuiz = (quizIdx, id) => {
        const data = { ...this.state.quizzes[quizIdx] };
        const loaders = { ...this.state };
        const changedQuizzes = { ...this.state.changedQuizzes };

        if (changedQuizzes[quizIdx]) {
            delete changedQuizzes[quizIdx];
        }

        loaders[quizIdx] = true;
        this.setState({
            loaders,
            changedQuizzes,
        });

        if (id) {
            this.props.updateQuiz(id, data).then(res => {
                loaders[quizIdx] = false;
                if (res === true) {
                    message.success('Saved');
                } else {
                    message.error(res.message);
                }

                this.setState({
                    loaders,
                });
            });
        } else {
            data.course_id = this.props.course_id;
            if (!data.is_multiple) {
                data.is_multiple = 0;
            }
            loaders[quizIdx] = false;
            this.props.createQuiz(data).then(res => {
                if (res === true) {
                    message.success('Created');
                    delete changedQuizzes[this.props.quizzes.length - 1];
                    this.setState({
                        loaders,
                        quizzes: this.props.quizzes,
                        changedQuizzes,
                    });
                } else {
                    message.error(res.message);
                }
            });
        }
    }

    deleteQuiz = (id, quizIdx) => {
        const changedQuizzes = { ...this.state.changedQuizzes };
        const { quizzes } = this.state;
        confirmModal({
            title: 'Are you sure delete this question?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                if (id) {
                    this.props.deleteQuiz(id).then(res => {
                        if (res === true) {
                            message.success('Deleted.');

                            delete changedQuizzes[quizIdx];

                            this.setState({
                                quizzes: this.props.quizzes,
                                changedQuizzes,
                            });
                        } else {
                            message.error(res.message);
                        }
                    });
                } else {
                    quizzes.splice(quizIdx, 1);
                    delete changedQuizzes[quizIdx];

                    this.setState({
                        quizzes: this.props.quizzes,
                        changedQuizzes,
                    });
                }
            },
        });
    }

    changePosition = (index, dir) => {
        const { quizzes } = this.state;
        const from = parseInt(index);
        const to = Math.min(Math.max(from + (dir === 'up' ? -1 : 1), 0), quizzes.length - 1);

        // If trying to move the top up, or the bottom down, there's no change
        if (from === to) {
            return;
        }

        // Move them around:
        quizzes[from].order_number = to + 1;
        quizzes[to].order_number = from + 1;
        const newQuizzes = [...quizzes].sort((a, b) => a.order_number - b.order_number);

        // Add them to the list of changed steps
        [from, to].forEach(idx => {
            this.__addToChanged(idx, quizzes[idx].id);
        });

        this.setState({
            quizzes: newQuizzes,
        });
    }

    componentDidMount() {
        this.setState({
            quizzes: this.props.quizzes,
        });
    }

    render() {
        const {
            quizzes, loaders, changedQuizzes, saveAllLoader,
        } = this.state;
        const { course_id } = this.props;

        return (
            <div className="quiz-cms">
                {
                    quizzes.map((item, quizIdx) => (
                        <Col span={24} className="block-item" key={quizIdx}>
                            <span className="label-span">Question</span>
                            <div className="tools-block">
                                <Button type="primary" className="change-pos-btn" shape="circle" icon="arrow-up" onClick={() => this.changePosition(quizIdx, 'up')} />
                                <Button type="primary" className="change-pos-btn" shape="circle" icon="arrow-down" onClick={() => this.changePosition(quizIdx, 'down')} />
                            </div>
                            <Input.TextArea rows={2} value={item.question} placeholder="Question" onChange={e => this.onChangeQuiz(e, quizIdx)} />
                            <Col span={18} className="quiz-answers">
                                <span className="label-span">Answers</span>
                                {
                                    (item.answers || []).map((answer, answerIdx) => (
                                        <div key={answerIdx} className="answer">
                                            <Input
                                                addonBefore={<Checkbox checked={answer.is_right} onChange={e => this.selectRightAnswers(e, quizIdx, answerIdx)} />}
                                                addonAfter={<Button className="answer-delete-btn" icon="delete" size="small" onClick={() => this.deleteAnswer(quizIdx, answerIdx)} />}
                                                value={answer.answer}
                                                placeholder="Answer"
                                                onChange={e => this.onChangeAnswer(e, quizIdx, answerIdx)}
                                            />
                                        </div>
                                    ))
                                }
                                <div className="multipleAnswer">
                                    <div className="multipleSwitch">
                                        <Switch
                                            checked={!!item.is_multiple}
                                            onChange={e => this.changeMultiple(e, quizIdx)}
                                            checkedChildren="Multiple"
                                            unCheckedChildren="Single"
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col span={6} className="quiz-answers">
                                <Row>
                                    <Button className="quiz-btn link-red" type="link" onClick={() => this.deleteQuiz(item.id, quizIdx)}>
                                        <Icon type="minus-circle" />
                                        {' '}
                                        Delete question
                                    </Button>
                                </Row>
                                <Row>
                                    <Button className="quiz-btn" type="link" onClick={() => this.addAnswer(quizIdx)}>
                                        <Icon type="plus-circle" />
                                        {' '}
                                        Add answer
                                    </Button>
                                </Row>
                                <Row>
                                    <Button className="quiz-save-btn" type="primary" disabled={changedQuizzes[quizIdx] === undefined} loading={loaders[quizIdx]} onClick={() => this.saveQuiz(quizIdx, item.id)}>
                                        Save Quiz
                                        <Icon type="download" />
                                    </Button>
                                </Row>
                            </Col>

                        </Col>
                    ))
                }
                <Col span={24} className="quiz-answers">
                    <div className="quiz-btn-container">
                        <Button type="link" onClick={this.addQuestion} size="large">
                            <Icon type="plus-circle" />
                            {' '}
                            Add question
                        </Button>
                    </div>
                    <div className="quiz-btn-container">
                        <Button type="primary" loading={saveAllLoader} disabled={!Object.keys(changedQuizzes).length} onClick={() => this.saveAllQuizzes(course_id)} size="large">
                            Save All Questions
                            <Icon type="download" />
                        </Button>
                    </div>
                </Col>
            </div>
        );
    }
}
