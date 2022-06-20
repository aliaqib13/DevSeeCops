import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import { CATEGORIES, ACTIONS } from '../../../util/GAEventConstants';

export const goToDennis = props => {
    props.history.push('/dennis');
    window.scrollTo(0, 0);
    ReactGA.event({
        category: CATEGORIES.WEBSITE_NAVIGATION,
        action: ACTIONS.ACCESSED_DENNIS_PAGE(),
        label: 'Clicked on "how DSOA works"',
    });
};

const SectionDennis = props => (
    <section id="dennis">
        <div className="container">
            <div className="row">
                <div className="col-lg-5" id="ninth-animation">
                    <h3
                        className="title-heading-left fusion-responsive-typography-calculated"
                        style={{
                            margin: '0px', fontSize: '22px', lineHeight: '1.3', color: '#004787',
                        }}
                    >
                        Dennis’ story
                    </h3>
                    <div
                        className="fusion-separator-border"
                        style={{ borderColor: '#004787', borderTopWidth: '4px' }}
                    />
                    <div className="fusion-text fusion-text-9" style={{ transform: 'translate3d(0,0,0)' }}>
                        <p>
                            <span
                                style={{ color: '#000000', fontSize: '16px' }}
                            >
                                I’ve been a contractor for Information Security and Risk services for most of my professional career.
                            </span>
                        </p>
                        <p>
                            <span style={{ color: '#000000', fontSize: '16px' }}>To stay informed with the latest security approaches, I'm always striving to cover new areas and keep up with trends.</span>
                        </p>
                        <p>
                            <span style={{ color: '#000000', fontSize: '16px' }}>The world's large-scale adoption of cloud computing and DevOps processes made it important for me to gain experience in these areas. DevSecOps Academy's hands-on learning paths help me to remain relevant for high profile assignments and challenges.</span>
                        </p>
                        <p>
                            <span style={{ color: '#000000', fontSize: '16px' }}>
                                This ongoing training has helped me to become a credible choice for companies' assignments to improve their Secure DevOps practices, particularly with regard to their cloud security.
                                What I value is the efficient nature of the courses which you can finish in one day. The learning structure also offers you many options to customize it to your level and time constraints.
                            </span>
                        </p>
                    </div>
                    <button className="fusion-button-text" onClick={() => goToDennis(props)}>
                        How DevSecOps Academy works
                    </button>

                </div>
                <div className="col-lg-3 l-5">
                    <p style={{ textAlign: 'left', color: '#000' }}>
                        <strong>Dennis Markish</strong>
                        <br />
                        Secrets Management Architect
                        <br />
                        Cloud Security Consultant
                    </p>
                </div>
                <div className="col-lg-4" id="tenth-animation">
                    <img
                        width="400"
                        height="588"
                        alt="Dennis Markish"
                        title="Dennis Markish"
                        src="/img/images/dennis-markish-400x588.png"
                        className="img-responsive wp-image-944 lazyautosizes lazyloaded"
                        sizes="133px"
                    />
                </div>
                <div className="col-lg-3 l-3">
                    <div className="fusion-text fusion-text-10" style={{ transform: 'translate3d(0,0,0)' }}>
                        <p
                            style={{ textAlign: 'right', fontFamily: "'Montserrat', sans-serif" }}
                        >
                            <span
                                style={{ color: '#ffffff', fontSize: '12px' }}
                            >
                                <strong>Dennis Markish</strong>
                            </span>
                            <br />
                            <span style={{ color: '#ffffff', fontSize: '12px' }}>Cloud Security Consultant</span>
                            <br />
                            <span style={{ color: '#ffffff', fontSize: '12px' }}>
                                <a
                                    style={{ color: '#ffffff' }}
                                    href="https://uk.linkedin.com/in/dennis-markish-6a4b5a203"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    LinkedIn
                                </a>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default withRouter(SectionDennis);
