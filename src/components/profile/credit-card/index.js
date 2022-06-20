import React, { Component } from 'react';
import {
    message, Typography, Skeleton,
} from 'antd';
import UpdateCCModal from '../../stripe/UpdateCCModal';
import DeleteCCModal from '../../stripe/DeleteCCModal';
import './credit-card.scss';

const { Title, Text } = Typography;

class CreditCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        return this.getCCInfo();
    }

    getCCInfo = () => {
        const loader = message.loading('Loading..', 0);
        const { getCCInfo } = this.props;
        return getCCInfo().then(res => {
            loader();
            this.setState({ loading: false });
            if (res.message) {
                message.destroy();
                return message.warning(res.message);
            }
        });
    }

    render() {
        const { loading } = this.state;
        const { card_info: cardInfo, updateCreditCard, deleteCreditCard } = this.props;
        const {
            brand, last4, exp_month: expMonth, exp_year: expYear,
        } = cardInfo;

        return (
            <div className="credit-card-component">
                <Title level={3}>Default Credit Card</Title>
                <Skeleton loading={loading} paragraph={{ rows: 3 }}>
                    {
                        !last4 ? <p>You do not have any credit card specified. </p>
                            : (
                                <>
                                    <div>
                                        <Text type="secondary">Issuer: </Text>
                                        {' '}
                                        <Text strong>{brand}</Text>
                                        <br />
                                        <Text type="secondary">Credit Card Number: </Text>
                                        {' '}
                                        <Text strong>
                                            ****
                                            {last4}
                                        </Text>
                                        {' '}
                                        <br />
                                        <Text type="secondary">Expiration Date: </Text>
                                        <Text strong>
                                            {`${expMonth} / ${expYear}`}
                                        </Text>
                                    </div>
                                    <UpdateCCModal
                                        updateCreditCard={updateCreditCard}
                                    />
                                    <br />
                                    <DeleteCCModal
                                        deleteCreditCard={deleteCreditCard}
                                    />
                                </>
                            )
                    }
                </Skeleton>

            </div>
        );
    }
}

export default CreditCard;
