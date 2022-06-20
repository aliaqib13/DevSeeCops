import React, { Component } from 'react';
import {
    Modal, Form, Input, Button, Icon, message,
} from 'antd';

class UpdateCertificate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            certificate_name: '',
            loading: false,
        };
    }

    componentDidMount() {
        const { certificate_name } = this.props.updatingCertificate.users;

        if (this.props.visible) {
            this.setState({
                certificate_name,
            });
        }
    }

    closeModal = () => {
        this.props.toggleModal();
    }

    onChangeHandle = e => {
        const { name } = e.target;
        const { value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    updateCertificate = () => {
        const { certificate_name } = this.state;
        const {
            id, user_id, type, badge, image,
        } = this.props.updatingCertificate;
        const loader = message.loading('Updating... Please Wait', 0);
        this.setState({ loading: true });
        return this.props.updateCertificate(id,
            {
                certificate_name,
                user_id,
                type,
                image,
                badge,
            }).then(res => {
            loader();
            if (res === true) {
                this.setState({ loading: false });
                message.success('updated');
            } else {
                message.error('something went wrong');
            }
            this.props.toggleModal();
        });
    }

    render() {
        const { loading, certificate_name } = this.state;
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (

            <Modal
                title="Update Certificate"
                visible={visible}
                onCancel={this.closeModal}
                confirmLoading={loading}
                footer={[
                    <Button key="back" onClick={this.closeModal}>
                        Cancel
                    </Button>,
                    <Button key="update" type="primary" loading={loading} onClick={this.updateCertificate}>
                        Update
                    </Button>,
                ]}
            >
                <Form>
                    <Form.Item label="Certificate Name" key={2}>
                        {getFieldDecorator('certificate_name', {
                            initialValue: certificate_name,
                            rules: [
                                {
                                    max: 20,
                                    message: 'Certificate name cannot be longer then 20 characters',
                                },
                                {
                                    required: true,
                                    message: 'Certificate name is required',
                                },
                            ],
                        })(
                            <Input
                                prefix={<Icon type="safety-certificate" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                name="certificate_name"
                                placeholder="Certificate name"
                                onChange={this.onChangeHandle}
                            />,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export { UpdateCertificate };
export default Form.create({ name: 'update-certificate' })(UpdateCertificate);
