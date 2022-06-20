import React from 'react';
import './SubscriptionDisplay.scss';

const SubscriptionDisplay = ({ subscription }) => {
    if (!subscription) {
        return null;
    }

    return (
        <div className='subscription-display'>
            <p>{subscription.subscriptionName}</p>
        </div>
    );
};

export default SubscriptionDisplay;
