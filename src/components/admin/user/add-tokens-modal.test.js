import React from 'react';

import { shallow } from 'enzyme';
import { message, Modal } from 'antd';
import AddTokensModal from './add-tokens-modal';

const confirmModal = Modal.confirm;

jest.mock('antd', () => {
    const antd = jest.requireActual('antd');

    antd.Modal.confirm = jest.fn();

    const messageANTD = {
        ...antd.message,
        info: jest.fn(),
    };
    return {
        ...antd,
        message: messageANTD,
    };
});

const event = { preventDefault: () => {} };

describe('AddTokensModal modal', () => {
    let component;

    const props = {
        visible: true,
        user: {
            activated: 1,
            cc_info: null,
            certificate_name: null,
            coordinator: null,
            customer_id: null,
            email: 'ion@araido.io',
            firstname: 'Ion',
            id: 2,
            is_fellow: 1,
            lastname: 'Arapu',
            mfa_enabled: 0,
            permissions: [
                {
                    id: 1,
                    slug: 'fellow_operator',
                    name: 'Fellow Operator',
                    description: 'can get access to admin fellow area',
                },
            ],
            roles: [],
            slack_id: null,
            tokenBalance: 25,
        },
        adminAddTokensToUser: jest.fn(() => Promise.resolve(true)),
        toggleModal: jest.fn(() => Promise.resolve(true)),

    };

    beforeEach(() => {
        component = shallow(<AddTokensModal {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render add tokens modal', () => {
        expect(component).toHaveLength(1);
    });

    it('should render modal title', () => {
        const modalTitle = component.props().title;
        expect(modalTitle).toBe(`Add tokens to ${props.user.firstname} ${props.user.lastname}`);
    });

    it('should render modal `cancel` and `add` buttons', () => {
        const modalFooter = component.props().footer;
        expect(modalFooter[0].props.children).toBe('Cancel');
        expect(modalFooter[1].props.children).toBe('Add');
    });

    it('should call `.toggleModal()`method when `Cancel` button is clicked ', () => {
        const modalFooter = component.props().footer;
        modalFooter[0].props.onClick();

        expect(props.toggleModal).toHaveBeenCalled();
    });

    it('should call `.toggleModal()`method when `X` cancel button is clicked ', () => {
        component.props().onCancel();
        expect(props.toggleModal).toHaveBeenCalled();
    });

    it('should render user name and email with current balance', () => {
        const modalBody = component.props().children[0].props;
        const userName = modalBody.children[0].props.children[0];
        const userEmail = modalBody.children[0].props.children[1];
        const currentBalance = modalBody.children[1].props;

        expect(userName.props.children[0]).toBe('Name:');
        expect(userName.props.children[1].props.children).toBe(`${props.user.firstname} ${props.user.lastname}`);
        expect(userEmail.props.children[0]).toBe('Email:');
        expect(userEmail.props.children[1].props.children).toBe(props.user.email);

        expect(currentBalance.children[0].props.children).toBe('Current Balance');
        expect(currentBalance.children[1].props.children).toBe(`${props.user.tokenBalance} Tokens`);
    });

    it('should render `Enter amount of tokens` InputField and change state when enter an input', () => {
        const amountOfTokens = component.props().children[1].props;
        const inputField = amountOfTokens.children[1].props;

        expect(amountOfTokens.children[0].props.children).toBe('Enter Amount of Tokens: ');

        expect(inputField.placeholder).toBe(0);

        expect(component.state().amountOfTokens).toBe(0);
        inputField.onChange({ target: { value: 10, name: 'amountOfTokens' } });
        expect(component.state().amountOfTokens).toBe(10);
    });

    it('should render `Transaction description` textArea and change state when enter an input', () => {
        const transactionDescription = component.props().children[2].props;
        const textArea = transactionDescription.children[1].props;

        expect(transactionDescription.children[0].props.children).toBe('Transaction Description: ');

        expect(textArea.placeholder).toBe('Transaction Description');

        expect(component.state().transactionDescription).toBe(null);
        textArea.onChange({ target: { value: 'testChange', name: 'transactionDescription' } });
        expect(component.state().transactionDescription).toBe('testChange');
    });

    it('Should render `message.info` when admin enter invalid `amountOfTokens` in the input fields', () => {
        // When amountOfTokens is null
        component.setState({ amountOfTokens: null, transactionDescription: 'test' });
        component.props().onOk(event);
        expect(message.info).toHaveBeenCalledWith('Please enter valid amount of tokens');

        // When amountOfTokens is '0'
        component.setState({ amountOfTokens: '0', transactionDescription: 'test' });
        component.props().onOk(event);
        expect(message.info).toHaveBeenCalledWith('Please enter valid amount of tokens');

        // When amountOfTokens is 0
        component.setState({ amountOfTokens: 0, transactionDescription: 'test' });
        component.props().onOk(event);
        expect(message.info).toHaveBeenCalledWith('Please enter valid amount of tokens');

        // When amountOfTokens is empty string
        component.setState({ amountOfTokens: '', transactionDescription: 'test' });
        component.props().onOk(event);
        expect(message.info).toHaveBeenCalledWith('Please enter valid amount of tokens');
    });

    it('Should render `message.info` when admin enter invalid `transactionDescriptions` in the input fields', () => {
        // When transactionDescription is null
        component.setState({ amountOfTokens: 10, transactionDescription: null });
        component.props().onOk(event);
        expect(message.info).toHaveBeenCalledWith('Please enter transaction description');

        // When transactionDescription is empty string
        component.setState({ amountOfTokens: 10, transactionDescription: '' });
        component.props().onOk(event);
        expect(message.info).toHaveBeenCalledWith('Please enter transaction description');
    });

    it('should call `.confirmModal()` when Admin click on `Add` button ', () => {
        component.setState({ amountOfTokens: 10, transactionDescription: 'test' });
        component.props().onOk(event);
        expect(confirmModal).toHaveBeenCalled();
    });
});
