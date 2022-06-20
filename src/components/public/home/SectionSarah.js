import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import { CATEGORIES, ACTIONS } from '../../../util/GAEventConstants';

export const goToSarah = props => {
    props.history.push('/sarah');
    window.scrollTo(0, 0);
    ReactGA.event({
        category: CATEGORIES.WEBSITE_NAVIGATION,
        action: ACTIONS.ACCESSED_SARAH_PAGE(),
        label: 'Clicked on "how DSOA helped me"',
    });
};

const SectionSarah = props => (
    <section id="sarah">
        <img src="/img/images/seperator-blauw-beeld-rechts.png" alt="" className="img-fluid bg-img" />
        <div className="container">
            <div className="row">
                <div className="col-lg-5 f-5">
                    <p style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        <span style={{
                            color: '#ffffff',
                            fontSize: '12px',
                        }}
                        >
                            <strong>Sarah Polan</strong>
                        </span>
                        <br />
                        <span style={{
                            color: '#ffffff',
                            fontSize: '12px',
                        }}
                        >
                            Secrets Management Architect
                        </span>
                        <br />
                        <span style={{
                            color: '#ffffff',
                            fontSize: '12px',
                        }}
                        >
                            DevSecOps Academy Fellow
                        </span>
                        <br />
                        <span style={{ color: '#ffffff', fontSize: '12px' }}>
                            <a
                                style={{ color: '#ffffff' }}
                                href="https://www.linkedin.com/in/sarah-polan/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                        </span>
                    </p>
                    <img
                        width="868"
                        height="1002"
                        alt="The story of Sarah Polan"
                        title="The story of Sarah Polan"
                        src="/img/images/sarah-polan-secrets-management-architect.png"
                        id="eighth-animation"
                        className="img-fluid wp-image-1003 lazyautosizes lazyloaded"
                        data-sizes="auto"
                        data-orig-sizes="(max-width: 1000px) 100vw, (max-width: 640px) 100vw, 600px"
                        sizes="185px"
                    />
                </div>
                <div className="col-lg-7" id="thirteenth-animation">
                    <h3
                        className="title-heading-left fusion-responsive-typography-calculated"
                        style={{
                            margin: '0px', fontSize: '22px', lineHeight: '1.3', color: '#004787',
                        }}
                    >
                        Sarah’s story
                    </h3>
                    <div
                        className="fusion-separator-border"
                        style={{ borderColor: '#004787', borderTopWidth: '4px' }}
                    />
                    <div className="fusion-text fusion-text-6" style={{ transform: 'translate3d(0,0,0)' }}>
                        <p>
                            <span
                                style={{ color: '#000000', fontSize: '16px' }}
                            >
                                I used to work as an opera-singer.
                            </span>
                        </p>
                        <p>
                            <span style={{ color: '#000000', fontSize: '16px' }}>
                                I wanted to try different things, which led me to expand my horizons and
                                enter the world of IT and become interested in cybersecurity.
                            </span>
                        </p>
                        <p>
                            <span style={{ color: '#000000', fontSize: '16px' }}>
                                After gaining experience in the IT industry I got the opportunity to work with Araido, a DevSecOps consulting company. Araido’s partner company, the DevSecOps Academy helped me to understand and apply Secure DevOps concepts through their hands-on courses.
                            </span>
                            <br />
                            <span style={{ color: '#000000', fontSize: '16px' }}>
                                This helped me to become specialized in Secrets Management. I was even able to apply this knowledge by designing a Secrets Management Solution for ABN AMRO and provide training on it. This led to my current role as Secrets Management Architect at ABN AMRO.
                            </span>
                        </p>
                        <p>
                            <span style={{ color: '#000000', fontSize: '16px' }}>
                                Designing ways to share abstract knowledge with others and creating hands-on training for that, has been a very effective way for me to gain indepth expertise in Secrets Management, my chosen DevSecOps Learning Path.
                            </span>
                        </p>
                    </div>

                    <button className="fusion-button-text" onClick={() => goToSarah(props)}>
                        How DevSecOps Academy helped me
                    </button>

                </div>
                <div className="col-lg-5 l-5">
                    <div className="fusion-text fusion-text-8" style={{ transform: 'translate3d(0,0,0)' }}>
                        <p>
                            <strong>Sarah Polan</strong>
                            <br />
                            Secrets Management Architect
                            <br />
                            DevSecOps Academy Fellow
                            <br />
                            <a
                                href="https://www.linkedin.com/in/sarah-polan/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#000000' }}
                            >
                                LinkedIn
                            </a>
                        </p>
                    </div>
                    <img
                        width="868"
                        height="1002"
                        alt="The story of Sarah Polan"
                        title="The story of Sarah Polan"
                        src="/img/images/sarah-polan-secrets-management-architect.png"
                        data-orig-src="/img/images/sarah-polan-secrets-management-architect.png"
                        className="img-fluid wp-image-1003 lazyautosizes lazyloaded"
                        data-sizes="auto"
                        data-orig-sizes="(max-width: 1000px) 100vw, (max-width: 640px) 100vw, 600px"
                        sizes="185px"
                    />
                    <br />
                    <br />
                </div>
            </div>
        </div>
    </section>
);

export default withRouter(SectionSarah);
