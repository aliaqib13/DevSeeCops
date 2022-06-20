import React, { Component } from 'react';
import {
    Button, message, Modal, Typography,
} from 'antd';
import CKEditor from 'ckeditor4-react';

const { Title } = Typography;

class EditHintModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            hintMessage: '',
        };
    }

    componentDidMount() {
        const { message } = this.props.hint;
        this.setState({
            hintMessage: message,
        });
    }

    editHint = () => {
        const { editHint, hint } = this.props;
        const { hintMessage } = this.state;
        this.setState({
            loading: true,
        });
        editHint(hint.id, { message: hintMessage }).then(res => {
            if (res === true) {
                message.success('edited');
            } else {
                message.error(res.message);
            }
            this.setState({
                loading: false,
            });
            this.props.toggleModal();
        });
    }

    inputChange = e => {
        this.setState({
            ...this.state,
            hintMessage: e.editor.getData(),
        });
    }

    render() {
        const { loading, hintMessage } = this.state;
        const { visible, toggleModal } = this.props;

        return (
            <Modal
                onCancel={toggleModal}
                title="Edit Hint"
                visible={visible}
                footer={[
                    <Button key="back" onClick={toggleModal}>
                        Cancel
                    </Button>,
                    <Button key="create" type="primary" loading={loading} onClick={this.editHint}>
                        Edit
                    </Button>,
                ]}
            >
                <div className="block-item">
                    <Title level={4}>Hint Message</Title>
                    <CKEditor
                        id="hint_message"
                        name="message"
                        data={hintMessage}
                        onChange={this.inputChange}
                        onBeforeLoad={cke => (cke.disableAutoInline = true)}
                    />
                </div>
            </Modal>
        );
    }
}

export default EditHintModal;
