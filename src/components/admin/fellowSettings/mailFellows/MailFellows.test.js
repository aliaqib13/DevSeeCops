import React from 'react';
import { shallow } from 'enzyme';
import MailFellows from './MailFellows';

describe('MailFellows', () => {
    let component; const
        props = {
            sendTestEmail: jest.fn(() => Promise.resolve(true)),
            sendEmailBetaTesters: jest.fn(() => Promise.resolve(true)),
        };

    beforeEach(() => {
        component = shallow(<MailFellows {...props} />);
    });

    it('should render MailFellows component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should have title Fellows Instructions', () => {
        const title = component.find('.mail-fellows-title');
        expect(title.props().children).toBe(' Mail Fellows ');
    });

    it('should render save button successfully', () => {
        const sendBtn = component.find('.mail-fellows-send-email');
        expect(sendBtn.exists()).toBeTruthy();
    });

    it('should render save button successfully', () => {
        const sendBtn = component.find('.mail-fellows-send-emails');
        expect(sendBtn.exists()).toBeTruthy();
    });
});
