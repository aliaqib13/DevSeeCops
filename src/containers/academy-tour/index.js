import { connect } from 'react-redux';
import AcademyTour from './academy-tour';
import { fetchIntroCourses, getIntroductionCertificate } from '../../store/actions/courses';
import { fetchPublicIntroCourses } from '../../store/actions/public/courses';
import { createActiveIntroductionCourse } from '../../store/actions/course';
import { sendCertificateToEmail } from '../../store/actions/certificate';

function mapStateToProps(state) {
    return {
        introCourses: state.courses.introCourses,
        user: state.auth.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchIntroCourses: () => dispatch(fetchIntroCourses()),
        fetchPublicIntroCourses: () => dispatch(fetchPublicIntroCourses()),
        getIntroductionCertificate: userId => dispatch(getIntroductionCertificate(userId)),
        sendCertificateToEmail: data => dispatch(sendCertificateToEmail(data)),
        createActiveIntroductionCourse: courseId => dispatch(createActiveIntroductionCourse(courseId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AcademyTour);
