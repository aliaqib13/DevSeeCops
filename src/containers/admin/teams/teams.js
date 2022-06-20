import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import {
    Button, Tabs, Typography,
} from 'antd';
import './teams.scss';

const { Title } = Typography;

const { TabPane } = Tabs;

const AdminTeams = () => (
    <div className="teams-container">
        <Tabs defaultActiveKey="teams-list">
            <TabPane tab="Teams" key="teams-list">
                <div className="tab-title">
                    <Title>
                        Teams
                    </Title>
                    <NavLink to="/platform/admin/teams/create-team">
                        <Button type="primary">Create team</Button>
                    </NavLink>
                </div>
                <div>
                    <p>Table to retrieve all teams</p>
                </div>

            </TabPane>
        </Tabs>
    </div>
);

export default (withRouter(AdminTeams));
