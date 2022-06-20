import React from 'react';
import { Typography } from 'antd';
import './TitleBox.scss';

const { Paragraph } = Typography;

export default props => {
    const { content } = props;

    return (
        <div className="titleMainContainer">
            {content.title && (
                <div className="title">
                    <h1>{content.title}</h1>
                    {
                        content.subTitle && <Paragraph className="subtitle">{content.subTitle}</Paragraph>
                    }
                </div>
            )}
            {content.image
                && (
                    <div className="imageContainer">
                        <img src={content.image} alt="title box" />
                    </div>
                )}
        </div>
    );
};
