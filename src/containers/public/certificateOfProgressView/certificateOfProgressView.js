import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { getCertificateOfProgress } from '../../../store/actions/public/checkCertificate';
import './certificateOfProgressView.scss';

const { Column } = Table;
const certificateOfAchievementHeader = '/img/certificate-of-achievement-header.png';
const presentedTo = '/img/presented_to.png';
const appreciation = '/img/appreciation.png';
const certificateCEO = '/img/certificate-ceo.svg';
const devsecopsIcon = '/img/devsecops-icon.png';
const ceoSignature = '/img/ceo_signature.png';
const certificateBorder = '/img/certificate-border.png';

class CertificateOfProgressView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            certificateOfProgress: { user: {} },
        };
    }

    componentDidMount() {
        const { user } = this.props.auth;
        this.props.getCertificateOfProgress(this.props.match.params.uuid).then(res => {
            if (res.message || ((!user || (res.certificate && user.id !== Number(res.certificate.user_id)))
                    && (res.certificate && !res.certificate.is_publicly_visible))) {
                if (localStorage.getItem('token')) {
                    return this.props.history.push('/platform');
                }

                return this.props.history.push('/courses');
            }
            this.setState({ courses: res.courses, certificateOfProgress: res.certificate });
        });
    }

    goBack = () => {
        this.props.history.push('/platform/achievements');
        window.fromCertificateOfProgressView = true;
        setTimeout(() => {
            delete window.fromCertificateOfProgressView;
        }, 2000);
    }

    render() {
        const { courses, certificateOfProgress } = this.state;
        const borderStyle = { height: `${(435 + (courses.length * 45))}px` };

        return (
            <>
                {window.location.href.includes('platform')
                && (
                    <div style={{ marginBottom: '5px' }}>
                        <Button type="ghost" size="small" onClick={this.goBack}><Icon type="left" /></Button>
                    </div>
                )}
                {window.innerWidth > 1200 ? (
                    <div className="certificate-of-progress-view">
                        <div className="icon-cont">
                            <img src={devsecopsIcon} alt="devsecops icon" width={80} className="devsecops-icon" />
                        </div>
                        <img src={certificateBorder} alt="certificate border" className="certificate-border" style={borderStyle} />
                        <div className="certificate-headers">
                            <p className="certificate-of-progress-header">
                                <img src={certificateOfAchievementHeader} alt="certificate of achievement header" width={400} />
                            </p>
                            <p>
                                <img src={presentedTo} alt="presented to" width={250} />
                            </p>
                            <p className="certificate-user">{certificateOfProgress && certificateOfProgress.user.certificate_name}</p>
                            <hr style={{ width: '45%' }} />
                            <p>
                                <img src={appreciation} alt="appreciation" width={500} />
                            </p>
                        </div>
                        <Table
                            dataSource={courses}
                            pagination={false}
                            rowClassName="certificate-table-row"
                            className="certificate-table"
                        >
                            <Column
                                title={<span className="certificate-table-header-row ">Course</span>}
                                render={(text, record) => (record.title)}
                                key="title"
                            />
                            <Column
                                title={<span className="certificate-table-header-row ">Level</span>}
                                render={(text, record) => (record.activeCourses ? record.activeCourses.user_level : 'None')}
                                key="level"
                            />
                            <Column
                                title={<span className="certificate-table-header-row ">Date</span>}
                                render={(text, record) => (record.certificates[0] && moment(record.certificates[0].created_at).format('DD MMM YYYY'))}
                                key="date"
                            />
                        </Table>
                        <div style={{ height: '135px' }}>

                            <div className="bottom-info-ceo">
                                <p>
                                    <img src={ceoSignature} alt="certificate ceo" width={180} className="ceo-signature" />
                                </p>
                                <p>
                                    <img src={certificateCEO} alt="certificate ceo" width={370} />
                                </p>
                            </div>
                            <div className="bottom-info-date">
                                <span>{certificateOfProgress && moment(certificateOfProgress.created_at).format('DD MMM YYYY')}</span>
                                <hr />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="certificate-of-progress-view-mobile">
                        <p className="certificate-of-progress-header">
                            <img src={certificateOfAchievementHeader} alt="certificate of achievement header" width={320} />
                        </p>
                        <p className="certificate-of-progress-presented">
                            <img src={presentedTo} alt="presented to" width={200} />
                        </p>
                        <p className="certificate-user">{certificateOfProgress && certificateOfProgress.user.certificate_name}</p>
                        <hr style={{ width: '45%' }} />
                        <Table
                            dataSource={courses}
                            pagination={false}
                            rowClassName="certificate-table-row"
                            className="certificate-table"
                        >
                            <Column
                                title={<span className="certificate-table-header-row ">Course</span>}
                                render={(text, record) => (record.title)}
                                key="title"
                            />
                            <Column
                                title={<span className="certificate-table-header-row ">Level</span>}
                                render={(text, record) => (record.activeCourses ? record.activeCourses.user_level : 'None')}
                                key="level"
                            />
                            <Column
                                title={<span className="certificate-table-header-row ">Date</span>}
                                render={(text, record) => (record.certificates[0] && moment(record.certificates[0].created_at).format('DD MMM YYYY'))}
                                key="date"
                            />
                        </Table>
                    </div>
                )}
            </>
        );
    }
}
function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCertificateOfProgress: id => dispatch(getCertificateOfProgress(id)),
    };
}

export { CertificateOfProgressView };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CertificateOfProgressView));
