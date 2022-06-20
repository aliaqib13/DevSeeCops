import React, { Component } from 'react';
import { Icon, message } from 'antd';

export default class Video extends Component {
    constructor(props) {
        super(props);
        this.uploadVideoRef = React.createRef();
        this.state = {
            type: 'Video',
            content: {
                video: '',
            },
        };
    }

    componentDidMount() {
        this.setState({
            ...this.props.block,
        });
    }

    fileUploadWindow = () => {
        this.uploadVideoRef.current.click();
    }

    uploadVideo = e => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        this.props.uploadFile(data, 'labs').then(res => {
            if (res === false) {
                message.error('Something went wrong, please try again.');
            } else {
                const { content } = this.state;
                content.video = res;
                this.setState({
                    content,
                }, () => this.props.onChangeBlock(this.state, this.props.index));
                message.success('Image uploaded.');
            }
        });
    }

    render() {
        const { content } = this.props.block;
        const { preview } = this.props;

        return (
            <div className="block-item">
                <div className="block-item">
                    <div className="image-container">
                        <input type="file" style={{ display: 'none' }} ref={this.uploadVideoRef} name="image" onChange={this.uploadVideo} disabled={preview} />
                        <div className="upload-image">
                            <div className="upload-image-btn" onClick={this.fileUploadWindow}>
                                <Icon type="video-camera" className="upload-icon" />
                                <span>Add Video</span>
                            </div>
                            {
                                content.video
                                && (
                                    <div className="image-div">
                                        <video controls>
                                            <source src={content.video} type="video/mp4" />
                                        </video>
                                    </div>
                                )

                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
