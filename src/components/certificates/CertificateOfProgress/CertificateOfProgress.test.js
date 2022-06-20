import React from 'react';
import { shallow } from 'enzyme';
import { CertificateOfProgress } from './CertificateOfProgress';

const props = {
    certificates: [
        {
            course_ids: '[3]',
            created_at: '2020-11-13 12:14:19',
            id: 1,
            is_publicly_visible: 0,
            updated_at: '2020-11-16 14:05:21',
            user_id: 3,
        },
        {
            course_ids: '[3,4]',
            created_at: '2020-11-13 12:14:19',
            id: 2,
            is_publicly_visible: 1,
            updated_at: '2020-11-16 14:05:21',
            user_id: 3,
        },
    ],
    deleteCertificateOfProgress: jest.fn(() => Promise.resolve(true)),
    updateCertificateVisibility: jest.fn(() => Promise.resolve(true)),
};

describe('CertificateOfProgress', () => {
    let component;

    beforeEach(() => {
        component = shallow(<CertificateOfProgress {...props} />);
    });

    it('Should render CertificateOfProgress successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should render Table successfully', () => {
        const table = component.props().children[2];
        expect(table.props.dataSource).toBe(props.certificates);
    });
});
