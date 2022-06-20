import React, { Component } from 'react';
import { Tabs, message, Typography } from 'antd';
import Fellows from '../../../components/admin/fellowSettings/fellows';
import FellowGuidelines from '../../../components/admin/fellowSettings/fellowGuidelines';
import LabBlocks from '../../../components/admin/fellowSettings/labBlocks/labBlocks';
import CourseScenarios from '../../../components/admin/fellowSettings/courseScenarios/courseScenarios';
import GoldenStandard from '../../../components/admin/fellowSettings/goldenStandard/goldenStandard';
import MailFellows from '../../../components/admin/fellowSettings/mailFellows/MailFellows';
import FellowNews from '../../../components/admin/fellowSettings/fellowNews/index';

const { TabPane } = Tabs;
const { Title } = Typography;

class FellowSettings extends Component {
    componentDidMount() {
        const loader = message.loading('loading', 0);
        const {
            fetchCategories,
            getCourseTemplates,
            fetchFellowSettings,
            getCourseTypes,
        } = this.props;
        fetchCategories();
        getCourseTemplates();
        fetchFellowSettings().then(res => {
            if (res === true) {
                loader();
                message.success('loaded');
            }
        }).catch(console.error);
        getCourseTypes().then(res => {
            if (res !== true) {
                message.error('Can`t load course types');
            }
        }).catch(console.error);
    }

    render() {
        const {
            adminFellowSettings: {
                fellows, labBlocks, courseScenarios, persons,
            },
            categories, uploadImage, createFellow, updateFellow, deleteFellow, fetchFellowSettings,
            getFellowGuideLines, updateFellowGuidelines, createLabBlock, updateLabBlock,
            deleteLabBlocks, createCourseScenarios, updateCourseScenarios, deleteCourseScenarios,
            sendTestEmail, sendEmailFellows, createCategory, deleteCategory, createCourse,
            uploadFile, courseTemplates, updateTags, fetchTags, searchByCourseTags,
            addGoldenStandardSlug, getGoldenStandardTag, courseTypes, getFellowNews, updateFellowNews,
        } = this.props;
        return (
            <div className="fellow-settings-container">
                <div className="page-title">
                    <Title>
                        Fellow Settings
                    </Title>
                </div>
                <div className="fellow-tabs">
                    <Tabs defaultActiveKey={window.isFromCourseDashboard ? 'course_scenarios' : 'fellow_gallery'}>
                        <TabPane tab="Fellow Gallery" key="fellow_gallery">
                            <Fellows
                                fellows={fellows}
                                persons={persons}
                                uploadFile={uploadImage}
                                createFellow={createFellow}
                                updateFellow={updateFellow}
                                deleteFellow={deleteFellow}
                                fetchFellowSettings={fetchFellowSettings}
                            />
                        </TabPane>
                        <TabPane tab="Fellow Guidelines" key="fellow_guidelines">
                            <FellowGuidelines
                                uploadFile={uploadImage}
                                getFellowGuideLines={getFellowGuideLines}
                                updateFellowGuidelines={updateFellowGuidelines}
                            />
                        </TabPane>
                        <TabPane tab="Lab Building Blocks" key="lab_buildings_blocks">
                            <LabBlocks
                                uploadFile={uploadImage}
                                labBlocks={labBlocks}
                                createLabBlock={createLabBlock}
                                updateLabBlock={updateLabBlock}
                                deleteLabBlocks={deleteLabBlocks}
                                fetchFellowSettings={fetchFellowSettings}
                            />
                        </TabPane>
                        <TabPane tab="Course Scenarios" key="course_scenarios">
                            <CourseScenarios
                                categories={categories}
                                createCourseScenarios={createCourseScenarios}
                                labBlocks={labBlocks}
                                courseScenarios={courseScenarios}
                                updateCourseScenarios={updateCourseScenarios}
                                deleteCourseScenarios={deleteCourseScenarios}
                            />
                        </TabPane>
                        <TabPane tab="Mail Fellows" key="mail_fellows">
                            <MailFellows
                                sendTestEmail={sendTestEmail}
                                sendEmailFellows={sendEmailFellows}
                            />
                        </TabPane>
                        <TabPane tab="Golden Standard" key="golden_standard">
                            <GoldenStandard
                                categories={categories}
                                createCategory={createCategory}
                                deleteCategory={deleteCategory}
                                createCourse={createCourse}
                                uploadFile={uploadFile}
                                courseTemplates={courseTemplates}
                                updateTags={updateTags}
                                fetchTags={fetchTags}
                                searchByCourseTags={searchByCourseTags}
                                addGoldenStandardSlug={addGoldenStandardSlug}
                                getGoldenStandardTag={getGoldenStandardTag}
                                courseTypes={courseTypes}
                            />
                        </TabPane>
                        <TabPane tab="Fellow News" key="fellow_news">
                            <FellowNews
                                uploadFile={uploadImage}
                                getFellowNews={getFellowNews}
                                updateFellowNews={updateFellowNews}
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default FellowSettings;
