import React, { Component } from 'react';
import {
    Icon, Input, Button, DatePicker, message, Select, Modal, Upload, Tooltip, Switch, notification,
} from 'antd';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { EVENT_TYPE } from '../../../../constants';
import './edit.scss';
import EventInformation from '../../../../containers/event-information/event-information.js';
import { validateEmail } from '../../../../util/validators';
import { withTimeZone } from '../../../../util/utils';

const { Option } = Select;
const { TextArea } = Input;
const confirmModal = Modal.confirm;

class EditEvent extends Component {
    constructor(props) {
        super(props);

        const { event, eventTypes } = props;
        const course = event.course_ids ? JSON.parse(event.course_ids) : '';
        this.state = {
            id: event.id,
            name: event.name,
            subtitle: event.subtitle,
            description: event.description,
            start_time: event.start_time ? event.start_time : '',
            end_time: event.end_time ? event.end_time : '',
            image: event.image,
            course: course && course.length ? course[0] : '',
            eventSponsors: event.eventSponsors || [],
            emails: [],
            emails_uploaded: event.emails_uploaded,
            listed: Boolean(event.listed),
            loading: false,
            visibleModal: false,
            type: event.type,
            eventTypes: eventTypes || [],
            user_limit: event.user_limit,
            eventManagers: event.eventManagers || [],
            eventUsers: event.eventUsers || [],
        };
    }

    inputChangeHandler = e => {
        if (e.target.name === 'user_limit' && e.target.value !== '' && e.target.value < 1) {
            message.destroy();
            return message.error('User limit should be greater or equal to 1');
        }
        this.setState({
            [e.target.name]: e.target.value,
        });
        return true;
    }

    sponsorChangeHandler = (e, index) => {
        const { eventSponsors } = this.state;
        eventSponsors[index].name = e.target.value;
        this.setState({ eventSponsors });
    }

    disabledDateStart = current => current && current < moment().endOf('day')

    disabledDateEnd = current => {
        const { start_time } = this.state;
        if (start_time) {
            return current && current < moment(start_time);
        }
        return current && current < moment().endOf('day');
    }

    onChangeDate = (name, dateString) => {
        const { end_time } = this.state;
        if (name === 'start_time' && end_time && dateString > end_time) {
            this.setState({ [name]: '' });
            return message.error('Start time should be less than end time');
        }
        this.setState({ [name]: dateString });
    }

    selectCourse = id => {
        this.setState({
            course: id,
        });
    }

    addSponsor = () => {
        const { eventSponsors } = this.state;
        eventSponsors.push({
            name: '',
            logo: '',
        });
        this.setState({ eventSponsors });
    }

    deleteSponsor = index => {
        const { eventSponsors } = this.state;
        eventSponsors.splice(index, 1);
        this.setState({ eventSponsors });
    }

    uploadImage = e => {
        const { uploadImage } = this.props;
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        uploadImage(data, 'events').then(res => {
            if (res.message) {
                message.error('Something went wrong, please try again.');
            } else {
                this.setState({
                    image: res,
                });

                message.success('Image uploaded.');
            }
        }).catch(err => console.error('Failed to upload image: ', err));
    }

    uploadLogo = (e, index) => {
        const { uploadImage } = this.props;
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        uploadImage(data, 'events_sponsors').then(res => {
            if (res.message) {
                message.error('Something went wrong, please try again.');
            } else {
                const { eventSponsors } = this.state;
                eventSponsors[index].logo = res;
                this.setState({
                    eventSponsors,
                });

                message.success('Image uploaded.');
            }
        }).catch(err => console.error('Failed to upload Icon: ', err));
    }

    uploadEmails = file => {
        const reader = new FileReader();
        const { event: { id } } = this.props;
        reader.onload = e => {
            let uploadedCSV = e.target.result.split('\n');
            uploadedCSV = uploadedCSV.map(item => String(item).trim());

            // filter with unique emails
            uploadedCSV = Array.from(new Set([...uploadedCSV]));
            // filter with valid emails
            const failEmails = [];
            uploadedCSV = uploadedCSV.filter(item => {
                if (validateEmail(item)) {
                    return true;
                }
                failEmails.push(item);
                return false;
            });

            // notify for invalid emails
            if (failEmails.length) {
                notification.warning({
                    message: 'There are invalid emails on csv, that emails are ignored',
                    description: <ul>{failEmails.map(text => <li key={text}>{text}</li>)}</ul>,
                    duration: 20000,
                });
            }
            const emails = uploadedCSV.map(email => ({
                email,
                event_id: id,
            }));
            this.setState({ emails, emails_uploaded: true }, () => {
                message.success('Uploaded');
            });
        };
        reader.readAsText(file);
    }

    updateEvent = e => {
        e.preventDefault();
        const {
            name, description, start_time: start, end_time: end, image, course, eventSponsors, emails, listed, subtitle,
            type, user_limit,
        } = this.state;
        const {
            updateEvent, event: { id }, getEventById,
        } = this.props;
        this.setState({
            loading: true,
        });
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
        updateEvent(id, {
            name,
            description,
            start_time: start && withTimeZone(start),
            end_time: end && withTimeZone(end),
            image,
            course_ids: JSON.stringify([course]),
            eventSponsors,
            emails,
            listed,
            subtitle,
            type,
            user_limit,
        }).then(res => {
            this.setState({
                loading: false,
            });
            if (res === true) {
                message.success('Updated.');
                const { updatedEvent } = this.props;
                getEventById(id, true);
                const course = updatedEvent.course_ids ? JSON.parse(updatedEvent.course_ids) : '';
                this.setState({
                    name: updatedEvent.name,
                    subtitle: updatedEvent.subtitle,
                    description: updatedEvent.description,
                    start_time: updatedEvent.start_time,
                    end_time: updatedEvent.end_time,
                    image: updatedEvent.image,
                    course: course && course.length ? course[0] : '',
                    eventSponsors: updatedEvent.eventSponsors ? updatedEvent.eventSponsors : [],
                    emails_uploaded: updatedEvent.emails_uploaded,
                    emails: [],
                    listed: updatedEvent.listed,
                    type: updatedEvent.type,
                });
            } else if (res.errors) {
                res.errors.forEach(item => {
                    message.error(item.message);
                });
            } else if (res.message) {
                message.error(res.message);
            } else {
                message.error('Something went wrong, please try again.');
            }
        });
    }

    deleteEvent = eventId => {
        const { deleteEvent, history } = this.props;
        confirmModal({
            title: 'Are you sure to delete this event?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                const loader = message.loading('Deleting..');
                deleteEvent(eventId).then(res => {
                    loader();
                    if (res === true) {
                        message.success('Deleted');
                        history.push('/platform/events');
                    } else {
                        message.error(res.message);
                    }
                }).catch(console.error);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    deleteEventEmails = eventId => {
        const { deleteEventEmails, getEventById, event: { id } } = this.props;
        confirmModal({
            title: 'Are you sure to delete the emails of this event?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                const loader = message.loading('Deleting..');
                deleteEventEmails(eventId).then(res => {
                    loader();
                    if (res === true) {
                        message.success('Deleted');
                        getEventById(id, true);
                        this.setState({ emails_uploaded: false, emails: [] });
                    } else {
                        message.error(res.message);
                    }
                }).catch(console.error);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    changeListed = () => {
        this.setState(prevState => ({ listed: !prevState.listed }));
    }

    handlePreviewModal = () => {
        this.setState(prevState => ({ visibleModal: !prevState.visibleModal }));
    }

    selectEventType = type => {
        this.setState({ type });
    }

    copyPublicUrl = () => {
        const { event } = this.props;
        const copyInput = document.createElement('textarea');
        copyInput.value = `${window.location.origin}/event-information/${event.id}`;
        document.body.appendChild(copyInput);
        copyInput.select();
        document.execCommand('copy');
        message.destroy();
        message.success('Event public URL copied');
        document.body.removeChild(copyInput);
    }

    render() {
        const { event, coursesForEvent, isAdmin } = this.props;
        const {
            loading, name, description, start_time, end_time, course, eventSponsors,
            image, emails_uploaded, listed, visibleModal, eventTypes, type, user_limit, emails, subtitle,
        } = this.state;
        return (
            <>
                { event
                    ? (
                        <>
                            <div className="editCourse editEvent">
                                <div className="actions-top-block">
                                    <Button type="primary" loading={loading} onClick={this.updateEvent}>
                                        Save
                                        <Icon type="save" />
                                    </Button>
                                    <Button className="btn-preview-help" type="primary" onClick={this.handlePreviewModal}>Preview</Button>
                                </div>
                                <div className="small-input">
                                    <span className="inputSpan">Event name</span>
                                    <Input name="name" placeholder="Event name" value={name} onChange={this.inputChangeHandler} />
                                </div>
                                <div className='courseSubtitleContainer'>
                                    <span className="inputSpan">Event Subtitle</span>
                                    <div className="subtitleText">
                                        <TextArea autoSize maxLength={254} value={subtitle} name='subtitle' onChange={this.inputChangeHandler} />
                                    </div>
                                </div>
                                <div className="courseDescriptionContainer">
                                    <span className="inputSpan">Event Description</span>
                                    <div className="descriptionText">
                                        <TextArea autoSize value={description} name='description' onChange={this.inputChangeHandler} />
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
                                    <Select className="filterSelect" value={type} onChange={this.selectEventType} disabled={!isAdmin}>
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
                                            name="user_limit"
                                            placeholder="Event User Limit"
                                            type='number'
                                            value={user_limit}
                                            onChange={this.inputChangeHandler}
                                            min='1'
                                            disabled={!isAdmin}
                                        />
                                    </div>
                                )}
                                <p>
                                    Listed:
                                    <Switch
                                        className='publicly_visible'
                                        style={{ marginLeft: '10px' }}
                                        checked={listed}
                                        onChange={this.changeListed}
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="close" />}
                                    />
                                </p>
                                <p>
                                    Public URL:
                                    <Button
                                        icon="copy"
                                        type="primary"
                                        size="small"
                                        className="copy-button"
                                        onClick={this.copyPublicUrl}
                                    />
                                </p>
                                <div className="small-input">
                                    <span className="inputSpan">Event Emails</span>
                                    {emails_uploaded
                                        ? (
                                            <Tooltip title="Uploaded">
                                                <span className="uploaded-tick">
                                                    <Icon type="check" style={{ fontSize: '16px' }} />
                                                    {emails.length}
                                                </span>
                                            </Tooltip>
                                        ) : ''}
                                    <p className="upload-email">
                                        <Upload
                                            accept=".csv"
                                            showUploadList={false}
                                            beforeUpload={this.uploadEmails}
                                            customRequest={() => {}}
                                        >
                                            <Button>
                                                <Icon type="upload" />
                                                {' '}
                                                Click to Upload
                                            </Button>
                                        </Upload>
                                    </p>
                                </div>
                                <Button className="add-sponsor" onClick={this.addSponsor}>
                                    Add Sponsor
                                    <Icon type="plus" />
                                </Button>
                                {eventSponsors.map((item, index) => (
                                    <div className="sponsor-container" key={index}>
                                        <div className="small-input sponsor-name">
                                            <span className="inputSpan">Event Sponsor</span>
                                            <Input value={item.name} name="name" placeholder="Event sponsor" onChange={e => this.sponsorChangeHandler(e, index)} />
                                        </div>
                                        <div className="imageContainer">
                                            <span className="inputSpan asa">Sponsor Logo</span>
                                            <div className="uploadImage">
                                                <div className="imageUploader" style={{ marginLeft: '15px' }} onClick={() => this.refs[`fileUploaderLogo${index}`].click()}>
                                                    <img src="/img/photo-camera.svg" alt="Camera" />
                                                    <input type="file" name="avatar" ref={`fileUploaderLogo${index}`} hidden onChange={e => this.uploadLogo(e, index)} />
                                                    <span>Add Image</span>
                                                </div>
                                                {item.logo && (
                                                    <div className="imageDiv">
                                                        <img src={item.logo} alt="courseImage" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <Icon type="minus-circle" onClick={() => this.deleteSponsor(index)} />
                                    </div>
                                ))}
                                <div className="imageContainer">
                                    <span className="inputSpan">Image</span>
                                    <input type="file" style={{ display: 'none' }} id="uploadImageInput" />
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
                                        <Button type="primary" loading={loading} onClick={this.updateEvent}>
                                            Save
                                            <Icon type="save" />
                                        </Button>
                                        <Button type="danger" onClick={() => this.deleteEvent(event.id)}>
                                            Delete
                                            <Icon type="delete" />
                                        </Button>
                                        {emails_uploaded ? (
                                            <Button type="danger" onClick={() => this.deleteEventEmails(event.id)}>
                                                Delete Emails
                                                <Icon type="delete" />
                                            </Button>
                                        ) : ''}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    : (
                        <div>
                            <h3>Event not found</h3>
                        </div>
                    ) }
                <Modal
                    title="EI Preview"
                    visible={visibleModal}
                    onCancel={this.handlePreviewModal}
                    width='80%'
                    footer={null}
                >
                    <EventInformation preview eventPreview={{ ...this.state, courses: coursesForEvent.filter(item => item.id === course) }} />
                </Modal>
            </>
        );
    }
}

export { EditEvent };
export default withRouter(EditEvent);
