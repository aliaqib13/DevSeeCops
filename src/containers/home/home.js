import React, { Component } from 'react';
import {
    Button, Pagination, Typography, Popover, message, Empty,
} from 'antd';
import moment from 'moment';
import LazyLoadImg from '../../components/course-information/LazyLoadImg/LazyLoadImg';
import './home.scss';
import { connect } from 'react-redux';
import { fetchHomePage } from '../../store/actions/homePage';
import Loading from '../../components/Loading/Loading';
import { NavLink } from 'react-router-dom';

const { Title } = Typography;

class Home extends Component {
    state = {
        loading: false,
    }

    componentDidMount() {
        this.setState({ loading: true });
        const loader = message.loading('Loading..');
        this.props.fetchHomePage(1).then(res => {
            loader();
            if (res !== true) {
                message.error(res.message);
            }
        }).finally(() => {
            this.setState({ loading: false });
        });
    }

    goToCertificates = () => {
        this.props.history.push('/platform/achievements');
    }

    goToCourse = course_id => {
        this.props.history.push(`/platform/tl/${course_id}`);
    }

    paginate = page => {
        const loader = message.loading('Loading..');
        this.props.fetchHomePage(page).then(res => {
            loader();
            if (res !== true) {
                message.error(res.message);
            }
        });
    }

    render() {
        const { courses, recommendedCourses } = this.props.homePage;
        const { loading } = this.state;
        return (
            <div className="homepage-wrapper">
                <div className="homepage-container">

                    <div className="homepage-body">
                        <div className='left-side'>
                            <div className="my-courses-wrapper">
                                <div className="my-courses">
                                    <Title level={4} className="my-courses-title">My DevSecOps Learning Path</Title>

                                    {
                                        courses && courses.total && !loading
                                            ? courses.data.map((item, key) => {
                                                const { activeCourses, __meta__, certificates } = item;
                                                const isFinished = item.activeCourses.finished;

                                                return (
                                                    <div className="course-item" key={key}>
                                                        <div className="course-item-img-container">
                                                            <LazyLoadImg img={item.image} className="course-item-img" alt="course-img" />
                                                        </div>
                                                        <div className="course-item-description-container">
                                                            <div className="course-item-heading">
                                                                <div className={`course-item-heading-title-wrapper ${certificates.length ? '' : 'no-certificate'}`}>
                                                                    <Popover
                                                                        content={item.title}
                                                                        title={null}
                                                                        placement="topLeft"
                                                                        autoAdjustOverflow
                                                                        overlayStyle={{
                                                                            maxWidth: '500px',
                                                                            textAlign: 'center',
                                                                            fontSize: '12px',
                                                                        }}
                                                                    >
                                                                        <div className="course-item-heading-title">{item.title}</div>
                                                                    </Popover>
                                                                    <div className="course-item-heading-description">
                                                                        {item.description}
                                                                    </div>
                                                                </div>
                                                                {
                                                                    certificates.length
                                                                        ? (
                                                                            <Popover title={null} content="My Certificates">
                                                                                <div className="course-item-heading-certificate">
                                                                                    <img onClick={this.goToCertificates} src="/img/certificate.png" alt="Certificate" />
                                                                                </div>
                                                                            </Popover>
                                                                        )
                                                                        : <></>
                                                                }
                                                            </div>
                                                            <div className="time-resume-wrapper">
                                                                <div className="course-item-time">
                                                                    <span>
                                                                        Started:
                                                                        {moment(activeCourses.created_at).format('MMM DD YYYY')}
                                                                    </span>
                                                                    {
                                                                        isFinished && certificates.length > 0
                                                                            ? (
                                                                                <span>
                                                                                    Finished:
                                                                                    {moment(certificates[certificates.length - 1].created_at).format('MMM DD YYYY')}
                                                                                </span>
                                                                            )
                                                                            : ''
                                                                    }
                                                                </div>
                                                                <div className="course-item-additional-info-resume mobile">
                                                                    {
                                                                        isFinished ? <Button size="small" className="course-item-button" onClick={() => this.goToCourse(activeCourses.id)}>Revisit</Button>
                                                                            : <Button size="small" className="course-item-button" onClick={() => this.goToCourse(activeCourses.id)}>Resume</Button>
                                                                    }
                                                                </div>
                                                            </div>

                                                            <div className="course-item-additional-info">
                                                                <div className="course-item-additional-info-left">
                                                                    <div className="course-item-additional-info-status">{isFinished ? 'Complete' : 'Open'}</div>

                                                                    <div className="course-item-additional-info-duration">
                                                                        <span className="duration">{item.theory_duration}</span>
                                                                    </div>

                                                                    <div className="course-item-additional-info-level">{activeCourses.user_level || ''}</div>

                                                                    <div className="course-item-additional-info-views">
                                                                        <img src="/img/user.png" alt="Views: " />
                                                                        {__meta__.activeCourses_count}
                                                                    </div>

                                                                </div>
                                                                <div className="course-item-additional-info-right">
                                                                    {/* <div className="course-item-additional-info-rating"><Rate disabled allowHalf value={4} /></div> */}
                                                                    <div className="course-item-additional-info-resume desktop">
                                                                        {
                                                                            isFinished ? <Button size="small" className="course-item-button" onClick={() => this.goToCourse(activeCourses.id)}>Revisit</Button>
                                                                                : <Button size="small" className="course-item-button" onClick={() => this.goToCourse(activeCourses.id)}>Resume</Button>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                            : loading
                                                ? <Loading />
                                                : <Empty description="Courses not found" />
                                    }
                                </div>
                                {
                                    courses && courses.total
                                        ? (
                                            <div className="my-courses-pagination-container">
                                                <Pagination
                                                    total={courses.total}
                                                    defaultCurrent={1}
                                                    onChange={this.paginate}
                                                    className="my-courses-pagination"
                                                    pageSize={courses.perPage}
                                                />
                                            </div>
                                        ) : ''
                                }
                            </div>
                        </div>

                        <div className="right-side">
                            {recommendedCourses && recommendedCourses.length
                                ? (
                                    <div className="my-news recommended-courses" style={{ marginBottom: '20px' }}>
                                        <div className="news-title recommended-courses-title">
                                            Recommended Courses
                                        </div>
                                        <div className="news-wrapper">
                                            <div className="news-subtitle">
                                                {(recommendedCourses || []).map((item, index) => (
                                                    <div key={index}>
                                                        <NavLink to={`/course-information/${item.id}`}>
                                                            <div className="news-item" key={item.id}>
                                                                <LazyLoadImg
                                                                    className="news-item-img-container"
                                                                    img={item.image}
                                                                />
                                                                <p className="single-recommended-courses-title">
                                                                    {' '}
                                                                    {item.title}
                                                                    {' '}
                                                                </p>
                                                            </div>
                                                        </NavLink>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )
                                : null}
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}
function mapStateToProps(state) {
    return {
        homePage: state.homePage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchHomePage: page => dispatch(fetchHomePage(page)),
    };
}

export { Home };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
