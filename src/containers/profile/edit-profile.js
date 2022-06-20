import React from 'react';
import { Tabs } from 'antd';
import MenageProfile from '../../components/profile/MenageProfile';
import Preferences from '../../components/profile/Preferences/Preferences';
import InterestedCourses from '../../components/profile/InterestedCourses/InterestedCourses';
import Referrals from '../../components/profile/referrals/Referrals';
import BillingAndSubscriptions from '../../components/profile/billing-and-subscriptions/BillingAndSubscriptions';

const { TabPane } = Tabs;

class EditProfile extends React.Component {
    componentDidMount() {
        // Get the campaign information about referrals and whether the user has any referrals
        const { getReferralCampaign, fetchReferrals } = this.props;
        getReferralCampaign().catch(console.error);
        fetchReferrals().catch(console.error);
    }

    referralsTab() {
        const {
            referrals, fetchReferrals, createReferral, deleteReferral, referralsCampaignActive,
        } = this.props;

        if (referralsCampaignActive // If the campaign is active
            || (referrals && referrals.data && referrals.data.length) // OR there are referrals
        ) {
            return (
                <TabPane tab="Referrals" key="referrals">
                    <Referrals
                        referrals={referrals}
                        referralsCampaignActive={referralsCampaignActive}
                        fetchReferrals={fetchReferrals}
                        createReferral={createReferral}
                        deleteReferral={deleteReferral}
                    />
                </TabPane>
            );
        }
        return null;
    }

    render() {
        const {
            authUser,
            editUserProfile,
            history,
            preferences,
            getPreferences,
            updatePreferences,
            searchByCourseTags,
            getCCInfo,
            updateCreditCard,
            deleteCreditCard,
            getPlannedCourses,
            notifyCourses,
            deleteNotifyCourse,
            subscriptionCustomerPortalUrl,
            createSubscriptionCustomerPortal,
        } = this.props;

        return (

            <Tabs defaultActiveKey="1" animated={false}>
                <TabPane tab="Edit Profile" key="edit-profile">
                    <h1>Edit Profile</h1>
                    <MenageProfile
                        authUser={authUser}
                        editProfile={data => editUserProfile(data)}
                        focusInput={history.location.state}
                    />
                </TabPane>
                <TabPane tab="Preferences" key="preferences">
                    <h1>Preferences</h1>
                    <Preferences
                        preferences={preferences}
                        getPreferences={getPreferences}
                        updatePreferences={updatePreferences}
                        searchByCourseTags={searchByCourseTags}
                    />
                </TabPane>

                <TabPane tab="Interested Courses" key="interested-courses">
                    <InterestedCourses
                        getPlannedCourses={getPlannedCourses}
                        notifyCourses={notifyCourses}
                        deleteNotifyCourse={deleteNotifyCourse}
                    />
                </TabPane>
                {/* Disabled subscription as part of ATP-2308 */
                    !process.env.REACT_APP_DISABLE_SUBSCRIPTIONS
                 && (
                     <TabPane tab="Billing and Subscriptions" key="billing-and-subscriptions">
                         <BillingAndSubscriptions
                             subscriptionCustomerPortalUrl={subscriptionCustomerPortalUrl}
                             createSubscriptionCustomerPortal={createSubscriptionCustomerPortal}
                             getCCInfo={getCCInfo}
                             preferences={preferences}
                             updateCreditCard={updateCreditCard}
                             deleteCreditCard={deleteCreditCard}
                         />
                     </TabPane>
                 )
                }
                {this.referralsTab()}
            </Tabs>
        );
    }
}

export default EditProfile;
