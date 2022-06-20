import React, { Component } from 'react';
import { Carousel, Icon } from 'antd';
import CertificateCard from '../CertificateCard';
import './certificateCarousel.scss';

const SlickButtonFix = ({
    currentSlide, slideCount, children, ...props
}) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <span {...props}>{children}</span>
);

class CertificateCarousel extends Component {
    render() {
        const {
            showEmailModal, type,
        } = this.props;
        let { certificates } = this.props;
        certificates = certificates.filter(item => {
            if (type === 'classic' && item.image && item.image.length > 0) {
                return item;
            }
            if (type === 'badge' && item.badge && item.badge.length > 0) {
                return item;
            }
            return false;
        });
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: (certificates.length > 3) ? 3 : certificates.length,
            slidesToScroll: 1,
            arrows: true,
            className: 'certificate-carousel',
            swipeToSlide: true,
            swipe: true,
            nextArrow: <SlickButtonFix><Icon type="right-circle" /></SlickButtonFix>,
            prevArrow: <SlickButtonFix><Icon type="left-circle" /></SlickButtonFix>,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: (certificates.length > 3) ? 3 : certificates.length,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 1080,
                    settings: {
                        slidesToShow: (certificates.length > 2) ? 2 : certificates.length,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: (certificates.length > 3) ? 3 : certificates.length,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: (certificates.length > 2) ? 2 : certificates.length,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 670,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        };
        return (
            <Carousel {...settings}>
                {
                    certificates.map((item, key) => (
                        <CertificateCard
                            key={key}
                            showEmailModal={showEmailModal}
                            certificate={item}
                            type={type}
                        />
                    ))
                }
            </Carousel>
        );
    }
}

export default CertificateCarousel;
