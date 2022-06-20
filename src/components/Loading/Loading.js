import React from 'react';
import { Spin } from 'antd';
import './loading.scss';

const Loading = () => (
    <div className="loading-container">
        <Spin size="large" tip="Loading..." />
    </div>
);

export default Loading;
