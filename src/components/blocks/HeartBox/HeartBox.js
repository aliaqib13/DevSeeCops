import React from 'react';
import './HeartBox.scss';
import { Icon } from 'antd';
import HTMLSanitize from '../../HTMLSanitize/HTMLSanitize';

export default props => {
    const { content } = props;

    return (
        <div className="heartContainer">
            <div className="heartIconContainer">
                <Icon type="heart" className="heartIcon" />
            </div>
            {
                content.titles ? content.titles.map((item, key) => (
                    <div className="textTitleDiv" key={key}>
                        <div className="titleContainer">
                            <h2>{item}</h2>
                        </div>
                        <div className='ant-typography'>
                            <HTMLSanitize content={content.text[key]} />
                        </div>
                    </div>
                ))
                    : content.text.map((item, key) => (
                        <div className="textTitleDiv" key={key}>
                            <div className='ant-typography'>
                                {' '}
                                <HTMLSanitize content={item} />
                            </div>
                        </div>
                    ))
            }
        </div>
    );
};
