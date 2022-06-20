import React, { Component } from 'react';
import { Result } from 'antd';

class PageNotFound extends Component {
    render() {
        return (
            <div style={{ paddingTop: '136px' }}>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                />
            </div>
        );
    }
}

export default PageNotFound;
