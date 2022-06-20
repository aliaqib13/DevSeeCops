import React from 'react';
import './ParagraphTitle';

export default props => {
    const { content } = props;
    return (
        <div className="paragraph-title-container">
            {
                content.text && <h3>{content.text}</h3>
            }
        </div>
    );
};
