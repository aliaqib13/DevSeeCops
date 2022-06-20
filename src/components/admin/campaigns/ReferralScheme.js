import React, { Component } from 'react';
import {
    Button, message, Switch,
} from 'antd';
import CKEditor from 'ckeditor4-react';

class ReferralScheme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            referrerDiscount: 0,
            newCustomerDiscount: 0,
            referrerEmailText: '',
            newCustomerEmailText: '',
        };
    }

    componentDidMount() {
        const {
            config: {
                referrerDiscount,
                newCustomerDiscount,
                referrerEmailText,
                newCustomerEmailText,
            },
        } = this.props;
        this.setState({
            referrerDiscount, newCustomerDiscount, referrerEmailText, newCustomerEmailText,
        });
    }

    referrerEmailChangeHandler = e => {
        this.setState({ referrerEmailText: e.editor.getData() });
    }

    newCustomerEmailTextChangeHandler = e => {
        this.setState({ newCustomerEmailText: e.editor.getData() });
    }

    toggleDiscount = (e, name) => {
        this.setState({
            [name]: e ? 100 : 0,
        });
    }

    update = () => {
        const {
            updateCampaignConfig, id, fetchCampaigns, closeModal,
        } = this.props;
        const {
            referrerDiscount, newCustomerDiscount, referrerEmailText, newCustomerEmailText,
        } = this.state;

        // Validation
        if (typeof referrerDiscount !== 'number' || typeof newCustomerDiscount !== 'number' || !referrerEmailText || !newCustomerEmailText) {
            return message.error('All fields are required');
        }

        // Numeric validations:
        const referrerDiscountNumber = Number.parseInt(referrerDiscount);
        const newCustomerDiscountNumber = Number.parseInt(newCustomerDiscount);
        if (Number.isNaN(referrerDiscountNumber) || Number.isNaN(newCustomerDiscountNumber)) {
            return message.error('Discounts must be whole numbers');
        }
        updateCampaignConfig(id, {
            referrerDiscount: referrerDiscountNumber,
            newCustomerDiscount: newCustomerDiscountNumber,
            referrerEmailText,
            newCustomerEmailText,
        }).then(res => {
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
        const {
            referrerDiscount, newCustomerDiscount, referrerEmailText, newCustomerEmailText,
        } = this.state;
        return (
            <div>
                <div className="descriptionText referrerEmailContent">
                    <span className="inputSpan">Referrer Email Content</span>
                    <CKEditor
                        name="referrerEmailText"
                        key='referrerEmailText'
                        data={referrerEmailText}
                        onChange={this.referrerEmailChangeHandler}
                        onBeforeLoad={cke => (cke.disableAutoInline = true)}
                    />
                </div>
                <br />
                <div className="small-input referrer-discount">
                    <span className="inputSpan">Referrer Discount</span>
                    <div>
                        <Switch
                            key='referrerDiscount'
                            checkedChildren="on"
                            unCheckedChildren="off"
                            checked={!!referrerDiscount}
                            onChange={e => this.toggleDiscount(e, 'referrerDiscount')}
                        />
                    </div>
                </div>
                <div className="descriptionText newCustomerEmailContent">
                    <span className="inputSpan">New Customer Email Content</span>
                    <CKEditor
                        name="newCustomerEmailText"
                        data={newCustomerEmailText}
                        onChange={this.newCustomerEmailTextChangeHandler}
                        onBeforeLoad={cke => (cke.disableAutoInline = true)}
                    />
                </div>
                <br />
                <div className="small-input new-customer-discount">
                    <span className="inputSpan">New Customer Discount</span>
                    <div>
                        <Switch
                            key='newCustomerDiscount'
                            checkedChildren="on"
                            unCheckedChildren="off"
                            checked={!!newCustomerDiscount}
                            onChange={e => this.toggleDiscount(e, 'newCustomerDiscount')}
                        />
                    </div>
                </div>
                <br />
                <Button type="primary" onClick={this.update}>Update</Button>
            </div>
        );
    }
}

export default ReferralScheme;
