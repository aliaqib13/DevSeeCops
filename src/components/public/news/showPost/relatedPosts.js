import React from 'react';
import { withRouter } from 'react-router-dom';
import { Carousel, Row, Col } from 'antd';

const RelatedPosts = props => {
    const { posts } = props;
    const SampleNextArrow = props => {
        const { onClick } = props;
        return (
            <p className="carousel-control-next next-button" role="button" data-slide="next" onClick={onClick}>
                <button className="control right-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 24 24" fill="#fff">
                        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
                    </svg>
                </button>
                <span className="sr-only">Next</span>
            </p>
        );
    };

    const SamplePrevArrow = props => {
        const { onClick } = props;
        return (
            <p onClick={onClick} className="carousel-control-prev prev-button" role="button" data-slide="prev">
                <button className="control left-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 24 24" fill="#fff">
                        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
                    </svg>
                </button>
                <span className="sr-only">Previous</span>
            </p>
        );
    };
    const goSinglePage = (e, item) => {
        e.preventDefault();
        window.scrollTo({ top: 150, behavior: 'smooth' });
        props.history.push(`/news/post/${encodeURIComponent(item.slug)}`, [{ post: item }]);
    };

    const settings = {
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: (posts.length > 3) ? 3 : posts.length,
        slidesToScroll: 1,
        arrows: true,
        className: 'quotes-carousel',
        swipeToSlide: true,
        swipe: true,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: (posts.length > 2) ? 2 : posts.length, // need to specify comments length
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: (posts.length > 2) ? 2 : posts.length,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: (posts.length > 2) ? 2 : posts.length, // need to specify comments length
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 690,
                settings: {
                    slidesToShow: (posts.length > 2) ? 2 : posts.length,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <section className='posts-slider'>
                {
                    (posts.length > 0)
                    && (
                        <Row>
                            <Col span={17} offset={3}>
                                <h1>Related Posts</h1>
                                <Carousel {...settings} id="sixth-animation">
                                    {
                                        posts.map((post, key) => (
                                            <div className="" key={key}>
                                                <div className="fusion-rollover" style={{ padding: '10px' }}>
                                                    <a
                                                        className="fusion-rollover-title-link"
                                                        href='/'
                                                        onClick={e => goSinglePage(e, post)}
                                                    >
                                                        <div className="content">
                                                            <div className="content-overlay" />
                                                            <img
                                                                className="content-image img-fluid"
                                                                src={post.image}
                                                                alt=""
                                                            />
                                                            <div className="content-details fadeIn-left">
                                                                <img
                                                                    src="/img/images/Group2.png"
                                                                    style={{ width: '35px', marginTop: '-60px' }}
                                                                    className='img-fluid d-block mx-auto'
                                                                    alt=""
                                                                />
                                                                <h4
                                                                    className="fusion-rollover-title fusion-responsive-typography-calculated"
                                                                    style={{ fontSize: '22px' }}
                                                                >
                                                                    {post.title}
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </Carousel>
                            </Col>
                        </Row>
                    )
                }

            </section>
        </>
    );
};

export default withRouter(RelatedPosts);
