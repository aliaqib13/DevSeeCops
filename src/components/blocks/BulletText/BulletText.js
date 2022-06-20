import React from 'react';
import './BulletText.scss';
import HTMLSanitize from '../../HTMLSanitize/HTMLSanitize';

export default props => {
    const { content } = props;
    return (
        <div className="bulletContainer">
            <ul className="bulletUl">
                {content.text.map((item, key) => (
                    <li key={key}>
                        {' '}
                        <HTMLSanitize content={item} />
                        {' '}
                    </li>
                ))}
            </ul>
        </div>
    );
};
