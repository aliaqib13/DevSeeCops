import React, { Component } from 'react';
import { Icon, Layout, Menu } from 'antd';
import { NavLink, withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import './sidebar.scss';
import ReactGA from 'react-ga';
import { CATEGORIES, ACTIONS } from '../util/GAEventConstants';

const { Sider } = Layout;
const { SubMenu } = Menu;

class Sidebar extends Component {
    goToAcademyTour = () => {
        ReactGA.event({
            category: CATEGORIES.WEBSITE_NAVIGATION,
            action: ACTIONS.ACCESSED_INTRODUCTION_TOUR_PAGE(),
            label: 'Sidebar',
        });
    }

    render() {
        const {
            auth: { user }, location, isMobile, collapsed, toggle, closeMenu, history,
        } = this.props;

        let roles = [];
        let permissions = [];
        if (user) {
            roles = user.roles;
            permissions = user.permissions;
        }

        const araidoLogo = (
            <img
                src="/img/academy_logo_white.svg"
                style={{
                    width: '55%', marginLeft: '19%', paddingTop: '15px', paddingBottom: '15px',
                }}
                alt="Araido Logo"
            />
        );

        return (

            <div className="left-sidebar-container">
                <Sider
                    className="left-sidebar"
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    theme="dark"
                    collapsedWidth={isMobile ? 0 : 80}
                >
                    <div className="logo" onClick={() => { isMobile && closeMenu(); }}>
                        <Link to="/" style={{ width: '100%' }}>
                            {araidoLogo}
                        </Link>
                    </div>
                    {/* add correct key name for active menu items */}
                    <Menu
                        className="left-sidebar-list-items"
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['/platform']}
                        selectedKeys={[location.pathname]}
                        inlineIndent={16}
                        onClick={() => isMobile && toggle()}
                        title={null}
                    >
                        <Menu.Item key="/platform">
                            <NavLink to="/platform">
                                <Icon type="home" />
                                <span>Home</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={(location.pathname.startsWith('/platform/notifications')) ? location.pathname : '/platform/notifications'}>
                            <NavLink to="/platform/notifications">
                                <Icon type="bell" />
                                <span>Notifications</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={(location.pathname.startsWith('/platform/course') || location.pathname.startsWith('/platform/admin/edit-course')) ? location.pathname : '/platform/courses'}>
                            <NavLink to="/platform/courses">
                                <Icon type="book" />
                                <span>Courses</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={(location.pathname.startsWith('/platform/learning-paths')) ? location.pathname : '/platform/learning-paths'}>
                            <NavLink to="/platform/learning-paths">
                                <Icon type="branches" />
                                <span>Learning Paths</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={(location.pathname.startsWith('/platform/achievements')) ? location.pathname : '/platform/achievements'}>
                            <NavLink to="/platform/achievements">
                                <Icon type="trophy" />
                                <span>My Achievements</span>
                            </NavLink>
                        </Menu.Item>

                        {roles.indexOf('administrator') !== -1
                            && (
                                <SubMenu
                                    key="admin-menu"
                                    title={(
                                        <span>
                                            <Icon type="user" />
                                            <span>Admin</span>
                                        </span>
                                    )}
                                    onTitleClick={() => {
                                        this.props.history.push('/platform/admin-dashboard');
                                    }}
                                >
                                    <Menu.Item key={(location.pathname.startsWith('/platform/admin/certificate-manager')) ? location.pathname : '/platform/admin/certificate-manager'}>
                                        <NavLink to="/platform/admin/certificate-manager">
                                            <Icon type="snippets" />
                                            <span>Certificates Manager</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key={(location.pathname.startsWith('/platform/admin/course-administration')) ? location.pathname : '/platform/admin/course-administration'}>
                                        <NavLink to="/platform/admin/course-administration">
                                            <Icon type="money-collect" />
                                            <span>Course Administration</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key={(location.pathname.startsWith('/platform/admin/payment')) ? location.pathname : '/platform/admin/payment'}>
                                        <NavLink to="/platform/admin/payments">
                                            <Icon type="pay-circle" />
                                            <span>Payments</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <SubMenu
                                        key="lab-menu"
                                        title={(
                                            <span>
                                                <Icon type="experiment" />
                                                <span>Labs Administration</span>
                                            </span>
                                        )}
                                        onTitleClick={() => {
                                            history.push('/platform/admin/active-labs');
                                        }}
                                    >
                                        <Menu.Item key={(location.pathname.startsWith('/platform/admin/active-labs')) ? location.pathname : '/platform/admin/active-labs'}>
                                            <NavLink to="/platform/admin/active-labs">
                                                <Icon type="share-alt" />
                                                <span>Active Labs</span>
                                            </NavLink>
                                        </Menu.Item>
                                        <Menu.Item key={(location.pathname.startsWith('/platform/admin/labs')) ? location.pathname : '/platform/admin/labs'}>
                                            <NavLink to="/platform/admin/labs">
                                                <Icon type="experiment" />
                                                <span>Labs History</span>
                                            </NavLink>
                                        </Menu.Item>
                                        <Menu.Item key={(location.pathname.startsWith('/platform/admin/job')) ? location.pathname : '/platform/admin/jobs'}>
                                            <NavLink to="/platform/admin/jobs">
                                                <Icon type="schedule" />
                                                <span>Jobs</span>
                                            </NavLink>
                                        </Menu.Item>
                                    </SubMenu>
                                    <Menu.Item key={(location.pathname.startsWith('/platform/admin/users')) ? location.pathname : '/platform/admin/users'}>
                                        <NavLink to="/platform/admin/users">
                                            <Icon type="usergroup-add" />
                                            <span>Users</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key={(location.pathname.startsWith('/platform/admin/teams')) ? location.pathname : '/platform/admin/teams'}>
                                        <NavLink to="/platform/admin/teams">
                                            <Icon type="team" />
                                            <span>Teams</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key={(location.pathname.startsWith('/platform/admin/settings')) ? location.pathname : '/platform/admin/settings'}>
                                        <NavLink to="/platform/admin/settings">
                                            <Icon type="setting" />
                                            <span>General Settings</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key={(location.pathname.startsWith('/platform/admin/fellow-settings')) ? location.pathname : '/platform/admin/fellow-settings'}>
                                        <NavLink to="/platform/admin/fellow-settings">
                                            <Icon type="setting" />
                                            <span>Fellow Settings</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key={(location.pathname.startsWith('/platform/admin/beta-test-settings')) ? location.pathname : '/platform/admin/beta-test-settings'}>
                                        <NavLink to="/platform/admin/beta-test-settings">
                                            <Icon type="setting" />
                                            <span>Beta Test Settings</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key={(location.pathname.startsWith('/platform/admin/manager')) ? location.pathname : '/platform/admin/manager'}>
                                        <NavLink to="/platform/admin/manager">
                                            <Icon type="dashboard" />
                                            <span>Manager Dashboard</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key={(location.pathname.startsWith('/platform/admin/categories')) ? location.pathname : '/platform/admin/categories'}>
                                        <NavLink to="/platform/admin/categories">
                                            <Icon type="setting" />
                                            <span>Category Settings</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key={(location.pathname.startsWith('/platform/admin/campaign-center')) ? location.pathname : '/platform/admin/campaign-center'}>
                                        <NavLink to="/platform/admin/campaign-center">
                                            <Icon type="setting" />
                                            <span>Campaign Center</span>
                                        </NavLink>
                                    </Menu.Item>
                                </SubMenu>
                            )}
                        <Menu.Item key={(location.pathname.startsWith('/platform/tutorial')) ? location.pathname : '/platform/tutorial'}>
                            <NavLink to="/platform/tutorial">
                                <Icon type="question-circle" />
                                <span>Help</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={(location.pathname.startsWith('/platform/fellow-gallery')) ? location.pathname : '/platform/fellow-gallery'}>
                            <NavLink to="/platform/fellow-gallery">
                                <Icon type="team" />
                                <span>Fellow Gallery</span>
                            </NavLink>
                        </Menu.Item>
                        {(roles.indexOf('administrator') !== -1 || user.is_fellow === 1 || permissions.indexOf('fellow_operator') !== -1)
                        && (
                            <Menu.Item
                                key={(location.pathname.startsWith((roles.indexOf('administrator') !== -1 || permissions.indexOf('fellow_operator') !== -1)
                                    ? '/platform/admin/fellow-area' : '/platform/fellow-area'))
                                    ? location.pathname : ((roles.indexOf('administrator') !== -1 || permissions.indexOf('fellow_operator') !== -1)
                                        ? '/platform/admin/fellow-area' : '/platform/fellow-area')}
                            >
                                <NavLink to={roles.indexOf('administrator') !== -1 || permissions.indexOf('fellow_operator') !== -1 ? '/platform/admin/fellow-area' : '/platform/fellow-area'}>
                                    <Icon type="team" />
                                    <span>Fellow Area</span>
                                </NavLink>
                            </Menu.Item>
                        )}
                        {(roles.indexOf('administrator') !== -1 || roles.indexOf('beta_tester') !== -1)
                        && (
                            <Menu.Item key={(location.pathname.startsWith('/platform/beta-test-instructions')) ? location.pathname : '/platform/beta-test-instructions'}>
                                <NavLink to="/platform/beta-test-instructions">
                                    <Icon type="info-circle" />
                                    <span>Beta Test Instructions</span>
                                </NavLink>
                            </Menu.Item>
                        )}
                        {roles.indexOf('administrator') === -1 && permissions.indexOf('fellow_operator') !== -1
                        && (
                            <Menu.Item key={(location.pathname.startsWith('/platform/admin/fellow-settings')) ? location.pathname : '/platform/admin/fellow-settings'}>
                                <NavLink to="/platform/admin/fellow-settings">
                                    <Icon type="setting" />
                                    <span>Fellow Settings</span>
                                </NavLink>
                            </Menu.Item>
                        )}
                        {roles.indexOf('administrator') === -1 && roles.indexOf('event_manager') !== -1
                        && (
                            <Menu.Item key={(location.pathname.startsWith('/platform/event-administration')) ? location.pathname : '/platform/event-administration'}>
                                <NavLink to="/platform/event-administration">
                                    <Icon type="calendar" />
                                    <span>Event Administration</span>
                                </NavLink>
                            </Menu.Item>
                        )}
                        <Menu.Item key={(location.pathname.startsWith('/platform/events') || location.pathname.startsWith('/platform/admin/edit-event')) ? location.pathname : '/platform/events'}>
                            <NavLink to="/platform/events">
                                <Icon type="calendar" />
                                <span>Events</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={(location.pathname.startsWith('/platform/academy-tour')) ? location.pathname : '/platform/academy-tour'}>
                            <NavLink to="/platform/academy-tour" onClick={this.goToAcademyTour}>
                                <Icon type="experiment" />
                                <span>Introduction Tour</span>
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                    <div
                        className="mobile-sidebar-close-trigger"
                        style={{ width: collapsed ? 0 : 200 }}
                        onClick={toggle}
                    >
                        <Icon type="left" style={{ opacity: collapsed ? 0 : 1 }} />
                    </div>
                </Sider>
                <div
                    className="left-sidebar-mask"
                    onClick={toggle}
                    style={{ width: !collapsed && isMobile ? '100%' : 0, opacity: !collapsed && isMobile ? 1 : 0 }}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export { Sidebar };
export default withRouter(connect(mapStateToProps)(Sidebar));
