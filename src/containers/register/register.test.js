import React from 'react';
import { shallow } from 'enzyme';
import mockedGA from 'react-ga';
import { Register } from './register';

jest.mock('react-ga', () => ({
    event: jest.fn(),
}));

describe('Register component', () => {
    it('onSubmit() registers the user and creates the correct Google analytics event', async () => {
        const props = {
            location: {},
            auth: {},
            match: { params: { id: 1 } },
            firstCourseCampaign: {
                name: 'firstCourse',
                active: 1,
                config: {
                    emailText: '<p>test</p>',
                    aboveButtonText: 'test',
                },
            },
            register: jest.fn(() => Promise.resolve(true)),
            getCampaign: jest.fn(() => Promise.resolve(true)),
        };
        const e = { preventDefault: jest.fn() };
        const component = shallow(<Register {...props} />);
        const instance = component.instance();
        instance.setState({
            firstname: 'Test',
            lastname: 'Test',
            email: 'test@gmail.com',
            policy: true,
        });

        instance.onSubmit(e);

        expect(props.register).toHaveBeenCalledTimes(1);
        expect(props.register).toHaveBeenCalledWith({
            firstname: 'Test',
            lastname: 'Test',
            email: 'test@gmail.com',
            password: '',
            rToken: '',
        });
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'user_signup',
            action: 'User submitted details to register',
        });
    });

    it('onSubmit() register resolve will call GA event status is 500', async () => {
        const props = {
            location: {},
            auth: {},
            match: { params: { id: 1 } },
            firstCourseCampaign: {
                name: 'firstCourse',
                active: 1,
                config: {
                    emailText: '<p>test</p>',
                    aboveButtonText: 'test',
                },
            },
            getCampaign: jest.fn(() => Promise.resolve(true)),
            register: jest.fn(() => Promise.resolve({

                status: 500,

            })),

        };
        const e = { preventDefault: jest.fn() };
        const component = shallow(<Register {...props} />);
        const instance = component.instance();
        instance.setState({
            firstname: 'Test',
            lastname: 'Test',
            email: 'test@gmail.com',
            policy: true,
        });
        await instance.onSubmit(e);

        expect(props.register).toHaveBeenCalledTimes(1);
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'user_signup',
            action: 'User submitted details to register',
        });
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'user_signup',
            action: 'User failed to sign up',
        });
    });

    it('onSubmit() register resolve will call GA event when user already exist', async () => {
        const props = {
            location: {},
            auth: {},
            match: { params: { id: 1 } },
            firstCourseCampaign: {
                name: 'firstCourse',
                active: 1,
                config: {
                    emailText: '<p>test</p>',
                    aboveButtonText: 'test',
                },
            },
            getCampaign: jest.fn(() => Promise.resolve(true)),
            register: jest.fn(() => Promise.resolve({

                status: 422,
                data: {
                    error: {
                        message: `The user with email ${instance.state.email} already exists!`,
                    },

                },
            })),

        };
        const e = { preventDefault: jest.fn() };
        const component = shallow(<Register {...props} />);
        const instance = component.instance();
        instance.setState({
            firstname: 'Test',
            lastname: 'Test',
            email: 'test@gmail.com',
            policy: true,
        });
        await instance.onSubmit(e);

        expect(props.register).toHaveBeenCalledTimes(1);
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'user_signup',
            action: 'User submitted details to register',
        });
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'user_signup',
            action: 'User failed to sign up',
            label: 'user already exists',
        });
    });

    it('onSubmit() register resolve will call GA event when the entered email is invalid', async () => {
        const props = {
            location: {},
            auth: {},
            match: { params: { id: 1 } },
            firstCourseCampaign: {
                name: 'firstCourse',
                active: 1,
                config: {
                    emailText: '<p>test</p>',
                    aboveButtonText: 'test',
                },
            },
            getCampaign: jest.fn(() => Promise.resolve(true)),
            register: jest.fn(() => Promise.resolve({

                status: 422,
                data: {
                    error: {
                        message: 'Please provide a valid email',
                    },

                },
            })),

        };
        const e = { preventDefault: jest.fn() };
        const component = shallow(<Register {...props} />);
        const instance = component.instance();
        instance.setState({
            firstname: 'Test',
            lastname: 'Test',
            email: 'test@gmail.com',
            policy: true,
        });
        await instance.onSubmit(e);

        expect(props.register).toHaveBeenCalledTimes(1);
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'user_signup',
            action: 'User submitted details to register',
        });
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'user_signup',
            action: 'User failed to sign up',
            label: 'invalid details - email',
        });
    });

    it('onChange() change state with id', async () => {
        const props = {
            location: {},
            auth: {},
            match: { params: { id: 1 } },
            register: jest.fn(() => Promise.resolve(true)),
            getCampaign: jest.fn(() => Promise.resolve(true)),
        };
        const component = shallow(<Register {...props} />);
        const instance = component.instance();
        const stateOld = component.state();
        expect(stateOld.email).toEqual('');
        expect(stateOld.policy).toEqual(false);
        await instance.onChange({ target: { value: 'test@test.test', id: 'email' } });
        await instance.onChange({ target: { id: 'policy' } });
        const stateNew = component.state();
        expect(stateNew.email).toEqual('test@test.test');
        expect(stateNew.policy).toEqual(true);
    });
    it('on componentDidMount() check rToken ', () => {
        const props = {
            location: {},
            auth: {},
            match: { params: { referralToken: 'testToken' } },
            register: jest.fn(() => Promise.resolve(true)),
            getCampaign: jest.fn(() => Promise.resolve(true)),
        };
        const component = shallow(<Register {...props} />);
        expect(component.state('rToken')).toEqual(props.match.params.referralToken);
    });

    it('on componentDidMount() get rToken from localStorage if can not find on params', () => {
        const token = 'TestReferralToken';
        localStorage.setItem('referralToken', token);
        const props = {
            location: {},
            auth: {},
            register: jest.fn(() => Promise.resolve(true)),
            match: { params: {} },
            getCampaign: jest.fn(() => Promise.resolve(true)),
        };
        const component = shallow(<Register {...props} />);
        expect(component.state('rToken')).toEqual(token);
    });
});
