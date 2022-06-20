import React, { Component } from 'react';
import {
    Table, Button, Modal, message, Input,
} from 'antd';

const { Column } = Table;
const confirmModal = Modal.confirm;

export default class EventEmails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            loading: false,
            data: [],
            searchEmail: '',
            currentPage: 1,
            perPage: 10,
            eventEmailsFiltered: [],
        };
    }

    removeEventEmail = event_email_id => {
        confirmModal({
            title: 'Are you sure to remove this email from event emails?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.props.removeEventEmail(event_email_id).then(res => {
                    if (res === true) {
                        message.success('Removed');
                        this.props.getEventById(this.props.event_id, true);
                    } else {
                        message.error(res.message);
                    }
                });
            },
        });
    }

    changeSearchEmail = searchEmail => {
        const eventEmailsFiltered = this.props.eventEmails.filter(item => item.email.match(searchEmail));
        this.setState({
            eventEmailsFiltered, searchEmail, currentPage: 1,
        });
    }

    paginate = page => {
        this.setState({
            currentPage: page,
        });
    }

    render() {
        const { eventEmails } = this.props;
        const {
            perPage, currentPage, eventEmailsFiltered, searchEmail,
        } = this.state;
        const tableData = eventEmailsFiltered.length ? eventEmailsFiltered : eventEmails;
        return (
            <div className="course-authors">
                <div>
                    <p>
                        <strong>Total</strong>
                        {' '}
                        -
                        {' '}
                        {eventEmails.length}
                    </p>
                    <Input
                        value={searchEmail}
                        placeholder="Search by Email"
                        onChange={e => this.changeSearchEmail(e.target.value)}
                        name="searchEmail"
                        style={{ width: '30%' }}
                    />
                </div>
                <br />
                <Table
                    dataSource={tableData}
                    rowKey={item => item.id}
                    pagination={{
                        onChange: this.paginate,
                        pageSize: perPage,
                        total: eventEmails.length,
                        current: currentPage,
                        position: 'bottom',
                        defaultCurrent: 1,
                    }}
                >
                    <Column title="Email" key="email" render={record => (<>{record.email}</>)} />
                    <Column
                        title="Actions"
                        key="actions"
                        render={record => (
                            <Button type="danger" onClick={() => this.removeEventEmail(record.id)}>Remove</Button>
                        )}
                    />
                </Table>
            </div>
        );
    }
}
