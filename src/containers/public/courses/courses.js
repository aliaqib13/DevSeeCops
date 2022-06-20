import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { fetchPublicCourses } from '../../../store/actions/public/courses';
import './courses.scss';
import Loading from '../../../components/Loading/Loading';
import CoursesSearchbar from '../../../components/courses-searchbar/CoursesSearchbar';
import CoursesGrid from '../../../components/courses-grid/CoursesGrid';

class Courses extends Component {
    constructor(props) {
        super(props);
        this.loader = null;
        this.state = {
            coursesCount: 8,
            categories: [],
            category: '',
            keyword: '',
            loading: false,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.props.fetchPublicCourses().finally(() => {
            this.setState({ loading: false });
        });
        this.loader = message.loading('Loading..', 0);
        this.checkWindowSize(this.state.coursesCount);
        window.addEventListener('resize', () => this.checkWindowSize(this.state.coursesCount));
    }

    checkWindowSize(count) {
        const windowWidth = window.innerWidth;
        let coursesCount = count;
        if (windowWidth > 1715) {
            coursesCount = 8;
        } else if (windowWidth <= 1715 && windowWidth > 1131) {
            coursesCount = 6;
        } else if (windowWidth <= 1131 && windowWidth > 855) {
            coursesCount = 4;
        } else if (windowWidth <= 855) {
            coursesCount = 2;
        }
        this.setState({ coursesCount });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.courses !== this.props.courses) {
            this.loader();
        }
    }

    render() {
        const { courses } = this.props;
        const { categories } = courses;
        const { loading } = this.state;
        return (
            <div className="coursesContainer">
                <CoursesSearchbar
                    fetchCourses={this.props.fetchPublicCourses}
                    categories={categories}
                />

                {!loading
                    ? (
                        <CoursesGrid
                            courses={courses.data}
                        />
                    )
                    : <Loading />}

            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        courses: state.publicCourses,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPublicCourses: (category_id, keyword) => dispatch(fetchPublicCourses(category_id, keyword)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
