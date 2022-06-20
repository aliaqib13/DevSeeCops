import React, { Component } from 'react';
import { Modal, Button, message } from 'antd';
import SignatureCanvas from 'react-signature-canvas';

export default class SignatureModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmLoading: false,
        };

        this.sigCanvas = {};
    }

    signClear = () => {
        this.sigCanvas.clear();
    }

    handleCancel = () => {
        this.sigCanvas.clear();
        this.props.toggleModal();
    }

    handleOk = () => {
        if (this.sigCanvas.isEmpty()) {
            message.error('Please sign!');
            return;
        }

        const signature = this.sigCanvas.getTrimmedCanvas().toDataURL();

        this.setState({
            confirmLoading: true,
        });
        this.props.saveSignature(this.props.labId, signature).then(res => {
            if (res === true) {
                message.success('Saved!');
            } else {
                message.error(res.message);
            }

            this.setState({
                confirmLoading: false,
            });
            this.sigCanvas.clear();
            this.props.toggleModal();
        });
    }

    render() {
        const { visible } = this.props;
        const { confirmLoading } = this.state;

        return (
            <div>
                <Modal
                    className="lab-signature-modal"
                    width={800}
                    title="Sign Lab"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" type="danger" ghost onClick={this.handleCancel}>Close</Button>,
                        <Button key="clear" onClick={this.signClear}>Clear</Button>,
                        <Button key="ok" type="primary" loading={confirmLoading} onClick={this.handleOk}>Save</Button>,

                    ]}
                >
                    <SignatureCanvas penColor='blue' ref={ref => { this.sigCanvas = ref; }} canvasProps={{ className: 'sig-canvas' }} />
                </Modal>
            </div>
        );
    }
}
