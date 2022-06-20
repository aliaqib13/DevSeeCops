import React, { Component } from 'react';
import {
    Button,
    Col,
    Row,
    Select,
    Form,
    DatePicker,
    Input,
    Spin,
    message,
    Upload,
    Icon,
    AutoComplete,
    Typography,
    Tooltip,
} from 'antd';
import './Promotion-codes.scss';

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

class PromotionCodes extends Component {
    state = this.initialState

    get initialState() {
        return {
            fetching: false,
            coupons: [],
            selectedCoupon: null,
            users: [],
            searchList: [],
            userEmails: [],
            promoCode: '',
            testEmailLoading: false,
            sendEmailLoading: false,
            testEmail: '',
            testSearchList: [],
            emailText: '',
            expirationDate: null,
            newUserEmails: [],
            sendNewUsersEmailLoading: false,
        };
    }

    componentDidMount() {
        const { fetchCoupons } = this.props;
        const loader = message.loading('load coupons..', 0);
        fetchCoupons().then(res => {
            if (res !== false) {
                this.setState({
                    coupons: res,
                });
            } else {
                message.error('can not load coupons');
            }
            loader();
        });
    }

    handleChangeCoupon = (value, params) => {
        const { key } = params;
        const selectedCoupon = { id: key, name: value };
        this.setState({ selectedCoupon });
    }

    onChangeExpirationDate = (value, dateString) => {
        this.setState({ expirationDate: dateString });
    }

    onChangePromoCode = e => {
        const { value } = e.target;
        this.setState({ promoCode: value }, () => {
            const checkPromo = new RegExp(/^[a-zA-Z0-9]*$/g).test(value);
            if (!checkPromo) {
                message.destroy();
                message.error('Promo code you provided is not valid', 3);
                setTimeout(() => {
                    this.setState({ promoCode: '' });
                }, 2000);
            }
        });
    }

    onSearchUser = userEmail => {
        const { searchUserByEmail } = this.props;
        this.setState({
            fetching: true,
        });
        if (userEmail.length > 3 && userEmail.length < 50) {
            searchUserByEmail(userEmail).then(res => {
                if (res !== false) {
                    const searchList = res.map(item => ({ id: item.id, email: item.email }));
                    this.setState({
                        searchList,
                        fetching: false,
                    });
                }
            });
        }
    }

    onSelectUserEmails = (email, props) => {
        const { key } = props;
        const userEmails = [...this.state.userEmails];
        const users = [...this.state.users];
        if (email === key) {
            return message.error('please select existing emails');
        }
        users.push(parseInt(key));
        userEmails.push(email);
        this.setState({ userEmails, users });
    }

    onDeselectUserEmails = (email, props) => {
        const { key } = props;
        const userEmails = [...this.state.userEmails];
        const users = [...this.state.users];
        users.splice(users.indexOf(parseInt(key)), 1);
        userEmails.splice(userEmails.indexOf(email), 1);
        this.setState({ users, userEmails });
    }

    uploadCSV = file => {
        const reader = new FileReader();
        reader.onload = e => {
            let uploadedCSV = e.target.result.split('\n');
            uploadedCSV = uploadedCSV.filter(item => item);
            uploadedCSV = uploadedCSV.map(item => String(item).trim());
            this.setState({
                userEmails: uploadedCSV,
            }, () => {
                message.success('uploaded');
            });
        };
        reader.readAsText(file);
    }

    uploadNewUserCSV = file => {
        const reader = new FileReader();
        reader.onload = e => {
            let uploadedCSV = e.target.result.split('\n');
            uploadedCSV = uploadedCSV.filter(item => item);
            uploadedCSV = uploadedCSV.map(item => {
                const str = String(item).replace(/;/g, ',');
                return {
                    firstname: str.split(',')[0],
                    lastname: str.split(',')[1],
                    email: str.split(',')[2],
                    linkedin_url: str.split(',')[3] || null,
                };
            });
            const index = uploadedCSV.findIndex(item => !item.firstname || !item.lastname || !item.email);
            const indexofDuplication = uploadedCSV.findIndex((item, index) => uploadedCSV.find((obj, i) => i !== index && obj.email === item.email));
            if (index >= 0) {
                this.setState({ newUserEmails: [] });
                return message.error(`The row in postion ${index + 1} is not complete`);
            }
            if (indexofDuplication >= 0) {
                this.setState({ newUserEmails: [] });
                return message.error(`The row in postion ${indexofDuplication + 1} has email duplication`);
            }
            this.setState({
                newUserEmails: uploadedCSV,
            }, () => {
                message.success('uploaded');
            });
        };
        reader.readAsText(file);
    }

    testSendingEmail = () => {
        const { testEmail, emailText, promoCode } = this.state;
        if (this.validateData(true) === true) {
            const fullPromoCode = this.generateFullPromoCode(promoCode);
            this.setState({ testEmailLoading: !this.state.testEmailLoading });
            this.props.sendTestEmail({ email: testEmail, promoCode: fullPromoCode, emailText }).then(res => {
                if (res !== false) {
                    message.success('Testing email sent successfully');
                    this.setState(
                        {
                            testEmail: '',
                            testEmailLoading: !this.state.testEmailLoading,
                        },
                    );
                }
            });
        } else {
            return false;
        }
    }

    generateFullPromoCode = promoCode => {
        let checkPromo = false;
        let result = '';

        do {
            result = promoCode + Math.random().toString(36).substring(5).substr(0, 7);
            checkPromo = new RegExp(/^[a-zA-Z0-9]*$/g).test(result);
        } while (!checkPromo);

        return result;
    }

    sendEmails = () => {
        const {
            userEmails, selectedCoupon, expirationDate, emailText, promoCode,
        } = this.state;

        if (this.validateData() === true) {
            const promoCodes = userEmails.map(item => ({
                email: item,
                promoCode: this.generateFullPromoCode(promoCode),
            }));
            this.setState({ sendEmailLoading: !this.state.sendEmailLoading });
            this.props.sendPromoCodes({
                promoCodes,
                coupon: selectedCoupon,
                emails: userEmails,
                expirationDate,
                emailText,
            })
                .then(res => {
                    if (res !== false) {
                        message.success('Sent!');
                        this.setState(
                            {
                                ...this.state.coupons,
                                emailText: '',
                                userEmails: [],
                                promoCode: '',
                                sendEmailLoading: !this.state.sendEmailLoading,
                            },
                        );
                    }
                });
        } else {
            return false;
        }
    }

    sendNewUserEmails = () => {
        const {
            newUserEmails, selectedCoupon, expirationDate, emailText, promoCode,
        } = this.state;
        if (this.validateData(false, true) === true) {
            const promoCodes = newUserEmails.map(item => ({
                firstname: String(item.firstname).trim(),
                lastname: String(item.lastname).trim(),
                email: String(item.email).trim(),
                linkedin_url: item.linkedin_url ? String(item.linkedin_url).trim() : null,
                promoCode: this.generateFullPromoCode(promoCode),
            }));
            this.setState({ sendNewUsersEmailLoading: true });
            this.props.sendPromoCodesNewUsers({
                promoCodes,
                coupon: selectedCoupon,
                expirationDate,
                emailText,
            })
                .then(res => {
                    if (res.message) {
                        message.error(res.message);
                    } else {
                        message.success('Sent!');
                        this.setState(
                            {
                                ...this.state.coupons,
                                emailText: '',
                                newUserEmails: [],
                                promoCode: '',
                                sendNewUsersEmailLoading: !this.state.sendNewUsersEmailLoading,
                            },
                        );
                    }
                });
        } else {
            return false;
        }
    }

    validateData = (testMode = false, newUsers = false) => {
        const {
            userEmails, emailText, expirationDate, selectedCoupon, promoCode, testEmail, newUserEmails,
        } = this.state;

        if (emailText === '') {
            return message.error('Please fill email text');
        }
        if (promoCode === '') {
            return message.error('Please fill promo code');
        }

        if (testMode) {
            const checkEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(testEmail);

            if (!checkEmail) {
                return message.error('Please add correct email address, this email is invalid');
            }
        } else {
            if (!expirationDate) {
                return message.error('Please select expiration date');
            }
            if (!selectedCoupon) {
                return message.error('Please select coupon');
            }
            if (userEmails.length === 0 && !newUsers) {
                return message.error('Please Select Emails');
            }
            if (newUserEmails.length === 0 && newUsers) {
                return message.error('Please upload csv for new users');
            }
        }
        return true;
    }

    onSearchTestEmail = testEmail => {
        this.setState({ testEmail });
        if (testEmail.length > 3) {
            this.props.searchUserByEmail(testEmail).then(res => {
                if (res !== false) {
                    const testSearchList = res.map(item => item.email);
                    this.setState({ testSearchList });
                }
            });
        }
    }

    onSelectTestEmail = testEmail => {
        this.setState({ testEmail });
    }

    onChangeEmailText = e => {
        this.setState({ emailText: e.target.value });
    }

    render() {
        const {
            fetching,
            searchList,
            userEmails,
            promoCode,
            testSearchList,
            testEmail,
            emailText,
            coupons,
            newUserEmails,
            testEmailLoading,
            sendEmailLoading,
            sendNewUsersEmailLoading,
        } = this.state;
        const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16, offset: 1 } };

        return (
            <div className="promotion-codes-container">
                <div className="promotion-codes-form">
                    <Row>
                        <Col span={12}>
                            <Form {...formItemLayout}>
                                <Form.Item label="Choose a Coupon">
                                    <Select
                                        size="default"
                                        placeholder="select coupon"
                                        onChange={this.handleChangeCoupon}
                                        style={{ width: '75%' }}
                                    >
                                        {coupons
                                            && coupons.map(item => <Option key={item.id} value={item.name}>{item.name}</Option>)}

                                    </Select>
                                </Form.Item>
                                <Form.Item label="Expiration Date">
                                    <DatePicker
                                        showTime
                                        placeholder="Select Time"
                                        onChange={this.onChangeExpirationDate}
                                    />
                                </Form.Item>
                                <Form.Item label="Promo Code Name">
                                    <Input
                                        placeholder="Please input the Promo Code"
                                        name='promoCode'
                                        value={promoCode}
                                        onChange={this.onChangePromoCode}
                                    />
                                </Form.Item>
                                <Form.Item label="Email Text" className="email-text-editor">
                                    <TextArea rows={4} value={emailText} name="emailText" onChange={this.onChangeEmailText} />
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '30px' }}>
                        <Form {...formItemLayout}>
                            <Col span={12}>
                                <Title level={3}>For existing users</Title>
                                <Form.Item label="Add Existing Users">
                                    <Select
                                        mode='tags'
                                        style={{ width: '100%' }}
                                        placeholder="search by email"
                                        value={userEmails}
                                        notFoundContent={fetching ? <Spin size="small" /> : null}
                                        filterOption={false}
                                        onDeselect={this.onDeselectUserEmails}
                                        onSelect={this.onSelectUserEmails}
                                        onSearch={this.onSearchUser}
                                    >
                                        {searchList.map(item => (
                                            <Select.Option key={item.id} value={item.email}>
                                                {item.email}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                    <div className="upload-csv-container">
                                        <Upload
                                            accept=".csv"
                                            showUploadList={false}
                                            beforeUpload={this.uploadCSV}
                                        >
                                            <Button>
                                                <Icon type="upload" />
                                                {' '}
                                                Click to Upload
                                            </Button>
                                        </Upload>
                                    </div>
                                    <AutoComplete
                                        className="search-test-email"
                                        size="large"
                                        dataSource={testSearchList}
                                        onSelect={this.onSelectTestEmail}
                                        placeholder="search email for testing"
                                        onSearch={this.onSearchTestEmail}
                                        value={testEmail}
                                    />
                                    <div style={{ display: 'flex' }}>
                                        <Button
                                            type="primary"
                                            className="send-test-email send-emails"
                                            loading={testEmailLoading}
                                            onClick={this.testSendingEmail}
                                        >
                                            Test
                                        </Button>
                                        <Button
                                            type="primary"
                                            className="send-all send-emails"
                                            loading={sendEmailLoading}
                                            onClick={this.sendEmails}
                                        >
                                            Send All
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Title level={3}>For new users</Title>
                                <Form.Item label="Add New Users">
                                    <div className="upload-csv-container">
                                        {newUserEmails.length
                                            ? (
                                                <Tooltip title="Uploaded">
                                                    <span className="uploaded-tick">
                                                        <Icon type="check" style={{ fontSize: '16px', marginRight: '15px' }} />
                                                    </span>
                                                </Tooltip>
                                            ) : ''}
                                        <Upload
                                            className="space-from-left"
                                            accept=".csv"
                                            showUploadList={false}
                                            beforeUpload={this.uploadNewUserCSV}
                                        >
                                            <Button>
                                                <Icon type="upload" />
                                                {' '}
                                                Click to Upload
                                            </Button>
                                        </Upload>
                                        <Tooltip title="CSV format should be 'firstname, lastname, email, linkedin url (optional)'. Semicolons also work in between values.">
                                            <Button type="primary" name="course-info" shape="circle" icon="info" size="small" className="small-space-from-left" />
                                        </Tooltip>
                                        <Button
                                            type="primary"
                                            className="send-all space-from-left"
                                            loading={sendNewUsersEmailLoading}
                                            onClick={this.sendNewUserEmails}
                                        >
                                            Send All
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Col>
                        </Form>
                    </Row>
                </div>
            </div>
        );
    }
}

export default PromotionCodes;
