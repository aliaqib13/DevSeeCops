import React, { Component } from 'react';
import {
    Typography, Input, Button, message, Upload, Icon, Form, Checkbox, Modal, Descriptions,
} from 'antd';

import './FellowEditProposal.scss';

const { Title } = Typography;

class FellowEditProposal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suitability_explanation: '',
            termsAccepted: false,
            showTermsConditionsModal: false,
            termsAcceptedOn: '',
            isSubmitted: false,
        };
    }

    componentDidMount() {
        const { getProposalById, match: { params: { id } } } = this.props;
        return getProposalById(id)
            .then(res => {
                this.setState({
                    suitability_explanation: res.data.suitability_explanation,
                    isSubmitted: res.data.status === 'SUBMITTED',
                });
            })
            .catch(e => console.log(e));
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    uploadVideoFile = file => {
        const { uploadProposalFile, match: { params: { id } } } = this.props;
        const data = new FormData();
        data.append('file', file);

        const loader = message.loading('Uploading...', 0);
        uploadProposalFile(id, 'videoFile', data)
            .then(res => {
                this.setState({
                    proposalVideo: res.data,
                });
            })
            .catch(e => console.log(e))
            .finally(() => {
                loader();
            });
        // Return false since we handle upload
        return false;
    }

    uploadZipFile = file => {
        const { uploadProposalFile, match: { params: { id } } } = this.props;
        const data = new FormData();
        data.append('file', file);

        const loader = message.loading('Uploading...', 0);
        uploadProposalFile(id, 'zipFile', data)
            .then(res => {
                this.setState({
                    proposalZip: res.data.message,
                });
            })
            .catch(e => console.log(e))
            .finally(() => {
                loader();
            });
        // Return false since we handle upload
        return false;
    }

    showTermsConditionsModal = e => {
        e.stopPropagation();
        this.setState({
            showTermsConditionsModal: true,
        });
    }

    closeTermsConditionsModal = () => {
        this.setState({
            showTermsConditionsModal: false,
        });
    }

    handleTermsConditions = () => {
        const { termsAccepted, showTermsConditionsModal } = this.state;
        this.setState({
            termsAccepted: !termsAccepted,
        });
        if (showTermsConditionsModal) {
            this.setState({
                showTermsConditionsModal: false,
            });
        }
    }

    saveCourseProposal = () => {
        const { saveCourseProposal, match: { params: { id } } } = this.props;
        const { suitability_explanation: suitabilityExplanation } = this.state;
        const data = {
            suitability_explanation: suitabilityExplanation,
        };
        const loader = message.loading('Saving proposal...', 0);
        return saveCourseProposal(id, data)
            .then(res => {
                this.setState({
                    suitability_explanation: res.suitability_explanation,
                });
                loader();
            })
            .catch(e => console.log(e));
    }

    submitCourseProposal = async () => {
        const { submitProposal, match: { params: { id } } } = this.props;
        const data = {
            id,
        };
        await this.saveCourseProposal();
        const resp = await submitProposal(data);
        if (resp.data.message === 'Submitted!') {
            this.setState({ isSubmitted: true });
        }
        message.success(resp.data.message);
    }

    handleProposalSave = () => {
        this.saveCourseProposal();
    }

    handleSubmit = e => {
        const { form: { validateFields } } = this.props;
        const { suitability_explanation: suitabilityExplanation } = this.state;
        e.preventDefault();
        validateFields(err => {
            if (!err) {
                console.info('Success');
            }
        });
        // Then set accepted timestamp
        if (suitabilityExplanation) {
            this.submitCourseProposal();
        } else {
            message.error('describe experience is required');
        }
    }

    render() {
        const { termsAccepted, showTermsConditionsModal, isSubmitted } = this.state;
        const { form: { getFieldDecorator } } = this.props;
        return (
            <>
                <Title className='edit-proposal-title'>Edit Course Proposal</Title>
                <div
                    name='course-proposal'
                    className='course-proposal-form'
                >
                    <Form.Item
                        className='suitability-group'
                        label='What experience do you have with the topic of the course?'
                        colon={false}
                    >
                        {getFieldDecorator('suitability_explanation', {
                            initialValue: this.state.suitability_explanation || '',
                            rules: [
                                {
                                    required: true,
                                    message: 'Please describe why you\'re a good fit to teach this course',
                                },
                            ],
                        })(
                            <Input.TextArea
                                rows={5}
                                onChange={this.handleInputChange}
                                name='suitability_explanation'
                                className='suitability-input'
                                required
                            />,
                        )}
                    </Form.Item>
                    <Descriptions.Item
                        className='upload-group'
                    >
                        Upload one zip file with code,
                        and one video file demonstrating why your suitable to teach this course.
                        <div className='upload-group-buttons'>
                            <Form.Item>
                                <Title level={4}>
                                    Video requirements:
                                </Title>
                                <ul className='upload-details-list'>
                                    <li>Personal introduction in the beginning</li>
                                    <li>HD-Quality</li>
                                    <li>Maximum length of 20 minutes</li>
                                    <li>Voice by the applicant</li>
                                    <li>Common file extension: MP4 / MOV</li>
                                </ul>
                                {getFieldDecorator('video_file', {
                                    rules: [
                                        {
                                            required: false,
                                            message: 'Please upload a video following the video requirements',
                                        },
                                    ],
                                })(
                                    <Upload
                                        className='btn-upload-video'
                                        accept='video/*'
                                        beforeUpload={this.uploadVideoFile}
                                        name='videoFile'
                                    >
                                        <Button>
                                            <Icon type='video-camera' />
                                            Upload video
                                        </Button>
                                    </Upload>,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Title level={4}>
                                    ZIP requirements:
                                </Title>
                                <ul className='upload-details-list'>
                                    <li>Any source code from the video demo</li>
                                    <li>We need to be able to reproduce the demo</li>
                                    <li>README.md outlining the steps to execute the Proof of Concept</li>
                                </ul>
                                {getFieldDecorator('zip_file', {
                                    rules: [
                                        {
                                            required: false,
                                            message: 'Please upload a zip file following the zip requirements',
                                        },
                                    ],
                                })(
                                    <Upload
                                        className='btn-upload-zip'
                                        accept='application/x-zip-compressed'
                                        beforeUpload={this.uploadZipFile}
                                        name='zipFile'
                                    >
                                        <Button>
                                            <Icon type='upload' />
                                            Upload zip file
                                        </Button>
                                    </Upload>,
                                )}
                            </Form.Item>
                        </div>
                    </Descriptions.Item>

                    <Form.Item>
                        <Checkbox
                            checked={termsAccepted}
                            onChange={this.handleTermsConditions}
                            name='termsAccepted'
                            className='terms-accept-checkbox'
                        >
                            I agree with the
                        </Checkbox>
                        <Button
                            type='link'
                            className='terms_conditions'
                            onClick={this.showTermsConditionsModal}
                        >
                            Terms & Conditions
                        </Button>
                    </Form.Item>
                    <Form.Item className='button-group'>
                        <Button
                            className='btn-save-proposal'
                            onClick={this.handleProposalSave}
                            disabled={isSubmitted ? true : null}
                        >
                            Save Proposal
                        </Button>
                        <Button
                            className='btn-submit-proposal'
                            type='primary'
                            onClick={this.handleSubmit}
                            disabled={isSubmitted || !termsAccepted}
                        >
                            Submit Proposal
                        </Button>
                    </Form.Item>
                </div>
                <Modal
                    title='Fellow Terms and Conditions'
                    visible={showTermsConditionsModal}
                    onOk={this.handleTermsConditions}
                    onCancel={this.closeTermsConditionsModal}
                    footer={[
                        <Button key='back' onClick={this.closeTermsConditionsModal}>
                            Cancel
                        </Button>,
                        <Button key='submit' type='primary' onClick={this.handleTermsConditions}>
                            Accept Terms & Conditions
                        </Button>,
                    ]}
                >
                    <p>Terms & Conditions Text</p>
                </Modal>
            </>
        );
    }
}

export { FellowEditProposal };
export default Form.create({})(FellowEditProposal);
