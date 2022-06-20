import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import EditHintModal from './edit-hint-modal';

describe('EditHintModal', () => {
    const hint = { id: 5, course_id: 1, message: '<p>Test Hint</p>' };
    let component; let editHintMock; let toggleModalMock; let
        modal;

    beforeEach(() => {
        editHintMock = jest.fn(() => Promise.resolve(true));
        toggleModalMock = jest.fn();
        component = shallow(<EditHintModal hint={hint} />);
        component.setProps({ editHint: editHintMock, toggleModal: toggleModalMock });
        modal = component.find('Modal');
    });

    it('Should render successfully', () => {
        expect(modal.exists()).toBeTruthy();
        expect(toJson(component)).toMatchSnapshot();
    });

    it('Should render correct hint message in the input field', () => {
        expect(modal.props().children.props.children[1].props.data).toBe(component.instance().props.hint.message);
    });

    it('Should call editHint when modal is submitted', () => {
        modal.props().footer[1].props.onClick();
        expect(editHintMock).toBeCalledTimes(1);
    });

    it('Should call toggleModal when cancel button is clicked', () => {
        modal.props().footer[0].props.onClick();
        expect(toggleModalMock).toBeCalledTimes(1);
    });
});
