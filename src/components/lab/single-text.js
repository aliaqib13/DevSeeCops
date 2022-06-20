import React from 'react';
import Introduction from '../chapters/introduction/introduction';
import Information from '../chapters/information/information';
import Heart from '../chapters/heart/heart';
import HTMLSanitize from '../HTMLSanitize/HTMLSanitize';

export default props => {
    if (props.type === 'introduction') {
        return (
            <div style={{ margin: '32px 0' }}>
                <Introduction
                    content={[
                        {
                            text: props.text,
                        },
                    ]}
                />
            </div>
        );
    } if (props.type === 'information') {
        return (
            <div style={{ margin: '32px 0' }}>
                <Information
                    content={[
                        props.text,
                    ]}
                />
            </div>
        );
    } if (props.type === 'heart') {
        return (
            <div style={{ margin: '32px 0' }}>
                <Heart
                    content={[
                        props.text,
                    ]}
                />
            </div>
        );
    }
    return (
        <div style={{ margin: '32px 0' }}>
            <p>
                <HTMLSanitize content={props.text} />
            </p>
        </div>
    );
};
