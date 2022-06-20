import React, { Component } from 'react';
import { Icon, Layout, Menu } from 'antd';
import { NavLink, withRouter, Link } from 'react-router-dom';
import './PublicSidebar.scss';

const { Sider } = Layout;

class Sidebar extends Component {
    render() {
        const {
            location, isMobile, collapsed, toggle, closeMenu,
        } = this.props;

        let araido_logo;
        let link_styles = null;
        if (this.props.theme === 'light') {
            araido_logo = (
                <img
                    src="/img/academy_logo.svg"
                    style={{
                        width: '55%', paddingTop: '15px', paddingBottom: '15px', marginLeft: '-7%',
                    }}
                    alt="Araido Logo"
                />
            );
            link_styles = { display: 'flex', justifyContent: 'center' };
        } else {
            araido_logo = (
                <img
                    src="/img/academy_logo_white.svg"
                    style={{
                        width: '55%', marginLeft: '19%', paddingTop: '15px', paddingBottom: '15px',
                    }}
                    alt="Araido Logo"
                />
            );
        }

        return (

            <div className="left-sidebar-container">
                <Sider
                    className="left-sidebar"
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    theme={this.props.theme}
                    collapsedWidth={isMobile ? 0 : 80}
                >
                    <div className="logo" onClick={() => { isMobile && closeMenu(); }}>
                        <Link to="/" style={link_styles}>
                            {araido_logo}
                        </Link>
                    </div>
                    {/* add correct key name for active menu items */}
                    <Menu
                        className="left-sidebar-list-items"
                        theme={this.props.theme}
                        mode="inline"
                        defaultSelectedKeys={['/']}
                        selectedKeys={[location.pathname]}
                        inlineIndent={16}
                        onClick={() => isMobile && toggle()}
                        title={null}
                    >
                        <Menu.Item key={(location.pathname.startsWith('/courses')) ? location.pathname : '/courses'}>
                            <NavLink to="/courses">
                                <Icon type="book" />
                                <span>Courses</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={(location.pathname.startsWith('/events')) ? location.pathname : '/events'}>
                            <NavLink to="/events">
                                <Icon type="book" />
                                <span>Events</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={(location.pathname.startsWith('/check-certificate')) ? location.pathname : '/check-certificate'}>
                            <NavLink to="/check-certificate">
                                <Icon type="safety-certificate" />
                                <span>Check Certificate</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={(location.pathname.startsWith('/fellow-gallery')) ? location.pathname : '/fellow-gallery'}>
                            <NavLink to="/fellow-gallery">
                                <Icon type="team" />
                                <span>Fellow Gallery</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key={(location.pathname.startsWith('/academy-tour')) ? location.pathname : '/academy-tour'}>
                            <NavLink to="/academy-tour">
                                <Icon type="book" />
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

export default withRouter(Sidebar);
