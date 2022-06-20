import React from 'react';

const SectionWhy = () => (
    <section id="why" className="why">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <h2
                        className="title-heading-center fusion-responsive-typography-calculated"
                        id="sixth-animation"
                    >
                        Be wanted and rewarded as an expert that combines software security with productivity
                    </h2>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <div id="seventh-animation">
                        <div className="row">
                            <div className="col-lg-6">
                                <p style={{ fontFamily: 'Open Sans', fontSize: '18px' }}>The world is experiencing:</p>
                                <ul>
                                    <li>the staggering growth of cloud native development</li>
                                    <li>paradigm shifts in handling security</li>
                                    <li>an explosion of technologies and tools</li>
                                    <li>a steep growing interest in software productivity</li>
                                    <li>blue-teams rat-racing against threat actors</li>
                                </ul>
                            </div>
                            <div className="col-lg-6">
                                <p style={{ fontFamily: 'Open Sans', fontSize: '18px' }}>The world needs you - the versatile polymath that can:</p>
                                <ul>
                                    <li>combine engineering and security mindsets</li>
                                    <li>convince others in the language of engineering, security and management</li>
                                    <li>automate security throughout the software development lifecycle</li>
                                    <li>create, control and coach simultaneously</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-2">

                    <div
                        style={{ backgroundImage: 'linear-gradient(rgb(104, 224, 207) 0%, rgb(42, 165, 249) 100%)' }}
                    >
                        <img
                            alt="Sarah Polan"
                            title="Sarah Polan"
                            width="623"
                            height="695"
                            src="/img/images/sarah-polan1.png"
                            data-orig-src="images/sarah-polan2.png"
                            className="img-fluid wp-image-946 lazyautosizes lazyloaded"
                            srcSet="/img/images/sarah-polan1.png 200w, /img/images/sarah-polan1.png 400w, /img/images/sarah-polan1.png 600w, /img/images/sarah-polan1.png 623w"
                            data-srcset="/img/images/sarah-polan2-200x223.png 200w, /img/images/sarah-polan2-400x446.png 400w, /img/images/sarah-polan2-600x669.png 600w, /img/images/sarah-polan2.png 623w"
                            data-sizes="auto"
                            data-orig-sizes="(max-width: 1000px) 100vw, (max-width: 640px) 100vw, 200px"
                            sizes="100px"
                        />
                        <a
                            className="fusion-button button-flat fusion-button-default-size button-custom button-2 fusion-button-span-yes fusion-button-default-type"
                            target="_self"
                            href="#sarah"
                            onClick={e => {
                                const sarah = document.getElementById('sarah');
                                e.preventDefault();

                                window.scrollTo({
                                    behavior: sarah ? 'smooth' : 'auto',
                                    top: sarah ? sarah.offsetTop - 136 : '136px',
                                });
                            }}
                        >
                            <span className="fusion-button-text">Sarah’s story</span>
                        </a>
                    </div>

                </div>
                <div className="col-lg-2">
                    <div
                        style={{ backgroundImage: 'linear-gradient(rgb(104, 224, 207) 0%, rgb(42, 165, 249) 100%)' }}
                    >
                        <img
                            alt="Dennies Polan"
                            title="Dennis Polan"
                            width="623"
                            height="695"
                            src="/img/images/dennis-markish2.png"
                            data-orig-src="images/dennis-markish2.png"
                            className="img-fluid wp-image-946 lazyautosizes lazyloaded"
                            srcSet="/img/images/dennis-markish2-200x223.png 200w, /img/images/dennis-markish2-400x446.png 400w, /img/images/dennis-markish2-600x669.png 600w, /img/images/dennis-markish2.png 623w"
                            data-srcset="/img/images/dennis-markish-200x223.png 200w, /img/images/dennis-markish-400x446.png 400w, /img/images/dennis-markish-600x669.png 600w, /img/images/dennis-markish2.png 623w"
                            data-sizes="auto"
                            data-orig-sizes="(max-width: 1000px) 100vw, (max-width: 640px) 100vw, 200px"
                            sizes="100px"
                        />
                        <a
                            className="fusion-button button-flat fusion-button-default-size button-custom button-2 fusion-button-span-yes fusion-button-default-type"
                            target="_self"
                            href="#dennis"
                            onClick={e => {
                                const dennis = document.getElementById('dennis');
                                e.preventDefault();

                                window.scrollTo({
                                    behavior: dennis ? 'smooth' : 'auto',
                                    top: dennis ? dennis.offsetTop - 136 : '136px',
                                });
                            }}
                        >
                            <span className="fusion-button-text">Dennis’ story</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <p style={{ fontFamily: 'Open Sans', fontSize: '22px' }}>
                        We believe that courage and a growth
                        mentality can make ANYONE an elite Secure DevOps engineer
                    </p>
                </div>
            </div>
        </div>
    </section>
);

export default SectionWhy;
