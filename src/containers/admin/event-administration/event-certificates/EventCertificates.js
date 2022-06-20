import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventCertificatesComponent from '../../../../components/admin/event-administration/event-certificates';
import { getEventCertificates } from '../../../../store/actions/admin/eventAdministration';

class EventCertificates extends Component {
    componentWillMount() {
        this.props.getEventCertificates(this.props.match.params.event_id, 1, 10);
    }

    render() {
        const { eventCertificates, getEventCertificates } = this.props;
        return (
            <EventCertificatesComponent event_id={this.props.match.params.event_id} eventCertificates={eventCertificates} getEventCertificates={getEventCertificates} />
        );
    }
}

function mapStateToProps(state) {
    return {
        eventCertificates: state.adminEventAdministration.eventCertificates,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getEventCertificates: (event_id, currentPage, perPage) => dispatch(getEventCertificates(event_id, currentPage, perPage)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCertificates);
