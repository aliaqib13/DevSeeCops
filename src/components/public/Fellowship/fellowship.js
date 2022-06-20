import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Fellowship extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };

        Promise.all(
            [import('./fellowship.scss').then().catch()],
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
                                                Fellowship
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
                                            <h1 className='header-text'>Become a Fellow</h1>
                                            <br />
                                            <p className='fellow-text'>
                                                DevSecOps Academy is being developed in collaboration with Fellows who are
                                                experts on
                                                Secure DevOps best practices. These Fellows range from
                                                {' '}
                                                <span
                                                    className="red"
                                                >
                                                    {' '}
                                                    companies
                                                </span>
                                                of all sizes,
                                                to
                                                {' '}
                                                <span className="red"> local communities</span>
                                                {' '}
                                                and
                                                {' '}
                                                <span
                                                    className="red"
                                                >
                                                    {' '}
                                                    individuals
                                                </span>
                                                .
                                            </p>
                                            <h6>
                                                Benefits for you as a
                                                <span className="red"> Fellow</span>
                                                {' '}
                                                are:
                                            </h6>
                                            <ul>
                                                <li>
                                                    <span className="red">Visibility</span>
                                                    {' '}
                                                    in the worldwide DevSecOps
                                                    trainer &
                                                    engineering community
                                                </li>
                                                <li>
                                                    Improve your security tooling or approach with
                                                    <span className="red">expert feedback</span>
                                                </li>
                                                <li>
                                                    <span className="red">VIP access to</span>
                                                    {' '}
                                                    DevSecOps Academy courses
                                                </li>
                                                <li>
                                                    Extra training to drive the use of Secure DevOps services to ensure
                                                    a
                                                    <span
                                                        className="red"
                                                    >
                                                        {' '}
                                                        successful
                                                        implementation
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="img-block">
                                                <img src="/img/images/Group 382.png" alt="" className='img-fluid' />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="container-fluid contact_us">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <p className='contactUsText text-center'>Contact us if you like to know more</p>
                                        <Link to="/contact-us">
                                            <button>Contact us</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <video height="340" className='mx-auto d-block' controls>
                                            <source
                                                src="/img/images/Fellowship-program.mp4"
                                                type="video/mp4"
                                            />
                                        </video>
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

export default Fellowship;
