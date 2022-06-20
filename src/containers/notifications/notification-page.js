import React, { Component } from 'react';
import { message, Modal } from 'antd';
import { connect } from 'react-redux';
import {
    getNotificationById, deleteNotification,
    notificationSeenById, getUnreadNotifications,
} from '../../store/actions/notifications';
import NotificationsGrid from '../../components/notifications/notificationsGrid';

const confirmModal = Modal.confirm;

class NotificationPage extends Component {
    state = {
        notification: [],
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        const { id } = this.props.match.params;
        const loader = message.loading('Loading..', 0);
        this.props.notificationSeenById(id);
        this.props.getNotificationById(id)
            .then(res => {
                this.props.getUnreadNotifications();
                if (res === true) {
                    loader();
                    const { notification } = this.props;
                    this.setState({
                        notification,
                    });
                } else {
                    message.error(res.message);
                }
            });
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
                        this.getData();
                    } else {
                        message.error(res.message);
                    }
                });
            },
        });
    }

    render() {
        const { notification } = this.state;
        const { id } = this.props.match.params;
        if (notification && notification.length && parseInt(id) !== notification[0].id) {
            this.getData();
        }

        return (
            <>
                <NotificationsGrid
                    notifications={notification}
                    deleteNotification={id => this.deleteNotification(id)}
                    singlePage
                />
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        notification: state.notifications.notification,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUnreadNotifications: () => dispatch(getUnreadNotifications()),
        getNotificationById: id => dispatch(getNotificationById(id)),
        deleteNotification: id => dispatch(deleteNotification(id)),
        notificationSeenById: id => dispatch(notificationSeenById(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage);
