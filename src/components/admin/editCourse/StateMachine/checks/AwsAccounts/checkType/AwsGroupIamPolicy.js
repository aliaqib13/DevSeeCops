import React from 'react';
import { Input } from 'antd';

const AwsGroupIamPolicy = ({ groupName, handleInputChange, policyName }) => (
    <>

        <div className="small-input" data-testid="groupName-container">
            <span className="inputSpan">Group Name</span>
            <Input
                name="groupName"
                value={groupName}
                onChange={handleInputChange}
            />
        </div>
        <div className="small-input" data-testid="awsGroupPolicyName-container">
            <span className="inputSpan">Policy Name</span>
            <Input
                name="policyName"
                value={policyName}
                onChange={handleInputChange}
            />
        </div>
    </>
);
export default AwsGroupIamPolicy;
