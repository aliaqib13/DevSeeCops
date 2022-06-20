import React from 'react';
import { shallow } from 'enzyme';
import { Typography } from 'antd';
import { ResendEmail } from './ResendEmail.jsx';

const { Title } = Typography;

describe('ResendEmail', () => {
    let component;
    const props = {
        resendEmail: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = shallow(<ResendEmail {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    it('should render ResendEmail component successfully', () => {
        const title = component.find(Title);

        expect(title.length).toBe(1);
        expect(title.props().children).toBe('No Email? Resend activation email');
    });

    it('calls onChange() and updates state', async () => {
        const emailInput = component.find('#email');

        await emailInput.simulate('change', { target: { value: 'email', id: 'email' } });

        expect(component.state().email).toBe('email');
    });

    it('only allows emails to be resend after X amount of time', async () => {
        jest.useFakeTimers();
        component.setState({ disabled_button: true });

        const instance = component.instance();
        const submitButton = component.find('Button');

        // Check if button is disabled
        expect(submitButton.props().disabled).toBe(true);

        // Call timer and advance time, advance uses ms
        await instance.startTimer(60);
        jest.advanceTimersByTime(70000);

        // Grab fresh instance of button
        const freshButton = component.find('Button');
        expect(freshButton.props().disabled).toBe(false);
    });

    it('onSubmit() calls props.resendEmail and starts timer', async () => {
        const event = Object.assign(jest.fn(), { preventDefault: () => {} });
        component.setState({
            email: 'test@email.test',
        });
        const instance = component.instance();

        await instance.onSubmit(event);

        expect(props.resendEmail).toHaveBeenCalled();
    });
});
