import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../store/actions/events';
import '../courses/courses.scss';
import {
    List, Card, Row, Typography, Input, message, Button, Tooltip,
} from 'antd';
import Loading from '../../components/Loading/Loading';

const { Title } = Typography;
const { Search } = Input;

class Events extends Component {
    constructor(props) {
        super(props);
        this.loader = null;
        this.state = {
            perPage: 0,
            categories: [],
            category: '',
            keyword: '',
            loading: false,
            currentPage: 1,
        };
    }

    componentDidMount() {
        this.loader = message.loading('Loading..', 0.5);
        window.addEventListener('resize', this.resizeEventListener);
        this.resizeEventListener();
    }

    resizeEventListener = () => {
        const { keyword } = this.state;
        const perPage = this.__resizeWindow();
        if (perPage !== this.state.perPage) {
            this.setState({
                loading: true,
                perPage,
            });
            this.props.getEvents(keyword, 1, perPage).then(() => {
                this.setState({ loading: false });
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeEventListener);
    }

    __resizeWindow() {
        const windowWidth = window.innerWidth;
        let perPage = 8;
        if (windowWidth > 1439) {
            perPage = 8;
        } else if (windowWidth <= 1439 && windowWidth > 1131) {
            perPage = 6;
        } else if (windowWidth <= 1131 && windowWidth > 855) {
            perPage = 4;
        } else if (windowWidth <= 855) {
            perPage = 2;
        }
        return perPage;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.events !== this.props.events) {
            this.loader();
        }
    }

    onClickHandler = (e, event_id) => {
        switch (e.target.name) {
        case 'edit-event':
            this.props.history.push(`/platform/admin/edit-event/${event_id}`);
            break;
        case 'event-info':
            this.props.history.push(`/platform/event-information/${event_id}`);
            break;
        default:
        }
    };

    handleChange(value) {
        const { perPage } = this.state;
        this.setState({
            keyword: value,
            currentPage: 1,
            loading: true,

        });

        this.props.getEvents(value, 1, perPage).then(() => {
            this.setState({ loading: false });
        });
    }

    paginate = page => {
        const { keyword, perPage } = this.state;
        if (perPage !== this.__resizeWindow()) {
            this.setState({ perPage: this.__resizeWindow() });
        }
        this.setState({
            currentPage: page,
            loading: true,
        });

        this.props.getEvents(keyword, page, this.__resizeWindow()).then(() => {
            this.setState({ loading: false });
        });
    }

    render() {
        const { events } = this.props;
        const { user } = this.props.auth;
        const { loading, perPage, currentPage } = this.state;
        const { roles } = user;
        return (
            <div className="coursesContainer">
                <div className="course-search">
                    <Title level={4}>Events</Title>

                    <Search
                        placeholder="Search"
                        onSearch={value => this.handleChange(value)}
                        className="searchContainer"
                    />

                </div>

                {!loading
                    ? (
                        <List
                            grid={{ gutter: 16, column: 4 }}
                            className="antList"
                            dataSource={events.data}
                            pagination={{
                                onChange: this.paginate,
                                pageSize: perPage,
                                position: 'both',
                                total: events.total,
                                defaultCurrent: 1,
                                current: currentPage,
                            }}
                            renderItem={item => (
                                <List.Item className="courses-item">
                                    <Card
                                        className="courses-card"
                                        cover={
                                            <div className="coursesImageDiv" style={{ background: `url(${item.image})` }} />
                                        }
                                        extra={(
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                                                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                                    <Tooltip mouseEnterDelay={0.5} title="Enter the event information page">
                                                        <Button type="primary" name="event-info" shape="circle" icon="info" />
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        )}
                                        onClick={e => this.onClickHandler(e, item.id)}
                                    >
                                        <Row align="middle" justify="center" style={{ width: '100%' }}>
                                            <div className="durationContainer">
                                                {
                                                    roles.indexOf('administrator') !== -1 || item.eventManagers.find(el => el.user_id === user.id)
                                                        ? <Button className="edit-course-bnt" name="edit-event" shape="circle" icon="edit" />
                                                        : <></>
                                                }

                                            </div>
                                        </Row>
                                        <Row className="categoryRow">
                                            <div className="courseTitle">
                                                <Title level={4} style={{ fontWeight: 'normal' }}>{item.name}</Title>
                                            </div>
                                        </Row>

                                    </Card>
                                </List.Item>
                            )}
                        />
                    )
                    : <Loading />}

            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        events: state.events.events,
        auth: state.auth,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getEvents: (keyword, currentPage, perPage) => dispatch(getEvents(keyword, currentPage, perPage)),
    };
}

export { Events };
export default connect(mapStateToProps, mapDispatchToProps)(Events);
