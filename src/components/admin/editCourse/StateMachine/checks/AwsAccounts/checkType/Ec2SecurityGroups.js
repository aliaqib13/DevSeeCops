import React from 'react';
import { Input } from 'antd';

const Ec2SecurityGroups = ({ securityGroupName, handleInputChange }) => (
    <div className="small-input" data-testid="securityGroupName-container">
        <span className="inputSpan">Security Group Name</span>
        <Input
            name="securityGroupName"
            value={securityGroupName}
            onChange={handleInputChange}
        />
    </div>
);

export default Ec2SecurityGroups;
