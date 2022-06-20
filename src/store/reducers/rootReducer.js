import { combineReducers } from 'redux';
import coursesReducer from './coursesReducer';
import courseReducer from './courseReducer';
import authReducer from './authReducer';
import chaptersReducer from './chaptersReducer';
import labsReducer from './labsReducer';
import activeCourseReducer from './activeCourseReducer';
import HomePageReducer from './homePageReducer';
import quizReducer from './quizReducer';
import certificateReducer from './certificateReducer';
import tutorialReducer from './tutorialReducer';
import preferencesReducer from './preferencesReducer';
import fellowGalleryReducer from './admin/fellowGalleryReducer';
import stepsImagesReducer from './stepsImagesReducer';
import fellowAreaReducer from './fellowAreaReducer';
import generalNotificationReducer from './generalNotificationReducer';
import betaTestInstructionReducer from './betaTestInstructionsReducer';
import eventsReducer from './eventsReducer';
import helpReducer from './helpReducer';

import adminLabsReducer from './admin/adminLabsReducer';
import adminUsersReducer from './admin/adminUsersReducer';
import adminCourseReducer from './admin/adminCourseReducer';
import adminJobsReducer from './admin/adminJobsReducer';
import adminActiveLabsHistory from './admin/adminActiveLabsHistoryReducer';
import adminSettingsReducer from './admin/adminSettingsReducer';
import adminCertificateReducer from './admin/adminCertificatesReducer';
import adminCourseAdministrationReducer from './admin/adminCourseAdministrationReducer';
import adminFellowAreaReducer from './admin/adminFellowAreaReducer';
import adminAccessRequestsReducer from './admin/adminAccessRequestsReducer';
import adminCourseRatingsReducer from './admin/adminCourseRatingsReducer';
import adminPaymentReducer from './admin/adminPaymentReducer';
import adminFellowSettingsReducer from './admin/adminFellowSettingsReducer';
import adminPostsReducer from './admin/adminPostsReducer';
import adminCampaignReducer from './admin/adminCampaignReducer';
import adminCourseInterestsReducer from './admin/adminCourseInterestsReducer';

import publicCoursesReducer from './public/publicCoursesReducer';
import notificationsReducer from './notificationsReducer';
import publicCheckCertificateReducer from './public/publicCheckCertificateReducer';
import publicEventsReducer from './public/publicEventsReducer';
import adminUserStatisticsReducer from './admin/adminUserStatisticsReducer';
import adminEventAdministrationReducer from './admin/adminEventAdministrationReducer';
import learningPathReducer from './learningPathReducer';
import referralReducer from './referralReducer';
import campaignReducer from './campaignReducer';
import tokenWalletReducer from './tokenWalletReducer';
import tokenSubscriptionsReducer from './tokenSubscriptionsReducer';

export default combineReducers({
    auth: authReducer,
    courses: coursesReducer,
    course: courseReducer,
    chapters: chaptersReducer,
    labs: labsReducer,
    quiz: quizReducer,
    activeCourse: activeCourseReducer,
    tutorial: tutorialReducer,
    homePage: HomePageReducer,
    certificate: certificateReducer,
    preferences: preferencesReducer,
    fellowGallery: fellowGalleryReducer,
    stepsImages: stepsImagesReducer,
    fellowArea: fellowAreaReducer,
    notifications: notificationsReducer,
    generalNotification: generalNotificationReducer,
    betaTest: betaTestInstructionReducer,
    help: helpReducer,

    adminAccessRequests: adminAccessRequestsReducer,
    adminLabs: adminLabsReducer,
    adminUsers: adminUsersReducer,
    adminCourse: adminCourseReducer,
    adminJobs: adminJobsReducer,
    adminActiveLabsHistory,
    adminSettings: adminSettingsReducer,
    adminCertificates: adminCertificateReducer,
    adminCourseAdministration: adminCourseAdministrationReducer,
    adminFellowArea: adminFellowAreaReducer,
    adminCourseRatings: adminCourseRatingsReducer,
    adminPayment: adminPaymentReducer,
    adminUserStatistics: adminUserStatisticsReducer,
    adminFellowSettings: adminFellowSettingsReducer,
    adminPosts: adminPostsReducer,
    adminCourseInterests: adminCourseInterestsReducer,

    publicCourses: publicCoursesReducer,
    publicCheckCertificate: publicCheckCertificateReducer,
    publicEvents: publicEventsReducer,
    adminEventAdministration: adminEventAdministrationReducer,
    events: eventsReducer,
    learningPathData: learningPathReducer,
    referrals: referralReducer,
    adminCampaigns: adminCampaignReducer,
    campaigns: campaignReducer,
    tokenWallet: tokenWalletReducer,
    tokenSubscriptions: tokenSubscriptionsReducer,
});
