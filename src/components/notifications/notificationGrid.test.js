import React from 'react';
import { shallow } from 'enzyme';
import NotificationsGrid from './notificationsGrid';

describe('NotificationsGrid', () => {
    let component; const
        props = {
            notifications: [
                {
                    content: {
                        message: 'Test notification message',
                    },
                    type: 'accepted',
                    id: 1,
                    seen: 0,
                },
                {
                    content: {
                        message: 'Test notification message 2',
                    },
                    type: 'rejected',
                    id: 2,
                    seen: 0,
                },
            ],
            deleteNotification: jest.fn(() => Promise.resolve(true)),
        };

    beforeEach(() => {
        component = shallow(<NotificationsGrid {...props} />);
    });

    it('should render NotificationsGrid component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render notificationsContainer successfully', () => {
        const notificationsContainer = component.find('.notificationsContainer');
        expect(notificationsContainer.exists()).toBeTruthy();
    });

    it('should render notificationList with proper dataSource', () => {
        const notificationList = component.find('.notificationList');
        expect(notificationList.exists()).toBeTruthy();
        expect(notificationList.props().dataSource).toEqual(props.notifications);
    });

    it('should render notification item with proper classname depending from props value', () => {
        const notificationList = component.find('.notificationList');
        let notificationItem = notificationList.props().renderItem(props.notifications[0]);
        expect(notificationItem.props.className).toBe('unopenedNotification');
        props.notifications[0].seen = 1;
        notificationItem = notificationList.props().renderItem(props.notifications[0]);
        expect(notificationItem.props.className).toBe('openedNotification');
    });

    it('should render notificationContent with proper className successfully', () => {
        const notificationList = component.find('.notificationList');
        const notificationItem = notificationList.props().renderItem(props.notifications[0]);
        expect(notificationItem.props.children.props.className).toBe('notificationContent');
    });

    it('should render notificationContent span with proper title from props successfully', () => {
        const notificationList = component.find('.notificationList');
        const notificationItem = notificationList.props().renderItem(props.notifications[0]);
        const notificationContentSpan = notificationItem.props.children.props.children[0];
        expect(notificationContentSpan.props.children[0].props.children).toEqual(props.notifications[0].content.message);
    });

    it('should render notificationContent button successfully', () => {
        const notificationList = component.find('.notificationList');
        const notificationItem = notificationList.props().renderItem(props.notifications[0]);
        const notificationContentBtn = notificationItem.props.children.props.children[0].props.children[1].props.children;
        expect(notificationContentBtn).toBe('Read');
    });
});
