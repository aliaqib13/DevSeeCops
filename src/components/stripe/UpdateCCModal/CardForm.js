import React, { useMemo, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, message } from 'antd';
import useResponsiveFontSize from '../useResponsiveFontSize';

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
    const options = useOptions();
    const elements = useElements();
    const stripe = useStripe();

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const onChangeHandler = () => {
        if (errorMessage) {
            setErrorMessage('');
        }
    };

    const updateCreditCard = async e => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            setErrorMessage('Something went wrong, please reload page and try again.');
            return;
        }
        const payload = await stripe.createToken(elements.getElement(CardElement));

        if (payload.error) {
            setLoading(false);
            setErrorMessage(payload.error.message);
            return;
        }

        props.updateCreditCard(payload.token.id, props.type).then(res => {
            setLoading(false);
            if (res === true) {
                message.success('Updated.');
                if (props.getCCInfo) {
                    props.getCCInfo();
                } else {
                    props.closeModal();
                }
            } else {
                message.error(res.message);
            }
        });
    };

    return (
        <form>
            <label>
                Card Details
                <CardElement
                    options={options}
                    onChange={onChangeHandler}
                />
            </label>
            <div className="error-message">
                <p>{errorMessage}</p>
            </div>
            <Button loading={loading} onClick={updateCreditCard} type="submit" disabled={!stripe}>
                Save Credit Card
            </Button>
        </form>
    );
};

export default CardForm;
