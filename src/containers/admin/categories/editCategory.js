import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import EditCategoryComponent from '../../../components/admin/categories/EditCategory';
import { updateCategory, getCategory, uploadFile } from '../../../store/actions/admin/course';
import { getLearningPaths, getIntroductionByCategory } from '../../../store/actions/learningPath';
import { fetchCoursesGroupedByTypes } from '../../../store/actions/courses';
import { createLearningPath, editLearningPath, deleteLearningPath } from '../../../store/actions/admin/learningPathSettings';

class EditCategory extends Component {
    componentDidMount() {
        const {
            getCategoryFunc, getLearningPathsFunc, fetchCoursesGroupedByTypesFunc, match: { params: { id } },
        } = this.props;
        getCategoryFunc(id);
        getLearningPathsFunc();
        fetchCoursesGroupedByTypesFunc();
    }

    render() {
        const {
            updateCategoryFunc, category, coursesGroupedByTypes, learningPaths,
            createLearningPathFunc, editLearningPathFunc, deleteLearningPathFunc,
            introByCategory, getLearningPathsFunc, getIntroductionByCategoryFunc,
            uploadFileFunc, match: { params: { id } }, getCategoryFunc,
        } = this.props;
        const { standard, exam } = coursesGroupedByTypes;
        const learningPathsCategory = learningPaths.filter(item => item.category_id === Number(id));
        return (
            <EditCategoryComponent
                examCourses={exam || []}
                courses={standard || []}
                learningPaths={learningPathsCategory}
                updateCategory={updateCategoryFunc}
                createLearningPath={createLearningPathFunc}
                editLearningPath={editLearningPathFunc}
                deleteLearningPath={deleteLearningPathFunc}
                getLearningPaths={getLearningPathsFunc}
                category={category}
                introByCategory={introByCategory}
                getIntroductionByCategory={getIntroductionByCategoryFunc}
                uploadImage={uploadFileFunc}
                uploadVideo={uploadFileFunc}
                getCategory={getCategoryFunc}
            />
        );
    }
}

const mapStateToProps = state => ({
    category: state.adminCourse.category,
    learningPaths: state.learningPathData.learningPaths,
    categories: state.learningPathData.categories,
    introByCategory: state.learningPathData.introByCategory,
    coursesGroupedByTypes: state.courses.coursesGroupedByTypes,
});

const mapDispatchToProps = dispatch => ({
    updateCategoryFunc: (id, data) => dispatch(updateCategory(id, data)),
    getCategoryFunc: id => dispatch(getCategory(id)),
    getLearningPathsFunc: () => dispatch(getLearningPaths()),
    uploadFileFunc: (file, folder) => dispatch(uploadFile(file, folder)),
    createLearningPathFunc: data => dispatch(createLearningPath(data)),
    editLearningPathFunc: (id, data) => dispatch(editLearningPath(id, data)),
    deleteLearningPathFunc: id => dispatch(deleteLearningPath(id)),
    getIntroductionByCategoryFunc: id => dispatch(getIntroductionByCategory(id)),
    fetchCoursesGroupedByTypesFunc: () => dispatch(fetchCoursesGroupedByTypes()),
});

export { EditCategory };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditCategory));
