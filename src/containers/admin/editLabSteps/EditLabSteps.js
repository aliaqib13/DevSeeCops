import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { getLabSteps, updateLabSteps, getHintMessage } from '../../../store/actions/admin/labs';
import {
    addHint, deleteHint, editHint, getCourseById, uploadFile, getStateMachine,
} from '../../../store/actions/admin/course';
import EditSteps from '../../../components/admin/editSteps/EditSteps';
import {
    parseTheoryFromCsv, storeSavedComponent, fetchFavoriteComponents,
    storeFavoriteStep, fetchFavoriteSteps, deleteFavoriteStep,
} from '../../../store/actions/admin/theory';
import { getAvailableStepImages } from '../../../store/actions/stepsImages';
import {
    updateSteps, updateStepContent, updateIsCompulsory, removeAllCompulsorySteps,
} from '../../../store/actions/admin/goldenStandard';
import Loading from '../../../components/Loading/Loading';

import './EditLabSteps.scss';

class EditLabSteps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            steps: [],
            hints: [],
            loading: false,
            isTemplate: false,
        };
    }

    componentDidMount() {
        const loader = message.loading('Please Wait..', 0);
        const { lab_id, course_id } = this.props.match.params;
        this.setState({ loading: true });
        this.props.getCourseById(course_id)
            .then(res => {
                if (res === true) {
                    this.setState({
                        hints: this.props.course.hints,
                        isTemplate: this.props.course.is_template,
                    }, () => {
                        this.props.getLabSteps(lab_id).then(res => {
                            if (res) {
                                this.setState({
                                    steps: this.props.labSteps.content,
                                });
                            }
                        });
                    });

                    this.props.getAvailableStepImages(course_id);
                } else {
                    message.error('Something went wrong');
                }
                loader();
                this.setState({ loading: false });
            });
    }

    render() {
        const isAdmin = this.props.user.roles.findIndex(role => role === 'administrator') !== -1;
        const { loading } = this.state;
        return (
            <>
                {
                    this.props.labSteps && !loading
                        ? (
                            <EditSteps
                                steps={this.props.labSteps.content}
                                steps_images={this.props.steps_images || []}
                                uploadFile={this.props.uploadFile}
                                saveSteps={this.props.updateLabSteps}
                                id={this.props.match.params.lab_id}
                                hints={this.state.hints}
                                getHintMessage={this.props.getHintMessage}
                                addHint={this.props.addHint}
                                editHint={this.props.editHint}
                                deleteHint={this.props.deleteHint}
                                course_id={this.props.match.params.course_id}
                                parseCsv={this.props.parseTheoryFromCsv}
                                isAdmin={isAdmin}
                                history={this.props.history}
                                storeSavedComponent={this.props.storeSavedComponent}
                                favorites={this.props.favorites}
                                fetchFavoriteComponents={this.props.fetchFavoriteComponents}
                                storeFavoriteStep={this.props.storeFavoriteStep}
                                fetchFavoriteSteps={this.props.fetchFavoriteSteps}
                                favoriteSteps={this.props.favoriteSteps}
                                deleteFavoriteStep={this.props.deleteFavoriteStep}
                                getStateMachine={this.props.getStateMachine}
                                isTemplate={this.state.isTemplate}
                                updateSteps={this.props.updateSteps}
                                updateStepContent={this.props.updateStepContent}
                                updateIsCompulsory={this.props.updateIsCompulsory}
                                removeAllCompulsorySteps={this.props.removeAllCompulsorySteps}
                            />
                        )
                        : <Loading />
                }
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        adminLabs: state.adminLabs,
        labSteps: state.adminLabs.labSteps,
        course: state.adminCourse.course,
        user: state.auth.user,
        steps_images: state.stepsImages.images,
        favorites: state.adminLabs.favoriteComponents,
        favoriteSteps: state.adminLabs.favoriteSteps,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getLabSteps: lab_id => dispatch(getLabSteps(lab_id)),
        getCourseById: course_id => dispatch(getCourseById(course_id)),
        updateLabSteps: (lab_id, data) => dispatch(updateLabSteps(lab_id, data)),
        uploadFile: (file, folder) => dispatch(uploadFile(file, folder)),
        getHintMessage: id => dispatch(getHintMessage(id)),
        addHint: data => dispatch(addHint(data)),
        editHint: (id, data) => dispatch(editHint(id, data)),
        deleteHint: id => dispatch(deleteHint(id)),
        parseTheoryFromCsv: file => dispatch(parseTheoryFromCsv(file)),
        storeSavedComponent: data => dispatch(storeSavedComponent(data)),
        fetchFavoriteComponents: title => dispatch(fetchFavoriteComponents(title)),
        getAvailableStepImages: course_id => dispatch(getAvailableStepImages(course_id)),
        storeFavoriteStep: data => dispatch(storeFavoriteStep(data)),
        fetchFavoriteSteps: title => dispatch(fetchFavoriteSteps(title)),
        deleteFavoriteStep: id => dispatch(deleteFavoriteStep(id)),
        getStateMachine: id => dispatch(getStateMachine(id)),
        updateSteps: data => dispatch(updateSteps(data)),
        updateStepContent: data => dispatch(updateStepContent(data)),
        updateIsCompulsory: checked => dispatch(updateIsCompulsory(checked)),
        removeAllCompulsorySteps: data => dispatch(removeAllCompulsorySteps(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLabSteps);
