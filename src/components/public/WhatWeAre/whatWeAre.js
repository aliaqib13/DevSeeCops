import React, { Component } from 'react';

class WhatWeAre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };

        Promise.all(
            [import('./whatWeAre.scss').then().catch()],
        ).then(() => {
            setTimeout(() => {
                this.setState({ loaded: true });
            }, 0);
        });
    }

    render() {
        return (
            <>
                {this.state.loaded && (
                    <div className="global-container">
                        <div className="main">
                            <section id="story">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h1
                                                className="entry-title fusion-responsive-typography-calculated text-center"
                                                data-lineheight="62.64px"
                                                style={{ fontSize: '54px' }}
                                            >
                                                Who we are
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="background-gradient">
                                <div className="bgimg" />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <h2>
                                                We are
                                            </h2>
                                            <ul>
                                                <li>Young, diverse, and multicultural</li>
                                                <li>
                                                    We have a passion for software engineering and security productivity
                                                </li>
                                                <li>
                                                    Our partner company is Araido – a DevSecOps consulting company
                                                </li>
                                                <li>We like to coach people and help improve their skills</li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="img-block">
                                                <img src="/img/images/what-we-are.png" alt="" className='img-fluid' />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="block" />
                            <div className='hover-type-zoomin'>
                                <img src="/img/images/araido.jpg" alt="" className='img-fluid araido' />
                            </div>

                            <div className="container-fluid contact_us">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h1 className='contactUsText text-center'>Education is in Our Blood</h1>
                                        <p className='text-center '>
                                            Our expert instructors have more than 1000+ hours of
                                            teaching experience in various organizations and international conferences like
                                            Blackhat, OWASP AppSec, DevSecCon, and many more.
                                        </p>
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

export default WhatWeAre;
