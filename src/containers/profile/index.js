import { connect } from 'react-redux';
import EditProfile from './edit-profile';
import {
    getCCInfo,
    getPreferences,
    searchByCourseTags,
    updateCreditCard,
    updatePreferences,
    deleteCreditCard,
} from '../../store/actions/preferences';
import { createSubscriptionCustomerPortal } from '../../store/actions/tokenSubscriptions';
import { getAuthUser } from '../../store/actions/auth';
import { verifyCoupon } from '../../store/actions/coursePayment';
import { getPlannedCourses } from '../../store/actions/learningPath';
import { editProfile as editUserProfile } from '../../store/actions/profile';
import { deleteNotifyCourse } from '../../store/actions/course';
import { fetchReferrals, createReferral, deleteReferral } from '../../store/actions/referral';
import { getCampaign } from '../../store/actions/campaign';
import { CAMPAIGN_IDS } from '../../constants';

function mapStateToProps(state) {
    return {
        authUser: state.auth.user,
        preferences: state.preferences,
        referrals: state.referrals,
        referralsCampaignActive: !!state.campaigns[CAMPAIGN_IDS.referral]?.active,
        notifyCourses: state.learningPathData.notifyCourses,
        subscriptionCustomerPortalUrl: state.tokenSubscriptions.subscriptionCustomerPortalUrl,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        editUserProfile: data => dispatch(editUserProfile(data)),
        getPreferences: () => dispatch(getPreferences()),
        updatePreferences: data => dispatch(updatePreferences(data)),

        getCCInfo: () => dispatch(getCCInfo()),
        updateCreditCard: (token, type) => dispatch(updateCreditCard(token, type)),
        deleteCreditCard: () => dispatch(deleteCreditCard()),

        searchByCourseTags: keyword => dispatch(searchByCourseTags(keyword)),
        getAuthUser: () => dispatch(getAuthUser()),
        verifyCoupon: couponName => dispatch(verifyCoupon(couponName)),
        getPlannedCourses: () => dispatch(getPlannedCourses()),
        deleteNotifyCourse: id => dispatch(deleteNotifyCourse(id)),

        // Get referral
        getReferralCampaign: () => dispatch(getCampaign(CAMPAIGN_IDS.referral)),

        fetchReferrals: () => dispatch(fetchReferrals()),
        createReferral: email => dispatch(createReferral(email)),
        deleteReferral: id => dispatch(deleteReferral(id)),

        createSubscriptionCustomerPortal: () => dispatch(createSubscriptionCustomerPortal()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
