import React, { Component } from 'react';
import { connect } from 'react-redux';
import CourseInterest from '../../../components/admin/courseInterest/CourseInterest';
import { getCourseInterests } from '../../../store/actions/admin/courseInterests';

class CourseInterests extends Component {
    componentDidMount() {
        const { fetchCourseInterests } = this.props;
        fetchCourseInterests();
    }

    render() {
        const { courseInterests, fetchCourseInterests } = this.props;
        return (
            <CourseInterest
                courseInterests={courseInterests}
                fetchCourseInterests={fetchCourseInterests}
            />
        );
    }
}

const mapStateToProps = state => ({
    courseInterests: state.adminCourseInterests.courseInterests,
});

const mapDispatchToProps = dispatch => ({
    fetchCourseInterests: () => dispatch(getCourseInterests()),
});

export { CourseInterests };
export default connect(mapStateToProps, mapDispatchToProps)(CourseInterests);
