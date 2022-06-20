import React, {Component} from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

class Welcome extends Component
{
    render() {
        return(
            <Title level={1}>Welcome to the Araido DevSecOps training platform.</Title>
        )
    }
}

export default Welcome
