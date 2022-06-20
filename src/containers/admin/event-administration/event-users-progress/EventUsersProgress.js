import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventUsersProgressComponent from '../../../../components/admin/event-administration/event-users-progress';
import { getEventUsersProgress } from '../../../../store/actions/admin/eventAdministration';

class EventUsersProgress extends Component {
    componentWillMount() {
        this.props.getEventUsersProgress(this.props.match.params.event_id, 1, 10);
    }

    render() {
        const { usersProgress, getEventUsersProgress } = this.props;
        return (
            <EventUsersProgressComponent event_id={this.props.match.params.event_id} usersProgress={usersProgress} getEventUsersProgress={getEventUsersProgress} />
        );
    }
}

function mapStateToProps(state) {
    return {
        usersProgress: state.adminEventAdministration.usersProgress,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getEventUsersProgress: (event_id, currentPage, perPage) => dispatch(getEventUsersProgress(event_id, currentPage, perPage)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventUsersProgress);
