import React, { Component } from 'react';
import { Drawer, Table, Typography } from 'antd';

const { Title } = Typography;
const { Column } = Table;

class CourseInterestDrawer extends Component {
    render() {
        const { data, visible, closeDrawer } = this.props;
        return (
            <Drawer visible={visible} onClose={closeDrawer} width={450}>
                <Title>Interest Users</Title>
                <Table dataSource={data} rowKey='id'>
                    <Column
                        title='Name'
                        key='id'
                        render={user => `${user.firstname} ${user.lastname}`}
                    />
                    <Column
                        title='Email'
                        key='id'
                        render={user => user.email}
                    />
                </Table>
            </Drawer>
        );
    }
}

export default CourseInterestDrawer;
