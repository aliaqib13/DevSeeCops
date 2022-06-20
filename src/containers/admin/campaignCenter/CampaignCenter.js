import React from 'react';
import { Tabs, Typography } from 'antd';
import PromotionCodes from '../users/promotionCodes';
import PromotionCodesInfo from '../users/promotionCodes/promotionCodesInfo';
import EventAdministration from '../event-administration/EventAdministration';
import Campaigns from '../campaigns';
import CourseInterest from '../courseInterests/CourseInterests';

const { TabPane } = Tabs;
const { Title } = Typography;

function CampaignCenter() {
    return (
        <div className="admin-settings">
            <div className="page-title">
                <Title>
                    Campaign Center
                </Title>
            </div>
            <Tabs defaultActiveKey="promotion-codes">
                <TabPane tab="Promotion Codes" key="promotion-codes">
                    <PromotionCodes />
                </TabPane>
                <TabPane tab="Management Information" key="management-information">
                    <PromotionCodesInfo />
                </TabPane>
                <TabPane tab="Event Administration" key="event_administration">
                    <EventAdministration />
                </TabPane>
                <TabPane tab="Campaigns" key="campaigns">
                    <Campaigns />
                </TabPane>
                <TabPane tab="Course Interest" key="course_interest">
                    <CourseInterest />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default CampaignCenter;
