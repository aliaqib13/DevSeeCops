import React, { Component } from 'react';
import {
    Button, Icon, Typography, Table, message,
} from 'antd';
import { Link } from 'react-router-dom';
import CreateEventModal from '../create-event-modal';
import EventUsersDrawer from '../event-users-drawer';
import Loading from '../../../Loading/Loading';

const { Title } = Typography;
const { Column } = Table;

class EventAdministration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createEventModalVisible: false,
            loadingDrawer: false,
            drawerVisible: false,
            current_event_id: '',
            loading: false,
        };
        this.props.getEvents();
    }

    getData = () => {
        this.setState({ loading: true });
        this.props.getEvents().then(() => {
            this.setState({ loading: false });
        });
    }

    toggleCreateModal = () => {
        this.setState({ createEventModalVisible: !this.state.createEventModalVisible });
    }

    showEventUsersDrawer = event_id => {
        const loader = message.loading('Loading..', 0);
        this.setState({ loadingDrawer: true, drawerVisible: true, current_event_id: event_id });
        this.props.getEventUsers(event_id, 1, 10).then(res => {
            loader();
            this.setState({ loadingDrawer: false });
        });
    }

    render() {
        const {
            createEventModalVisible, loadingDrawer, drawerVisible, current_event_id, loading,
        } = this.state;
        const {
            coursesForEvent, getCourses, uploadEventImage, createEvent, events,
            getEvents, getEventUsers, eventUsers, removeUserFromEvent, assignEvent,
            assignEventToAll, isAdmin, createAndSendNotification, eventTypes,
        } = this.props;

        return (
            <>
                <div className="course-users-container">
                    <div>
                        <Title>
                            Event Administration
                        </Title>
                        {isAdmin && (
                            <Button onClick={this.toggleCreateModal}>
                                Create Event
                                <Icon type="plus-circle" />
                            </Button>
                        )}
                    </div>
                    {!loading ? (
                        <div>
                            <Table size="lg" loading={false} dataSource={events} rowKey={item => item.id} pagination={false}>
                                <Column
                                    title="Image"
                                    key="image"
                                    className="table-image-row"
                                    render={(text, record) => (<img src={record.image} alt="course" />)}
                                />
                                <Column title="Name" key="name" dataIndex="name" />
                                <Column
                                    title="Users awaiting assignment"
                                    key="users_awaiting_assignment"
                                    render={(text, record) => record.eventUsers.filter(item => !item.is_assigned).length}
                                />
                                <Column
                                    title="Users progress"
                                    key="users_progress"
                                    render={(text, record) => (
                                        <Link to={`/platform/event-administration/users-progress/${record.id}`}>
                                            <Button>
                                                View
                                                {' '}
                                                <Icon type="user" />
                                            </Button>
                                        </Link>
                                    )}
                                />
                                <Column
                                    title="Certificates"
                                    key="certificates"
                                    render={(text, record) => (
                                        <Link to={`/platform/event-administration/certificates/${record.id}`}>
                                            <Button>
                                                View
                                                {' '}
                                                <Icon type="safety-certificate" />
                                            </Button>
                                        </Link>
                                    )}
                                />
                                <Column
                                    title="CMS"
                                    key="cms"
                                    render={(text, record) => (
                                        <Link to={`/platform/admin/edit-event/${record.id}`}>
                                            <Button className="edit-course-bnt" name="edit-event" shape="circle" icon="edit" />
                                        </Link>
                                    )}
                                />
                                <Column
                                    title="Total number of users"
                                    key="total_number_of_users"
                                    render={(text, record) => (
                                        <Button type="link" onClick={() => this.showEventUsersDrawer(record.id)}>
                                            {record.eventUsers.length}
                                            {' '}
                                            <Icon type="right" />
                                        </Button>
                                    )}
                                />
                            </Table>
                        </div>
                    ) : <Loading />}
                    <CreateEventModal
                        onClose={this.toggleCreateModal}
                        visible={createEventModalVisible}
                        getCourses={getCourses}
                        coursesForEvent={coursesForEvent}
                        uploadEventImage={uploadEventImage}
                        createEvent={createEvent}
                        getEvents={getEvents}
                        eventTypes={eventTypes}
                    />
                    <EventUsersDrawer
                        onClose={() => {
                            this.getData();
                            this.setState({ drawerVisible: false });
                        }}
                        loadingDrawer={loadingDrawer}
                        visible={drawerVisible}
                        getEventUsers={getEventUsers}
                        eventUsers={eventUsers}
                        event_id={current_event_id}
                        removeUserFromEvent={removeUserFromEvent}
                        assignEvent={assignEvent}
                        assignEventToAll={assignEventToAll}
                        createAndSendNotification={createAndSendNotification}
                    />
                </div>
            </>
        );
    }
}

export default EventAdministration;
