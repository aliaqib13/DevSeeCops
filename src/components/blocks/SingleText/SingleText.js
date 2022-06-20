import React from 'react';
import HTMLSanitize from '../../HTMLSanitize/HTMLSanitize';
import './SingleText.scss';

export default props => {
    const { content } = props;
    return (
        <div className="single-text">
            <HTMLSanitize content={content.text} />
        </div>
    );
};
