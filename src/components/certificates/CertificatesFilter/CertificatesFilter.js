import React, { Component } from 'react';
import { Select, Empty, Input } from 'antd';
import Loading from '../../Loading/Loading';
import './certificatesFilter.scss';
import { COURSE_TYPE } from '../../../constants';

const { Option } = Select;
const { Search } = Input;

class CertificatesFilter extends Component {
    state = {
        type: 'all',
        certificates: [],
    };

    handleCertificates = () => {
        const { theory_certificates, completion_certificates } = this.props;
        const { type } = this.state;
        let certificates = [];
        switch (type) {
        case 'all':
            certificates = theory_certificates.concat(completion_certificates)
                .filter(item => item.courses.type !== COURSE_TYPE.INTRODUCTION);
            break;
        case 'professional':
            certificates = completion_certificates.filter(item => item.courses.type === COURSE_TYPE.EXAM);
            break;
        case 'practitioner':
            certificates = completion_certificates.filter(item => item.courses.type === COURSE_TYPE.STANDARD);
            break;
        case 'theory':
            certificates = theory_certificates.filter(item => item.courses.type !== COURSE_TYPE.INTRODUCTION);
            break;
        default:
            break;
        }
        certificates = certificates.map(item => {
            if (item.type === 'theory') {
                item.image = ''; // to ignore previously issued classical certificates for theory
            }
            return item;
        });
        this.setState({ certificates });
    }

    handleSelectType = value => {
        this.setState({ type: value }, this.handleCertificates);
    };

    handleSearchChange = value => {
        this.props.fetchUserCertificates(value);
    }

    renderChildren = () => {
        const { loading } = this.props;
        const { certificates } = this.state;
        if (certificates.length && !loading) {
            return React.Children.map(this.props.children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { certificates });
                }
                return child;
            });
        } if (loading) {
            return <Loading />;
        }
        return (
            <div className="certificates-filter">
                <Empty description="No certificates yet..." />
            </div>
        );
    }

    render() {
        const { type, certificates } = this.state;
        const classicalCertificates = certificates.filter(item => item.image);
        return (
            <div className="certificates-filter">
                <span className="total-number">
                    <b>
                        Total number of
                        {type === 'theory' ? ' preparation badges' : ` ${type} certificates`}
                    </b>
                    :
                    {type === 'theory' ? certificates.length : classicalCertificates.length}
                </span>
                <Search
                    placeholder="Search Courses"
                    onSearch={value => this.handleSearchChange(value)}
                    className="search"
                />
                <Select
                    showSearch
                    defaultValue="all"
                    className="certificates-select"
                    onChange={this.handleSelectType}
                >
                    <Option value="all">All Certificates</Option>
                    <Option value="professional">Professional Certificates</Option>
                    <Option value="practitioner">Practitioner Certificates</Option>
                    <Option value="theory">Preparation Badges</Option>
                </Select>
                {this.renderChildren()}
            </div>
        );
    }
}

export default CertificatesFilter;
