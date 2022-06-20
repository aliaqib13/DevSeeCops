import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { connect } from 'react-redux';
import { message } from 'antd';
import sendForm from '../../../store/actions/public/sendForm';
import { validateEmail, validatePhoneNumber } from '../../../util/validators';

const GOOGLE_RECAPTCHA_SITEKEY = process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY || '6LeTvI8aAAAAAK2xpvowAVccQf6y8_ZqgBxp4aoC';
const antdMessage = message;

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.recaptchaRef = React.createRef();

        this.state = {
            loaded: false,
            email: '',
            name: '',
            number: '',
            message: '',
            ReCaptchaPassed: false,
            recaptchaKey: '',

        };

        Promise.all(
            [import('./contactUs.scss').then().catch()],
        ).then(() => {
            setTimeout(() => {
                this.setState({ loaded: true });
            }, 0);
        }).catch(console.error);
    }

    recaptchaPassed = value => {
        if (value) {
            this.setState({
                ReCaptchaPassed: true,
                recaptchaKey: value,
            });
        }
    }

    submitForm = () => {
        const {
            email, name, number, message: formMessage, ReCaptchaPassed, recaptchaKey,
        } = this.state;
        const { sendForm: sendFormFunc } = this.props;
        if ((email.length === 0) || (name.length === 0) || (formMessage.length === 0)) {
            return antdMessage.error('Please Fill All Fields');
        }
        if (number.length && !validatePhoneNumber(number)) {
            return antdMessage.error('Please Provide Valid Phone Number');
        }
        if (!ReCaptchaPassed) {
            return antdMessage.error('ReCaptcha not passed');
        }
        if (!validateEmail(email)) {
            return antdMessage.error('Please Provide Valid Email address');
        }
        const loader = antdMessage.loading('sending...', 0);
        return sendFormFunc({
            email, name, number, message: formMessage, recaptchaKey,
        }).then(res => {
            loader();
            if (res === false) {
                return antdMessage.error('something went wrong please try again ');
            }
            this.setState({
                email: '',
                name: '',
                number: '',
                message: '',
                ReCaptchaPassed: false,
                recaptchaKey: '',
            }, () => {
                this.recaptchaRef.current.reset();
            });
            return antdMessage.success('Thanks for message, We will connect to you as soon as we can!');
        }).catch(console.error);
    }

    onChangeFormItems = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        const {
            email, number, message, name, loaded,
        } = this.state;
        return (
            <>
                {loaded && (
                    <div className="global-container">
                        <div className="main">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h4 className="heading">Contact Us</h4>
                                        <p className="paragraph">Want to get in touch? We would love to hear from you.</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <input type="text" name="name" value={name} placeholder="Name..." onChange={this.onChangeFormItems} className="form-field" />
                                        <input type="email" name="email" value={email} placeholder="Email address..." onChange={this.onChangeFormItems} className="form-field" />
                                        <input type="text" name="number" value={number} placeholder="Phone number..." onChange={this.onChangeFormItems} className="form-field" />
                                        <textarea name="message" id="" value={message} rows="5" className="form-textarea" onChange={this.onChangeFormItems} placeholder="Message... " />
                                        <ReCAPTCHA
                                            ref={this.recaptchaRef}
                                            sitekey={GOOGLE_RECAPTCHA_SITEKEY}
                                            onChange={this.recaptchaPassed}
                                        />
                                        <button type="submit" onClick={this.submitForm} className="submit">Submit</button>
                                    </div>
                                    <div className="col-lg-6">
                                        <img src="/img/images/Group 2083.png" alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </>
        );
    }
}

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        sendForm: data => dispatch(sendForm(data)),
    };
}

export { ContactUs };
export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
