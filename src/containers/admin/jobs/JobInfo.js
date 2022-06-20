import React, { Component } from 'react';
import {
    Descriptions, Col, Row, Button, Icon,
} from 'antd';
import './jobInfo.scss';

const { Item } = Descriptions;

class JobInfo extends Component {
    goBack = () => {
        this.props.history.push('/platform/admin/jobs');
    }

    downloadConfigFile = resource => {
        const resourceCredentials = resource.substring('[CREDENTIALS]'.length, resource.length - '[/CREDENTIALS]'.length);
        const resourceObject = JSON.parse(resourceCredentials);
        const elementLink = document.createElement('a');
        const file = new Blob([resourceObject], { type: 'text/x-yaml' });
        elementLink.href = URL.createObjectURL(file);
        elementLink.download = 'Kubeconfig.yaml';
        document.body.appendChild(elementLink); // Required for this to work in FireFox
        elementLink.click();
    }

    render() {
        const { debug_info, job_resources } = this.props.location.state;

        const jobResourcesObj = JSON.parse(job_resources || '{}');
        const kubeConfigResource = jobResourcesObj.Kubeconfig;

        return (
            <div className="job-info-container">
                <Row>
                    <Col span={24}>
                        <Button type="link" size="large" onClick={this.goBack}>
                            <Icon type="left" />
                            {' '}
                            Back
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Descriptions title="Debug Info">
                            <Item className="job-info-description">
                                {debug_info}
                            </Item>
                        </Descriptions>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Descriptions title="Job Resources">
                            <Item className="job-info-description">
                                {job_resources}
                                {
                                    kubeConfigResource
                                        ? <Button type="primary" icon="download" onClick={() => this.downloadConfigFile(kubeConfigResource)}>Download Kubeconfig</Button>
                                        : ''
                                }
                            </Item>
                        </Descriptions>
                    </Col>
                </Row>
            </div>
        );
    }
}

export { JobInfo };
export default JobInfo;
