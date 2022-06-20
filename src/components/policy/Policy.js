import React from 'react';
import { Tabs } from 'antd';
import UserAgreement from './pages/UserAgreement';
import CookiePolicy from './pages/CookiePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './Policy.scss';

const { TabPane } = Tabs;

const Policy = () => (
    <div className="privacy-policy">
        <img src="/img/academy_logo.svg" className="logo" alt="DevSecOps Academy" />
        <Tabs defaultActiveKey="general_user_agreement">
            <TabPane tab="General User Agreement" key="general_user_agreement">
                <UserAgreement />
            </TabPane>
            <TabPane tab="Privacy Policy" key="privacy_policy">
                <PrivacyPolicy />
            </TabPane>
            <TabPane tab="Cookie policy" key="cookie_policy">
                <CookiePolicy />
            </TabPane>
        </Tabs>
    </div>
);

export default Policy;
