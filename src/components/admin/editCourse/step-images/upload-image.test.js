import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Resizer from 'react-image-file-resizer';
import UploadImage from './upload-image';

const state = {
    imageUrl: 'data:image/png;base64,testimageurl',
    height: 66,
    width: 72,
    heightRatio: '0.9',
    widthRatio: '1.1',
    file: {
        uid: 'rc-upload-1591961028788-2',
    },
};

describe('Upload Image', () => {
    let component;

    beforeEach(() => {
        component = shallow(<UploadImage />);
    });

    it('Should render successfully', () => {
        const wrapper = component.find('.upload-image');
        expect(wrapper.exists()).toBeTruthy();
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Should render buttons disables when there is no image uploaded', () => {
        const actionButtons = component.find('.actions').find('Button');
        expect(actionButtons.at(0).props().disabled).toBeTruthy();
        expect(actionButtons.at(1).props().disabled).toBeTruthy();
        expect(actionButtons.at(2).props().disabled).toBeTruthy();
    });

    it('Should render inputs for changing size disabled when there is no image uploaded', () => {
        const inputs = component.find('.resize-inputs').find('InputNumber');
        expect(inputs.at(0).props().disabled).toBeTruthy();
        expect(inputs.at(1).props().disabled).toBeTruthy();
    });
});

describe('Upload Image component with uploaded image', () => {
    let component;

    beforeEach(() => {
        component = shallow(<UploadImage />);
        component.instance().setState(state);
    });

    it('Should add image to upload field when image is uploaded', () => {
        expect(component.find('Upload').find('img').props().src).toBe(state.imageUrl);
    });

    it('Should show modal with image when clicked on preview button', () => {
        const previewButton = component.find('.actions Button').at(0);
        previewButton.simulate('click');
        const modal = component.find('Modal');
        expect(modal.props().visible).toBeTruthy();
    });

    it('Should render modal with proper image', () => {
        const previewButton = component.find('.actions').find('Button').at(0);
        previewButton.simulate('click');
        const modal = component.find('Modal');
        expect(modal.find('img').props().src).toBe(state.imageUrl);
    });

    it('Should call uploadImage method when clicked on "Resize and Upload" button', () => {
        Resizer.imageFileResizer = jest.fn();
        const spy = jest.spyOn(component.instance(), 'uploadImage');
        component.instance().setState(state);
        const ResizeAndSave = component.find('.actions Button').at(1);
        ResizeAndSave.simulate('click');
        expect(spy).toBeCalledTimes(1);
    });

    it('Should render modal title with right dimensions', () => {
        const modal = component.find('Modal');
        expect(modal.props().title).toBe(`Image Preview: ${state.height} x ${state.width}`);
    });
});
