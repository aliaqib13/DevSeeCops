import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Typography, Table, Button, message, Modal, Input, AutoComplete, Tag, Select,
} from 'antd';
import { NavLink } from 'react-router-dom';
import {
    fetchCertificates, deleteCertificate, updateCertificate, searchByCourse,
} from '../../../store/actions/admin/menageCertificates';
import UpdateCertificate from '../../../components/admin/certificates/updateCertificate';

const { Option, OptGroup } = Select;
const { Title } = Typography;
const { Column } = Table;
const confirmModal = Modal.confirm;

class CertificateManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            visible: false,
            updatingCertificate: [],
            searchByType: '',
            userSearch: '',
            searchCourse: '',
            searchCourseList: [],
            searchTags: [],
        };
    }

    componentDidMount() {
        const loader = message.loading('Please Wait...', 0);
        if (this.props?.match?.params?.type) {
            this.setState({
                searchByType: this.props.match.params.type,
            });
        }
        this.props.fetchCertificates({ type: this.props?.match?.params?.type || '' }).then(res => {
            if (res === true) {
                this.setState({
                    loading: false,
                });
            } else {
                message.error(res.message);
            }
            loader();
        });
    }

    onlyUnique = (value, index, self) => self.indexOf(value) === index

    deleteCertificate = id => {
        confirmModal({
            title: 'Are you sure delete this Certificate',
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk: () => {
                const loader = message.loading('Deleting...', 0);
                this.props.deleteCertificate(id).then(res => {
                    if (res === true) {
                        message.success('Deleted!');
                    } else {
                        message.error('something went wrong');
                    }
                    loader();
                });
            },
        });
    }

    toggleModal = () => {
        this.setState({
            visible: !this.state.visible,
        });
    }

    updateCertificate = id => {
        const { certificates } = this.props.certificates;
        const certificate = certificates.find(x => x.id === id);
        this.setState({
            updatingCertificate: certificate,
        });
        this.toggleModal();
    }

    searchUser = e => {
        this.setState({
            userSearch: e.target.value,
        });
        if (e.target.value.length < 25) {
            this.props.fetchCertificates({
                user: e.target.value,
                type: this.state.searchByType,
            });
        }
    }

    onChangeCourseName = searchCourse => {
        this.setState({
            searchCourse,
        });
    }

    searchByCourse = text => {
        if (text === '') {
            this.setState({
                searchCourseList: [],
            });
            return;
        }
        this.props.searchByCourse(text, this.state.searchTags).then(res => {
            if (res.status < 300) {
                const courses = res.data.courses.filter(this.onlyUnique);
                const filterBySearchTagsCourses = this.filterBySearchTagsCourses(courses);
                this.setState({
                    searchCourseList: filterBySearchTagsCourses,
                });
            }
        });
    }

    onSelectCourse = text => {
        if (text === '') {
            this.setState({
                searchCourseList: [],
            });
            return;
        }
        this.setState(prevState => {
            const searchTags = [...prevState.searchTags, text];
            return { searchTags };
        });
        this.setState({ searchCourse: '' });
        const tagsData = [...this.state.searchTags, text];
        this.props.searchByCourse(text, tagsData).then(res => {
            if (res.status < 300) {
                this.setState({
                    searchCourseList: [],
                });
            }
        });
    }

    handleCloseTag = removedTag => {
        const text = this.state.searchCourse;
        const searchTags = this.state.searchTags.filter(tag => tag !== removedTag);
        this.setState({ searchTags });
        this.props.searchByCourse(text, searchTags);
    }

    filterBySearchTagsCourses = courses => courses.filter(
        function (e) {
            return this.indexOf(e) < 0;
        },
        this.state.searchTags,
    )

    changeSearchStatus = e => {
        this.setState({
            searchByType: e,
        });
        this.props.fetchCertificates({
            user: this.state.userSearch,
            type: e,
        });
    }

    render() {
        const { certificates } = this.props.certificates;
        const {
            loading, visible, updatingCertificate, userSearch, searchCourseList, searchCourse, searchTags, searchByType,
        } = this.state;

        return (
            <div className="menage-certificate-container">
                <div className="page-title">
                    <Title>
                        Manage Certificates
                    </Title>
                </div>
                {
                    certificates
                        ? (
                            <div>
                                <Table loading={loading} dataSource={certificates} rowKey={item => item.id} pagination={{ position: 'bottom', pageSize: 6 }}>
                                    <Column
                                        render={e => <NavLink style={{ color: 'inherit' }} to={`/course-information/${e.cert_info?.course_id}`}>{e.lab_name}</NavLink>}
                                        key="course_name"
                                        title={() => (
                                            <>
                                                <AutoComplete
                                                    style={{ width: 300 }}
                                                    placeholder="Search by Course/Lab name"
                                                    onChange={this.onChangeCourseName}
                                                    onSearch={this.searchByCourse}
                                                    onSelect={this.onSelectCourse}
                                                    dataSource={searchCourseList}
                                                    value={searchCourse}
                                                />
                                                <div>
                                                    {searchTags.map(tag => (
                                                        <Tag style={{ margin: '3px 3px 0 0' }} key={tag} closable onClose={() => this.handleCloseTag(tag)}>
                                                            {tag}
                                                        </Tag>
                                                    ))}
                                                </div>

                                            </>
                                        )}
                                    />
                                    <Column
                                        title={() => (
                                            <Select value={searchByType} placeholder="Type of Certificates" style={{ width: 200 }} onChange={this.changeSearchStatus}>
                                                <OptGroup label="Type of Certificates">
                                                    <Option value="">All</Option>
                                                    <Option value="completion">Completion</Option>
                                                    <Option value="theory">Theory</Option>
                                                    <Option value="attendance">Attendance</Option>
                                                </OptGroup>
                                            </Select>
                                        )}
                                        dataIndex="type"
                                        key="certificate_type"
                                    />
                                    <Column
                                        title={() => (
                                            <Input
                                                style={{ width: 250 }}
                                                value={userSearch}
                                                placeholder="Search by User Name"
                                                onChange={this.searchUser}
                                            />
                                        )}
                                        render={e => <NavLink to={`/platform/admin/user-statistics/${e.users.id}`}>{e.users.certificate_name}</NavLink>}
                                        key="certificate_owner"
                                    />
                                    <Column
                                        title="Classical Certificate"
                                        render={(text, record) => (
                                            <a href={record.image} target="__blank">
                                                {' '}
                                                <img src={record.image} alt="" width={100} />
                                            </a>
                                        )}
                                        key="classical_certificate"
                                        dataIndex="image"
                                    />
                                    <Column
                                        title="Certificate Badge"
                                        render={(text, record) => (
                                            <a href={record.badge} target="__blank">
                                                {' '}
                                                <img src={record.badge} alt="" width={100} />
                                            </a>
                                        )}
                                        key="badge_certificate"
                                    />
                                    <Column
                                        title="Actions"
                                        key="actions"
                                        render={(text, record) => (
                                            <div className="actions-btns">
                                                <Button type="danger" onClick={() => this.deleteCertificate(record.id)} shape="round">Delete</Button>
                                                <Button type="primary" style={{ marginLeft: '10%' }} onClick={() => this.updateCertificate(record.id)} shape="round">Update </Button>
                                            </div>
                                        )}
                                    />

                                </Table>
                            </div>
                        ) : <div><h3>There is no any certificates</h3></div>
                }
                {visible && (
                    <UpdateCertificate
                        visible={visible}
                        toggleModal={this.toggleModal}
                        updatingCertificate={updatingCertificate}
                        updateCertificate={(id, data) => this.props.updateCertificate(id, data)}
                    />
                ) }

            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        certificates: state.adminCertificates,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        fetchCertificates: search => dispatch(fetchCertificates(search)),
        deleteCertificate: id => dispatch(deleteCertificate(id)),
        updateCertificate: (id, data) => dispatch(updateCertificate(id, data)),
        searchByCourse: (course, searchTags) => dispatch(searchByCourse(course, searchTags)),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CertificateManager);
