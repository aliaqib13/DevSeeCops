import React from 'react';
import { Tabs, Typography } from 'antd';
import BetaTestInstructions from '../../../components/admin/betaTestSettings/betaTestInstructions';
import MailBetaTesters from '../../../components/admin/betaTestSettings/MailBetaTesters/MailBetaTesters';

const { TabPane } = Tabs;
const { Title } = Typography;

const BetaTestSettings = ({
    uploadFile,
    getBetaTestInstructions,
    updateBetaTestInstructions,
    sendTestEmail,
    sendEmailBetaTesters,
}) => (
    <div className="admin-settings">
        <div className="page-title">
            <Title>
                Beta Test Settings
            </Title>
        </div>
        <Tabs defaultActiveKey="faq">
            <TabPane tab="Beta Test Instructions" key="beta_test_instructions">
                <BetaTestInstructions
                    uploadFile={uploadFile}
                    getBetaTestInstructions={getBetaTestInstructions}
                    updateBetaTestInstructions={updateBetaTestInstructions}
                />
            </TabPane>
            <TabPane tab="Mail Beta Testers" key="mail_beta_testers">
                <MailBetaTesters
                    sendTestEmail={sendTestEmail}
                    sendEmailBetaTesters={sendEmailBetaTesters}
                />
            </TabPane>
        </Tabs>
    </div>
);

export default BetaTestSettings;
