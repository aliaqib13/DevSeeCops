import React from 'react';
import { shallow } from 'enzyme';
import { CertificateOfProgressView } from './certificateOfProgressView';

const props = {
    getCertificateOfProgress: jest.fn(() => Promise.resolve(true)),
    auth: {
        user: {
            id: 1,
            activated: 1,
            email: 'test@araido.io',
            firstname: 'Test',
            is_fellow: 1,
            lastname: 'Test',
        },
    },
    match: {
        params: { id: '1' },
    },
};

describe('CertificateOfProgressView', () => {
    let component;

    beforeEach(() => {
        component = shallow(<CertificateOfProgressView {...props} />);
    });

    it('Should render CertificateOfProgressView successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
