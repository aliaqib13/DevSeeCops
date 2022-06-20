import React, { Component } from 'react';
import {
    Modal, Button, Card, message,
} from 'antd';
import ReactGA from 'react-ga';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CATEGORIES, ACTIONS } from '../../util/GAEventConstants';
import CardForm from './forms/CardForm';
import IdealBankForm from './forms/IdealBankForm';
import './payment-modal.scss';

import { TOKEN_EXCHANGE, DUTCH_VAT } from '../../util/constants';
import calculatePriceFromTokens from '../../util/calculatePriceFromTokens';
import calculatePriceWithVAT from '../../util/calculatePriceWithVAT';
import AdjustedCostDetails from './forms/AdjustedCostDetails';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

class PaymentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            openModalLoading: false,
            credit_card: null,
            // To be fixed as part of ATP-2359
            // Disabling ideal by defaulting to creditcard
            // payment_method: '',
            payment_method: 'creditCard',
            pricesEUR: {},
            pricesUSD: {},
            couponName: '',
            promoCode: null,
            invalidPromo: false,
        };
    }

    componentDidMount() {
        const pricesEUR = this.calculatePrices('EUR');
        const pricesUSD = this.calculatePrices('USD');
        this.setState({
            pricesEUR,
            pricesUSD,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.tokenBalance !== this.props.tokenBalance) {
            const pricesEUR = this.calculatePrices('EUR');
            const pricesUSD = this.calculatePrices('USD');
            this.setState({
                pricesEUR,
                pricesUSD,
            });
        }
        if (prevState.promoCode !== this.state.promoCode) {
            if (this.state.promoCode.coupon) {
                const pricesEUR = this.calculatePrices('EUR', this.state.promoCode.coupon.percent_off);
                const pricesUSD = this.calculatePrices('USD', this.state.promoCode.coupon.percent_off);
                this.setState({
                    pricesEUR,
                    pricesUSD,
                });
            }
        }
    }

    calculatePrices(currency, discountPercentage) {
        const { course: { token_cost: tokenCost }, tokenBalance } = this.props;
        const userTokens = tokenBalance || 0;
        if (typeof currency === 'undefined' || typeof currency !== 'string') {
            throw new Error('currency param is either undefined or not of type string');
        }
        const TOKENRATE = TOKEN_EXCHANGE[currency] || TOKEN_EXCHANGE.USD;
        let tokensToDeduct = 0;
        let subTotal = 0;
        // Calculate price from course token cost
        const coursePrice = Number(calculatePriceFromTokens(tokenCost, TOKENRATE));

        subTotal = coursePrice;

        // Check if discount needs to be applied. Then apply first
        if (discountPercentage) {
            subTotal = Number(coursePrice - (coursePrice * discountPercentage / 100)).toFixed(2);
        }
        // Calculate amount of tokens required, rounded down
        const remainingAmountInTokens = Math.floor(subTotal / TOKENRATE);
        // Only take the smallest of the 2 values
        tokensToDeduct = Math.min(remainingAmountInTokens, userTokens);
        // Translate tokens to currency
        const valueOfTokensToDeduct = Number(calculatePriceFromTokens(tokensToDeduct, TOKENRATE));
        // Sum the previous values
        const beforeVAT = (subTotal - valueOfTokensToDeduct).toFixed(2);
        // Calculate total remaining
        const total = Number(calculatePriceWithVAT(beforeVAT, DUTCH_VAT)).toFixed(2);
        return {
            coursePrice,
            tokensToDeduct,
            valueOfTokensToDeduct,
            subTotal,
            beforeVAT,
            total,
        };
    }

    openPaymentModal = () => {
        const { checkCustomer, course: { title } } = this.props;
        this.setState({ openModalLoading: true });
        ReactGA.event({
            category: CATEGORIES.PURCHASE_NOW,
            action: ACTIONS.PURCHASE_COURSE(title),
            label: 'Purchase now',
        });
        return checkCustomer().then(res => {
            if (res !== false) {
                this.setState({
                    credit_card: res,
                });
            }

            this.setState({
                openModalLoading: false,
                visible: true,
            });
        });
    }

    closePaymentModal = () => {
        this.setState({
            visible: false,
            credit_card: null,
            openModalLoading: false,
            // To be fixed as part of ATP-2359
            // Disabling ideal by defaulting to creditcard
            // payment_method: '',
            payment_method: 'creditCard',
        });
    }

    selectPaymentMethod = paymentMethod => {
        this.setState({ payment_method: paymentMethod });
    }

    verifyCoupon = couponName => {
        const { verifyCoupon } = this.props;
        message.loading('Loading..');
        return verifyCoupon(couponName).then(res => {
            message.destroy();
            if (res.actioncode && res.actioncode.coupon) {
                const promoCode = res.actioncode;
                this.setState({
                    promoCode,
                });
                message.success('Promotion code verified!');
            } else {
                message.error('Promotion code is either invalid or expired.', 3);
                this.setState({
                    invalidPromo: true,
                });
            }
        });
    };

    onChangeCouponName = e => {
        const { value } = e.target;
        let { timer } = this;
        this.setState({
            couponName: value,
            promoCode: '',
        });
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (value) {
                this.verifyCoupon(value);
            }
        }, 1000);
    };

    render() {
        const {
            promoCode,
            visible,
            payment_method,
            openModalLoading,
            credit_card,
            pricesEUR,
            pricesUSD,
            invalidPromo,
            couponName,
        } = this.state;

        const {
            course,
            user,
            buyOneGetOneFreeCampaign,
            payCourse,
            getCurrentTokenBalance,
        } = this.props;

        const userIsTeamMember = user.teams && user.teams.length > 0 ? 'request-team-active' : '';

        // sourceData obj is used for stripe ideal payments when using an <IdealBankElement />
        // Stripe takes amount as a whole number in the lowest possible (value)? so in our case (USD/EUR) it's cents
        const sourceData = {
            type: 'ideal',
            amount: Number(pricesEUR.total * 100),
            currency: 'eur',
            statement_descriptor: course.title,
            owner: {
                name: `${user.firstname} ${user.lastname}`,
            },
            metadata: {
                course_id: course.id,
                user_id: user.id,
                discounts: promoCode ? JSON.stringify({ coupon_id: promoCode.coupon.id, promo_code: promoCode.id }) : '',
            },
            redirect: {
                return_url: window.location.href,
            },
        };

        return (
            <div className="payment-modal-content">
                <Button className={`open-modal-btn ${userIsTeamMember}`} type="primary" loading={openModalLoading} onClick={this.openPaymentModal}>Purchase now</Button>
                <p style={{ textAlign: 'center' }}>
                    {
                        Boolean(buyOneGetOneFreeCampaign)
                        && Boolean(buyOneGetOneFreeCampaign.active)
                        && buyOneGetOneFreeCampaign.config && buyOneGetOneFreeCampaign.config.bellowButtonText
                    }
                </p>

                <Modal
                    title={payment_method ? (course.title.length > 40 ? `${course.title.substring(0, 37)}...` : course.title) : 'Select your payment method:'}
                    destroyOnClose
                    width={500}
                    bodyStyle={payment_method ? { backgroundColor: '#f6f9fc' } : {}}
                    className="payment-modal"
                    visible={visible}
                    onCancel={this.closePaymentModal}
                    footer={[
                        <Button key="cancel-btn" type="default" onClick={this.closePaymentModal}>Cancel</Button>,
                    ]}
                >
                    {
                        payment_method
                            ? (
                                <Elements stripe={stripePromise}>
                                    {payment_method === 'ideal'
                                        ? (
                                            <IdealBankForm
                                                onChangeCouponName={this.onChangeCouponName}
                                                couponName={couponName}
                                                invalidPromo={invalidPromo}
                                                sourceData={sourceData}
                                                getCurrentTokenBalance={getCurrentTokenBalance}
                                            >
                                                {/* Ideal - stripe takes EURO values, add ideal prop for display choice in <AdjustedCostDetails /> */}
                                                <AdjustedCostDetails
                                                    ideal
                                                    coursePrice={pricesEUR.coursePrice}
                                                    discount={promoCode}
                                                    subtotal={pricesEUR.subTotal}
                                                    valueOfTokensToDeduct={pricesEUR.valueOfTokensToDeduct}
                                                    tokensToDeduct={pricesEUR.tokensToDeduct}
                                                    total={pricesEUR.total}
                                                />
                                            </IdealBankForm>
                                        )
                                        : (
                                            <CardForm
                                                credit_card={credit_card}
                                                onChangeCouponName={this.onChangeCouponName}
                                                couponName={couponName}
                                                promoCode={promoCode}
                                                invalidPromo={invalidPromo}
                                                payCourse={payCourse}
                                                course={course}
                                                getCurrentTokenBalance={getCurrentTokenBalance}
                                            >
                                                {/* CreditCard - stripe is using USD values */}
                                                <AdjustedCostDetails
                                                    coursePrice={pricesUSD.coursePrice}
                                                    discount={promoCode}
                                                    subtotal={pricesUSD.subTotal}
                                                    valueOfTokensToDeduct={pricesUSD.valueOfTokensToDeduct}
                                                    tokensToDeduct={pricesUSD.tokensToDeduct}
                                                    total={pricesUSD.total}
                                                />
                                            </CardForm>
                                        )}
                                </Elements>
                            )
                            : (
                                <div className="choose-payment-type">
                                    <Card
                                        title='Ideal'
                                        hoverable
                                        style={{ width: 140 }}
                                        onClick={() => this.selectPaymentMethod('ideal')}
                                        cover={<img alt="ideal-bank-icon" src="/img/i-deal-bank-icon.png" />}
                                    />
                                    <Card
                                        title='Credit Card'
                                        hoverable
                                        className="credit-card-button"
                                        onClick={() => this.selectPaymentMethod('stripe')}
                                        style={{ width: 140 }}
                                        cover={<img alt="credit-card-icon" src="/img/credit-card-icon.png" />}
                                    />
                                </div>
                            )
                    }

                </Modal>
            </div>
        );
    }
}

export default PaymentModal;
