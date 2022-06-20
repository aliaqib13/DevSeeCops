import React, { Component } from 'react';
import { connect } from 'react-redux';
import './chapters.scss';
import {
    Button, Typography, message, Icon, Timeline, Collapse, Empty,
} from 'antd';
import { withRouter, NavLink } from 'react-router-dom';
import ReactGA from 'react-ga';
import { CATEGORIES, ACTIONS } from '../../util/GAEventConstants';
import { getChapters, saveCurrentStep } from '../../store/actions/chapters';
import { fetchStepsImages } from '../../store/actions/stepsImages';
import { getLearningPaths } from '../../store/actions/learningPath';
import {
    TitleBox, InformationBox, BulletText, ParagraphTitle, SingleText, GreyBox, HeartBox, CodeSnippet, Video, Image,
    Image2, InfinityLoop, CopyField,
} from '../../components/blocks';
import Loading from '../../components/Loading/Loading';
import LearningPath from '../../components/learning-paths-view/learning-path';

const { Item } = Timeline;
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;
const ButtonGroup = Button.Group;

class Chapters extends Component {
    constructor(props) {
        super(props);

        this.loader = null;
        this.state = {
            currentStep: 0,
            activeCourse_id: null,
            videoVisible: [],
            mobileNavOpen: ['1'],
            loading: false,
        };
    }

    componentDidMount() {
        const { getChapters, fetchStepsImages, getLearningPaths } = this.props;
        this.visitedTime = new Date().getTime();
        this.loader = message.loading('Loading..', 0);
        this.setState({
            loading: true,
        });
        const { id } = this.props.match.params;
        ReactGA.pageview(window.location.pathname);
        getChapters(id).then(res => {
            this.loader();
            this.__scrollToHead();
            if (res !== false) {
                fetchStepsImages(id);
                if (res.currentStep) {
                    this.setState({
                        currentStep: parseInt(res.currentStep.theory_step) >= res.chapters.length ? 0 : parseInt(res.currentStep.theory_step),
                    });
                }
            }
            this.setState({
                loading: false,
            });
            const { data } = this.props.chapters;
            ReactGA.event({
                category: CATEGORIES.THEORY_LAB,
                action: ACTIONS.THEORY_STARTED_FOR_COURSE(data.title),
                label: 'Theory Page',
            });
        });
        getLearningPaths();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.chapters.error) {
            message.error(nextProps.chapters.error);
        }
    }

    __saveUserStep(step) {
        const { currentStep } = this.props.chapters.data;
        const course_id = this.props.chapters.data.active_course_id.id;
        let id = 0;
        if (currentStep) {
            id = currentStep.id;
        }

        this.props.saveCurrentStep(id, course_id, step);
    }

    next = () => {
        const step = this.state.currentStep + 1;

        this.__saveUserStep(step);

        this.__scrollToHead();
        this.setState({
            currentStep: step,
        });
        this.resetLearningPathVideo();
    }

    prev = () => {
        const step = this.state.currentStep - 1;
        this.__saveUserStep(step);

        this.__scrollToHead();
        this.setState({
            currentStep: step,
        });
        this.resetLearningPathVideo();
    }

    selectStep(currentStep) {
        this.__saveUserStep(currentStep);
        this.__scrollToHead();
        this.closeMobileNav();
        this.setState({
            currentStep,
        });
        this.resetLearningPathVideo();
    }

    toQuizPage = () => {
        const {
            course_id, duration, active_course_id, title,
        } = this.props.chapters.data;
        ReactGA.event({
            category: CATEGORIES.QUIZ,
            action: ACTIONS.QUIZ_STARTED_FOR_COURSE(title),
            label: 'Quiz Start',
        });
        this.props.history.push({
            pathname: '/platform/quiz',
            state: {
                course_id,
                active_course_id,
                duration,
            },
        });
    }

    toTheoryandLabPage = () => {
        const { active_course_id } = this.props.chapters.data;
        this.props.history.push(`/platform/tl/${active_course_id.id}`);
    }

    __scrollToHead() {
        // We delay the scrollTo until after any re-renders.
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
    }

    toggleMobileNav = key => {
        this.setState({
            mobileNavOpen: key,
        });
    };

    closeMobileNav = () => {
        this.setState({
            mobileNavOpen: [],
        });
    };

    componentWillUnmount() {
        this.leftTime = new Date().getTime();
        const time = this.leftTime - this.visitedTime;
        ReactGA.timing({
            category: CATEGORIES.TIMING,
            variable: 'time',
            value: time, // in milliseconds
            label: 'Theory Page',
        });
    }

    resetLearningPathVideo = () => {
        this.setState({ videoVisible: [] });
    }

    handleVideo = index => {
        const { videoVisible } = this.state;
        videoVisible[index] = !videoVisible[index];
        this.setState({ videoVisible }, () => {
            setTimeout(() => {
                const video = document.getElementById(`video-popup-${index}`);
                if (video) {
                    videoVisible[index] ? video.play() : video.pause();
                }
            }, 1000);
        });
    }

    getLabCount = courses => {
        let labCount = 0;
        courses.forEach(courseData => {
            labCount += courseData.course ? courseData.course.labs.length : 0;
        });
        return labCount;
    }

    render() {
        const {
            currentStep, loading, videoVisible,
        } = this.state;
        const { data } = this.props.chapters;
        const { user } = this.props.auth;
        const { id } = this.props.match.params;
        const steps = mode => (
            <Timeline reverse={false} current={currentStep} mode={mode}>
                {
                    data.chapters.map((item, key) => {
                        if (currentStep > key) {
                            return (
                                <Item
                                    color="green"
                                    className="has-cursor step-item"
                                    onClick={() => this.selectStep(key)}
                                    key={key}
                                    id={`step${key + 1}`}
                                >
                                    {item.title}
                                </Item>
                            );
                        } if (currentStep === key) {
                            return (
                                <Item
                                    className="has-cursor step-item"
                                    onClick={() => this.selectStep(key)}
                                    key={key}
                                    id={`step${key + 1}`}
                                >
                                    {item.title}
                                </Item>
                            );
                        }
                        return (
                            <Item
                                color="gray"
                                className="has-cursor step-item"
                                onClick={() => this.selectStep(key)}
                                key={key}
                                id={`step${key + 1}`}
                            >
                                {item.title}
                            </Item>
                        );
                    })
                }
            </Timeline>
        );
        return (
            <>
                {
                    data && !loading
                        ? (
                            <div className='chapters-container'>
                                <div className="courseTitleContainer">
                                    <Title level={1} className="lab-name">{data.title}</Title>
                                    <Paragraph className="lab-description">
                                        {data.content}
                                    </Paragraph>
                                </div>

                                <Collapse bordered={false} className='mobile-navigation' activeKey={this.state.mobileNavOpen} onChange={this.toggleMobileNav}>
                                    <Panel header={<Icon type="bars" />} key="1" showArrow={false}>
                                        {steps('right')}
                                    </Panel>
                                </Collapse>
                                <div className="stepsRow">
                                    <div className="top-control">
                                        {(user.roles.indexOf('administrator') !== -1 || data.isAuthor) && (
                                            <NavLink style={{ marginRight: '50px' }} to={`/platform/admin/edit-steps/theory/${id}`}>
                                                {' '}
                                                <Button shape="circle" icon="edit" />
                                            </NavLink>
                                        )}
                                        <ButtonGroup>
                                            <Button size="small" onClick={this.prev} icon="left" disabled={currentStep < 1} />
                                            <Button size="small" onClick={this.next} icon="right" disabled={currentStep === data.chapters.length - 1} />
                                        </ButtonGroup>
                                    </div>
                                    <div className="stepsContainer">
                                        {steps('left')}
                                    </div>
                                    <div className="contentCol">
                                        <div className="steps-content">
                                            {
                                                data.chapters[currentStep] && data.chapters[currentStep].contentBlocks.map((item, key) => {
                                                    let image_2_url; let
                                                        learningPath = '';

                                                    if (item.type === 'Image2' && item.content.uuid) {
                                                        const content = this.props.steps_images.find(img => img.uuid === item.content.uuid);
                                                        if (content) {
                                                            image_2_url = content.image;
                                                        }
                                                    }

                                                    if (item.type === 'LearningPath') {
                                                        learningPath = this.props.learningPaths.find(el => el.id === item.content.id);
                                                    }

                                                    return (
                                                        <div key={key} className={item.type === 'Image' ? 'imageContainer' : ''}>
                                                            {item.type === 'TitleBox' && <TitleBox content={item.content} />}
                                                            {item.type === 'BulletText' && <BulletText content={item.content} />}
                                                            {item.type === 'InformationBox' && <InformationBox content={item.content} />}
                                                            {item.type === 'ParagraphTitle' && <ParagraphTitle content={item.content} />}
                                                            {item.type === 'SingleText' && <SingleText content={item.content} />}
                                                            {item.type === 'GreyBox' && <GreyBox content={item.content} />}
                                                            {item.type === 'HeartBox' && <HeartBox content={item.content} />}
                                                            {item.type === 'InfinityLoop' && <InfinityLoop content={item.content} />}
                                                            {item.type === 'Image' && <Image content={item.content} />}
                                                            {item.type === 'Image2' && <Image2 content={{ image: image_2_url }} />}
                                                            {item.type === 'Video' && <Video content={item.content} />}
                                                            {item.type === 'CodeSnippet' && <CodeSnippet content={item.content} />}
                                                            {item.type === 'CopyField' && <CopyField content={item.content} />}
                                                            {/* { item.type === 'DropdownHint' && <DropdownHint content={item.content}/> } */}
                                                            {item.type === 'LearningPath' && learningPath
                                                        && (
                                                            <div className='learning-path-category'>
                                                                <LearningPath
                                                                    item={learningPath}
                                                                    modalVisible={videoVisible[Number(currentStep) + Number(key)]}
                                                                    handleVideo={this.handleVideo}
                                                                    getLabCount={this.getLabCount}
                                                                    user={user}
                                                                    index={Number(currentStep) + Number(key)}
                                                                    showArrow={false}
                                                                />
                                                            </div>
                                                        )}

                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                        <div className="steps-action">
                                            {currentStep === data.chapters.length - 1 && (
                                                <div>
                                                    <Button onClick={this.toQuizPage} className="buttons">
                                                        Take quiz
                                                    </Button>
                                                    <Button onClick={this.toTheoryandLabPage} className="handson">
                                                        Hands-on Lab
                                                    </Button>
                                                </div>

                                            )}
                                            {currentStep < data.chapters.length - 1 && (
                                                <Button onClick={() => this.next()} className="buttons">
                                                    Next
                                                </Button>
                                            )}
                                            {currentStep !== 0 && (
                                                <div className="stepsCount" data-id={currentStep}>
                                                    {currentStep + 1}
                                                    /
                                                    {data.chapters.length}
                                                </div>
                                            )}

                                            {currentStep > 0 && (
                                                <Button onClick={() => this.prev()} className="buttons previousButton">
                                                    Previous
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        : loading
                            ? <Loading />
                            : <Empty />
                }
            </>

        );
    }
}

function mapStateToProps(state) {
    return {
        chapters: state.chapters,
        steps_images: state.stepsImages.images,
        auth: state.auth,
        learningPaths: state.learningPathData.learningPaths,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getChapters: id => dispatch(getChapters(id)),
        saveCurrentStep: (id, course_id, step) => dispatch(saveCurrentStep(id, course_id, step)),
        fetchStepsImages: course_id => dispatch(fetchStepsImages(course_id)),
        getLearningPaths: () => dispatch(getLearningPaths()),
    };
}

export { Chapters };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Chapters));
