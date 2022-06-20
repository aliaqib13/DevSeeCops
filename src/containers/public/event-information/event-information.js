import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button, Empty, Modal, Form, message, Checkbox, Icon, Tooltip,
} from 'antd';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { getPublicEventById, registerPlatformForEvent } from '../../../store/actions/public/events';
import { EVENT_TYPE } from '../../../constants';

class EventInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            registerModal: false,
            firstname: '',
            lastname: '',
            email: '',
            loadingRegister: false,
            policy: false,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.props.getPublicEventById(this.props.match.params.id).then(() => {
            this.setState({ loading: false });
        });
    }

    goToLogin = () => {
        this.props.history.push('/login');
    }

    toggleRegisterModal = () => {
        this.setState({ registerModal: !this.state.registerModal });
    }

    onChange = e => {
        if (e.target.id === 'policy') {
            this.setState({ [e.target.id]: !this.state.policy });
            return;
        }
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const {
            firstname, lastname, email, policy,
        } = this.state;
        const event_id = this.props.event.id;
        if (policy === false) {
            return message.error('Please agree with the Terms of Service');
        }

        this.setState({ loadingRegister: true });
        this.props.registerPlatformForEvent({
            firstname,
            lastname,
            email,
            event_id,
        }).then(res => {
            this.setState({ loadingRegister: false });
            if (res === true) {
                message.success('Congrats! Now go to your email to activate the account!');
                this.toggleRegisterModal();
            } else {
                message.error(res.message || res.error.message);
            }
        });
    }

    render() {
        const { event } = this.props;
        const { loading, registerModal, loadingRegister } = this.state;
        const EventButton = props => {
            const buttonStyle = props.mobile ? { width: '220px' } : {};
            const styleLogin = { textAlign: 'center', marginBottom: !props.mobile ? '-11px' : '0px', marginTop: !props.mobile ? '-10px' : '10px' };
            if (event.end_time && new Date(event.end_time) < new Date()) {
                return <Button type='primary' className='proceed-button' style={buttonStyle} disabled>Event Ended</Button>;
            }
            if (event.eventUsers.length >= event.user_limit && event.type === EVENT_TYPE.OPEN) {
                return <Button type='primary' className='proceed-button' style={buttonStyle} disabled>Event Fully Booked</Button>;
            }
            return (
                <>
                    <Tooltip title="If you do not have account yet please create one and you will be redirected to this page" key="register-hover">
                        <Button
                            type='primary'
                            className='proceed-button'
                            style={buttonStyle}
                            onClick={this.toggleRegisterModal}
                        >
                            Create Account To Register
                        </Button>
                    </Tooltip>
                    <p style={styleLogin}>Do you already have an account?</p>
                    <Tooltip title="If you already have an account, login and accept the invite by registering for this event" key="login-hover">
                        <Link to={{ pathname: '/login', state: { backUrl: window.location.pathname } }}>
                            <Button type='primary' className='proceed-button' style={buttonStyle}>Login To Register</Button>
                        </Link>
                    </Tooltip>
                </>
            );
        };

        return (
            <>
                {event && event.id && !loading
                    ? (
                        <div className="course-information-container">
                            <div className="course-information-header">
                                <div className="title">{event.name}</div>
                                <div className="content">{event.subtitle}</div>
                            </div>
                            <div className="course-information-body">
                                <div className="main" style={{ paddingTop: '15px' }}>
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
                                                    <div>
                                                        {index > 0 ? <br /> : ''}
                                                        <p>
                                                            Title:
                                                            <a target="_blank" rel="noopener noreferrer" href={`/course-information/${course.id}`}>
                                                                {' '}
                                                                {course.title}
                                                            </a>
                                                        </p>
                                                        <p>
                                                            Description:
                                                            {course.description || ' No Info'}

                                                        </p>

                                                        <div className="paragraph">
                                                            What you will learn
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
                                            <EventButton mobile />
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
                                                        <div style={{ fontWeight: 'bold' }}>Event Sponsors</div>
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
                                    <EventButton />
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
                                                    <div style={{ fontWeight: 'bold' }}>Event Sponsors</div>
                                                    <div className="content" style={{ margin: '7px' }}>
                                                        {event.eventSponsors.map((item, key) => (
                                                            <div key={key} style={{ marginTop: '7px' }}>
                                                                <img style={{ marginRight: '7px' }} src={item.logo} width='50' alt="Sponsor" />
                                                                {item.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    : loading
                        ? <Loading />
                        : <Empty description={<span>Event not found!</span>} /> }
                <Modal
                    title="Registration"
                    visible={registerModal}
                    onCancel={this.toggleRegisterModal}
                    width='555px'
                    footer={null}
                >
                    <Form onSubmit={this.onSubmit} className="register-form">
                        <TextField
                            label="First Name"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            id="firstname"
                            value={this.state.firstname}
                            onChange={this.onChange}
                            style={{ width: '100%' }}
                            autoComplete="new-first-name"
                            required
                        />
                        <TextField
                            label="Last Name"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            id="lastname"
                            value={this.state.lastname}
                            onChange={this.onChange}
                            style={{ width: '100%' }}
                            autoComplete="new-last-name"
                            required
                        />
                        <TextField
                            label="Email"
                            type="email"
                            margin="normal"
                            variant="outlined"
                            id="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            style={{ width: '100%' }}
                            autoComplete="new-email"
                            required
                        />
                        <Form.Item className="register-form-reg">
                            <Checkbox onChange={this.onChange} checked={this.state.policy} id="policy" name="privacy">
                                I agree to
                                {' '}
                                <Link to="/policy" rel="noopener noreferrer" target="__blank">DevSecOps Academy's Terms of Service</Link>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item className="register-form-reg">
                            <Button
                                size="large"
                                type="primary"
                                htmlType="submit"
                                loading={loadingRegister}
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>

        );
    }
}

function mapStateToProps(state) {
    return {
        event: state.publicEvents.event,
        user: state.auth.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPublicEventById: id => dispatch(getPublicEventById(id)),
        registerPlatformForEvent: data => dispatch(registerPlatformForEvent(data)),
    };
}

export { EventInformation };
export default connect(mapStateToProps, mapDispatchToProps)(EventInformation);
