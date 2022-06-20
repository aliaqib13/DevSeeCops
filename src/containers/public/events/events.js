import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    message, List, Card, Row, Typography, Input,
} from 'antd';
import { fetchPublicEvents } from '../../../store/actions/public/events';
import Loading from '../../../components/Loading/Loading';

const { Title } = Typography;
const { Search } = Input;

class Events extends Component {
    constructor(props) {
        super(props);
        this.loader = null;
        this.state = {
            eventsCount: 8,
            keyword: '',
            loading: false,
        };
    }

    componentDidMount() {
        const { keyword, eventsCount } = this.state;
        this.setState({ loading: true });
        this.props.fetchPublicEvents(keyword).finally(() => {
            this.setState({ loading: false });
        });
        this.loader = message.loading('Loading..', 0);
        this.checkWindowSize(this.state.eventsCount);
        window.addEventListener('resize', () => this.checkWindowSize(eventsCount));
    }

    checkWindowSize(count) {
        const windowWidth = window.innerWidth;
        let eventsCount = count;
        if (windowWidth > 1715) {
            eventsCount = 8;
        } else if (windowWidth <= 1715 && windowWidth > 1131) {
            eventsCount = 6;
        } else if (windowWidth <= 1131 && windowWidth > 855) {
            eventsCount = 4;
        } else if (windowWidth <= 855) {
            eventsCount = 2;
        }
        this.setState({ eventsCount });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.events !== this.props.events) {
            this.loader();
        }
    }

    handleChange(value) {
        this.setState({
            keyword: value,
            loading: true,

        });

        this.props.fetchPublicEvents(value).then(() => {
            this.setState({ loading: false });
        });
    }

    onClickHandler = (e, event_id) => {
        this.props.history.push(`/event-information/${event_id}`);
    };

    render() {
        const { events } = this.props;
        const { loading, eventsCount } = this.state;
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
                            dataSource={events}
                            pagination={{
                                pageSize: eventsCount,
                                position: 'both',
                            }}
                            renderItem={item => (
                                <List.Item className="courses-item">
                                    <Card
                                        className="courses-card"
                                        style={{ height: '265px', cursor: 'pointer' }}
                                        cover={
                                            <div className="coursesImageDiv" style={{ background: `url(${item.image})` }} />
                                        }
                                        onClick={e => this.onClickHandler(e, item.id)}
                                    >
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
        events: state.publicEvents.events,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPublicEvents: keyword => dispatch(fetchPublicEvents(keyword)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
