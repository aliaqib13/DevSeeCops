import React from 'react';
import { shallow } from 'enzyme';
import BetaTestInstructions from './index';

describe('BetaTestInstructions', () => {
    let component; const
        props = {
            getBetaTestInstructions: jest.fn(() => Promise.resolve(true)),
            updateBetaTestInstructions: jest.fn(() => Promise.resolve(true)),
        };

    beforeEach(() => {
        component = shallow(<BetaTestInstructions {...props} />);
    });

    it('should render BetaTestInstructions component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should have title Beta Test Instructions', () => {
        const title = component.find('.beta-test-title');
        expect(title.props().children).toBe(' Beta Test Instructions ');
    });

    it('should render save button successfully', () => {
        const saveBtn = component.find('.btn-save-beta-test');
        expect(saveBtn.exists()).toBeTruthy();
    });

    it('Should call updateBetaTestInstructions method when click on save button', () => {
        const saveBtn = component.find('.btn-save-beta-test');
        saveBtn.props().onClick();
        expect(props.updateBetaTestInstructions).toBeCalledTimes(1);
    });

    it('should render preview button successfully', () => {
        const previewBtn = component.find('.btn-preview-beta-test');
        expect(previewBtn.exists()).toBeTruthy();
    });

    it('should preview button have title Preview', () => {
        const previewBtn = component.find('.btn-preview-beta-test');
        expect(previewBtn.props().children[0]).toBe('Preview');
    });

    it('should toggle preview modal successfully', () => {
        const previewBtn = component.find('.btn-preview-beta-test');
        previewBtn.props().onClick();
        expect(component.state().visible).toBeTruthy();
    });

    it('should render preview modal successfully', () => {
        const previewModal = component.find('.preview-steps-modal');
        expect(previewModal.exists()).toBeTruthy();
    });

    it('preview modal title should be Preview Steps', () => {
        const previewModal = component.find('.preview-steps-modal');
        expect(previewModal.props().title).toBe('Preview Steps');
    });

    it('should toggle preview modal successfully when saved', () => {
        const modal = component.find('.preview-steps-modal');
        component.state().visible = true;
        modal.props().onOk();
        expect(component.state().visible).toBeFalsy();
    });

    it('Should call updateBetaTestInstructions method when click on modal save button', () => {
        const modal = component.find('.preview-steps-modal');
        modal.props().onOk();
        expect(props.updateBetaTestInstructions).toBeCalledTimes(3);
    });

    it('should toggle preview modal successfully when canceled', () => {
        const modal = component.find('.preview-steps-modal');
        component.state().visible = true;
        modal.props().onCancel();
        expect(component.state().visible).toBeFalsy();
    });
});
