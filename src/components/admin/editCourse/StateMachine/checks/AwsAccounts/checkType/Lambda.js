import React from 'react';
import {
    Input, Select,
} from 'antd';

const { Option } = Select;

const Lambda = ({
    configCheck, handleConfigCheck, functionName, handleInputChange,
}) => (
    <>
        <div className="small-input" data-testid="lambdaConfigCheck-container">
            <span className="inputSpan">Checking config</span>
            <Select
                className="filterSelect"
                style={{ width: '100%' }}
                name="configCheck"
                value={configCheck}
                onChange={handleConfigCheck}
            >
                <Option key="select" value="" disabled selected>Select</Option>

                <Option key="function-code-signing-config" value="function-code-signing-config">function-code-signing-config</Option>
            </Select>
        </div>
        <div className="small-input" data-testid="functionName-container">
            <span className="inputSpan">Function Name</span>
            <Input
                name="functionName"
                value={functionName}
                onChange={handleInputChange}
            />
        </div>
    </>
);

export default Lambda;
