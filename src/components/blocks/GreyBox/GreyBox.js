import React from 'react';
import HTMLSanitize from '../../HTMLSanitize/HTMLSanitize';
import './GreyBox.scss';

export default props => {
    const { content } = props;
    return (
        <div className="grey-box-container">
            <div>
                {
                    content.titles.map((item, key) => (
                        <div className="title-icon" key={key}>
                            <h2>{item}</h2>
                            <div className="ant-typography content">
                                <HTMLSanitize content={content.text[key]} />
                            </div>
                            <div className="gradient-icon" />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
