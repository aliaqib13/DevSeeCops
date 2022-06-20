import React from 'react';
import { shallow } from 'enzyme';
import { message, notification } from 'antd';
import { EditEvent } from './EditEvent';
import { EVENT_TYPE } from '../../../../constants';

let argsObj = {};
jest.mock('antd', () => {
    const antd = jest.requireActual('antd');
    const messageANTD = {
        ...antd.message,
        success: jest.fn(),
        warning: jest.fn(),
    };
    const notificationANTD = {
        ...antd.notification,
        warning: jest.fn(e => { argsObj = e; }),
    };
    return {
        ...antd,
        message: messageANTD,
        notification: notificationANTD,
    };
});

const event = {
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
    emails_uploaded: 0,
    end_time: null,
    eventEmails: [],
    eventSponsors: [],
    eventUsers: [],
    id: 4,
    image: 'https://static.ewtest.infomaker.io/wp-content/uploads/sites/2/2017/03/22081625/cloud-upload.png',
    listed: 1,
    name: 'Event Secrets Management ',
    subtitle: '',
    start_time: null,
    updated_at: '2020-12-22 15:06:45',
    type: EVENT_TYPE.OPEN,
    user_limit: 101,

};

const coursesForEvent = [{ id: 1, title: 'Secrets Management for your applications' }, { id: 4, title: 'Container Security in CI/CD' }];

const props = {
    event,
    coursesForEvent,
    uploadImage: jest.fn(() => Promise.resolve({ course })),
    deleteEvent: jest.fn(() => Promise.resolve([])),
    updateEvent: jest.fn(() => Promise.resolve([])),
    deleteEventEmails: jest.fn(() => Promise.resolve([])),
    eventTypes: Object.values(EVENT_TYPE),
};

describe('EditEvent', () => {
    let component; let buttonsContainer; let topActionButtons; let saveButton;

    beforeEach(() => {
        component = shallow(<EditEvent {...props} />);
        buttonsContainer = component.find('.savePreviewContainer');
        topActionButtons = component.find('.actions-top-block');
        saveButton = buttonsContainer.childAt(0);
    });

    it('Should render top actions buttons', () => {
        expect(topActionButtons.childAt(0).props().children[0]).toBe('Save');
    });

    it('Should render save button successfully', () => {
        expect(saveButton.exists()).toBeTruthy();
        expect(saveButton.props().children[0]).toBe('Save');
    });

    it('Should render name input successfully', () => {
        const input = component.find('.small-input').at(0);
        expect(input.props().children[1].props.name).toBe('name');
    });

    it('Should render description input successfully', () => {
        const input = component.find('.courseDescriptionContainer');
        expect(input.props().children[1].props.children.props.name).toBe('description');
    });

    it('Should render start time input successfully', () => {
        const input = component.find('.small-input').at(1);
        expect(input.props().children[1].props.placeholder).toBe('Select start time');
    });

    it('Should render end time input successfully', () => {
        const input = component.find('.small-input').at(2);
        expect(input.props().children[1].props.placeholder).toBe('Select end time');
    });

    it('Should render csv upload component successfully', () => {
        const input = component.find('.small-input').at(4);
        expect(input.props().children[2].props.children.props.accept).toBe('.csv');
    });

    it('Should render sponsor container successfully', () => {
        component.instance().setState({ eventSponsors: [{ name: 'test', logo: '' }] });
        const input = component.find('.sponsor-container');
        expect(input.props().children[0].props.children[1].props.value).toBe('test');
    });

    it('Should render image successfully', () => {
        const input = component.find('.imageContainer');
        expect(input.props().children[2].props.children[1].props.children.type).toBe('img');
    });

    it('Should render type drowdown successfully', () => {
        const select = component.find('Select').at(1);
        expect(select.props().value).toBe(EVENT_TYPE.OPEN);

        const inputUserLimit = component.find('.small-input').at(3);
        const { name, value } = inputUserLimit.props().children[1].props;
        expect(name).toBe('user_limit');
        expect(value).toBe(props.event.user_limit);

        expect(component.instance().state.type).toBe(EVENT_TYPE.OPEN);
        select.props().onChange(EVENT_TYPE.INVITE);
        expect(component.instance().state.type).toBe(EVENT_TYPE.INVITE);
    });

    it('Should change subtitle when change input subtitle', () => {
        const newText = 'testSubtitle';
        component.find('TextArea[name="subtitle"]').props().onChange({
            target: { name: 'subtitle', value: newText },
        });
        const subtTitle = component.instance().state.subtitle;
        expect(subtTitle).toBe(newText);
    });

    it('Should change listed state when call changeListed method', async () => {
        expect(component.state().listed).toBe(!!props.event.listed);
        const instance = component.instance();
        await instance.changeListed();
        expect(component.state().listed).toBe(!props.event.listed);
    });

    it('Should change visible modal state when call handlePreviewModal', () => {
        expect(component.state().visibleModal).toBeFalsy();
        const instance = component.instance();
        instance.handlePreviewModal();
        expect(component.state().visibleModal).toBeTruthy();
    });

    it('Should add Sponsor when call addSponsor method', async () => {
        const instance = component.instance();
        const oldState = component.state().eventSponsors;
        expect(oldState.length).toBe(0);
        await instance.addSponsor();
        const newState = component.state().eventSponsors;
        expect(newState.length).toBe(1);
    });

    it('Should delete Sponsor when call deleteSponsor method', async () => {
        const instance = component.instance();
        component.setState({ eventSponsors: [{ name: '', logo: '' }] });
        const oldState = component.state().eventSponsors;
        expect(oldState.length).toBe(1);
        await instance.deleteSponsor(0);
        const newState = component.state().eventSponsors;
        expect(newState.length).toBe(0);
    });

    it('Should change sponsor change handler successfully', async () => {
        const index = 0;
        const name = 'testName';
        component.setState({ eventSponsors: [{ name: '', logo: '' }] });
        const instance = component.instance();
        await instance.sponsorChangeHandler({ target: { value: name } }, index);
        const newState = component.state().eventSponsors;
        expect(newState[index].name).toBe(name);
    });

    it('Should read csv file, get from that emails, notify for invalid emails, and upload valid emails', () => {
        const instance = component.instance();
        const fileReader = {
            readAsText: jest.fn(),
        };
        let onloadRef;
        Object.defineProperty(fileReader, 'onload', {
            get() {
                return this._onload;
            },
            set(onload) {
                onloadRef = onload;
                this._onload = onload;
            },
        });
        jest.spyOn(window, 'FileReader').mockImplementation(() => fileReader);
        const csv = new Blob([''], { type: 'text/csv;charset=utf-8;' });
        csv.name = 'myFile.csv';
        instance.uploadEmails(csv);

        // onload test
        const e = {
            target: {
                result: `
                    
                    testemail@gmail.com
                    testemail@gmail.com
                    invalidEmail
                    12345678
                    validemail@mail.com
                `,
            },
        };
        onloadRef(e);
        expect(message.success).toBeCalledWith('Uploaded');
        expect(notification.warning).toBeCalledWith(argsObj);
        expect(argsObj.message).toBe('There are invalid emails on csv, that emails are ignored');
        const res = argsObj.description.props.children;
        expect(res.length).toBe(3);
        expect(res[0].props.children).toBe('');
        expect(res[1].props.children).toBe('invalidEmail');
        expect(res[2].props.children).toBe('12345678');
    });
});
