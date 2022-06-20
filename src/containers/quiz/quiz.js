import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Typography,
    Progress,
    List,
    Affix,
    Button,
    Modal,
    Result,
    notification,
    message,
    Alert,
    Icon,
} from 'antd';
import Question from '../../components/quiz/question';
import { fetchQuizzes, saveAnswers, clearQuizStore } from '../../store/actions/quiz';
import Loading from '../../components/Loading/Loading';
import './quiz.scss';
import { COURSE_TYPE } from '../../constants';

const { Title, Text } = Typography;
const confirmModal = Modal.confirm;

export class Quiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            questions_count: 0,
            affix: false,
            showSuccessModal: false,
            answeredQuestions: {},
            failedQuestions: {},
            showWarningModal: false,
            loading: false,
        };
    }

    componentDidMount() {
        this.props.clearQuizStore();
        this.setState({ loading: true });
        const { state } = this.props.location;
        let course_id = 0;

        if (state) {
            course_id = state.course_id;
        } else {
            this.props.history.push('/');
            return;
        }

        confirmModal({
            title: 'Are you ready to start the quiz? Be aware you have a maximum of 4 attempts!',
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk: () => {
                const loader = message.loading('Loading..');
                this.props.fetchQuizzes(course_id).then(res => {
                    if (res === true) {
                        loader();
                        const { failedQuestions, answers, questions } = this.props.quiz;
                        const questions_count = questions.length;

                        this.setState({
                            questions_count,
                            progress: this.__calculateProgress(questions_count, Object.keys(answers).length),
                            failedQuestions: this.__arrayToObject(failedQuestions),
                            answeredQuestions: answers,
                        });
                    } else {
                        message.error(res.message);
                        this.props.history.push(`/platform/course-chapters/${course_id}`);
                    }
                    this.setState({ loading: false });
                });
            },
            onCancel: () => {
                this.props.history.push(`/platform/course-chapters/${course_id}`);
            },
        });
    }

    componentWillUnmount() {
        this.props.clearQuizStore();
    }

    __arrayToObject(arr) {
        const obj = {};
        arr.forEach(item => {
            obj[item] = true;
        });

        return obj;
    }

    __calculateProgress(questions_count, answered_questions_count) {
        return Math.floor(answered_questions_count * 100 / questions_count);
    }

    __openNotificationForWrongAnswered = attempts => {
        notification.error({
            key: attempts >= 3 ? 'no-more-attempts' : 'wrong-answers',
            message: attempts >= 3 ? 'No more attempts are allowed!' : 'Some questions are answered incorrect.',
            description:
                attempts >= 3 ? 'You used the maximum number of attempts!' : 'Re-do only the ‘red’ questions!',
        });
    }

    closeModal = () => {
        this.setState({
            showSuccessModal: false,
        });
    }

    closeWarningModal = () => {
        this.setState({
            showWarningModal: false,
        });
    }

    onChangeAnswer = (e, questionId, answerId, isMultiple) => {
        const { answeredQuestions, questions_count } = this.state;
        if (e.target.checked) {
            let answers = answeredQuestions[questionId];
            answers && isMultiple ? answers.push(answerId) : answers = [answerId];
            answeredQuestions[questionId] = [...new Set(answers)];
        } else {
            answeredQuestions[questionId].splice(answeredQuestions[questionId].findIndex(item => item === answerId), 1);
            if (!answeredQuestions[questionId].length) {
                delete answeredQuestions[questionId];
            }
        }

        this.setState({
            progress: this.__calculateProgress(questions_count, Object.keys(answeredQuestions).length),
            answeredQuestions,
        });
    }

    confirm = () => {
        const { attempts } = this.props.quiz;
        const { answeredQuestions } = this.state;
        const { course_id } = this.props.location.state;
        const loader = message.loading('please wait...', 0);
        this.setState({
            showWarningModal: false,
        });
        this.props.saveAnswers(course_id, answeredQuestions).then(res => {
            if (res === true) {
                const { failedQuestions, answers } = this.props.quiz;
                if (failedQuestions.length) {
                    this.__openNotificationForWrongAnswered(attempts);
                } else {
                    this.setState({
                        showSuccessModal: true,
                    });
                }
                this.setState({
                    failedQuestions: this.__arrayToObject(failedQuestions),
                    answeredQuestions: answers,
                });
                loader();
                message.success('Saved');
            } else {
                message.error(res.message);
            }
        });
    }

    saveAnswers = () => {
        const { attempts } = this.props.quiz;
        let currentAttempt = attempts;
        switch (currentAttempt) {
        case 0:
            currentAttempt = '1st';
            break;
        case 1:
            currentAttempt = '2nd';
            break;
        case 2:
            currentAttempt = '3rd';
            break;
        case 3:
            currentAttempt = '4th';
            break;
        default:
            currentAttempt = `${attempts + 1}th`;
        }
        this.setState({
            currentAttempt,
            showWarningModal: true,
        });
    }

    goToCourse = () => {
        this.setState({
            showSuccessModal: false,
        });
        const { active_course_id } = this.props.location.state;
        this.props.history.push(`/platform/tl/${active_course_id.id}`);
    }

    goToCertificates = () => {
        this.props.history.push('/platform/achievements');
    }

    goToTheory = () => {
        const { course_id } = this.props.location.state;
        this.props.history.push(`/platform/course-chapters/${course_id}`);
    }

    render() {
        const {
            progress, affix, showSuccessModal, failedQuestions, answeredQuestions, showWarningModal, currentAttempt, loading,
        } = this.state;
        const { questions, attempts, courseType } = this.props.quiz;

        return (
            <>
                <Modal
                    visible={showSuccessModal}
                    onCancel={this.closeModal}
                    footer={false}
                    className="quiz-modal"
                >
                    <Result
                        status="success"
                        title="Congratulations!"
                        subTitle={courseType === COURSE_TYPE.INTRODUCTION
                            ? 'You completed the quiz for the preparation lab of this Introduction Module'
                            : "You have been granted a badge for completing this preparation lab. Check it out on 'My Achievements'!"}
                        extra={[
                            <Button key="buy" onClick={this.goToCourse}>
                                {courseType === COURSE_TYPE.INTRODUCTION ? 'Go back to Introduction Module' : 'Go to Course'}
                            </Button>,
                            courseType !== COURSE_TYPE.INTRODUCTION && (
                                <Button type="primary" key="console" onClick={this.goToCertificates}>
                                    Go to My Achievements
                                </Button>
                            ),
                        ]}
                    />
                </Modal>
                <Modal
                    visible={showWarningModal}
                    closable={false}
                    onCancel={this.closeWarningModal}
                    className="quiz-warning-modal"
                    width={416}
                    footer={[
                        <Button key="backToCourse" onClick={this.goToTheory}>
                            back to Preparation Lab
                        </Button>,
                        <Button key="backToQuiz" onClick={this.closeWarningModal}>
                            Back to Quiz
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.confirm}>
                            Yes
                        </Button>,
                    ]}
                >
                    <div className="content-wrapper">
                        <Icon className="question-icon" type="question-circle" />
                        <div className="warning-modal-text">
                            This is your
                            {currentAttempt}
                            {' '}
                            attempt. You will have a maximum of 4 attempts. Are you sure you want to submit now ?
                        </div>
                    </div>
                </Modal>
                <div className="quiz-container">
                    <Affix offsetTop={84} onChange={affixed => this.setState({ affix: affixed })}>
                        <div className={`quiz-heading-container ${affix ? 'affixed' : ''}`}>
                            <div className="quiz-heading">
                                <Title level={3} className="quiz-heading-title">Quiz</Title>
                                <div className="quiz-progress">
                                    <Progress
                                        percent={progress}
                                        strokeColor={{
                                            from: '#108ee9',
                                            to: '#87d068',
                                        }}
                                    />
                                </div>

                            </div>
                            <div className="quiz-warning-message">
                                {Object.keys(failedQuestions).length
                                    ? <Alert message={attempts >= 4 ? 'You used the maximum number of attempts!' : 'Some questions are answered incorrect. Re-do only the ‘red’ questions!'} type="error" /> : ''}
                            </div>
                        </div>
                    </Affix>

                    <div className="quiz-body">
                        {!loading
                            ? (
                                <List
                                    dataSource={questions}
                                    renderItem={(item, itemIndex) => (
                                        <div className={`question-wrapper ${answeredQuestions[item.id] ? 'checked' : ''} ${failedQuestions[item.id] ? 'wrong' : attempts && 'success'}`}>
                                            <span className="question-number ">{itemIndex + 1}</span>
                                            <List.Item className="question-item ">
                                                <Text className="question-text">
                                                    {item.question}
                                                </Text>
                                                <Question
                                                    disabled={Boolean(attempts && !failedQuestions[item.id])}
                                                    questionIdx={itemIndex}
                                                    checkedAnswers={answeredQuestions[item.id] || []}
                                                    data={item.answers}
                                                    is_multiple={item.is_multiple}
                                                    onChange={this.onChangeAnswer}
                                                />
                                            </List.Item>
                                        </div>
                                    )}
                                />
                            )
                            : <Loading />}

                        {
                            questions.length ? (
                                <>
                                    <Button className="quiz-submit" type="primary" disabled={(!Object.keys(failedQuestions).length && attempts) || attempts >= 4} onClick={this.saveAnswers}>Submit</Button>
                                    <Button className="quiz-back-to-theory" onClick={this.goToTheory}>back to Preparation Lab</Button>
                                </>
                            ) : ''
                        }
                        {
                            (!Object.keys(failedQuestions).length && attempts && courseType !== COURSE_TYPE.INTRODUCTION) || attempts >= 4 ? (
                                <Button type="default" key="console" onClick={this.goToCertificates}>
                                    Go to achievements
                                </Button>
                            ) : ''
                        }
                    </div>
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.quiz,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizzes: course_id => dispatch(fetchQuizzes(course_id)),
        saveAnswers: (course_id, ids) => dispatch(saveAnswers(course_id, ids)),
        clearQuizStore: () => dispatch(clearQuizStore()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
