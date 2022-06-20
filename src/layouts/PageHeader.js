import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Avatar, Icon, Layout, Tooltip, Menu, Dropdown, Badge, message,
} from 'antd';
import axios from 'axios';
import './PageHeader.scss';
import { Link, NavLink, withRouter } from 'react-router-dom';
import moment from 'moment';
import Marquee from 'react-double-marquee';
import getWs from '../services/socket';
import { getCurrentTokenBalance } from '../store/actions/tokenWallet';

const { Header } = Layout;
const AntdMessage = message;

class PageHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNotificationsCount: true,
            offline: false,
        };
    }

    componentDidMount() {
        const { getUnreadNotifications, fetchGeneralNotification, getCurrentTokenBalance } = this.props;
        if (getWs()) {
            const ws = getWs();
            if (!ws.ws.url.includes(localStorage.getItem('token'))) {
                ws.close();
                ws.on('close', () => {
                    ws.withJwtToken(localStorage.getItem('token'))
                        .connect();
                    this.connectSocket(ws);
                });
            }
        }
        getUnreadNotifications().then(res => {
            if (res !== true) {
                message.error(res.message);
            }
        });
        fetchGeneralNotification().then(() => {
        });
        getCurrentTokenBalance();
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        const { token } = nextProps;
        const jwtToken = this.props.token;
        if (getWs()) {
            const ws = getWs();
            try {
                if (token !== jwtToken) {
                    ws.close();
                    ws.on('close', () => {
                        ws.withJwtToken(token)
                            .connect();
                        this.connectSocket(ws);
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    connectSocket = ws => {
        const {
            user, fetchGeneralNotification, labDestroyed, addUnreadNotification,
        } = this.props;
        const messageToast = message;
        ws.subscribe(`room:${user.id}`);
        this.setState({
            offline: false,
        });
        ws.getSubscription(`room:${user.id}`).on('message', async message => {
            const { content } = message;
            if (message.type === 'DESTROYED_LAB') {
                labDestroyed(content).then(res => {
                    if (res === true) {
                        AntdMessage.success('Lab Successfully Destroyed');
                    }
                });
            }
            if (message.type === 'notification') {
                addUnreadNotification(content);
                this.setState({
                    showNotificationsCount: true,
                });
                switch (content.type) {
                case 'payment-success':
                    messageToast.success(content.content.message);
                    break;
                case 'payment-failure':
                    messageToast.error(content.content.message);
                    break;
                default:
                    break;
                }
            }
        });
        ws.getSubscription(`room:${user.id}`).on('error', error => {
            console.log(`THERE WAS A SOCKET ERROR: ${error.message}`);
            this.setState({
                offline: true,
            });
        });

        ws.subscribe('general-notification');
        ws.getSubscription('general-notification').on('message', message => {
            const { content } = message;
            fetchGeneralNotification(content);
        });
        ws.getSubscription('general-notification').on('error', error => {
            console.log(`THERE WAS A SOCKET ERROR: ${error.message}`);
            this.setState({
                offline: true,
            });
        });
    }

    logout = () => {
        const { logout } = this.props;
        logout().then(res => {
            if (res.success === true) {
                localStorage.clear();
                axios.defaults.headers.common.Authorization = undefined;
                window.location = '/';
            }
        });
    };

    notificationClickHandler = id => {
        const { history, clearUnreadNotifications } = this.props;
        clearUnreadNotifications();
        history.push('/platform/notifications');
    }

    notificationsMenu = () => {
        const { unreadNotifications } = this.props;
        return (
            <Menu>
                {
                    unreadNotifications.length ? (
                        unreadNotifications.map(notification => (
                            <Menu.Item className="antNotificationsMenuItem" onClick={() => { this.notificationClickHandler(notification.id); }} key={notification.id}>
                                {
                                    notification.content.message.length > 100 ? `${notification.content.message.substring(0, 100)}...` : notification.content.message
                                }
                            </Menu.Item>
                        ))
                    ) : <p style={{ padding: '15px' }}>No new notifications</p>
                }
            </Menu>
        );
    }

    render() {
        const { showNotificationsCount, offline } = this.state;
        const {
            menuCollapsed, isMobile, unreadNotifications, location, generalNotification, tokenBalance,
        } = this.props;
        const { firstname, lastname, activeLabs } = this.props.user;
        const filtered = activeLabs ? activeLabs.filter(activelab => activelab.status === 1) : [];
        const activeLabIndex = filtered.findIndex(item => item.progress === 'Pending');
        const activeLab = activeLabIndex >= 0 ? filtered[activeLabIndex] : filtered.length ? filtered[filtered.length - 1] : {};
        const remainingTime = activeLab && activeLab.lab_end_at ? Math.round((activeLab.lab_end_at - moment().unix()) / 60) : null;
        const { text, active } = generalNotification;

        const menu = (
            <Menu>
                <Menu.Item key="/platform/edit-profile">
                    <NavLink to="/platform/edit-profile">
                        <Icon type="setting" />
                        <span> Settings</span>
                    </NavLink>

                </Menu.Item>
                {/* Disabled subscription as part of ATP-2308 */
                    !process.env.REACT_APP_DISABLE_SUBSCRIPTIONS
                && (
                    <Menu.Item key="/platform/choose-subscription">
                        <NavLink to="/platform/choose-subscription">
                            <Icon type="file-done" />
                            <span> Subscriptions</span>
                        </NavLink>

                    </Menu.Item>
                )
                }
            </Menu>
        );

        return (
            <>
                <Header className="siteHeader" style={{ width: isMobile ? '100%' : menuCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)' }}>
                    <div className="triggerContainer">
                        <Icon
                            className="trigger"
                            type="menu-unfold"
                            onClick={this.props.toggle}
                        />
                    </div>
                    <div className="activeLabsContainer">
                        {location.pathname.indexOf('/platform/lab') && activeLab && activeLab.status === 1 && remainingTime > 0 ? (
                            <div className='activeLab'>
                                <Link to={`/platform/lab/${activeLab.id}`}>
                                    Return to your open hands-on lab:
                                    {' '}
                                    <b>{activeLab.lab.name}</b>
                                    {' '}
                                    <Icon type="clock-circle" />
                                    {' '}
                                    {remainingTime > 0 ? remainingTime : 0}
                                    {' '}
                                    minutes available
                                </Link>
                            </div>
                        ) : null}
                    </div>
                    <div className="rightContainer">
                        {
                            this.props.destroyLabStatus ? (
                                <p className="progressCount">
                                    Lab destroying
                                    <span>
                                        {this.props.destroyLabStatus}
                                        %
                                    </span>
                                </p>
                            ) : ''
                        }
                        <div>
                            {offline ? (
                                <Tooltip title="Offline mode. Please refresh the page!">
                                    <Icon className="offline" type="warning" />
                                </Tooltip>
                            ) : <></>}
                            {`${firstname} ${lastname}`}

                        </div>
                        <div className="loginIcons">
                            <div className='walletContainer'>
                                <NavLink to='/platform/wallet'>
                                    <Badge style={{ backgroundColor: '#52c41a' }} count={tokenBalance || 0} showZero>
                                        <Tooltip title='Go to my Wallet'>
                                            <Icon type="wallet" style={{ fontSize: '22px', color: '#FFFFFF' }} />
                                        </Tooltip>
                                    </Badge>
                                </NavLink>
                            </div>
                            <div className="avatarContainer">
                                <Dropdown overlay={menu}>
                                    <a className="ant-dropdown-link" href="/#" onClick={e => { e.preventDefault(); }}>
                                        <Avatar className="avatar" size="large" icon="user" />
                                    </a>
                                </Dropdown>
                            </div>
                            <div className="notificationContainer">
                                <Tooltip>
                                    <Badge count={showNotificationsCount ? unreadNotifications.length : null}>
                                        <Dropdown overlay={this.notificationsMenu} trigger={['click']}>
                                            <a href="/#" className="ant-dropdown-link">
                                                <Icon type="bell" style={{ fontSize: '22px', color: '#FFFFFF' }} />
                                            </a>
                                        </Dropdown>
                                    </Badge>
                                </Tooltip>
                            </div>
                            <div className="logoutContainer">
                                <Tooltip title="Logout">
                                    <Icon
                                        className="trigger logoutButton"
                                        type="logout"
                                        onClick={this.logout}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </Header>

                {text && active ? (
                    <div className="general-notification">
                        <Marquee direction="left" childMargin={650}>{text}</Marquee>
                    </div>
                ) : null}
            </>
        );
    }
}

const mapStateToProps = state => ({
    tokenBalance: state.tokenWallet.tokenBalance,
});

const mapDispatchToProps = dispatch => ({
    getCurrentTokenBalance: () => dispatch(getCurrentTokenBalance()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageHeader));
