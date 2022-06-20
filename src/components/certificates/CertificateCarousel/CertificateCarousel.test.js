import React from 'react';
import { shallow } from 'enzyme';
import CertificateCarousel from './CertificateCarousel';
import { COURSE_TYPE } from '../../../constants';

const theoryCertificates = [{
    uuid: 'caf8aac4-1db4-4c33-ae8b-e9ec3dcf3055',
    course_id: 1,
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

const completionCertificates = [{
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

const certificates = theoryCertificates.concat(completionCertificates)
    .filter(item => item.courses.type !== COURSE_TYPE.INTRODUCTION);

const props = {
    showEmailModal: jest.fn(() => Promise.resolve(true)),
    type: 'classic',
    downloadCertificate: jest.fn(() => Promise.resolve(true)),
    notifyViaSlack: jest.fn(() => Promise.resolve(true)),
    certificates,

};
const props1 = { ...props };
props1.type = 'badge';

describe('CertificateCarousel', () => {
    let component;
    let component1;

    beforeEach(() => {
        component = shallow(<CertificateCarousel {...props} />);
        component1 = shallow(<CertificateCarousel {...props1} />);
    });

    it('Should render CertificateCarousels of both type badge and classical successfully', () => {
        expect(component.exists()).toBeTruthy();
        expect(component1.exists()).toBeTruthy();
    });
});
