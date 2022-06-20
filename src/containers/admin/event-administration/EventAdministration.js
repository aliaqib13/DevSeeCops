import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventAdministrationComponent from '../../../components/admin/event-administration/event-administration';
import {
    getCourses, createEvent, getEvents, getEventUsers,
    removeUserFromEvent, assignEvent, assignEventToAll, createAndSendNotification,
} from '../../../store/actions/admin/eventAdministration';
import { uploadFile } from '../../../store/actions/admin/course';

class EventAdministration extends Component {
    render() {
        const {
            coursesForEvent, getCourses, uploadFile, createEvent,
            events, getEvents, getEventUsers, eventUsers, removeUserFromEvent,
            assignEvent, assignEventToAll, authUser, createAndSendNotification, eventTypes,
        } = this.props;

        return (
            <EventAdministrationComponent
                getCourses={getCourses}
                coursesForEvent={coursesForEvent}
                uploadEventImage={uploadFile}
                createEvent={createEvent}
                events={events}
                getEvents={getEvents}
                getEventUsers={getEventUsers}
                eventUsers={eventUsers}
                removeUserFromEvent={removeUserFromEvent}
                assignEvent={assignEvent}
                assignEventToAll={assignEventToAll}
                isAdmin={authUser.roles.indexOf('administrator') !== -1}
                createAndSendNotification={createAndSendNotification}
                eventTypes={eventTypes}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        coursesForEvent: state.adminEventAdministration.coursesForEvent,
        events: state.adminEventAdministration.events,
        eventUsers: state.adminEventAdministration.eventUsers,
        authUser: state.auth.user,
        eventTypes: state.adminEventAdministration.eventTypes,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCourses: () => dispatch(getCourses()),
        uploadFile: (file, folder) => dispatch(uploadFile(file, folder)),
        createEvent: data => dispatch(createEvent(data)),
        getEvents: () => dispatch(getEvents()),
        getEventUsers: (event_id, currentPage, perPage, searchEmail) => dispatch(getEventUsers(event_id, currentPage, perPage, searchEmail)),
        removeUserFromEvent: (event_id, user_id) => dispatch(removeUserFromEvent(event_id, user_id)),
        assignEvent: (event_id, user_id) => dispatch(assignEvent(event_id, user_id)),
        assignEventToAll: event_id => dispatch(assignEventToAll(event_id)),
        createAndSendNotification: data => dispatch(createAndSendNotification(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventAdministration);
