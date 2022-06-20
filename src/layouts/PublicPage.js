import React, { Component } from 'react';
import PublicSidebar from './PublicSidebar';
import './PublicPage.scss';
import PublicHeader from './PublicHeader';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Layout } from 'antd';
import PageFooter from './PageFooter';
import Courses from '../containers/public/courses/courses';
import AcademyTour from '../containers/academy-tour';
import CourseInformation from '../containers/public/course-information/course-information';
import CourseIntroduction from '../containers/public/course-introduction/course-introduction';
import Exam from '../containers/public/exam/exam';
import EventInformation from '../containers/public/event-information/event-information';
import CheckCertificate from '../containers/public/check-certificate/check-certificate';
import CertificateOfProgressView from '../containers/public/certificateOfProgressView/certificateOfProgressView';
import FellowGallery from '../containers/public/fellow-gallery/fellow-gallery';
import Home from '../containers/public/home/home';
import Sarah from '../containers/public/sarah/sarah';
import Dennis from '../containers/public/dennis/dennis';
import News from '../containers/public/news/news';
import ShowPost from '../containers/public/news/showPost/showPost';
import WhatWeAre from '../components/public/WhatWeAre/whatWeAre';
import Business from '../components/public/Business/business';
import Fellowship from '../components/public/Fellowship/fellowship';
import Events from '../containers/public/events/events';
import PageNotFound from '../components/public/PageNotFound/pageNotFound';
import ContactUs from '../containers/public/contact-us/contactUs';

const { Content } = Layout;

export default class PublicPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuCollapsed: false,
            theme: 'dark',
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

    toggle = () => {
        this.setState({
            menuCollapsed: !this.state.menuCollapsed,
        });
        if (this.state.menuCollapsed && this.state.isMobile) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }

    changeTheme = value => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    }

    componentDidMount() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    }

    checkMobile = () => {
        const windowWidth = window.innerWidth;
        this.setState({ isMobile: windowWidth < 992 });
    }

    closeMenu = () => {
        this.setState({
            menuCollapsed: true,
        });
        if (this.state.isMobile) {
            document.body.classList.remove('no-scroll');
        }
    }

    render() {
        const { menuCollapsed, theme, isMobile } = this.state;

        if (localStorage.getItem('token')) {
            if (window.location.pathname.includes('/certificate-of-progress')
                 || window.location.pathname.includes('/event-information')
                 || window.location.pathname.includes('/introduction-module')
                 || window.location.pathname.includes('/professional-exam')
                 || window.location.pathname.includes('/course-information')
                 || window.location.pathname.includes('/fellow-gallery')
            ) {
                const pathname = `/platform${window.location.pathname}`;
                return <Redirect to={`${pathname}`} />;
            }
        }

        return (
            <div>
                { (
                    window.location.pathname.includes('/courses')
                || window.location.pathname.includes('/course-information')
                || window.location.pathname.includes('/introduction-module')
                || window.location.pathname.includes('/professional-exam')
                || window.location.pathname.includes('/check-certificate')
                || window.location.pathname.includes('/certificate-of-progress')
                || window.location.pathname.includes('/events')
                || window.location.pathname.includes('/event-information')
                || window.location.pathname.includes('/academy-tour')
                || window.location.pathname.includes('/fellow-gallery')
                )
                    ? (
                        <Layout>
                            <PublicSidebar
                                collapsed={menuCollapsed}
                                theme={theme}
                                isMobile={isMobile}
                                closeMenu={this.closeMenu}
                                toggle={this.toggle}
                            />
                            <Layout style={{ transition: 'all 0.2s', marginLeft: isMobile ? '0' : menuCollapsed ? '80px' : '200px' }}>
                                <PublicHeader
                                    toggle={this.toggle}
                                    menuCollapsed={menuCollapsed}
                                    isMobile={isMobile}
                                />

                                <Content className="public-content" style={{ marginTop: 84 }}>
                                    <div className="page-content">
                                        <Route path="/courses" component={Courses} exact />
                                        <Route path="/course-information/:id" component={CourseInformation} exact />
                                        <Route path="/introduction-module/:id" component={CourseIntroduction} exact />
                                        <Route path="/professional-exam/:id" component={Exam} exact />
                                        <Route path="/check-certificate" component={CheckCertificate} exact />
                                        <Route path="/certificate-of-progress/:uuid" component={CertificateOfProgressView} exact />
                                        <Route path="/events" component={Events} exact />
                                        <Route path="/event-information/:id" component={EventInformation} exact />
                                        <Route path="/fellow-gallery" component={FellowGallery} exact />
                                        <Route path="/academy-tour" component={AcademyTour} exact />
                                    </div>
                                </Content>
                                <PageFooter changeTheme={this.changeTheme} theme={theme} />
                            </Layout>
                        </Layout>
                    )
                    : (
                        <div className="global-container">
                            <LandingHeader />
                            <Switch>
                                <Route path="/" component={Home} exact />
                                <Route path="/sarah" component={Sarah} exact />
                                <Route path="/dennis" component={Dennis} exact />
                                <Route path="/news" component={News} exact />
                                <Route path="/news/post/:slug" component={ShowPost} exact />
                                <Route path="/what-we-are" component={WhatWeAre} exact />
                                <Route path="/fellowship" component={Fellowship} exact />
                                <Route path="/for-business" component={Business} exact />
                                <Route path="/contact-us" component={ContactUs} exact />
                                <Route path="" component={PageNotFound} />
                            </Switch>
                            <LandingFooter />
                        </div>
                    )}
            </div>
        );
    }
}
