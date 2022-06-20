import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from 'antd';
import InterestedCourses from './InterestedCourses';
import { COURSE_STATUSES } from '../../../constants';

jest.mock('antd', () => {
    const antd = jest.requireActual('antd');
    const modalConfirm = {
        ...antd.Modal,
        confirm: jest.fn(),
    };
    return {
        ...antd,
        Modal: modalConfirm,
    };
});

describe('Interested Courses', () => {
    let component;

    const props = {
        deleteNotifyCourse: jest.fn(() => Promise.resolve(true)),
        getPlannedCourses: jest.fn(() => Promise.resolve(true)),
        notifyCourses: [
            {
                id: 18,
                course_id: 5,
                user_id: 3,
                created_at: '2021-06-15 18:27:01',
                updated_at: '2021-06-15 18:27:01',
                course: {
                    id: 5,
                    title: 'Runtime Container Security',
                    description: 'Keeping an eye on your running containers',
                    cert_badge: 0,
                    version: '1.0.0',
                    difficulty: 0,
                    content: 'At the end of this course you will know how to make sure you are running safe containers in production',
                    views: 0,
                    image: 'https://i2.wp.com/foxutech.com/wp-content/uploads/2017/03/Docker-Security.png?fit=820%2C407&ssl=1',
                    author: null,
                    theory_duration: '15m',
                    price: 100.99,
                    slug: 'container-security-runtime',
                    linkedIn_url: null,
                    category_id: 2,
                    created_at: '2021-06-07 17:19:44',
                    updated_at: '2021-06-07 17:19:44',
                    is_from_draft: 0,
                    theory_title: null,
                    theory_description: null,
                    status: COURSE_STATUSES.DEVELOPMENT,
                    type: 'standard',
                    deleted: 0,
                },
            },
            {
                id: 19,
                course_id: 6,
                user_id: 3,
                created_at: '2021-06-15 18:27:01',
                updated_at: '2021-06-15 18:27:01',
                course: {
                    id: 6,
                    title: 'Runtime Container Security',
                    description: 'Keeping an eye on your running containers',
                    cert_badge: 0,
                    version: '1.0.0',
                    difficulty: 0,
                    content: 'At the end of this course you will know how to make sure you are running safe containers in production',
                    views: 0,
                    image: 'https://i2.wp.com/foxutech.com/wp-content/uploads/2017/03/Docker-Security.png?fit=820%2C407&ssl=1',
                    author: null,
                    theory_duration: '15m',
                    price: 100.99,
                    slug: 'container-security-runtime',
                    linkedIn_url: null,
                    category_id: 2,
                    created_at: '2021-06-07 17:19:44',
                    updated_at: '2021-06-07 17:19:44',
                    is_from_draft: 0,
                    theory_title: null,
                    theory_description: null,
                    status: COURSE_STATUSES.DEVELOPMENT,
                    type: 'standard',
                    deleted: 0,
                },
            },
        ],
    };

    beforeEach(() => {
        component = shallow(<InterestedCourses {...props} />);
    });

    it('Should render component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should render `Table` titles successfully', () => {
        const tableColumns = component.find('Column');
        expect(tableColumns.at(0).props().title).toEqual('Title');
        expect(tableColumns.at(1).props().title).toEqual('Remove');
    });

    it('Should call confirm modal on click delete button', () => {
        const column = component.find('Column[title="Remove"]');
        const button = column.props().render(props.notifyCourses[0]).props;
        button.onClick();
        expect(Modal.confirm).toBeCalled();
    });

    it('Should call get planned courses when resolved delete notify course', async () => {
        const courseId = props.notifyCourses[0].course_id;
        const { removeInterestedCourse } = component.instance();
        await removeInterestedCourse(courseId);
        expect(props.deleteNotifyCourse).toHaveBeenCalledWith(courseId);
        expect(props.getPlannedCourses).toBeCalled();
    });
});
