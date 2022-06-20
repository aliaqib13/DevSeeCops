import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import {
    Collapse, Rate, Carousel, Icon, Button, Divider, message, Popover, Avatar, Tag, Result,
} from 'antd';
import { CATEGORIES } from '../../util/GAEventConstants';

import { getIntroductionModule, createActiveIntroductionCourse } from '../../store/actions/course';
import { getAuthUser } from '../../store/actions/auth';
import '../course-information/course-information.scss';
import HTMLSanitize from '../../components/HTMLSanitize/HTMLSanitize';

const { Panel } = Collapse;

const SlickButtonFix = ({
    currentSlide, slideCount, children, ...props
}) => (
    <span {...props}>{children}</span>
);

class CourseIntroduction extends Component {
    state = {
        loading: false,
        course: {},
        notFound: false,
    }

    componentDidMount() {
        const { user, history } = this.props;
        if (!user.roles.includes('administrator')) {
            history.push('/platform');
            return;
        }
        this.visitedTime = new Date().getTime();
        this.setState({
            loading: true,
        });
        this.handleData();
    }

    componentWillUnmount() {
        this.leftTime = new Date().getTime();
        const time = this.leftTime - this.visitedTime;
        ReactGA.pageview(window.location.pathname);
        ReactGA.timing({
            category: CATEGORIES.TIMING,
            variable: 'time',
            value: time, // in milliseconds
            label: 'CI Page',
        });
    }

    handleData = () => {
        this.setState({
            onUpdate: true,
        });
        const loader = message.loading('Loading..');
        loader();
        return this.getData().then(() => {
            this.setState({
                onUpdate: false,
            });
        });
    }

    getData = () => this.props.getIntroductionModule(this.props.match.params.id)
        .then(res => {
            if (res === true) {
                this.setState({
                    loading: false,
                    course: this.props.course,
                });
            } else {
                if (res.message === 'Course not found') {
                    this.setState({
                        notFound: true,
                    });
                }
                clearInterval(this.intervalForRequest);
                message.error(res.message);
            }
        });

    createActiveCourse = () => {
        const loader = message.loading('Loading..', 0);

        const course_id = this.props.course.id;
        this.props.createActiveIntroductionCourse(course_id).then(res => {
            if (res !== false) {
                message.success('Created');
                const viewed = localStorage.getItem('viewed-courses');
                const viewedCourses = viewed ? JSON.parse(viewed) : [];
                viewedCourses.push(course_id);
                localStorage.setItem('viewed-courses', JSON.stringify(viewedCourses));
                this.props.history.push(`/platform/tl/${res.id}`);
            } else {
                message.error('Something went wrong, please try again.');
            }

            loader();
        });
    }

    goToActiveCourse = id => {
        this.props.history.push(`/platform/tl/${id}`);
    }

    render() {
        const { course, loading, notFound } = this.state;
        const courseDuration = course.theory_duration ? +course.theory_duration.replace('m', '') : null;
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3, // need to specify comments length
            slidesToScroll: 1,
            arrows: true,
            className: 'quotes-carousel',
            swipeToSlide: true,
            swipe: true,
            nextArrow: <SlickButtonFix><Icon type="right-circle" /></SlickButtonFix>,
            prevArrow: <SlickButtonFix><Icon type="left-circle" /></SlickButtonFix>,
            responsive: [
                {
                    breakpoint: 1500,
                    settings: {
                        slidesToShow: 2, // need to specify comments length
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2, // need to specify comments length
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 690,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        };
        return (
            <>
                {course.id && !loading
                && (
                    <div className="course-information-container">
                        <div className="course-information-header">
                            <div className="title">{course.title}</div>
                            <div className="content">{course.content}</div>
                        </div>
                        <div className="course-information-body">
                            <div className="main">
                                <div className="video-container">
                                    <video controls className="video-player" onPlay={() => this.videoStart(course)}>
                                        <source src={course.preview_video} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>

                                <div className="course-information-meta-1">
                                    <div>
                                        <div className="title">{course.title}</div>
                                        <div className="version-rate-wrapper">
                                            <div className="version">{course.version}</div>
                                            <div className='rate-container'>
                                                <Rate
                                                    allowHalf
                                                    disabled
                                                    value={course.value_rating}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="course-information-meta-2">
                                    <div className="content">{course.content}</div>
                                    <div className="button-container">
                                        {
                                            (course.activeCourses && this.props.user.id === course.activeCourses.user_id)
                                                ? (
                                                    <Button
                                                        type='primary'
                                                        onClick={() => this.goToActiveCourse(course.activeCourses.id)}
                                                        className='proceed-button'
                                                    >
                                                        Go to introduction module
                                                    </Button>
                                                )
                                                : (
                                                    <Button
                                                        type='primary'
                                                        onClick={this.createActiveCourse}
                                                        className='proceed-button'
                                                    >
                                                        Proceed to introduction module
                                                    </Button>
                                                )
                                        }

                                    </div>
                                </div>

                                <div className="overview-include-container">
                                    <div className="overview">
                                        <div className="title">Introduction Module Overview</div>
                                        <div className="line">
                                            <div>Version date</div>
                                            <div>{course.version_date && moment(course.version_date).format('MMM Do YY')}</div>
                                        </div>
                                        <div className="line">
                                            <div>Number of ratings</div>
                                            <div>{course.number_of_ratings}</div>
                                        </div>
                                        <div className="line">
                                            <div>Difficulty rating</div>
                                            <div>
                                                <Rate
                                                    allowHalf
                                                    character={<Icon type="trophy" />}
                                                    disabled
                                                    value={course.difficulty}
                                                />
                                            </div>
                                        </div>
                                        <div className="line">
                                            <div>Enrolled students</div>
                                            <div>{course.enrolled_students}</div>
                                        </div>
                                    </div>
                                    <div className="include">
                                        <div className="title">What the introduction module includes</div>
                                        <ul className="include-list">
                                            <li>
                                                {(course.information && course.information.videos) ? course.information.videos : 0}
                                                {' '}
                                                videos
                                            </li>
                                            <li>
                                                {(course.information && course.information.quizzes) ? course.information.quizzes : 0}
                                                {' '}
                                                quiz
                                                questions
                                            </li>
                                            <li>
                                                {course.__meta__.labs_count}
                                                {' '}
                                                hands-on lab(s)
                                            </li>
                                            <li>
                                                {course.theory_duration}
                                                {' '}
                                                preparation lab time
                                            </li>
                                            <li>
                                                {course.available_time}
                                                {' '}
                                                hands-on lab time available
                                            </li>
                                            <li>
                                                DevSecOps 101 Certificate
                                            </li>

                                        </ul>
                                    </div>
                                </div>

                                <div className="paragraph">
                                    <div className="title">Introduction module Description</div>
                                    <div className="content">{course.description}</div>
                                </div>
                                <div className="paragraph">
                                    <div className="title">What you will learn</div>
                                    <div className="content">
                                        <ul className='whatYouWillLearn-list'>
                                            {
                                                (course.will_learn || []).map((item, key) => (
                                                    <li key={key}>
                                                        <Icon type="check-circle" />
                                                        {item}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="paragraph">
                                    <div className="title">Tools you will use in the hands-on lab</div>
                                    <div className="content">
                                        <ul className='toolsHands-On-lab-list'>
                                            {
                                                (course.tools_used || []).map((item, key) => (
                                                    <li key={key}>
                                                        <Icon type="check-circle" />
                                                        {item}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="paragraph">
                                    <div className="title tags-title">Learning Path tags</div>
                                    <div className="course-tags-list">
                                        {
                                            (course.courseTags || []).map((item, key) => (
                                                <Tag color="blue" key={key}>
                                                    <Icon type="tag" />
                                                    {item.title}
                                                </Tag>

                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="paragraph">
                                    <div className="title">Required experience</div>
                                    <div className="content">
                                        <HTMLSanitize content={course.required_exp} />
                                    </div>
                                </div>
                                <div className="paragraph">
                                    <div className="title">Who this introduction module is for</div>
                                    <div className="content">
                                        <ol className="whoThisCourseIsFor-list">
                                            {
                                                (course.course_is_for || []).map((item, key) => (
                                                    <li key={key}>{item}</li>
                                                ))
                                            }
                                        </ol>
                                    </div>
                                </div>
                                {course.preview_video2
                            && (
                                <div className="video-container">
                                    <video controls className="video-player" onPlay={() => this.videoStart(course)}>
                                        <source src={course.preview_video2} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            )}
                                <div className="paragraph">
                                    <div className="title">Frequently Asked Questions</div>
                                    <div className="content">
                                        <Collapse bordered={false} className="FAQ-collapse">
                                            {
                                                (course.faq || []).map((item, key) => (
                                                    <Panel header={item.question} key={key} className="FAQ-panel">
                                                        <p>{item.answer}</p>
                                                    </Panel>
                                                ))
                                            }
                                        </Collapse>
                                    </div>
                                </div>
                                <div className="paragraph">
                                    <div className="title">Latest rating quotes</div>
                                    <div className="content quotes">
                                        <Carousel {...settings}>
                                            {
                                                course.ratings.map((item, key) => (
                                                    <div className="quote-card" key={key}>
                                                        <Avatar src={item.image} size={60} />
                                                        {
                                                            item.author_name.length > 30
                                                                ? (
                                                                    <Popover content={item.author_name}>
                                                                        <div
                                                                            className="user-name"
                                                                        >
                                                                            {item.author_name.substring(0, 28)}
                                                                            ...
                                                                        </div>
                                                                    </Popover>
                                                                )
                                                                : <div className="user-name">{item.author_name}</div>
                                                        }
                                                        <Rate allowHalf disabled value={item.rate} />
                                                        <div className="comment-content">{item.text}</div>
                                                    </div>
                                                ))
                                            }
                                        </Carousel>
                                    </div>
                                </div>
                                <div className="paragraph">
                                    <div className="author-container">
                                        <img
                                            src={course.author_pic ? course.author_pic : '/img/user-default.png'}
                                            className="author-img"
                                            alt="author"
                                        />
                                        <div className="author-name">{course.author}</div>
                                        <div className="author-about">
                                            {course.author_bio ? course.author_bio : 'No bio available yet'}
                                        </div>
                                    </div>
                                    <div className="author-container">
                                        <img
                                            src={course.second_author_pic ? course.second_author_pic : '/img/user-default.png'}
                                            className="author-img"
                                            alt="author"
                                        />
                                        <div className="author-name">{course.second_author}</div>
                                        <div className="author-about">
                                            {course.second_author_bio ? course.second_author_bio : 'No bio available yet'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar">
                                {
                                    (course.activeCourses && this.props.user.id === course.activeCourses.user_id)
                                        ? (
                                            <Button
                                                type='primary'
                                                onClick={() => this.goToActiveCourse(course.activeCourses.id)}
                                                className='proceed-button'
                                            >
                                                Go to introduction module
                                            </Button>
                                        )
                                        : (
                                            <Button
                                                type='primary'
                                                onClick={this.createActiveCourse}
                                                className='proceed-button'
                                            >
                                                Proceed
                                                to introduction module
                                            </Button>
                                        )
                                }
                                <div className="course-overview-container">
                                    <div className="title">Introduction Module Overview</div>
                                    <div className="line">
                                        <div>Introduction module version</div>
                                        <div>{course.version}</div>
                                    </div>
                                    <div className="line">
                                        <div>Version date</div>
                                        <div>{course.version_date && moment(course.version_date).format('MMM Do YY')}</div>
                                    </div>
                                    <div className="line">
                                        <div>Value rating</div>
                                        <div><Rate allowHalf disabled value={course.value_rating} /></div>
                                    </div>
                                    <div className="line">
                                        <div>Number of ratings</div>
                                        <div>{course.number_of_ratings}</div>
                                    </div>
                                    <div className="line">
                                        <div>Difficulty rating</div>
                                        <div>
                                            <Rate
                                                allowHalf
                                                character={<Icon type="trophy" />}
                                                disabled
                                                value={course.difficulty}
                                            />
                                        </div>
                                    </div>
                                    <div className="line">
                                        <div>Enrolled students</div>
                                        <div>{course.enrolled_students}</div>
                                    </div>
                                    <div className="line">
                                        <div>Time to complete</div>
                                        <div>{`${courseDuration + parseInt(course.available_time)}m`}</div>
                                    </div>
                                </div>
                                <div className="include-container">
                                    <div className="title">What the introduction module includes</div>
                                    <ul className="include-list">
                                        <li>
                                            {(course.information && course.information.videos) ? course.information.videos : 0}
                                            {' '}
                                            videos
                                        </li>
                                        <li>
                                            {(course.information && course.information.quizzes) ? course.information.quizzes : 0}
                                            {' '}
                                            quiz
                                            questions
                                        </li>
                                        <li>
                                            {course.__meta__.labs_count}
                                            {' '}
                                            hands-on lab(s)
                                        </li>
                                        <li>
                                            {course.available_time}
                                            {' '}
                                            hands-on lab time available
                                        </li>
                                        <li className='hints_count'>
                                            DevSecOps 101 Certificate
                                        </li>
                                    </ul>
                                </div>
                                <div className="author-container">
                                    <img
                                        src={course.author_pic_url ? course.author_pic_url : '/img/user-default.png'}
                                        className="author-img"
                                        alt="author"
                                    />
                                    <div className="author-name">{course.author}</div>
                                    <div className="author-about">
                                        {course.author_bio ? course.author_bio : 'No bio available yet'}
                                    </div>
                                    <Divider />
                                    <a href={course.linkedIn_url} target='_blank' rel="noopener noreferrer">
                                        <Icon
                                            className="linkedin-icon"
                                            type="linkedin"
                                            theme="filled"
                                        />
                                    </a>
                                </div>
                                <hr />
                                {
                                    course.second_author
                                && (
                                    <div className="author-container">
                                        <img
                                            src={course.second_author_pic_url ? course.second_author_pic_url : '/img/user-default.png'}
                                            className="author-img"
                                            alt="author"
                                        />
                                        <div className="author-name">{course.second_author}</div>
                                        <div className="author-about">
                                            {course.second_author_bio ? course.second_author_bio : 'No bio available yet'}
                                        </div>
                                        <Divider />
                                        <a href={course.second_linkedIn_url} target='_blank' rel="noopener noreferrer">
                                            <Icon
                                                className="linkedin-icon"
                                                type="linkedin"
                                                theme="filled"
                                            />
                                        </a>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    </div>
                )}
                {
                    notFound
                    && (
                        <Result
                            status="404"
                            title="404"
                            subTitle="Sorry, the page you visited does not exist."
                            extra={(
                                <Link to="/platform">
                                    <Button type="primary">Back Home</Button>
                                    {' '}
                                </Link>
                            )}
                        />
                    )
                }
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        course: state.course,
        user: state.auth.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAuthUser: () => dispatch(getAuthUser()),
        getIntroductionModule: id => dispatch(getIntroductionModule(id)),
        createActiveIntroductionCourse: courseId => dispatch(createActiveIntroductionCourse(courseId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseIntroduction);
