import React, { useMemo, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import {
    Button, message, Modal, Typography, Input,
} from 'antd';
import ReactGA from 'react-ga';
import propTypes from 'prop-types';
import useResponsiveFontSize from '../useResponsiveFontSize';
import { CATEGORIES, ACTIONS } from '../../../util/GAEventConstants';
import './payment-modal-form.scss';
import { addViewedCourse } from '../../../util/utils';

const { Text } = Typography;
const confirmModal = Modal.confirm;

const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    return useMemo(
        () => ({
            hidePostalCode: true,
            style: {
                base: {
                    fontSize,
                    color: '#424770',
                    letterSpacing: '0.025em',
                    fontFamily: 'Source Code Pro, monospace',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                },
                invalid: {
                    color: '#9e2146',
                },
            },
        }),
        [fontSize],
    );
};

const CardForm = props => {
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        credit_card, promoCode, invalidPromo, children, couponName, onChangeCouponName,
    } = props;

    const payWithCreditCard = async event => {
        event.preventDefault();
        if (invalidPromo) {
            return message.error('Promo code is not valid');
        }
        setErrorMessage('');
        setLoading(true);

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            setErrorMessage('Something went wrong, please reload page and try again.');
            return;
        }

        let payload;

        if (!credit_card) {
            payload = await stripe.createToken(elements.getElement(CardElement))
                .then(res => res)
                .catch(error => {
                    setLoading(false);
                    setErrorMessage(error.message);
                });
        }

        confirmModal({
            title: 'Please confirm your payment',
            okText: 'Confirm',
            okType: 'primary',
            cancelText: 'Cancel',
            onCancel: () => {
                setLoading(false);
            },
            onOk: () => {
                props.payCourse({
                    course_id: props.course.id,
                    token: credit_card ? '' : payload.token.id,
                    discounts: promoCode ? JSON.stringify({ coupon_id: promoCode.coupon.id, promo_code: promoCode.id }) : '',
                    type: 'cc',
                }).then(res => {
                    setLoading(false);
                    props.getCurrentTokenBalance();
                    if (!res.message) {
                        addViewedCourse(res.course_id);
                        props.history.push(`/platform/tl/${res.id}`);
                        ReactGA.event({
                            category: CATEGORIES.PAY_COURSE,
                            action: ACTIONS.PAY_COURSE(props.course.title),
                            label: 'Pay Course',
                        });
                    }
                });
            },
        });
    };

    const onChangeHandler = () => {
        if (errorMessage) {
            setErrorMessage('');
        }
    };

    return (
        <div className="payment-form">
            <form>
                <label className='amount-include-vat'>
                    Amount (including 21% VAT)
                    {children}
                </label>

                <label>
                    Coupon
                    <Input type="text" value={couponName} onChange={onChangeCouponName} />
                    {invalidPromo && <p className='errPromoMessage'>The promo code is invalid</p>}
                </label>
                <label>
                    Card details
                    {
                        credit_card
                            ? (
                                <div className="card-details">
                                    <Text type="secondary">Issuer: </Text>
                                    <Text strong>{credit_card.brand}</Text>
                                    <br />
                                    <Text type="secondary">Credit Card Number: </Text>
                                    <Text strong>
                                        ****
                                        {credit_card.last4}
                                    </Text>
                                    <br />
                                    <Text type="secondary">Expiration Date: </Text>
                                    <Text strong>
                                        {credit_card.exp_month}
                                        /
                                        {credit_card.exp_year}
                                    </Text>
                                </div>
                            )
                            : (
                                <CardElement
                                    options={options}
                                    onChange={onChangeHandler}
                                />
                            )
                    }

                </label>
                <div className="error-message">
                    <p>{errorMessage}</p>
                </div>
                <Button loading={loading} onClick={payWithCreditCard} type="submit" disabled={!stripe}>
                    Continue
                </Button>
            </form>
        </div>
    );
};

CardForm.propTypes = {
    couponName: propTypes.string,
    onChangeCouponName: propTypes.func.isRequired,
    children: propTypes.node.isRequired,
    payCourse: propTypes.func.isRequired,
    course: propTypes.shape({
        id: propTypes.number,
        title: propTypes.string,
    }).isRequired,
    invalidPromo: propTypes.bool,
    credit_card: propTypes.shape({
        brand: propTypes.string,
        last4: propTypes.string,
        exp_month: propTypes.number,
        exp_year: propTypes.number,
    }),
    promoCode: propTypes.shape({
        coupon: propTypes.shape({
            id: propTypes.string,
        }),
    }),
    getCurrentTokenBalance: propTypes.func.isRequired,
};

CardForm.defaultProps = {
    couponName: '',
    invalidPromo: false,
    credit_card: null,
    promoCode: null,
};

export { CardForm };
export default withRouter(CardForm);
