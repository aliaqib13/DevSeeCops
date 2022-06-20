import React from 'react';
import { shallow } from 'enzyme';
import mockedGA from 'react-ga';
import { message, Modal } from 'antd';
import Login from './login';

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

describe('Login component', () => {
    const props = {
        location: {},
        auth: {},
        requestResetPassword: jest.fn(() => Promise.resolve({ data: { message: 'TestSuccessMessage' } })),
    };
    let component;

    beforeEach(() => {
        component = shallow(<Login {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Login.prototype.register() creates the correct Google analytics event', () => {
        const instance = component.instance();

        // Call the function
        instance.register();

        // Expect the GA event to have been called correctly
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'user_signup',
            action: 'User clicked register now',
        });
    });

    it('resetPassword is successfull reset calls message.success, requestResetPassword and dispatches ReactGA Event', async () => {
        const instance = component.instance();
        component.setState({
            email: 'validEmail@test.test',
            ReCaptchaPassed: true,
            recaptchaKey: 'testValidRecaptchaKey',
        });
        const reset = instance.resetPassword({
            preventDefault: jest.fn(),
        });
        expect(Modal.confirm).toBeCalled();
        await reset.onOk();
        expect(message.success).toBeCalledWith('TestSuccessMessage');
        expect(props.requestResetPassword).toBeCalledWith(
            'validEmail@test.test',
            'testValidRecaptchaKey',
        );
        expect(component.state().recaptchaKey).toBe('');
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'reset_password',
            action: 'Recaptcha was successfull',
        });
    });

    it('resetPassword with empty email calls ReactGA and message.error', async () => {
        const instance = component.instance();
        component.setState({
            email: '',
            ReCaptchaPassed: true,
            recaptchaKey: 'testValidRecaptchaKey',
        });
        instance.resetPassword({
            preventDefault: jest.fn(),
        });
        expect(Modal.confirm).not.toBeCalled();
        expect(message.error).toBeCalledWith('Please fill in your email!');
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'reset_password',
            action: 'No email has been entered',
        });
    });

    it('resetPassword shows error message and calls reactGA event when recaptcha fails', async () => {
        const instance = component.instance();
        component.setState({
            email: 'validEmail@test.test',
            ReCaptchaPassed: false,
            recaptchaKey: 'testValidRecaptchaKey',
        });
        const res = instance.resetPassword({
            preventDefault: jest.fn(),
        });
        await res.onOk();
        expect(Modal.confirm).toBeCalled();
        expect(message.error).toBeCalledWith('Recaptcha is required');
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'reset_password',
            action: 'Recaptcha has failed',
        });
    });

    it('recaptchaPassed is add state recaptcha token and set RecaptchaPassed to true', async () => {
        const testRecaptchaKey = 'testRecaptchaKey';
        const instance = component.instance();
        await instance.recaptchaPassed(testRecaptchaKey);
        const state = component.state();
        expect(state.recaptchaKey).toBe('testRecaptchaKey');
        expect(state.ReCaptchaPassed).toBeTruthy();
    });
});
