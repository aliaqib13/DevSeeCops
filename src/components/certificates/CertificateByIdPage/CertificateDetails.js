import React, { Component } from 'react';
import {
    Col, Tooltip,
} from 'antd';
import moment from 'moment';
import { NavLink, withRouter } from 'react-router-dom';
import CopyField from '../../blocks/CopyField/CopyField';

class CertificateDetails extends Component {
    render() {
        const { certificateById } = this.props;
        const certificateUuid = {
            text: certificateById.uuid,
        };
        return (
            <>
                <Col span={24}>
                    <div className='certificate-option-data'>
                        <h2>Course Name</h2>
                        <p>
                            <NavLink to={`/course-information/${certificateById.id}`}>
                                <Tooltip placement="top" title="Learn more about the course">
                                    {certificateById.courses.title}
                                </Tooltip>
                            </NavLink>
                        </p>
                    </div>
                    <div className='certificate-option-data'>
                        <h2>Course Level</h2>
                        <p>{certificateById.difficulty}</p>
                    </div>
                    <div className='certificate-option-data'>
                        <h2>Date of Awarding</h2>
                        <p>{moment(certificateById.created_at).format('DD MMM YYYY')}</p>
                    </div>
                    <div className='certificate-option-data'>
                        <h2>Credential ID</h2>
                        {certificateById.uuid && (
                            <div className="certificate-text credential-id">
                                <CopyField content={certificateUuid} />
                            </div>
                        )}
                    </div>
                </Col>
            </>
        );
    }
}

export { CertificateDetails };
export default withRouter(CertificateDetails);
