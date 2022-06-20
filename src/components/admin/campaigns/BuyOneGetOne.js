import React, { Component } from 'react';
import {
    Button, message, Input,
} from 'antd';
import CKEditor from 'ckeditor4-react';

class BuyOneGetOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailText: '',
            bellowButtonText: '',
        };
    }

    componentDidMount() {
        const { config: { emailText, bellowButtonText } } = this.props;
        this.setState({
            emailText, bellowButtonText,
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
        const { emailText, bellowButtonText } = this.state;
        if (!emailText || !bellowButtonText) {
            return message.error(`${!emailText ? 'Email content' : 'Text below purchase button'} should not be empty`);
        }
        updateCampaignConfig(id, { emailText, bellowButtonText }).then(res => {
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
        const { emailText, bellowButtonText } = this.state;
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
                    <span className="inputSpan">Text Below Purchase Button</span>
                    <Input
                        value={bellowButtonText}
                        name='bellowButtonText'
                        placeholder="Text below purchase button"
                        onChange={this.inputChangeHandler}
                    />
                </div>
                <br />
                <Button type="primary" onClick={this.update}>Update</Button>
            </div>
        );
    }
}

export default BuyOneGetOne;
