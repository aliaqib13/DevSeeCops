import React, { Component } from 'react';
import {
    Card, Col, Row, Typography, message,
} from 'antd';
import { NavLink } from 'react-router-dom';

const { Title } = Typography;

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countRequests: 0,
            countLabs: 0,
            countAllUsers: 0,
            countRegularUsers: 0,
            countAdminUsers: 0,
            countFellowOperatorUsers: 0,
            countFellowUsers: 0,
            countBetaTesterUsers: 0,
            countAllCourses: 0,
            countCertificatesCompletion: 0,
            countCertificatesTheory: 0,
            countLoggedInUsers: 0,
            countDevelopmentCourses: 0,
            countDraftCourses: 0,
            countActiveLabs: 0,
        };
    }

    componentDidMount() {
        const loader = message.loading('Loading..');
        const { fetchAdminDashboardData } = this.props;
        return fetchAdminDashboardData().then(res => {
            if (res.message || res.error) {
                message.error('Something went wrong, please try again');
                return;
            }
            loader();
            this.setState({
                ...res,
            });
        });
    }

    render() {
        const {
            countRequests, countLabs, countActiveLabs, countAllUsers,
            countRegularUsers, countAdminUsers, countFellowOperatorUsers,
            countFellowUsers, countBetaTesterUsers, countAllCourses,
            countCertificatesCompletion, countCertificatesTheory, countLoggedInUsers,
            countDevelopmentCourses, countDraftCourses,
        } = this.state;
        return (
            <div>
                <Title>Admin Dashboard</Title>
                <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Title level={4}>To Do</Title>
                    <Row data-testid="toDo" gutter={16}>
                        <Col span={8}>
                            <NavLink to="/platform/admin/course-administration">
                                <Card title={`${countDraftCourses} of Course draft review requests`} bordered={false} />
                            </NavLink>
                        </Col>
                        <Col span={8}>
                            <NavLink to="/platform/admin/course-administration">
                                <Card title={`${countRequests} of Open course access requests`} bordered={false} />
                            </NavLink>
                        </Col>
                        <Col span={8}>
                            <NavLink to="/platform/admin/labs">
                                <Card title={`${countLabs} of Lab review request`} bordered={false} />
                            </NavLink>
                        </Col>
                    </Row>
                </div>
                <div style={{ background: '#ECECEC', padding: '0 30px 30px 30px' }}>
                    <Title level={4}>Active</Title>
                    <Row data-testid="active" gutter={16}>
                        <Col span={12}>
                            <NavLink to="/platform/admin/active-labs">
                                <Card title={`${countActiveLabs} of active labs`} bordered={false} />
                            </NavLink>
                        </Col>
                        <Col span={12}>
                            <NavLink to="/platform/admin/users">
                                <Card title={`${countLoggedInUsers} of users logged in`} bordered={false} />
                            </NavLink>
                        </Col>
                    </Row>
                </div>
                <div style={{ background: '#ECECEC', padding: '0 30px 30px 30px' }}>
                    <Title level={4}>Course Factory</Title>
                    <Row data-testid="courseFactory" gutter={16}>
                        <Col span={12}>
                            <NavLink to="/platform/courses">
                                <Card title={`${countAllCourses} of available courses`} bordered={false} />
                            </NavLink>
                        </Col>
                        <Col span={12}>
                            <NavLink to="/platform/admin/course-administration">
                                <Card title={`${countDevelopmentCourses} courses in development`} bordered={false} />
                            </NavLink>
                        </Col>
                    </Row>
                </div>
                <div style={{ background: '#ECECEC', padding: '0 30px 30px 30px' }}>
                    <Title level={4}>User Overview</Title>
                    <Row data-testid="userOverview" gutter={[16, 16]}>
                        <Col span={8}>
                            <NavLink to="/platform/admin/users">
                                <Card title={`${countAllUsers} of accounts`} bordered={false} />
                            </NavLink>
                        </Col>
                        <Col span={8}>
                            <NavLink to="/platform/admin/users/regular_users">
                                <Card title={`${countRegularUsers} of users with NO specific role`} bordered={false} />
                            </NavLink>
                        </Col>
                        <Col span={8}>
                            <NavLink to="/platform/admin/users/administrator">
                                <Card title={`${countAdminUsers} of users with role of Admins`} bordered={false} />
                            </NavLink>
                        </Col>
                        <Col span={8}>
                            <NavLink to="/platform/admin/users/fellow_operator">
                                <Card
                                    title={`${countFellowOperatorUsers} of users with role Fellow Operators`}
                                    bordered={false}
                                />
                            </NavLink>
                        </Col>
                        <Col span={8}>
                            <NavLink to="/platform/admin/users/fellow">
                                <Card title={`${countFellowUsers} of users with role of Fellow`} bordered={false} />
                            </NavLink>
                        </Col>
                        <Col span={8}>
                            <NavLink to="/platform/admin/users/beta_tester">
                                <Card
                                    title={`${countBetaTesterUsers} of users with role of Beta tester`}
                                    bordered={false}
                                />
                            </NavLink>
                        </Col>
                    </Row>
                </div>

                <div style={{ background: '#ECECEC', padding: '0 30px 30px 30px' }}>
                    <Title level={4}>Certificates Overview</Title>
                    <Row data-testid="certificatesOverview" gutter={16}>
                        <Col span={12}>
                            <NavLink to="/platform/admin/certificate-manager/completion">
                                <Card
                                    title={`${countCertificatesCompletion} of certificates of completion`}
                                    bordered={false}
                                />
                            </NavLink>
                        </Col>
                        <Col span={12}>
                            <NavLink to="/platform/admin/certificate-manager/theory">
                                <Card title={`${countCertificatesTheory} of certificates of theory`} bordered={false} />
                            </NavLink>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export { AdminDashboard };
export default AdminDashboard;
