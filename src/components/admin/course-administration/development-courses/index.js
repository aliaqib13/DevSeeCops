import React, { Component } from 'react';
import {
    message, Table, Typography, Input,
} from 'antd';
import { NavLink, withRouter } from 'react-router-dom';

const { Title } = Typography;
const { Column } = Table;

class DevelopmentCourses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            currentPage: 1,
            showLoader: false,
        };
    }

    componentDidMount() {
        const {
            getDevelopmentCourses,
        } = this.props;

        const { currentPage, search } = this.state;

        return getDevelopmentCourses(currentPage, 10, search).then(res => {
            if (res !== true) {
                message.error('Can`t load courses in development');
            }
        }).catch(console.error);
    }

    paginate = page => {
        this.setState({
            currentPage: page,
            showLoader: true,
        });

        this.props.getDevelopmentCourses(page, 10, this.state.search).then(() => {
            this.setState({
                showLoader: false,
            });
        });
    }

    changeSearch = e => {
        this.setState({
            search: e.target.value,
        });
        const { currentPage } = this.state;
        this.props.getDevelopmentCourses(currentPage, 10, e.target.value);
    }

    render() {
        const { developmentCourses } = this.props;
        const { currentPage, showLoader, search } = this.state;

        return (
            <>
                <Title>
                    Courses In Development
                </Title>
                <Table
                    size="lg"
                    pagination={{
                        onChange: this.paginate,
                        pageSize: developmentCourses.perPage,
                        total: developmentCourses.total,
                        current: currentPage,
                        position: 'top',
                        defaultCurrent: 1,
                    }}
                    loading={showLoader}
                    dataSource={developmentCourses.data}
                    rowKey={item => item.id}
                    rowClassName="drawer-users-row"
                >

                    <Column
                        title={() => (
                            <Input
                                value={search}
                                placeholder="Search by Course Title"
                                onChange={this.changeSearch}
                                name="search"
                            />
                        )}
                        key="title_of_course"

                        render={course => <NavLink style={{ color: 'inherit' }} to={`/course-information/${course.id}`}>{course.title}</NavLink>}

                    />

                    <Column
                        title="Updated On"
                        key="updated_on"
                        dataIndex="updated_at"
                    />
                </Table>

            </>
        );
    }
}
export { DevelopmentCourses };

export default withRouter(DevelopmentCourses);
