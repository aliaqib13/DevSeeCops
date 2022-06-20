import React from 'react';

const Register = () => (
    <>
        <div id="register">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12" id="sarah-animation3">
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
                    <div className="col-lg-12 text-center" id="sarah-animation4">
                        <a
                            className="fusion-button button-flat fusion-button-default-size button-custom button-6 fusion-button-default-span fusion-button-default-type"
                            target="_self"
                            rel="noopener noreferrer"
                            href={`${window.location.origin}/login`}
                        >
                            <span className="fusion-button-text">Start</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default Register;
