import React, { Component } from 'react';
import {
    Button, Row, Col, Timeline, Icon,
} from 'antd';
import {
    TitleBox, InformationBox, BulletText,
    ParagraphTitle, SingleText, GreyBox, HeartBox,
    CodeSnippet, Video, Image, InfinityLoop,
    DropdownHint, CopyField, Image2, UploadImageByUser,
} from '../../../components/blocks';
import LearningPath from '../../../components/learning-paths-view/learning-path';

const { Item } = Timeline;
const ButtonGroup = Button.Group;

class PreviewSteps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            data: null,
            completed_steps: [],
            failed_steps: [],
            videoVisible: [],
        };
    }

    componentDidMount() {
        const {
            currentStep, chapters, completed_steps, failed_steps,
        } = this.props;
        this.setState({
            currentStep: currentStep || 0,
            data: chapters,
            completed_steps,
            failed_steps,
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { chapters } = nextProps;
        if (chapters !== prevState.data) {
            return { data: chapters };
        }
        return null;
    }

    next() {
        const currentStep = this.state.currentStep + 1;
        this.setState({ currentStep });
        this.resetLearningPathVideo();
        window.scrollTo({ top: 100, behavior: 'smooth' });
    }

    prev() {
        const currentStep = this.state.currentStep - 1;
        this.setState({ currentStep });
        this.resetLearningPathVideo();
        window.scrollTo({ top: 100, behavior: 'smooth' });
        localStorage.setItem('currentStep', currentStep);
    }

    selectStep = currentStep => {
        this.setState({
            currentStep,
        });
        this.resetLearningPathVideo();
    }

    setProgress = (completed_steps, failed_steps) => {
        this.setState({
            completed_steps,
            failed_steps,
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
            currentStep, data, completed_steps, failed_steps, videoVisible,
        } = this.state;
        const { learningPaths, user } = this.props;
        const steps = mode => (
            <Timeline className="stepsTimeline" reverse={false} current={currentStep} mode={mode}>
                {
                    data.map((item, key) => {
                        const completed = completed_steps && completed_steps.includes(key);
                        const failed = failed_steps && failed_steps.includes(key);
                        if (currentStep > key) {
                            return (
                                <Item
                                    color={failed ? 'red' : 'green'}
                                    className="has-cursor step-item"
                                    dot={failed ? <Icon type="close" style={{ fontSize: '16px' }} />
                                        : completed ? <Icon type="check" style={{ fontSize: '16px' }} /> : ''}
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
                                    color="blue"
                                    className="has-cursor step-item"
                                    dot={failed ? <Icon type="close" style={{ fontSize: '16px' }} />
                                        : completed ? <Icon type="check" style={{ fontSize: '16px' }} /> : ''}
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
                                color={failed ? 'red' : completed ? 'green' : 'grey'}
                                className="has-cursor step-item"
                                dot={failed ? <Icon type="close" style={{ fontSize: '16px' }} />
                                    : completed ? <Icon type="check" style={{ fontSize: '16px' }} /> : ''}
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
                    data
                        ? (
                            <div className='chapters-container'>
                                <Row className="stepsRow">
                                    <div className="top-control">
                                        <ButtonGroup>
                                            <Button size="small" onClick={() => this.prev()} icon="left" disabled={currentStep < 1} />
                                            <Button size="small" onClick={() => this.next()} icon="right" disabled={currentStep === data.length - 1} />
                                        </ButtonGroup>
                                    </div>
                                    <Col span={5} className="stepsContainer">
                                        {steps('left')}
                                    </Col>
                                    <Col span={18} className="contentCol">
                                        <div className="steps-content">
                                            {
                                                data[currentStep] && data[currentStep].contentBlocks.map((item, key) => {
                                                    let image_2_url; let
                                                        learningPath = '';

                                                    if (item.type === 'Image2' && item.content.uuid) {
                                                        const content = this.props.steps_images.find(img => img.uuid === item.content.uuid);
                                                        if (content) {
                                                            image_2_url = content.image;
                                                        }
                                                    }

                                                    if (item.type === 'LearningPath') {
                                                        learningPath = learningPaths.find(el => el.id === item.content.id);
                                                    }

                                                    return (
                                                        <div
                                                            key={key}
                                                            className={item.type === 'Image' ? 'imageContainer' : ''}
                                                        >
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
                                                            {item.type === 'UploadImageByUser' && <UploadImageByUser demoMode />}
                                                            {item.type === 'DropdownHint' && (
                                                                <DropdownHint
                                                                    adminPreview
                                                                    getHintMessage={this.props.getHintMessage}
                                                                    content={item.content}
                                                                />
                                                            )}
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
                                            {currentStep === data.length - 1 && (
                                                <Button className="buttons">
                                                    Done
                                                </Button>
                                            )}
                                            {currentStep < data.length - 1 && (
                                                <Button onClick={() => this.next()} className="buttons">
                                                    Next
                                                </Button>
                                            )}
                                            {currentStep !== 0 && (
                                                <div className="stepsCount" data-id={currentStep}>
                                                    {currentStep + 1}
                                                    /
                                                    {data.length}
                                                </div>
                                            )}

                                            {currentStep > 0 && (
                                                <Button onClick={() => this.prev()} className="buttons previousButton">
                                                    Previous
                                                </Button>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        )
                        : 'Course chapters not found'
                }
            </>

        );
    }
}

export default PreviewSteps;
