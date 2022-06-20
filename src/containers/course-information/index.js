import { connect } from 'react-redux';
import CourseInformation from './course-information';
import { getCourseById, createActiveCourse, getExamCourseById } from '../../store/actions/course';
import { adminCreateActiveCourse } from '../../store/actions/admin/course';
import { getAuthUser } from '../../store/actions/auth';
import { courseAccessRequest, requestCourseFromTeam } from '../../store/actions/coursePayment';
import { getUserSubscriptionsInformation } from '../../store/actions/tokenSubscriptions';
import { getCampaign } from '../../store/actions/campaign';
import { getCurrentTokenBalance } from '../../store/actions/tokenWallet';

const mapStateToProps = state => ({
    course: state.course,
    user: state.auth.user,
    tokenBalance: state.tokenWallet.tokenBalance,
});

const mapDispatchToProps = dispatch => ({
    getCourseById: id => dispatch(getCourseById(id)),
    adminCreateActiveCourse: courseId => dispatch(adminCreateActiveCourse(courseId)),
    courseAccessRequest: courseId => dispatch(courseAccessRequest(courseId)),
    createActiveCourse: (courseId, fromSubscription) => dispatch(createActiveCourse(courseId, fromSubscription)),
    getAuthUser: () => dispatch(getAuthUser()),
    getCampaign: id => dispatch(getCampaign(id)),
    getUserSubscriptionsInformation: () => dispatch(getUserSubscriptionsInformation()),
    getCurrentTokenBalance: () => dispatch(getCurrentTokenBalance()),
    requestCourseFromTeam: (courseId, teamId) => dispatch(requestCourseFromTeam(courseId, teamId)),
    getExamCourseById: id => dispatch(getExamCourseById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseInformation);
