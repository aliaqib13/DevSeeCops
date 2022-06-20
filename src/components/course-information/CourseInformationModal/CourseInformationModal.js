import React, { Component } from 'react';
import {
    Collapse, Divider, Icon, Rate, Tag,
} from 'antd';
import moment from 'moment';
import ReactGA from 'react-ga';
import { CATEGORIES, ACTIONS } from '../../../util/GAEventConstants';

import './CourseInformationModal.scss';

import { TOKEN_EXCHANGE } from '../../../util/constants';
import calculatePriceFromTokens from '../../../util/calculatePriceFromTokens';
import TokensCount from '../TokensCount/TokensCount';
import HTMLSanitize from '../../HTMLSanitize/HTMLSanitize';

const { Panel } = Collapse;

class CourseInformationModal extends Component {
    videoStart = course => {
        ReactGA.event({
            category: CATEGORIES.PREVIEW_VIDEO,
            action: ACTIONS.PREVIEW_VIDEO_OF_COURSE_STARTED(course.title),
            label: 'Preview Video',
        });
    }

    render() {
        const {
            course, courseData, authorPicUrl, secondAuthorPicUrl,
        } = this.props;

        const courseDuration = course.theory_duration ? +course.theory_duration.replace('m', '') : null;

        const courseCalculatedPrice = calculatePriceFromTokens(courseData.token_cost, TOKEN_EXCHANGE.USD);
        return (
            <div className="course-info-modal">
                <div className="course-information-header">
                    <div className="title">{course.title || courseData.title}</div>
                    <div className="content">{course.content || courseData.content}</div>
                </div>
                <div className="course-information-body">
                    <div className="main">
                        <div className="video-container">
                            <video controls className="video-player" onPlay={() => this.videoStart(course)}>
                                <source src={course.preview_video || courseData.preview_video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        <div className="course-information-meta-1">
                            <div>
                                <div className="title">{course.title || courseData.title}</div>
                                <div className="version-rate-wrapper">
                                    <div className="version">{course.version || courseData.version}</div>
                                    <div className='rate-container'><Rate allowHalf disabled value={course.value_rating || courseData.value_rating} /></div>
                                </div>
                            </div>
                            <div className="price">
                                $
                                { courseCalculatedPrice }
                                <TokensCount tokenCost={courseData.token_cost} />
                            </div>
                        </div>
                        <div className="course-information-meta-2">
                            <div className="content">{course.content || courseData.content}</div>
                            <div className="button-container" />
                        </div>

                        <div className="overview-include-container">
                            <div className="overview">
                                <div className="title">Course Overview</div>
                                <div className="line">
                                    <div>Version date</div>
                                    <div>{(course.version_date || courseData.version_date) && moment(course.version_date).format('MMM Do YY')}</div>
                                </div>
                                <div className="line">
                                    <div>Number of ratings</div>
                                    <div>{course.number_of_ratings || courseData.number_of_ratings}</div>
                                </div>
                                <div className="line">
                                    <div>Difficulty rating</div>
                                    <div><Rate allowHalf character={<Icon type="trophy" />} disabled value={course.difficulty || courseData.difficulty} /></div>
                                </div>
                                <div className="line">
                                    <div>Enrolled students</div>
                                    <div>{course.enrolled_students || courseData.enrolled_students}</div>
                                </div>
                            </div>
                            <div className="include">
                                <div className="title">The course includes:</div>
                                <ul className="include-list">
                                    <li>
                                        {
                                            (course.information && course.information.steps) ? course.information.steps
                                                : (courseData.information && courseData.information.steps) ? courseData.information.steps
                                                    : 0
                                        }
                                        {' '}
                                        preparation lab steps
                                    </li>
                                    <li>
                                        {
                                            (course.information && course.information.videos) ? course.information.videos
                                                : (courseData.information && courseData.information.videos) ? courseData.information.videos
                                                    : 0
                                        }
                                        {' '}
                                        videos
                                    </li>
                                    <li>
                                        {
                                            (course.information && course.information.quizzes) ? course.information.quizzes
                                                : (courseData.information && courseData.information.quizzes) ? courseData.information.quizzes
                                                    : 0
                                        }
                                        {' '}
                                        quiz questions
                                    </li>
                                    <li>
                                        {course.theory_duration || courseData.theory_duration}
                                        {' '}
                                        preparation lab time
                                    </li>
                                    <li>
                                        {course.available_time || courseData.available_time}
                                        {' '}
                                        hands-on lab time available
                                    </li>
                                    <li>
                                        {course.hints_count || courseData.available_time}
                                        {' '}
                                        hint(s) limit at the advanced level
                                    </li>
                                    <li>Advanced & Medior level available</li>
                                    {course.certificate_of_completion || courseData.certificate_of_completion ? <li>Certificate of Completion</li> : ''}
                                    {course.lab_steps_in_personal_archive || courseData.lab_steps_in_personal_archive ? <li>Lab steps in personal archive</li> : ''}
                                </ul>
                            </div>
                        </div>

                        <div className="paragraph">
                            <div className="title">Course Description</div>
                            <div className="content">{course.description || courseData.description}</div>
                        </div>
                        <div className="paragraph">
                            <div className="title">What you will learn</div>
                            <div className="content">
                                <ul className='whatYouWillLearn-list'>
                                    {
                                        (course.will_learn || courseData.will_learn || []).map((item, key) => (
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
                                        (course.tools_used || courseData.tools_used || []).map((item, key) => (
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
                                    (course.courseTags || courseData.courseTags || []).map((item, key) => (
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
                                <HTMLSanitize content={course.required_exp || courseData.required_exp} />
                            </div>
                        </div>
                        <div className="paragraph">
                            <div className="title">Who this course is for</div>
                            <div className="content">
                                <ol className="whoThisCourseIsFor-list">
                                    {
                                        (course.course_is_for || courseData.course_is_for || []).map((item, key) => (
                                            <li key={key}>{item}</li>
                                        ))
                                    }
                                </ol>
                            </div>
                        </div>
                        {(course.preview_video2 || courseData.preview_video2)
                        && (
                            <div className="video-container">
                                <video controls className="video-player" onPlay={() => this.videoStart(course)}>
                                    <source src={course.preview_video2 || courseData.preview_video2} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        )}
                        <div className="paragraph">
                            <div className="title">Frequently Asked Questions</div>
                            <div className="content">
                                <Collapse bordered={false} className="FAQ-collapse">
                                    {
                                        (course.faq || courseData.faq || []).map((item, key) => (
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
                            <div className="content quotes" />
                        </div>
                        <div className="paragraph">
                            <div className="author-container">
                                <img src={authorPicUrl || '/img/user-default.png'} className="author-img" alt="author" />
                                <div className="author-name">{course.author || courseData.author}</div>
                                <div className="author-about">
                                    {course.author_bio ? course.author_bio : courseData.author_bio ? courseData.author_bio : 'No bio available yet'}
                                </div>
                            </div>
                            <div className="author-container">
                                <img src={secondAuthorPicUrl || '/img/user-default.png'} className="author-img" alt="author" />
                                <div className="author-name">{course.second_author || courseData.second_author}</div>
                                <div className="author-about">
                                    {course.second_author_bio ? course.second_author_bio : courseData.second_author_bio ? courseData.second_author_bio : 'No bio available yet'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar">
                        <div className="course-overview-container">
                            <div className="title">Course Overview</div>
                            <div className="line">
                                <div>Course price</div>
                                <div className="price">
                                    $
                                    { courseCalculatedPrice }
                                    <TokensCount tokenCost={courseData.token_cost} />
                                </div>

                            </div>
                            <div className="line">
                                <div>Course version</div>
                                <div>{course.version || courseData.version}</div>
                            </div>
                            <div className="line">
                                <div>Version date</div>
                                <div>
                                    {course.version_date ? course.version_date && moment(course.version_date).format('MMM Do YY')
                                        : courseData.version_date ? courseData.version_date && moment(courseData.version_date).format('MMM Do YY')
                                            : ''}
                                </div>
                            </div>
                            <div className="line">
                                <div>Value rating</div>
                                <div><Rate allowHalf disabled value={course.value_rating || courseData.value_rating} /></div>
                            </div>
                            <div className="line">
                                <div>Number of ratings</div>
                                <div>{course.number_of_ratings || courseData.number_of_ratings}</div>
                            </div>
                            <div className="line">
                                <div>Difficulty rating</div>
                                <div><Rate allowHalf character={<Icon type="trophy" />} disabled value={course.difficulty || courseData.difficulty} /></div>
                            </div>
                            <div className="line">
                                <div>Enrolled students</div>
                                <div>{course.enrolled_students || courseData.enrolled_students}</div>
                            </div>
                            <div className="line">
                                <div>Time to complete</div>
                                <div>{`${courseDuration + parseInt(course.available_time)}m`}</div>
                            </div>
                        </div>
                        <div className="include-container">
                            <div className="title">The course includes:</div>
                            <ul className="include-list">
                                <li>
                                    {
                                        (course.information && course.information.steps) ? course.information.steps
                                            : (courseData.information && courseData.information.steps) ? courseData.information.steps
                                                : 0
                                    }
                                    preparation lab steps
                                </li>
                                <li>
                                    {
                                        (course.information && course.information.videos) ? course.information.videos
                                            : (courseData.information && courseData.information.videos) ? courseData.information.videos
                                                : 0
                                    }
                                    {' '}
                                    videos
                                </li>
                                <li>
                                    {
                                        (course.information && course.information.quizzes) ? course.information.quizzes
                                            : (courseData.information && courseData.information.quizzes) ? courseData.information.quizzes
                                                : 0
                                    }
                                    {' '}
                                    quiz questions
                                </li>
                                <li className='theory_duration'>
                                    {course.theory_duration || courseData.theory_duration}
                                    {' '}
                                    preparation lab time
                                </li>
                                <li>
                                    {course.available_time || courseData.available_time}
                                    {' '}
                                    hands-on lab time available
                                </li>
                                <li className='hints_count'>
                                    {course.hints_count || courseData.courseData}
                                    {' '}
                                    hint(s) limit at the advanced level
                                </li>
                                <li>Advanced & Medior level available</li>
                                {course.certificate_of_completion || courseData.certificate_of_completion ? <li className='certificate_of_completion'>Certificate of Completion</li> : ''}
                                {course.lab_steps_in_personal_archive || courseData.lab_steps_in_personal_archive ? <li className='lab_steps_in_personal_archive'>Lab steps in personal archive</li> : ''}
                            </ul>
                        </div>
                        <div className="author-container">
                            <img src={authorPicUrl || '/img/user-default.png'} className="author-img" alt="author" />
                            <div className="author-name">{course.author || courseData.author}</div>
                            <div className="author-about">
                                {course.author_bio ? course.author_bio : courseData.author_bio ? courseData.author_bio : 'No bio available yet'}
                            </div>
                            <Divider />
                            <a href={course.linkedIn_url || courseData.linkedIn_url} target='_blank' rel="noopener noreferrer"><Icon className="linkedin-icon" type="linkedin" theme="filled" /></a>
                        </div>
                        <hr />
                        {
                            course.second_author
                            && (
                                <div className="author-container">
                                    <img src={secondAuthorPicUrl || '/img/user-default.png'} className="author-img" alt="author" />
                                    <div className="author-name">{course.second_author}</div>
                                    <div className="author-about">
                                        {course.second_author_bio ? course.second_author_bio : courseData.second_author_bio ? courseData.second_author_bio : 'No bio available yet'}
                                    </div>
                                    <Divider />
                                    <a href={course.second_linkedIn_url || courseData.second_linkedIn_url} target='_blank' rel="noopener noreferrer"><Icon className="linkedin-icon" type="linkedin" theme="filled" /></a>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

        );
    }
}

export default CourseInformationModal;
