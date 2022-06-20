import React from 'react';
import { mount, shallow } from 'enzyme';
// import { MemoryRouter } from 'react-router-dom';
import moment from 'moment';
import { ImageShareDownload } from './ImageShareDownload';

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
    certificateImageBadge: 'test_badge_or_image',
    downloadCertificate: jest.fn(() => Promise.resolve(true)),
    notifyViaSlack: jest.fn(),
};

describe('ImageShareDownload', () => {
    let component;

    beforeEach(() => {
        component = mount(<ImageShareDownload {...props} />);
    });

    it('Should render CertificateDetails component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should render badge or image of certificate successfully ', () => {
        const certificateImage = component.find('.certificate-by-id-img');

        expect(certificateImage.props().src).toBe(props.certificateImageBadge);
    });

    it('Should render share icons container successfully ', () => {
        const certificateImage = component.find('.certificate-share-body');

        expect(certificateImage).toHaveLength(1);
    });

    it('Should render LinkedIn share icon successfully ', () => {
        // Arrange
        const linkedInShareIcon = component.find('.certificate-share-body').find('.react-share__ShareButton');
        const toolTip = linkedInShareIcon.find('Tooltip');
        const icon = linkedInShareIcon.find('Icon');

        // Assert
        expect(toolTip.at(0).props().title).toBe('Share on LinkedIn');
        expect(icon.props().type).toBe('linkedin');
        expect(icon.props().className).toContain('active'); // Expect to be active
    });

    it('Should render facebook share icon successfully ', () => {
        // Arrange
        const facebookToolTip = component.find('.certificate-share-body').find('Tooltip').at(2);
        const facebookIcon = facebookToolTip.find('Icon');

        // Assert
        expect(facebookToolTip.at(0).props().title).toBe('Share on Facebook');
        expect(facebookIcon.props().type).toBe('facebook');
        expect(facebookIcon.props().className).toContain('non-active'); // Expect to be not active, Will be active on ATP-2113
    });

    it('Should render twitter share icon successfully ', () => {
        // Arrange
        const facebookToolTip = component.find('.certificate-share-body').find('Tooltip').at(4);
        const facebookIcon = facebookToolTip.find('Icon');

        // Assert
        expect(facebookToolTip.at(0).props().title).toBe('Share on Twitter');
        expect(facebookIcon.props().type).toBe('twitter');
        expect(facebookIcon.props().className).toContain('non-active'); // Expect to be not active, Will be active on ATP-2113
    });

    it('Should render Instagram share icon successfully ', () => {
        // Arrange
        const facebookToolTip = component.find('.certificate-share-body').find('Tooltip').at(6);
        const facebookIcon = facebookToolTip.find('Icon');

        // Assert
        expect(facebookToolTip.at(0).props().title).toBe('Share on Instagram');
        expect(facebookIcon.props().type).toBe('instagram');
        expect(facebookIcon.props().className).toContain('non-active'); // Expect to be not active, Will be active on ATP-2113
    });

    it('Should render Download icon successfully ', () => {
        // Arrange
        const facebookToolTip = component.find('.certificate-share-body').find('Tooltip').at(8);
        const facebookIcon = facebookToolTip.find('Icon');

        // Assert
        expect(facebookToolTip.at(0).props().title).toBe('Download your certificate');
        expect(facebookIcon.props().type).toBe('download');
        expect(facebookIcon.props().className).toContain('active'); // Expect to be active
    });
});
