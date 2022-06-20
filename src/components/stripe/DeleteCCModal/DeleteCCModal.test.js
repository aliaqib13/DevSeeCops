import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from 'antd';
import DeleteCCModal from './index';

const confirmModal = Modal.confirm;

jest.mock('antd', () => {
    const antd = jest.requireActual('antd');
    const modalANTD = {
        ...antd.Modal,
        confirm: jest.fn(),
    };
    return {
        ...antd,
        Modal: modalANTD,
    };
});

describe('DeleteCCModal', () => {
    let component;
    const props = {
        deleteCreditCardCourse: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = shallow(<DeleteCCModal props={props} />);
    });

    it('should render the component', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should open confirm Modal on delete button click', () => {
        component.props().onClick();
        expect(confirmModal).toHaveBeenCalled();
    });
});
