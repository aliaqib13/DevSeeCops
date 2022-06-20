import React, { Component } from 'react';
import CertificateCarousel from '../CertificateCarousel/CertificateCarousel';
import './certificatesTab.scss';

class CertificatesTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            badgeCertificates: true,
            classicCertificates: true,
        };
    }

    render() {
        const {
            showEmailModal, certificates,
        } = this.props;
        const { classicCertificates, badgeCertificates } = this.state;
        return (
            <div className="certificates-tab">
                <div className={`certificate-carousel-container ${classicCertificates && 'show'}`}>
                    <CertificateCarousel
                        showEmailModal={showEmailModal}
                        certificates={certificates}
                        type="classic"
                    />
                </div>
                <div className={`certificate-carousel-container ${badgeCertificates && 'show'}`}>
                    <CertificateCarousel
                        showEmailModal={showEmailModal}
                        certificates={certificates}
                        type="badge"
                    />
                </div>
            </div>
        );
    }
}

export default CertificatesTab;
