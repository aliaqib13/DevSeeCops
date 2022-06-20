import React from 'react';
import {
    Input, Select,
} from 'antd';

const { Option } = Select;

const S3_BUCKET_CONFIG_CHECK_OPTIONS = ['contents', 'encryption', 'policy', 'versioning', 'logging', 'public-access-block'];

const S3Bucket = ({
    configCheck, handleConfigCheck, bucketPrefixRegex, handleInputChange,
}) => (
    <>
        <div className="small-input" data-testid="bucketConfigCheck-container">
            <span className="inputSpan">Checking config</span>
            <Select
                className="filterSelect"
                style={{ width: '100%' }}
                name="configCheck"
                value={configCheck}
                onChange={handleConfigCheck}
            >
                <Option key="select" value="" disabled selected>Select</Option>
                {S3_BUCKET_CONFIG_CHECK_OPTIONS.map(option => (
                    <Option key={option} value={option}>{option}</Option>
                ))}
            </Select>
        </div>
        <div className="small-input" data-testid="bucketPrefixRegex-container">
            <span className="inputSpan">S3 Bucket Prefix Regex</span>
            <Input
                name="bucketPrefixRegex"
                value={bucketPrefixRegex}
                onChange={handleInputChange}
            />
        </div>
    </>
);

export default S3Bucket;
