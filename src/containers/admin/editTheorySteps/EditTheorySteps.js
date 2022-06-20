import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import {
    updateTheory,
    uploadFile,
    getCourseTheory,
    parseTheoryFromCsv,
    storeSavedComponent,
    fetchFavoriteComponents,
    storeFavoriteStep,
    fetchFavoriteSteps,
    deleteFavoriteStep,

} from '../../../store/actions/admin/theory';
import { getAvailableStepImages } from '../../../store/actions/stepsImages';
import { getCourseById } from '../../../store/actions/admin/course';
import { getLearningPaths } from '../../../store/actions/learningPath';
import './editSteps.scss';
import EditSteps from '../../../components/admin/editSteps/EditSteps';
import {
    updateSteps, updateStepContent, updateIsCompulsory, removeAllCompulsorySteps,
} from '../../../store/actions/admin/goldenStandard';

class EditTheorySteps extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            course_id: 0,
            theory_title: '',
            theory_desc: '',
            steps: [],
            loadingSteps: false,
            isTemplate: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        const { id } = this.props.match.params;
        this.loader = message.loading('Loading..', 0);
        this.setState({ loadingSteps: true });

        this.props.getCourseTheory(id).then(res => {
            this.loader();
            if (res) {
                const { theorySteps } = this.props;
                this.setState({
                    course_id: theorySteps.course_id,
                    theory_title: theorySteps.title,
                    theory_desc: theorySteps.desc,
                    steps: theorySteps.content,
                    loadingSteps: false,
                });
            }
            if (this._isMounted) {
                this.props.getAvailableStepImages(id);
            }
            this.props.getCourseById(id).then(res);
        });
        this.props.getLearningPaths();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    updateTheorySteps = () => {
        const { theorySteps } = this.props;
        this.setState({
            steps: theorySteps.content,
        });
    }

    render() {
        const {
            steps, theory_title, theory_desc, loadingSteps,
        } = this.state;
        const isAdmin = this.props.user.roles.findIndex(role => role === 'administrator') !== -1;

        return (
            <EditSteps
                steps={steps}
                steps_images={this.props.steps_images || []}
                type="theory"
                updateTheorySteps={this.updateTheorySteps}
                theory={{ theory_title, theory_desc }}
                uploadFile={this.props.uploadFile}
                saveSteps={this.props.updateTheory}
                id={this.props.match.params.id}
                parseCsv={this.props.parseTheoryFromCsv}
                isAdmin={isAdmin}
                storeSavedComponent={this.props.storeSavedComponent}
                favorites={this.props.favorites}
                fetchFavoriteComponents={this.props.fetchFavoriteComponents}
                history={this.props.history}
                course_id={this.props.match.params.id}
                loadingSteps={loadingSteps}
                storeFavoriteStep={this.props.storeFavoriteStep}
                fetchFavoriteSteps={this.props.fetchFavoriteSteps}
                favoriteSteps={this.props.favoriteSteps}
                deleteFavoriteStep={this.props.deleteFavoriteStep}
                isTemplate={this.props.course ? this.props.course.is_template : 0}
                updateSteps={this.props.updateSteps}
                updateStepContent={this.props.updateStepContent}
                updateIsCompulsory={this.props.updateIsCompulsory}
                removeAllCompulsorySteps={this.props.removeAllCompulsorySteps}
                learningPaths={this.props.learningPaths}
                user={this.props.user}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        chapters: state.chapters,
        user: state.auth.user,
        favorites: state.adminLabs.favoriteComponents,
        steps_images: state.stepsImages.images,
        favoriteSteps: state.adminLabs.favoriteSteps,
        theorySteps: state.adminLabs.theoryLabs,
        course: state.adminCourse.course,
        learningPaths: state.learningPathData.learningPaths,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCourseTheory: course_id => dispatch(getCourseTheory(course_id)),
        updateTheory: (course_id, data) => dispatch(updateTheory(course_id, data)),
        uploadFile: (file, folder) => dispatch(uploadFile(file, folder)),
        parseTheoryFromCsv: file => dispatch(parseTheoryFromCsv(file)),
        storeSavedComponent: data => dispatch(storeSavedComponent(data)),
        fetchFavoriteComponents: title => dispatch(fetchFavoriteComponents(title)),
        getAvailableStepImages: course_id => dispatch(getAvailableStepImages(course_id)),
        storeFavoriteStep: data => dispatch(storeFavoriteStep(data)),
        fetchFavoriteSteps: title => dispatch(fetchFavoriteSteps(title)),
        deleteFavoriteStep: id => dispatch(deleteFavoriteStep(id)),
        getCourseById: id => dispatch(getCourseById(id)),
        updateSteps: data => dispatch(updateSteps(data)),
        updateStepContent: data => dispatch(updateStepContent(data)),
        updateIsCompulsory: checked => dispatch(updateIsCompulsory(checked)),
        removeAllCompulsorySteps: data => dispatch(removeAllCompulsorySteps(data)),
        getLearningPaths: () => dispatch(getLearningPaths()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTheorySteps);
