import React, { Component } from 'react';
import {
    Modal, Input, Button, Row, Col, message,
} from 'antd';
import './add-tokens-modal.scss';

const { TextArea } = Input;

const confirmModal = Modal.confirm;

class AddTokensModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amountOfTokens: 0,
            transactionDescription: null,
        };
    }

    handleAddTokens = e => {
        e.preventDefault();

        const { amountOfTokens, transactionDescription } = this.state;
        const { adminAddTokensToUser, user, toggleModal } = this.props;
        const amountOfTokensToAdd = Number.parseInt(amountOfTokens);

        // Check if the parsed result is Not A Number or less than 1
        if (Number.isNaN(amountOfTokensToAdd) || amountOfTokensToAdd < 1) {
            return message.info('Please enter valid amount of tokens');
        }

        if (transactionDescription === null || transactionDescription === '') {
            return message.info('Please enter transaction description');
        }
        const addTokensData = {
            user_id: user.id,
            amount: amountOfTokensToAdd,
            description: transactionDescription,
        };

        return confirmModal({
            title: `Are you sure you want to add ${amountOfTokensToAdd} Tokens to ${user.firstname} ${user.lastname}?`,
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk: () => Promise.all([
                adminAddTokensToUser(addTokensData),
                toggleModal(),
            ]),
        });
    }

    onChangeHandle = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleCancel = () => {
        const { toggleModal } = this.props;

        return toggleModal();
    }

    render() {
        const { amountOfTokens, transactionDescription } = this.state;
        const { user, visible } = this.props;

        return (
            <Modal
                visible={visible}
                title={`Add tokens to ${user.firstname} ${user.lastname}`}
                onOk={this.handleAddTokens}
                onCancel={this.handleCancel}
                width={500}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="danger" onClick={this.handleAddTokens}>
                        Add
                    </Button>,
                ]}
            >
                <Row className='add-tokens-user-details'>

                    <Col className='user-name-email' span={14}>
                        <div>
                            Name:
                            <h4>
                                {`${user.firstname} ${user.lastname}`}

                            </h4>
                        </div>
                        <div>
                            Email:
                            <h4>{user.email}</h4>
                        </div>
                    </Col>
                    <Col className='user-current-balance' span={10}>
                        <h4>Current Balance</h4>
                        <h3>
                            {`${user.tokenBalance} Token${user.tokenBalance !== 1 ? 's' : ''}`}
                        </h3>
                    </Col>
                </Row>
                <Row className='amount-of-tokens'>
                    <h4>Enter Amount of Tokens: </h4>
                    <Input
                        type='number'
                        min={0}
                        value={amountOfTokens}
                        name='amountOfTokens'
                        placeholder={0}
                        onChange={this.onChangeHandle}
                    />
                </Row>
                <Row className='transaction-description'>
                    <h4>Transaction Description: </h4>
                    <TextArea autoSize={{ minRows: 2, maxRows: 3 }} name="transactionDescription" value={transactionDescription} placeholder='Transaction Description' onChange={this.onChangeHandle} />

                </Row>
            </Modal>
        );
    }
}

export default AddTokensModal;
