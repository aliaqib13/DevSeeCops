import React from 'react';

const SectionAbout = () => (
    <section id="about">
        <h1
            className="title-heading-center fusion-responsive-typography-calculated"
            style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: '600',
                margin: '0px',
                color: 'rgb(255, 255, 255)',
                fontSize: '35px',
                lineHeight: '1.16',
            }}
            data-fontsize="35"
            data-lineheight="40.6px"
            id="twelfth-animation"
        >
            What people think about DevSecOps Academy
        </h1>
        <div
            className="fusion-separator"
            style={{
                alignSelf: 'center', margin: '35px auto 30px', width: '100%', maxWidth: '120px',
            }}
        >
            <div className="fusion-separator-border sep-single" style={{ borderColor: '#ffffff', borderTopWidth: '4px' }} />
        </div>
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <div className="review avatar-image" style={{ display: 'block' }}>
                        <p style={{ backgroundColor: 'rgba(249,249,251,0)', color: '#ffffff' }} className="fusion-clearfix">
                            ❝
                            Proud to announce I received my first hands-on certificate from DevSecOps Academy! The course
                            was very valuable and provided hands-on knowledge that I applied directly in my daily work.
                            Looking forward to more courses! ❞
                        </p>
                        <div className="author" style={{ color: '#ffffff' }}>
                            <div className="row">
                                <div className="col-lg-2">
                                    <img
                                        className="testimonial-image lazyloaded"
                                        src="/img/images/Patrick-Dronk.jpg"
                                        width="40"
                                        height="40"
                                        alt="Patrick Dronk"
                                        style={{ WebkitBorderRadius: '50%', MozBorderRadius: '50%', borderRadius: '50%' }}
                                        data-orig-src="/img/images/Patrick-Dronk.jpg"
                                    />
                                </div>
                                <div className="col-lg-10">
                                    <p className="company-name">
                                        <strong>Patrick Dronk</strong>
                                        ,
                                        {' '}
                                        <span>Java Software Engineer at Codecentric</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="review avatar-image" style={{ display: 'block' }}>
                        <p style={{ backgroundColor: 'rgba(249,249,251,0)', color: '#ffffff' }} className="fusion-clearfix">
                            ❝ I am
                            pleased to say I have completed one of the online hand-on Secrets Management trainings­ provided
                            by DevSecOps Academy. Looking forward to doing more of this kind of hands-on trainings! ❞
                        </p>
                        <div className="author" style={{ color: '#ffffff' }}>
                            <div className="row">
                                <div className="col-lg-2">
                                    <img
                                        className="testimonial-image lazyloaded"
                                        src="/img/images/Roland-Schijvenaars.jpg"
                                        width="40"
                                        height="40"
                                        alt="Patrick Dronk"
                                        style={{ WebkitBorderRadius: '50%', MozBorderRadius: '50%', borderRadius: '50%' }}
                                        data-orig-src="/img/images/Patrick-Dronk.jpg"
                                    />
                                </div>
                                <div className="col-lg-10">
                                    <p className="company-name">
                                        <strong>Roland Schijvenaars</strong>
                                        ,
                                        {' '}
                                        <span>Product Owner Azure DevOps at ABN AMRO Bank N.V.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="review avatar-image" style={{ display: 'block' }}>
                        <p style={{ backgroundColor: 'rgba(249,249,251,0)', color: '#ffffff' }} className="fusion-clearfix">
                            ❝ Secrets
                            Management, my favourite area! A pleasant experience with a very good platform and great
                            content. The hands on lab is really cool. It tests understanding and provides you with hints if
                            you are stuck. This was a great course! DevSecOps: keep up the great work! ❞

                        </p>
                        <div className="author" style={{ color: '#ffffff' }}>
                            <div className="row">
                                <div className="col-lg-2">
                                    <img
                                        className="testimonial-image lazyloaded"
                                        src="/img/images/Amit-Sharma2.jpg"
                                        width="40"
                                        height="40"
                                        alt="Patrick Dronk"
                                        style={{ WebkitBorderRadius: '50%', MozBorderRadius: '50%', borderRadius: '50%' }}
                                        data-orig-src="/img/images/Patrick-Dronk.jpg"
                                    />
                                </div>
                                <div className="col-lg-10">
                                    <p className="company-name">
                                        <strong>Amit Sharma</strong>
                                        ,
                                        {' '}
                                        <span>Security Expert at Synopsis</span>
                                        {' '}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </section>
);

export default SectionAbout;
