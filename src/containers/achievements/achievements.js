import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Typography, message } from 'antd';
import {
    sendCertificateToEmail, fetchUserCertificates,
    getLearningPath, createCertificateOfProgress,
    updateCertificateVisibility, deleteCertificateOfProgress,
} from '../../store/actions/certificate';
import { getPreferences } from '../../store/actions/preferences';
import CertificatesTab from '../../components/certificates/CertificatesTab/CertificatesTab';
import CertificateOfProgress from '../../components/certificates/CertificateOfProgress/CertificateOfProgress';
import CertificatesFilter from '../../components/certificates/CertificatesFilter/CertificatesFilter';
import EmailShare from '../../components/certificates/EmailShare/EmailShare';
import './achievements.scss';
import LearningPath from '../../components/learning-path/LearningPath';

const { TabPane } = Tabs;
const { Title } = Typography;

class Achievements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailModalVisible: false,
            certificateToShare: null,
            loading: false,

        };
        this.certificatesFilter = React.createRef();
    }

    componentDidMount() {
        const { getPreferences } = this.props;
        message.loading('Loading..');
        this.setState({ loading: true });
        getPreferences();
        this.fetchUserCertificates('');
    }

    reset = () => {
        this.setState({
            certificateToShare: null,
        });
    };

    showEmailModal = img => {
        this.setState({
            emailModalVisible: true,
            certificateToShare: img,
        });
    };

    closeEmailModal = () => {
        this.setState({
            emailModalVisible: false,
        });
    };

    fetchUserCertificates = courseName => {
        const { fetchUserCertificates } = this.props;
        fetchUserCertificates(courseName).then(res => {
            message.destroy();
            if (res !== true) {
                message.error(res.message);
            }
            this.setState({ loading: false });
            this.certificatesFilter.current.handleCertificates();
        });
    }

    render() {
        const {
            sendCertificateToEmail, certificate, user,
            getLearningPath, preferences, createCertificateOfProgress,
            fetchUserCertificates, updateCertificateVisibility, deleteCertificateOfProgress,
        } = this.props;
        const {
            theory_certificates: theoryCertificates,
            completion_certificates: completionCertificates,
            certificate_of_progress: certifcateOfProgress,
        } = certificate;
        const { emailModalVisible, certificateToShare, loading } = this.state;

        return (
            <div className="certificates">
                <div className="page-title">
                    <Title>My Achievements</Title>
                </div>
                <Tabs defaultActiveKey={window.fromCertificateOfProgressView ? 'certificate_of_progress' : 'certificates'}>
                    <TabPane tab="Certificates" key="certificates" className='certificate-tab'>
                        <CertificatesFilter
                            theory_certificates={theoryCertificates}
                            completion_certificates={completionCertificates}
                            loading={loading}
                            fetchUserCertificates={courseName => this.fetchUserCertificates(courseName)}
                            ref={this.certificatesFilter}
                        >
                            <CertificatesTab
                                showEmailModal={this.showEmailModal}
                                loading={loading}
                            />
                        </CertificatesFilter>
                    </TabPane>
                    <TabPane tab="Certificate of Achievement" key="certificate_of_achievement" className='certificate-tab'>
                        <LearningPath
                            getLearningPath={getLearningPath}
                            createCertificateOfProgress={createCertificateOfProgress}
                            fetchUserCertificates={fetchUserCertificates}
                            user={user}
                            preferences={preferences}
                        />
                        <CertificateOfProgress
                            certificates={certifcateOfProgress}
                            fetchUserCertificates={fetchUserCertificates}
                            updateCertificateVisibility={updateCertificateVisibility}
                            deleteCertificateOfProgress={deleteCertificateOfProgress}
                        />
                    </TabPane>
                </Tabs>
                <EmailShare
                    certificate={certificate}
                    sendCertificateToEmail={sendCertificateToEmail}
                    emailModalVisible={emailModalVisible}
                    certificateToShare={certificateToShare}
                    reset={this.reset}
                    closeEmailModal={this.closeEmailModal}
                />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        certificate: state.certificate,
        user: state.auth.user,
        preferences: state.preferences,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sendCertificateToEmail: data => dispatch(sendCertificateToEmail(data)),
        fetchUserCertificates: courseName => dispatch(fetchUserCertificates(courseName)),
        getLearningPath: (filter, finished) => dispatch(getLearningPath(filter, finished)),
        getPreferences: () => dispatch(getPreferences()),
        createCertificateOfProgress: data => dispatch(createCertificateOfProgress(data)),
        updateCertificateVisibility: certificate => dispatch(updateCertificateVisibility(certificate)),
        deleteCertificateOfProgress: id => dispatch(deleteCertificateOfProgress(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Achievements);
