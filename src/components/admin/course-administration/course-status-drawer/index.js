import React, { Component } from 'react';
import {
    Button, Drawer, Table, Input,
} from 'antd';
import { withRouter } from 'react-router-dom';

const { Column } = Table;

class CourseStatusDrawer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            currentPage: 1,
            showLoader: false,
        };
    }

    paginate = page => {
        const { status } = this.props;

        this.setState({
            currentPage: page,
            showLoader: true,
        });

        this.props.getCoursesByStatus(status, page, 10).then(() => {
            this.setState({
                showLoader: false,
            });
        });
    }

    enterCMS = record => {
        const { status } = this.props;
        switch (status) {
        case 'Preferred':
            window.isFromCourseDashboard = true;
            setTimeout(() => {
                delete window.isFromCourseDashboard;
            }, 2000);
            this.props.history.push('/platform/admin/fellow-settings');
            break;
        case 'Draft':
            window.activeKeyFellowArea = '2';
            setTimeout(() => {
                delete window.activeKeyFellowArea;
            }, 2000);
            this.props.history.push(`/platform/admin/fellow-area/${record.user_id}`);
            break;
        default:
            this.props.history.push(`/platform/admin/edit-course/${record.id}`);
            break;
        }
    }

    changeSearch = e => {
        this.setState({
            search: e.target.value,
        });
        const { currentPage } = this.state;
        const { status } = this.props;
        this.props.getCoursesByStatus(status, currentPage, 10, e.target.value);
    }

    render() {
        const {
            visible, onClose, coursesByStatus, status,
        } = this.props;
        const { currentPage, showLoader, search } = this.state;
        if (status === 'Draft') {
            const data = coursesByStatus.data.filter(item => item.user);
            coursesByStatus.data = data;
        }
        return (
            <Drawer
                title={status === 'Draft' ? 'Drafts' : status === 'Preferred' ? 'Course Scenarios' : `Courses - ${status}`}
                className="course-status-drawer"
                width={550}
                placement="right"
                onClose={() => {
                    this.setState({ search: '' });
                    onClose();
                }}
                visible={visible}
                switchScrollingEffect={false}
            >

                <Table
                    size="lg"
                    pagination={{
                        onChange: this.paginate,
                        pageSize: coursesByStatus.perPage,
                        total: coursesByStatus.total,
                        current: currentPage,
                        position: 'top',
                        defaultCurrent: 1,
                    }}
                    loading={showLoader}
                    dataSource={coursesByStatus.data}
                    rowKey={item => item.id}
                    rowClassName="drawer-users-row"
                >
                    {status === 'Draft'
                        ? (
                            <Column
                                title={() => (
                                    <Input
                                        value={search}
                                        placeholder="Search by Fellow Name"
                                        onChange={this.changeSearch}
                                        name="search"
                                    />
                                )}
                                render={(text, record) => (record.user ? `${record.user.firstname} ${record.user.lastname}` : '')}
                            />
                        )
                        : (
                            <Column
                                title={() => (
                                    <Input
                                        value={search}
                                        placeholder={`Search by Course ${status === 'Preferred' ? 'Scenario' : 'Name'}`}
                                        onChange={this.changeSearch}
                                        name="search"
                                    />
                                )}
                                dataIndex="title"
                            />
                        )}
                    <Column
                        title="CMS"
                        render={(text, record) => <Button onClick={() => this.enterCMS(record)} shape="circle" icon="edit" />}
                    />
                </Table>
            </Drawer>
        );
    }
}

export { CourseStatusDrawer };
export default withRouter(CourseStatusDrawer);
