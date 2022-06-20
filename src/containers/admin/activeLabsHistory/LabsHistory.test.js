import React from 'react';
import { shallow, mount } from 'enzyme';
import {
    Typography, message, Table, Modal,
} from 'antd';
import moment from 'moment';
import LabsHistory from './LabsHistory';

const { Title } = Typography;
const confirmModal = Modal.confirm;

jest.mock('antd', () => {
    const antd = jest.requireActual('antd');
    const messageANTD = {
        ...antd.message,
        success: jest.fn(),
        warning: jest.fn(),
        error: jest.fn(),
    };
    const modalANTD = {
        ...antd.Modal,
        confirm: jest.fn(),

    };
    return {
        ...antd,
        message: messageANTD,
        Modal: modalANTD,

    };
});

const props = {
    adminActiveLabsHistory: {
        labs: {
            data: [
                {
                    id: 1,
                    active_course_id: 1,
                    activeCourse: {
                        course_id: 1,
                    },
                    start_time: '2021-09-13T14:54:21.000Z',
                    created_at: '2021-05-29 13:29:00',
                    updated_at: '2021-05-29 13:29:00',
                    user: {
                        email: 'dominik@araido.io',
                        firstname: 'Dominik',
                        id: 1,
                        lastname: 'de Smit',
                    },
                    user_id: 1,
                    lab: {
                        automated_checking: 0,
                        id: 1,
                        name: 'Secrets Management Java Application',
                        platform: 'AWS',
                        step: [],
                    },
                    lab_id: 1,
                    progress: 'Done',
                },
                {
                    id: 2,
                    active_course_id: 1,
                    activeCourse: {
                        course_id: 1,
                    },
                    start_time: '2021-09-13T14:54:21.000Z',
                    created_at: '2021-05-29 13:29:00',
                    updated_at: '2021-05-29 13:29:00',
                    user: {
                        email: 'dominik@araido.io',
                        firstname: 'Dominik',
                        id: 1,
                        lastname: 'de Smit',
                    },
                    user_id: 1,
                    lab: {
                        automated_checking: 0,
                        id: 2,
                        name: 'test lab 2',
                        platform: 'AWS',
                        step: [],
                    },
                    lab_id: 2,
                    progress: 'Pending',
                },
            ],
        },
    },
    sendEmailToUser: jest.fn(() => Promise.resolve(true)),
    fetchActiveLabsHistory: jest.fn(() => Promise.resolve(true)),
    history: {
        push: jest.fn(),
    },
    checkLabStages: jest.fn(() => Promise.resolve(true)),
    updateActiveLabStatus: jest.fn(() => Promise.resolve(true)),

};

describe('LabsHistory', () => {
    let component;

    beforeEach(() => {
        component = shallow(<LabsHistory {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should render component successfully', () => {
        const pageContainer = component.find('.active-lab-container');
        const titleElement = pageContainer.find('.page-title');
        expect(titleElement.contains([<Title>Labs History</Title>])).toEqual(true);
    });

    it('Should render and change states to close modal when click', async () => {
        const instance = component.instance();
        await instance.closeModal();
        expect(component.state('emailText')).toBe('');
        expect(component.state('emailModal')).toBe(false);
        expect(component.state('selectedLab')).toBe(null);
    });

    it("onChangeSendEmailState(event) sets the value of `sendEmail` from the event's value", async () => {
        const event = { target: { checked: false } };
        const instance = component.instance();
        expect(component.state('sendEmail')).toBe(true);
        await instance.onChangeSendEmailState(event);
        expect(component.state('sendEmail')).toBe(false);
    });

    it("changeEmailText(event) sets the value of `emailText` from the event's value", async () => {
        const event = { target: { name: 'emailText', value: 'Email text changed' } };
        const instance = component.instance();
        expect(component.state('emailText')).toBe('');
        await instance.changeEmailText(event);
        expect(component.state(event.target.name)).toBe('Email text changed');
    });

    it('Start time should render \'time since start\' if a valid time is given', () => {
        const date = '2021-09-13T14:54:21.000Z';
        const testProps = {
            ...props,
            adminActiveLabsHistory: {
                labs: { data: [{ start_time: date }] },
            },
        };

        const testComponent = shallow(<LabsHistory {...testProps} />);

        const tableComp = testComponent.find(Table);
        const startTimeColumn = tableComp.find({ title: 'Start time' });

        // Test the render
        const testRecord = { start_time: date };
        const res = startTimeColumn.first().props().render(testRecord);

        expect(res.props.children[0].props.children).toBe(moment(date).format('DD-MM-YYYY HH:mm:ss'));
        expect(res.props.children[1].props.children).toBeTruthy();
    });

    it('Start time should not render \'time since start\' with an invalid date', () => {
        const date = 'invalid';
        const testProps = {
            ...props,
            adminActiveLabsHistory: {
                labs: { data: [{ start_time: date }] },
            },
        };

        const testComponent = shallow(<LabsHistory {...testProps} />);

        const tableComp = testComponent.find(Table);
        const startTimeColumn = tableComp.find({ title: 'Start time' });

        // Test the render
        const testRecord = { start_time: date };
        const res = startTimeColumn.first().props().render(testRecord);

        expect(res.props.children[0].props.children).toBe('Invalid date');
        expect(res.props.children[1]).toBe(false);
    });

    it('paginate(page) sets the value of currentPage', async () => {
        const instance = component.instance();
        expect(component.state('currentPage')).toBe(1);
        await instance.paginate({ current: 2 });
        expect(component.state('currentPage')).toBe(2);
    });
    it('sendEmail() should work successfully when user has email', async () => {
        component.setState({
            selectedLab: {
                user: {
                    id: 1,
                    email: 'testEmail@gmail.com',
                },
            },
            emailText: 'Some email text',
        });
        const instance = component.instance();
        await instance.sendEmail();
        expect(message.success).toBeCalledWith('email sent');
    });
    it('sendEmail() should show error message when no email text is added', async () => {
        component.setState({
            selectedLab: {
                user: {
                    id: 1,
                    email: 'testEmail@gmail.com',
                },
            },
            emailText: '',
        });
        const instance = component.instance();
        await instance.sendEmail();
        expect(message.error).toBeCalledWith('Please insert data');
    });

    it('should call history.push() to move to the correct job page', () => {
        const instance = component.instance();
        instance.jobInfo(props.adminActiveLabsHistory.labs.data[0].user.email, props.adminActiveLabsHistory.labs.data[0].lab.id);
        expect(props.history.push).toBeCalledWith({
            pathname: `/platform/admin/jobs/${props.adminActiveLabsHistory.labs.data[0].lab.id}`,
            query: { user: props.adminActiveLabsHistory.labs.data[0].user.email },
        });
    });

    it('getLabStages should work successfully', async () => {
        const id = 1;
        const instance = component.instance();
        await instance.getLabStages(id);
        expect(props.checkLabStages).toHaveBeenCalledWith(id);
    });

    it('getRelevantJob() returns the relevant job when jobs are valid', () => {
        const jobs = [
            { status: 'CREATED', progress: 100 },
            { status: 'DESTROYED', progress: 100 },
            { status: 'CREATED', progress: 100 },
            { status: 'SCHEDULED', progress: 0 },
        ];
        const job = LabsHistory.getRelevantJob(jobs);

        expect(job).toBe(jobs[jobs.length - 2]);
    });

    it('getRelevantJob() returns the job if there is only one', () => {
        const jobs = [
            { status: 'ERROR', progress: 45 },
        ];
        const job = LabsHistory.getRelevantJob(jobs);

        expect(job).toBe(jobs[0]);
    });

    it('getRelevantJob() returns undefined if no jobs are given', () => {
        const job = LabsHistory.getRelevantJob();

        expect(job).toBeUndefined();
    });
    it('.confirmChangeStatus() will be called when click on `approve` button ', async () => {
        // Arrange
        const firstLabProps = props.adminActiveLabsHistory.labs.data[0];
        const firstLab = component.find('[data-testid="activeLabHistoryTable"]').props().children[8].props.render(firstLabProps);
        const approveBtn = firstLab.props.children[1].props.children[0].props;
        const instance = component.instance();
        const preventDefault = jest.fn();

        // Act
        jest.spyOn(instance, 'confirmChangeStatus');
        approveBtn.onClick({ preventDefault }, props.adminActiveLabsHistory.labs.data[0].id);

        // Assert
        expect(instance.confirmChangeStatus).toHaveBeenCalledTimes(1);
    });

    it('.confirmChangeStatusReject() will be called when click on `reject` button ', async () => {
        // Arrange
        const firstLabProps = props.adminActiveLabsHistory.labs.data[0];
        const firstLab = component.find('[data-testid="activeLabHistoryTable"]').props().children[8].props.render(firstLabProps);
        const rejectButton = firstLab.props.children[1].props.children[1].props;
        const instance = component.instance();
        const preventDefault = jest.fn();

        // Act
        jest.spyOn(instance, 'confirmChangeStatusReject');
        rejectButton.onClick({ preventDefault }, props.adminActiveLabsHistory.labs.data[0].id);

        // Assert
        expect(instance.confirmChangeStatusReject).toHaveBeenCalledTimes(1);
        expect(confirmModal).toHaveBeenCalled();
    });

    it('handleLabReject() calls updateActiveLabStatus with correct state values', async () => {
        const instance = component.instance();
        const state = component.state();

        expect(state.sendEmail).toBe(true);

        await instance.handleLabReject(props.adminActiveLabsHistory.labs.data[0].id);

        await props.updateActiveLabStatus();

        expect(props.updateActiveLabStatus).toHaveBeenCalledWith(1, {
            completed: false,
            sendEmail: true,
        });

        expect(message.success).toHaveBeenCalledWith('Lab is rejected');
    });

    it('handleLabReject() calls message.error if props.updateActiveLabStatus() fails', async () => {
        const testProps = {
            ...props,
            updateActiveLabStatus: jest.fn(() => Promise.resolve({ message: 'Something went wrong, please try again' })),
        };
        const testComponent = shallow(<LabsHistory {...testProps} />);

        const testInstance = testComponent.instance();
        const testState = testComponent.state();
        const fetchSpy = jest.spyOn(testComponent.instance(), 'fetchActiveLabsHistory');

        expect(testState.sendEmail).toBe(true);

        await testInstance.handleLabReject(props.adminActiveLabsHistory.labs.data[0].id);

        await testProps.updateActiveLabStatus();

        expect(testProps.updateActiveLabStatus).toHaveBeenCalledWith(1, {
            completed: false,
            sendEmail: true,
        });

        expect(message.error).toHaveBeenCalledWith('Something went wrong, please try again');
        expect(fetchSpy).not.toHaveBeenCalled();
    });
});

// Create separate suite to properly test fetchActiveLabs with interval
// Disable lifecyclemethods
// Control the interval functionality

describe('<LabsHistory /> fetchActiveLabs() with interval', () => {
    let component;
    beforeEach(() => {
        component = shallow(<LabsHistory {...props} />, { disableLifecycleMethods: true });
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    it('fetchActiveLabs is called every 15 seconds', async () => {
        // Arrange
        const instance = component.instance();

        // Act
        await instance.componentDidMount();

        // Assert
        expect(props.fetchActiveLabsHistory).toHaveBeenCalledTimes(1); // on mount and on initialize interval

        jest.advanceTimersByTime(30000);
        expect(props.fetchActiveLabsHistory).toHaveBeenCalledTimes(3); // previous 1 plus 2 times interval
    });

    it("searchUser(event) sets the value of `userSearch` from the event's value, plus call fetchActiveLabsHistory method", async () => {
        // Arrange
        const event = { target: { value: 'Saif', name: 'userSearch' } };
        const instance = component.instance();
        expect(component.state('userSearch')).toBe('');
        expect(component.state('currentPage')).toBe(1);

        // Act
        await instance.componentDidMount();
        await instance.handleSearch(event);

        // Assert
        expect(props.fetchActiveLabsHistory).toHaveBeenCalledTimes(1); // on mount
        jest.advanceTimersByTime(600); // advance time by 600ms for the debounceFn
        expect(props.fetchActiveLabsHistory).toHaveBeenCalledTimes(2); // on mount + search

        // Check 2nd call to props.fetchActiveLabsHistory for the arguments of the userSearch
        expect(props.fetchActiveLabsHistory.mock.calls[1][0]).toEqual({
            filterOutDSOA: false,
            progressSearch: '',
            statusSearch: '',
            userSearch: 'Saif',
        }, 1);
        expect(component.state('userSearch')).toBe('Saif');
        expect(component.state('currentPage')).toBe(1);
    });

    it("searchProgress(event) sets the value of `progressSearch` from the event's value, plus call fetchActiveLabsHistory method", async () => {
        // Arrange
        const event = { target: { value: 'CREATING', name: 'progressSearch' } };
        const instance = component.instance();
        expect(component.state('progressSearch')).toBe('');
        expect(component.state('currentPage')).toBe(1);

        // Act
        await instance.componentDidMount();
        await instance.handleSearch(event);
        jest.advanceTimersByTime(600); // advance time by 600ms for the debounceFn

        // Assert
        expect(props.fetchActiveLabsHistory).toHaveBeenCalledTimes(2); // on mount + on progressSearch
        // Check 2nd call to props.fetchActiveLabsHistory for the arguments of the progressSearch
        expect(props.fetchActiveLabsHistory.mock.calls[1][0]).toEqual({
            filterOutDSOA: false,
            progressSearch: 'CREATING',
            statusSearch: '',
            userSearch: '',
        }, 1);
        expect(component.state('progressSearch')).toBe('CREATING');
        expect(component.state('currentPage')).toBe(1);
    });
});
