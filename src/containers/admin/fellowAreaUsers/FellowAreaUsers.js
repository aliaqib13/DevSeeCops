import React, { Component } from 'react';
import { connect } from 'react-redux';
import './fellow-area-users.scss';
import { List, Card, message } from 'antd';
import { fetchFellowUsers } from '../../../store/actions/admin/fellow-area';

class FellowAreaUsers extends Component {
    componentDidMount() {
        const loader = message.loading('Loading..', 0);
        this.props.fetchFellowUsers().then(res => {
            loader();
        });
    }

    goToUserFellowCourses = id => {
        this.props.history.push(`/platform/admin/fellow-area/${id}`);
    }

    render() {
        const { users } = this.props;

        return (
            <div className="admin-fellow-area">
                <List
                    grid={{
                        gutter: 8,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 2,
                        xl: 4,
                        xxl: 4,
                    }}
                    dataSource={users}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                className="fellow-user-card"
                                title={`${item.firstname} ${item.lastname}`}
                                hoverable
                                onClick={() => this.goToUserFellowCourses(item.id)}
                            >
                                Courses:
                                {item.__meta__.authoredCourses_count}
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.adminFellowArea.users,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchFellowUsers: () => dispatch(fetchFellowUsers()),
    };
}

export { FellowAreaUsers };
export default connect(mapStateToProps, mapDispatchToProps)(FellowAreaUsers);
