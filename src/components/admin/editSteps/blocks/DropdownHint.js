import React, { Component } from 'react';
import {
    Button, Input, Modal, Radio,
} from 'antd';
import CKEditor from 'ckeditor4-react';
import HintsModal from '../../editCourse/hints/Hints';
import HTMLSanitize from '../../../HTMLSanitize/HTMLSanitize';

export default class DropdownHint extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'DropdownHint',
            content: {
                hint_id: null,
                hintTitle: '',
                warningMessage: '',
            },
            visible: false,
            maxLength: 500,
            hintModal: false,
        };
    }

    componentDidMount() {
        const { content } = this.props.block;
        this.setState({
            ...this.state,
            content,
        });
    }

    toggleModal = () => {
        this.setState({
            visible: !this.state.visible,
        });
    }

    toggleHintModal = () => {
        this.setState({
            hintModal: !this.state.hintModal,
        });
    }

    inputChange = e => {
        let value = '';

        if (e.target === undefined) {
            value = e.editor.getData();
            const { content } = this.state;
            content.warningMessage = value;
            this.setState({
                content,
            }, () => this.props.onChangeBlock(this.state, this.props.index));
        } else {
            value = e.target.value;
            const { content } = this.state;
            content.hintTitle = value;
            this.setState({
                content,
            }, () => this.props.onChangeBlock(this.state, this.props.index));
        }
    }

    selectHint = e => {
        const { content } = this.state;
        content.hint_id = e.target.value;
        this.setState({
            content,
        }, () => {
            this.props.onChangeBlock(this.state, this.props.index);
        });
        this.toggleModal();
    }

    render() {
        const { hintTitle, warningMessage, hint_id } = this.state.content;
        const { visible, maxLength, hintModal } = this.state;
        const { hints, preview } = this.props;

        return (
            <>
                <div className="block-item">
                    <Input
                        type="text"
                        name="title"
                        placeholder="Hint Title"
                        value={hintTitle}
                        onChange={e => this.inputChange(e)}
                        disabled={preview}
                    />
                </div>
                <div className="block-item">
                    <h4>Warning Message</h4>
                    <CKEditor
                        id="warning_message"
                        name="warning_message"
                        data={warningMessage}
                        onChange={this.inputChange}
                        onBeforeLoad={cke => (cke.disableAutoInline = true)}
                        readOnly={preview}
                    />
                </div>
                {!preview
                    && (
                        <div className="block-item-hint">
                            <Button type="primary" shape="round" onClick={this.toggleModal}>Assign Hint Message </Button>
                            <Button type="primary" style={{ marginLeft: '5%' }} shape="round" onClick={this.toggleHintModal}>Manage Hints</Button>
                        </div>
                    )}

                <Modal
                    onCancel={this.toggleModal}
                    title="Add Hint Message"
                    visible={visible}
                    footer={null}
                    width={1000}
                >
                    <div className="hints-content">
                        <Radio.Group defaultValue={hint_id || 0} onChange={this.selectHint}>
                            {hints.map((item, key) => (
                                <div key={key} className="hint-item">
                                    <Radio.Button className="hint-options" value={item.hint_id}>
                                        <p>
                                            <HTMLSanitize content={item.message.length > maxLength ? `${(item.message).substring(0, maxLength - 3)}...` : item.message} />
                                        </p>
                                    </Radio.Button>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                </Modal>

                <HintsModal
                    toggleHintModal={this.toggleHintModal}
                    visible={hintModal}
                    hints={hints}
                    addHint={this.props.addHint}
                    editHint={this.props.editHint}
                    deleteHint={this.props.deleteHint}
                    course_id={this.props.course_id}
                />
            </>
        );
    }
}
