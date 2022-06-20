import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Business extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };

        Promise.all(
            [import('./business.scss').then().catch()],
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
                                                For Business
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
                                            <ul>
                                                <li>
                                                    Are you planning to roll out a Secure DevOps solution?
                                                </li>
                                                <li>
                                                    Are you looking for solutions to complete your DevSecOps roadmap?
                                                </li>
                                                <li>
                                                    Or are you looking for Blue Team education in your DevOps field?
                                                </li>
                                            </ul>
                                            <h2>
                                                We deliver:
                                            </h2>
                                            <ul>
                                                <li>
                                                    Hands-on DevSecOps learning platform services.
                                                </li>
                                                <li>
                                                    From standard self-service to tailormade services.
                                                </li>
                                                <li>
                                                    With you in control of how your team profits from the training.
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="img-block">
                                                <img src="/img/images/Group 416.png" alt="" className='img-fluid' />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="container-fluid contact_us">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <p className='contactUsText text-center'>Contact us to find out about our enterprise services</p>
                                        <Link to="/contact-us">
                                            <button>Contact us</button>
                                        </Link>
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

export default Business;
