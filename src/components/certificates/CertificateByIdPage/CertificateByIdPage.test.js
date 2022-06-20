import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import mockedGA from 'react-ga';
import { CertificateByIdPage } from './CertificateByIdPage';
import { ACTIONS, CATEGORIES } from '../../../util/GAEventConstants';

jest.mock('react-ga', () => ({
    event: jest.fn(),
}));

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
        badge: 'https://software-academy.training/wp-content/uploads/2018/03/certificate_demo.jpg',
        created_at: '2021-05-12 10:00:05',
        difficulty: 'difficulty',
        lab_name: 'test Lab',
        type: 'completion',
        updated_at: '2021-05-12 10:00:05',
        user_id: 2,
        uuid: '123456',

    },
    match: { params: { id: 10 } },
    getUserCertificateById: jest.fn(() => Promise.resolve(true)),
    downloadCertificate: jest.fn(() => Promise.resolve(true)),
    notifyViaSlack: jest.fn(),

};

describe('CertificateByIdPage', () => {
    let component;

    beforeEach(() => {
        component = mount(<MemoryRouter><CertificateByIdPage {...props} /></MemoryRouter>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should render CertificateDetails component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should call `getUserCertificateById` in componentDidMount', () => {
        const wrapper = shallow(<CertificateByIdPage {...props} />, { disableLifecycleMethods: true });
        const instance = wrapper.instance();
        const compDidMountSpy = jest.spyOn(instance, 'componentDidMount');
        instance.componentDidMount();

        expect(compDidMountSpy).toHaveBeenCalled();
        expect(props.getUserCertificateById).toHaveBeenCalled();
    });

    it('Should render only badge images when there is not certificate image successfully', () => {
        const certificateImageContainer = component.find('.certificate-image-body');

        expect(certificateImageContainer).toHaveLength(1);
    });

    it('Should render certificate and badge images together successfully', () => {
        const testProps = {
            ...props,
            certificateById: {
                ...props.certificateById,
                image: 'test_image',
            },
        };

        const component = mount(<MemoryRouter><CertificateByIdPage {...testProps} /></MemoryRouter>);
        const certificateImageContainer = component.find('.certificate-image-body');

        expect(certificateImageContainer).toHaveLength(2);
    });

    it('Should call `downloadCertificate` and `notifyViaSlack` when click on download button', async () => {
        // Create a test blob for the FileReader:
        const testBlob = new Blob(['test'], { type: 'text/plain' });

        // Setup some Props
        const testProps = {
            ...props,
            downloadCertificate: jest.fn().mockResolvedValue(testBlob),
            notifyViaSlack: jest.fn(),
        };

        // Create an instance
        const instance = shallow(<CertificateByIdPage {...testProps} />).instance();

        // Call the function:
        await instance.downloadCertificate('notAnEvent', props.certificateById.badge, props.certificateById);

        // Make sure a `downloadCertificate` was called:
        expect(testProps.downloadCertificate).toHaveBeenCalledWith(props.certificateById.badge);
        expect(testProps.downloadCertificate).toHaveBeenCalledTimes(1);

        // Make sure a notification was made:
        expect(testProps.notifyViaSlack).toHaveBeenCalledWith('download', props.certificateById);
        expect(testProps.notifyViaSlack).toHaveBeenCalledTimes(1);
    });

    it('Should call `notifyViaSlack` when click on `LinkedIn` Share icon ', async () => {
        const instance = shallow(<CertificateByIdPage {...props} />).instance();
        await instance.notifyViaSlack('linkedin', props.certificateById);

        // Make sure a notification was made:
        expect(props.notifyViaSlack).toHaveBeenCalledWith('linkedin', props.certificateById.uuid);
        expect(props.notifyViaSlack).toHaveBeenCalledTimes(1);
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: CATEGORIES.SHARE_CERTIFICATE_LINKEDIN,
            action: ACTIONS.USER_CLICKED_SHARE_CERTIFICATE_LINKEDIN_AFTER_FINISHING_COURSE(),
            label: `${props.certificateById.courses.id} : ${props.certificateById.courses.title}`,
        });
    });
});
