import React from 'react';
import { shallow } from 'enzyme';
import { message } from 'antd';
import { UpdateCertificate } from './updateCertificate';

describe('UpdateCertificate', () => {
    let component;
    const props = {
        form: {
            getFieldDecorator: jest.fn(() => c => c),
        },
        visible: true,
        updatingCertificate: {
            users: {
                certificate_name: 'testName1',
            },
        },
        toggleModal: jest.fn(),
        updateCertificate: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = shallow(<UpdateCertificate {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should render UpdateCertificate component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should render Modal successfully', () => {
        const modal = component.find('Modal');
        expect(modal.exists()).toBeTruthy();
    });

    it('Should render Form successfully', () => {
        const form = component.find('Form');
        expect(form.exists()).toBeTruthy();
    });

    it('Should has onSubmit attribute on the form', () => {
        const form = component.find('Form');
        expect(form.props().onSubmit).toBeDefined();
    });

    it('Should render Input successfully', () => {
        const input = component.find('Input');
        expect(input.exists()).toBeTruthy();
    });

    it('Should has onChange attribute on the form', () => {
        const input = component.find('Input');
        expect(input.props().onChange).toBeDefined();
    });

    it('Should call toggle modal when call closeModal ', () => {
        const instance = component.instance();
        instance.closeModal();
        expect(props.toggleModal).toBeCalled();
    });

    it('Should set new value onchange', async () => {
        const newTestName = 'newTestName';
        const input = component.find('Input');
        const oldState = await component.state();
        expect(oldState.certificate_name).toBe(props.updatingCertificate.users.certificate_name);
        input.props().onChange({ target: { value: newTestName, name: 'certificate_name' } });
        const newState = component.state();
        expect(newState.certificate_name).toBe(newTestName);
    });

    it('updateCertificate should toggle modal when res is true', async () => {
        const instance = component.instance();
        const oldState = component.state();
        expect(oldState.loading).toBe(false);
        await instance.updateCertificate();
        expect(instance.props.updateCertificate).toBeCalled();
        const newState = component.state();
        expect(newState.loading).toBe(false);
        expect(instance.props.toggleModal).toBeCalled();
    });

    it('updateCertificate should toggle modal when the api returns an error', async () => {
        component.setProps({
            updateCertificate: jest.fn(() => Promise.resolve(false)),
        });
        const instance = component.instance();
        const oldState = component.state();
        expect(oldState.loading).toBe(false);
        await instance.updateCertificate();
        expect(instance.props.updateCertificate).toBeCalled();
        const newState = component.state();
        expect(newState.loading).toBe(true);
        expect(message.error('something went wrong'));
        expect(instance.props.toggleModal).toBeCalled();
    });
});
