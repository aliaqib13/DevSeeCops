import React, { Component } from 'react';
import { shallow } from 'enzyme';
import CertificatesFilter from './CertificatesFilter';
import { COURSE_TYPE } from '../../../constants';
import CertificatesTab from '../CertificatesTab/CertificatesTab';

const theory_certificates = [{
    uuid: 'caf8aac4-1db4-4c33-ae8b-e9ec3dcf3055',
    course_id: 1,
    type: 'theory',
    image: '',
    badge: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/certificates/badge_of_theory_9abed912-14a2-4243-86cd-8295f81ff4fc.png',
    lab_name: 'Secrets Management for your applications',
    difficulty: 'V1.0.0',
    platform: null,
    created_at: '2020-08-26 12:44:55',
    user_id: 3,
    updated_at: '2020-08-26 12:44:55',
    cert_info: {
        date: '26 Aug, 2020',
        name: 'Henry Tovmasyan',
        uuid: 'caf8aac4-1db4-4c33-ae8b-e9ec3dcf3055',
        labName: 'Secrets Management for your applications',
        signUrl: 'theory',
        user_id: 3,
        version: 'V1.0.0',
        lastname: 'Tovmasyan',
        course_id: 1,
        firstname: 'Henry',
        platformOwner: 'Dominik de Smit, CEO DevSecOps Academy',
        certificateName: 'in appreciation of successful completion of the theory course',
        owner_signature: 'https://atp-resources.s3.eu-central-1.amazonaws.com/lab-signature/G1llf9k4oTDZ3fCoIEqUu1m4c5VHme0C.png',
    },
    courses: { id: 1, type: COURSE_TYPE.EXAM, title: 'Test' },
},
{
    uuid: 'caf8aac4-1db4-4c33-ae8b-e9ec3dcf3055',
    course_id: 2,
    type: 'theory',
    image: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/certificates/certificate_of_Henry_Tovmasyan_ea4650dc-9e12-4dde-93ec-61fcbb56a27c.png',
    badge: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/certificates/badge_of_theory_9abed912-14a2-4243-86cd-8295f81ff4fc.png',
    lab_name: 'Secrets Management for your applications',
    difficulty: 'V1.0.0',
    platform: null,
    created_at: '2020-08-26 12:44:55',
    user_id: 3,
    updated_at: '2020-08-26 12:44:55',
    cert_info: {
        date: '26 Aug, 2020',
        name: 'Henry Tovmasyan',
        uuid: 'caf8aac4-1db4-4c33-ae8b-e9ec3dcf3055',
        labName: 'Secrets Management for your applications',
        signUrl: 'theory',
        user_id: 3,
        version: 'V1.0.0',
        lastname: 'Tovmasyan',
        course_id: 1,
        firstname: 'Henry',
        platformOwner: 'Dominik de Smit, CEO DevSecOps Academy',
        certificateName: 'in appreciation of successful completion of the theory course',
        owner_signature: 'https://atp-resources.s3.eu-central-1.amazonaws.com/lab-signature/G1llf9k4oTDZ3fCoIEqUu1m4c5VHme0C.png',
    },
    courses: { id: 2, type: COURSE_TYPE.INTRODUCTION, title: 'Test 2' },
},
];

const completion_certificates = [{
    uuid: 'caf8aac4-1db4-4c33-ae8b-e9ec3dcf3055',
    course_id: 3,
    type: 'completion',
    image: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/certificates/certificate_of_Henry_Tovmasyan_ea4650dc-9e12-4dde-93ec-61fcbb56a27c.png',
    badge: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/certificates/badge_of_theory_9abed912-14a2-4243-86cd-8295f81ff4fc.png',
    lab_name: 'Secrets Management for your applications',
    difficulty: 'V1.0.0',
    platform: null,
    created_at: '2020-08-26 12:44:55',
    user_id: 3,
    updated_at: '2020-08-26 12:44:55',
    cert_info: {
        date: '26 Aug, 2020',
        name: 'Henry Tovmasyan',
        uuid: 'caf8aac4-1db4-4c33-ae8b-e9ec3dcf3055',
        labName: 'Secrets Management for your applications',
        signUrl: 'theory',
        user_id: 3,
        version: 'V1.0.0',
        lastname: 'Tovmasyan',
        course_id: 1,
        firstname: 'Henry',
        platformOwner: 'Dominik de Smit, CEO DevSecOps Academy',
        certificateName: 'in appreciation of successful completion of the theory course',
        owner_signature: 'https://atp-resources.s3.eu-central-1.amazonaws.com/lab-signature/G1llf9k4oTDZ3fCoIEqUu1m4c5VHme0C.png',
    },
    courses: { id: 1, type: COURSE_TYPE.EXAM, title: 'Test' },
},
];

const certificates = theory_certificates.concat(completion_certificates)
    .filter(item => item.courses.type !== COURSE_TYPE.INTRODUCTION);

const props = {
    loading: false,
    theory_certificates,
    completion_certificates,
    children: [<Component><CertificatesTab certificates={certificates} /></Component>],

};
const props2 = {
    loading: true,
    theory_certificates: [],
    completion_certificates: [],

};
const props3 = {
    loading: false,
    theory_certificates,
    completion_certificates,
    children: [<Component><CertificatesTab certificates={theory_certificates} /></Component>],

};
describe('CertificatesFilter', () => {
    let component;

    beforeEach(() => {
        component = shallow(<CertificatesFilter {...props} />);
    });

    it('Should render CertificatesFilter successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should render Empty component if there are no certificates', () => {
        const empty = component.find('Empty');
        expect(empty.exists()).toBeTruthy();
        expect(empty.props().description).toBe('No certificates yet...');
    });

    it('Should render Loading component if it is loading', () => {
        const component2 = shallow(<CertificatesFilter {...props2} />);
        const loading = component2.find('Loading');
        expect(loading.exists()).toBeTruthy();
    });

    it('Should render total number of certificates successfully', () => {
        component.setState({ certificates });
        const totalNumber = component.find('.certificates-filter').at(0);
        const { children } = totalNumber.props();
        expect(children[0].props.children[2]).toBe(certificates.filter(item => item.image).length);
    });

    it('Should render Search successfully', () => {
        const search = component.find('Search');
        expect(search.exists()).toBeTruthy();
        expect(search.props().placeholder).toBe('Search Courses');
    });

    it('Should render Select successfully', () => {
        const select = component.find('Select');
        expect(select.props().defaultValue).toBe('all');
        expect(component.state().type).toBe('all');
        select.simulate('change', 'professional');
        expect(component.state().type).toBe('professional');
        select.simulate('change', 'theory');
        expect(component.state().type).toBe('theory');
        select.simulate('change', 'practitioner');
        expect(component.state().type).toBe('practitioner');
        select.simulate('change', 'all');
        expect(component.state().type).toBe('all');
    });

    it('Should render certificates', () => {
        component.setState({ certificates });
        const select = component.find('CertificatesTab');
        expect(select.props().certificates).toBe(certificates);
    });

    it('Should render theory certificates', () => {
        const component3 = shallow(<CertificatesFilter {...props3} />);
        component3.setState({ certificates: theory_certificates });
        const select = component3.find('CertificatesTab');
        expect(select.props().certificates).toBe(theory_certificates);
    });
});
