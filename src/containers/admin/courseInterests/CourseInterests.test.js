import React from 'react';
import { shallow } from 'enzyme';
import { CourseInterests } from './CourseInterests';

const props = {
    fetchCourseInterests: jest.fn(() => Promise.resolve(true)),
    courseInterests: [],
};

describe('Course Interests', () => {
    const component = shallow(<CourseInterests {...props} />);

    it('Should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should call fetchCourseInterests props when component did mount', () => {
    	const instance = component.instance();
        instance.componentDidMount();
        expect(props.fetchCourseInterests).toBeCalled();
    });
});
