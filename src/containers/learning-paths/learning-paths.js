import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLearningPaths, getIntroductionByCategory, getPlannedCourses } from '../../store/actions/learningPath';
import { createNotifyMe } from '../../store/actions/course';
import LearningPathsView from '../../components/learning-paths-view/learning-paths-view';

class LearningPaths extends Component {
    componentWillMount() {
        this.props.getLearningPaths();
    }

    render() {
        const {
            learningPaths, auth: { user }, categories, getIntroductionByCategory, createNotifyMe, introByCategory,
            getPlannedCourses, notifyCourses,
        } = this.props;
        return (
            <LearningPathsView
                learningPaths={learningPaths}
                user={user}
                createNotifyMe={createNotifyMe}
                categories={categories}
                getIntroductionByCategory={getIntroductionByCategory}
                introByCategory={introByCategory}
                getPlannedCourses={getPlannedCourses}
                notifyCourses={notifyCourses}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        learningPaths: state.learningPathData.learningPaths,
        categories: state.learningPathData.categories,
        introByCategory: state.learningPathData.introByCategory,
        notifyCourses: state.learningPathData.notifyCourses,
        auth: state.auth,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getLearningPaths: () => dispatch(getLearningPaths()),
        getIntroductionByCategory: id => dispatch(getIntroductionByCategory(id)),
        createNotifyMe: id => dispatch(createNotifyMe(id)),
        getPlannedCourses: () => dispatch(getPlannedCourses()),
    };
}

export { LearningPaths };
export default connect(mapStateToProps, mapDispatchToProps)(LearningPaths);
