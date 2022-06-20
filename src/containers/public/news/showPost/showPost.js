import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { message, Result, Button } from 'antd';
import PostInfo from '../../../../components/public/news/showPost/postInfo';
import Posts from '../../../../components/public/news/showPost/posts';
import RelatedPosts from '../../../../components/public/news/showPost/relatedPosts';
import { getPost } from '../../../../store/actions/public/news';

class ShowPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            post: null,
            relatedPosts: null,
        };

        Promise.all(
            [import('./examplePost.scss').then().catch()],
            [import('../../home/styles/animation.scss').then().catch()],
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
    };

    handleScroll = () => {
        const el1 = document.getElementById('second-animation');
        const el2 = document.getElementById('third-animation');
        const el3 = document.getElementById('fourth-animation');
        const el4 = document.getElementById('fifth-animation');
        const el5 = document.getElementById('sixth-animation');

        const animRight = ['animate__animated', 'animate__fadeInRight'];
        const animUp = ['animate__animated', 'animate__fadeInUp'];

        const rightContainer = [el1, el2, el3];
        const upContainer = [el4, el5];

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
    };

    componentDidMount() {
        this.fetchPost(this.props);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        const { relatedPosts } = this.state;
        if (relatedPosts) {
            this.fetchPost(nextProps);
        }
    }

    fetchPost = props => {
        const { slug } = props.match.params;
        this.props.getPost(slug).then(res => {
            if (res === false) {
                message.error('something went wrong please try again');
            } else {
                const { post, relatedPosts } = res;
                this.setState({
                    post,
                    relatedPosts,
                });
            }
        });
    }

    render() {
        const { post, relatedPosts } = this.state;
        return (
            <>
                {this.state.loaded && (
                    <div>
                        {
                            post
                                ? (
                                    <>
                                        <PostInfo
                                            post={post}
                                        />
                                        <Posts
                                            post={post}
                                        />
                                    </>
                                )
                                : (
                                    <Result
                                        style={{ marginTop: '7%' }}
                                        status="404"
                                        title="404"
                                        subTitle="Sorry, the page you visited does not exist."
                                        extra={<Link to="/"><Button type="primary"> Back Home</Button></Link>}
                                    />
                                )
                        }
                        {relatedPosts
                    && (
                        <RelatedPosts
                            posts={relatedPosts}
                        />
                    )}
                    </div>
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
        getPost: slug => dispatch(getPost(slug)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);
