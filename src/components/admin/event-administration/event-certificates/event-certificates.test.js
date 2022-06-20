import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import EventCertificates from './index';

const props = {
    eventCertificates: {
        data: [
            {
                id: 3,
                course_id: 4,
                uuid: '1c3f1590-c972-4b80-9c78-b217bd7c9488',
                type: 'completion',
                image: 'https://certificates.devsecops-academy.com/certificate_of_Henry_Tovmasyan_d8111d51-a4e1-4d9a-8df4-d694f93b1c05.png',
                badge: 'https://certificates.devsecops-academy.com/badge_of_theory_d8111d51-a4e1-4d9a-8df4-d694f93b1c05.png',
                lab_name: 'Container Security in CI/CD',
                difficulty: 'V1.0.0',
                platform: null,
                user_id: 3,
                created_at: '2021-01-14 15:49:41',
                updated_at: '2021-01-14 15:49:41',
                cert_info: {
                    firstname: 'Henry', lastname: 'Tovmasyan', name: ' Henry Tovmasyan ', course_id: 4, user_id: 3, owner_signature: 'https://atp-resources.s3.eu-central-1.amazonaws.com/lab-signature/G1llf9k4oTDZ3fCoIEqUu1m4c5VHme0C.png', signUrl: 'theory', certificateName: 'in appreciation of successful completion of the theory course', date: '14 Jan, 2021', labName: 'Container Security in CI/CD', uuid: '1c3f1590-c972-4b80-9c78-b217bd7c9488', version: 'V1.0.0', platformOwner: 'Dominik de Smit, CEO DevSecOps Academy',
                },
                users: {
                    id: 3, firstname: 'Henry', lastname: 'Tovmasyan', email: 'henry@araido.io',
                },
                courses: { id: 4, title: 'Container Security in CI/CD' },
                activeLab: {
                    id: 5, active_course_id: 5, lab_id: 3, user_id: 3, status: 1, progress: 'Pending', duration: 3, lab_end_at: 1600688879, max_hint_count: 4, hint_is_open: null, start_time: '2021-01-14T12:41:19.000Z', created_at: '2021-01-14 16:41:19', updated_at: '2021-01-14 16:41:19', total_spin_up_time: 16106558, total_spin_ups: 1, completed_failed_steps: null, retry_times: 0,
                },
                activeCourse: { updated_at: '2021-01-14 16:41:19' },
            },
        ],
        lastPage: 1,
        page: 1,
        perPage: 10,
        total: 1,
        eventName: 'Test',
    },
    event_id: 1,
    getEventCertificates: jest.fn(() => Promise.resolve(true)),
};

describe('EventCertificates', () => {
    let component; let
        container;

    beforeEach(() => {
        component = shallow(<EventCertificates {...props} />);
        container = component.props().children.props.children;
    });

    it('Should render the component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should render the title successfully', () => {
        expect(container[0].props.children[0]).toBe('Course Certificates for event -');
        expect(container[0].props.children[2]).toBe(props.eventCertificates.eventName);
    });

    it('Should render the title successfully', () => {
        expect(container[1].props.data.length).toBe(props.eventCertificates.data.length);
    });

    it('Should render `Export CSV` button', () => {
        const exportCSV = component.find('.export-csv');

        expect(exportCSV.props().filename).toBe('event-certificates-data.csv');
        expect(exportCSV.props().data).toHaveLength(props.eventCertificates.data.length);

        const exportBtn = exportCSV.find('Button');
        expect(exportBtn.props().children).toBe('Export CSV');
        expect(exportBtn.props().htmlType).toBe('button');
    });

    it('Should render `Show` select limit options', () => {
        const showText = component.find('span');
        expect(showText.text()).toBe('Show');

        // Render `Show` select options
        const showSelect = component.find('Select');
        const showOptions = showSelect.find('Option');
        expect(showSelect.props().value).toBe(10); // initial option is 10
        expect(showOptions.at(0).props().value).toBe('10');
        expect(showOptions.at(0).props().children).toBe('10');
        expect(showOptions.at(1).props().value).toBe('all');
        expect(showOptions.at(1).props().children).toBe('All');

        // Should call `getEventCertificates` on option change
        expect(props.getEventCertificates).toHaveBeenCalledTimes(0);
        showSelect.props().onChange({ target: { value: 'all' } });
        expect(props.getEventCertificates).toHaveBeenCalled();
        expect(props.getEventCertificates).toHaveBeenCalledTimes(1);
    });

    it('Should render table successfully', () => {
        const table = component.find('.event-certificates-table');
        expect(table).toHaveLength(1);
        expect(table.props().dataSource).toHaveLength(props.eventCertificates.data.length);

        // Should the right data for user`s event information (example: first index)
        const userTableDataSource = table.props().dataSource[0];
        const userName = `${props.eventCertificates.data[0].users.firstname} ${props.eventCertificates.data[0].users.lastname}`;
        expect(userTableDataSource.user_name).toBe(userName);
        expect(userTableDataSource.user_email).toBe(props.eventCertificates.data[0].users.email);
        expect(userTableDataSource.course_name).toBe(props.eventCertificates.data[0].courses.title);
        expect(userTableDataSource.lab_time).toBe('4h:28m');
        const labStartTime = moment(props.eventCertificates.data[0].activeLab.start_time).format('MMM Do YYYY hh:mm');
        expect(userTableDataSource.lab_start_time).toBe(labStartTime);
        const labEndTime = moment(props.eventCertificates.data[0].activeLab.lab_end_at * 1000).format('MMM Do YYYY hh:mm');
        expect(userTableDataSource.lab_end_time).toBe(labEndTime);

        // Change Pagination will call `getEventCertificates` function
        expect(component.state().currentPage).toBe(1); // Initial page is 1
        table.props().pagination.onChange(2);
        expect(component.state().currentPage).toBe(2); // current page will change to page 2
        expect(props.getEventCertificates).toHaveBeenCalled();
    });

    it("Should render table's columns successfully", () => {
        const table = component.find('.event-certificates-table');
        const columns = table.props();

        expect(columns.children[0].props.title).toBe('User Name');
        expect(columns.children[0].props.dataIndex).toBe('user_name');
        expect(columns.children[1].props.title).toBe('User Email');
        expect(columns.children[1].props.dataIndex).toBe('user_email');
        expect(columns.children[2].props.title).toBe('Course Name');
        expect(columns.children[2].props.dataIndex).toBe('course_name');
        expect(columns.children[3].props.title).toBe('Lab time');
        expect(columns.children[3].props.dataIndex).toBe('lab_time');
        expect(columns.children[4].props.title).toBe('Lab Start Time');
        expect(columns.children[4].props.dataIndex).toBe('lab_start_time');
        expect(columns.children[5].props.title).toBe('Lab End Time');
        expect(columns.children[5].props.dataIndex).toBe('lab_end_time');
    });
});
