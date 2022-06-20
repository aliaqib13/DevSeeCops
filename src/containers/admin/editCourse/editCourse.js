import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    message, Tabs, Affix, Empty,
} from 'antd';
import {
    getCourseById, updateCourse, updateCourseAdmin,
    uploadFile, addLab, deleteLab, editLab, updateQuiz, createQuiz, deleteQuiz,
    saveAllQuizzes, saveSignature, addAuthor, removeAuthor, deleteCourse, fetchCourseDesigns, mailFellows, getCourseTypes, checkIntroByCategory,
} from '../../../store/actions/admin/course';

import {
    updateRating, fetchRatings, addRating, deleteRating, searchUserByEmail,
} from '../../../store/actions/admin/courseRatings';
import { searchByEmail } from '../../../store/actions/admin/users';
import { exportCourseData } from '../../../store/actions/admin/courseIE';
import { uploadStepImage, removeStepImage } from '../../../store/actions/admin/stepsImages';
import { fetchStepsImages } from '../../../store/actions/stepsImages';
import { searchByCourseTags } from '../../../store/actions/preferences';
import { updateTags, fetchTags } from '../../../store/actions/admin/tags';
import Edit from '../../../components/admin/editCourse/edit/EditCourse';
import Labs from '../../../components/admin/editCourse/labs/Labs';
import Quiz from '../../../components/admin/editCourse/quiz/Quiz';
import Authors from '../../../components/admin/editCourse/authors/Authors';
import StepImages from '../../../components/admin/editCourse/step-images';
import Loading from '../../../components/Loading/Loading';
import './editCourse.scss';
import CourseRatings from '../../../components/admin/editCourse/courseRatings/course-ratings';
import CourseDesign from '../../../components/admin/editCourse/courseDesign/courseDesign';
import AdminSettings from '../../../components/admin/editCourse/adminSettings/adminSettings';

const { TabPane } = Tabs;

class EditCourse extends Component {
    constructor(props) {
        super(props);
        this.loader = null;
        this.state = {
            categories: [],
            activeTab: '1',
            loading: false,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.getData();
    }

    changeTab = key => {
        this.setState({
            activeTab: `${key}`,
        });
    }

    isCourseAuthor = (id, authors) => {
        if (this.props.authUser.roles.indexOf('author') === -1) {
            return false;
        }
        if (authors) {
            for (let i = 0; i < authors.length; i++) {
                if (authors[i].id === this.props.authUser.id) {
                    return true;
                }
            }
        }
        return false;
    }

    getData = () => {
        const { id } = this.props.match.params;
        this.loader = message.loading('Loading..', 0);
        this.props.fetchStepsImages(id);
        this.props.getCourseTypes();
        this.props.getCourseById(id)
            .then(() => {
                const { history, adminCourse: { course }, authUser: { roles } } = this.props;
                if (!course && !roles.includes('administrator')) {
                    return history.push('/platform/courses');
                }
                this.props.fetchRatings(id);
                if (course && course.is_from_draft) {
                    this.props.fetchCourseDesigns(id);
                }
            })
            .finally(() => {
                this.loader();
                this.setState({ loading: false });
            });
    }

    render() {
        const {
            course, categories, statuses, courseDesigns, courseTypes,
        } = this.props.adminCourse;
        const { stepsImages, courseRatings } = this.props;
        const { loading } = this.state;
        const allDates = [];
        let lastUpdate = null;
        if (course) {
            if (course.updated_at) {
                allDates.push(course.updated_at);
            }
            if (course.labs && course.labs.length) {
                for (let i = 0; i < course.labs.length; i++) {
                    allDates.push(course.labs[i].updated_at);
                    if (course.labs[i].step && course.labs[i].step.updated_at) {
                        allDates.push(course.labs[i].step.updated_at);
                    }
                }
            }
            if (course.quizzes && course.quizzes.length) {
                for (let i = 0; i < course.quizzes.length; i++) {
                    allDates.push(course.quizzes[i].updated_at);
                    if (course.quizzes[i].answers && course.quizzes[i].answers.length) {
                        for (let j = 0; j < course.quizzes[i].answers.length; j++) {
                            allDates.push(course.quizzes[i].answers[j].updated_at);
                        }
                    }
                }
            }
            if (stepsImages && stepsImages.length) {
                for (let i = 0; i < stepsImages.length; i++) {
                    allDates.push(stepsImages[i].updated_at);
                }
            }
            if (courseRatings && courseRatings.length) {
                for (let i = 0; i < courseRatings.length; i++) {
                    allDates.push(courseRatings[i].updated_at);
                }
            }
        }
        if (allDates.length) {
            lastUpdate = allDates.reduce((pre, cur) => (Date.parse(pre) < Date.parse(cur) ? cur : pre));
        }

        return (
            <>
                {
                    course && !loading
                        ? (
                            <div className="editCourseContainer">
                                <Affix offsetTop={64}>
                                    <div className="categoryName">
                                        <h1>{course.title}</h1>
                                        <p>
                                            Last save date
                                            { lastUpdate }
                                        </p>
                                    </div>
                                </Affix>
                                <div className="tabsContainer">
                                    <Tabs activeKey={this.state.activeTab} onChange={key => this.changeTab(key)}>
                                        <TabPane tab="CI & Preplab" key="1">
                                            {course && (
                                                <Edit
                                                    categories={categories}
                                                    course={course}
                                                    stepsImages={this.props.stepsImages}
                                                    updateCourse={(id, data) => this.props.updateCourse(id, data)}
                                                    uploadCourseImage={this.props.uploadFile}
                                                    deleteCourse={this.props.deleteCourse}
                                                    isAdmin={this.props.authUser.roles.indexOf('administrator') !== -1}
                                                    isAuthor={this.isCourseAuthor(course.id, course.authors)}
                                                    exportCourseData={this.props.exportCourseData}
                                                    fetchStepsImages={this.props.fetchStepsImages}
                                                    uploadVideo={this.props.uploadFile}
                                                    getData={this.getData}
                                                />
                                            )}
                                        </TabPane>
                                        <TabPane tab="Labs" key="3">
                                            <Labs
                                                labs={course.labs}
                                                course_id={course.id}
                                                addNewLab={data => this.props.addLab(data)}
                                                deleteLab={id => this.props.deleteLab(id)}
                                                editLab={(id, data) => this.props.editLab(id, data)}
                                                saveSignature={this.props.saveSignature}
                                                isAdmin={this.props.authUser.roles.indexOf('administrator') !== -1}
                                            />
                                        </TabPane>
                                        <TabPane tab="Quiz" key="4">
                                            <Quiz
                                                quizzes={course.quizzes}
                                                updateQuiz={this.props.updateQuiz}
                                                createQuiz={this.props.createQuiz}
                                                deleteQuiz={this.props.deleteQuiz}
                                                saveAllQuizzes={this.props.saveAllQuizzes}
                                                course_id={course.id}
                                            />
                                        </TabPane>
                                        {
                                            this.props.authUser.roles.indexOf('administrator') !== -1
                                                ? (
                                                    <TabPane tab="Authors" key="5">
                                                        <Authors
                                                            authors={course.authors}
                                                            searchByEmail={this.props.searchByEmail}
                                                            addAuthor={this.props.addAuthor}
                                                            removeAuthor={this.props.removeAuthor}
                                                            course_id={this.props.match.params.id}
                                                        />
                                                    </TabPane>
                                                ) : ''
                                        }
                                        <TabPane tab="Images" key="6">
                                            <StepImages
                                                images={this.props.stepsImages}
                                                fetchStepsImages={this.props.fetchStepsImages}
                                                uploadStepImage={this.props.uploadStepImage}
                                                removeStepImage={this.props.removeStepImage}
                                                courseId={this.props.match.params.id}
                                            />
                                        </TabPane>

                                        <TabPane tab="Course ratings" key="7">
                                            <CourseRatings
                                                courseId={this.props.match.params.id}
                                                fetchRatings={this.props.fetchRatings}
                                                addRating={this.props.addRating}
                                                updateRating={this.props.updateRating}
                                                deleteRating={this.props.deleteRating}
                                                courseRatings={this.props.courseRatings || []}
                                                searchUserByEmail={this.props.searchUserByEmail}
                                            />
                                        </TabPane>
                                        {
                                            course.is_from_draft
                                        && (
                                            <TabPane tab="Course Design" key="9">
                                                <CourseDesign courseDesigns={courseDesigns} />
                                            </TabPane>
                                        )
                                        }
                                        {(this.props?.authUser?.roles?.indexOf('administrator') !== -1 || this.props?.authUser?.permissions?.indexOf('fellow_operator') !== -1)
                                    && (
                                        <TabPane tab="Admin Settings" key="8">
                                            <AdminSettings
                                                course={course}
                                                updateCourseAdmin={(id, data) => this.props.updateCourseAdmin(id, data)}
                                                uploadFile={this.props.uploadFile}
                                                deleteCourse={this.props.deleteCourse}
                                                searchByCourseTags={this.props.searchByCourseTags}
                                                exportCourseData={this.props.exportCourseData}
                                                mailFellows={this.props.mailFellows}
                                                course_id={course.id}
                                                statuses={statuses}
                                                updateTags={this.props.updateTags}
                                                fetchTags={this.props.fetchTags}
                                                courseTypes={courseTypes}
                                                checkIntroByCategory={this.props.checkIntroByCategory}
                                                getData={this.getData}
                                            />
                                        </TabPane>
                                    )}
                                    </Tabs>
                                </div>
                            </div>
                        )
                        : loading
                            ? <Loading />
                            : <Empty description='Course not found' />
                }
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        adminCourse: state.adminCourse,
        authUser: state.auth.user,
        stepsImages: state.stepsImages.images,
        courseRatings: state.adminCourseRatings.ratings,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCourseById: id => dispatch(getCourseById(id)),
        updateCourse: (id, data) => dispatch(updateCourse(id, data)),
        updateCourseAdmin: (id, data) => dispatch(updateCourseAdmin(id, data)),
        checkIntroByCategory: category_id => dispatch(checkIntroByCategory(category_id)),

        addLab: data => dispatch(addLab(data)),
        deleteLab: id => dispatch(deleteLab(id)),
        editLab: (id, data) => dispatch(editLab(id, data)),
        uploadFile: (file, folder) => dispatch(uploadFile(file, folder)),
        updateQuiz: (id, data) => dispatch(updateQuiz(id, data)),
        createQuiz: data => dispatch(createQuiz(data)),
        deleteQuiz: id => dispatch(deleteQuiz(id)),
        saveAllQuizzes: (course_id, data) => dispatch(saveAllQuizzes(course_id, data)),
        saveSignature: (lab_id, signature) => dispatch(saveSignature(lab_id, signature)),
        searchByEmail: (email, fellowOnly) => dispatch(searchByEmail(email, fellowOnly)),
        addAuthor: (email, course_id) => dispatch(addAuthor(email, course_id)),
        removeAuthor: (user_id, course_id) => dispatch(removeAuthor(user_id, course_id)),
        deleteCourse: course_id => dispatch(deleteCourse(course_id)),
        exportCourseData: course_id => dispatch(exportCourseData(course_id)),

        fetchStepsImages: course_id => dispatch(fetchStepsImages(course_id)),
        uploadStepImage: (course_id, image) => dispatch(uploadStepImage(course_id, image)),
        removeStepImage: id => dispatch(removeStepImage(id)),

        fetchRatings: course_id => dispatch(fetchRatings(course_id)),
        addRating: (course_id, data) => dispatch(addRating(course_id, data)),
        updateRating: (id, data) => dispatch(updateRating(id, data)),
        deleteRating: id => dispatch(deleteRating(id)),
        searchUserByEmail: email => dispatch(searchUserByEmail(email)),
        searchByCourseTags: keyword => dispatch(searchByCourseTags(keyword)),
        updateTags: data => dispatch(updateTags(data)),
        fetchTags: () => dispatch(fetchTags()),
        fetchCourseDesigns: course_id => dispatch(fetchCourseDesigns(course_id)),
        mailFellows: (course_id, data) => dispatch(mailFellows(course_id, data)),
        getCourseTypes: () => dispatch(getCourseTypes()),
    };
}

export { EditCourse };
export default connect(mapStateToProps, mapDispatchToProps)(EditCourse);
