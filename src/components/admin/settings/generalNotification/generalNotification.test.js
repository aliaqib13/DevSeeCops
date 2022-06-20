import React from 'react';
import { shallow } from 'enzyme';
import GeneralNotification from './index';

const globalNotification = {
    id: 1,
    text: 'Hello world',
    active: 1,
};

describe('General Notification', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<GeneralNotification globalNotification={globalNotification} />));

    it('should render the General Notification Component successfully', () => {
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.find('.settings-general-notification-tab').length).toEqual(1);
    });

    it('should have title title and it will be General Notification', () => {
        const title = wrapper.find('.general-title');
        expect(title.props().children).toBe('General Notification');
        expect(wrapper.find('Title').length).toEqual(1);
    });

    it('should have textarea', () => {
        expect(wrapper.find('TextArea').length).toEqual(1);
    });
    //
    it('should have button to save', () => {
        const saveBtn = wrapper.find('Button');
        expect(saveBtn.exists()).toBeTruthy();
    });
});
