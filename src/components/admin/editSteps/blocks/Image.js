import React, { Component } from 'react';
import {
    Icon, Input, message, Button, Modal,
} from 'antd';
import Resizer from 'react-image-file-resizer';

export default class Image extends Component {
    constructor(props) {
        super(props);
        this.uploadImageRef = React.createRef();

        this.state = {
            type: 'Image',
            visible: false,
            imgBase64: null,
            showBase64: false,
            file: null,
            content: {
                image: '',
            },
            base64content: {
                image: '',
                width: null,
                height: null,
            },
            width: null,
            height: null,
            maxWidth: null,
            maxHeight: null,
            ratio: 0,
        };
    }

    componentDidMount() {
        this.setState({
            ...this.props.block,
        });
    }

    fileUploadWindow = () => {
        this.uploadImageRef.current.click();
    }

    uploadImage = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({
                ...this.state,
                file,
                imgBase64: reader.result,
                showBase64: true,
                base64content: {
                    image: reader.result,
                },
            }, () => this.props.onChangeBlock({
                type: this.state.type,
                content: this.state.base64content,
            }, this.props.index));
        };
    }

    resizeAndSave = (e, file, width, height) => {
        const newWidth = parseInt(width);
        const newHeight = parseInt(height);
        const loader = message.loading('resizing and save', 0);
        Resizer.imageFileResizer(
            file,
            newWidth,
            newHeight,
            'JPEG',
            100,
            0,
            uri => {
                const data = new FormData();
                data.append('file', uri);

                if ((newWidth < 100) || (newHeight < 100)) {
                    message.error('Width and Height of image must be greater than 100 pixel');
                    return;
                }

                this.props.uploadFile(data, 'labs').then(res => {
                    if (res === false) {
                        message.error('Something went wrong, please try again.');
                    } else {
                        const { content } = this.state;
                        content.image = res;
                        this.setState({
                            content,
                            showBase64: false,
                        }, () => this.props.onChangeBlock({
                            type: this.state.type,
                            content: this.state.content,
                        }, this.props.index));
                        loader();
                        message.success('Image uploaded.');
                    }
                });
            },
            'blob',
        );
    }

    onImgLoad = ({ target: img }) => {
        const height = img.naturalHeight;
        const width = img.naturalWidth;
        const ratio = (height / width).toFixed(1);

        this.setState({
            height,
            width,
            maxWidth: width,
            maxHeight: height,
            ratio,
        });
    }

    inputChange = (e, height, width) => {
        const minValue = 0;
        const { maxWidth } = this.state;
        const { maxHeight } = this.state;
        const stateRatio = this.state.ratio;
        const inputName = e.target.name;
        const inputValue = e.target.value;
        const { base64content } = this.state;

        let targetName = '';
        (inputName === 'height') ? targetName = 'height' : targetName = 'width';

        if (inputName === 'height') {
            if ((inputValue === '') || (inputValue <= 0)) {
                base64content[targetName] = minValue;
                base64content.width = minValue;
                this.setState({
                    ...this.state,
                    [targetName]: minValue,
                    width: minValue,
                    base64content,
                }, () => this.props.onChangeBlock({
                    type: this.state.type,
                    content: this.state.base64content,
                }, this.props.index));
                return;
            }
        } else if ((inputValue === '') || (inputValue <= 0)) {
            base64content[targetName] = minValue;
            base64content.width = minValue;
            this.setState({
                ...this.state,
                [targetName]: minValue,
                height: minValue,
                base64content,
            }, () => this.props.onChangeBlock({
                type: this.state.type,
                content: this.state.base64content,
            }, this.props.index));
            return;
        }

        if (width < 10 && height < 10) {
            base64content[targetName] = inputValue;
            this.setState({
                ...this.state,
                [targetName]: inputValue,
                base64content,
            }, () => this.props.onChangeBlock({
                type: this.state.type,
                content: this.state.base64content,
            }, this.props.index));
            return;
        } if ((width > maxWidth) || (height > maxHeight)) {
            base64content.width = maxWidth;
            base64content.height = maxHeight;
            this.setState({
                ...this.state,
                width: maxWidth,
                height: maxHeight,
                base64content,
            }, () => this.props.onChangeBlock({
                type: this.state.type,
                content: this.state.base64content,
            }, this.props.index));
            return;
        }

        let newWidth = 0;
        let newHeight = 0;

        stateRatio < 1 ? newWidth = width * stateRatio : newHeight = height * stateRatio;

        if (inputName === 'height') {
            newWidth = inputValue / stateRatio;
        } else {
            newHeight = inputValue * stateRatio;
        }
        if (inputName === 'height') {
            base64content[targetName] = parseInt(inputValue);
            base64content.width = parseInt(newWidth);
            this.setState({
                ...this.state,
                [targetName]: parseInt(inputValue),
                width: parseInt(newWidth),
                base64content,
            }, () => this.props.onChangeBlock({
                type: this.state.type,
                content: this.state.base64content,
            }, this.props.index));
        } else {
            base64content[targetName] = parseInt(inputValue);
            base64content.width = parseInt(newHeight);
            this.setState({
                ...this.state,
                [targetName]: parseInt(inputValue),
                height: parseInt(newHeight),
                base64content,
            }, () => this.props.onChangeBlock({
                type: this.state.type,
                content: this.state.base64content,
            }, this.props.index));
        }
    }

    toggleModal = () => {
        this.setState({
            visible: !this.state.visible,
        });
    }

    render() {
        const { content } = this.props.block;
        const { preview } = this.props;
        const {
            width, height, imgBase64, file, showBase64,
        } = this.state;

        return (
            <div className="block-item">
                <div className="block-item">
                    <div className="image-container">
                        <input type="file" style={{ display: 'none' }} ref={this.uploadImageRef} name="image" onChange={this.uploadImage} disabled={preview} />
                        <div className="upload-image">
                            <div>
                                <div className="upload-image-btn" onClick={this.fileUploadWindow}>
                                    <Icon type="file-image" className="upload-icon" />
                                    <span>Add Image</span>
                                </div>
                                {
                                    showBase64
                                    && (
                                        <div className="sizes-block">
                                            <div className="block-item infinity" key={2}>
                                                <Input addonBefore="height" type="number" name="height" value={height} onChange={e => this.inputChange(e, height, width)} />
                                            </div>
                                            <div className="block-item infinity" key={1}>
                                                <Input type="number" addonBefore="width" name="width" value={width} onChange={e => this.inputChange(e, height, width)} />
                                            </div>
                                            <Button className="btn-primary preview-image-btn" onClick={this.toggleModal} type="primary">Preview Image </Button>
                                            <Button
                                                className="btn-primary resize-image-btn"
                                                onClick={e => this.resizeAndSave(e, file, width, height)}
                                                type="primary"
                                            >
                                                Resize And Save
                                                {' '}
                                            </Button>
                                        </div>
                                    )
                                }

                            </div>
                            { showBase64
                                && (
                                    <div className="image-div-64">
                                        <img src={(showBase64) ? imgBase64 : content.image} onLoad={this.onImgLoad} alt="labsImage" />
                                    </div>
                                )}
                            {
                                (showBase64 === false && content.image)
                                && (
                                    <div className="image-div-resized">
                                        <img src={content.image} alt="labsImage" />
                                    </div>
                                )
                            }

                            {
                                showBase64
                                && (
                                    <Modal
                                        title=""
                                        visible={this.state.visible}
                                        onOk={e => this.resizeAndSave(e, file, width, height)}
                                        okText="Ok"
                                        onCancel={this.toggleModal}
                                        width="50%"
                                        className="preview-image-modal"
                                    >
                                        <div className={`preview-image ${(width > 700 || height > 700) ? 'big-mod-div' : ''}`}>
                                            <img src={(showBase64) ? imgBase64 : content.image} alt="labsImage" width={width} height={height} />
                                        </div>
                                    </Modal>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
