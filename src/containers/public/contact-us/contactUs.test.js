import React from 'react';
import { shallow, mount } from 'enzyme';
import { ContactUs } from './contactUs';

jest.mock('antd', () => (
    { message: { error: msg => msg, loading: msg => () => msg, success: msg => msg } }
));

describe('Check ContactUs Public', () => {
    let component;
    const props = {
        sendForm: jest.fn(() => Promise.resolve(false)),
    };
    function tick() {
        return new Promise(resolve => {
            setTimeout(resolve, 0);
        });
    }
    component = shallow(<ContactUs {...props} />, { disableLifecycleMethods: true });
    component.instance().submitForm = jest.fn();

    it('should render check certificate container successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should can test successfully change states and check validations', async () => {
        component = mount(<ContactUs {...props} />);
        component.setState({
            loaded: true,
            name: '',
            email: '',
            number: '',
            message: '',
            ReCaptchaPassed: false,
            recaptchaKey: '6LeTvI8aAAAAAK2xpvowAVccQf6y8_ZqgBxp4aoC',
        });
        const btn = component.find('.submit').at(0);
        expect(component.state().name).toBe('');
        let errorMsg = btn.props().onClick();

        component.render();
        expect(component.find('input[name="name"]').props().value).toBe('');
        expect(component.find('input[name="email"]').props().value).toBe('');
        expect(component.find('input[name="number"]').props().value).toBe('');
        expect(component.find('textarea[name="message"]').props().value).toBe('');
        expect(component.state().ReCaptchaPassed).toBe(false);
        expect(errorMsg).toBe('Please Fill All Fields');

        await tick();

        // check invalid phone number
        component.setState({
            loaded: true,
            name: 'testName',
            email: 'test@gmail.com',
            number: '+5462158562158aaa',
            message: 'test message',
            ReCaptchaPassed: true,
            recaptchaKey: '6LeTvI8aAAAAAK2xpvowAVccQf6y8_ZqgBxp4aoC',
        });
        errorMsg = btn.props().onClick();
        component.render();
        expect(component.find('input[name="name"]').props().value).toBe('testName');
        expect(component.find('input[name="email"]').props().value).toBe('test@gmail.com');
        expect(component.find('input[name="number"]').props().value).toBe('+5462158562158aaa');
        expect(component.find('textarea[name="message"]').props().value).toBe('test message');
        expect(errorMsg).toBe('Please Provide Valid Phone Number');

        await tick();

        // check invalid recaptcha
        component.setState({
            ReCaptchaPassed: false,
            number: '+5462158562158',
        });
        errorMsg = btn.props().onClick();
        component.render();
        expect(component.state().ReCaptchaPassed).toBe(false);
        expect(errorMsg).toBe('ReCaptcha not passed');
        await tick();

        // check invalid email
        const emailInp = component.find('input[name="email"]');
        emailInp.props().onChange({ target: { name: 'email', value: 'invalidEmail' } });
        component.render();
        component.setState({
            ReCaptchaPassed: true,
            email: 'invalidEmail',
        });
        component.update();
        const bt = component.find('.submit').at(0);
        errorMsg = bt.props().onClick();
        component.render();
        expect(component.find('input[name="name"]').props().value).toBe('testName');
        expect(component.find('input[name="email"]').props().value).toBe('invalidEmail');
        expect(component.find('input[name="number"]').props().value).toBe('+5462158562158');
        expect(component.find('textarea[name="message"]').props().value).toBe('test message');
        expect(errorMsg).toBe('Please Provide Valid Email address');

        await tick();

        // check valid data but invalid result
        component.setState({
            email: 'email@gmail.com',
        });
        component.update();
        errorMsg = await bt.props().onClick();
        component.render();
        expect(errorMsg).toBe('something went wrong please try again ');
        await tick();

        // check valid data and valid result
        component.setProps({
            sendForm: jest.fn(() => Promise.resolve(true)),
        });
        component.update();
        const successMsg = await btn.props().onClick();
        component.render();
        await tick();

        component.instance().recaptchaRef = {
            current: {
                reset() {
                    console.log('aaa');
                },
            },
        };
        expect(successMsg).toBe('Thanks for message, We will connect to you as soon as we can!');
    });
});
