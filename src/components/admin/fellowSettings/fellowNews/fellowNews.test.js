import React from 'react';
import { shallow } from 'enzyme';
import FellowNews from './index';

describe('FellowNews', () => {
    let component; const
        props = {
            getFellowNews: jest.fn(() => Promise.resolve(true)),
            updateFellowNews: jest.fn(() => Promise.resolve(true)),
        };

    beforeEach(() => {
        component = shallow(<FellowNews {...props} />);
    });

    it('should render FellowNews component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should have title Fellow News', () => {
        const title = component.find('.fellow-guidelines-title');
        expect(title.props().children).toBe(' Fellow News');
    });

    it('should render save button successfully', () => {
        const saveBtn = component.find('.btn-save-guideline');
        expect(saveBtn.exists()).toBeTruthy();
    });

    it('Should call updateFellowNews method when click on save button', () => {
        const saveBtn = component.find('.btn-save-guideline');
        saveBtn.props().onClick();
        expect(props.updateFellowNews).toBeCalledTimes(1);
    });

    it('should render preview button successfully', () => {
        const previewBtn = component.find('.btn-preview-guideline');
        expect(previewBtn.exists()).toBeTruthy();
    });

    it('should preview button have title Preview', () => {
        const previewBtn = component.find('.btn-preview-guideline');
        expect(previewBtn.props().children).toBe('Preview ');
    });

    it('should toggle preview modal successfully', () => {
        const previewBtn = component.find('.btn-preview-guideline');
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

    it('Should call updateFellowNews method when click on modal save button', () => {
        const modal = component.find('.preview-steps-modal');
        modal.props().onOk();
        expect(props.updateFellowNews).toBeCalledTimes(3);
    });

    it('should toggle preview modal successfully when canceled', () => {
        const modal = component.find('.preview-steps-modal');
        component.state().visible = true;
        modal.props().onCancel();
        expect(component.state().visible).toBeFalsy();
    });
});
