import React from 'react';
import { shallow } from 'enzyme';
import LabtimeRequestDrawer from './index';

const props = {
    changeLabtimeRequestStatus: jest.fn(() => Promise.resolve(true)),
    deleteLabtimeRequest: jest.fn(() => Promise.resolve(true)),
    getLabtimeRequests: jest.fn(() => Promise.resolve(true)),
    getLabs: jest.fn(() => Promise.resolve(true)),
    visible: true,
    labtimeRequests: {
        data: [
            {
                id: 7,
                user_id: 11,
                course_id: 1,
                status: 'pending',
                created_at: '2020-07-30 12:53:49',
                updated_at: '2020-07-30 12:53:49',
                user: {
                    id: 11,
                    firstname: 'Test',
                    lastname: 'tester',
                    certificate_name: 'Test tester',
                    email: 'testtester93@mail.ru',
                    activated: 1,
                    coordinator: null,
                    is_fellow: 0,
                    created_at: '2020-07-30 11:31:33',
                    updated_at: '2020-07-30 11:32:06',
                },
                activeLabs: {
                    active_course_id: 1,
                    id: 2,
                    lab_id: 1,
                    lab: {
                        id: 1,
                        available_time: '180m',
                    },
                },
            },
        ],
        lastPage: 1,
        page: 1,
        perPage: 10,
        total: 8,
    },
};

describe('LabtimeRequestDrawer', () => {
    let component;

    beforeEach(() => {
        component = shallow(<LabtimeRequestDrawer {...props} />);
    });

    it('should render LabtimeRequestDrawer component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should render the requests table with requests successfully', () => {
        const requestsTable = component.find('withStore(Table)');
        expect(requestsTable.exists()).toBe(true);
        expect(requestsTable.props().dataSource).toEqual(props.labtimeRequests.data);
    });

    it('should render email column with proper value successfully', () => {
        const emailColumn = component.find('Column[dataIndex="user.email"]');
        expect(emailColumn.exists()).toBeTruthy();
    });

    it('should render action buttons column successfully', () => {
        const actionsColumn = component.find('Column[title="actions"]');
        expect(actionsColumn.exists()).toBeTruthy();
    });

    it('should render action buttons when request pending', () => {
        props.labtimeRequests.data[0].status = 'pending';
        const actionsColumn = component.find('Column[title="actions"]');
        const acceptButton = actionsColumn.props().render('test', props.labtimeRequests.data[0]).props.children.props.children[0];
        const rejectButton = actionsColumn.props().render('test', props.labtimeRequests.data[0]).props.children.props.children[1];
        const deleteButton = actionsColumn.props().render('test', props.labtimeRequests.data[0]).props.children.props.children[2];
        expect(acceptButton.props.children.props.type).toBe('check');
        expect(rejectButton.props.children.props.type).toBe('stop');
        expect(deleteButton.props.children.props.type).toBe('delete');
    });

    it('should render span accepted instead of buttons when request accepted', () => {
        props.labtimeRequests.data[0].status = 'accepted';
        const actionsColumn = component.find('Column[title="actions"]');
        const acceptedSpan = actionsColumn.props().render('test', props.labtimeRequests.data[0]).props.children.props.children[0];
        expect(acceptedSpan.type).toBe('span');
        expect(acceptedSpan.props.children).toBe('Accepted');
    });

    it('should render span rejected instead of buttons when request rejected', () => {
        props.labtimeRequests.data[0].status = 'rejected';
        const actionsColumn = component.find('Column[title="actions"]');
        const rejectedSpan = actionsColumn.props().render('test', props.labtimeRequests.data[0]).props.children.props.children[0];
        expect(rejectedSpan.type).toBe('span');
        expect(rejectedSpan.props.children).toBe('Rejected');
    });

    it('should call changeRequestStatus method when reject button clicked', () => {
        props.labtimeRequests.data[0].status = 'pending';
        const actionsColumn = component.find('Column[title="actions"]');
        const rejectButton = actionsColumn.props().render('test', props.labtimeRequests.data[0]).props.children.props.children[1];
        const event = {
            target: {
                id: 1,
                name: 'rejected',
            },
        };
        rejectButton.props.onClick(event);
        expect(props.changeLabtimeRequestStatus).toBeCalledTimes(1);
    });

    it('should call deleteRequest method when delete button clicked', () => {
        props.labtimeRequests.data[0].status = 'pending';
        const actionsColumn = component.find('Column[title="actions"]');
        const deleteButton = actionsColumn.props().render('test', props.labtimeRequests.data[0]).props.children.props.children[2];
        deleteButton.props.onClick();
        expect(props.deleteLabtimeRequest).toBeCalledTimes(1);
    });
});
