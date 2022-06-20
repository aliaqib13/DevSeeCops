import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import ReactGA from 'react-ga';
import SectionCopyright from '../containers/public/home/SectionCopyright';
import { CATEGORIES, ACTIONS } from '../util/GAEventConstants';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
        Promise.all(
            [import('./landingStyles/footer.scss').then().catch()],
        ).then(() => {
            setTimeout(() => {
                this.setState({ loaded: true });
            }, 0);
        });
    }

    handleGAEvent = page => {
        if (page === 'fellowship') {
            ReactGA.event({
                category: CATEGORIES.WEBSITE_NAVIGATION,
                action: ACTIONS.ACCESSED_FELLOWSHIP_PAGE(),
                label: 'Clicked on "fellowship" in footer',
            });
        }
        if (page === 'subscribe') {
            ReactGA.event({
                category: CATEGORIES.NEWSLETTER,
                action: ACTIONS.USER_SUBSCRIBED(),
                label: 'Clicked on "Subscribe" button in footer',
            });
        }
        if (page === 'for-business') {
            ReactGA.event({
                category: CATEGORIES.WEBSITE_NAVIGATION,
                action: ACTIONS.ACCESSED_BUSINESS_PAGE(),
                label: 'Clicked on "for business" in footer',
            });
        }
        return true;
    }

    render() {
        return (
            <>
                {
                    (this.state.loaded)
                    && (
                        <>
                            <footer>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-2 offset-lg-2">
                                            <h2 className="title-heading-left fusion-responsive-typography-calculated footer-heading">NAVIGATE</h2>
                                            <ul>
                                                <li>
                                                    <Link to="/what-we-are">
                                                        <strong>Who we are</strong>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <a target="_blank" href="/platform/courses" rel="noopener noreferrer">
                                                        <strong>Our Courses</strong>
                                                    </a>
                                                </li>
                                                <li>
                                                    <Link to='/fellowship' onClick={() => this.handleGAEvent('fellowship')}>
                                                        <strong>Fellowship</strong>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <a
                                                        target="_blank"
                                                        href='/platform/fellow-gallery'
                                                        rel="noopener noreferrer"
                                                    >
                                                        <strong>Fellow Gallery</strong>
                                                    </a>
                                                </li>
                                                <li>
                                                    <Link to='/for-business' onClick={() => this.handleGAEvent('for-business')}>
                                                        <strong>For Business</strong>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <NavLink to='/news'>
                                                        <strong>News</strong>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <a
                                                        href="https://devsecopsacademy.recruitee.com/"
                                                        target='_blank'
                                                        rel="noopener noreferrer"
                                                    >
                                                        <strong>Careers</strong>
                                                    </a>
                                                </li>

                                            </ul>
                                        </div>
                                        <div className="col-lg-4">
                                            <Link to="/">
                                                {' '}
                                                <img
                                                    src="/img/images/logo.png"
                                                    alt=""
                                                    className="img-fluid mx-auto d-block footer-logo"
                                                />
                                                {' '}

                                            </Link>
                                        </div>
                                        <div className="col-lg-3 col-lg-1">
                                            <h2 className="title-heading-left fusion-responsive-typography-calculated text-center footer-heading">NEWSLETTER </h2>
                                            <form
                                                action="https://devsecops-academy.us20.list-manage.com/subscribe/post?u=df838d09f83cf22ff57a71110&amp;id=eb5e65a462"
                                                method="post"
                                                onSubmit={() => this.handleGAEvent('subscribe')}
                                                className='subscribe-button'
                                            >
                                                <div>
                                                    <Form.Item>
                                                        <Input
                                                            className="subscribe-email"
                                                            placeholder="Your email address"
                                                            type="email"
                                                            name="EMAIL"
                                                            required
                                                        />
                                                    </Form.Item>
                                                    <Form.Item>
                                                        <Button
                                                            className="subscribe"
                                                            htmlType="submit"
                                                        >
                                                            Subscribe
                                                        </Button>
                                                    </Form.Item>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </footer>
                            <SectionCopyright />
                        </>
                    )
                }
            </>
        );
    }
}

export { Footer };
export default withRouter(Footer);
