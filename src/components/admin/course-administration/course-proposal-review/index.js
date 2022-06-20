import React, { Component } from 'react';
import { Table, Typography, Button } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';

const { Title } = Typography;
const { Column } = Table;

class CourseProposalsReview extends Component {
    onClickHandle(proposalId) {
        this.props.history.push(`/platform/admin/course-administration/proposal-review/${proposalId}`);
    }

    render() {
        const { courseProposalsForReview } = this.props;

        return (
            <>
                <Title>
                    Course Proposal Review
                </Title>
                <Table dataSource={courseProposalsForReview || []} rowKey={item => item.id}>
                    <Column
                        title="Fellow name"
                        key="fellow_name"
                        render={fellow => (
                            <NavLink style={{ color: 'inherit' }} to={`/platform/admin/user-statistics/${fellow.user.id}`}>
                                {fellow.user.firstname}
                                {' '}
                                {fellow.user.lastname}
                            </NavLink>
                        )}
                    />
                    <Column
                        title="Title of Course"
                        key="title_of_course"
                        render={course => <NavLink style={{ color: 'inherit' }} to={`/course-information/${course.course.id}`}>{course.course.title}</NavLink>}
                    />
                    <Column
                        title="Actions"
                        key="actions"
                        render={proposal => (
                            <Button onClick={() => this.onClickHandle(proposal.id)}>View</Button>
                        )}
                    />
                </Table>

            </>
        );
    }
}

export { CourseProposalsReview };
export default withRouter(CourseProposalsReview);
