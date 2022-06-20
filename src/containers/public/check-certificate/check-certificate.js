import React, { Component } from 'react';
import { getPublicCertificateById } from '../../../store/actions/public/checkCertificate';
import { connect } from 'react-redux';
import {
    Typography, Input, Card, Modal, message, Row,
} from 'antd';
import Loading from '../../../components/Loading/Loading';
import './check-certificate.scss';
import { NavLink } from 'react-router-dom';
import CopyField from '../../../components/blocks/CopyField/CopyField';

const { Search } = Input;
const { Title, Text } = Typography;

class CheckCertificate extends Component {
    constructor(props) {
        super(props);
        this.loader = null;
        this.state = {
            loading: false,
            visible: false,
        };
    }

    handleSearch(id) {
        if (id) {
            this.setState({ loading: true });
            this.props.getCertificateById(id).then(e => {
                if (e.message) {
                    message.error(e.message);
                } else {
                    message.success('Success');
                }
                this.setState({ loading: false });
            });
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = e => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const { data } = this.props.certificate;
        const { cert_info } = data;

        const certificateUuid = {
            text: data.uuid,
        };
        const { loading } = this.state;
        return (
            <div>
                <div className="courses-searchbar">
                    <Title level={3}>Check Certificate </Title>
                    <Title level={4}>Please insert a certificate ID</Title>
                    <Search
                        placeholder="example: cc1e6b4a-da7f-413f-9c9a-a5e32fa857be"
                        onSearch={value => this.handleSearch(value)}
                        className="search-check-certificate"
                        size="large"
                        maxLength={36}
                    />
                </div>
                {!loading
                    ? (
                        <div className="check-certificate-container">
                            {data.id
                        && (
                            <Card
                                className="card-container"
                                hoverable

                                cover={<img alt="example" style={{ borderRadius: '20px' }} onClick={this.showModal} src={data.image || data.badge} />}
                            >
                                <Row className="categoryRow">
                                    <div className="courseCategory">
                                        <Text>{data.lab_name}</Text>
                                    </div>
                                    <div className="courseTitle">
                                        <Title level={4} style={{ fontWeight: 'normal' }}>{data.type}</Title>
                                    </div>
                                </Row>
                                <Row className="categoryRow">
                                    <div className="courseCategory">
                                        <Text>{cert_info.certificateName}</Text>
                                    </div>
                                    <div className="courseTitle">
                                        <Title level={4} style={{ fontWeight: 'normal' }}>{cert_info.date}</Title>
                                    </div>
                                </Row>
                                <Row className="categoryRow">
                                    <div className="credential-id">
                                        <CopyField content={certificateUuid} />
                                        {' '}
                                    </div>
                                </Row>
                            </Card>
                        )}
                            <Modal
                                title={data.lab_name}
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                footer={null}
                                closable
                                width="70%"
                            >
                                <NavLink to={`/course-information/${data.course_id}`}>
                                    <img alt={data.image} style={{ width: '100%' }} src={data.image} />
                                </NavLink>
                            </Modal>
                        </div>
                    )
                    : <Loading />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        certificate: state.publicCheckCertificate,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCertificateById: id => dispatch(getPublicCertificateById(id)),
    };
}

export { CheckCertificate };
export default connect(mapStateToProps, mapDispatchToProps)(CheckCertificate);
