import React, { Component } from 'react';
import { message, Modal } from 'antd';
import { connect } from 'react-redux';
import {
    addNotification, clearUnreadNotifications,
    deleteNotification,
    getNotifications, notificationSeenById,
    notificationsSeen,
} from '../../store/actions/notifications';
import NotificationsGrid from '../../components/notifications/notificationsGrid';
import getWs from '../../services/socket';

const confirmModal = Modal.confirm;

class Notifications extends Component {
    state = {
        notifications: [],
    }

    componentDidMount() {
        const loader = message.loading('Loading..', 0);
        const { user, notifications } = this.props;
        this.props.getNotifications()
            .then(res => {
                if (res === true) {
                    loader();
                } else {
                    message.error(res.message);
                }
            });
        if (getWs()) {
            try {
                getWs().getSubscription(`room:${user.id}`).on('message', message => {
                    const { content } = message;
                    this.props.addNotification(content);
                });
            } catch (e) {
                console.log(e);
            }
        }

        // this.filterNotifications(notifications)
        this.setState({
            notifications,
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.notifications !== prevState.notifications) {
            return { notifications: nextProps.notifications };
        }
        return null;
    }

    deleteNotification = id => {
        confirmModal({
            title: 'Are you sure you want to delete this notification?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.props.deleteNotification(id).then(res => {
                    if (res === true) {
                        message.success('Deleted!');
                    } else {
                        message.error(res.message);
                    }
                });
            },
        });
    }

    // filterNotifications = (notifications) => {
    //
    //     const filtered = notifications ? notifications.sort((a,b) => {
    //         if (a.seen > b.seen) {
    //             return 1
    //         }
    //         if (a.seen < b.seen) {
    //             return -1
    //         }
    //         return 0
    //     }) : []
    //     this.setState({
    //         notifications: filtered
    //     })
    // }

    render() {
        const { notifications } = this.state;

        return (
            <>
                <NotificationsGrid
                    notifications={notifications}
                    deleteNotification={id => this.deleteNotification(id)}
                    notificationSeenById={id => this.props.notificationSeenById(id)}
                />
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        notifications: state.notifications.allNotifications,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getNotifications: () => dispatch(getNotifications()),
        addNotification: data => dispatch(addNotification(data)),
        notificationsSeen: () => dispatch(notificationsSeen()),
        deleteNotification: id => dispatch(deleteNotification(id)),
        clearUnreadNotifications: () => dispatch(clearUnreadNotifications()),
        notificationSeenById: id => dispatch(notificationSeenById(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
