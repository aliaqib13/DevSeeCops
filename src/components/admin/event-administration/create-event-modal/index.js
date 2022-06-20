import React, { Component } from 'react';
import moment from 'moment';
import {
    Modal, Button, Input, DatePicker, message, Select, Descriptions, Switch, Icon,
} from 'antd';
import { EVENT_TYPE } from '../../../../constants';
import { withTimeZone } from '../../../../util/utils';

const { TextArea } = Input;
const { Option } = Select;

export default class CreateEventModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmLoading: false,
            name: '',
            subtitle: '',
            description: '',
            course: '',
            start_time: '',
            end_time: '',
            image: '',
            listed: false,
            loading: false,
            type: EVENT_TYPE.INVITE,
            userLimit: 100,
        };
        this.props.getCourses();
    }

    onClose = () => {
        this.props.onClose();
    }

    inputChangeHandler = e => {
        if (e.target.name === 'userLimit' && e.target.value !== '' && e.target.value < 1) {
            message.destroy();
            return message.error('User limit should be greater or equal to 1');
        }
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    disabledDateStart = current => current && current < moment().endOf('day')

    disabledDateEnd = current => {
        if (this.state.start_time) {
            return current && current < moment(this.state.start_time);
        }
        return current && current < moment().endOf('day');
    }

    onChangeDate = (name, dateString) => {
        if (name === 'start_time' && this.state.end_time && dateString > this.state.end_time) {
            this.setState({ [name]: '' });
            return message.error('Start time should be less than end time');
        }
        this.setState({ [name]: dateString });
    }

    uploadImage = e => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        this.props.uploadEventImage(data, 'events').then(res => {
            if (res.message) {
                message.error('Something went wrong, please try again.');
            } else {
                this.setState({
                    image: res,
                });

                message.success('Image uploaded.');
            }
        });
    }

    selectCourse = id => {
        this.setState({
            course: id,
        });
    }

    createEvent = () => {
        this.setState({
            loading: true,
        });

        const {
            name, description, course, start_time, end_time, image, listed, subtitle, type, userLimit,
        } = this.state;
        const requiredFields = { name, course };
        const keyArr = Object.keys(requiredFields);
        let invalid = false;
        for (let i = 0; i < keyArr.length; i++) {
            if (!requiredFields[keyArr[i]]) {
                let field = keyArr[i].replace('_', ' ');
                field = field[0].toUpperCase() + field.substring(1);
                message.error(`${field} should not be empty`);
                invalid = true;
                break;
            }
        }
        if (invalid) {
            this.setState({
                loading: false,
            });
            return;
        }

        this.props.createEvent({
            name,
            description,
            course_ids: JSON.stringify([course]),
            image,
            listed,
            subtitle,
            type,
            user_limit: userLimit || 100,
            end_time: end_time ? withTimeZone(end_time) : '',
            start_time: start_time ? withTimeZone(start_time) : '',
        })
            .then(res => {
                this.setState({
                    loading: false,
                });
                this.props.getEvents();
                if (res === true) {
                    message.success('Created.');

                    this.setState({
                        name: '',
                        description: '',
                        course: '',
                        start_time: '',
                        end_time: '',
                        image: '',
                        listed: false,
                        subtitle: '',
                    }, this.onClose);
                } else if (res.errors) {
                    res.errors.forEach(item => {
                        message.error(item.message);
                    });
                } else {
                    message.error(res.message);
                }
            });
    }

    changeListed = () => {
        this.setState({
            listed: !this.state.listed,
        });
    }

    selectEventType = type => {
        this.setState({ type });
    }

    render() {
        const {
            name, description, course, start_time, end_time, loading, image, listed, subtitle, type, userLimit,
        } = this.state;
        const { visible, coursesForEvent, eventTypes } = this.props;
        return (
            <Modal
                title="Create Event"
                width={960}
                visible={visible}
                onCancel={this.onClose}
                destroyOnClose
                footer={[
                    <Button onClick={this.onClose} key="onCancel">Close</Button>,
                ]}
            >
                <div className="addCourse">
                    <div className="small-input">
                        <span className="inputSpan">Event Name</span>
                        <Input value={name} name="name" placeholder="Event name" onChange={this.inputChangeHandler} />
                    </div>
                    <div className="courseSubtitleContainer">
                        <span className="inputSpan">Event SubTitle</span>
                        <div className="subtitleText">
                            <TextArea autoSize maxLength={254} value={subtitle} name='subtitle' placeholder="Event subtitle" onChange={this.inputChangeHandler} />
                        </div>
                    </div>
                    <div className="courseDescriptionContainer">
                        <span className="inputSpan">Event Description</span>
                        <div className="descriptionText">
                            <TextArea autoSize value={description} name="description" onChange={this.inputChangeHandler} />
                        </div>
                    </div>
                    <div className="categorySelect">
                        <span className="inputSpan">Select Course</span>
                        <Select className="filterSelect" value={course} onChange={this.selectCourse}>
                            {
                                coursesForEvent.map((item, key) => (
                                    <Option value={item.id} key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span>
                                            {item.title}
                                        </span>
                                    </Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className="small-input">
                        <span className="inputSpan">Start Time</span>
                        <DatePicker
                            showTime
                            placeholder="Select start time"
                            style={{ width: '100%' }}
                            value={start_time ? moment(start_time) : null}
                            disabledDate={this.disabledDateStart}
                            onChange={(date, dateString) => this.onChangeDate('start_time', dateString)}
                        />
                    </div>
                    <div className="small-input">
                        <span className="inputSpan">End Time</span>
                        <DatePicker
                            showTime
                            placeholder="Select end time"
                            style={{ width: '100%' }}
                            value={end_time ? moment(end_time) : null}
                            disabledDate={this.disabledDateEnd}
                            onChange={(date, dateString) => this.onChangeDate('end_time', dateString)}
                        />
                    </div>
                    <div className="categorySelect">
                        <span className="inputSpan">Select Type</span>
                        <Select className="filterSelect" value={type} onChange={this.selectEventType}>
                            {
                                eventTypes.map((item, key) => (
                                    <Option value={item} key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span>
                                            {item}
                                        </span>
                                    </Option>
                                ))
                            }
                        </Select>
                    </div>
                    {type === EVENT_TYPE.OPEN && (
                        <div className="small-input">
                            <span className="inputSpan">Event User Limit</span>
                            <Input
                                name="userLimit"
                                placeholder="Event User Limit"
                                type='number'
                                value={userLimit}
                                onChange={this.inputChangeHandler}
                                min='1'
                            />
                        </div>
                    )}
                    <Descriptions layout="vertical" className="courseDescriptionContainerGroup">
                        <Descriptions.Item label="Listed">
                            <Switch
                                className='publicly_visible'
                                checked={listed}
                                onChange={this.changeListed}
                                checkedChildren={<Icon type="check" />}
                                unCheckedChildren={<Icon type="close" />}
                            />
                        </Descriptions.Item>
                    </Descriptions>
                    <div className="imageContainer">
                        <span className="inputSpan asa">Image</span>
                        <div className="uploadImage">
                            <div className="imageUploader" onClick={() => this.refs.fileUploader.click()}>
                                <img src="/img/photo-camera.svg" alt="Camera" />
                                <input type="file" name="avatar" ref="fileUploader" hidden onChange={this.uploadImage} />
                                <span>Add Image</span>
                            </div>
                            {image && (
                                <div className="imageDiv">
                                    <img src={image} alt="courseImage" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="buttonsContainer">
                        <div className="savePreviewContainer">
                            <Button onClick={this.createEvent} loading={loading}>
                                Create
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
