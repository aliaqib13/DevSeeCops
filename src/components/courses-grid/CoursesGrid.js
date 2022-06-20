import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './course-grid.scss';
import {
    List, Card, Row, Typography, Button, Tooltip, Icon,
} from 'antd';
import { COURSE_TYPE, COURSE_STATUSES } from '../../constants';

const { Title, Text } = Typography;

class CoursesGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coursesCount: 8,
        };
    }

    componentDidMount() {
        this.checkWindowSize(this.state.coursesCount);
        window.addEventListener('resize', () => this.checkWindowSize(this.state.coursesCount));
    }

    checkWindowSize(count) {
        const windowWidth = window.innerWidth;
        let coursesCount = count;
        if (windowWidth > 1715) {
            coursesCount = 8;
        } else if (windowWidth <= 1715 && windowWidth > 1131) {
            coursesCount = 6;
        } else if (windowWidth <= 1131 && windowWidth > 855) {
            coursesCount = 4;
        } else if (windowWidth <= 855) {
            coursesCount = 2;
        }
        this.setState({ coursesCount });
    }

    onClickHandler = (e, course_id, active, active_course_id, course_type) => {
        let info_path;
        if (e.target.dataset && e.target.dataset.icon === 'file-done') {
            return;
        }
        if (course_type === COURSE_TYPE.EXAM) {
            info_path = `/professional-exam/${course_id}`;
        } else if (course_type === COURSE_TYPE.INTRODUCTION) {
            info_path = `/introduction-module/${course_id}`;
        } else {
            info_path = `/course-information/${course_id}`;
        }
        switch (e.target.name) {
        case 'edit-course':
            this.props.history.push(`/platform/admin/edit-course/${course_id}`);
            break;
        case 'course-info':
            this.props.history.push(info_path);
            break;
        default:
            // if (!active) {
            //     message.info('Course will be available soon.')
            //     return
            // }
            if (active_course_id) {
                const viewed = localStorage.getItem('viewed-courses');
                if (!viewed) {
                    const viewedCourses = [course_id];
                    localStorage.setItem('viewed-courses', JSON.stringify(viewedCourses));
                    this.props.history.push(info_path);
                } else {
                    const viewedCourses = JSON.parse(viewed);
                    const viewedCourse = viewedCourses.find(item => item === course_id);
                    if (!viewedCourse) {
                        viewedCourses.push(course_id);
                        localStorage.setItem('viewed-courses', JSON.stringify(viewedCourses));
                        this.props.history.push(info_path);
                    } else {
                        this.props.history.push(`/platform/tl/${active_course_id}`);
                    }
                }
            } else {
                this.props.history.push(info_path);
            }
        }
    }

    render() {
        const { user, courses } = this.props;
        const { coursesCount } = this.state;
        const hideCourseInfoIcons = this.props.hideCourseInfoIcons ? this.props.hideCourseInfoIcons : null;

        let roles = [];
        if (user) {
            roles = user.roles;
        }

        return (
            <div className="course-grid">

                <List
                    grid={{ gutter: 16, column: 4 }}
                    className="antList"
                    dataSource={courses}
                    pagination={{
                        onChange: page => {
                        },
                        pageSize: coursesCount,
                        position: 'both',
                    }}
                    renderItem={item => {
                        const courseDuration = item.theory_duration ? +item.theory_duration.replace('m', '') : null;
                        const availableTime = (item.labs && item.labs.length) ? +item.labs[0].available_time.replace('m', '') : null;
                        return (
                            <List.Item className="courses-item">
                                <Card
                                    className="courses-card"
                                    style={user && { height: '388px' }}
                                    cover={(
                                        <div>
                                            <div className="coursesImageDiv" style={{ background: `url(${item.image})` }} />
                                        </div>
                                    )}
                                    extra={user ? (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                            {!hideCourseInfoIcons && (
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src="/img/star.svg" alt="star" />
                                                    <div style={{ marginLeft: '8px', fontWeight: '600' }}>4.5</div>
                                                </div>
                                            )}

                                            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                                {item.type === COURSE_TYPE.EXAM
                                              && <Tooltip mouseEnterDelay={0.5} title="Professional Exam"><Icon type="file-done" className="course-type-icon" /></Tooltip>}
                                                {
                                                    roles.indexOf('administrator') !== -1 || (roles.indexOf('author') !== -1 && item.authors && item.authors.findIndex(item => item.id === user.id) !== -1)
                                                        ? <Button className="edit-course-bnt" name="edit-course" shape="circle" icon="edit" />
                                                        : <></>
                                                }
                                                {
                                                    item.activeCourses && !hideCourseInfoIcons
                                                        ? <Button type="primary" name="course-info" shape="circle" icon="info" />
                                                        : <></>
                                                }
                                            </div>
                                        </div>
                                    ) : null}
                                    key={item.title}
                                    hoverable
                                    onClick={e => this.onClickHandler(e, item.id, item.status === COURSE_STATUSES.PRODUCTION, item.activeCourses ? item.activeCourses.id : null, item.type)}
                                >
                                    <Row align="middle" justify="center" style={{ width: '100%' }}>
                                        <div className="durationContainer">
                                            <div className="timerContainer">
                                                <Tooltip mouseEnterDelay={0.5} title="estimated time to complete course">
                                                    <img src="/img/timer.svg" alt="timer" />
                                                    <span style={{ color: '#fff', marginLeft: '11px' }}>{`${courseDuration + availableTime}m`}</span>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </Row>
                                    <Row className="categoryRow">
                                        <div className="courseCategory">
                                            <Tooltip mouseEnterDelay={0.5} title="DevSecOps category">
                                                <Text>{item.category.name}</Text>
                                            </Tooltip>
                                        </div>
                                        <div className="courseTitle">
                                            <Title level={4} style={{ fontWeight: 'normal' }}>{item.title}</Title>
                                        </div>
                                    </Row>

                                </Card>
                            </List.Item>
                        );
                    }}
                />
            </div>
        );
    }
}

export { CoursesGrid };
export default withRouter(CoursesGrid);
