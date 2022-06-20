import React, { Component } from 'react';
import { Layout } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CookieConsent from 'react-cookie-consent';
import { withRouter, Link } from 'react-router-dom';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './PageFooter.scss';

const { Footer } = Layout;

class PageFooter extends Component {
    render() {
        return (
            <Footer className="main-footer">
                <CookieConsent
                    location="bottom"
                    buttonText="Accept"
                    cookieName="AraidoCookie"
                    buttonWrapperClasses="cookie-decline-button"
                    style={{ background: '#2B373B' }}
                    buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
                    expires={150}
                    sameSite="lax"
                    buttonClasses="cookie-apply-button"
                >

                    This site uses cookies for improving performance and features. To know more about how we protect
                    your privacy, please read our
                    <Link className="cookie-privacy-button" target="_blank" to="/policy" style={{ color: '#fff' }}>Privacy policy</Link>
                </CookieConsent>

                <span style={{ textAlign: 'center' }}>
                    DevSecOps Academy ©
                    {' '}
                    {new Date().getFullYear()}
                    {' '}
                    made with
                    {' '}
                    <FontAwesomeIcon icon={faHeart} />
                    {' '}
                    by Araido and powered by the worldwide security community
                </span>
            </Footer>
        );
    }
}

export default withRouter(PageFooter);
