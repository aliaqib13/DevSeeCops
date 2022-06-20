import React from 'react';
import { shallow } from 'enzyme';
import { CheckCertificate } from './check-certificate';

describe('Check Certificate Public', () => {
    let component;
    const props = {
        certificate: {
            data: {
                id: 1,
                image: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/certificates/certificate_of_Henry_Tovmasyan_63189b99-1fe6-4d67-b299-f358723540fe.png',
                lab_name: 'Container Security in CI/CD',
                type: 'theory',
                cert_info: {
                    certificateName: 'in appreciation of successful completion of the theory course',
                    date: '26 Aug, 2020',
                },
            },
        },
        getCertificateById: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = shallow(<CheckCertificate {...props} />);
    });

    it('should render certificate image', () => {
        const certificateProps = {
            certificate: {
                data: {
                    id: 1,
                    image: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/certificates/certificate_of_Henry_Tovmasyan_63189b99-1fe6-4d67-b299-f358723540fe.png',
                    badge: 'badgeImage.png',
                    lab_name: 'Container Security in CI/CD',
                    type: 'theory',
                    cert_info: {
                        certificateName: 'in appreciation of successful completion of the theory course',
                        date: '26 Aug, 2020',
                    },
                },
            },
            getCertificateById: jest.fn(() => Promise.resolve(true)),
        };
        component = shallow(<CheckCertificate {...certificateProps} />);
        const cardDiv = component.find('Card');
        expect(cardDiv.props().cover.props.src).toBe(certificateProps.certificate.data.image);
    });

    it("should render badge image when there is no certificate's image set", () => {
        const badgeProps = {
            certificate: {
                data: {
                    id: 1,
                    image: '',
                    badge: 'https://badgeImage.png',
                    lab_name: 'Container Security in CI/CD',
                    type: 'theory',
                    cert_info: {
                        certificateName: 'in appreciation of successful completion of the theory course',
                        date: '26 Aug, 2020',
                    },
                },
            },
            getCertificateById: jest.fn(() => Promise.resolve(true)),
        };
        component = shallow(<CheckCertificate {...badgeProps} />);
        const cardDiv = component.find('Card');
        expect(cardDiv.props().cover.props.src).toBe(badgeProps.certificate.data.badge);
    });

    it('should render check certificate container successfully', () => {
        expect(component.exists()).toBeTruthy();
        expect(component).toHaveLength(1);
        const checkCertificatePara = component.find('Title').at(0);
        expect(checkCertificatePara).toHaveLength(1);
        expect(checkCertificatePara.props().children).toEqual('Check Certificate ');
    });

    it('should render search input successfully', () => {
        expect(component.exists('Search')).toEqual(true);
    });

    it('should render check certificate container select dropdown successfully', () => {
        expect(component.exists('.check-certificate-container')).toEqual(true);
    });
});
