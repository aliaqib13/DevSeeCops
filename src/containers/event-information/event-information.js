import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button, message, Icon, Empty, Tooltip,
} from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { getEventById, registerForEvent } from '../../store/actions/events';
import { COURSE_TYPE, EVENT_TYPE } from '../../constants';

class EventInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registered: false,
            loading: false,
        };
    }

    componentDidMount() {
        const { getEventById } = this.props;
        if (!this.props.preview) {
            this.setState({ loading: true });
            getEventById(this.props.match.params.id).then(() => {
                this.setState({ loading: false });
            }).catch(console.error);
        }
    }

    registerForEvent = () => {
        const { event, registerForEvent, getEventById } = this.props;
        this.setState({ loading: true });
        registerForEvent(event.id).then(res => {
            this.setState({ loading: false });
            if (res === true) {
                message.success('Successfully registered!');
                this.setState({ registered: true });
                getEventById(this.props.match.params.id);
            } else {
                message.error(res.message || res.error.message);
            }
        }).catch(console.error);
    }

    getCourseInfoHref = course => {
        const { type, id } = course;
        if (type === COURSE_TYPE.EXAM) {
            return `/professional-exam/${id}`;
        }
        if (type === COURSE_TYPE.INTRODUCTION) {
            return `/introduction-module/${id}`;
        }
        return `/course-information/${id}`;
    }

    render() {
        const { registered, loading } = this.state;
        const { user } = this.props;
        const { roles } = user;
        const event = this.props.eventPreview ? this.props.eventPreview : this.props.event;
        const EventButton = props => {
            if (loading) {
                return <Button type='primary' className='proceed-button' disabled loading={loading}>Checking Status</Button>;
            }
            if (event.end_time && new Date(event.end_time) < new Date()) {
                return <Button type='primary' className='proceed-button' disabled>Event Ended</Button>;
            }
            if (this.props.preview) {
                return <Button type='primary' className='proceed-button'>Register</Button>;
            }
            if (registered || props.registered) {
                return (
                    <Tooltip title="You have already registered for this event" key="registered-hover">
                        <Button
                            type='primary'
                            className='proceed-button'
                            style={{ cursor: 'not-allowed', color: 'rgba(0, 0, 0, 0.25)' }}
                        >
                            Already Registered
                        </Button>
                    </Tooltip>
                );
            }
            if (event.eventUsers.length >= event.user_limit && event.type === EVENT_TYPE.OPEN) {
                return <Button type='primary' className='proceed-button' disabled>Event Fully Booked</Button>;
            }
            return <Button type='primary' className='proceed-button' onClick={this.registerForEvent}>Register</Button>;
        };

        return (
            <>
                {event && event.id ? (
                    <div className="course-information-container">
                        <div className="course-information-header">
                            <div className="title">{event.name}</div>
                            <div className="content">{event.subtitle}</div>
                        </div>
                        <div className="course-information-body">
                            <div className="main" style={{ paddingTop: '15px' }}>
                                {(roles.includes('administrator') || event.eventManagers.find(item => item.user_id === user.id))
                            && (
                                <Link to={`/platform/admin/edit-event/${event.id}`}>
                                    <Button className="edit-course-bnt" style={{ float: 'right' }} name="edit-event" shape="circle" icon="edit" />
                                </Link>
                            )}
                                <div className="paragraph">
                                    <img src={event.image} alt="Event" width='200' />
                                </div>
                                <div className="paragraph">
                                    <div className="title">Event Description</div>
                                    <div className="content">{event.description || 'No Info'}</div>
                                </div>
                                <div className="paragraph">
                                    <div className="title">Event Course</div>
                                    <div className="content">
                                        {event.courses && event.courses.length
                                            ? event.courses.map((course, index) => (
                                                <div key={index}>
                                                    {index > 0 ? <br /> : ''}
                                                    <p>
                                                        Title:
                                                        <a target="_blank" rel="noopener noreferrer" href={this.getCourseInfoHref(course)}>
                                                            {' '}
                                                            {course.title}
                                                        </a>
                                                    </p>
                                                    <p>
                                                        Description:
                                                        {course.description || ' No Info'}

                                                    </p>

                                                    <div className="paragraph">
                                                        What you will learn:
                                                        {course.will_learn && course.will_learn.length
                                                            ? (
                                                                <div className="content">
                                                                    <ul className='whatYouWillLearn-list'>
                                                                        {
                                                                            course.will_learn.map((item, key) => (
                                                                                <li key={key}>
                                                                                    <Icon type="check-circle" />
                                                                                    {item}
                                                                                </li>
                                                                            ))
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            ) : ' No Info'}
                                                    </div>

                                                </div>
                                            )) : ''}
                                    </div>
                                </div>
                                <div className="course-information-meta-2">
                                    <div className="button-container">
                                        <EventButton
                                            registered={event.eventUsers && event.eventUsers.find(item => item.user_id === user.id)}
                                        />
                                        {event.eventUsers.length < event.user_limit && event.type === EVENT_TYPE.OPEN
                                        && (
                                            <p style={{ textAlign: 'center' }}>
                                                {event.user_limit - event.eventUsers.length}
                                                {' '}
                                                place(s) available
                                            </p>
                                        )}
                                    </div>
                                    <div className="course-overview-container">
                                        <div className="line">
                                            <div style={{ fontWeight: 'bold' }}>Event Start</div>
                                            <div>{event.start_time ? moment(event.start_time).format('MMM Do YYYY, h:mm a') : 'No Date'}</div>
                                        </div>
                                        <div className="line">
                                            <div style={{ fontWeight: 'bold' }}>Event End</div>
                                            <div>{event.end_time ? moment(event.end_time).format('MMM Do YYYY, h:mm a') : 'No Date'}</div>
                                        </div>
                                        {event.eventSponsors && event.eventSponsors.length
                                            ? (
                                                <div className="paragraph">
                                                    <div style={{ fontWeight: 'bold' }}>Event Sponsor</div>
                                                    <div className="content" style={{ margin: '7px' }}>
                                                        {event.eventSponsors.map((item, key) => (
                                                            <div key={key} style={{ marginTop: '7px' }}>
                                                                <img style={{ marginRight: '7px' }} src={item.logo} width='250' alt="Sponsor" />
                                                                {item.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : ''}
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar">
                                <EventButton
                                    registered={event.eventUsers && event.eventUsers.find(item => item.user_id === user.id)}
                                />
                                {event.eventUsers.length < event.user_limit && event.type === EVENT_TYPE.OPEN
                          && (
                              <p style={{ textAlign: 'center' }}>
                                  {event.user_limit - event.eventUsers.length}
                                  {' '}
                                  place(s) available
                              </p>
                          )}
                                <div className="course-overview-container">
                                    <div className="line">
                                        <div style={{ fontWeight: 'bold' }}>Event Start</div>
                                        <div>{event.start_time ? moment(event.start_time).format('MMM Do YYYY, h:mm a') : 'No Date'}</div>
                                    </div>
                                    <div className="line">
                                        <div style={{ fontWeight: 'bold' }}>Event End</div>
                                        <div>{event.end_time ? moment(event.end_time).format('MMM Do YYYY, h:mm a') : 'No Date'}</div>
                                    </div>
                                    {event.eventSponsors && event.eventSponsors.length
                                        ? (
                                            <div className="paragraph">
                                                <div className="content">
                                                    {event.eventSponsors.map((item, key) => (
                                                        <div key={key}>
                                                            <div className="line">
                                                                <div style={{ fontWeight: 'bold' }}>Event Sponsors</div>
                                                                <div>{ item.name }</div>
                                                            </div>
                                                            {item.logo ? <img style={{ marginRight: '7px' }} src={item.logo} width='250' alt="Sponsor" /> : ''}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <Empty description={<span>Event not found!</span>} />}
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        event: state.events.event,
        user: state.auth.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getEventById: id => dispatch(getEventById(id)),
        registerForEvent: id => dispatch(registerForEvent(id)),
    };
}

export { EventInformation };
export default connect(mapStateToProps, mapDispatchToProps)(EventInformation);
