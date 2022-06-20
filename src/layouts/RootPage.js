import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import Courses from '../containers/courses/courses';
import Chapters from '../containers/chapters/chapters';
import Lab from '../containers/lab/lab';
import Home from '../containers/home/home';
import Quiz from '../containers/quiz/quiz';
import adminActiveLabsHistory from '../containers/admin/activeLabsHistory';
import adminActiveLabs from '../containers/admin/activeLabs';
import AdminUsers from '../containers/admin/users';
import AdminTeams from '../containers/admin/teams/teams';
import CourseAdministration from '../containers/admin/course-administration/CourseAdministration';
import AdminJobs from '../containers/admin/jobs/Jobs';
import AdminJobsInfo from '../containers/admin/jobs/JobInfo';
import AdminSettings from '../containers/admin/settings/Settings';
import EditCourse from '../containers/admin/editCourse/editCourse';
import EditTheorySteps from '../containers/admin/editTheorySteps/EditTheorySteps';
import EditLabSteps from '../containers/admin/editLabSteps/EditLabSteps';
import PreviewSteps from '../containers/admin/previewSteps/previewSteps';
import TheoryAndLab from '../containers/theoryAndLab';
import CourseInformation from '../containers/course-information';
import CourseIntroduction from '../containers/course-introduction/course-introduction';
import AdminManager from '../containers/admin/manager/Manager';
import EditProfile from '../containers/profile';
import Achievements from '../containers/achievements/achievements';
import CertificateById from '../components/certificates/CertificateByIdPage/CertificateByIdPage';
import CertificateOfProgressView from '../containers/public/certificateOfProgressView/certificateOfProgressView';
import Policy from '../components/policy/Policy';
import Tutorial from '../containers/tutorial/Tutorial';
import FellowGallery from '../containers/fellow-gallery/fellow-gallery';
import CertificateManager from '../containers/admin/certificates/certificateManager';
// import AdminFellowArea from '../containers/admin/fellowArea/FellowArea';
import AdminFellowAreaUsers from '../containers/admin/fellowAreaUsers/FellowAreaUsers';
import FellowArea from '../containers/fellow-area';
import FellowEditProposal from '../containers/fellow-edit-proposal';
import AdminPayment from '../containers/admin/payment/AdminPayment';
import StateMachineLab from '../containers/admin/stateMachine/StateMachineLab';
import UserStatistics from '../containers/admin/userStatistics/userStatistics';
import FellowSettings from '../containers/admin/fellow-settings';
import './layouts.scss';

import { Layout } from 'antd';
import Notifications from '../containers/notifications/notifications';
import BetaTestInstructions from '../containers/beta-test-instructions/BetaTestInstructions';
import BetaTestSettings from '../containers/admin/betaTestSettings';
import AdminDashboard from '../containers/admin/adminPage';
import Events from '../containers/events/events';
import EventAdministration from '../containers/admin/event-administration/EventAdministration';
import EditEvent from '../containers/admin/editEvent/editEvent';
import EventInformation from '../containers/event-information/event-information';
import EventUsersProgress from '../containers/admin/event-administration/event-users-progress/EventUsersProgress';
import EventCertificates from '../containers/admin/event-administration/event-certificates/EventCertificates';
import LearningPaths from '../containers/learning-paths/learning-paths';
import AcademyTour from '../containers/academy-tour';
import Categories from '../containers/admin/categories';
import EditCategory from '../containers/admin/categories/editCategory';
import CampaignCenter from '../containers/admin/campaignCenter/CampaignCenter';
import ProposalReview from '../components/admin/course-administration/course-proposal-review/proposal-review/ProposalReview';
import TokenWallet from '../containers/token-wallet/TokenWallet';
import ChooseSubscription from '../containers/subscriptions';
import CreateTeamPage from '../components/admin/teams';

const { Content } = Layout;

class RootPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuCollapsed: false,
            isMobile: true,
        };
    }

    UNSAFE_componentWillMount() {
        if (window.innerWidth < 992) {
            this.setState({
                menuCollapsed: true,
            });
        }
    }

    componentDidMount() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    }

    toggle = () => {
        const { menuCollapsed, isMobile } = this.state;
        this.setState(prevState => ({
            menuCollapsed: !prevState.menuCollapsed,
        }));
        if (menuCollapsed && isMobile) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }

    checkMobile = () => {
        const windowWidth = window.innerWidth;
        this.setState({ isMobile: windowWidth < 992 });
    }

    closeMenu = () => {
        const { isMobile } = this.state;
        this.setState({
            menuCollapsed: true,
        });
        if (isMobile) {
            document.body.classList.remove('no-scroll');
        }
    }

    render() {
        const { menuCollapsed, isMobile } = this.state;
        const {
            user, destroyLabStatus, generalNotification, getUnreadNotifications, unreadNotifications,
            addUnreadNotification, clearUnreadNotifications, fetchGeneralNotification, labDestroyed, logout,
        } = this.props;
        let roles = [];
        let permissions = [];

        if (user) {
            roles = user.roles;
            permissions = user.permissions;
        }

        return (

            <Layout>
                <Sidebar
                    collapsed={menuCollapsed}
                    isMobile={isMobile}
                    closeMenu={this.closeMenu}
                    toggle={this.toggle}
                />
                <Layout style={{ transition: 'all 0.2s', marginLeft: isMobile ? '0' : menuCollapsed ? '80px' : '200px' }}>
                    <PageHeader
                        user={user}
                        toggle={this.toggle}
                        destroyLabStatus={destroyLabStatus}
                        menuCollapsed={menuCollapsed}
                        isMobile={isMobile}
                        generalNotification={generalNotification}
                        getUnreadNotifications={getUnreadNotifications}
                        unreadNotifications={unreadNotifications}
                        addUnreadNotification={addUnreadNotification}
                        clearUnreadNotifications={clearUnreadNotifications}
                        fetchGeneralNotification={fetchGeneralNotification}
                        token={localStorage.getItem('token')}
                        labDestroyed={labDestroyed}
                        logout={logout}
                    />

                    <Content className="root-content" style={{ marginTop: 84 }}>
                        <div className="page-content">
                            <Route path="/platform" component={Home} exact />
                            <Route path="/platform/notifications" component={Notifications} exact />
                            <Route path="/platform/learning-paths" component={LearningPaths} exact />
                            {/* <Route path="/notifications/:id" component={NotificationPage} exact/> */}
                            <Route path="/platform/quiz" component={Quiz} exact />
                            <Route path="/platform/edit-profile" component={EditProfile} exact />
                            {/* Disabled subscription as part of ATP-2308 */}
                            { !process.env.REACT_APP_DISABLE_SUBSCRIPTIONS
                                && <Route path="/platform/choose-subscription" component={ChooseSubscription} exact />}
                            <Route path="/platform/courses" component={Courses} exact />
                            <Route path="/platform/tl/:id" component={TheoryAndLab} exact />
                            <Route path="/platform/wallet" component={TokenWallet} exact />
                            <Route path="/platform/course-information/:id" render={(routeProps => <CourseInformation {...routeProps} isExam={false} />)} exact />
                            <Route path="/platform/professional-exam/:id" render={(routeProps => <CourseInformation {...routeProps} isExam />)} exact />
                            <Route path="/platform/introduction-module/:id" component={CourseIntroduction} exact />
                            <Route path="/platform/course-chapters/:id" component={Chapters} exact />
                            <Route path="/platform/lab/:id" component={Lab} exact />
                            <Route path="/platform/achievements" component={Achievements} exact />
                            <Route path="/platform/achievements/:id" component={CertificateById} exact />
                            <Route path="/platform/certificate-of-progress/:uuid" component={CertificateOfProgressView} exact />
                            <Route path="/policy" component={Policy} exact />
                            <Route path="/platform/policy" component={Policy} exact />
                            <Route path="/platform/tutorial" component={Tutorial} exact />
                            <Route path="/platform/fellow-gallery" component={FellowGallery} exact />
                            {
                                (user.is_fellow === 1 || roles.indexOf('administrator') !== -1)
                                    ? (
                                        <>
                                            <Route path="/platform/fellow-area" component={FellowArea} exact />
                                            <Route path='/platform/fellow-area/edit-proposal/:id' component={FellowEditProposal} exact />
                                        </>
                                    )
                                    : ''
                            }

                            {(roles.indexOf('beta_tester') !== -1 || roles.indexOf('administrator') !== -1)
                                ? <Route path="/platform/beta-test-instructions" component={BetaTestInstructions} /> : ''}
                            {
                                (roles.indexOf('administrator') !== -1) || (roles.indexOf('event_manager') !== -1)
                                    ? (
                                        <>
                                            <Route path="/platform/event-administration/users-progress/:event_id" component={EventUsersProgress} exact />
                                            <Route path="/platform/event-administration/certificates/:event_id" component={EventCertificates} exact />
                                            <Route path="/platform/admin/edit-event/:id" component={EditEvent} exact />
                                            <Route path="/platform/admin/categories" component={Categories} exact />
                                            <Route path="/platform/admin/categories/:id" component={EditCategory} exact />
                                        </>
                                    )
                                    : <></>
                            }
                            {
                                roles.indexOf('event_manager') !== -1
                                    ? (
                                        <>
                                            <Route path="/platform/event-administration" component={EventAdministration} exact />
                                        </>
                                    )
                                    : <></>
                            }
                            {
                                (roles.indexOf('administrator') !== -1) || (permissions.indexOf('fellow_operator') !== -1)
                                    ? (
                                        <>
                                            <Route path="/platform/admin/manager" component={AdminManager} exact />
                                            <Route path="/platform/admin/labs" component={adminActiveLabsHistory} exact />
                                            <Route path="/platform/admin/active-labs" component={adminActiveLabs} exact />
                                            <Route path="/platform/admin/users" component={AdminUsers} exact />
                                            <Route path="/platform/admin/teams" component={AdminTeams} exact />
                                            <Route path="/platform/admin/teams/create-team" component={CreateTeamPage} exact />
                                            <Route path="/platform/admin/users/:role" component={AdminUsers} exact />
                                            <Route path="/platform/admin/course-administration" component={CourseAdministration} exact />
                                            <Route path="/platform/admin/settings" component={AdminSettings} exact />
                                            <Route path="/platform/admin/jobs/:aLabId?" component={AdminJobs} exact />
                                            <Route path="/platform/admin/jobs/info" component={AdminJobsInfo} exact />
                                            <Route path="/platform/admin/certificate-manager" component={CertificateManager} exact />
                                            <Route path="/platform/admin/certificate-manager/:type" component={CertificateManager} exact />
                                            <Route path="/platform/admin/fellow-area" component={AdminFellowAreaUsers} exact />
                                            <Route path="/platform/admin/fellow-area/:id" component={FellowArea} exact />
                                            <Route path="/platform/admin/payments" component={AdminPayment} exact />
                                            <Route path="/platform/admin/user-statistics/:id" component={UserStatistics} exact />
                                            <Route path="/platform/admin/beta-test-settings" component={BetaTestSettings} />
                                            <Route path="/platform/admin/fellow-settings" component={FellowSettings} exact />
                                            <Route path="/platform/admin/campaign-center" component={CampaignCenter} exact />
                                            <Route path="/platform/admin/course-administration/proposal-review/:id" component={ProposalReview} exact />

                                        </>
                                    )
                                    : <></>
                            }
                            {
                                roles.indexOf('administrator') !== -1 || roles.indexOf('author') !== -1
                                    ? (
                                        <>
                                            <Route path="/platform/admin/edit-course/:id" component={EditCourse} exact />
                                            <Route path="/platform/admin/edit-lab-steps/:lab_id/:course_id" component={EditLabSteps} exact />
                                            <Route path="/platform/admin/edit-steps/:type/:id?" component={EditTheorySteps} exact />
                                            <Route path="/platform/admin/preview-steps/:type/:slug?/:id?" component={PreviewSteps} exact />
                                            <Route path="/platform/admin/lab-states/:id" component={StateMachineLab} exact />
                                        </>
                                    ) : <></>
                            }
                            {
                                roles.indexOf('administrator') !== -1
                                    ? (
                                        <>
                                            <Route path="/platform/admin-dashboard" component={AdminDashboard} />

                                        </>
                                    ) : <></>
                            }
                            <Route path="/platform/events" component={Events} exact />
                            <Route path="/platform/event-information/:id" component={EventInformation} exact />
                            <Route path="/platform/academy-tour" component={AcademyTour} exact />
                        </div>
                    </Content>

                    <PageFooter />

                </Layout>
            </Layout>
        );
    }
}

export default RootPage;
