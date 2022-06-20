import React from 'react';
import { shallow } from 'enzyme';
import { EditCourse } from './editCourse';

describe('Admin EditCourse', () => {
    const props = {
        adminCourse: {},
        match: { params: { id: 2 } },
        fetchStepsImages: jest.fn(),
        getCourseTypes: jest.fn(),
        getCourseById: jest.fn(() => Promise.resolve(true)),
        fetchRatings: jest.fn(),
        history: { push: jest.fn() },
        authUser: { roles: [] },
        fetchCourseDesigns: jest.fn(),
    };

    const component = shallow(<EditCourse {...props} />);

    it('Should render successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should getData redirect to /platform/courses when course not found and user is not administrator', () => {
        const { getData } = component.instance();
        getData();
        expect(props.history.push).toBeCalledWith('/platform/courses');
    });

    it('Should getData call fetchCourseDesigns when course is exists and is from draft', async () => {
        const newProps = {
            adminCourse: { course: { is_from_draft: true } },
            authUser: { roles: ['administrator'] },
            fetchCourseDesigns: jest.fn(),
        };
        component.setProps(newProps);
        const { getData } = component.instance();
        await getData();
        expect(newProps.fetchCourseDesigns).toBeCalled();
    });
});
