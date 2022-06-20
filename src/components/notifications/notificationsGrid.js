import React from 'react';
import './notificationsGrid.scss';
import { Button, List, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Paragraph } = Typography;

const NotificationsGrid = ({
    notifications, deleteNotification, singlePage, notificationSeenById,
}) => (
    <div className="notificationsContainer">
        <List
            className="notificationList"
            pagination={{ pageSize: 10 }}
            header={<h2>{!singlePage ? 'Notifications' : 'Notification'}</h2>}
            dataSource={notifications}
            renderItem={item => (
                <List.Item className={item.seen ? 'openedNotification' : 'unopenedNotification'}>

                    <div className="notificationContent">
                        {
                            (item.content.type === 'recommended_course')
                                ? (
                                    <>
                                        <Paragraph>
                                            <i className="list-title">Recommended Courses</i>
                                            <ul>
                                                {
                                                    item.content.content.map(item => (
                                                        <Link key={item.id} to={`/course-information/${item.id}`}>
                                                            <li>{item.title}</li>
                                                        </Link>
                                                    ))
                                                }

                                            </ul>
                                        </Paragraph>
                                    </>
                                )
                                : (item?.type === 'course_issue') ? (
                                    <>
                                        <p className={!singlePage ? 'notification' : ''}>
                                            {item.content.message}
                                            {item?.content?.content?.title && (
                                                <>
                                                    <br />
                                                    Title of issue:
                                                    {item.content.content.title}

                                                </>
                                            )}
                                            {item?.content?.content?.description && (
                                                <>
                                                    <br />
                                                    Description of issue:
                                                    {item.content.content.description}
                                                </>
                                            )}
                                            {item?.content?.content?.file && (
                                                <>
                                                    <br />
                                                    File related to issue:
                                                    <a href={item.content.content.file}>{item?.content?.content?.fileName || item.content.content.file}</a>
                                                </>
                                            )}
                                            <br />
                                            {' '}
                                            Thank you for your effort to help us solve this issue.
                                            <br />
                                            {' '}
                                            Kind regards.
                                        </p>

                                        {!singlePage
                                            && (
                                                <Button type="primary" onClick={() => notificationSeenById(item.id)}>
                                                    Read
                                                </Button>
                                            )}
                                    </>
                                )
                                    : (
                                        <>
                                            <p
                                                className={!singlePage ? 'notification' : ''}
                                            >
                                                {item.content.message}
                                            </p>
                                            {!singlePage
                                            && (
                                                <Button type="primary" onClick={() => notificationSeenById(item.id)}>
                                                    Read
                                                </Button>
                                            )}
                                        </>
                                    )
                        }
                        <Button onClick={() => deleteNotification(item.id)} type="danger" icon="delete" />
                    </div>
                </List.Item>
            )}
        />
    </div>
);

export default NotificationsGrid;
