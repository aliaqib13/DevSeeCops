import React from 'react';
import { shallow } from 'enzyme';
import { CourseDesign } from './courseDesign';

const props = {
    courseDesigns: [
        {
            value: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<strong> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </strong></p>\n\n<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n',
            draft_field_id: 232,
            draftCourseField: { id: 232, name: '<p>Free input field for notes. <br />  For instance to describe latest on drafting the design of this page </p>' },
        },
        {
            value: 'Testing',
            draft_field_id: 238,
            draftCourseField: { id: 238, name: '<p>What are the hands-on lab resources that you will need?<br />\n  For instance: a Gitlab instance, Open Policy Agent </p>' },
        },
        {
            value: 'Testing',
            draft_field_id: 242,
            draftCourseField: { id: 242, name: '<p>What are all the DevSecOps benefits of this course? Why is this worth teaching the user?  <br />\n              Example:  By adding efficient assurance to help build trust and enhance the case for deployment automation </p>' },
        },
        {
            value: 'By Testing',
            draft_field_id: 246,
            draftCourseField: { id: 246, name: '<p>What tool is used to detect the problem? <br />\n  Example: Open Policy Agent </p>' },
        },
        {
            value: 'By Testing',
            draft_field_id: 247,
            draftCourseField: { id: 247, name: '<p>How will the user verify the solution to this problem?  <br />\n Example: By re-running the pipeline to re-scan for vulnerabilities/misconfigurations </p>' },
        },
    ],
};

describe('CourseDesign', () => {
    let component;

    beforeEach(() => {
        component = shallow(<CourseDesign {...props} />);
    });

    it('Should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
