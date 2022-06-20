import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import NewsFromDevSecOps from '../../../components/public/news/newsFromDevSecOps';
import NewsSection from '../../../components/public/news/newsSection';
import { fetchNews } from '../../../store/actions/public/news';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            academyNews: null,
            communityNews: null,
        };

        Promise.all(
            [import('./news.scss').then().catch()],
            [import('../home/styles/animation.scss').then().catch()],
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
                && (top + height) <= (window.pageYOffset + window.innerHeight) + 500
                && (left + width) <= (window.pageXOffset + window.innerWidth)
            );
        }
        return false;
    }

    handleScroll = () => {
        const el1 = document.getElementById('news1');
        const el2 = document.getElementById('news2');
        const el3 = document.getElementById('news3');
        const el4 = document.getElementById('news4');

        const animRight = ['animate__animated', 'animate__fadeInRight'];
        const animUp = ['animate__animated', 'animate__fadeInUp'];
        const animDown = ['animate__animated', 'animate__fadeInDown'];

        const rightContainer = [el2, el3];
        const upContainer = [el4];
        const downContainer = [el1];

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

        downContainer.forEach(item => {
            if (item && item.classList) {
                if (this.elementInViewport(item)) {
                    item.classList.add(...animDown);
                    item.id = '';
                } else {
                    item.classList.remove(...animDown);
                }
            }
        });
    }

    componentDidMount() {
        const loader = message.loading('load news..', 0);
        this.props.fetchNews().then(res => {
            loader();
            if (res !== false) {
                const { academyNews, communityNews } = res;
                this.setState({
                    academyNews,
                    communityNews,
                });
            }
        });
    }

    render() {
        const { academyNews, communityNews } = this.state;
        return (
            <>
                {this.state.loaded
                && (
                    <div>
                        <NewsFromDevSecOps />
                        {academyNews
                    && (
                        <>
                            <NewsSection
                                news={academyNews}
                                type="Academy news"
                            />
                            <NewsSection
                                news={communityNews}
                                type="Community news"
                            />
                        </>
                    )}
                    </div>
                )}
            </>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        fetchNews: () => dispatch(fetchNews()),
    };
}

export { News };
export default connect(mapStateToProps, mapDispatchToProps)(News);
