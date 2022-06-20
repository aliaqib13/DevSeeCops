import React, { Component } from 'react';
import { Tabs, message, Typography } from 'antd';
import CoursesGrid from '../../components/courses-grid/CoursesGrid';
import DraftCourseTable from '../../components/draft-course-table/DraftCourseTable';
import FellowGuideline from '../../components/fellow-guideline/fellow-guideline';
import FellowNews from '../../components/fellow-news/fellow-news';
import FellowDesiredCourses from '../../components/fellow-desired-courses/FellowDesiredCourses';
import MyProposals from '../../components/my-proposals/MyProposals';

const { TabPane } = Tabs;
const { Title } = Typography;

class FellowArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fellowName: '',
            chapters: [],
            activeKey: '1',
            scenario: '',
            category: '',
            object: '',
            news: [],
        };
    }

    componentDidMount() {
        const {
            getDesiredCourses,
            getFellowNews,
            getFellowGuideLines,
            fetchFellowCourses,
            fetchFellowCoursesAdmin,
            getProposals,
            match: {
                params: {
                    id,
                },
            },
            location,
        } = this.props;
        const url = location.pathname;

        const loader = message.loading('Loading..', 0);

        return Promise.allSettled([
            this.checkUrlForAdmin(url)
                ? fetchFellowCoursesAdmin(id).then(() => {
                    this.setState({
                        fellowName: `${this.props.fellowArea.user[0].firstname} ${this.props.fellowArea.user[0].lastname}`,
                    });
                })
                : fetchFellowCourses().then(() => {
                    this.setState({
                        fellowName: `${this.props.fellowArea.user[0].firstname} ${this.props.fellowArea.user[0].lastname}`,
                    });
                }),
            getFellowGuideLines().then(res => {
                loader();
                if (res.status === 200) {
                    this.setState({
                        chapters: res.data.content,
                    });
                } else {
                    message.error(res);
                }
            }),
            getFellowNews().then(res => {
                if (res && res.data && res.data.content) {
                    this.setState({ news: res.data.content });
                }
            }),
            getDesiredCourses(),
            getProposals(),
        ])
            .then(results => {
                // Check if any promises rejected and log the error.
                results.forEach(res => {
                    if (res.status !== 'fulfilled') {
                        console.error(res.reason);
                    }
                });
            })
            .catch(console.error);
    }

    checkUrlForAdmin = urlToCheck => urlToCheck.includes('/admin/')

    changeTab = key => {
        this.setState({
            activeKey: key, scenario: '', category: '', object: '',
        });
    }

    setScenario = (title, category, object) => {
        this.setState({ scenario: title, category, object }, this.setDraftCategory);
    }

    setDraftCategory = () => {
        if (this.draftCourseComponent && this.draftCourseComponent.state.drafts.length) {
            this.draftCourseComponent.setCategory();
            this.draftCourseComponent.setVulnerableObject();
        }
    }

    render() {
        const {
            fellowArea,
            user,
            createCourseProposal,
            saveDrafts,
            submitDrafts,
            clearDrafts,
            getCourseRequiredFields,
            createCourse,
            searchByCourseTags,
            match: { params: { id } },
            location,
            sendQuestionsToSupportTeam,
        } = this.props;
        const {
            fellowName, activeKey, scenario, category, object, chapters, news,
        } = this.state;

        const url = location.pathname;

        return (
            <div>
                <Title className="fellowAreaTitle" level={4}>{fellowName}</Title>
                <Tabs activeKey={window.activeKeyFellowArea || activeKey} onChange={key => this.changeTab(key)}>
                    <TabPane tab="Fellow Courses" key={1}>
                        <CoursesGrid
                            user={user}
                            courses={fellowArea.fellow_courses}
                            hideCourseInfoIcons
                        />
                    </TabPane>
                    <TabPane tab="Desired Courses" key={7}>
                        <FellowDesiredCourses
                            desiredCourses={fellowArea.desiredCourses}
                            categories={fellowArea.categories}
                            createCourseProposal={createCourseProposal}
                            sendQuestionsToSupportTeam={sendQuestionsToSupportTeam}
                        />
                    </TabPane>
                    <TabPane tab="My Proposals" key={8}>
                        <MyProposals
                            proposals={fellowArea.proposals}
                            categories={fellowArea.categories}
                            findCategory={this.findCategory}
                        />
                    </TabPane>
                    <TabPane tab="Draft Course" key={2}>
                        {this.checkUrlForAdmin(url) ? (
                            <DraftCourseTable
                                draft={fellowArea.draft}
                                saveDrafts={saveDrafts}
                                submitDrafts={submitDrafts}
                                clearDrafts={clearDrafts}
                                categories={fellowArea.categories}
                                scenario={scenario}
                                category={category}
                                object={object}
                                ref={ref => this.draftCourseComponent = ref}
                                fellowName={fellowName} // Admin
                                user_id={id} // Admin
                                getCourseRequiredFields={getCourseRequiredFields} // Admin
                                createCourse={createCourse} // Admin
                                searchByCourseTags={searchByCourseTags} // Admin
                                activeKey={activeKey} // Admin
                            />
                        ) : (
                            <DraftCourseTable
                                draft={fellowArea.draft}
                                saveDrafts={saveDrafts}
                                submitDrafts={submitDrafts}
                                clearDrafts={clearDrafts}
                                categories={fellowArea.categories}
                                scenario={scenario}
                                category={category}
                                object={object}
                                user={user}
                                ref={ref => this.draftCourseComponent = ref}
                            />
                        )}
                    </TabPane>
                    <TabPane tab="Guideline" key={3}>
                        <FellowGuideline
                            chapters={chapters}
                        />
                    </TabPane>
                    <TabPane tab="Fellow News" key={6}>
                        <FellowNews
                            news={news}
                        />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default FellowArea;
