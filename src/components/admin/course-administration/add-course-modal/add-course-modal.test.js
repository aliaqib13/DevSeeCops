import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddCourseModal from './index';

describe('AddCourseModal', () => {
    let component; let
        props;

    beforeEach(() => {
        props = {
            onClose: jest.fn(),
        };
        component = shallow(<AddCourseModal {...props} />);
    });

    it('Should render successfully', () => {
        const modal = component.find('Modal');
        expect(modal.exists()).toBeTruthy();
        expect(toJson(component)).toMatchSnapshot();
    });

    it('Should call onClose method when click on Close button', () => {
        component.props().footer[0].props.onClick();
        expect(props.onClose).toBeCalledTimes(1);
    });

    it('Should render AddCourse component', () => {
        const AddCourseComponent = component.find('Form(withRouter(AddCourse))');
        expect(AddCourseComponent.exists()).toBeTruthy();
    });
});
