import React, { useMemo, useState } from 'react';
import {
    useStripe,
    useElements,
    IdealBankElement,
} from '@stripe/react-stripe-js';
import {
    Button, message, Input,
} from 'antd';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import useResponsiveFontSize from '../useResponsiveFontSize';
import { addViewedCourse } from '../../../util/utils';
import './payment-modal-form.scss';

const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    return useMemo(
        () => ({
            style: {
                base: {
                    fontSize,
                    color: '#424770',
                    letterSpacing: '0.025em',
                    fontFamily: 'Source Code Pro, monospace',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                    padding: '10px 14px',
                },
                invalid: {
                    color: '#9e2146',
                },
            },
        }),
        [fontSize],
    );
};

const IdealBankForm = props => {
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();
        if (props.invalidPromo) {
            return message.error('Promo code is not valid');
        }
        setLoading(true);
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            setErrorMessage('Something went wrong, please reload page and try again.');
            return;
        }
        const idealBank = elements.getElement(IdealBankElement);
        // stripe with <IdealBankElement /> requires stripe.createSource
        return stripe.createSource(idealBank, props.sourceData)
            .then(result => {
                console.log(result);
                addViewedCourse(props.sourceData.metadata.course_id);
                props.getCurrentTokenBalance();
                window.location.assign(result.source.redirect.url);
            }).catch(error => {
                console.log(error);
                setLoading(false);
                message.error(error.message);
            });
    };

    const {
        children, couponName, onChangeCouponName, invalidPromo,
    } = props;

    return (
        <div className="payment-form">
            <form onSubmit={handleSubmit}>
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
                    iDEAL Bank
                    <IdealBankElement
                        className="IdealBankElement"
                        options={options}
                    />
                </label>
                <div className="error-message">
                    <p>{errorMessage}</p>
                </div>
                <Button type="submit" loading={loading} disabled={!stripe} onClick={handleSubmit}>
                    Continue
                </Button>
            </form>
        </div>

    );
};

IdealBankForm.propTypes = {
    invalidPromo: propTypes.bool,
    sourceData: propTypes.shape({
        metadata: propTypes.shape({
            course_id: propTypes.number,
        }),
    }).isRequired,
    children: propTypes.node.isRequired,
    couponName: propTypes.string,
    onChangeCouponName: propTypes.func.isRequired,
    getCurrentTokenBalance: propTypes.func.isRequired,
};

IdealBankForm.defaultProps = {
    invalidPromo: false,
    couponName: '',
};

export { IdealBankForm };
export default withRouter(IdealBankForm);
