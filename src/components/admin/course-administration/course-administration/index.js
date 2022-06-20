import React, { Component } from 'react';
import {
    Typography, Table, Button, Icon, message, Tabs, Select,
} from 'antd';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import AddCourseModal from '../add-course-modal';
import ImportCourseModal from '../import-course-modal';
import CourseUsersDrawer from '../course-users-drawer';
import CourseRequestDrawer from '../course-requests-drawer';
import LabtimeRequestDrawer from '../labtime-requests-drawer';
import CourseDevelopmentDashboard from '../course-development-dashboard';
import CourseProposalReview from '../course-proposal-review';
import DevelopmentCourses from '../development-courses';

const { Title } = Typography;
const { Column } = Table;
const { TabPane } = Tabs;
const { Option, OptGroup } = Select;

class CourseAdministration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            usersDrawerVisible: false,
            requestDrawerVisible: false,
            addCourseModalVisible: false,
            importCourseModalVisible: false,
            labtimeRequestDrawerVisible: false,
            selectedCourse: 0,
            selectedRequest: 0,
            selectedLabtimeRequest: 0,
            showUserLoader: false,
            showRequestLoader: false,
            categoriesLoader: false,
            totalUpTimeRole: 'all',

        };
    }

    componentDidMount() {
        const {
            fetchCoursesPlatformInsights,
            getAdminAccessRequests,
            fetchActiveCourses,
            getLabs,
            getCourseTemplates,
            getCourseStatuses,
            getCourseTypes,
            getCourseProposalsForReviews,
        } = this.props;

        this.setState({
            loading: true,
        });
        fetchCoursesPlatformInsights().then(res => {
            if (res === false) {
                return message.error('Something went wrong, please try again.');
            }
        }).catch(console.error);
        getAdminAccessRequests().then(res => {
            if (res === false) {
                message.error('Something went wrong, please try again.');
            }
        }).catch(console.error);
        fetchActiveCourses().then(res => {
            if (res === false) {
                message.error('Something went wrong, please try again.');
            }
            this.setState({
                loading: false,
            });
        }).catch(error => console.log(error));
        getLabs().then(res => {
            if (res === false) {
                message.error('Something went wrong, please try again.');
            }
        }).catch(console.error);

        getCourseTemplates().then(res => {
            if (res !== true) {
                message.error('Can`t load course templates');
            }
        }).catch(console.error);

        getCourseStatuses().then(res => {
            if (res !== true) {
                message.error('Something went wrong, please try again.');
            }
        }).catch(console.error);

        getCourseTypes().then(res => {
            if (res !== true) {
                message.error('Can`t load course types');
            }
        }).catch(console.error);
        getCourseProposalsForReviews().then(res => {
            if (res !== true) {
                message.error('Can`t load course proposals');
            }
        }).catch(console.error);
    }

    showUsersDrawer = course_id => {
        const { getCourseUsers } = this.props;
        const loader = message.loading('Loading..', 0);
        this.setState({
            showUserLoader: true,
        });
        getCourseUsers(course_id, 1, 10).then(res => {
            if (res === true) {
                this.setState({
                    usersDrawerVisible: true,
                    selectedCourse: course_id,
                });
            }
            this.setState({
                showUserLoader: false,
            });
            loader();
        }).catch(console.error);
    }

    showRequestDrawer = courseId => {
        const { getCourseRequests } = this.props;
        const loader = message.loading('Loading..', 0);
        getCourseRequests(courseId, 1, 10).then(res => {
            if (res === true) {
                this.setState({
                    requestDrawerVisible: true,
                    selectedRequest: courseId,
                });
            }
            loader();
        }).catch(console.error);
    }

    getLabtimeRequests = id => {
        const { getLabtimeRequests } = this.props;
        const loader = message.loading('Loading..', 0);
        getLabtimeRequests(id, 1, 10).then(res => {
            loader();
            if (res === true) {
                this.setState({
                    labtimeRequestDrawerVisible: true,
                    selectedLabtimeRequest: id,
                });
            }
        }).catch(console.error);
    }

    closeUsersDrawer = () => {
        const { clearUsers } = this.props;
        clearUsers();
        this.setState({
            usersDrawerVisible: false,
        });
    }

    closeRequestDrawer = () => {
        const { clearUsers } = this.props;
        clearUsers();
        this.setState({
            requestDrawerVisible: false,
        });
    }

    closeLabtimeRequestDrawer = () => {
        this.setState({
            labtimeRequestDrawerVisible: false,
        });
    }

    openAddCourseModal = () => {
        const { categories, fetchCategories } = this.props;
        this.setState({
            categoriesLoader: true,
        });
        if (!categories.length) {
            fetchCategories().then(res => {
                if (res === true) {
                    this.setState({
                        addCourseModalVisible: true,
                    });
                } else {
                    message.error(res.message);
                }
                this.setState({
                    categoriesLoader: false,
                });
            }).catch(console.error);
        } else {
            this.setState({
                addCourseModalVisible: true,
                categoriesLoader: false,
            });
        }
    }

    closeAddCourseModal = () => {
        this.setState({
            addCourseModalVisible: false,
        });
    }

    openImportCourseModal = () => {
        this.setState({
            importCourseModalVisible: true,
        });
    }

    closeImportCourseModal = () => {
        this.setState({
            importCourseModalVisible: false,
        });
    }

    changeTotalUpTimeRole = role => {
        const { fetchCoursesPlatformInsights } = this.props;
        this.setState({
            loading: true,
        });
        fetchCoursesPlatformInsights().then(res => {
            if (res === false) {
                message.error('Something went wrong, please try again.');
            }
            this.setState({
                totalUpTimeRole: role,
            });
            this.setState({
                loading: false,
            });
        }).catch(console.error);
    }

    checkRoles = user => {
        const { totalUpTimeRole } = this.state;
        if (totalUpTimeRole === 'all') {
            return true;
        } if (totalUpTimeRole === 'regular-users') {
            return user.roles.length === 0;
        } if (totalUpTimeRole === 'beta-testers') {
            return user.roles.findIndex(role => role.slug === 'beta_tester') !== -1;
        } if (totalUpTimeRole === 'fellows') {
            return user.is_fellow;
        }
    }

    mappingUsers = (activeCoursesMany, isForSum) => {
        const copyActiveCoursesMany = JSON.parse(JSON.stringify(activeCoursesMany));
        copyActiveCoursesMany.forEach(item => {
            item.activeLabs = item.activeLabs.filter(el => this.checkRoles(el.user));
        });
        const activeCoursesWithActiveLabs = copyActiveCoursesMany.filter(item => item.activeLabs.length);
        const activeLabs = activeCoursesWithActiveLabs.map(item => item.activeLabs);
        const joinActiveLabs = [].concat.apply([], activeLabs);
        const users = joinActiveLabs.map(item => item.user_id);
        const uniqueUsers = users.filter((value, index) => users.indexOf(value) === index);
        if (isForSum) {
            return uniqueUsers;
        }
        return uniqueUsers.length;
    }

    mappingActiveCoursesMany = (activeCoursesMany, column, column2 = null) => {
        let count = 0;
        let count2 = 0;
        for (let i = 0; i < activeCoursesMany.length; i++) {
            for (let j = 0; j < activeCoursesMany[i].activeLabs.length; j++) {
                if (activeCoursesMany[i].activeLabs[j][column]) {
                    if (this.checkRoles(activeCoursesMany[i].activeLabs[j].user)) {
                        count += activeCoursesMany[i].activeLabs[j][column];
                        if (column2) {
                            count2 += activeCoursesMany[i].activeLabs[j][column2];
                        }
                    }
                }
            }
        }
        if (column2) {
            return { count, miliseconds: count2 };
        }
        return count;
    }

    mappingCertificates = (record, type) => {
        const { totalUpTimeRole } = this.state;
        const { certificates } = record;
        let count = 0;
        if (totalUpTimeRole === 'all') {
            count = record.certificates.filter(e => e.type === type
                    && !e.users.roles.find(item => item.slug === 'administrator' || item.slug === 'fellow_operator')).length;
        } else {
            if (!certificates.length) {
                return 0;
            }
            for (let i = 0; i < certificates.length; i++) {
                if (this.checkRoles(certificates[i].users)) {
                    if (certificates[i].type === type) {
                        count += 1;
                    }
                }
            }
        }
        return count;
    }

    getCertificatesTotal = type => {
        const { coursesPlatformInsights } = this.props;
        let count = 0;
        if (coursesPlatformInsights) {
            coursesPlatformInsights.forEach(course => {
                count += this.mappingCertificates(course, type);
            });
        }
        return count;
    }

    getUsersTotal = () => {
        const { coursesPlatformInsights } = this.props;
        const users = [];
        if (coursesPlatformInsights) {
            coursesPlatformInsights.forEach(course => {
                const { activeCoursesMany } = course;
                const uniqueUsersForOneCourse = this.mappingUsers(activeCoursesMany, true);
                users.push(uniqueUsersForOneCourse);
            });
        }
        const joinUsers = [...users];
        const uniqueUsersForAllCourses = joinUsers.filter((value, index) => joinUsers.indexOf(value) === index);
        return uniqueUsersForAllCourses.length;
    }

    getSpinUpsTotal = () => {
        const { coursesPlatformInsights } = this.props;
        let count = 0;
        if (coursesPlatformInsights) {
            coursesPlatformInsights.forEach(course => {
                const { activeCoursesMany } = course;
                count += this.mappingActiveCoursesMany(activeCoursesMany, 'total_spin_ups');
            });
        }
        return count;
    }

    getSpinUpTimeTotal = () => {
        const { coursesPlatformInsights } = this.props;
        let count = 0;
        if (coursesPlatformInsights) {
            coursesPlatformInsights.forEach(course => {
                const { activeCoursesMany } = course;
                count += this.mappingActiveCoursesMany(activeCoursesMany, 'total_spin_up_time');
            });
        }
        const d = moment.duration(count, 'milliseconds');
        const hours = Math.floor(d.asHours());
        const mins = Math.floor(d.asMinutes()) - hours * 60;
        return (`${hours}h:${mins}m`);
    }

    checkAuthors = (authors, userId) => {
        if (!authors.length) {
            return true;
        }
        for (let i = 0; i < authors.length; i++) {
            if (authors[i].id === userId) {
                return false;
            }
        }
        return true;
    }

    countLabtimeRequests = lab => {
        let count = 0;
        lab.activeLabs.forEach(item => {
            count += item.labtimeRequests.length;
        });
        return count;
    }

    render() {
        const {
            loading, usersDrawerVisible, addCourseModalVisible, importCourseModalVisible, selectedCourse,
            showUserLoader, categoriesLoader, requestDrawerVisible, showRequestLoader, labtimeRequestDrawerVisible,
            totalUpTimeRole, selectedLabtimeRequest,
        } = this.state;

        const {
            focusTab, statuses, getCoursesByStatus, coursesByStatus, getDevelopmentCourses,
            developmentCourses, requests, courseRequests, changeRequestStatus,
            getAdminAccessRequests, deleteRequest, getCourseRequests, selectedRequest, courses, createCategory,
            deleteCategory, categories, createCourse, uploadFile, updateTags, fetchTags, searchByCourseTags,
            courseTemplates, courseTypes, uploadCourse, searchUserByEmail, addUserActiveCourse, removeUserActiveCourse,
            users, getCourseUsers, coursesPlatformInsights, labs, labtimeRequests, changeLabtimeRequestStatus,
            deleteLabtimeRequest, getLabtimeRequests, getLabs, courseProposalsForReview,
        } = this.props;

        return (
            <>
                <Tabs defaultActiveKey={focusTab ? '2' : '5'}>

                    <TabPane tab="Course Development Dashboard" key={5}>
                        <CourseDevelopmentDashboard
                            statuses={statuses}
                            getCoursesByStatus={getCoursesByStatus}
                            coursesByStatus={coursesByStatus}
                        />
                    </TabPane>

                    <TabPane tab="Course access requests" key={1}>
                        <div className="course-access-container">
                            <div>
                                <Title>
                                    Course access requests
                                </Title>
                            </div>
                            <div>
                                <Table size="lg" loading={loading} dataSource={requests} rowKey={item => item.id} pagination={false}>
                                    <Column
                                        title="Image"
                                        key="image"
                                        className="table-image-row"
                                        render={(text, record) => (<img src={record.image} alt="course" />)}
                                    />
                                    <Column
                                        title="Title"
                                        key="title"
                                        render={e => <NavLink style={{ color: 'inherit' }} to={`/course-information/${e.id}`}>{e.title}</NavLink>}
                                    />
                                    <Column
                                        title="Number of requests"
                                        key="count"
                                        render={(text, record) => record.__meta__.requests_count}
                                    />
                                    <Column
                                        title="Actions"
                                        key="actions"
                                        render={(text, record) => (
                                            <Button type="link" onClick={() => this.showRequestDrawer(record.id)}>
                                                Requests
                                                <Icon type="right" />
                                            </Button>
                                        )}
                                    />
                                </Table>
                            </div>
                        </div>
                        <CourseRequestDrawer
                            onClose={this.closeRequestDrawer}
                            visible={requestDrawerVisible}
                            showRequestLoader={showRequestLoader}
                            courseRequests={courseRequests}
                            changeRequestStatus={changeRequestStatus}
                            getAdminAccessRequests={getAdminAccessRequests}
                            deleteRequest={deleteRequest}
                            getCourseRequests={getCourseRequests}
                            selectedRequest={selectedRequest}
                        />
                    </TabPane>

                    <TabPane tab="Course users" key={2}>
                        <div className="course-users-container">
                            <div>
                                <Title>
                                    Course Administration
                                </Title>
                                <div>
                                    <Button type="default" onClick={this.openAddCourseModal} loading={categoriesLoader}>
                                        Add Course
                                        <Icon type="plus-circle" />
                                    </Button>
                                    <Button type="default" onClick={this.openImportCourseModal}>Import Course</Button>
                                </div>
                            </div>
                            <div>
                                <Table size="lg" loading={loading} dataSource={courses} rowKey={item => item.id} pagination={false}>
                                    <Column
                                        title="Image"
                                        key="image"
                                        className="table-image-row"
                                        render={(text, record) => (<img src={record.image} alt="course" />)}
                                    />
                                    <Column
                                        title="Title"
                                        key="title"
                                        render={e => <NavLink style={{ color: 'inherit' }} to={`/course-information/${e.id}`}>{e.title}</NavLink>}
                                    />
                                    <Column title="Category" key="category" dataIndex="category.name" />
                                    <Column title="Number of Users" key="count" dataIndex="__meta__.activeCourses_count" />
                                    <Column
                                        title="Actions"
                                        key="actions"
                                        render={(text, record) => (
                                            <Button type="link" onClick={() => this.showUsersDrawer(record.id)}>
                                                Users
                                                <Icon type="right" />
                                            </Button>
                                        )}
                                    />
                                </Table>
                            </div>
                            <AddCourseModal
                                onClose={this.closeAddCourseModal}
                                visible={addCourseModalVisible}
                                addNewCategory={data => createCategory(data)}
                                deleteCategory={(index, id) => deleteCategory(index, id)}
                                categories={categories}
                                createCourse={createCourse}
                                uploadCourseImage={uploadFile}
                                uploadFile={uploadFile}
                                updateTags={updateTags}
                                fetchTags={fetchTags}
                                searchByCourseTags={searchByCourseTags}
                                courseTemplates={courseTemplates}
                                courseTypes={courseTypes}
                            />
                            <ImportCourseModal
                                onClose={this.closeImportCourseModal}
                                visible={importCourseModalVisible}
                                importCourse={uploadCourse}
                            />
                            <CourseUsersDrawer
                                onClose={this.closeUsersDrawer}
                                searchUserByEmail={searchUserByEmail}
                                selectedCourse={selectedCourse}
                                addUserActiveCourse={addUserActiveCourse}
                                removeUserActiveCourse={removeUserActiveCourse}
                                visible={usersDrawerVisible}
                                users={users}
                                showUserLoader={showUserLoader}
                                getCourseUsers={getCourseUsers}
                            />
                        </div>
                    </TabPane>

                    <TabPane tab="Course/Platform Insights" key={3}>
                        <div className="course-insights-container">
                            <div>
                                <Title>
                                    Course/Platform Insights
                                </Title>
                            </div>

                            <div>
                                <Table size="lg" loading={loading} dataSource={coursesPlatformInsights} rowKey={item => item.id} pagination={false}>
                                    <Column
                                        title="Image"
                                        key="image"
                                        className="table-image-row-insights"
                                        render={(text, record) => (<img src={record.image} alt="course" />)}
                                    />
                                    <Column
                                        title="Title"
                                        key="title"
                                        render={e => <NavLink style={{ color: 'inherit' }} to={`/course-information/${e.id}`}>{e.title}</NavLink>}
                                    />
                                    <Column
                                        title={`Number of certificates of theory - ${this.getCertificatesTotal('theory')}`}
                                        key="Number of certificates of theory"
                                        render={(text, record) => this.mappingCertificates(record, 'theory')}
                                        dataIndex={1}
                                    />
                                    <Column
                                        title={`Number of certificates of completion - ${this.getCertificatesTotal('completion')}`}
                                        key="Number certificates of completion"
                                        render={(text, record) => this.mappingCertificates(record, 'completion')}
                                    />
                                    <Column
                                        title={`Number of unique users - ${this.getUsersTotal()}`}
                                        key="Number of unique users"
                                        render={(text, record) => {
                                            const { activeCoursesMany } = record;
                                            return this.mappingUsers(activeCoursesMany);
                                        }}
                                    />
                                    <Column
                                        title={`Number of hands-on lab spin ups - ${this.getSpinUpsTotal()}`}
                                        key="Number of hands-on lab spin ups"
                                        render={(text, record) => {
                                            const { activeCoursesMany } = record;
                                            return this.mappingActiveCoursesMany(activeCoursesMany, 'total_spin_ups');
                                        }}
                                    />
                                    <Column
                                        title={() => (
                                            <>
                                                <span>
                                                    Total up time over all courses -
                                                    {this.getSpinUpTimeTotal()}
                                                </span>
                                                <Select style={{ width: 150 }} value={totalUpTimeRole} onChange={this.changeTotalUpTimeRole}>
                                                    <OptGroup label="Roles">
                                                        <Option value="all">All</Option>
                                                        <Option value="regular-users">Regular Users</Option>
                                                        <Option value="fellows">Fellows</Option>
                                                        <Option value="beta-testers">Beta-testers</Option>
                                                    </OptGroup>
                                                </Select>
                                            </>
                                        )}
                                        key="Total up time over all courses"
                                        render={(text, record) => {
                                            const { activeCoursesMany } = record;
                                            const miliseconds = this.mappingActiveCoursesMany(activeCoursesMany, 'total_spin_up_time');
                                            const d = moment.duration(miliseconds, 'milliseconds');
                                            const hours = Math.floor(d.asHours());
                                            const mins = Math.floor(d.asMinutes()) - hours * 60;
                                            // let seconds = Math.floor(d.asSeconds()) - mins * 60
                                            return (`${hours}h:${mins}m`);
                                        }}
                                    />
                                    <Column
                                        title="Avg hands-on lab uptime"
                                        key="avg hands-on lab uptime"
                                        render={(text, record) => {
                                            const { activeCoursesMany } = record;
                                            let { count, miliseconds } = this.mappingActiveCoursesMany(activeCoursesMany, 'total_spin_ups', 'total_spin_up_time');
                                            if (!count || !miliseconds) {
                                                return '0 hour/spin-up';
                                            }
                                            miliseconds /= count;
                                            const d = moment.duration(miliseconds, 'milliseconds');
                                            const hours = Math.floor(d.asHours());
                                            const mins = Math.floor(d.asMinutes()) - hours * 60;
                                            return (`${hours}h:${mins}m /spin-up`);
                                        }}
                                    />
                                </Table>
                            </div>

                        </div>

                    </TabPane>

                    <TabPane tab="Lab time requests" key={4}>

                        <div className="lab-time-container">
                            <div>
                                <Title>
                                    Lab Time Requests
                                </Title>
                            </div>
                            <div>
                                <Table size="lg" loading={loading} dataSource={labs} rowKey={item => item.id} pagination={false}>
                                    <Column
                                        title="Title"
                                        key="title"
                                        render={e => <NavLink style={{ color: 'inherit' }} to={`/course-information/${e.course_id}`}>{e.name}</NavLink>}

                                    />
                                    <Column
                                        title="Number of Requests"
                                        key="number_of_requests"
                                        render={(text, record) => this.countLabtimeRequests(record)}
                                        dataIndex={1}
                                    />
                                    <Column
                                        title="Actions"
                                        key="actions"
                                        render={(text, record) => (
                                            <Button type="link" onClick={() => this.getLabtimeRequests(record.id)}>
                                                Requests
                                                <Icon type="right" />
                                            </Button>
                                        )}
                                    />
                                </Table>
                            </div>
                            <LabtimeRequestDrawer
                                onClose={this.closeLabtimeRequestDrawer}
                                visible={labtimeRequestDrawerVisible}
                                showRequestLoader={showRequestLoader}
                                labtimeRequests={labtimeRequests}
                                changeLabtimeRequestStatus={changeLabtimeRequestStatus}
                                deleteLabtimeRequest={deleteLabtimeRequest}
                                getLabtimeRequests={getLabtimeRequests}
                                selectedLabtimeRequest={selectedLabtimeRequest}
                                getLabs={getLabs}
                            />
                        </div>

                    </TabPane>

                    <TabPane tab="Course Proposal Review" key={6}>
                        <CourseProposalReview
                            courseProposalsForReview={courseProposalsForReview}
                        />
                    </TabPane>

                    <TabPane tab="Courses in development" key={7}>
                        <DevelopmentCourses
                            getDevelopmentCourses={getDevelopmentCourses}
                            developmentCourses={developmentCourses}
                        />
                    </TabPane>

                </Tabs>

            </>
        );
    }
}

export default CourseAdministration;
