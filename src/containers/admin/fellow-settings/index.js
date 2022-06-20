import { connect } from 'react-redux';
import {
    addGoldenStandardSlug,
    createCourseScenarios,
    createFellow,
    createLabBlock,
    deleteCourseScenarios,
    deleteFellow,
    deleteLabBlocks,
    fetchFellowSettings,
    getFellowGuideLines,
    getFellowNews,
    getGoldenStandardTag,
    sendEmailFellows,
    sendTestEmail,
    updateCourseScenarios,
    updateFellow,
    updateFellowGuidelines,
    updateFellowNews,
    updateLabBlock,
    uploadImage,
} from '../../../store/actions/admin/fellowSettings';
import {
    createCategory,
    createCourse,
    deleteCategory,
    fetchCategories, getCourseTemplates, getCourseTypes,
    uploadFile,
} from '../../../store/actions/admin/course';
import { fetchTags, updateTags } from '../../../store/actions/admin/tags';
import { searchByCourseTags } from '../../../store/actions/preferences';
import FellowSettings from './fellowSettings';

const mapStateToProps = state => ({
    adminFellowSettings: state.adminFellowSettings,
    categories: state.adminCourse.categories,
    courseTemplates: state.adminCourse.courseTemplates,
    courseTypes: state.adminCourse.courseTypes,
});

const mapDispatchToProps = dispatch => ({
    fetchFellowSettings: (searchText, dataType) => dispatch(fetchFellowSettings(searchText, dataType)),
    createFellow: data => dispatch(createFellow(data)),
    updateFellow: data => dispatch(updateFellow(data)),
    deleteFellow: id => dispatch(deleteFellow(id)),
    uploadImage: (file, folder) => dispatch(uploadImage(file, folder)),
    getFellowGuideLines: () => dispatch(getFellowGuideLines()),
    updateFellowGuidelines: data => dispatch(updateFellowGuidelines(data)),
    createLabBlock: data => dispatch(createLabBlock(data)),
    updateLabBlock: (id, data) => dispatch(updateLabBlock(id, data)),
    deleteLabBlocks: id => dispatch(deleteLabBlocks(id)),
    fetchCategories: () => dispatch(fetchCategories()),
    createCourseScenarios: data => dispatch(createCourseScenarios(data)),
    updateCourseScenarios: (id, data) => dispatch(updateCourseScenarios(id, data)),
    deleteCourseScenarios: id => dispatch(deleteCourseScenarios(id)),
    sendTestEmail: (email, data) => dispatch(sendTestEmail(email, data)),
    sendEmailFellows: data => dispatch(sendEmailFellows(data)),
    createCategory: data => dispatch(createCategory(data)),
    deleteCategory: (index, id) => dispatch(deleteCategory(index, id)),
    createCourse: data => dispatch(createCourse(data)),
    uploadFile: (file, folder) => dispatch(uploadFile(file, folder)),
    getCourseTemplates: () => dispatch(getCourseTemplates()),
    updateTags: data => dispatch(updateTags(data)),
    fetchTags: () => dispatch(fetchTags()),
    searchByCourseTags: keyword => dispatch(searchByCourseTags(keyword)),
    getFellowNews: () => dispatch(getFellowNews()),
    updateFellowNews: data => dispatch(updateFellowNews(data)),
    addGoldenStandardSlug: data => dispatch(addGoldenStandardSlug(data)),
    getGoldenStandardTag: () => dispatch(getGoldenStandardTag()),
    getCourseTypes: () => dispatch(getCourseTypes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FellowSettings);
