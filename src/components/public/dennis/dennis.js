import React, { Component } from 'react';
import StoryDennis from './storyDennis';
import CourseDennis from './courseDennis';
import RegisterDennis from './registerDennis';
import Category from './category';
import LearningPath from './learningPath';
import Certificates from './certificates';

class Dennis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };

        Promise.all(
            [import('./dennis.scss').then().catch()],
            [import('../../../containers/public/home/styles/animation.scss').then().catch()],
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
                && (top + height) <= (window.pageYOffset + window.innerHeight) + 700
                && (left + width) <= (window.pageXOffset + window.innerWidth)
            );
        }
        return false;
    }

    firstElementInViewport = el => {
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
                && (top + height) <= (window.pageYOffset + window.innerHeight) + 1300
                && (left + width) <= (window.pageXOffset + window.innerWidth)
            );
        }
        return false;
    }

    handleScroll = () => {
        const el = document.getElementById('dennis-animation');
        const el1 = document.getElementById('dennis-animation1');
        const el2 = document.getElementById('dennis-animation2');
        const el3 = document.getElementById('dennis-animation3');
        const el4 = document.getElementById('dennis-animation4');
        const el5 = document.getElementById('dennis-animation5');
        const el6 = document.getElementById('dennis-animation6');
        const el7 = document.getElementById('dennis-animation7');
        const el8 = document.getElementById('dennis-animation8');

        const animLeft = ['animate__animated', 'animate__fadeInLeft'];
        const animRight = ['animate__animated', 'animate__fadeInRight'];
        const animUp = ['animate__animated', 'animate__fadeInUp'];

        const leftContainer = [el3, el5, el7];
        const rightContainer = [el4, el6, el8];
        const upContainer = [el2];

        if (el && el.classList) {
            if (this.firstElementInViewport(el)) {
                el.classList.add(...animLeft);
                el.id = '';
            } else {
                el.classList.remove(...animLeft);
            }
        }

        if (el1 && el1.classList) {
            if (this.firstElementInViewport(el1)) {
                el1.classList.add(...animRight);
                el1.id = '';
            } else {
                el1.classList.remove(...animRight);
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
        const { auth, history } = this.props;
        return (
            <>
                {this.state.loaded && (
                    <div>
                        <StoryDennis />
                        <CourseDennis />
                        <RegisterDennis />
                        <Category auth={auth} history={history} />
                        <RegisterDennis />
                        <LearningPath />
                        <RegisterDennis />
                        <Certificates />
                    </div>
                ) }
            </>

        );
    }
}

export default Dennis;
