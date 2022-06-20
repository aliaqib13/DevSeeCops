import { connect } from 'react-redux';
import { fetchActiveLabs } from '../../../store/actions/admin/acitveLabsHistory';
import { fetchStepsImages } from '../../../store/actions/stepsImages';
import ActiveLabs from './activeLabs';

const mapStateToProps = state => ({
    adminActiveLabsHistory: state.adminActiveLabsHistory,
    stepsImages: state.stepsImages.images,
});

const mapDispatchToProps = dispatch => ({
    fetchActiveLabs: (page, pageSize) => dispatch(fetchActiveLabs(page, pageSize)),
    fetchStepsImages: courseId => dispatch(fetchStepsImages(courseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveLabs);
