import React, { Component } from 'react';
import './academy-tour.scss';
import moment from 'moment';
import ReactGA from 'react-ga';
import { Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { addViewedCourse } from '../../util/utils';
import { CATEGORIES, ACTIONS } from '../../util/GAEventConstants';

class AcademyTourDescriptions extends Component {
  handleGAEvent = (courseTitle) => {
    ReactGA.event({
      category: CATEGORIES.COURSE_SELECTION,
      action: ACTIONS.INTRODUCTION_MODULE_LAB_CREATED(),
      label: `${courseTitle}`,
    });
  };
  //pakistan

  handleClick = (courseId, activeCourses, courseTitle) => {
    const { history, createActiveIntroductionCourse } = this.props;
    this.handleGAEvent(courseTitle);
    if (!activeCourses) {
      const loader = message.loading('Loading..', 0);
      createActiveIntroductionCourse(courseId)
        .then((res) => {
          if (res !== false) {
            message.success('Created');
            addViewedCourse(courseId);
            history.push(`/platform/tl/${res.id}`);
          } else {
            message.error('Something went wrong, please try again.');
          }
          loader();
          return true;
        })
        .catch((err) => console.warn(err));
    } else {
      history.push(`/platform/tl/${activeCourses.id}`);
    }
  };

  render() {
    const { activeCategory, introCourses } = this.props;
    return (
      <div className="academy-tour-descriptions">
        <div>
          <h2>Introduction Modules</h2>
          <div>
            Each DevSecOps category has a free introductory module that
            introduces you to the category and its common security issues. It
            also helps you to understand which learning paths, courses, and
            exams are available. The introduction modules contain very basic
            hands-on labs to help you to become familiar with how the academy's
            hands-on labs work and to get beginners started with applying
            DevSecOps practices in that category.
          </div>
        </div>
        {introCourses.map((course) => (
          <div
            className="block"
            id={course.category.id}
            key={course.category.id}
            style={
              activeCategory === course.category.id
                ? { backgroundColor: '#f3f3f3' }
                : {}
            }
          >
            <h2>{course.title}</h2>
            <div>{course.category.description}</div>
            <Button
              className="btn-go-module"
              onClick={() =>
                this.handleClick(course.id, course.activeCourses, course.title)
              }
            >
              Go To Module
            </Button>
            {course.activeCourses && course.activeCourses.finished === 1 && (
              <span>
                <strong> Completed on </strong>
                <span>
                  {' '}
                  {moment(course.activeCourses.updated_at).format(
                    'MMM Do YYYY'
                  )}{' '}
                </span>
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export { AcademyTourDescriptions };
export default withRouter(AcademyTourDescriptions);
