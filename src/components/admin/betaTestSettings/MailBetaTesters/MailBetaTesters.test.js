import React from 'react';
import { shallow } from 'enzyme';
import MailBetaTesters from './MailBetaTesters';

describe('MailBetaTesters', () => {
    let component; const
        props = {
            sendTestEmail: jest.fn(() => Promise.resolve(true)),
            sendEmailBetaTesters: jest.fn(() => Promise.resolve(true)),
        };

    beforeEach(() => {
        component = shallow(<MailBetaTesters {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render MailBetaTesters component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should have title Beta Test Instructions', () => {
        const title = component.find('.mail-beta-test-title');
        expect(title.props().children).toBe(' Mail Beta Testers ');
    });

    it('should render save button successfully', () => {
        const sendBtn = component.find('.mail-beta-test-send-email');
        expect(sendBtn.exists()).toBeTruthy();
    });

    it('changeEmailContent() updates state with textarea value', async () => {
        const instance = component.instance();

        const event = {
            target: {
                value: 'some test content to check for',
            },
        };

        await instance.changeEmailContent(event);

        const { state } = instance;

        expect(state.emailContent).toEqual(event.target.value);
    });

    it('changeTestEmail() updates state with input value', async () => {
        const instance = component.instance();

        const event = {
            target: {
                value: 'test@email.test',
            },
        };

        await instance.changeTestEmail(event);

        const { state } = instance;

        expect(state.testEmail).toEqual(event.target.value);
    });
});
