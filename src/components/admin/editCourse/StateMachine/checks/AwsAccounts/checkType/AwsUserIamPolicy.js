import React from 'react';
import { Input } from 'antd';

const AwsUserIamPolicy = ({ userName, handleInputChange, policyName }) => (
    <>
        <div
            className="small-input"
            data-testid="username-container"
        >
            <span className="inputSpan">User name</span>
            <Input
                name="userName"
                value={userName}
                onChange={handleInputChange}
            />
        </div>
        <div className="small-input" data-testid="policyName-container">
            <span className="inputSpan">Policy name</span>
            <Input
                name="policyName"
                value={policyName}
                onChange={handleInputChange}
            />
        </div>
    </>
);
export default AwsUserIamPolicy;
