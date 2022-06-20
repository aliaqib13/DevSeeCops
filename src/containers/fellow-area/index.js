import { connect } from 'react-redux';
import {
    fetchFellowCourses as fetchFellowCoursesAdmin, saveDrafts, getCourseRequiredFields, searchCourse,
    assignLabBlocks, getLabBlocks, createCourse, submitDrafts, clearDrafts,
} from '../../store/actions/admin/fellow-area';
import {
    notifyScenarioSelection, getDesiredCourses, createCourseProposal, sendQuestionsToSupportTeam, getProposals, fetchFellowCourses,
} from '../../store/actions/fellowArea';
import { searchByCourseTags } from '../../store/actions/preferences';
import { getFellowGuideLines, getFellowNews } from '../../store/actions/admin/fellowSettings';
import FellowArea from './fellow-area';

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        fellowArea: state.fellowArea,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchFellowCourses: id => dispatch(fetchFellowCourses(id)),
        fetchFellowCoursesAdmin: id => dispatch(fetchFellowCoursesAdmin(id)),
        saveDrafts: (drafts, userId) => dispatch(saveDrafts(drafts, userId)),
        getFellowGuideLines: () => dispatch(getFellowGuideLines()),
        searchCourse: (keyword, userId) => dispatch(searchCourse(keyword, userId)),
        assignLabBlocks: data => dispatch(assignLabBlocks(data)),
        getLabBlocks: id => dispatch(getLabBlocks(id)),
        submitDrafts: (drafts, userId) => dispatch(submitDrafts(drafts, userId)),
        getFellowNews: () => dispatch(getFellowNews()),
        notifyScenarioSelection: data => dispatch(notifyScenarioSelection(data)),
        clearDrafts: userId => dispatch(clearDrafts(userId)),
        getCourseRequiredFields: () => dispatch(getCourseRequiredFields()), // Admin
        createCourse: (course, drafts, userId) => dispatch(createCourse(course, drafts, userId)), // Admin
        searchByCourseTags: keyword => dispatch(searchByCourseTags(keyword)), // Admin
        getDesiredCourses: () => dispatch(getDesiredCourses()), // New 1/10/21
        createCourseProposal: data => dispatch(createCourseProposal(data)), // New 1/10/21
        sendQuestionsToSupportTeam: data => dispatch(sendQuestionsToSupportTeam(data)),
        getProposals: () => dispatch(getProposals()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FellowArea);
