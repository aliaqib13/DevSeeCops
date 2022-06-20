import React, { Component } from 'react';
import { Carousel, Icon, message } from 'antd';
import { connect } from 'react-redux';
import FellowCard from '../../../components/fellow-card/fellow-card';
// import {fetchFellowGallery} from '../../store/actions/fellowGallery'
import { fetchPublicFellowGallery } from '../../../store/actions/public/fellow-gallery';
import '../../fellow-gallery/fellow-gallery.scss';

const SlickButtonFix = ({
    currentSlide, slideCount, children, ...props
}) => (
    <span {...props}>{children}</span>
);

class FellowGallery extends Component {
    state = {
        fellows: [],
    }

    componentDidMount() {
        const loader = message.loading('Loading..');

        this.props.fetchPublicFellowGallery().then(res => {
            if (res === false) {
                message.error('something went wrong please try again');
            } else {
                this.setState({
                    fellows: res,
                });
            }
            loader();
        });
    }

    render() {
        const { fellows } = this.state;
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: (fellows.length > 3) ? 3 : fellows.length,
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
                        slidesToShow: (fellows.length > 3) ? 3 : fellows.length,
                    },
                },
                {
                    breakpoint: 1080,
                    settings: {
                        slidesToShow: (fellows.length > 2) ? 2 : fellows.length,
                    },
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: (fellows.length > 3) ? 3 : fellows.length,
                    },
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: (fellows.length > 2) ? 2 : fellows.length,
                    },
                },
                {
                    breakpoint: 670,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        };
        return (
            <>
                {
                    (fellows)
                    && (
                        <div className="fellow-gallery-wrapper">
                            <div className="fellow-gallery">
                                <div className="title">
                                    Fellows working with DevSecOps Academy
                                    to provide you hands-on courses
                                </div>
                                <img className="superman-1" src="/img/fellow-gallery/superman1.svg" alt="Super Fellow" />
                                <div className="fellow-gallery-carousel">
                                    <img className="superman-2" src="/img/fellow-gallery/superman2.svg" alt="Super Fellow" />
                                    <Carousel {...settings}>
                                        {
                                            fellows.map(item => (
                                                <FellowCard
                                                    key={item.id}
                                                    name={item.name}
                                                    description={item.description}
                                                    img={item.image}
                                                    link={item.link || ''}
                                                />
                                            ))
                                        }
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        );
    }
}

function mapStateToProps(state) {

}

function mapDispatchToProps(dispatch) {
    return {
        fetchPublicFellowGallery: () => dispatch(fetchPublicFellowGallery()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FellowGallery);
