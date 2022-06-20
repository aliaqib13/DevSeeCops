import React, { Component } from 'react';
import {
    Button, Icon, message, Modal, Collapse,
} from 'antd';
import CKEditor from 'ckeditor4-react';

const { Panel } = Collapse;

const initialState = {
    hintMessages: [{
        message: '',
    }],
    loading: false,
};

class CreateHintModal extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    inputChange = (e, index) => {
        const hintMessages = [...this.state.hintMessages];
        hintMessages[index].message = e.editor.getData();
        this.setState({
            hintMessages,
        });
    }

    addHint = () => {
        const { hintMessages } = this.state;
        const { course_id } = this.props;
        this.setState({
            loading: true,
        });
        this.props.addHint({ hints: hintMessages, course_id }).then(res => {
            if (res === true) {
                message.success('hint added');
            } else {
                message.error(res.message);
            }
            this.setState(initialState);
            this.props.toggleModal();
        });
    }

    addNewHintMessage = () => {
        const hintMessages = [...this.state.hintMessages];
        hintMessages.push({ message: '' });
        this.setState({
            hintMessages,
        });
    }

    render() {
        const { hintMessages, loading } = this.state;
        const { visible, toggleModal } = this.props;
        return (
            <Modal
                onCancel={toggleModal}
                title="Add Hint Message"
                visible={visible}
                footer={[
                    <Button key="add-new-hint" className="add-hint-btn" type="link" onClick={() => this.addNewHintMessage()}>
                        <Icon type="plus-circle" />
                        Add message
                    </Button>,
                    <Button key="back" onClick={toggleModal}>
                        Cancel
                    </Button>,
                    <Button key="create" type="primary" loading={loading} onClick={this.addHint}>
                        Add
                    </Button>,
                ]}
            >
                <>
                    {hintMessages.map((item, index) => (
                        <Collapse accordion defaultActiveKey="0" key={index} className="hint-collapse">
                            <Panel header={`Hint Message ${index + 1}`} key={index}>
                                <div key={`hint-${index}`} className="block-item-hint-message">
                                    <CKEditor
                                        data={item[index]}
                                        onChange={e => this.inputChange(e, index)}
                                        onBeforeLoad={cke => (cke.disableAutoInline = true)}
                                    />
                                </div>
                            </Panel>
                        </Collapse>
                    ))}
                </>
            </Modal>
        );
    }
}
export default CreateHintModal;
