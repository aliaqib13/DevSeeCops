import { connect } from 'react-redux';
import { downloadCertificate, notifyViaSlack } from '../../../store/actions/certificate';
import { CertificateCard } from './CertificateCard';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    downloadCertificate: url => dispatch(downloadCertificate(url)),
    notifyViaSlack: (type, uuid) => dispatch(notifyViaSlack(type, uuid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CertificateCard);
