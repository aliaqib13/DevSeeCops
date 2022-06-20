import React, { useState } from 'react';
import {
    Table, Button, Modal, Typography, message, Icon, Input,
} from 'antd';
import { useHistory } from 'react-router';
import './FellowDesiredCourses.scss';

const { Column } = Table;
const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const FellowDesiredCourses = ({
    desiredCourses, categories, createCourseProposal, sendQuestionsToSupportTeam,
}) => {
    const [showDetails, setShowDetails] = useState(false);

    const [courseDetails, setCourseDetails] = useState({});
    const [sendMessageToSupportTeam, setSendMessageToSupportTeam] = useState(false);
    const [messageDetails, setMessageDetails] = useState('');

    const history = useHistory();

    const findCategory = (categoriesArr, categoryId) => {
        const categoryObj = categoriesArr.find(category => category.id === categoryId);
        if (categoryObj) {
            return categoryObj.name;
        }
        return null;
    };

    const handleCreateProposal = data => createCourseProposal(data).then(res => {
        if (res.id !== undefined) {
            message.success('Created');
            history.push(`/platform/fellow-area/edit-proposal/${res.id}`);
        } else {
            message.error('Something went wrong, please try again.');
        }
        return null;
    });

    const cancelHandle = () => {
        setSendMessageToSupportTeam(!sendMessageToSupportTeam);
        setMessageDetails('');
    };
    const onChangeHandle = e => {
        setMessageDetails(e.target.value);
    };

    const onSendHandle = messageData => {
        sendQuestionsToSupportTeam({ message: messageData }).then(res => {
            if (res.status === 400) {
                message.info('The text area is empty, Write a message');
            } else if (res.status === 200) {
                message.success('Message is sent successfully');
                setSendMessageToSupportTeam(!sendMessageToSupportTeam);
                setMessageDetails('');
            } else {
                message.error("Couldn't send a message, please try again.");
            }
        });
    };

    return (
        <>

            <div className='message-container'>
                <Button
                    type='text'
                    className='fellow-message'
                    onClick={() => setSendMessageToSupportTeam(!sendMessageToSupportTeam)}
                >
                    Any questions, click here to drop us a message here, or via fellows@devsecops-academy.com
                    {' '}
                    <Icon type="mail" className="badge" />
                </Button>

            </div>

            <Table className='desired-courses-table' dataSource={desiredCourses} rowKey={item => (item.id + item.title)}>
                <Column
                    className='desired-courses-row desired-courses-title'
                    key='course_title'
                    title='Course Title'
                    render={record => (
                        <Button
                            type='text'
                            className='course-title'
                            onClick={() => {
                                setCourseDetails(record);
                                setShowDetails(!showDetails);
                            }}
                        >
                            {record.title}
                        </Button>
                    )}
                />
                <Column
                    className='desired-courses-row desired-courses-category'
                    key='category'

                    title='Category'
                    render={record => <p>{findCategory(categories, record.category_id)}</p>}
                />
                <Column
                    className='desired-courses-row'
                    key='action'
                    title='Action'
                    render={record => <Button onClick={() => handleCreateProposal({ courseId: record.id })} className='create-course-proposal-button'>Create Proposal</Button>}
                />
            </Table>
            {courseDetails && (
                <Modal
                    visible={showDetails}
                    title='Course Details'
                    className='course-details-modal'
                    onCancel={() => setShowDetails(!showDetails)}
                    onOk={() => setShowDetails(!showDetails)}
                    footer={(
                        <Button key='ok' type='primary' onClick={() => setShowDetails(!showDetails)}>
                            Ok
                        </Button>
                    )}
                >
                    <Title className='course-details-title' level={4}>{courseDetails.title}</Title>
                    <Paragraph className='course-details-category' strong>Category:</Paragraph>
                    <Paragraph>{findCategory(categories, courseDetails.category_id)}</Paragraph>
                    <Paragraph className='course-details-description' strong>Description:</Paragraph>
                    <Paragraph>{courseDetails.description}</Paragraph>
                    <Paragraph className='course-details-additional-info' strong>Additional Information:</Paragraph>
                    <Paragraph>{courseDetails.additional_desired_description}</Paragraph>
                    {
                        courseDetails.tools_used
                            ? (
                                <>
                                    <Paragraph className='course-details-tools' strong>Tools:</Paragraph>
                                    {
                                        courseDetails.tools_used.map(item => (
                                            <Paragraph key={item} className='tool-item'>{item}</Paragraph>
                                        ))
                                    }
                                </>
                            )
                            : null
                    }
                    {
                        courseDetails.will_learn
                            ? (
                                <>
                                    <Paragraph className='course-details-learning-objectives' strong>Learning Objectives:</Paragraph>
                                    {
                                        courseDetails.will_learn.map(item => (
                                            <Paragraph key={item} className='learning-objective-item'>{item}</Paragraph>
                                        ))
                                    }
                                </>
                            )
                            : null
                    }
                </Modal>
            )}
            <Modal
                visible={sendMessageToSupportTeam}
                title='Do you have any questions, Drop us a message here ?'
                data-testid="queryModal"
                onCancel={() => cancelHandle()}
                footer={(
                    <Button
                        data-testid="sendButton"
                        key='ok'
                        type='primary'
                        onClick={() => onSendHandle(messageDetails)}
                    >
                        Send
                    </Button>
                )}
            >
                <TextArea rows={10} className="message-input" value={messageDetails} onChange={e => onChangeHandle(e)} />

            </Modal>
        </>
    );
};

export default FellowDesiredCourses;
