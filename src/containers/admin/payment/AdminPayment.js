import React, { Component } from 'react';
import { message, Table, Typography } from 'antd';
import { connect } from 'react-redux';
import { fetchAdminPayment } from '../../../store/actions/admin/payment';

const { Title } = Typography;
const { Column } = Table;

class AdminPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            perPage: 10,
            currentPage: 1,
        };
    }

    componentDidMount() {
        const loader = message.loading('Loading..', 0);
        const { perPage } = this.state;
        this.props.fetchAdminPayment(1, perPage).then(res => {
            loader();
        });
    }

    paginate = page => {
        const { perPage } = this.state;

        this.setState({
            currentPage: page,
        });
        this.props.fetchAdminPayment(page, perPage);
    }

    render() {
        const { payments } = this.props;
        return (
            <div className="admin-payment-container">
                <div className="payment-header">
                    <Title>Payments</Title>
                </div>
                <Table
                    dataSource={payments.data}
                    rowKey={item => item.id}
                    pagination={{
                        onChange: this.paginate,
                        pageSize: this.state.perPage,
                        position: 'both',
                        total: payments.total,
                        defaultCurrent: 1,
                        current: this.state.currentPage,
                    }}

                >
                    <Column
                        title="User"
                        render={record => (`${record.user.firstname} ${record.user.lastname}`)}
                        key="user"
                    />
                    <Column
                        title="Type"
                        dataIndex="payment_method"
                        key="type"
                    />
                    <Column
                        title="CC"
                        render={record => {
                            if (record.user.cc_info && record.payment_method === 'cc') {
                                const { user: { cc_info: { last4, brand } } } = record;
                                return (`${brand} - **** ${last4}`);
                            }

                            return ('Empty');
                        }}
                        key="cc"

                    />
                    <Column
                        title="Course"
                        dataIndex="course.title"
                        key="course"
                    />
                    <Column
                        title="Amount"
                        render={record => `$ ${record.price}`}
                        key="amount"
                    />
                    <Column
                        title="Date"
                        dataIndex="created_at"
                        key="date"
                    />
                </Table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        payments: state.adminPayment,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAdminPayment: (page, perPage) => dispatch(fetchAdminPayment(page, perPage)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPayment);
