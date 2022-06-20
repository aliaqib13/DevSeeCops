import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    Collapse, Rate, Carousel, Icon, Button, Divider, message, Empty, Popover, Avatar, Tag,
} from 'antd';
import { getPublicCourseById } from '../../../store/actions/public/courses';
import Loading from '../../../components/Loading/Loading';
import './course-information.scss';
import { COURSE_STATUSES, COURSE_TYPE } from '../../../constants';
import { TOKEN_EXCHANGE } from '../../../util/constants';
import calculatePriceFromTokens from '../../../util/calculatePriceFromTokens';
import TokensCount from '../../../components/course-information/TokensCount/TokensCount';
import HTMLSanitize from '../../../components/HTMLSanitize/HTMLSanitize';

const { Panel } = Collapse;

const SlickButtonFix = ({
    currentSlide, slideCount, children, ...props
}) => (
    <span {...props}>{children}</span>
);

class CourseInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            course: {},
        };
    }

    componentDidMount() {
        const { getCourseById, match: { params } } = this.props;
        this.setState({
            loading: true,
        });

        const loader = message.loading('Loading..');
        getCourseById(params.id, COURSE_TYPE.STANDARD).then(res => {
            loader();
            this.setState({
                loading: false,
            });
            if (res !== true) {
                message.error(res.message);
            }
        });
    }

    goToLogin = () => {
        const { history } = this.props;

        history.push('/login');
    }

    render() {
        const { loading } = this.state;
        if (loading) {
            return <Loading />;
        }

        const { course } = this.props;

        const calculatedPrice = calculatePriceFromTokens(course.token_cost || 0, TOKEN_EXCHANGE.USD);

        // comments section carousel settings
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
        const courseDuration = course.theory_duration ? +course.theory_duration.replace('m', '') : null;
        const availableTime = (course.labs && course.labs.length) ? +course.labs[0].available_time.replace('m', '') : null;
        return (
            <>
                {course.id
                    ? (
                        <div className="course-information-container">
                            <div className="course-information-header">
                                <div className="title">{course.title}</div>
                                {/* TODO: Get from DB */}
                                {/* <div className="platform">Platform Java & AWS</div> */}
                                <div className="content">{course.content}</div>
                            </div>
                            <div className="course-information-body">
                                <div className="main">
                                    <div className="video-container">
                                        <video controls className="video-player">
                                            <source src={course.preview_video} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>

                                    <div className="course-information-meta-1">
                                        <div>
                                            <div className="title">{course.title}</div>
                                            {/* TODO: Get from DB */}
                                            {/* <div className="platform">Platform Java & AWS</div> */}
                                            <div className="version-rate-wrapper">
                                                <div className="version">{course.version}</div>
                                                <div className='rate-container'><Rate allowHalf disabled value={course.value_rating} /></div>
                                            </div>
                                        </div>
                                        <div className="price">
                                            $
                                            {calculatedPrice}
                                            <TokensCount tokenCost={course.token_cost} />

                                        </div>
                                    </div>
                                    <div className="course-information-meta-2">
                                        <div className="content">{course.content}</div>
                                        <div className="button-container">
                                            {course.status === COURSE_STATUSES.PRODUCTION
                                                ? <Button type='primary' onClick={this.goToLogin} className='proceed-button'>Login to continue</Button>
                                                : <Button type='primary' disabled className='proceed-button'>Coming Soon</Button>}
                                        </div>
                                    </div>

                                    <div className="overview-include-container">
                                        <div className="overview">
                                            <div className="title">Course Overview</div>
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
                                                <div><Rate allowHalf character={<Icon type="trophy" />} disabled value={course.difficulty} /></div>
                                            </div>
                                            <div className="line">
                                                <div>Enrolled students</div>
                                                <div>{course.enrolled_students}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="paragraph">
                                        <div className="title">Course Description</div>
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
                                        <div className="title">Learning Path tags</div>
                                        {
                                            (course.courseTags || []).map((item, key) => (
                                                <Tag color="blue" key={key}>
                                                    <Icon type="tag" />
                                                    {item.title}
                                                </Tag>
                                            ))
                                        }
                                    </div>
                                    <div className="paragraph">
                                        <div className="title">Required experience</div>
                                        <div className="content"><HTMLSanitize content={course.required_exp} /></div>
                                    </div>
                                    <div className="paragraph">
                                        <div className="title">Who this course is for</div>
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
                                                                            <div className="user-name">
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
                                            <img src={course.author_pic ? course.author_pic : '/img/user-default.png'} className="author-img" alt="author" />
                                            <div className="author-name">{course.author}</div>
                                            <div className="author-about">
                                                {course.author_bio ? course.author_bio : 'No bio available yet'}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="author-container">
                                            <img src={course.second_author_pic ? course.second_author_pic : '/img/user-default.png'} className="author-img" alt="author" />
                                            <div className="author-name">{course.second_author}</div>
                                            <div className="author-about">
                                                {course.second_author_bio ? course.second_author_bio : 'No bio available yet'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sidebar">
                                    {course.status === COURSE_STATUSES.PRODUCTION
                                        ? <Button type='primary' onClick={this.goToLogin} className='proceed-button'>Login to continue</Button>
                                        : <Button type='primary' disabled className='proceed-button'>Coming Soon</Button>}
                                    <div className="course-overview-container">
                                        <div className="title">Course Overview</div>
                                        {!course.free_access ? (
                                            <div className="line">
                                                <div>Course price</div>
                                                <div className="price">
                                                    $
                                                    {calculatedPrice}
                                                    <TokensCount tokenCost={course.token_cost} />

                                                </div>
                                            </div>
                                        ) : ''}
                                        <div className="line">
                                            <div>Course version</div>
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
                                            <div><Rate allowHalf character={<Icon type="trophy" />} disabled value={course.difficulty} /></div>
                                        </div>
                                        <div className="line">
                                            <div>Enrolled students</div>
                                            <div>{course.enrolled_students}</div>
                                        </div>
                                        <div className="line">
                                            <div>Time to complete</div>
                                            <div>{`${courseDuration + availableTime}m`}</div>
                                        </div>
                                    </div>
                                    <div className="include-container">
                                        <div className="title">The course includes:</div>
                                        <ul className="include-list">
                                            <li>
                                                {(course.information && course.information.steps)
                                                    ? course.information.steps : 0}
                                                {' '}
                                                preparation lab steps
                                            </li>
                                            <li>
                                                {(course.information && course.information.videos)
                                                    ? course.information.videos : 0}
                                                {' '}
                                                videos
                                            </li>
                                            <li>
                                                {(course.information && course.information.quizzes)
                                                    ? course.information.quizzes : 0}
                                                {' '}
                                                quiz questions
                                            </li>
                                            {/* <li> */}
                                            {/*    {course.theory_duration} preparation lab time */}
                                            {/* </li> */}
                                            <li>
                                                {(course.labs && course.labs.length)
                                                    ? course.labs[0].available_time : 0}
                                                {' '}
                                                hands-on lab time available
                                            </li>
                                            <li>
                                                {course.hints_count}
                                                {' '}
                                                hint(s) limit at the advanced level
                                            </li>
                                            <li>Advanced & Medior level available</li>
                                            {course.certificate_of_completion ? <li>Certificate of Completion</li> : ''}
                                            {course.lab_steps_in_personal_archive ? <li>Lab steps in personal archive</li> : ''}
                                        </ul>
                                    </div>
                                    <div className="author-container">
                                        <img src={course.author_pic ? course.author_pic : '/img/user-default.png'} className="author-img" alt="author" />
                                        <div className="author-name">{course.author}</div>
                                        <div className="author-about">
                                            {course.author_bio ? course.author_bio : 'No bio available yet'}
                                        </div>
                                        <Divider />
                                        <a href={course.linkedIn_url} target='_blank' rel="noopener noreferrer"><Icon className="linkedin-icon" type="linkedin" theme="filled" /></a>
                                    </div>
                                    <hr />
                                    {
                                        course.second_author
                                    && (
                                        <div className="author-container">
                                            <img src={course.second_author_pic ? course.second_author_pic : '/img/user-default.png'} className="author-img" alt="author" />
                                            <div className="author-name">{course.second_author}</div>
                                            <div className="author-about">
                                                {course.second_author_bio ? course.second_author_bio : 'No bio available yet'}
                                            </div>
                                            <Divider />
                                            <a href={course.second_linkedIn_url} target='_blank' rel="noopener noreferrer"><Icon className="linkedin-icon" type="linkedin" theme="filled" /></a>
                                        </div>
                                    )
                                    }

                                </div>
                            </div>
                        </div>
                    )
                    : <Empty description={<span>Course not found!</span>} />}
            </>

        );
    }
}

function mapStateToProps(state) {
    return {
        course: state.publicCourses,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCourseById: (id, type) => dispatch(getPublicCourseById(id, type)),
    };
}

export { CourseInformation };
export default connect(mapStateToProps, mapDispatchToProps)(CourseInformation);
