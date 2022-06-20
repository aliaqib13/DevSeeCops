import React, { Component } from 'react';
import {
    Card, Button, Icon, message, Tooltip,
} from 'antd';
import { LinkedinShareButton } from 'react-share';
import moment from 'moment';
import './certificateCard.scss';
import ReactGA from 'react-ga';
import { NavLink } from 'react-router-dom';
import { CATEGORIES, ACTIONS } from '../../../util/GAEventConstants';
import CopyField from '../../blocks/CopyField/CopyField';

class CertificateCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sharingClicked: false,
        };
    }

    downloadCertificate = (e, certificate) => {
        let url = '';
        const { type, downloadCertificate } = this.props;
        type === 'badge' ? url = certificate.badge : url = certificate.image;
        const loader = message.loading('Downloading...', 0);
        downloadCertificate(url).then(response => {
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
        this.notifyViaSlack('download', certificate);
    }

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
        const { type, showEmailModal, certificate } = this.props;
        const { sharingClicked } = this.state;
        const certificateUuid = {
            text: certificate.uuid,
        };

        return (
            <Card className="certificate-card">
                <NavLink style={{ color: 'inherit' }} to={`/platform/achievements/${certificate.id}`}>
                    <img className="certificate-img" src={type === 'badge' ? certificate.badge : certificate.image} alt="certificate" />

                </NavLink>
                <div className="certificate-title">{certificate.lab_name}</div>
                <div className="certificate-text">{certificate.platform}</div>
                <div className="certificate-text">{certificate.difficulty}</div>
                <div className="certificate-date">{moment(certificate.created_at).format('DD MMM YYYY')}</div>
                {certificate.uuid && (
                    <div className="certificate-text credential-id">
                        <CopyField content={certificateUuid} />
                    </div>
                )}

                <div className="certificate-buttons">
                    <Tooltip placement="top" title="Download your certificate">
                        <Button onClick={e => this.downloadCertificate(e, certificate)} className={type === 'classic' ? 'black-style certificate-card-button' : 'certificate-card-button'}>
                            Download
                        </Button>
                    </Tooltip>
                    <span className="certificate-buttons-or">or</span>
                    <div
                        className={`certificate-share-container ${sharingClicked && 'clicked'}`}
                        onClick={() => { this.setState({ sharingClicked: true }); }}
                    >
                        <Tooltip placement="top" title="Share your certificate via LinkedIn or Mail">
                            <Button className={type === 'classic' ? 'black-style certificate-share-button certificate-card-button' : 'certificate-share-button certificate-card-button'}>
                                Share
                            </Button>
                        </Tooltip>
                        <div className={type === 'classic' ? 'black-style certificate-share-icons' : 'certificate-share-icons'}>
                            <span className="certificate-share-icons-linkedin">
                                <LinkedinShareButton
                                    url={type === 'badge' ? certificate.badge : certificate.image}
                                    onClick={() => this.notifyViaSlack('linkedin', certificate)}
                                >
                                    <Icon type="linkedin" className={type === 'classic' ? 'classic_linkedin' : 'badge_linkedin'} />
                                </LinkedinShareButton>
                            </span>
                            <span className="certificate-share-icons-mail" onClick={() => { showEmailModal(type === 'badge' ? certificate.badge : certificate.image); }}>
                                <Icon type="mail" className={type === 'classic' ? 'classic' : 'badge'} />
                            </span>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export { CertificateCard };
