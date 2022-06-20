import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import moment from 'moment';
import { CertificateDetails } from './CertificateDetails';

const props = {
    certificateById: {
        id: 10,
        cert_info: {
            date: '26 Aug, 2020',
            certificateName: 'in Appreciation',
        },
        course_id: 2,
        courses: {
            id: 2,
            title: 'test',
        },
        badge: 'test_badge',
        created_at: '2021-05-12 10:00:05',
        difficulty: 'difficulty',
        image: 'test_image',
        lab_name: 'test Lab',
        type: 'completion',
        updated_at: '2021-05-12 10:00:05',
        user_id: 2,
        uuid: '123456',
    },
};

describe('CertificateDetails', () => {
    let component;

    beforeEach(() => {
        component = mount(<MemoryRouter><CertificateDetails {...props} /></MemoryRouter>);
    });

    it('Should render CertificateDetails component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should render the certificate details with their headers title successfully', () => {
        const certTitles = component.find('h2');
        expect(certTitles.at(0).text()).toBe('Course Name');
        expect(certTitles.at(1).text()).toBe('Course Level');
        expect(certTitles.at(2).text()).toBe('Date of Awarding');
        expect(certTitles.at(3).text()).toBe('Credential ID');

        const certificateData = component.find('p');
        expect(certificateData.at(0).text()).toBe(props.certificateById.courses.title);
        expect(certificateData.at(1).text()).toBe(props.certificateById.difficulty);
        expect(certificateData.at(2).text()).toBe(moment(props.certificateById.created_at).format('DD MMM YYYY'));

        const certificateCredentialId = component.find('.credential-id');
        expect(certificateCredentialId.text()).toBe(props.certificateById.uuid);
    });
});
