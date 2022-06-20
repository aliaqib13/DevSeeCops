import React, { Component } from 'react';
import {
    Input, Button, Icon, message, Modal,
} from 'antd';

const confirmModal = Modal.confirm;

class StateMachineFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gitLabCourseID: '',
            fileNames: [],
            existingFiles: [],
            deleteLoading: false,
            uploadLoading: false,

        };
        this.files = new FormData();
        this.files.append('labID', this.props.id);
    }

    componentDidMount() {
        const { data } = this.props;
        const keyArr = Object.keys(data);
        if (keyArr.length) {
            this.setState({
                existingFiles: data.files || [],
                gitLabCourseID: data.gitLabCourseID,
            },
            () => this.setGitLabCourseID(data.gitLabCourseID));
        }
    }

    handleGitlabProjectChange = e => {
        const { value } = e.target;
        this.setState({ gitLabCourseID: value }, () => this.setGitLabCourseID(value));
    }

    setGitLabCourseID = value => {
        this.files.set('gitLabCourseID', value);
    }

    selectFiles = e => {
        const { files } = e.target;
        const { fileNames } = this.state;
        Object.keys(files).forEach(key => {
            let size = this.sizeOf(this.files.keys());
            if (!this.files.get(size)) {
                this.files.append(size, files[key]);
            } else {
                size++;
                this.files.append(size, files[key]);
            }

            fileNames.push(files[key].name);
        });
        this.setState({ fileNames });
    }

    sizeOf = data => {
        let count = 0;
        for (const key of data) {
            if (key !== 'labID' && key !== 'gitLabCourseID') {
                count++;
            }
        }
        return count;
    }

    removeFile = index => {
        const { fileNames } = this.state;
        fileNames.splice(index, 1);
        this.setState({ fileNames });
        this.files.delete(index);
    }

    uploadFiles = () => {
        const { saveStateMachineFiles } = this.props;
        const { gitLabCourseID } = this.state;
        const gitlabProjectMissing = gitLabCourseID === '';
        const fileMissing = !this.files.get('0');
        if (gitlabProjectMissing) {
            message.error('Gitlab project id should not be emtpy');
            return;
        }
        if (fileMissing) {
            message.error('Please select files');
            return;
        }
        this.setState({
            uploadLoading: true,
        });
        saveStateMachineFiles(this.files).then(res => {
            this.setState({
                uploadLoading: false,
            });
            if (res === true) {
                message.success('Successfully saved');
            } else {
                message.error(res.message);
            }
            return true;
        }).catch(err => console.error('Failed to save state machine files: ', err));
    }

    deleteAll = () => {
        confirmModal({
            title: 'Are you sure to delete all files?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.setState({
                    deleteLoading: true,
                });

                this.props.deleteAllStateMachineFiles(this.props.id).then(res => {
                    this.setState({
                        deleteLoading: false,
                    });

                    if (res === true) {
                        message.success('Deleted.');
                    } else {
                        message.error(res.message);
                    }
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        const { id } = this.props;
        const {
            gitLabCourseID, fileNames, existingFiles, deleteLoading, uploadLoading,
        } = this.state;
        return (
            <div className="editCourse">
                <div className="actions-top-block">
                    <h3>Upload Files</h3>
                    {existingFiles.length
                        ? (
                            <div style={{ width: '80%' }}>
                                <span>Existing Files - </span>
                                {' '}
                                <span style={{ fontSize: '11px' }}>{existingFiles.join(', ')}</span>
                            </div>
                        ) : ''}
                    <div className="small-input">
                        <span className="inputSpan">Lab Id</span>
                        <Input name="lab_id" value={id} disabled />
                    </div>
                    <div className="small-input state-block">
                        <span className="inputSpan">GitLab project id</span>
                        <Input
                            name="gitLabCourseID"
                            value={gitLabCourseID}
                            onChange={this.handleGitlabProjectChange}
                        />
                    </div>
                    {fileNames.map((item, index) => (
                        <p>
                            {item}
                            {' '}
                            <Button
                                type="danger"
                                className="space-left"
                                size="small"
                                onClick={() => this.removeFile(index)}
                            >
                                <Icon className="small-text" type="delete" />
                            </Button>
                        </p>
                    ))}
                    <Button type="primary" onClick={() => this.refs.selectFiles.click()}>
                        Select Files
                        <Icon type="upload" />
                    </Button>
                    <input type="file" ref="selectFiles" onChange={this.selectFiles} multiple hidden />
                    <Button type="primary" onClick={this.uploadFiles} loading={uploadLoading}>
                        Save Files
                        <Icon type="save" />
                    </Button>
                    <Button type="primary" onClick={this.deleteAll} loading={deleteLoading}>
                        Delete All
                        <Icon type="delete" />
                    </Button>
                </div>
            </div>
        );
    }
}

export default StateMachineFiles;
