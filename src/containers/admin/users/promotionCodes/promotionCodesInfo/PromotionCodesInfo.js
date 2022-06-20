import React, { Component } from 'react';
import {
    Table, Button, Icon, Typography, Drawer, Input, Checkbox, message, Empty,
} from 'antd';
import moment from 'moment';
import Loading from '../../../../../components/Loading/Loading';

const { Column } = Table;
const { Title } = Typography;

class PromotionCodesInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            users: {},
            visible: false,
            currentPage: 1,
            searchEmail: '',
            currentStatus: '',
            checked: [],
            checkAll: false,
            loading: true,
        };

        const { getPromotionCodesInfo } = this.props;
        getPromotionCodesInfo().then(res => {
            if (res && res.data) {
                this.setState({ data: res.data });
            }
            this.setState({ loading: false });
        });
    }

    view = status => {
        const { data, users } = this.state;
        const currentStatus = status === 'Unused, Not Expired' ? 'unusedNotExpired' : status.toLowerCase();
        users.data = data[currentStatus];
        users.total = users.data ? users.data.length : 0;
        users.perPage = 10;
        this.setState({ users, visible: true, currentStatus });
    }

    onClose = () => {
        this.setState({ visible: false, searchEmail: '' });
    }

    paginate = page => {
        this.setState({
            currentPage: page,
        });
    }

    changeSearchEmail = e => {
        const searchEmail = e.target.value;
        const { data, users, currentStatus } = this.state;
        this.setState({
            searchEmail,
        });
        users.data = data[currentStatus].filter(item => item.email.match(searchEmail));
        users.total = users.data.length;
        this.setState({
            users, currentPage: 1, checked: [], checkAll: false,
        });
    }

    handleCheck = id => {
        const { checked } = this.state;
        if (checked.includes(id)) {
            checked.splice(checked.indexOf(id), 1);
        } else {
            checked.push(id);
        }
        this.setState({ checked });
    }

    checkAll = () => {
        const { checkAll } = this.state;
        this.setState({ checkAll: !checkAll }, () => {
            let { checked } = this.state;
            const { users } = this.state;
            if (!checkAll) {
                checked = [];
            } else {
                checked = [];
                users.data.map(item => checked.push(item.id));
            }
            this.setState({ checked });
        });
    }

    notify = () => {
        const { notifyByEmail } = this.props;
        const { checked } = this.state;
        if (!checked.length) {
            return message.error('You should select at least one email');
        }
        notifyByEmail({ checked }).then(res => {
            if (res.message) {
                message.error(res.message);
            } else {
                message.success('Notified!');
            }
        });
    }

    render() {
        const {
            data, users, visible, currentPage, searchEmail, currentStatus, checked, checkAll, loading,
        } = this.state;
        const usedCount = data && data.used ? data.used.length : 0;
        const unusedNotExpiredCount = data && data.unusedNotExpired ? data.unusedNotExpired.length : 0;
        const expiredCount = data && data.expired ? data.expired.length : 0;
        const tableData = [
            { id: 1, status: 'Used', number: usedCount },
            { id: 2, status: 'Unused, Not Expired', number: unusedNotExpiredCount },
            { id: 3, status: 'Expired', number: expiredCount },
        ];
        return (
            <>
                <Title>Promotion Codes</Title>
                {data && Object.keys(data).length ? (
                    <Table dataSource={tableData} rowKey={item => item.id} pagination={false}>
                        <Column title="Status" dataIndex="status" />
                        <Column title={`Number (Total - ${data.total})`} dataIndex="number" />
                        <Column
                            title="Users"
                            render={(text, record) => (
                                <Button type="link" onClick={() => this.view(record.status)}>
                                    View
                                    <Icon type="right" />
                                </Button>
                            )}
                        />
                    </Table>
                ) : loading ? <Loading /> : <Empty />}
                <Drawer
                    title="Users"
                    className="course-users-drawer"
                    width={550}
                    placement="right"
                    onClose={this.onClose}
                    visible={visible}
                    switchScrollingEffect={false}
                >
                    { currentStatus === 'unusedNotExpired' && users.data && users.data.length ? (
                        <div>
                            <Button type="primary" style={{ marginRight: '15px' }} onClick={this.notify}>Notify by email</Button>
                            <Checkbox checked={checkAll} onChange={this.checkAll}>Check All</Checkbox>
                        </div>
                    ) : '' }
                    <Table
                        dataSource={users.data}
                        rowKey={item => item.id}
                        pagination={{
                            onChange: this.paginate,
                            pageSize: users.perPage,
                            total: users.total,
                            current: currentPage,
                            position: 'top',
                            defaultCurrent: 1,
                        }}
                    >
                        {currentStatus === 'unusedNotExpired' ? (
                            <Column
                                key="checkbox"
                                render={(text, record) => (
                                    <Checkbox
                                        checked={checked.includes(record.id)}
                                        onChange={() => this.handleCheck(record.id)}
                                    />
                                )}
                            />
                        )
                            : ''}
                        <Column
                            title={() => (
                                <Input
                                    value={searchEmail}
                                    placeholder="Search by Email"
                                    onChange={this.changeSearchEmail}
                                    name="searchEmail"
                                />
                            )}
                            key="email"
                            dataIndex="email"
                        />
                        <Column
                            title="Created At"
                            key="created_at"
                            render={(text, record) => (
                                moment(record.created_at).format('MMM Do YYYY')
                            )}
                        />
                        {currentStatus !== 'used'
                            ? (
                                <Column
                                    title="Expiration"
                                    key="expiration"
                                    render={(text, record) => (
                                        moment(record.expiration_date).format('MMM Do YYYY')
                                    )}
                                />
                            )
                            : (
                                <Column
                                    title="Purchased At"
                                    key="purchased_at"
                                    render={(text, record) => (
                                        record.is_used ? moment(record.updated_at).format('MMM Do YYYY') : 'Not Applicable'
                                    )}
                                />
                            )}
                        <Column title="Coupon" key="coupon" dataIndex="coupon" />
                    </Table>
                </Drawer>
            </>
        );
    }
}

export default PromotionCodesInfo;
