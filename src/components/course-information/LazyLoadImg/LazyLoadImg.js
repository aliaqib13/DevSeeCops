import React, { Component } from 'react';
import './lazyLoadImg.scss';

class LazyLoadImg extends Component {
    state = {
        loaded: false,
    };

    handleImageLoaded = () => {
        this.setState({
            loaded: true,
        });
    };

    render() {
        const { img, className } = this.props;

        return (
            <div className={`lazy-load-container ${className}`}>
                {!img
                    ? <div className={`lazy-load-skeleton ${className}-skeleton`} />
                    : (
                        <>
                            <div className={`lazy-load-skeleton ${className}-skeleton`} style={{ display: this.state.loaded ? 'none' : 'block' }} />
                            <img
                                style={{ display: this.state.loaded ? 'block' : 'none' }}
                                onLoad={this.handleImageLoaded.bind(this)}
                                src={img}
                                alt="lesson"
                            />
                        </>
                    )}
            </div>
        );
    }
}

export default LazyLoadImg;
