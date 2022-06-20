import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Typography, Row, Col, Divider, message,
} from 'antd';
import ReactGA from 'react-ga';
import { getUserCertificateById, downloadCertificate, notifyViaSlack } from '../../../store/actions/certificate';
import Loading from '../../Loading/Loading';
import './certificateById.scss';
import { CATEGORIES, ACTIONS } from '../../../util/GAEventConstants';
import CertificateDetails from './CertificateDetails';
import ImageShareDownload from './ImageShareDownload';

const { Title } = Typography;

class CertificateByIdPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        const { getUserCertificateById, match: { params: { id } } } = this.props;

        return getUserCertificateById(id);
    }

    // Handle Download badge or image
    downloadCertificate = async (e, certificateType, certificate) => {
        let url = '';
        const { downloadCertificate, notifyViaSlack } = this.props;
        url = certificateType;
        const loader = message.loading('Downloading...', 0);
        await downloadCertificate(url).then(response => {
            const reader = new FileReader();
            reader.readAsDataURL(response);
            reader.onloadend = function () {
                const base64data = reader.result;
                const a = document.createElement('a');
                a.href = base64data.toString();
                a.download = `certificate_${certificate.uuid}.png`;
                a.click();
                loader();
            };
        }).catch(error => console.error('Failed to download certificate', error));
        await notifyViaSlack('download', certificate);
    }

    // ToDo: Handle SocialMedia share icons in ATP-2112

    // Notify Via Slack when certificate shared
    notifyViaSlack = (type, certificate) => {
        const { notifyViaSlack } = this.props;
        const { uuid, courses: { id, title } } = certificate;
        notifyViaSlack(type, uuid);
        ReactGA.event({
            category: CATEGORIES.SHARE_CERTIFICATE_LINKEDIN,
            action: ACTIONS.USER_CLICKED_SHARE_CERTIFICATE_LINKEDIN_AFTER_FINISHING_COURSE(),
            label: `${id} : ${title}`,
        });
    }

    render() {
        const { certificateById } = this.props;

        if (certificateById === null) {
            return <Loading />;
        }

        return (
            <div className="certificates-by-id-container">
                <div className="page-title">
                    <Title>My Certificate</Title>
                </div>

                <Row className='certificate-share-container'>
                    { certificateById.image
                                    && (
                                        <Col className='certificate-image-share-container'>
                                            <ImageShareDownload
                                                certificateById={certificateById}
                                                certificateImageBadge={certificateById.image}
                                                notifyViaSlack={this.notifyViaSlack}
                                                downloadCertificate={this.downloadCertificate}
                                            />
                                        </Col>
                                    )}

                    <Col className='certificate-image-share-container'>
                        <ImageShareDownload
                            certificateById={certificateById}
                            certificateImageBadge={certificateById.badge}
                            notifyViaSlack={this.notifyViaSlack}
                            downloadCertificate={this.downloadCertificate}
                        />
                    </Col>
                </Row>
                <Divider dashed />
                <Row className='certificate-details-container'>
                    <CertificateDetails
                        certificateById={certificateById}
                    />
                </Row>

                <Divider />
                <Row>
                    {/* Here Recommendations will be displayed for user  ATP-2111 :https://araido.atlassian.net/browse/ATP-2111 */}
                </Row>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    certificateById: state.certificate.certificateById,
});

const mapDispatchToProps = dispatch => ({
    getUserCertificateById: id => dispatch(getUserCertificateById(id)),
    downloadCertificate: url => dispatch(downloadCertificate(url)),
    notifyViaSlack: (type, uuid) => dispatch(notifyViaSlack(type, uuid)),

});

export { CertificateByIdPage };

export default connect(mapStateToProps, mapDispatchToProps)(CertificateByIdPage);
