import React from 'react';
import {
    Button, Icon, Modal, Collapse, Tooltip,
} from 'antd';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';
import { COURSE_STATUSES, COURSE_TYPE } from '../../constants';
import { CATEGORIES, ACTIONS } from '../../util/GAEventConstants';

const { Panel } = Collapse;

class LearningPath extends React.Component {
    checkMyActiveCourse = (user, courses, finished) => courses.find(item => item.user_id === user.id && item.finished === finished);

    checkActiveCourse = (user, courses, course, status) => courses.findIndex(item => item.user_id === user.id) === -1 && course.status === status;

    handleGAEventNotify = courseTitle => {
        ReactGA.event({
            category: CATEGORIES.COURSE_SELECTION,
            action: ACTIONS.CLICKED_ON_LEARNING_PATH(courseTitle),
            label: 'clicked on "notify me"',
        });
    }

    handleGAEventExplore = courseData => {
        ReactGA.event({
            category: CATEGORIES.COURSE_SELECTION,
            action: ACTIONS.CLICKED_ON_LEARNING_PATH(courseData.title),
            label: `explore: ${courseData.title}`,
        });
    }

    handleCreateNotifyMe = courseData => {
        const { createNotifyMe, getPlannedCourses } = this.props;
        this.handleGAEventNotify(courseData.title);
        createNotifyMe(courseData.id).then(() => {
            getPlannedCourses();
        }).catch(console.error);
    };

    createButton = (text, to, isNotifyed, courseData) => (
        <>
            <Button
                disabled={!to}
                className={to ? 'course-resume' : 'course-not-available'}
                onClick={() => {
                    if (text === 'Explore') {
                        // isNotifyed is undefined so get's passed courseData
                        return this.handleGAEventExplore(isNotifyed);
                    }
                    return null;
                }}
            >
                { to
                    ? <Link to={to}>{text}</Link>
                    : text}
            </Button>
            {!to && typeof isNotifyed !== 'undefined' && (isNotifyed
                ? <Button className='course-interest-registered' disabled>Interest Registered</Button>
                : <Button className='course-notify-me' onClick={() => this.handleCreateNotifyMe(courseData)}>Notify me</Button>
            )}
        </>
    );

    checkIsNotifyed = courseId => {
        const { notifyCourses } = this.props;
        return notifyCourses && notifyCourses.some(e => e.course_id === courseId);
    }

    addButtonElement = (courseData, user) => {
        const { activeCoursesMany } = courseData;
        if (this.checkMyActiveCourse(user, activeCoursesMany, 0)) {
            return this.createButton(
                'Resume',
                `/platform/tl/${activeCoursesMany.find(item => item.user_id === user.id && item.finished === 0).id}`,
            );
        }
        if (this.checkMyActiveCourse(user, activeCoursesMany, 1)) {
            return this.createButton(
                'Revisit',
                `/platform/tl/${activeCoursesMany.find(item => item.user_id === user.id && item.finished === 1).id}`,
            );
        }
        if (this.checkActiveCourse(user, activeCoursesMany, courseData, COURSE_STATUSES.PRODUCTION)) {
            const urlStart = courseData.type === 'exam' ? '/platform/professional-exam/' : '/platform/course-information/';
            return this.createButton(
                'Explore',
                `${urlStart}${courseData.id}`,
                courseData,
            );
        }
        if (this.checkActiveCourse(user, activeCoursesMany, courseData, COURSE_STATUSES.DEVELOPMENT)) {
            return this.createButton(
                'Planned',
                false,
                this.checkIsNotifyed(courseData.id),
                courseData,
            );
        }
        return '';
    };

    render() {
        const {
            item, modalVisible, user, index, getLabCount, showArrow, handleVideo,
        } = this.props;
        const header = (
            <div className="dropdown_path">
                <div className="title_and_subtitle">
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                </div>
            </div>
        );
        const panel = (
            <Panel header={header} key={index} showArrow={showArrow}>
                <div className="main-description">
                    <div className="intro-description">
                        <ul>
                            <li>
                                {`Number of courses - ${item.courses.length}`}
                            </li>
                            <li>
                                {`Number of practitioner labs - ${getLabCount(item.courses)}`}
                            </li>
                            <li>
                                {`Exam - ${item.examCourse.title}`}
                            </li>
                        </ul>
                        <br />
                    </div>
                    <div className="video-cont">
                        {item.resource_url && item.resource_url.split('.').pop() === 'mp4'
                            ? (
                                <>
                                    <div onClick={() => handleVideo(index)} className="video-play-arrow">
                                        <Icon type="play-circle" />
                                    </div>
                                    <video width='120'>
                                        <source src={item.resource_url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </>
                            )
                            : <img src={item.resource_url} alt="course-resource" width="120" />}
                    </div>
                    <div>
                        {item.courses.concat({ ...item.examCourse }).map((courseData, key) => (
                            <div className="courses-cont" key={key}>
                                <div className="course-image-cont">
                                    <img
                                        key={courseData.id}
                                        style={{ width: '70%' }}
                                        src={courseData.image}
                                        alt="course"
                                    />
                                </div>
                                <div className="course-content-cont">
                                    <div>
                                        <span>
                                            {courseData.type === COURSE_TYPE.EXAM
                                        && <Tooltip mouseEnterDelay={0.5} title="Professional Exam"><Icon type="file-done" className='exam-icon' /></Tooltip>}
                                            {courseData.title}
                                        </span>
                                        {courseData.activeCoursesMany.find(item => item.user_id === user.id && item.finished === 1)
                                            ? (
                                                <img
                                                    key={item.id}
                                                    src="/img/certificate.png"
                                                    alt="certificate"
                                                    width="30"
                                                    className="ceritificate-completed"
                                                />
                                            ) : ''}
                                    </div>
                                    <div className="intro-description">{courseData.description}</div>
                                    {this.addButtonElement(courseData, user)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Modal
                        width="50%"
                        onCancel={() => handleVideo(index)}
                        visible={modalVisible}
                        footer={null}
                    >
                        <video id={`video-popup-${index}`} controls style={{ width: '100%' }}>
                            <source src={item.resource_url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Modal>
                </div>
            </Panel>
        );
        return (
            <div key={index} className="learning-path">
                {!showArrow
                    ? (
                        <Collapse activeKey={[index]}>
                            {panel}
                        </Collapse>
                    ) : (
                        <Collapse>
                            {panel}
                        </Collapse>
                    )}
            </div>
        );
    }
}

export default LearningPath;
