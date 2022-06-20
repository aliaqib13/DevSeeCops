import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import UploadCourseModal from './index';

const file = {
    name: 'index.json',
    size: 135,
    type: 'application/json',
};

describe('UploadCourseModal', () => {
    let component; let
        props;

    beforeEach(() => {
        props = {
            onClose: jest.fn(),
            importCourse: jest.fn(() => Promise.resolve(true)),
        };
        component = shallow(<UploadCourseModal {...props} />);
    });

    it('Should render successfully', () => {
        const modal = component.find('Modal');
        expect(modal).toHaveLength(1);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('Should call onClose method when click on Close button', () => {
        component.props().footer[0].props.onClick();
        expect(props.onClose).toBeCalledTimes(1);
    });

    it('Should render Upload button', () => {
        const UploadButton = component.find('Upload');
        expect(UploadButton.exists()).toBeTruthy();
    });

    it('Should render "Start upload" button disable if there is no file', () => {
        const modal = component.find('Modal');
        expect(modal.props().footer[1].props.disabled).toBe(true);
    });

    it('Should render "Start upload" button enabled if there is a file in fileList', () => {
        expect(component.find('Modal').props().footer[1].props.disabled).toBe(true);
        component.instance().setState({ fileList: [file] });
        expect(component.find('Modal').props().footer[1].props.disabled).toBe(false);
    });

    it('Should reset state fileList when modal is closed', () => {
        component.instance().setState({ fileList: [file] });
        expect(component.instance().state.fileList).toEqual([file]);
        component.props().footer[0].props.onClick();
        expect(component.instance().state.fileList).toEqual([]);
    });

    it('Should render submitting button with text "Start Upload"', () => {
        expect(component.props().footer[1].props.children).toBe('Start Upload');
    });

    it('Should call importCourse function and change uploading state to true when clicked on "Start Upload" button', () => {
        component.props().footer[1].props.onClick();
        expect(props.importCourse).toBeCalledTimes(1);
        expect(component.instance().state.uploading).toBe(true);
    });

    it('Should render submitting button with text "Uploading.." when the file is loading', () => {
        component.props().footer[1].props.onClick();
        expect(component.props().footer[1].props.children).toBe('Uploading..');
    });
});
