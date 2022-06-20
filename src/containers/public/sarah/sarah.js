import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Story from '../../../components/public/sarah/story';
import Course from '../../../components/public/sarah/course';
import Register from '../../../components/public/sarah/register';

class Sarah extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };

        Promise.all(
            [import('./sarah.scss').then().catch()],
            [import('../home/styles/animation.scss').then().catch()],
        ).then(() => {
            setTimeout(() => {
                this.setState({ loaded: true }, this.handleScroll);
            }, 0);
        }).catch(console.error);

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
              && (top + height) <= (window.pageYOffset + window.innerHeight) + 400
              && (left + width) <= (window.pageXOffset + window.innerWidth)
            );
        }
        return false;
    }

    handleScroll = () => {
        const el = document.getElementById('sarah-animation');
        const el1 = document.getElementById('sarah-animation1');
        const el2 = document.getElementById('sarah-animation2');
        const el3 = document.getElementById('sarah-animation3');
        const el4 = document.getElementById('sarah-animation4');

        const animLeft = ['animate__animated', 'animate__fadeInLeft'];
        const animRight = ['animate__animated', 'animate__fadeInRight'];
        const animUp = ['animate__animated', 'animate__fadeInUp'];

        const leftContainer = [el, el1];
        const rightContainer = [el2];
        const upContainer = [el3, el4];

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
        const { loaded } = this.state;
        return (
            <>
                {loaded && (
                    <div>
                        <Story />
                        <Course auth={auth} history={history} />
                        <Register />
                    </div>
                )}
            </>

        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

const mapDispatchToProps = () => ({

});
export { Sarah };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sarah));
