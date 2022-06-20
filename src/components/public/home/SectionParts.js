import React from 'react';
import { HashLink } from 'react-router-hash-link';
import ReactGA from 'react-ga';
import { CATEGORIES, ACTIONS } from '../../../util/GAEventConstants';

const SectionParts = () => {
    const scrollWithOffset = (el, offset) => {
        const elementPosition = el.offsetTop - offset;
        window.scroll({
            top: elementPosition,
            behavior: 'smooth',
        });
    };

    const handleGAEvent = image => {
        ReactGA.event({
            category: CATEGORIES.WEBSITE_NAVIGATION,
            action: ACTIONS.ACCESSED_DENNIS_PAGE(),
            label: `Clicked on ${image}`,
        });
    };

    return (
        <section id="parts">
            <img src="/img/images/seperator-dblauw-beeldrechts.png" alt="" className="img-fluid bg-img" />
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <HashLink
                            to="/dennis#course"
                            onClick={() => handleGAEvent('structure')}
                            scroll={el => scrollWithOffset(el, 150)}
                        >
                            <h3
                                className="title-heading-center fusion-responsive-typography-calculated"
                                style={{ fontSize: '24px' }}
                            >
                                Structure of
                                courses
                            </h3>
                            <img
                                alt="Categories"
                                title="labs"
                                src="/img/images/labs.png"
                                data-orig-src="img/images/labs.png"
                                className="img-responsive wp-image-1435 lazyautosizes lazyloaded"
                                data-sizes="auto"
                                data-orig-sizes="(max-width: 1000px) 100vw, (max-width: 640px) 100vw, 400px"
                                sizes="91px"
                            />
                        </HashLink>
                    </div>
                    <div className="col-lg-3">
                        <HashLink
                            to="/dennis#category"
                            onClick={() => handleGAEvent('categories')}
                            scroll={el => scrollWithOffset(el, 150)}
                        >
                            <h3
                                className="title-heading-center fusion-responsive-typography-calculated"
                                style={{ fontSize: '24px' }}
                            >
                                Categories
                            </h3>
                            <img
                                alt="Categories"
                                title="Categories"
                                src="/img/images/Group 331.jpg"
                                data-orig-src="/img/images/DevOps-categories-only-icons.png"
                                className="img-responsive wp-image-1431 lazyautosizes lazyloaded"
                                data-sizes="auto"
                                data-orig-sizes="(max-width: 1000px) 100vw, (max-width: 640px) 100vw, 400px"
                                sizes="91px"
                            />
                        </HashLink>
                    </div>
                    <div className="col-lg-3">
                        <HashLink
                            to="/dennis#learning_path"
                            scroll={el => scrollWithOffset(el, 150)}
                            onClick={() => handleGAEvent('learningpath')}
                        >
                            <h3
                                className="title-heading-center fusion-responsive-typography-calculated"
                                style={{ fontSize: '24px' }}
                            >
                                Learning paths
                            </h3>
                            <img
                                alt="Learning Paths"
                                title="Learning Paths"
                                src="/img/images/2.png"
                                data-orig-src="/img/images/updated-learning-path.png"
                                className="img-responsive wp-image-986 lazyautosizes lazyloaded"
                                data-sizes="auto"
                                data-orig-sizes="(max-width: 1000px) 100vw, (max-width: 640px) 100vw, 400px"
                                sizes="122px"
                            />
                        </HashLink>
                    </div>
                    <div className="col-lg-3">
                        <HashLink
                            to="/dennis#certificates"
                            scroll={el => scrollWithOffset(el, 150)}
                            onClick={() => handleGAEvent('certification')}
                        >
                            <h3
                                className="title-heading-center fusion-responsive-typography-calculated"
                                style={{
                                    fontSize: '24px',
                                }}
                            >
                                Certification
                            </h3>
                            <img
                                alt="Certification"
                                title="Certification"
                                src="/img/images/PROFESSIONAL.png"
                                data-orig-src="/img/images/master-degree-400x212.png"
                                className="img-responsive wp-image-956 lazyautosizes lazyloaded"
                                data-sizes="auto"
                                data-orig-sizes="(max-width: 1000px) 100vw, (max-width: 640px) 100vw, 400px"
                                sizes="103px"
                            />
                        </HashLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionParts;
