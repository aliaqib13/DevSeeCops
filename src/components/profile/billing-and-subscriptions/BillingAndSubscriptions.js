import React, { Component } from 'react';
import {
    Button, message,
} from 'antd';
import CreditCard from '../credit-card';
import './BillingAndSubscriptions.scss';

class BillingAndSubscriptions extends Component {
    // Disabled subscription work as part of ATP-2308
    componentDidMount() {
        if (!process.env.REACT_APP_DISABLE_SUBSCRIPTIONS) {
            const { createSubscriptionCustomerPortal } = this.props;

            return createSubscriptionCustomerPortal().then(res => {
                if (res === false) {
                    return message.error('Something went wrong while viewing the billing and subscription information, please try again.');
                }
            }).catch(console.error);
        }
    }

    handleViewButton =() => {
        if (!process.env.REACT_APP_DISABLE_SUBSCRIPTIONS) {
            const { subscriptionCustomerPortalUrl } = this.props;
            if (!subscriptionCustomerPortalUrl) {
                return message.error('Customer portal not available. Try refreshing the page');
            }
            try {
                return window.location.assign(subscriptionCustomerPortalUrl);
            } catch (error) {
                return message.error(error);
            }
        }
    }

    render() {
        const {
            preferences,
            getCCInfo,
            updateCreditCard,
            deleteCreditCard,
            subscriptionCustomerPortal,
            createSubscriptionCustomerPortal,
        } = this.props;

        return (
            <div className='billing-subscriptions-container'>
                <CreditCard
                    getCCInfo={getCCInfo}
                    card_info={preferences.credit_card}
                    updateCreditCard={updateCreditCard}
                    deleteCreditCard={deleteCreditCard}
                    subscriptionCustomerPortal={subscriptionCustomerPortal}
                    createSubscriptionCustomerPortal={createSubscriptionCustomerPortal}
                />
                {
                    !process.env.REACT_APP_DISABLE_SUBSCRIPTIONS
                    && (
                        <div className='view-customer-portal-button'>
                            <Button className='view-button' type='primary' onClick={() => this.handleViewButton()}>View my billing and subscription information</Button>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default BillingAndSubscriptions;
