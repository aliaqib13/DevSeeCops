import React from 'react';
import { shallow } from 'enzyme';
import { message } from 'antd';
import { InviteUsers } from './InviteUsers';

jest.mock('antd', () => {
    const antd = jest.requireActual('antd');
    const messageANTD = {
        ...antd.message,
        success: jest.fn(),
        warning: jest.fn(),
    };
    return {
        ...antd,
        message: messageANTD,
    };
});

describe('InviteUsers', () => {
    let component; let props;

    beforeEach(() => {
        props = {
            event: {
                course_ids: '[1]',
                courses: [
                    {
                        description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
                        id: 1,
                        title: 'Secrets Management for your applications',
                        will_learn: [],
                    },
                ],
                created_at: '2020-12-22 15:06:45',
                description: null,
                emails_uploaded: 10,
                end_time: null,
                eventEmails: [],
                eventSponsors: [],
                eventUsers: [],
                id: 4,
                image: 'https://static.ewtest.infomaker.io/wp-content/uploads/sites/2/2017/03/22081625/cloud-upload.png',
                listed: 1,
                name: 'Event Secrets Management ',
                start_time: null,
                updated_at: '2020-12-22 15:06:45',

            },
            sendEventEmails: jest.fn(() => Promise.resolve({ allSent: true })),
        };
        component = shallow(<InviteUsers {...props} />);
    });

    it('Should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render email textarea successfully', () => {
        const ckeditorContainer = component.find('.descriptionText');
        expect(ckeditorContainer.props().children[1].props.name).toBe('emailText');
    });

    it('should render test email successfully', () => {
        const testEmailField = component.find('AutoComplete');
        expect(testEmailField.exists()).toBeTruthy();
    });

    it('should render test email button successfully', () => {
        const button = component.find('Button').at(0);
        expect(button.exists()).toBeTruthy();
        expect(button.props().children).toBe('Test Email');
    });

    it('should render send emails button successfully', () => {
        const button = component.find('Button').at(1);
        expect(button.exists()).toBeTruthy();
        expect(button.props().children).toBe('Send To All Uploaded Emails');
    });

    it('should send to all emails text successfully', async () => {
        const instance = component.instance();
        await instance.sendToAll();
        expect(message.success).toHaveBeenCalledWith('Emails successfully sent!');
    });

    it('should get error message if sent to all emails fails', async () => {
        const warningMessage = 'Test Warning Message';
        component.setProps({
            sendEventEmails: jest.fn(() => Promise.resolve(
                { allSent: false, text: warningMessage },
            )),
        });
        const instance = component.instance();
        await instance.sendToAll();
        expect(message.warning).toHaveBeenCalledWith(warningMessage);
    });
});
