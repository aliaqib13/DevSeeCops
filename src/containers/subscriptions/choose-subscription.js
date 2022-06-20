import React, { Component } from 'react';
import {
    Typography, message, Row, Col, Button, Modal,
} from 'antd';
import Loading from '../../components/Loading/Loading';

import './choose-subscription.scss';

const { Title } = Typography;

class ChooseSubscription extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        const { getTokenSubscriptions, getUserSubscriptionsInformation } = this.props;

        getUserSubscriptionsInformation()
            .then(res => {
                if (res === false) {
                    return message.error('Something went wrong while getting userSubscription, please try again.');
                }
            })
            .catch(console.error);

        return getTokenSubscriptions().then(res => {
            if (res === false) {
                return message.error('Something went wrong while getting subscriptions, please try again.');
            }
        }).catch(console.error);
    }

    createCheckoutSession(subscriptionId) {
        const { createSubscriptionCheckoutSession } = this.props;
        return createSubscriptionCheckoutSession(subscriptionId).then(resURL => {
            window.location.assign(resURL);
        }).catch(console.error);
    }

    confirmModal(subscription, userSubscriptionName) {
        Modal.confirm({
            title: 'Confirm changing subscription',
            content: `Are you sure you want to change your current monthly subscription to ${subscription.name}?
                This action will cancel your monthly ${userSubscriptionName} subscription`,
            okText: 'Update my subscription',
            onOk: () => this.createCheckoutSession(subscription.subscriptionId),
            cancelText: 'Cancel changing subscription',
            width: 600,
        });
    }

    handleSubscriptionSelect = (e, subscription, userSubscriptionName) => {
        e.preventDefault();

        if (userSubscriptionName) {
            return this.confirmModal(subscription, userSubscriptionName);
        }

        return this.createCheckoutSession(subscription.subscriptionId);
    }

    render() {
        const { tokenSubscriptionsInformation, userSubscription } = this.props;

        if (tokenSubscriptionsInformation === null) {
            return <Loading />;
        }

        let userSubscriptionName = null;

        if (userSubscription && userSubscription.subscriptionName) {
            userSubscriptionName = userSubscription.subscriptionName.substr(0, userSubscription.subscriptionName.indexOf(' '));
        }

        return (
            <div className='choose-subscription-container'>
                <div className="page-title">
                    <Title>Choose subscription</Title>
                </div>
                <Row className='subscriptions-container'>
                    {
                        tokenSubscriptionsInformation.map(subscription => (
                            <Col key={subscription.name} className='subscription-card'>
                                <h2>{subscription.name}</h2>
                                <div className='card-body'>
                                    <div className={`triangle-arrow ${subscription.name.toLowerCase()}`} />
                                    <div>
                                        <p className='tokens-amount'>
                                            {`${subscription.tokens} Tokens`}
                                        </p>
                                        <p className='tokens-cost'>
                                            {`${subscription.USDPrice} $ / month`}
                                        </p>
                                    </div>
                                    <div style={{ flex: '1 1 0px', height: '1px' }}>&nbsp;</div>
                                    {subscription.name === userSubscriptionName
                                        ? <p className='current-text'>Current Subscription</p>
                                        : (
                                            <Button className='select-button' onClick={e => this.handleSubscriptionSelect(e, subscription, userSubscriptionName)}>
                                                Select
                                            </Button>
                                        )}

                                </div>
                            </Col>
                        ))
                    }
                </Row>
                <Row>
                    <div className='subscriptions-info-footer'>
                        <ul>
                            <li>
                                Cancel at any time - You can use any accumulated tokens even after your subscription is cancelled
                            </li>
                            <li>
                                Billed monthly
                            </li>
                        </ul>
                    </div>
                </Row>
            </div>
        );
    }
}

export { ChooseSubscription };
export default ChooseSubscription;
