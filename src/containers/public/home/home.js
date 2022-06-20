import React, { Component } from 'react';
import { connect } from 'react-redux';
import Intro from '../../../components/public/home/Intro';
import SectionNews from '../../../components/public/home/SectionNews';
import SectionWhy from '../../../components/public/home/SectionWhy';
import SectionSarah from '../../../components/public/home/SectionSarah';
import SectionStart from '../../../components/public/home/SectionStart';
import SectionDennis from '../../../components/public/home/SectionDennis';
import SectionAbout from '../../../components/public/home/SectionAbout';
import SectionParts from '../../../components/public/home/SectionParts';
import { fetchSlider } from '../../../store/actions/public/home';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            news: {},
        };

        Promise.all(
            [import('./styles/home.scss').then().catch()],
            [import('./styles/animation.scss').then().catch()],
        ).then(() => {
            setTimeout(() => {
                this.setState({ loaded: true }, this.handleScroll);
            }, 0);
        });

        this.scrollPos = 0;
        window.addEventListener('scroll', () => {
            if ((document.body.getBoundingClientRect()).top <= this.scrollPos) {
                this.handleScroll();
            }
            this.scrollPos = (document.body.getBoundingClientRect()).top;
        });
    }

    async componentDidMount() {
        const { fetchSlider: fetchNews } = this.props;
        try {
            const response = await fetchNews();
            if (response) {
                this.setState({
                    news: response,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    elementInViewport = el => {
        if (el) {
            let top = el.offsetTop;
            let left = el.offsetLeft;
            const width = el.offsetWidth;
            const height = el.offsetHeight;

            while (el.offsetParent) {
                el = el.offsetParent;
                top += el.offsetTop;
                left += el.offsetLeft;
            }
            return (
                top >= window.pageYOffset
                && left >= window.pageXOffset
                && (top + height) <= (window.pageYOffset + window.innerHeight) + 500
                && (left + width) <= (window.pageXOffset + window.innerWidth)
            );
        }
        return false;
    }

    newsInViewport = el => {
        if (el) {
            let top = el.offsetTop;
            let left = el.offsetLeft;
            const width = el.offsetWidth;
            const height = el.offsetHeight;

            while (el.offsetParent) {
                el = el.offsetParent;
                top += el.offsetTop;
                left += el.offsetLeft;
            }

            return (
                top >= window.pageYOffset
                && left >= window.pageXOffset
                && (top + height) <= (window.pageYOffset + window.innerHeight) + 100
                && (left + width) <= (window.pageXOffset + window.innerWidth)
            );
        }
        return false;
    }

    handleScroll = () => {
        const el = document.getElementById('first-animation');
        const el1 = document.getElementById('second-animation');
        const el2 = document.getElementById('third-animation');
        const el3 = document.getElementById('fourth-animation');
        const el4 = document.getElementById('fifth-animation');
        const el5 = document.getElementById('sixth-animation');
        const el6 = document.getElementById('seventh-animation');
        const el7 = document.getElementById('eighth-animation');
        const el8 = document.getElementById('ninth-animation');
        const el9 = document.getElementById('tenth-animation');
        const el10 = document.getElementById('eleventh-animation');
        const el11 = document.getElementById('twelfth-animation');
        const el12 = document.getElementById('thirteenth-animation');

        const animLeft = ['animate__animated', 'animate__fadeInLeft'];
        const animRight = ['animate__animated', 'animate__fadeInRight'];
        const animUp = ['animate__animated', 'animate__fadeInUp'];

        const leftContainer = [el, el7, el8, el9];
        const rightContainer = [el1, el2, el3, el12];
        const upContainer = [el10, el11];

        if (el4 && el4.classList) {
            if (this.newsInViewport(el4)) {
                el4.classList.add(...animUp);
                el4.id = '';
            } else {
                el4.classList.remove(...animUp);
            }
        }

        if (el5 && el5.classList) {
            if (this.newsInViewport(el5)) {
                el5.classList.add(...animUp);
                el5.id = '';
            } else {
                el5.classList.remove(...animUp);
            }
        }

        if (el6 && el6.classList) {
            if (this.newsInViewport(el6)) {
                el6.classList.add(...animUp);
                el6.id = '';
            } else {
                el6.classList.remove(...animUp);
            }
        }

        leftContainer.forEach(item => {
            if (item && item.classList) {
                if (this.elementInViewport(item)) {
                    item.classList.add(...animLeft);
                    item.id = '';
                } else {
                    item.classList.remove(...animLeft);
                }
            }
        });

        rightContainer.forEach(item => {
            if (item && item.classList) {
                if (this.elementInViewport(item)) {
                    item.classList.add(...animRight);
                    item.id = '';
                } else {
                    item.classList.remove(...animRight);
                }
            }
        });

        upContainer.forEach(item => {
            if (item && item.classList) {
                if (this.elementInViewport(item)) {
                    item.classList.add(...animUp);
                    item.id = '';
                } else {
                    item.classList.remove(...animUp);
                }
            }
        });
    }

    render() {
        const { news } = this.state;
        return (
            <>
                {this.state.loaded
                && (
                    <>
                        <Intro />
                        <SectionNews
                            news={news}
                        />
                        <SectionWhy />
                        <SectionSarah />
                        <SectionStart />
                        <SectionDennis />
                        <SectionAbout />
                        <SectionParts />
                    </>
                )}
            </>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSlider: () => dispatch(fetchSlider()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
