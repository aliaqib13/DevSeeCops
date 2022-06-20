import React, { Component } from 'react';
import {
    Table, Select, message, Button, Modal,
} from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './learning-path.scss';

const { Option } = Select;
const { Column } = Table;

class LearningPath extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterBy: 'no_filter',
            filterByCompleted: 'completed',
            recommendedCourses: [],
            coursesCompleted: [],
            coursesNotCompleted: [],
            hasCategoriesPreferred: false,
            hasTagsPreferred: false,
            showModal: false,
            selectedCourses: [],
            selectedCoursesTitles: [],
        };
    }

    componentDidMount() {
        const { preferences } = this.props;
        if (preferences && preferences.content) {
            let filterBy = '';
            const hasCategoriesPreferred = preferences.content.category ? preferences.content.category.length : 0;
            const hasTagsPreferred = preferences.userCourseTags ? preferences.userCourseTags.length : 0;
            if (!hasCategoriesPreferred && hasTagsPreferred) {
                filterBy = 'tags';
            } else if (hasCategoriesPreferred && !hasTagsPreferred) {
                filterBy = 'categories';
            } else {
                filterBy = 'both';
            }
            this.setState({ filterBy, hasCategoriesPreferred, hasTagsPreferred }, this.getData);
        } else {
            this.getData();
        }
    }

    getData = () => {
        const { filterBy, filterByCompleted } = this.state;
        const finished = filterByCompleted === 'completed' ? 1 : 0;
        this.props.getLearningPath(filterBy, finished).then(res => {
            if (!res) {
                message.error(res.message);
            } else if (finished) {
                this.setState({ recommendedCourses: res.recommendedCourses, coursesCompleted: res.courses }, this.setCertificateData);
            } else {
                this.setState({ recommendedCourses: res.recommendedCourses, coursesNotCompleted: res.courses });
            }
        });
    }

    filterBy = value => {
        this.setState({ filterBy: value }, this.getData);
    }

    filterByCompleted = value => {
        this.setState({ filterByCompleted: value }, this.getData);
    }

    setCertificateData = () => {
        const { coursesCompleted } = this.state;
        this.setState({ selectedCourses: [], selectedCoursesTitles: [] }, () => {
            if (coursesCompleted && coursesCompleted.length) {
                coursesCompleted.map(item => this.onSelected(item.course.title));
            }
        });
    }

    onDeselected = value => {
        const { selectedCourses, selectedCoursesTitles, coursesCompleted } = this.state;
        const courseCompleted = coursesCompleted.find(item => item.course.title === value);
        selectedCourses.splice(selectedCourses.indexOf(courseCompleted.course.id), 1);
        selectedCoursesTitles.splice(selectedCoursesTitles.indexOf(courseCompleted.course.title), 1);
        this.setState({
            selectedCourses,
            selectedCoursesTitles,
        });
    }

    onSelected = value => {
        const { selectedCourses, selectedCoursesTitles, coursesCompleted } = this.state;
        const courseCompleted = coursesCompleted.find(item => item.course.title === value);
        if (!selectedCourses.includes(courseCompleted.course.id)) {
            selectedCourses.push(courseCompleted.course.id);
            selectedCoursesTitles.push(courseCompleted.course.title);
            this.setState({
                selectedCourses,
                selectedCoursesTitles,
            });
        }
    }

    toggleStateModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    }

    createCertificate = () => {
        const { selectedCourses } = this.state;
        if (!selectedCourses.length) {
            message.error('Please select at least one course');
        } else {
            this.props.createCertificateOfProgress({ coursesForCertificate: selectedCourses }).then(res => {
                if (res === true) {
                    message.success('Your new Certificate of Progress has been created. Find it in ‘Certificates of Progress’ table below and share it !', 4);
                    this.toggleStateModal();
                    this.props.fetchUserCertificates();
                } else {
                    message.error('Something went wrong');
                }
            });
        }
    }

    render() {
        const {
            filterBy, filterByCompleted, coursesCompleted,
            coursesNotCompleted, hasCategoriesPreferred, hasTagsPreferred, showModal, selectedCoursesTitles,
        } = this.state;
        return (
            <div className="learning-path-container">
                <p className="learning-path-tab-info">
                    Here you can select your completed courses and create a new Certificate of Progress of completed courses based on your selection.
                    First decide if you want to filter based on category and/or tags you have chosen in your preferences.
                    Then you use ‘Create Certificate’.
                    You can view and distribute your new Certificate of Progress in the tab ‘My Certificate of Progress’.
                </p>
                <Modal
                    title="Certificate of Progress Based On Filter"
                    visible={showModal}
                    width="25%"
                    onCancel={this.toggleStateModal}
                    footer={[
                        <Button key="back" onClick={this.toggleStateModal}>
                            Cancel
                        </Button>,
                        <Button key="create" type="primary" onClick={this.createCertificate}>
                            Create
                        </Button>,
                    ]}
                >
                    <div style={{ marginBottom: '10px' }}>Completed courses to be included</div>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Select Multiple"
                        value={selectedCoursesTitles}
                        notFoundContent={null}
                        onDeselect={this.onDeselected}
                        onSelect={this.onSelected}
                        filterOption
                    >
                        { coursesCompleted && coursesCompleted.map(item => (
                            <Select.Option key={item.course.id} value={item.course.title}>
                                {item.course.title}
                            </Select.Option>
                        ))}
                    </Select>
                </Modal>
                <div style={{ padding: '15px' }}>
                    <span>Select values for filter</span>
                    {(hasCategoriesPreferred || hasTagsPreferred)
                    && (
                        <Select className="learning-path-action-block" placeholder="Filter by" value={filterBy} onChange={this.filterBy}>
                            <Option value="no_filter">No Filter</Option>
                            {(hasCategoriesPreferred && hasTagsPreferred) && <Option value="both">Both</Option>}
                            {hasCategoriesPreferred && <Option value="categories">Categories</Option>}
                            {hasTagsPreferred && <Option value="tags">Tags</Option>}
                        </Select>
                    )}
                    <Select className="learning-path-action-block" placeholder="Filter by" value={filterByCompleted} onChange={this.filterByCompleted}>
                        <Option value="completed">Completed</Option>
                        <Option value="not_completed">Not Completed</Option>
                    </Select>
                    <Button
                        type="primary"
                        className="learning-path-action-block"
                        onClick={this.toggleStateModal}
                        disabled={!coursesCompleted || !coursesCompleted.length}
                    >
                        Create Certificate
                    </Button>
                </div>
                {filterByCompleted === 'completed'
                    ? (
                        <>
                            <h2 className="learning-path-header">Courses Completed</h2>
                            <Table dataSource={coursesCompleted}>
                                <Column
                                    title="Course Image"
                                    key="course_image"
                                    render={(text, record) => <img src={record.course.image} width={40} height={40} alt="course_image" />}
                                />
                                <Column
                                    title="Course Name"
                                    key="course_name"
                                    render={(text, record) => (
                                        <span>
                                            {' '}
                                            {record.course.title}
                                            {' '}
                                        </span>
                                    )}
                                />
                                <Column
                                    title="Date of Completion"
                                    key="date_of_completion"
                                    render={(text, record) => (
                                        <span>
                                            {record.certificate.created_at
                                                ? moment(record.certificate.created_at).format('MMMM Do YYYY') : 'None'}
                                        </span>
                                    )}
                                />
                                <Column
                                    title="Level of Completion"
                                    key="level_of_completion"
                                    render={(text, record) => <span>{record.user_level}</span>}
                                />
                                <Column
                                    title="Labtime needed"
                                    key="labtime_needed"
                                    render={(text, record) => {
                                        let miliseconds = 0;
                                        if (record.activeLabs) {
                                            for (let j = 0; j < record.activeLabs.length; j++) {
                                                miliseconds += record.activeLabs[j].total_spin_up_time;
                                            }
                                        }
                                        const d = moment.duration(miliseconds, 'milliseconds');
                                        const hours = Math.floor(d.asHours());
                                        const mins = Math.floor(d.asMinutes()) - hours * 60;
                                        // let seconds = Math.floor(d.asSeconds()) - mins * 60
                                        return (`${hours}h:${mins}m`);
                                    }}
                                />
                            </Table>
                        </>
                    )
                    : (
                        <>
                            <h2 className="learning-path-header">Courses Not Completed</h2>
                            <Table dataSource={coursesNotCompleted}>
                                <Column
                                    title="Course Image"
                                    key="course_image"
                                    render={(text, record) => <img src={record.course.image} width={40} height={40} alt="course_image" />}
                                />
                                <Column
                                    title="Course Name"
                                    key="course_name"
                                    render={(text, record) => (
                                        <span>
                                            {' '}
                                            {record.course.title}
                                            {' '}
                                        </span>
                                    )}
                                />
                                <Column
                                    title="Action"
                                    key="action"
                                    render={(text, record) => <Button><Link to={`tl/${record.id}`}>Resume</Link></Button>}
                                />

                            </Table>
                        </>
                    )}
            </div>
        );
    }
}

export default LearningPath;
