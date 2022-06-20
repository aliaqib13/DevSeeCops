import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchActiveCourses, getCourseUsers, getCourseRequests, clearUsers, removeUserActiveCourse,
    searchUserByEmail, addUserActiveCourse, uploadCourse, fetchCoursesPlatformInsights, getLabtimeRequests,
    changeLabtimeRequestStatus, deleteLabtimeRequest, getCourseStatuses, getCoursesByStatus, getCourseProposalsForReviews, getDevelopmentCourses,
}
    from '../../../store/actions/admin/courseAdministration';
import { getLabs } from '../../../store/actions/admin/labs';
import {
    createCategory, deleteCategory, fetchCategories, uploadFile,
    createCourse, getCourseTemplates, getCourseTypes,
} from '../../../store/actions/admin/course';
import './course-administration.scss';
import CourseAdministrationComponent from '../../../components/admin/course-administration/course-administration';
import { changeRequestStatus, deleteRequest, getAdminAccessRequests } from '../../../store/actions/admin/requests';
import { fetchTags, updateTags } from '../../../store/actions/admin/tags';
import { searchByCourseTags } from '../../../store/actions/preferences';

class CourseAdministration extends Component {
    render() {
        const {
            courses,
            users,
            categories,
            fetchActiveCourses,
            getCourseUsers,
            getCourseRequests,
            clearUsers,
            removeUserActiveCourse,
            searchUserByEmail,
            addUserActiveCourse,
            createCourse,
            createCategory,
            fetchCategories,
            deleteCategory,
            uploadFile,
            uploadCourse,
            getAdminAccessRequests,
            requests,
            changeRequestStatus,
            deleteRequest,
            fetchCoursesPlatformInsights,
            coursesPlatformInsights,
            courseRequests,
            getLabtimeRequests,
            labtimeRequests,
            getLabs,
            labs,
            changeLabtimeRequestStatus,
            deleteLabtimeRequest,
            updateTags,
            fetchTags,
            searchByCourseTags,
            getCourseTemplates,
            courseTemplates,
            getCourseStatuses,
            statuses,
            getCoursesByStatus,
            coursesByStatus,
            getDevelopmentCourses,
            developmentCourses,
            history,
            getCourseTypes,
            courseTypes,
            getCourseProposalsForReviews,
            courseProposalsForReview,
        } = this.props;

        return (
            <CourseAdministrationComponent
                courses={courses}
                users={users}
                courseRequests={courseRequests}
                categories={categories}
                fetchActiveCourses={fetchActiveCourses}
                getCourseUsers={getCourseUsers}
                getCourseRequests={getCourseRequests}
                getLabtimeRequests={getLabtimeRequests}
                clearUsers={clearUsers}
                removeUserActiveCourse={removeUserActiveCourse}
                searchUserByEmail={searchUserByEmail}
                addUserActiveCourse={addUserActiveCourse}
                createCourse={createCourse}
                createCategory={createCategory}
                fetchCategories={fetchCategories}
                deleteCategory={deleteCategory}
                uploadFile={uploadFile}
                uploadCourse={uploadCourse}
                getAdminAccessRequests={getAdminAccessRequests}
                requests={requests}
                changeRequestStatus={changeRequestStatus}
                deleteRequest={deleteRequest}
                fetchCoursesPlatformInsights={fetchCoursesPlatformInsights}
                coursesPlatformInsights={coursesPlatformInsights}
                labtimeRequests={labtimeRequests}
                getLabs={getLabs}
                labs={labs}
                changeLabtimeRequestStatus={changeLabtimeRequestStatus}
                deleteLabtimeRequest={deleteLabtimeRequest}
                updateTags={updateTags}
                fetchTags={fetchTags}
                searchByCourseTags={searchByCourseTags}
                getCourseTemplates={getCourseTemplates}
                courseTemplates={courseTemplates}
                getCourseStatuses={getCourseStatuses}
                statuses={statuses}
                getCoursesByStatus={getCoursesByStatus}
                coursesByStatus={coursesByStatus}
                getDevelopmentCourses={getDevelopmentCourses}
                developmentCourses={developmentCourses}
                focusTab={history.location.state}
                getCourseTypes={getCourseTypes}
                courseTypes={courseTypes}
                getCourseProposalsForReviews={getCourseProposalsForReviews}
                courseProposalsForReview={courseProposalsForReview}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        courses: state.adminCourseAdministration.courses,
        users: state.adminCourseAdministration.users,
        courseRequests: state.adminCourseAdministration.courseRequests,
        coursesPlatformInsights: state.adminCourseAdministration.coursesPlatformInsights,
        labtimeRequests: state.adminCourseAdministration.labtimeRequests,
        categories: state.adminCourse.categories,
        requests: state.adminAccessRequests,
        labs: state.adminLabs.labs,
        courseTemplates: state.adminCourse.courseTemplates,
        statuses: state.adminCourseAdministration.statuses,
        coursesByStatus: state.adminCourseAdministration.coursesByStatus,
        developmentCourses: state.adminCourseAdministration.developmentCourses,
        courseTypes: state.adminCourse.courseTypes,
        courseProposalsForReview: state.adminCourseAdministration.courseProposalsForReview,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchActiveCourses: () => dispatch(fetchActiveCourses()),
        getCourseUsers: (course_id, page, perPage, searchEmail) => dispatch(getCourseUsers(course_id, page, perPage, searchEmail)),
        getCourseRequests: (course_id, page, perPage, searchEmail) => dispatch(getCourseRequests(course_id, page, perPage, searchEmail)),
        fetchCoursesPlatformInsights: () => dispatch(fetchCoursesPlatformInsights()),
        getLabtimeRequests: (lab_id, page, perPage, searchEmail) => dispatch(getLabtimeRequests(lab_id, page, perPage, searchEmail)),
        clearUsers: () => dispatch(clearUsers()),
        removeUserActiveCourse: (user_id, course_id) => dispatch(removeUserActiveCourse(user_id, course_id)),
        searchUserByEmail: input => dispatch(searchUserByEmail(input)),
        addUserActiveCourse: (email, course_id) => dispatch(addUserActiveCourse(email, course_id)),
        getAdminAccessRequests: () => dispatch(getAdminAccessRequests()),
        changeRequestStatus: data => dispatch(changeRequestStatus(data)),
        deleteRequest: id => dispatch(deleteRequest(id)),

        createCourse: data => dispatch(createCourse(data)),
        createCategory: data => dispatch(createCategory(data)),
        fetchCategories: () => dispatch(fetchCategories()),
        deleteCategory: (index, id) => dispatch(deleteCategory(index, id)),
        uploadFile: (file, folder) => dispatch(uploadFile(file, folder)),
        uploadCourse: file => dispatch(uploadCourse(file)),
        getLabs: () => dispatch(getLabs()),
        changeLabtimeRequestStatus: data => dispatch(changeLabtimeRequestStatus(data)),
        deleteLabtimeRequest: id => dispatch(deleteLabtimeRequest(id)),
        updateTags: data => dispatch(updateTags(data)),
        fetchTags: () => dispatch(fetchTags()),
        searchByCourseTags: keyword => dispatch(searchByCourseTags(keyword)),
        getCourseTemplates: () => dispatch(getCourseTemplates()),
        getCourseStatuses: () => dispatch(getCourseStatuses()),
        getCoursesByStatus: (status, page, perPage, search) => dispatch(getCoursesByStatus(status, page, perPage, search)),
        getDevelopmentCourses: (page, perPage, search) => dispatch(getDevelopmentCourses(page, perPage, search)),
        getCourseTypes: () => dispatch(getCourseTypes()),
        getCourseProposalsForReviews: () => dispatch(getCourseProposalsForReviews()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseAdministration);
