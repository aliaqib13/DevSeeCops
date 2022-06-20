import React from 'react';
import { shallow } from 'enzyme';
import CourseInterestDrawer from './CourseInterestDrawer';

const props = {
    data: [
        {
            id: 1, firstname: 'test1', lastname: 'test2', email: 'test1email@test.test',
        },
        {
            id: 2, firstname: 'test3', lastname: 'test4', email: 'test2email@test.test',
        },
    ],
};

describe('CourseInterestDrawer', () => {
    let component;
    component = shallow(<CourseInterestDrawer {...props} />);
    it('Should render successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should render user firstname lastname and email', async () => {
        const col1 = component.props().children[1].props.children[0].props;
        const col2 = component.props().children[1].props.children[1].props;
        const rend1 = col1.render(props.data[0]);
        const rend2 = col2.render(props.data[0]);
        expect(rend1).toBe(`${props.data[0].firstname} ${props.data[0].lastname}`);
        expect(rend2).toBe(props.data[0].email);
    });
});
