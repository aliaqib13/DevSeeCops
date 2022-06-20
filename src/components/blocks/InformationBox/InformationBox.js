import React from 'react';
import { Icon } from 'antd';
import './InformationBox.scss';
import HTMLSanitize from '../../HTMLSanitize/HTMLSanitize';

export default props => {
    const { content } = props;
    return (
        <div className="informationContainer">
            <div className="informationIconContainer">
                <Icon type="info" className="informationIcon" />
            </div>
            {
                !content.titles || typeof content.titles === 'string'
                    ? (
                        <div className="textTitleDiv">
                            <div className="titleContainer">
                                <h2>{content.titles}</h2>
                            </div>
                            {
                                content.text.map((item, key) => (
                                    <div className="ant-typography content" key={key}>
                                        <HTMLSanitize content={item} />
                                    </div>
                                ))
                            }
                        </div>
                    )
                    : (
                        <div className="textTitleDiv">
                            {
                                content.titles.map((item, key) => (
                                    <div key={key}>
                                        <div className="titleContainer">
                                            <h2>{item}</h2>
                                        </div>
                                        <div className="ant-typography content">
                                            <HTMLSanitize content={content.text[key]} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
            }

        </div>
    );
};
