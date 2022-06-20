import React from 'react';
import './Image2.scss';

export default props => {
    const { content } = props;
    const { image } = content;

    return (
        <div className="imageContainerComponent">
            <img src={image} alt="theory" />
        </div>
    );
};
