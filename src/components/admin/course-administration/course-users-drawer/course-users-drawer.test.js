import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import CourseUsersDrawer from './index';

const props = {
    users: {
        data: [
            {
                activated: 1,
                certificate_name: null,
                coordinator: null,
                created_at: '2020-05-25 16:35:42',
                email: 'henry@araido.io',
                firstname: 'Henry',
                id: 3,
                lastname: 'Tovmasyan',
                updated_at: '2020-05-25 16:35:42',
            },
            {
                activated: 1,
                certificate_name: null,
                coordinator: null,
                created_at: '2020-05-25 16:35:42',
                email: 'george@araido.io',
                firstname: 'George',
                id: 4,
                lastname: 'Aramyan',
                updated_at: '2020-05-25 16:35:42',
            },
        ],
        lastPage: 1,
        page: 1,
        perPage: 10,
        total: 8,
    },
    visible: true,
    removeUserActiveCourse: jest.fn(() => Promise.resolve(true)),
    addUserActiveCourse: jest.fn(() => Promise.resolve(true)),
    onClose: jest.fn(),
    getCourseUsers: jest.fn(() => Promise.resolve(true)),
};

describe('CourseUsersDrawer', () => {
    let component;

    beforeEach(() => {
        component = shallow(<CourseUsersDrawer {...props} />);
    });

    it('Should render successfully', () => {
        const Drawer = component.find('withConfigConsumer(Drawer)');
        expect(Drawer.exists()).toBe(true);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('Should render successfully the autoComplete input', () => {
        const AutoComplete = component.find('AutoComplete');
        expect(AutoComplete.exists()).toBe(true);
    });

    it('Should render successfully the table containing users', () => {
        const table = component.find('withStore(Table)');
        expect(table.exists()).toBe(true);
        expect(table.props().dataSource).toEqual(props.users.data);
    });
});

describe('CourseUsersDrawer table', () => {
    let component;

    beforeEach(() => {
        component = mount(<CourseUsersDrawer {...props} />);
    });

    it('Should show user\'s email in users table', () => {
        const user_email = component.find('tr.drawer-users-row').at(0).find('td').at(0);
        expect(user_email.text()).toBe(props.users.data[0].email);
    });

    it('Should call removeUserActiveCourse function with proper user id when click on delete button in users table', () => {
        const remove_user_icon = component.find('tr.drawer-users-row').at(0).find('td').at(1)
            .find('Button');
        remove_user_icon.simulate('click');
        expect(props.removeUserActiveCourse).toBeCalledTimes(1);
        expect(props.removeUserActiveCourse.mock.calls[0][0]).toBe(props.users.data[0].id);
    });
});

describe('CourseUsersDrawer autoComplete Input', () => {
    let component; let
        Input;

    beforeEach(() => {
        component = shallow(<CourseUsersDrawer {...props} />);
        props.addUserActiveCourse.mockClear();
        Input = component.find('AutoComplete').find('Input');
    });

    it('Should call addUserActiveCourse when clicked on add_user icon and input field is not empty', () => {
        component.instance().setState({ inputValue: 'test@mail.test' });
        Input.props().suffix.props.onClick();
        expect(props.addUserActiveCourse).toBeCalledTimes(1);
    });

    it('Should not call addUserActiveCourse when clicked on add_user icon and input field is empty', () => {
        component.instance().setState({ inputValue: '' });
        Input.props().suffix.props.onClick();
        expect(props.addUserActiveCourse).toBeCalledTimes(0);
    });
});
