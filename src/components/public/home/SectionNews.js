import React from 'react';
import Carousel from 'antd/es/carousel';
import { withRouter } from 'react-router-dom';

const SectionNews = props => {
    const { academyNews, communityNews } = props.news;

    const SampleNextArrow = prop => {
        const { onClick } = prop;
        return (
            <p className="carousel-control-next" role="button" data-slide="next" onClick={onClick}>
                <button className="control right-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 24 24" fill="#fff">
                        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
                    </svg>
                </button>
                <span className="sr-only">Next</span>
            </p>
        );
    };

    const SamplePrevArrow = prop => {
        const { onClick } = prop;
        return (
            <p onClick={onClick} className="carousel-control-prev" role="button" data-slide="prev">
                <button className="control left-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 24 24" fill="#fff">
                        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
                    </svg>
                </button>
                <span className="sr-only">Previous</span>
            </p>
        );
    };

    const settings = {
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    const goSinglePage = slug => {
        props.history.push(`/news/post/${encodeURIComponent(slug)}`);
    };
    return (
        <section id="news" className="news container">
            <div className="row">
                <div className="col-lg-6">
                    <h3>Academy news</h3>
                    {
                        academyNews
                        && (
                            <Carousel effect="fade" autoplay arrows {...settings}>
                                {
                                    academyNews.map((item, key) => (
                                        <div className="carousel-item" key={key}>
                                            <div
                                                className="news-img-block"
                                                onClick={() => goSinglePage(item.slug)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <img
                                                    className="content-image d-block w-100"
                                                    src={item.image}
                                                    alt="Second slide"
                                                />
                                                <div className="overlay">
                                                    <h3>{item.title}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </Carousel>
                        )
                    }

                </div>
                <div className="col-lg-6">
                    <h3>Community News</h3>
                    <Carousel effect="fade" autoplay arrows {...settings}>
                        {
                            communityNews
                            && communityNews.map((item, key) => (
                                <div className="carousel-item" key={key}>
                                    <div
                                        className="news-img-block"
                                        onClick={() => goSinglePage(item.slug)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img
                                            className="content-image d-block w-100"
                                            src={item.image}
                                            alt="Second slide"
                                        />
                                        <div className="overlay">
                                            <h3>{item.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Carousel>
                </div>
            </div>
            <div className="row">
                {/* <div className="col-lg-12">
                    <button className="read-more" data-aos="fade-up"
                            //onClick={() => window.location.href = '/public/home/news'}>Read more news
                            onClick={() => window.location.href = '#'}>Coming soon
                    </button>
                </div> */}
            </div>
            <div className="security" id="fifth-animation">
                <div className="row">
                    <div className="col-lg-4">
                        <img src="/img/images/security.png" alt="" className="img-fluid mx-auto d-block" />
                        <h2 className="text-center">Security meets productivity</h2>
                        <div
                            className="fusion-separator-border sep-single"
                            style={{ borderColor: '#004787', borderTopWidth: '4px' }}
                        />
                        <p className="fusion-text fusion-text-1">
                            Feel the power of automation through real life cases.
                            Improve pipelines to gain delivery speed while improving control over security. Training
                            created by experts worldwide.
                        </p>
                    </div>
                    <div className="col-lg-4 center_block">
                        <img src="/img/images/secured-internet.png" alt="" className="img-fluid mx-auto d-block" />
                        <h2 className="text-center">Browser-based hands-on labs</h2>
                        <div
                            className="fusion-separator-border sep-single"
                            style={{ borderColor: '#004787', borderTopWidth: '4px' }}
                        />
                        <p className="fusion-text fusion-text-1">
                            Practice labs are based on real-world scenarios with
                            hints and automated support. The in-browser resources offer you full flexibility,
                            start-stop-resume whenever you want. Preparation labs guide you in creating your own local
                            set-up. Customize your learning path and take Professional & Expert level exams.
                        </p>
                    </div>
                    <div className="col-lg-4">
                        <img src="/img/images/safety.png" alt="" className="img-fluid mx-auto d-block" />
                        <h2 className="text-center">Low barriers & flexible</h2>
                        <div
                            className="fusion-separator-border sep-single"
                            style={{ borderColor: '#004787', borderTopWidth: '4px' }}
                        />
                        <p className="fusion-text fusion-text-1">
                            Create group training events for your teams or clients.
                            Tailor-made, classroom or hybrid events.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { SectionNews };
export default withRouter(SectionNews);
