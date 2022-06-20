import React from 'react';
import { shallow } from 'enzyme';
import { message, Modal } from 'antd';
import { FellowEditProposal } from './FellowEditProposal';

jest.mock('antd', () => {
    const antd = jest.requireActual('antd');
    const messageANTD = {
        ...antd.message,
        loading: jest.fn().mockReturnValue(() => {}),
        success: jest.fn(),
        warning: jest.fn(),
        error: jest.fn(),
    };
    return {
        ...antd,
        message: messageANTD,
    };
});

const courseProposal = {
    id: 1,
    user_id: 8,
    course_id: 4,
    status: 'SUBMITTED',
    suitability_explanation: 'suitability_explanation',
    terms_accepted_on: '2021-11-19 16:47:05',
};

describe('<FellowEditProposal />', () => {
    const props = {
        match: {
            params: {
                id: 1,
            },
        },
        event: { preventDefault: jest.fn() },
        uploadProposalFile: jest.fn(() => Promise.resolve(true)),
        getProposalById: jest.fn(() => Promise.resolve({ data: courseProposal })),
        saveCourseProposal: jest.fn(() => Promise.resolve(true)),
        handleSubmit: jest.fn(() => Promise.resolve(true)),
        submitProposal: jest.fn(() => Promise.resolve({ data: { message: 'success' } })),
        form: {
            validateFields: jest.fn(),
            getFieldDecorator: jest.fn(() => c => c),
        },
    };

    let component;
    beforeEach(() => {
        component = shallow(<FellowEditProposal {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should render component's title successfully", async () => {
        const title = component.find('.edit-proposal-title');
        expect(title.props().children).toEqual('Edit Course Proposal');
    });

    it('should have a text area', () => {
        expect(component.find('TextArea')).toHaveLength(1);
    });

    it('suitabilityExplanation should be set by textarea', async () => {
        const textArea = component.find('.suitability-input');

        textArea.simulate('change', { target: { name: 'suitability_explanation', value: 'test value' } });

        expect(component.instance().state.suitability_explanation).toEqual('test value');
    });

    it('uploadVideoFile() calls props.uploadProposalFile', async () => {
        const videoInput = component.find('.btn-upload-video');
        const spy = jest.spyOn(component.instance().props, 'uploadProposalFile');

        // If possible improve test by simulating file input
        videoInput.props().beforeUpload();

        expect(spy).toHaveBeenCalled();
    });

    it('uploadZipFile() calls props.uploadProposalFile', async () => {
        const zipInput = component.find('.btn-upload-zip');
        const spy = jest.spyOn(component.instance().props, 'uploadProposalFile');

        // If possible improve test by simulating file input
        zipInput.props().beforeUpload();

        expect(spy).toHaveBeenCalled();
    });

    it('handleProposalSave() calls saveCourseProposal', () => {
        component.setState({
            suitability_explanation: 'Some test stuff',
        });
        const spy = jest.spyOn(component.instance().props, 'saveCourseProposal');

        const saveButton = component.find('.btn-save-proposal');

        saveButton.simulate('click');

        const { match: { params: { id } } } = props;
        const data = {
            suitability_explanation: 'Some test stuff',
        };

        expect(message.loading).toHaveBeenCalledWith('Saving proposal...', 0);
        expect(spy).toHaveBeenCalledWith(id, data);
    });

    it('Submit button disabled state', async () => {
        component.setState({
            isSubmitted: true,
        });
        const submitButton = component.find('.btn-submit-proposal');

        expect(submitButton.props().disabled).toEqual(true);
    });

    it('Submit button active state', () => {
        component.setState({
            termsAccepted: true,
            isSubmitted: false,
        });

        component.instance();
        const submitButton = component.find('.btn-submit-proposal');
        expect(submitButton.props().disabled).toEqual(false);
    });

    it('Checkbox updates state with termsAccepted', () => {
        const checkBox = component.find('.terms-accept-checkbox');

        expect(component.instance().state.termsAccepted).toEqual(false);

        checkBox.simulate('change');

        expect(component.instance().state.termsAccepted).toEqual(true);
    });

    it('showTermsConditionsModal() opens terms and conditions modal', async () => {
        const conditionsLink = component.find('.terms_conditions');

        conditionsLink.simulate('click', { target: {}, stopPropagation: () => {} });

        expect(<Modal title='Fellow Terms and Conditions' />).toBeTruthy();
    });

    it('closeTermsConditionsModal() closes terms and conditions modal', async () => {
        component.setState({
            showTermsConditionsModal: true,
        });

        component.instance().closeTermsConditionsModal();

        expect(component.instance().state.showTermsConditionsModal).toEqual(false);
    });

    it('handleSubmit() calls submitCourseProposal', async () => {
        component.setState({
            suitability_explanation: 'test',
        });
        const spy = jest.spyOn(component.instance(), 'submitCourseProposal');
        const submitButton = component.find('.btn-submit-proposal');
        await submitButton.simulate('click', props.event);

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('submitCourseProposal() calls saveCourseProposal() before submitting', async () => {
        const instance = component.instance();
        const saveSpy = jest.spyOn(component.instance(), 'saveCourseProposal');

        await instance.submitCourseProposal();

        expect(saveSpy).toHaveBeenCalledTimes(1);
        expect(instance.props.submitProposal).toHaveBeenCalledTimes(1);
    });

    it('calls getProposalById when the component mounts and proposal status is equal \'SUBMITTED\' ', async () => {
        const { match: { params: { id } } } = props;
        const instance = component.instance();

        await instance.componentDidMount();

        expect(props.getProposalById).toBeCalledWith(id);
        expect(component.state('isSubmitted')).toBeTruthy();
    });
});
