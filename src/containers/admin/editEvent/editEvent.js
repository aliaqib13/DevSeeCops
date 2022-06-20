import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Tabs, Empty } from 'antd';
import { getEventById } from '../../../store/actions/events';
import {
    getCourses, updateEvent, deleteEvent, sendTestEmail,
    sendEventEmails, deleteEventEmails, addEventManager,
    removeEventManager, removeEventEmail, getEventTypes,
} from '../../../store/actions/admin/eventAdministration';
import { searchUserByEmail } from '../../../store/actions/admin/courseRatings';
import { searchByEmail } from '../../../store/actions/admin/users';
import Edit from '../../../components/admin/editEvent/edit/EditEvent';
import InviteUsers from '../../../components/admin/editEvent/invite/InviteUsers';
import EventManagers from '../../../components/admin/editEvent/eventManagers/EventManagers';
import EventEmails from '../../../components/admin/editEvent/eventEmails/EventEmails';
import Loading from '../../../components/Loading/Loading';
import '../editCourse/editCourse.scss';
import { uploadFile } from '../../../store/actions/admin/course';

const { TabPane } = Tabs;

class EditEvent extends Component {
    constructor(props) {
        super(props);
        this.loader = null;
        this.state = {
            categories: [],
            activeTab: '1',
            loading: false,
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.loader = message.loading('Loading..', 0);
        this.setState({ loading: true });
        this.props.getCourses();
        this.props.getEventTypes();
        this.props.getEventById(id, true)
            .then(() => {
                this.loader();
                this.setState({ loading: false });
            });
    }

    changeTab = key => {
        this.setState({
            activeTab: `${key}`,
        });
    }

    render() {
        const {
            event, coursesForEvent, uploadFile, updateEvent, deleteEvent,
            updatedEvent, searchUserByEmail, sendTestEmail, sendEventEmails,
            deleteEventEmails, getEventById, removeEventEmail, eventTypes,
        } = this.props;
        const { loading } = this.state;

        return (
            <>
                {
                    event && !loading
                        ? (
                            <div className="editCourseContainer">
                                <div className="tabsContainer">
                                    <Tabs activeKey={this.state.activeTab} onChange={key => this.changeTab(key)}>
                                        <TabPane tab="Event" key="1">
                                            {event && (
                                                <Edit
                                                    coursesForEvent={coursesForEvent}
                                                    event={event}
                                                    isAdmin={this.props.authUser.roles.indexOf('administrator') !== -1}
                                                    uploadImage={uploadFile}
                                                    updateEvent={updateEvent}
                                                    deleteEvent={deleteEvent}
                                                    updatedEvent={updatedEvent}
                                                    deleteEventEmails={deleteEventEmails}
                                                    getEventById={getEventById}
                                                    eventTypes={eventTypes}
                                                />
                                            )}
                                        </TabPane>
                                        <TabPane tab="Invite" key="2">
                                            {event && (
                                                <InviteUsers
                                                    searchUserByEmail={searchUserByEmail}
                                                    event={event}
                                                    sendTestEmail={sendTestEmail}
                                                    sendEventEmails={sendEventEmails}
                                                />
                                            )}
                                        </TabPane>
                                        <TabPane tab="Event Managers" key="3">
                                            {event && (
                                                <EventManagers
                                                    eventManagers={event.eventManagers}
                                                    searchByEmail={this.props.searchByEmail}
                                                    addEventManager={this.props.addEventManager}
                                                    removeEventManager={this.props.removeEventManager}
                                                    event_id={this.props.match.params.id}
                                                />
                                            )}
                                        </TabPane>
                                        <TabPane tab="Event Emails" key="4">
                                            {event && (
                                                <EventEmails
                                                    eventEmails={event.eventEmails}
                                                    removeEventEmail={removeEventEmail}
                                                    getEventById={getEventById}
                                                    event_id={this.props.match.params.id}
                                                />
                                            )}
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </div>
                        )
                        : loading
                            ? <Loading />
                            : <Empty description='Event not found' />
                }
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        authUser: state.auth.user,
        coursesForEvent: state.adminEventAdministration.coursesForEvent,
        event: state.events.event,
        updatedEvent: state.adminEventAdministration.updatedEvent,
        eventTypes: state.adminEventAdministration.eventTypes,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCourses: () => dispatch(getCourses()),
        getEventById: (id, edit) => dispatch(getEventById(id, edit)),
        uploadFile: (file, folder) => dispatch(uploadFile(file, folder)),
        updateEvent: (id, data) => dispatch(updateEvent(id, data)),
        deleteEvent: id => dispatch(deleteEvent(id)),
        searchUserByEmail: input => dispatch(searchUserByEmail(input)),
        sendTestEmail: data => dispatch(sendTestEmail(data)),
        sendEventEmails: data => dispatch(sendEventEmails(data)),
        deleteEventEmails: id => dispatch(deleteEventEmails(id)),
        searchByEmail: email => dispatch(searchByEmail(email)),
        addEventManager: (email, event_id) => dispatch(addEventManager(email, event_id)),
        removeEventManager: (user_id, event_id) => dispatch(removeEventManager(user_id, event_id)),
        removeEventEmail: event_email_id => dispatch(removeEventEmail(event_email_id)),
        getEventTypes: () => dispatch(getEventTypes()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
