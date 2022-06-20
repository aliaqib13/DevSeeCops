import React, { Component } from 'react';
import './index.scss';
import SignatureCanvas from 'react-signature-canvas';
import {
    message, Button, Input, Icon, Form, Row, Col,
} from 'antd';

class CTOConfigs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            loading: false,
            showSignImg: !!Object.keys(this.props.configs).length,
        };
        this.sigCanvas = {};
    }

    signClear = () => {
        this.sigCanvas.clear();
    }

    changeSignature = () => {
        const { showSignImg } = this.state;
        this.setState({
            showSignImg: !showSignImg,
        });
    }

    onNameHandle = e => {
        this.setState({
            name: e.target.value,
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        if (!this.state.showSignImg && this.sigCanvas.isEmpty()) {
            message.error('Please sign!');
            return;
        }

        this.props.form.validateFields((err, values) => {
            const { name } = this.state;
            const { configs, saveConfigs } = this.props;
            const data = {
                name: name || configs.name,
            };

            if (!this.state.showSignImg) {
                data.signature = this.sigCanvas.getTrimmedCanvas().toDataURL();
            }

            if (!err) {
                this.setState({
                    loading: true,
                });
                return saveConfigs(data).then(res => {
                    if (res === true) {
                        this.setState({
                            loading: false,
                            showSignImg: true,
                        });
                        message.success('Saved!');
                    } else {
                        message.error(res.message);
                    }
                });
            }
        });
    }

    render() {
        const { configs, form } = this.props;
        const { getFieldDecorator } = form;
        const { loading, showSignImg } = this.state;

        return (
            <Row>
                <Col span={10}>
                    <div className="CTO-configs">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item style={{ paddingBottom: '15px' }}>
                                {getFieldDecorator('Name', {
                                    initialValue: configs.name,
                                    rules: [{ required: true, min: 2, max: 100 }],
                                })(
                                    <Input
                                        name="name"
                                        placeholder="Name"
                                        onChange={this.onNameHandle}
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    />,
                                )}
                            </Form.Item>
                            {
                                showSignImg ? <img src={`${configs.signature}?${configs.hash}`} alt="CTO signature" />
                                    : <SignatureCanvas penColor='blue' ref={ref => { this.sigCanvas = ref; }} canvasProps={{ className: 'sigCanvas' }} />
                            }
                            <Row justify="end" type="flex" style={{ marginTop: '10px' }}>
                                <Button
                                    style={{ marginRight: '8px' }}
                                    onClick={this.changeSignature}
                                >
                                    {showSignImg ? 'Change Signature' : 'Cancel'}
                                </Button>
                                {
                                    !showSignImg
                                        && (
                                            <Button
                                                style={{ marginRight: '8px' }}
                                                onClick={this.signClear}
                                            >
                                                Clear
                                            </Button>
                                        )
                                }

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Update
                                </Button>
                            </Row>
                        </Form>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Form.create({ name: 'CTO_configs' })(CTOConfigs);
