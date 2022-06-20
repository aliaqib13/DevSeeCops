import React, { Component } from 'react';
import {
    Anchor, Button, Divider, Typography, Col, Row, Modal, Input, message,
} from 'antd';

import { NavLink, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import Loading from '../../../../Loading/Loading';
import {
    getCourseProposalById, sendRejectCourseProposalEmailToFellow,
    listCourseProposalFiles, downloadCourseProposalFile, proposalAcceptance,
} from '../../../../../store/actions/admin/courseAdministration';

import './proposalReview.scss';

const { Title } = Typography;
const { Link } = Anchor;
const { TextArea } = Input;

const confirmModal = Modal.confirm;

class ProposalReview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rejectReasonModal: false,
            reasonRejectCourseProposal: '',
            sendRejectionEmail: false,
            isApproved: false,
        };
    }

    componentDidMount() {
        const {
            match: { params: { id } }, getCourseProposalById, listCourseProposalFiles,
        } = this.props;

        getCourseProposalById(id);

        listCourseProposalFiles(id).then(res => {
            if (res !== true) {
                message.warning('There is no files uploaded from fellow');
            }
        });
    }

    courseProposalAcceptance = async () => {
        const { match: { params: id }, proposalAcceptance } = this.props;
        return proposalAcceptance(id)
            .then(res => {
                if (res.data.courseProposal.status === 'APPROVED') {
                    message.success('Course proposal is approved');
                    this.setState({ isApproved: true });
                }
            })
            .catch(e => console.log(e));
    }

    confirmCourseProposal = () => {
        confirmModal({
            title: 'Are you sure you want to Approve this course proposal?',
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk: () => {
                this.courseProposalAcceptance();
            },
        });
    }

    toggleEmailModal = () => {
        const { rejectReasonModal } = this.state;

        this.setState({
            rejectReasonModal: !rejectReasonModal,
            reasonRejectCourseProposal: 'The rejection reason is that ...',
        });
    }

    closeModal = () => {
        this.setState({
            reasonRejectCourseProposal: '',
            rejectReasonModal: false,
        });
    }

    changeEmailText = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    confirmRejectCourseProposal = () => {
        const {
            reasonRejectCourseProposal,
            sendRejectionEmail,
        } = this.state;

        const {
            history, courseProposalById, sendRejectCourseProposalEmailToFellow,
        } = this.props;

        if (!reasonRejectCourseProposal) {
            return message.error('Please insert data');
        }
        confirmModal({
            title: 'Are you sure you want to reject this course proposal?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                const data = {
                    rejectEmail: !sendRejectionEmail,
                    rejectEmailContent: reasonRejectCourseProposal,

                };

                sendRejectCourseProposalEmailToFellow(courseProposalById.id, data);

                this.closeModal();
                message.success((`course proposal No.${courseProposalById.id} is rejected`));
                history.push('/platform/admin/course-administration');
            },
        });
    }

    handleClick = (e, link) => {
        e.preventDefault();

        const { downloadCourseProposalFile, courseProposalById } = this.props;
        const loader = message.loading('Downloading...', 0);
        return downloadCourseProposalFile(courseProposalById.id, link.href).then(res => {
            const reader = new FileReader();
            reader.readAsDataURL(res);
            reader.onloadend = function () {
                const base64data = reader.result;
                const a = document.createElement('a');
                a.href = base64data.toString();
                a.download = link.title === 'videoFile' ? `video_file_proposal_${courseProposalById.id}.mp4` : `zip_file_proposal_${courseProposalById.id}.zip`;
                a.click();
                loader();
            };
        });
    };

    render() {
        const {
            courseProposalById, courseProposalByIdFiles,
        } = this.props;

        const {
            rejectReasonModal, reasonRejectCourseProposal, isApproved,
        } = this.state;

        if (Object.keys(courseProposalById).length === 0) {
            return <Loading />;
        }

        return (
            <>

                <>
                    <Title>
                        Course Proposal Review No.
                        {courseProposalById.id}
                    </Title>
                    <Divider orientation="left">Course Title :</Divider>
                    <Row>
                        <Col span={12} offset={6}>
                            <NavLink style={{ color: 'inherit' }} to={`/course-information/${courseProposalById.course_id}`}>{courseProposalById.course.title}</NavLink>
                        </Col>
                    </Row>
                    <Divider orientation="left">Fellow Name :</Divider>
                    <Row>
                        <Col span={12} offset={6}>
                            <NavLink style={{ color: 'inherit' }} to={`/platform/admin/user-statistics/${courseProposalById.user_id}`}>
                                {courseProposalById.user.firstname}

                                {courseProposalById.user.lastname}
                            </NavLink>
                        </Col>
                    </Row>
                    <Divider orientation="left">Suitability Explanation :</Divider>
                    <Row>
                        <Col span={12} offset={6}>
                            {courseProposalById.suitability_explanation}
                        </Col>
                    </Row>
                    <Divider orientation="left">Proof of Concept files :</Divider>
                    <Row>
                        <Col span={12} offset={6}>

                            <Anchor affix={false} onClick={(e, link) => this.handleClick(e, link)}>
                                {courseProposalByIdFiles.map(file => <Link key={file} href={file} title={file} />)}
                            </Anchor>

                        </Col>
                    </Row>

                    <Divider dashed />
                    <Divider>
                        <Button type="primary" className="approve-btn" shape="round" onClick={() => this.confirmCourseProposal()} disabled={!!isApproved}>
                            Approve
                        </Button>
                        <Button type="danger" className="reject-btn" shape="round" onClick={() => this.toggleEmailModal()} disabled={!!isApproved}>
                            Reject
                        </Button>
                    </Divider>
                    <Divider dashed />

                </>
                {
                    (rejectReasonModal)
                    && (
                        <Modal
                            visible={rejectReasonModal}
                            title={`Send rejection reason to ${courseProposalById.user.firstname} ${courseProposalById.user.lastname} (${courseProposalById.user.email})`}
                            onOk={this.handleOk}
                            onCancel={this.closeModal}
                            width={700}
                            footer={[
                                <Button key="back" onClick={this.closeModal}>
                                    Cancel
                                </Button>,
                                <Button key="submit" type="danger" onClick={this.confirmRejectCourseProposal}>
                                    Send
                                </Button>,
                            ]}
                        >
                            <TextArea autoSize={{ minRows: 10, maxRows: 200 }} name="reasonRejectCourseProposal" value={reasonRejectCourseProposal} onChange={this.changeEmailText} />
                        </Modal>
                    )
                }
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        courseProposalById: state.adminCourseAdministration.courseProposalById,
        courseProposalByIdFiles: state.adminCourseAdministration.courseProposalByIdFiles,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCourseProposalById: id => dispatch(getCourseProposalById(id)),
        sendRejectCourseProposalEmailToFellow: (id, data) => dispatch(sendRejectCourseProposalEmailToFellow(id, data)),
        listCourseProposalFiles: proposalId => dispatch(listCourseProposalFiles(proposalId)),
        downloadCourseProposalFile: (proposalId, fileName) => dispatch(downloadCourseProposalFile(proposalId, fileName)),
        proposalAcceptance: id => dispatch(proposalAcceptance(id)),
    };
}

export { ProposalReview };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProposalReview));
