import React from 'react';
import { shallow } from 'enzyme';
import { MFA } from './mfa';

describe('MFA component', () => {
    const props = {
        auth: {
            user: {},
        },
        location: {
            state: {},
        },
    };
    const component = shallow(<MFA {...props} />);
    it('Should render successfully', () => {
        const wrapper = component.find('.mfa-container');
        expect(wrapper.exists()).toBeTruthy();
    });
    it('should change state showManually to true when call showMFA', () => {
        expect(component.state().showManually).toBeFalsy();
        const instance = component.instance();
        instance.showMFA();
        expect(component.state().showManually).toBeTruthy();
    });
});
