import React, { Component } from 'react';
import { Icon, Input, message } from 'antd';

export default class TitleBox extends Component {
    constructor(props) {
        super(props);
        this.uploadImageRef = React.createRef();
        this.state = {
            type: 'TitleBox',
            content: {
                title: '',
                subtitle: '',
                image: '',
            },
        };
    }

    componentDidMount() {
        this.setState({
            ...this.props.block,
        });
    }

    inputChange = e => {
        const { content } = this.state;
        content[e.target.name] = e.target.value;
        this.setState({
            content,
        }, () => this.props.onChangeBlock(this.state, this.props.index));
    }

    fileUploadWindow = () => {
        this.uploadImageRef.current.click();
    }

    uploadImage = e => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        this.props.uploadFile(data, 'labs').then(res => {
            if (res === false) {
                message.error('Something went wrong, please try again.');
            } else {
                const { content } = this.state;
                content.image = res;
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
            <div>
                <div className="block-item">
                    <Input name="title" value={content.title} onChange={this.inputChange} placeholder="Title" disabled={preview} />
                </div>
                <div className="block-item">
                    <Input name="subtitle" value={content.subtitle} onChange={this.inputChange} placeholder="Subtitle" disabled={preview} />
                </div>
                <div className="block-item">
                    <div className="image-container">
                        <input type="file" style={{ display: 'none' }} ref={this.uploadImageRef} name="image" onChange={this.uploadImage} disabled={preview} />
                        <div className="upload-image">
                            <div className="upload-image-btn" onClick={this.fileUploadWindow}>
                                <Icon type="file-image" className="upload-icon" />
                                <span>Add Image</span>
                            </div>
                            {
                                content.image
                                && (
                                    <div className="image-div">
                                        <img src={content.image} alt="labsImage" />
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
