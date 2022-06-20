import React, { Component } from 'react';
import { connect } from 'react-redux';
import LearningPaths from '../../../components/admin/learningPaths/LearningPaths';
import { getLearningPaths, getIntroductionByCategory } from '../../../store/actions/learningPath';
import { fetchCoursesGroupedByTypes } from '../../../store/actions/courses';
import { uploadFile } from '../../../store/actions/admin/course';
import { createLearningPath, editLearningPath, deleteLearningPath } from '../../../store/actions/admin/learningPathSettings';

class LearningPathSettings extends Component {
    componentWillMount() {
        this.getLearningPaths();
        this.props.fetchCoursesGroupedByTypes();
    }

    getLearningPaths = () => {
        this.props.getLearningPaths();
    }

    render() {
        const { standard, exam } = this.props.coursesGroupedByTypes;
        return (
            <LearningPaths
                learningPaths={this.props.learningPaths}
                categories={this.props.categories || []}
                examCourses={exam || []}
                courses={standard || []}
                uploadVideo={this.props.uploadFile}
                uploadImage={this.props.uploadFile}
                createLearningPath={this.props.createLearningPath}
                editLearningPath={this.props.editLearningPath}
                deleteLearningPath={this.props.deleteLearningPath}
                getLearningPaths={this.getLearningPaths}
                getIntroductionByCategory={this.props.getIntroductionByCategory}
                introByCategory={this.props.introByCategory}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        learningPaths: state.learningPathData.learningPaths,
        categories: state.learningPathData.categories,
        coursesGroupedByTypes: state.courses.coursesGroupedByTypes,
        introByCategory: state.learningPathData.introByCategory,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getLearningPaths: () => dispatch(getLearningPaths()),
        fetchCoursesGroupedByTypes: () => dispatch(fetchCoursesGroupedByTypes()),
        uploadFile: (file, folder) => dispatch(uploadFile(file, folder)),
        createLearningPath: data => dispatch(createLearningPath(data)),
        editLearningPath: (id, data) => dispatch(editLearningPath(id, data)),
        deleteLearningPath: id => dispatch(deleteLearningPath(id)),
        getIntroductionByCategory: id => dispatch(getIntroductionByCategory(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathSettings);
