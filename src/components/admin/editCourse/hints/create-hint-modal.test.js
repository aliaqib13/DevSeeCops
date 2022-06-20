import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CreateHintModal from './create-hint-modal';

describe('CreateHintModal', () => {
    let component; let
        modal;

    beforeEach(() => {
        component = shallow(<CreateHintModal />);
        modal = component.find('Modal');
    });

    it('Should render successfully', () => {
        expect(modal.exists()).toBeTruthy();
        expect(toJson(component)).toMatchSnapshot();
    });

    it('Should call addHint when modal is submitted', () => {
        const addHintMock = jest.fn(() => Promise.resolve(true));
        const toggleModalMock = jest.fn();
        component.setProps({ addHint: addHintMock, toggleModal: toggleModalMock });
        modal.props().footer[2].props.onClick();
        expect(addHintMock).toBeCalledTimes(1);
    });

    it('should push new item to hints', () => {
        expect(component.state('hintMessages').length).toEqual(1);
        component.props().footer[0].props.onClick();
        expect(component.state('hintMessages').length).toEqual(2);
    });

    it('should call "addNewHintMessage" function when press the button "Add message"', () => {
        const spy = jest.spyOn(component.instance(), 'addNewHintMessage');
        expect(spy).toBeCalledTimes(0);
        component.props().footer[0].props.onClick();
        expect(spy).toHaveBeenCalled();
    });
});
