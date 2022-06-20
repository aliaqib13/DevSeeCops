import React from 'react';

const CourseDennis = () => (
    <>
        <div id="course">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8" id="dennis-animation">
                        <h2
                            className="title-heading-left fusion-responsive-typography-calculated"
                            style={{ marginTop: '50px', fontSize: '30px' }}
                        >
                            Course Structure
                        </h2>
                        <video
                            playsInline
                            width="100%"
                            style={{ objectFit: 'cover', padding: '25px 40px 40px 0' }}
                            autoPlay
                            loop
                            muted
                            preload="auto"
                            controls="1"
                        >
                            <source
                                src="/img/images/Labs_walkthrough_subtitles.mp4"
                                type="video/mp4"
                            />
                            Sorry, your browser doesn't support embedded videos.

                        </video>
                        <ul
                            className="fusion-checklist fusion-checklist-1"
                            style={{ fontSize: '16px' }}
                        >
                            <li className="fusion-li-item">
                                <span
                                    style={{ height: '27.2px', width: '27.2px', marginRight: '11.2px' }}
                                    className="icon-wrapper circle-no"
                                >
                                    <i className="fa fa-check" aria-hidden="true" />
                                </span>
                                <div className="fusion-li-item-content" style={{ marginLeft: '38.4px' }}>
                                    <p>Real resources in a controlled environment</p>
                                </div>
                            </li>
                            <li className="fusion-li-item">
                                <span
                                    style={{ height: '27.2px', width: '27.2px', marginRight: '11.2px' }}
                                    className="icon-wrapper circle-no"
                                >
                                    <i className="fa fa-check" aria-hidden="true" />
                                </span>
                                <div className="fusion-li-item-content" style={{ marginLeft: '38.4px' }}>
                                    <p>A cookbook to learn how to create a similar local-setup for yourself</p>
                                </div>
                            </li>
                            <li className="fusion-li-item">
                                <span
                                    style={{ height: '27.2px', width: '27.2px', marginRight: '11.2px' }}
                                    className="icon-wrapper circle-no"
                                >
                                    <i className="fa fa-check" aria-hidden="true" />
                                </span>
                                <div className="fusion-li-item-content" style={{ marginLeft: '38.4px' }}>
                                    <p>Real life cases to improve security and compliance workflows</p>
                                </div>
                            </li>
                            <li className="fusion-li-item">
                                <span
                                    style={{ height: '27.2px', width: '27.2px', marginRight: '11.2px' }}
                                    className="icon-wrapper circle-no"
                                >
                                    <i className="fa fa-check" aria-hidden="true" />
                                </span>
                                <div className="fusion-li-item-content" style={{ marginLeft: '38.4px' }}>
                                    <p>Many different tools</p>
                                </div>
                            </li>
                            <li className="fusion-li-item">
                                <span
                                    style={{ height: '27.2px', width: '27.2px', marginRight: '11.2px' }}
                                    className="icon-wrapper circle-no"
                                >
                                    <i className="fa fa-check" aria-hidden="true" />
                                </span>
                                <div className="fusion-li-item-content" style={{ marginLeft: '38.4px' }}>
                                    <p>Automated checking and feedback</p>
                                </div>
                            </li>
                            <li className="fusion-li-item">
                                <span
                                    style={{ height: '27.2px', width: '27.2px', marginRight: '11.2px' }}
                                    className="icon-wrapper circle-no"
                                >
                                    <i className="fa fa-check" aria-hidden="true" />
                                </span>
                                <div className="fusion-li-item-content" style={{ marginLeft: '38.4px' }}>
                                    <p>Various levels and hints to proceed when needed</p>
                                </div>
                            </li>
                            <li className="fusion-li-item">
                                <span
                                    style={{ height: '27.2px', width: '27.2px', marginRight: '11.2px' }}
                                    className="icon-wrapper circle-no"
                                >
                                    <i className="fa fa-check" aria-hidden="true" />
                                </span>
                                <div className="fusion-li-item-content" style={{ marginLeft: '38.4px' }}>
                                    <p>Great flexibility to start and complete the course</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-4" id="dennis-animation1">
                        <p>
                            <em>
                                “These courses provided me maximum learning effect while providing great flexibility
                                in my busy
                                agenda.
                            </em>
                            <br />
                            <em>
                                I got to understand and access to tools I would not have explored otherwise by
                                myself”
                            </em>
                        </p>
                        <img src="/img/images/dennis4-400x725.png" alt="" className="img-fluid " />
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default CourseDennis;
