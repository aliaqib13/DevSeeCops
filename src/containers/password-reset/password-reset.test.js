import React from 'react';
import { shallow } from 'enzyme';
import mockedGA from 'react-ga';
import { message } from 'antd';

import PasswordReset from './password-reset';

jest.mock('antd', () => {
    const antd = jest.requireActual('antd');
    const modalConfirm = {
        ...antd.Modal,
        confirm: jest.fn(e => e),
    };
    const messageMock = {
        ...antd.message,
        success: jest.fn(),
        error: jest.fn(),
    };
    return {
        ...antd,
        Modal: modalConfirm,
        message: messageMock,
    };
});

jest.mock('react-ga', () => ({
    event: jest.fn(),
}));

describe('Password Reset Component', () => {
    const mockResponse = {
        status: 200,
        data: {
            message: 'test',
        },
    };
    const props = {
        form: {
            getFieldDecorator: jest.fn(() => c => c),
            validateFields: jest.fn(cb => cb()),
        },
        resetPassword: jest.fn().mockResolvedValue(mockResponse),
        match: {
            params: {
                token: 'token-param',
            },
        },
        history: [],
    };

    let component;

    beforeEach(() => {
        component = shallow(<PasswordReset {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders successfully', () => {
        expect(component.find('.component-title').props().children).toEqual('Reset Password');
    });

    it('calls ReactGA on mount', () => {
        expect(mockedGA.event).toHaveBeenCalledTimes(1);
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'reset_password',
            action: 'Instructions followed',
        });
    });

    it('calls ReactGA if password has successfully been reset', async () => {
        component.setState({
            password: 'password',
            confirm_password: 'password',
            loading: false,
        });

        const resetBtn = component.find('.reset-btn');

        await resetBtn.simulate('click');

        expect(message.error).toHaveBeenCalledTimes(0);
        // Once on mount with 'opened link from email'
        expect(mockedGA.event).toHaveBeenCalledTimes(2);
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'reset_password',
            action: 'Password has been changed succesfully',
        });
    });
});
