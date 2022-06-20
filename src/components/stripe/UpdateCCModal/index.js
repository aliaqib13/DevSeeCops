import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button, Modal } from 'antd';
import CardForm from './CardForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const UpdateCCModal = props => {
    const [visible, setVisible] = useState(false);

    const openModal = () => {
        setVisible(true);
    };

    const closeModal = () => {
        setVisible(false);
    };

    return (
        <div>
            <Button type="primary" onClick={openModal}>Update Credit Card</Button>
            <Modal
                title="Update Credit Card"
                destroyOnClose
                width={500}
                bodyStyle={{ backgroundColor: '#f6f9fc' }}
                className="payment-modal"
                visible={visible}
                onCancel={closeModal}
                footer={[
                    <Button key="cancel-btn" type="default" onClick={closeModal}>Cancel</Button>,
                ]}
            >
                <Elements stripe={stripePromise}>
                    <CardForm
                        type='update'
                        updateCreditCard={props.updateCreditCard}
                        closeModal={closeModal}
                    />
                </Elements>
            </Modal>

        </div>
    );
};

export default UpdateCCModal;
