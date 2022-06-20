/* eslint-disable max-lines */
import React, { Component } from 'react';
import moment from 'moment';
import {
    Collapse, Rate, Carousel, Icon, Button, Divider, message, Result, Popover, Avatar, Tag, Tooltip,
} from 'antd';
import ReactGA from 'react-ga';
import { NavLink, Link } from 'react-router-dom';
import { CATEGORIES, ACTIONS } from '../../util/GAEventConstants';
import Loading from '../../components/Loading/Loading';
import PaymentModal from '../../components/stripe';
import { CAMPAIGN_IDS, COURSE_STATUSES } from '../../constants';
import { addViewedCourse } from '../../util/utils';
import calculatePriceFromTokens from '../../util/calculatePriceFromTokens';
import TokensCount from '../../components/course-information/TokensCount/TokensCount';
import { TOKEN_EXCHANGE } from '../../util/constants';
import HTMLSanitize from '../../components/HTMLSanitize/HTMLSanitize';

import './course-information.scss';

const { Panel } = Collapse;

const SlickButtonFix = ({
    currentSlide, slideCount, children, ...props
}) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <span {...props}>{ children }</span>
);

class CourseExamInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            requestAccessLoading: false,
            requested: false,
            onUpdate: false,
            requestedFromTeam: false,
        };
    }

    componentDidMount() {
        this.visitedTime = new Date().getTime();
        this.setState({
            loading: true,
        });

        const { getUserSubscriptionsInformation, getCurrentTokenBalance } = this.props;

        return Promise.all([
            // Make API calls:
            this.handleData(),
            // Get user's token balance
            getCurrentTokenBalance(),
            // Get user subscription information
            getUserSubscriptionsInformation(),
        ]);
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
        return this.getData().then(() => this.setState({
            onUpdate: false,
        }));
    }

    getData = () => {
        const { isExam } = this.props;
        if (isExam) {
            return this.getExamData();
        }
        return this.getInfoData();
    }

    getInfoData = () => {
        const { getCourseById, getCampaign, match: { params: { id } } } = this.props;
        return Promise.all([
            getCourseById(id),
            getCampaign(CAMPAIGN_IDS.buyOneGetOneFree),
        ]).then(res => {
            if (res[0] !== true) {
                message.error(res[0].message);
            }
            return null;
        }).finally(() => {
            this.setState({
                loading: false,
            });
        });
    }

    getExamData = () => {
        const { getExamCourseById, match: { params: { id } } } = this.props;

        return getExamCourseById(id).then(res => {
            this.setState({
                loading: false,
            });
            if (res !== true) {
                message.destroy();
                clearInterval(this.intervalForRequest);
                message.error(res.message);
            }
            return true;
        }).catch(err => console.warn(err));
    }

    goToTheoryLab = () => {
        const { history, course: { activeCourses: { id } } } = this.props;
        history.push(`/platform/tl/${id}`);
    }

    createActiveCourse = () => {
        const { course: { id }, adminCreateActiveCourse, history } = this.props;
        const loader = message.loading('Loading..', 0);

        const courseId = id;
        adminCreateActiveCourse(courseId).then(res => {
            if (res !== false) {
                message.success('Created');
                addViewedCourse(courseId);
                history.push(`/platform/tl/${res.id}`);
            } else {
                message.error('Something went wrong, please try again.');
            }
            loader();
            return null;
        }).catch(err => console.warn(err));
    }

    createActiveCourseFreeAccess = fromSubscription => {
        const {
            course: { id }, createActiveCourse, getAuthUser, history,
        } = this.props;
        const loader = message.loading('Loading..', 0);

        const courseId = id;
        createActiveCourse(courseId, fromSubscription).then(res => {
            if (res !== false) {
                message.success('Created');
                getAuthUser();
                addViewedCourse(courseId);
                history.push(`/platform/tl/${res.id}`);
            } else {
                message.error('Something went wrong, please try again.');
            }
            return loader();
        }).catch(err => console.warn(err));
    }

    requestAccess = () => {
        const { course, courseAccessRequest, match: { params: { id } } } = this.props;
        this.setState({ requestAccessLoading: true });
        ReactGA.event({
            category: CATEGORIES.REQUEST_COURSE_ACCESS,
            action: ACTIONS.REQUEST_ACCESS_FOR_COURSE(course.title),
            label: 'Request Course Access',
        });
        courseAccessRequest(id).then(res => {
            this.setState({ requestAccessLoading: false });
            if (res.status === 200) {
                message.success('Request successfully received!');
                this.setState({ requested: true });
            } else {
                message.error(res.message);
            }
            return null;
        }).catch(err => console.warn(err));
    }

    videoStart = course => {
        ReactGA.event({
            category: CATEGORIES.PREVIEW_VIDEO,
            action: ACTIONS.PREVIEW_VIDEO_OF_COURSE_STARTED(course.title),
            label: 'Preview Video',
        });
    }

    navigateToSubscriptions = () => {
        const { history } = this.props;
        history.push('/platform/choose-subscription');
    }

    navigateToIntroductionCourses = () => {
        const { history } = this.props;
        history.push('/platform/academy-tour');
    }

    handleRequestFromTeam = (courseId, teamId) => {
        const { requestedFromTeam } = this.state;
        const { requestCourseFromTeam } = this.props;
        if (requestedFromTeam) {
            return null;
        }
        this.setState({ requestedFromTeam: true });
        return requestCourseFromTeam(courseId, teamId);
    }

    // TODO: Update the button with request info https://araido.atlassian.net/browse/ATP-2321
    // TODO: https://araido.atlassian.net/browse/ATP-2391
    // One should not be able to make the request for the same course twice
    getRequestFromTeamButton = () => {
        const {
            user,
            course: { id: courseId },
        } = this.props;
        const { requestedFromTeam } = this.state;
        if (user.teams && user.teams.length > 0) {
            return (
                <Button
                    type='primary'
                    onClick={() => this.handleRequestFromTeam(courseId, user.teams[0].id)}
                    disabled={requestedFromTeam}
                    className={`request-team-button ${requestedFromTeam && 'request-team-button-disabled'}`}
                >
                    Request from team
                </Button>
            );
        }
        return null;
    }

    getGoToCourseButton = props => {
        const {
            requestAccessLoading, requested, onUpdate,
        } = this.state;
        const {
            user, course, tokenBalance,
        } = this.props;

        const calculatedPriceUsd = calculatePriceFromTokens(course.token_cost || 0, TOKEN_EXCHANGE.USD);
        const calculatedPriceEuro = calculatePriceFromTokens(course.token_cost || 0, TOKEN_EXCHANGE.EUR);

        const amountTokensToDeductFromWallet = Math.min(tokenBalance, course.token_cost);

        const totalRemainingAmountInUsd = calculatedPriceUsd - calculatePriceFromTokens(
            amountTokensToDeductFromWallet, TOKEN_EXCHANGE.USD,
        );
        const totalRemainingAmountInEuro = calculatedPriceEuro - calculatePriceFromTokens(
            amountTokensToDeductFromWallet, TOKEN_EXCHANGE.EUR,
        );

        const calculatedPrice = { calculatedPriceUsd, calculatedPriceEuro };
        const totalRemainingAmount = { totalRemainingAmountInUsd, totalRemainingAmountInEuro };

        const betaTester = user.roles.findIndex(role => role === 'beta_tester') !== -1;

        // If Loading:
        if (onUpdate) {
            return <Button type='primary' loading disabled className='proceed-button'>Checking status</Button>;
        }

        // Coming Soon button
        if (
            props.publicly_visible // Course is publicly visible
            && !props.active // BUT course not active
            && !props.isAdmin // AND not an Admin
        ) {
            return <Button type='primary' disabled className='proceed-button'>Coming Soon</Button>;
        }

        // IF the user has an active course:
        if (props.hasActiveCourse) {
            return <Button type='primary' onClick={this.goToTheoryLab} className='proceed-button'>Go to course</Button>;
        }

        if (props.isAdmin || betaTester) {
            return <Button type='primary' onClick={this.createActiveCourse} className='proceed-button'>Proceed to course</Button>;
        }

        if (props.isFree) {
            return <Button type='primary' onClick={() => this.createActiveCourseFreeAccess(false)} className='proceed-button'>Free Access</Button>;
        }

        if (
            (
                !process.env.REACT_APP_DISABLE_SUBSCRIPTIONS
                && !process.env.REACT_APP_REMOVE_INDIVIDUAL_COURSE_PURCHASE_DISABLED
            ) // If subscriptions are disabled, don't show this
            && (!tokenBalance || tokenBalance === 0) // User has no tokens in their wallet
            && (!user.userSubscription || Object.keys(user.userSubscription).length === 0) // user does not have a subscription
            && (!user.teams || user.teams.length < 1)) { // or is not part of a team
            return (
                <div className="subscription-inform-bar">
                    <span>
                        Before you can purchase a course, you need to have a token balance or an active
                        {' '}
                        <Button className="subscription-inform-buttons" type="link" onClick={this.navigateToSubscriptions}>Subscription.</Button>
                    </span>
                    <span>
                        You can also check
                        {' '}
                        <Button className="subscription-inform-buttons" type="link" onClick={this.navigateToIntroductionCourses}>free introduction courses</Button>

                    </span>
                </div>
            );
        }

        if (!props.request) {
            if (requested) {
                return <Button disabled type="primary" className='proceed-link'>Already requested</Button>;
            }
            if (course.access_request) {
                return <Button loading={requestAccessLoading} onClick={this.requestAccess} type="primary" className='proceed-link'>Request Access</Button>;
            }
            return (
                <PaymentModal
                    calculatedPrice={calculatedPrice}
                    totalRemainingAmount={totalRemainingAmount}
                    amountTokensToDeductFromWallet={amountTokensToDeductFromWallet}
                />
            );
        }

        if (props.request) {
            if (props.request.status === 'accepted') {
                return (
                    <PaymentModal
                        calculatedPrice={calculatedPrice}
                        totalRemainingAmount={totalRemainingAmount}
                        amountTokensToDeductFromWallet={amountTokensToDeductFromWallet}
                    />
                );
            }
            return <Button disabled type="primary" className='proceed-link'>Already requested</Button>;
        }
        return <Button onClick={this.requestAccess} type="primary" className='proceed-link'>Request Access</Button>;
    };

    render() {
        const { loading } = this.state;
        const {
            user, course, isExam,
        } = this.props;

        if (loading) {
            return <Loading />;
        }

        const calculatedPriceUsd = calculatePriceFromTokens(course.token_cost || 0, TOKEN_EXCHANGE.USD);
        const courseDuration = course.theory_duration ? +course.theory_duration.replace('m', '') : null;
        const isAdmin = user.roles.findIndex(role => role === 'administrator') !== -1;
        const betaTester = user.roles.findIndex(role => role === 'beta_tester') !== -1;

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

        return (
            <>
                {course.id
                    ? (
                        <div className="course-information-container">
                            <div className="course-information-header">
                                <div className="title">{course.title}</div>
                                <div className="content">{course.content}</div>
                            </div>
                            <div className="course-information-body">
                                <div className="main">
                                    <div className="video-container">
                                        <video controls className="video-player" onPlay={() => this.videoStart(course)}>
                                            <track default kind="captions" />
                                            <source src={course.preview_video} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>

                                    <div className="course-information-meta-1">
                                        <div>
                                            <div className="title">{course.title}</div>
                                            <div className="version-rate-wrapper">
                                                <div className="version">{course.version}</div>
                                                <div className='rate-container'><Rate allowHalf disabled value={course.value_rating} /></div>
                                            </div>
                                        </div>
                                        <div className="price">
                                            $
                                            {calculatedPriceUsd}
                                            <TokensCount tokenCost={course.token_cost} />
                                        </div>
                                    </div>
                                    <div className="course-information-meta-2">
                                        <div className="content">{course.content}</div>
                                        <div className="button-container">
                                            {this.getGoToCourseButton({
                                                hasActiveCourse: Boolean(course.activeCourses),
                                                publicly_visible: course.publicly_visible,
                                                active: course.status === COURSE_STATUSES.PRODUCTION,
                                                isAdmin,
                                                isFree: Boolean(course.free_access),
                                                betaTester,
                                                request: course.request,
                                            })}
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
                                        <div className="include">
                                            <div className="title">The course includes:</div>
                                            <ul className="include-list">
                                                <li>
                                                    {`${(course.information && course.information.steps) ? course.information.steps : 0} preparation lab steps`}
                                                </li>
                                                <li>
                                                    {`${
                                                        (course.information && course.information.videos)
                                                            ? course.information.videos
                                                            : 0
                                                    } videos`}
                                                </li>
                                                {
                                                    !isExam && (
                                                        <li>
                                                            {`${
                                                                (course.information && course.information.quizzes)
                                                                    ? course.information.quizzes
                                                                    : 0
                                                            } quiz questions`}
                                                        </li>
                                                    )
                                                }
                                                <li>
                                                    {`${course.__meta__.labs_count} hands-on lab(s)`}
                                                </li>
                                                <li>
                                                    {`${course.theory_duration} preparation lab time`}
                                                </li>
                                                <li>
                                                    {`${course.available_time} hands-on lab time available`}
                                                </li>
                                                {
                                                    !isExam && (
                                                        <li>{`${course.hints_count} hint(s) limit at the advanced level`}</li>
                                                    )
                                                }
                                                {
                                                    !isExam && <li>Advanced & Medior level available</li>
                                                }
                                                {course.certificate_of_completion ? <li>Certificate of Completion</li> : ''}
                                                {course.lab_steps_in_personal_archive ? <li>Lab steps in personal archive</li> : ''}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="paragraph">
                                        <div className="title">{ isExam ? 'Exam Course Description' : 'Course Description '}</div>
                                        <div className="content">{course.description}</div>
                                    </div>
                                    <div className="paragraph">
                                        <div className="title">{isExam ? 'What you will be challenged on' : 'What you will learn' }</div>
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
                                    {course.preview_video2
                                    && (
                                        <div className="video-container">
                                            <video controls className="video-player" onPlay={() => this.videoStart(course)}>
                                                <track default kind="captions" />
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
                                            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
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
                                            <img src={course.author_pic_url ? course.author_pic_url : '/img/user-default.png'} className="author-img" alt="author" />
                                            <div className="author-name">{course.author}</div>
                                            <div className="author-about">
                                                {course.author_bio ? course.author_bio : 'No bio available yet'}
                                            </div>
                                        </div>
                                        <div className="author-container">
                                            <img src={course.second_author_pic_url ? course.second_author_pic_url : '/img/user-default.png'} className="author-img" alt="author" />
                                            <div className="author-name">{course.second_author}</div>
                                            <div className="author-about">
                                                {course.second_author_bio ? course.second_author_bio : 'No bio available yet'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sidebar">
                                    {this.getRequestFromTeamButton()}
                                    {this.getGoToCourseButton({
                                        hasActiveCourse: Boolean(course.activeCourses),
                                        publicly_visible: course.publicly_visible,
                                        active: course.status === COURSE_STATUSES.PRODUCTION,
                                        isAdmin,
                                        isFree: Boolean(course.free_access),
                                        request: course.request,
                                    })}
                                    {(isAdmin || course.isAuthor)
                                    && (
                                        <div style={{ textAlign: 'center' }}>
                                            <Tooltip title="Edit Course">
                                                <NavLink to={`/platform/admin/edit-course/${course.id}`}>
                                                    <Button className="edit-course-bnt" name="edit-course" shape="circle" icon="edit" />
                                                </NavLink>
                                            </Tooltip>
                                        </div>
                                    )}
                                    <div className="course-overview-container">
                                        <div className="title">Course Overview</div>
                                        {!course.free_access ? (
                                            <div className="line">
                                                <div>Course price</div>
                                                <div className="price">
                                                    $
                                                    {calculatedPriceUsd}
                                                    <TokensCount tokenCost={course.token_cost} />
                                                </div>
                                            </div>
                                        ) : ''}
                                        <div className="line">
                                            <div>{ isExam ? 'Exam version' : 'Course version' }</div>
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
                                            <div>
                                                {`${courseDuration + parseInt(course.available_time)}m`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="include-container">
                                        <div className="title">The course includes:</div>
                                        <ul className="include-list">
                                            <li>

                                                {`${(course.information && course.information.steps) ? course.information.steps : 0} preparation lab steps`}

                                            </li>
                                            <li>
                                                {`${
                                                    (course.information && course.information.videos)
                                                        ? course.information.videos
                                                        : 0
                                                } videos`}
                                            </li>
                                            {
                                                !isExam && (
                                                    <li>
                                                        {`${
                                                            (course.information && course.information.quizzes)
                                                                ? course.information.quizzes
                                                                : 0
                                                        } quiz questions`}
                                                    </li>
                                                )
                                            }
                                            <li>
                                                {`${course.__meta__.labs_count} hands-on lab(s)`}
                                            </li>
                                            <li>
                                                {`${course.available_time} hands-on lab time available`}
                                            </li>
                                            {
                                                !isExam && (
                                                    <li className='hints_count'>
                                                        {`${course.hints_count} hint(s) limit at the advanced level`}
                                                    </li>
                                                )
                                            }
                                            {
                                                !isExam && <li>Advanced & Medior level available</li>
                                            }
                                            {course.certificate_of_completion ? <li className='certificate_of_completion'>Certificate of Completion</li> : ''}
                                            {course.lab_steps_in_personal_archive ? <li className='lab_steps_in_personal_archive'>Lab steps in personal archive</li> : ''}
                                        </ul>
                                    </div>
                                    <div className="author-container">
                                        <img src={course.author_pic_url ? course.author_pic_url : '/img/user-default.png'} className="author-img" alt="author" />
                                        <div className="author-name">{course.author}</div>
                                        <div className="author-about">
                                            {course.author_bio ? course.author_bio : 'No bio available yet'}
                                        </div>
                                        <Divider />
                                        <a href={course.linkedIn_url} label='linkedIn-url' target='_blank' rel="noopener noreferrer"><Icon className="linkedin-icon" type="linkedin" theme="filled" /></a>
                                    </div>
                                    <hr />
                                    {
                                        course.second_author
                                    && (
                                        <div className="author-container">
                                            <img src={course.second_author_pic_url ? course.second_author_pic_url : '/img/user-default.png'} className="author-img" alt="author" />
                                            <div className="author-name">{course.second_author}</div>
                                            <div className="author-about">
                                                {course.second_author_bio ? course.second_author_bio : 'No bio available yet'}
                                            </div>
                                            <Divider />
                                            <a href={course.second_linkedIn_url} label='linkedIn-url' target='_blank' rel="noopener noreferrer"><Icon className="linkedin-icon" type="linkedin" theme="filled" /></a>
                                        </div>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                    : (
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
                    )}
            </>

        );
    }
}

export default CourseExamInformation;
