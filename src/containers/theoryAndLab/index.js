import { connect } from 'react-redux';
import { fetchLabs, createLab, getJobProgress } from '../../store/actions/labs';
import { getActiveCourse } from '../../store/actions/activeCourse';
import { getAuthUser } from '../../store/actions/auth';
import TheoryAndLab from './theory-and-lab';

const mapStateToProps = state => ({
    courses: state.courses,
    labs: state.labs,
    activeCourse: state.activeCourse,
    auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
    getActiveCourse: id => dispatch(getActiveCourse(id)),
    getAuthUser: () => dispatch(getAuthUser()),
    fetchLabs: type => dispatch(fetchLabs(type)),

    createLab: data => dispatch(createLab(data)),
    getJobProgress: activeLabId => dispatch(getJobProgress(activeLabId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TheoryAndLab);
