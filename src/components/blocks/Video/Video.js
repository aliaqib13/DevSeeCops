import React from 'react';
import './Video.scss';

export default props => {
    const { content } = props;

    return (
        <div className="videoContainer" key={content.video}>
            <video controls width="100%">
                <source src={content.video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};
