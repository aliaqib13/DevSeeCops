import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchLabs, labDestroyed } from '../store/actions/labs';
import { login, getAuthUser, logout } from '../store/actions/auth';
import { addUnreadNotification, clearUnreadNotifications, getUnreadNotifications } from '../store/actions/notifications';
import { fetchGeneralNotification } from '../store/actions/generalNotification';

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destroyStatus: 0,
        };
    }

    componentDidMount() {
        const { user } = this.props.auth;

        if (!user && localStorage.getItem('token')) {
            this.props.getAuthUser();
        }
    }

    render() {
        const { user } = this.props.auth;

        if (window.location.pathname.includes('/platform/courses') && !user && !localStorage.getItem('token')) {
            return <Redirect to='/courses' />;
        }

        if (window.location.pathname.includes('/platform/academy-tour') && !user && !localStorage.getItem('token')) {
            return <Redirect to='/academy-tour' />;
        }

        if (window.location.pathname.includes('/platform/admin/edit-course/') && user && !user.roles.includes('author') && !user.roles.includes('administrator')) {
            return <Redirect to='/platform/courses' />;
        }

        if (window.location.pathname.includes('/platform/fellow-gallery') && !user && !localStorage.getItem('token')) {
            return <Redirect to='/fellow-gallery' />;
        }

        if (!localStorage.getItem('token')) {
            return <Redirect to='/mfa' />;
        }
        const ChildComponent = this.props.component;
        if (this.props.auth.authenticated) {
            return (
                <ChildComponent
                    logout={this.props.logout}
                    addUnreadNotification={this.props.addUnreadNotification}
                    getUnreadNotifications={this.props.getUnreadNotifications}
                    clearUnreadNotifications={this.props.clearUnreadNotifications}
                    unreadNotifications={this.props.unreadNotifications}
                    destroyLabStatus={this.state.destroyStatus}
                    user={this.props.auth.user}
                    fetchGeneralNotification={this.props.fetchGeneralNotification}
                    generalNotification={this.props.generalNotification}
                    labDestroyed={this.props.labDestroyed}
                />
            );
        }
        return (<></>);
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    labs: state.labs,
    courses: state.courses,
    unreadNotifications: state.notifications.unreadNotifications,
    generalNotification: state.generalNotification,
});

const mapDispatchToProps = dispatch => ({
    login: data => dispatch(login(data)),
    logout: () => dispatch(logout()),
    getAuthUser: () => dispatch(getAuthUser()),
    fetchLabs: type => dispatch(fetchLabs(type)),
    getUnreadNotifications: () => dispatch(getUnreadNotifications()),
    addUnreadNotification: data => dispatch(addUnreadNotification(data)),
    clearUnreadNotifications: () => dispatch(clearUnreadNotifications()),
    fetchGeneralNotification: () => dispatch(fetchGeneralNotification()),
    labDestroyed: alab_id => dispatch(labDestroyed(alab_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
