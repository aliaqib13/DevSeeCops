import React from 'react';
import { shallow } from 'enzyme';
import CourseInterst from './CourseInterest';

const props = {
    courseInterests: [
        {
            id: 15,
            title: 'Mobile Security',
            plannedCourseUsers: [{
                id: 5,
                firstname: 'Sarah',
                lastname: 'Polan',
                email: 'sarah.polan@araido.io',
                pivot: { user_id: 5, course_id: 15 },
            }, {
                id: 6,
                firstname: 'Hans',
                lastname: 'Moonen',
                email: 'hans@araido.io',
                pivot: { user_id: 6, course_id: 15 },
            }, {
                id: 3,
                firstname: 'Henry',
                lastname: 'Tovmasyan',
                email: 'henry@araido.io',
                pivot: { user_id: 3, course_id: 15 },
            }],
        }, {
            id: 5,
            title: 'Runtime Container Security',
            plannedCourseUsers: [{
                id: 4,
                firstname: 'George',
                lastname: 'Aramyan',
                email: 'george@araido.io',
                pivot: { user_id: 4, course_id: 5 },
            }, {
                id: 3,
                firstname: 'Henry',
                lastname: 'Tovmasyan',
                email: 'henry@araido.io',
                pivot: { user_id: 3, course_id: 5 },
            }],
        }, {
            id: 8,
            title: 'Automated DAST in CI/CD',
            plannedCourseUsers: [{
                id: 3,
                firstname: 'Henry',
                lastname: 'Tovmasyan',
                email: 'henry@araido.io',
                pivot: { user_id: 3, course_id: 8 },
            }],
        }, {
            id: 10,
            title: 'Vulnerability Management',
            plannedCourseUsers: [{
                id: 3,
                firstname: 'Henry',
                lastname: 'Tovmasyan',
                email: 'henry@araido.io',
                pivot: { user_id: 3, course_id: 10 },
            }],
        },
    ],

};

describe('Course Interest', () => {
    let component;
    component = shallow(<CourseInterst {...props} />);

    it('Should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should open the side bar for a record when "Users" butotn is pressed', async () => {
        expect(component.state().visible).toBeFalsy();
        const column = component.find('Column[title="Users"]');
        expect(column).toHaveLength(1);
        // Call the column render with the expected props it will get
        const columnContent = column.props().render(props.courseInterests[0], props.courseInterests[0]);
        // TODO: fix the above so we actually get a shallow rendered component we can call `simaulate('click')` on
        columnContent.props.onClick();

        // expect state with correct course:
        expect(component.state().visible).toBeTruthy();
        expect(component.state().selectedCourseId).toEqual(props.courseInterests[0].id);
    });

    it('Should change visible when call closeDrawer', async () => {
        await component.setState({ visible: true });
        component.instance().closeDrawer();
        expect(component.state().visible).toBeFalsy();
    });
});
