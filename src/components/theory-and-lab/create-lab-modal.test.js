import React from 'react';
import { shallow } from 'enzyme';
import CreateLabModal from './create-lab-modal';

describe('CreateLabModal', () => {
    let component;
    const props = {
        createLab: jest.fn(() => Promise.resolve(true)),
    };
    beforeEach(() => {
        component = shallow(<CreateLabModal {...props} />);
    });

    it('should render CreateLabModal component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should open modal and click create lab', () => {
        const modal = component.find('Modal');
        modal.props().children[1].props.children.props.onClick();
    });
});
