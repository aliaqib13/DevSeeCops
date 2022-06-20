import React from 'react';
import './MyProposals.scss';
import { Table, Tag } from 'antd';
import { useHistory } from 'react-router-dom';

const { Column } = Table;

const MyProposals = ({ proposals, categories }) => {
    const history = useHistory();
    const editProposal = proposal => {
        history.push(`/platform/fellow-area/edit-proposal/${proposal.id}`);
    };

    const findCategory = categoryId => {
        const categoryObj = categories.find(category => category.id === categoryId);
        return categoryObj ? <p>{categoryObj.name}</p> : null;
    };

    const STATUS_COLOR_MAP = {
        DRAFT: 'grey',
        APPROVED: 'green',
        SUBMITTED: 'green',
        REJECTED: 'red',
    };

    return (
        <>
            <Table
                className='proposals-table'
                dataSource={proposals}
                rowKey={item => (item.id + item.course.title)}
                onRow={record => ({
                    onClick: () => {
                        if (record.status === 'DRAFT') {
                            editProposal(record);
                        }
                    }, // click row
                })}
            >
                <Column
                    className='proposals-row proposals-title'
                    title='Course Title'
                    key={1}
                    render={record => (
                        <p
                            type='text'
                            className='course-title'
                        >
                            {record.course.title}
                        </p>
                    )}
                />
                <Column
                    className='proposals-row'
                    title='Category'
                    render={record => findCategory(record.category_id)}
                    key={2}
                />
                <Column
                    className='proposals-row'
                    title='Status'
                    key={3}
                    render={record => (
                        <div className="statuses">
                            <Tag color={STATUS_COLOR_MAP[record.status]}>{record.status}</Tag>
                        </div>
                    )}
                />

            </Table>
        </>
    );
};

export default MyProposals;
