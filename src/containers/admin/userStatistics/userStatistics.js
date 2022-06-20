import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button, Icon, message, Table, Tag, Typography,
} from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import './userStatistics.scss';
import Preferences from '../../../components/profile/Preferences/Preferences';
import { getPreferencesById } from '../../../store/actions/admin/preferences';
import { fetchUserStatistics } from '../../../store/actions/admin/userStatistics';

const { Title } = Typography;
const { Column } = Table;

class UserStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.setState({ loading: true });
        this.props.fetchUserStatistics(id).then(e => {
            if (e.message) {
                message.error(e.message);
            }
            this.setState({ loading: false });
        });
    }

    render() {
        const { id } = this.props.match.params;
        const { courses, user } = this.props.data;
        const { loading } = this.state;
        return (
            <div className='user-statistics-container'>
                <div>
                    <Title>
                        User Statistics of
                        {' '}
                        {user.firstname}
                        {' '}
                        {user.lastname}
                        <div>
                            <Tag color='blue'>
                                Account created at:
                                {user.created_at}
                            </Tag>
                        </div>

                    </Title>
                    {user.roles.length ? user.roles.map(e => <Tag color="blue" key={e.id}>{e.name}</Tag>) : <Tag className="role-user" color="blue" key="user">User</Tag>}
                </div>
                <Table size="lg" loading={loading} className="user-statistics-table" dataSource={courses} rowKey={item => item.id} pagination={false}>
                    <Column
                        title="Image"
                        key="image"
                        className="table-image-row"
                        render={(text, record) => (<img src={record.image} alt="course" />)}
                    />
                    <Column title="Title" key="title" dataIndex="title" />
                    <Column
                        title="Completed"
                        key="completed"
                        render={(text, record) => {
                            if (record.activeCourses && record.activeCourses.finished) {
                                if (record.activeCourses.user_level) {
                                    return `Date of completion: ${record.certificates[0].created_at} | User Level: ${record.activeCourses.user_level}`;
                                }
                                return `Date of completion: ${record.certificates[0].created_at} | User Level: None`;
                            }
                            return 'Not completed';
                        }}
                    />
                    <Column
                        title="Hands-on Lab Time"
                        key="hands_on_lab_time"
                        render={(text, record) => {
                            if (record?.activeCourses?.activeLab?.total_spin_up_time) {
                                const d = moment.duration(record?.activeCourses?.activeLab?.total_spin_up_time, 'milliseconds');
                                const hours = Math.floor(d.asHours());
                                const mins = Math.floor(d.asMinutes()) - hours * 60;
                                // let seconds = Math.floor(d.asSeconds()) - mins * 60
                                return (`${hours}h:${mins}m`);
                            }

                            return '0h:0m';
                        }}
                    />
                </Table>
                <Title level={4}>
                    Preferences
                </Title>
                <Preferences
                    user_id={id}
                    user={user}
                    preferences={this.props.preferences}
                    getPreferences={this.props.getPreferencesById}
                    searchByCourseTags={this.props.searchByCourseTags}
                    onlyShow
                />
                <Button type="link" className="go-back-button">
                    <NavLink to="/platform/admin/users">
                        <Icon type="left" />
                        Back
                    </NavLink>
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.adminUserStatistics.data,
    preferences: state.preferences,
});

const mapDispatchToProps = dispatch => ({
    fetchUserStatistics: user_id => dispatch(fetchUserStatistics(user_id)),
    getPreferencesById: user_id => dispatch(getPreferencesById(user_id)),
});

export { UserStatistics };
export default connect(mapStateToProps, mapDispatchToProps)(UserStatistics);
