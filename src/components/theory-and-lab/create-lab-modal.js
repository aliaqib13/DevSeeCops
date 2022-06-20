import React, { Component } from 'react';
import './create-lab-modal.scss';
import {
    Button, Col, Modal, Row, Select,
} from 'antd';

const { Option } = Select;

export default class CreateLabModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            applicationVersion: 'Java',
            platform: 'AWS',
            disabled: false,
            applicationText: "Java Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            platformText: "AWS Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        };
    }

    handleAppChange = applicationVersion => {
        let applicationText;
        switch (applicationVersion) {
        case '.NET':
            applicationText = '.NET Lorem ipsum dolor sit amet consectetur adipisicing elit. Et numquam iure facere eius, incidunt dolorum velit obcaecati magni neque enim.';
            break;
        case 'Java':
            applicationText = 'Java Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum qui explicabo reiciendis voluptas eligendi nobis!';
            break;
        case 'Go':
            applicationText = 'GO Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi unde, aliquid eveniet, dolorum laborum in ipsum, iste recusandae modi alias cupiditate consectetur quod laboriosam incidunt.';
            break;
        case 'NodeJS':
            applicationText = 'NodeJS Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
            break;
        default:
            applicationText = 'Lorem ipsum dolor sit amet.';
            break;
        }
        this.setState({
            applicationVersion,
            applicationText,
        });
    }

    handlePlatformChange = platform => {
        let platformText;
        switch (platform) {
        case 'AWS':
            platformText = 'AWS Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
            break;
        case 'Azure':
            platformText = 'Azure Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptas cum earum alias optio nobis non error, quo voluptate tenetur et eveniet ratione iusto magnam minima repellendus doloremque tempora facere necessitatibus laborum fugiat saepe minus. Incidunt accusantium expedita libero vitae, nihil laboriosam voluptatem. Porro ex alias doloribus itaque aliquid accusantium!';
            break;
        default:
            platformText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, aliquid alias consequatur ullam dicta eveniet id harum quidem ipsum corporis at, explicabo aut quos optio. Incidunt repudiandae sint officiis nostrum?';
            break;
        }
        this.setState({
            platform,
            platformText,
        });
    }

    render() {
        const { modalVisible, closeModal } = this.props;
        const { applicationVersion, platform } = this.state;

        return (
            <Modal
                visible={modalVisible}
                width="45%"
                // onOk={this.handleOk}
                onCancel={closeModal}
                footer={null}
                className="antModal"
            >
                <Row className="modalBodyRow">
                    <Col className="modalSelectsCol">
                        <div>
                            <h1>Application</h1>
                            <Select
                                value={applicationVersion}
                                // size={size}
                                className="modalAntSelect"
                                onChange={this.handleAppChange}
                            >
                                <Option value=".NET">.NET</Option>
                                <Option value="Java">Java</Option>
                                {/* <Option value="Go">Go</Option> */}
                                {/* <Option value="NodeJS">NodeJS</Option> */}
                            </Select>
                            <h1 style={{ marginTop: '32px' }}>Platform</h1>
                            <Select
                                value={platform}
                                // size={size}
                                className="modalAntSelect"
                                onChange={this.handlePlatformChange}
                            >
                                <Option value="AWS">AWS</Option>
                                {/* <Option value="Azure">Azure</Option> */}
                            </Select>

                        </div>
                    </Col>
                    <Col className="modalTextCol">
                        <h1>What is your work Environment?</h1>
                        <p>{this.state.applicationText}</p>
                        <p style={{ marginBottom: '32px' }}>{this.state.platformText}</p>
                    </Col>
                </Row>
                <Row className="modalButtonRow">
                    <Button
                        type="primary"
                        loading={this.props.loading}
                        disabled={this.state.disabled}
                        onClick={() => { this.props.createLab(applicationVersion); }}
                    >
                        Create Lab
                    </Button>
                </Row>

            </Modal>
        );
    }
}
