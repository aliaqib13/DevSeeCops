import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    List, Card, Row, Typography, Input, message, Select, Button, Icon, Tooltip,
} from 'antd';
import { fetchCourses } from '../../store/actions/courses';
import { getUserSubscriptionsInformation } from '../../store/actions/tokenSubscriptions';
import { getCurrentTokenBalance } from '../../store/actions/tokenWallet';

import './courses.scss';
import Loading from '../../components/Loading/Loading';
import { COURSE_TYPE, COURSE_STATUSES } from '../../constants';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

class Courses extends Component {
    constructor(props) {
        super(props);
        this.loader = null;
        this.state = {
            perPage: 8,
            categories: [],
            category: '',
            keyword: '',
            loading: false,
            currentPage: 1,
            total: 2,
            hideSubscriptionInfoBar: false,
        };
    }

    componentDidMount() {
        const {
            category, keyword, currentPage,
        } = this.state;

        const {
            fetchCourses, getUserSubscriptionsInformation, getCurrentTokenBalance,
        } = this.props;

        window.addEventListener('resize', this.resizeEventListener);

        this.setState({ loading: true });

        const hideSubscriptionRequiredBar = localStorage.getItem('hideSubscriptionRequiredBar');
        if (hideSubscriptionRequiredBar) {
            this.setState({ hideSubscriptionInfoBar: true });
        }
        return Promise.all([
            // Get courses information
            fetchCourses(category, keyword, currentPage, this.__resizeWindow())
                .then(courses => {
                    this.setState({ total: courses.total, perPage: courses.perPage });
                }).finally(() => {
                    this.setState({ loading: false });
                }),
            // Get user's token balance
            getCurrentTokenBalance(),
            // Get user subscription information
            getUserSubscriptionsInformation(),
        ]);
    }

    resizeEventListener = () => {
        const { category, keyword } = this.state;
        const perPage = this.__resizeWindow();
        if (perPage !== this.state.perPage) {
            this.setState({
                loading: true,
                perPage,
            });
            this.props.fetchCourses(category, keyword, 1, perPage).finally(() => {
                this.setState({ loading: false });
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeEventListener);
    }

    __resizeWindow() {
        const windowWidth = window.innerWidth;
        let perPage = 8;
        if (windowWidth > 1439) {
            perPage = 8;
        } else if (windowWidth <= 1439 && windowWidth > 1131) {
            perPage = 6;
        } else if (windowWidth <= 1131 && windowWidth > 855) {
            perPage = 4;
        } else if (windowWidth <= 855) {
            perPage = 2;
        }
        return perPage;
    }

    onClickHandler = (e, course_id, active, active_course_id, roles, user_id, authors, publicly_visible, course_type) => {
        let info_path;
        if (e.target.dataset && e.target.dataset.icon === 'file-done') {
            return;
        }
        if (course_type === COURSE_TYPE.EXAM) {
            info_path = `/platform/professional-exam/${course_id}`;
        } else if (course_type === COURSE_TYPE.INTRODUCTION) {
            info_path = `/platform/introduction-module/${course_id}`;
        } else {
            info_path = `/platform/course-information/${course_id}`;
        }
        switch (e.target.name) {
        case 'edit-course':
            this.props.history.push(`/platform/admin/edit-course/${course_id}`);
            break;
        case 'course-info':
            this.props.history.push(info_path);
            break;
        default:
            if (!active && !publicly_visible && (roles.indexOf('administrator') === -1) && this.checkAuthors(authors, user_id)) {
                message.info('Course will be available soon.');
                return;
            }
            if (active_course_id) {
                const { history } = this.props;
                const viewed = localStorage.getItem('viewed-courses');
                if (!viewed) {
                    const viewedCourses = [course_id];
                    localStorage.setItem('viewed-courses', JSON.stringify(viewedCourses));
                    history.push(info_path);
                } else {
                    const viewedCourses = JSON.parse(viewed);
                    const viewedCourse = viewedCourses.find(item => item === course_id);
                    if (!viewedCourse) {
                        viewedCourses.push(course_id);
                        localStorage.setItem('viewed-courses', JSON.stringify(viewedCourses));
                        history.push(info_path);
                    } else {
                        history.push(`/platform/tl/${active_course_id}`);
                    }
                }
            } else {
                this.props.history.push(info_path);
            }
        }
    };

    selectHandleChange = value => {
        const { fetchCourses } = this.props;
        this.setState({
            category: value,
        },
        () => fetchCourses(value, this.state.keyword)
            .then(courses => {
                this.setState({
                    total: courses.total,
                });
            })
            .catch(err => console.warn('Something went wrong getting courses: ', err)));
    }

    handleChange(value) {
        const { category, perPage } = this.state;
        this.setState({
            keyword: value,
            currentPage: 1,

        });
        this.props.fetchCourses(category, value, 1, perPage);
    }

    paginate = page => {
        const { category, keyword, perPage } = this.state;
        if (perPage !== this.__resizeWindow()) {
            this.setState({ perPage: this.__resizeWindow() });
        }
        this.setState({
            currentPage: page,
        });

        this.props.fetchCourses(category, keyword, page, this.__resizeWindow());
    }

    checkAuthors = (authors, user_id) => {
        if (!authors.length) {
            return true;
        }
        for (let i = 0; i < authors.length; i++) {
            if (authors[i].id === user_id) {
                return false;
            }
        }
        return true;
    }

    subscriptionInfoBar = () => {
        const {
            auth: { user }, tokenBalance,
        } = this.props;

        if (
            (!process.env.REACT_APP_DISABLE_SUBSCRIPTIONS && !process.env.REACT_APP_REMOVE_INDIVIDUAL_COURSE_PURCHASE_DISABLED) // If subscriptions are disabled, don't show this
            && (!user.userSubscription || Object.keys(user.userSubscription).length === 0) // user does not have a subscript
            && (!tokenBalance || tokenBalance === 0) // User has no tokens in their wallet
            && (!user.teams || user.teams.length < 1)) // User not part of a team
        {
            return (
                <div className="subscription-inform-bar">
                    <span>
                        As you have no subscriptions and no tokens, you will be unable to purchase a course.
                        <br />
                        Click the button to find out what subscriptions
                        are available.
                    </span>
                    <Button className="to-subscription-options" type="primary" onClick={this.navigateToSubscriptions}>View subscription options</Button>
                    <Button className="cross" type="default" onClick={this.closeSubscriptionInfoBar}>&#x2715;</Button>
                </div>
            );
        }
        // If we're not showing it, return null
        return null;
    }

    closeSubscriptionInfoBar = () => {
        localStorage.setItem('hideSubscriptionRequiredBar', 'true');
        this.setState({ hideSubscriptionInfoBar: true });
    }

    navigateToSubscriptions = () => {
        const { history } = this.props;
        history.push('/platform/choose-subscription');
    }

    render() {
        const { auth: { user }, courses } = this.props;
        const { categories } = courses;
        const {
            loading, perPage, total, currentPage, hideSubscriptionInfoBar,
        } = this.state;

        const { roles } = user;

        return (
            <div className="coursesContainer">
                <div className="course-search">
                    <Title level={4}>Courses</Title>

                    <Search
                        placeholder="Search"
                        onSearch={value => this.handleChange(value)}
                        className="searchContainer"
                    />
                    <Select
                        defaultValue="Category"
                        style={{ width: 190 }}
                        onChange={this.selectHandleChange}
                        className="filterSelect"
                    >
                        <Option value={null}>All categories</Option>
                        {
                            categories.map((item, key) => <Option value={item.id} key={key}>{item.name}</Option>)
                        }
                    </Select>
                </div>
                {/* TODO: Update when https://araido.atlassian.net/browse/ATP-2262 has a FAQ created */}
                {!hideSubscriptionInfoBar && this.subscriptionInfoBar()}

                {!loading
                    ? (
                        <List
                            grid={{ gutter: 16, column: 4 }}
                            className="antList"
                            dataSource={courses.data.data}
                            pagination={{
                                onChange: this.paginate,
                                pageSize: perPage,
                                position: 'both',
                                total,
                                defaultCurrent: 1,
                                current: currentPage,
                            }}
                            renderItem={item => {
                                const courseDuration = item.theory_duration ? +item.theory_duration.replace('m', '') : null;
                                const availableTime = (item.labs && item.labs.length && item.labs[0].available_time) ? +item.labs[0].available_time.replace('m', '') : null;
                                return (
                                    <List.Item className="courses-item">
                                        <Card
                                            className="courses-card"
                                            cover={(
                                                <div>

                                                    {(
                                                        item.status !== COURSE_STATUSES.PRODUCTION // not in production
                                                        && !item.publicly_visible // AND set as not visible
                                                        && (roles.indexOf('administrator') === -1) // AND current user isn't admin
                                                        && this.checkAuthors(item.authors, user.id))
                                                        && (
                                                            <div className="comingSoon">
                                                                <Title level={2}>
                                                                    Coming Soon
                                                                </Title>
                                                            </div>
                                                        )}
                                                    <div className="coursesImageDiv" style={{ background: `url(${item.image})` }} />
                                                </div>
                                            )}
                                            extra={(
                                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                    <Tooltip mouseEnterDelay={0.5} title="Value rating">
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <img src="/img/star.svg" alt="star" />
                                                            <div className="value-rating" style={{ marginLeft: '8px', fontWeight: '600' }}>{item.value_rating || 0}</div>
                                                        </div>
                                                    </Tooltip>

                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                                        {item.type === COURSE_TYPE.EXAM
                                                && <Tooltip mouseEnterDelay={0.5} title="Professional Exam"><Icon type="file-done" className="course-type-icon" /></Tooltip>}
                                                        {
                                                            item.activeCourses
                                                                ? (
                                                                    <>
                                                                        <Tooltip mouseEnterDelay={0.5} title="Enter the course information page"><Button type="primary" name="course-info" shape="circle" icon="info" /></Tooltip>
                                                                        <Tooltip mouseEnterDelay={0.5} title="You have access to this course"><span style={{ fontSize: '24px', marginLeft: '5px', marginTop: '-3px' }}><Icon type="unlock" theme="twoTone" /></span></Tooltip>
                                                                    </>
                                                                )
                                                                : <><Tooltip mouseEnterDelay={0.5} title={'You don\'t have access yet to this course'}><span style={{ fontSize: '24px', marginLeft: '5px' }}><Icon type="lock" theme="twoTone" /></span></Tooltip></>
                                                        }
                                                    </div>
                                                </div>
                                            )}
                                            key={item.title}
                                            hoverable={item.status === COURSE_STATUSES.PRODUCTION || !!item.publicly_visible || !(roles.indexOf('administrator') === -1) || !this.checkAuthors(item.authors, user.id)}
                                            onClick={e => this.onClickHandler(e, item.id, item.status === COURSE_STATUSES.PRODUCTION, item.activeCourses ? item.activeCourses.id : null, roles, user.id, item.authors, item.publicly_visible, item.type)}
                                        >
                                            <Row align="middle" justify="center" style={{ width: '100%' }}>
                                                <div className="durationContainer">
                                                    {
                                                        roles.indexOf('administrator') !== -1 || (roles.indexOf('author') !== -1 && item.authors.findIndex(item => item.id === user.id) !== -1)
                                                            ? <Button className="edit-course-bnt" name="edit-course" shape="circle" icon="edit" />
                                                            : <></>
                                                    }
                                                    <div className="timerContainer">
                                                        <Tooltip mouseEnterDelay={0.5} title="Estimated time to complete the course">
                                                            <img src="/img/timer.svg" alt="timer" />
                                                            <span style={{ color: '#fff', marginLeft: '11px' }}>{`${courseDuration + availableTime}m`}</span>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </Row>
                                            <Row className={item.title.length < 50 ? 'categoryRow' : 'categoryRowLongTitle'}>
                                                <div className="courseCategory">
                                                    <Tooltip mouseEnterDelay={0.5} title="DevSecOps category">
                                                        <Text>{item.category ? item.category.name : ''}</Text>
                                                    </Tooltip>
                                                </div>
                                                <div className={item.title.length < 50 ? 'courseTitle' : 'courseTitleLong'}>
                                                    <Title level={4}>{item.title}</Title>
                                                </div>
                                            </Row>

                                        </Card>
                                    </List.Item>
                                );
                            }}
                        />
                    )
                    : <Loading />}
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        courses: state.courses,
        auth: state.auth,
        activeCourse: state.activeCourse,
        tokenBalance: state.tokenWallet.tokenBalance,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCourses: (category_id, keyword, page, perPage) => dispatch(fetchCourses(
            category_id, keyword, page, perPage,
        )),
        getUserSubscriptionsInformation: () => dispatch(getUserSubscriptionsInformation()),
        getCurrentTokenBalance: () => dispatch(getCurrentTokenBalance()),

    };
}

export { Courses };
export default connect(mapStateToProps, mapDispatchToProps)(Courses);
