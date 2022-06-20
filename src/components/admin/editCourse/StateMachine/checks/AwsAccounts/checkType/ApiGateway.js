import React from 'react';
import {
    Input, Select,
} from 'antd';

const { Option } = Select;

const ApiGateway = ({
    configCheck, handleConfigCheck, method, handleApiGatewayMethod, stage, resourcePath, handleInputChange,
}) => (
    <>
        <div className="small-input" data-testid="apiGatewayConfigCheck-container">
            <span className="inputSpan">Checking config</span>
            <Select
                className="filterSelect"
                style={{ width: '100%' }}
                name="configCheck"
                value={configCheck}
                onChange={handleConfigCheck}
            >
                <Option key="select" value="" disabled selected>Select</Option>

                <Option key="api-response-data" value="api-response-data">api-response-data</Option>
            </Select>
        </div>
        <div className="small-input" data-testid="method-container">
            <span className="inputSpan">Method</span>
            <Select
                className="filterSelect"
                style={{ width: '100%' }}
                name="method"
                value={method}
                onChange={handleApiGatewayMethod}
            >
                <Option key="select" value="" disabled selected>Select</Option>

                {['GET', 'POST', 'PATCH', 'PUT', 'DELETE'].map(httpMethod => <Option key={httpMethod} value={httpMethod}>{httpMethod}</Option>)}
            </Select>
        </div>
        <div className="small-input" data-testid="stage-container">
            <span className="inputSpan">Stage</span>
            <Input
                name="stage"
                value={stage}
                onChange={handleInputChange}
            />
        </div>
        <div className="small-input" data-testid="resourcePath-container">
            <span className="inputSpan">Resource Path</span>
            <Input
                name="resourcePath"
                value={resourcePath}
                onChange={handleInputChange}
            />
        </div>
    </>
);

export default ApiGateway;
