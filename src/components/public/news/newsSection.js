import React, { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import HTMLSanitize from '../../HTMLSanitize/HTMLSanitize';

export class NewsSection extends Component {
    state = {
        allPosts: [],
        posts: [],
        hasMore: true,
        currentPage: 1,
        pageSize: 3,
        totalPage: 0,
        total: 0,
    }

    componentDidMount() {
        const { news } = this.props;
        if (news) {
            const { currentPage, pageSize } = this.state;
            const posts = news.slice((currentPage - 1) * pageSize, (currentPage) * pageSize);
            const totalPage = Math.ceil(news.length / pageSize);
            const hasMore = !((totalPage < 2));
            this.setState({
                posts,
                totalPage,
                hasMore,
                allPosts: news,
                total: news.length,
            });
        }
    }

    loadMorePosts = () => {
        const {
            currentPage, totalPage, allPosts, pageSize,
        } = this.state;
        if (currentPage + 1 <= totalPage) {
            const curPage = currentPage + 1;
            const posts = allPosts.slice(0, curPage * pageSize);
            this.setState({
                posts,
                currentPage: currentPage + 1,
            });
        }
        if (currentPage + 1 >= totalPage) {
            this.setState({
                hasMore: false,
            });
        }
    }

    goSinglePage = item => {
        const { history } = this.props;
        history.push(`/news/post/${encodeURIComponent(item.slug)}`);
    }

    render() {
        const { news, type } = this.props;
        const { hasMore, posts } = this.state;
        return (
            <>
                <section className="container academy_news" style={{ marginTop: '2%' }}>
                    <h2 className='section_header' id='news2'>{type}</h2>
                    {
                        (news)
                        && (
                            <>
                                <div className="row">
                                    {
                                        posts.map((item, key) => (

                                            <div key={key} className="col-lg-4  col-md-6">
                                                <div
                                                    className="content"
                                                    onClick={() => this.goSinglePage(item)}
                                                >
                                                    <div className="content-overlay" />
                                                    <img
                                                        className="content-image img-fluid"
                                                        src={item.image}
                                                        alt=''
                                                    />
                                                    <div className="content-details fadeIn-left">
                                                        <img
                                                            src="/img/images/Group2.png"
                                                            className='img-fluid d-block mx-auto'
                                                            alt=""
                                                        />
                                                        <h4
                                                            className="fusion-rollover-title fusion-responsive-typography-calculated"
                                                            style={{ fontSize: '22px' }}
                                                        >
                                                            <p className="fusion-rollover-title-link">{item.title}</p>
                                                        </h4>
                                                    </div>
                                                </div>

                                                <div className="description_news">
                                                    <h2
                                                        className="blog-shortcode-post-title entry-title fusion-responsive-typography-calculated"
                                                        data-fontsize="20"
                                                        data-lineheight="26px"
                                                        style={{ fontSize: '20px' }}
                                                        onClick={() => this.goSinglePage(item)}
                                                    >
                                                        {item.title}
                                                    </h2>
                                                    <p className="fusion-single-line-meta">
                                                        By
                                                        <span className="vcard">
                                                            <span className="fn">
                                                                {item.author_name}
                                                            </span>
                                                            <span className="fusion-inline-sep">|</span>
                                                            <span>{moment(item.created_at).format('DD/MM/YYYY')}</span>
                                                        </span>
                                                    </p>
                                                    <div className="lines" />
                                                    <div
                                                        className="fusion-content-sep sep-double sep-solid"
                                                        style={{ borderColor: '#e2e2e2' }}
                                                    />
                                                    <div className="fusion-post-content-container">
                                                        {
                                                            item.text
                                                        && (
                                                            <p style={{ fontFamily: 'Montserrat', fontSize: '14px' }}>
                                                                <HTMLSanitize content={item.text.length > 200 ? `${(item.text).substring(0, 200 - 3)}...` : item.text} />
                                                            </p>
                                                        )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                {
                                    hasMore
                                && (
                                    <div
                                        className="fusion-load-more-button fusion-blog-button fusion-clearfix"
                                        onClick={this.loadMorePosts}
                                    >
                                        Load More Posts
                                    </div>
                                )
                                }
                            </>
                        )
                    }

                </section>
            </>
        );
    }
}

export default withRouter(NewsSection);
