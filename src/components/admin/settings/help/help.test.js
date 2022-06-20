import React from 'react';
import { shallow } from 'enzyme';
import Help from './index';

describe('Help', () => {
    let component; const
        props = {
            getHelp: jest.fn(() => Promise.resolve(true)),
            updateHelp: jest.fn(() => Promise.resolve(true)),
        };

    beforeEach(() => {
        component = shallow(<Help {...props} />);
    });

    it('should render Help component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should have title Help', () => {
        const title = component.find('.help-title');
        expect(title.props().children).toBe(' Help ');
    });

    it('should render save button successfully', () => {
        const saveBtn = component.find('.btn-save-help');
        expect(saveBtn.exists()).toBeTruthy();
    });

    it('Should call updateHelp method when click on save button', () => {
        const saveBtn = component.find('.btn-save-help');
        saveBtn.props().onClick();
        expect(props.updateHelp).toBeCalledTimes(1);
    });

    it('should render preview button successfully', () => {
        const previewBtn = component.find('.btn-preview-help');
        expect(previewBtn.exists()).toBeTruthy();
    });

    it('should preview button have title Preview', () => {
        const previewBtn = component.find('.btn-preview-help');
        expect(previewBtn.props().children[0]).toBe('Preview');
    });

    it('should toggle preview modal successfully', () => {
        const previewBtn = component.find('.btn-preview-help');
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

    it('Should call updateHelp method when click on modal save button', () => {
        const modal = component.find('.preview-steps-modal');
        modal.props().onOk();
        expect(props.updateHelp).toBeCalledTimes(3);
    });

    it('should toggle preview modal successfully when canceled', () => {
        const modal = component.find('.preview-steps-modal');
        component.state().visible = true;
        modal.props().onCancel();
        expect(component.state().visible).toBeFalsy();
    });
});
