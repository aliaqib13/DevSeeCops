import React from 'react';
import { Tooltip } from 'antd';
import coursePriceInTokens from './coursePriceInTokens';
import './TokensCount.scss';

const TokensCount = ({ tokenCost }) => (
    <Tooltip title="1 token = 5$">
        <span className="price-in-tokens">
            {coursePriceInTokens(tokenCost)}
        </span>
    </Tooltip>
);

export default TokensCount;
