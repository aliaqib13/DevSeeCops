import React from 'react';
import './Image.scss';

export default props => {
    const { content } = props;
    const { height, width, image } = content;

    if (
        typeof image !== 'string'
        && !Array.isArray(image)) {
        console.error('Invalid prop content: ', content);
        return null;
    }

    return (
        <>
            {
                typeof image === 'string'
                    ? (
                        <div className="imageContainerComponent">
                            <img src={image} alt="theory" width={width} height={height} />
                        </div>
                    )
                    : (
                        <div className="imageContainerComponent imagesContainer">
                            {image.map(item => (
                                <img src={item.src} alt={`theory-${JSON.stringify(item)}`} key={JSON.stringify(item)} />
                            ))}
                        </div>
                    )
            }
        </>
    );
};
