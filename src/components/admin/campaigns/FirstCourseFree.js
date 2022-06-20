import React, { Component } from 'react';
import {
    Button, message, Input,
} from 'antd';
import CKEditor from 'ckeditor4-react';

class FirstCourseFree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailText: '',
            aboveButtonText: '',
        };
    }

    componentDidMount() {
        const { config: { emailText, aboveButtonText } } = this.props;
        this.setState({
            emailText, aboveButtonText,
        });
    }

    inputChangeHandler = e => {
        if (e.editor) {
            this.setState({ emailText: e.editor.getData() });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    update = () => {
        const {
            updateCampaignConfig, id, fetchCampaigns, closeModal,
        } = this.props;
        const { emailText, aboveButtonText } = this.state;
        if (!emailText || !aboveButtonText) {
            return message.error(`${!emailText ? 'Email content' : 'Text above register button'} should not be empty`);
        }
        updateCampaignConfig(id, { emailText, aboveButtonText }).then(res => {
            if (res === true) {
                fetchCampaigns();
                closeModal();
                return message.success('Updated');
            }
            return message.error(res.message);
        }).catch(err => console.warn(err));
        return true;
    }

    render() {
        const { emailText, aboveButtonText } = this.state;
        return (
            <div>
                <div className="descriptionText">
                    <span className="inputSpan">Email Content</span>
                    <CKEditor
                        name="emailText"
                        data={emailText}
                        onChange={this.inputChangeHandler}
                        onBeforeLoad={cke => (cke.disableAutoInline = true)}
                    />
                </div>
                <br />
                <div className="small-input">
                    <span className="inputSpan">Text Above Register Button</span>
                    <Input
                        value={aboveButtonText}
                        name="aboveButtonText"
                        placeholder="Text above register button"
                        onChange={this.inputChangeHandler}
                    />
                </div>
                <br />
                <Button type="primary" onClick={this.update}>Update</Button>
            </div>
        );
    }
}

export default FirstCourseFree;
