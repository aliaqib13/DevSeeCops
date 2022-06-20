import React, { Component } from 'react';

class SectionCopyright extends Component {
    state = {
        shooTopToScroll: false,
    }

    checkScrollTop = () => {
        const { shooTopToScroll } = this.state;
        if (!shooTopToScroll && window.pageYOffset > 100) {
            this.setState({
                shooTopToScroll: true,
            });
        } else if (shooTopToScroll && window.pageYOffset <= 100) {
            this.setState({
                shooTopToScroll: false,
            });
        }
    }

    scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    render() {
        const { shooTopToScroll } = this.state;
        window.addEventListener('scroll', this.checkScrollTop);

        return (
            <>
                <section id="copyright">
                    <p
                        style={{
                            fontSize: '12px',
                            fontFamily: '\'Open Sans\', sans-serif',
                            fontWeight: '300',
                            textAlign: 'center',
                        }}
                        data-fusion-font="true"
                        data-fusion-google-font="Open Sans"
                        data-fusion-google-variant="300"
                        data-fusion-google-subset="latin"
                    >
                        <span style={{ color: '#ffffff' }}>
                            © Copyright 2021 | DevSecOps Academy | Webdesign by
                            <a
                                className="white"
                                href="https://www.katje.nl/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Kat Design
                            </a>
                            | Powered by
                            <a href="https://araido.io/" target="_blank" rel="noopener noreferrer"> Araido</a>
                        </span>
                    </p>
                </section>
                {
                    shooTopToScroll
                    && (
                        <button className="scroll_top" onClick={this.scrollTop} id='scrollToTop'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 24 24" fill="#fff">
                                <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
                            </svg>
                        </button>
                    )
                }

            </>
        );
    }
}

export default SectionCopyright;
