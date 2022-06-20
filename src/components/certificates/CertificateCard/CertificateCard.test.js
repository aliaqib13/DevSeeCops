import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import mockedGA from 'react-ga';
import { CertificateCard } from './CertificateCard';

jest.mock('react-ga', () => ({
    event: jest.fn(),
}));

describe('CertificateCard', () => {
    let component;
    const props = {
        type: 'classic',
        certificate: {
            id: 1,
            badge: 'badge test',
            image: 'image test',
            lab_name: 'Container Security in CI/CD',
            type: 'theory',
            courses: {
                id: 1,
                title: 'course title',
            },
            cert_info: {
                certificateName: 'in appreciation of successful completion of the theory course',
                date: '26 Aug, 2020',
            },
            platform: 'test',
            difficulty: 'test',
            created_at: '2021-03-08 12:13:45',
            uuid: '4966f5d0-2d68-428b-bd5c-f5749612f31d',
        },
        downloadCertificate: jest.fn(() => Promise.resolve(true)),
        notifyViaSlack: jest.fn(),
        showEmailModal: jest.fn(),
    };

    beforeEach(() => {
        component = shallow(<CertificateCard {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render CertificateCard component successfully', () => {
        expect(component).toHaveLength(1);
    });
    it('should render card successfully', () => {
        const certificateCard = component.find('.certificate-card');
        expect(certificateCard).toHaveLength(1);
    });
    it('should render image if the type is `classic` successfully', () => {
        const certificateImage = component.find('.certificate-img');
        expect(certificateImage.props().src).toBe(props.certificate.image);
    });
    it('should render badge if the type is `badge`  successfully', () => {
        component.setProps({ type: 'badge' });
        const certificateBadge = component.find('.certificate-img');
        expect(certificateBadge.props().src).toBe(props.certificate.badge);
    });
    it('should render Title  successfully', () => {
        const certificateTitle = component.find('.certificate-title');
        expect(certificateTitle.text()).toBe(props.certificate.lab_name);
    });
    it('should render Platform  successfully', () => {
        const certificatePlatform = component.find('.certificate-text').at(0);
        expect(certificatePlatform.text()).toBe(props.certificate.platform);
    });
    it('should render Difficulty  successfully', () => {
        const certificateDifficulty = component.find('.certificate-text').at(1);
        expect(certificateDifficulty.text()).toBe(props.certificate.difficulty);
    });
    it('should render date of certificate creation  successfully', () => {
        const certificateDate = component.find('.certificate-date');
        expect(certificateDate.text()).toBe(moment(props.certificate.created_at).format('DD MMM YYYY'));
    });
    it("should render card's buttons successfully", () => {
        const buttonsDiv = component.find('.certificate-buttons');
        const downloadButton = buttonsDiv.find('.certificate-card-button').at(0);
        const shareButton = buttonsDiv.find('.certificate-card-button').at(1);

        expect(downloadButton.props().children).toBe('Download');
        expect(shareButton.props().children).toBe('Share');
    });
    it('should render call `downloadCertificate` when click on `Download` button', () => {
        const buttonsDiv = component.find('.certificate-buttons');
        const downloadButton = buttonsDiv.find('.certificate-card-button').at(0);

        const instance = component.instance();
        jest.spyOn(instance, 'downloadCertificate');
        downloadButton.simulate('click');

        expect(instance.downloadCertificate).toHaveBeenCalled();
        expect(instance.downloadCertificate).toHaveBeenCalledTimes(1);
    });
    it('should render `certificate-share-container` successfully', () => {
        const shareDiv = component.find('.certificate-share-container');

        expect(shareDiv).toHaveLength(1);
    });
    it('should change `sharingClicked` state when `certificate-share-container` clicked', () => {
        const shareDiv = component.find('.certificate-share-container');

        expect(component.instance().state.sharingClicked).toEqual(false);

        shareDiv.simulate('click');

        expect(component.instance().state.sharingClicked).toEqual(true);
    });
    it('should render `LinkedIn` Share icon ', () => {
        const shareDiv = component.find('.certificate-share-container');
        const linkedInShare = shareDiv.find('.certificate-share-icons-linkedin');
        expect(linkedInShare).toHaveLength(1);

        // When certificate type is classic
        expect(linkedInShare.props().children.props.url).toBe(props.certificate.image);

        // if certificate type is badge
        component.setProps({ type: 'badge' });
        const badgeLinkedInShare = component.find('.certificate-share-icons-linkedin');
        expect(badgeLinkedInShare.props().children.props.url).toBe(props.certificate.badge);

        // Should call `notifyViaSlack` method and ReactGA
        const instance = component.instance();
        jest.spyOn(instance, 'notifyViaSlack');
        linkedInShare.props().children.props.onClick();

        expect(instance.notifyViaSlack).toHaveBeenCalled();
        expect(instance.notifyViaSlack).toHaveBeenCalledTimes(1);
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'share_certificate_linkedin',
            action: 'User clicked "share certificate" on linkedin after finishing a course',
            label: `${props.certificate.courses.id} : ${props.certificate.courses.title}`,
        });
    });
    it('should render `Email` Share icon ', () => {
        const shareDiv = component.find('.certificate-share-container');
        const emailShare = shareDiv.find('.certificate-share-icons-mail');
        expect(emailShare).toHaveLength(1);

        expect(emailShare.props().children.props.type).toBe('mail');

        // When certificate type is classic
        expect(emailShare.props().children.props.className).toBe('classic');

        // if certificate type is badge
        component.setProps({ type: 'badge' });
        const badgeEmailShare = component.find('.certificate-share-icons-mail');
        expect(badgeEmailShare.props().children.props.className).toBe('badge');

        // When Icon is clicked
        emailShare.props().onClick();
        expect(props.showEmailModal).toHaveBeenCalled();
        expect(props.showEmailModal).toHaveBeenCalledTimes(1);
    });

    describe('.downloadCertificate()', () => {
        it('Notifies via slack after certificate downloaded', async () => {
            // Create a test blob for the FileReader:
            const testBlob = new Blob(['test'], { type: 'text/plain' });

            // Setup some Props
            const testProps = {
                ...props,
                downloadCertificate: jest.fn().mockResolvedValue(testBlob),
                notifyViaSlack: jest.fn(),
            };
            // Create an instance
            const instance = shallow(<CertificateCard {...testProps} />).instance();
            // Call the function:
            await instance.downloadCertificate('notAnEvent', props.certificate);

            // Make sure a notifcation was made:
            expect(testProps.notifyViaSlack).toHaveBeenCalledWith('download', props.certificate.uuid);
        });
    });

    describe('.notifyViaSlack()', () => {
        it('passes the arguments through to props.notifyViaSlack', () => {
            const testProps = {
                ...props,
                notifyViaSlack: jest.fn(),
            };
            const instance = shallow(<CertificateCard {...testProps} />).instance();
            const args = [props.certificate.type, props.certificate];

            // Call the function:
            instance.notifyViaSlack(...args);

            // Check it was called as expected:
            expect(testProps.notifyViaSlack).toHaveBeenCalledWith(props.certificate.type, props.certificate.uuid);
        });
    });
});
