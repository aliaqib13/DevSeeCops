import React from 'react';

const RegisterDennis = () => (
    <>
        <div id="register">
            <div className="container">
                <div className="row" id="dennis-animation2">
                    <div className="col-lg-12">
                        <h1
                            className="title-heading-center fusion-responsive-typography-calculated text-center"
                            style={{
                                fontFamily: "'Open Sans', sans-serif",
                                fontWeight: '600',
                                marginBottom: '20px',
                                color: 'rgb(255, 255, 255)',
                                fontSize: '35px',
                            }}
                        >
                            Determine your DevSecOps Learning Path with
                            <br />
                            the free Introduction Tour
                        </h1>
                    </div>
                    <div className="col-lg-12 text-center">
                        <a
                            className="fusion-button button-flat fusion-button-default-size button-custom button-6 fusion-button-default-span fusion-button-default-type"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`${window.location.origin}/login`}
                        >
                            <span className="fusion-button-text">Start</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <img src="/img/images/bg.png" alt="" className="img-fluid bg-img" />
    </>
);

export default RegisterDennis;
