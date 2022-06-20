import React, { Component } from 'react';
import {
    Form, Row, Col, Icon, message, Upload, Button,
} from 'antd';
import './sideBar.scss';
import CKEditor from 'ckeditor4-react';

const initialContent = [
    {
        header: '',
        content: [
            {
                title: '',
                image: '',
            },
            {
                title: '',
                image: '',
            },
        ],
    },
    {
        header: '',
        content: [
            {
                title: '',
                image: '',
            },
            {
                title: '',
                image: '',
            },
        ],
    },
    {
        header: '',
        content: [
            {
                title: '',
                image: '',
            },
            {
                title: '',
                image: '',
            },
        ],
    },
];

export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebar_header: '',
            content: [],
            loading: false,
        };
    }

    componentDidMount() {
        if (this.props.sideBarContent === null) {
            this.setState({
                ...this.state,
                content: initialContent,
            });
        } else {
            const { sidebar_header, sidebar_content, id } = this.props.sideBarContent;

            this.setState({
                sidebar_header,
                content: sidebar_content,
                id,
            });
        }
    }

    uploadImage = (image, id, content_idx) => {
        const { uploadFile } = this.props;
        const data = new FormData();
        data.append('file', image);

        return uploadFile(data, 'academy-updates').then(res => {
            if (res === false) {
                message.error('Something went wrong, please try again.');
            } else {
                const { content } = this.state;
                content[id].content[content_idx].image = res;
                this.setState({
                    ...this.state,
                    content,
                });
                message.success('Image uploaded.');
            }
        });
    }

    headerChange = (e, name) => {
        const targetName = name;
        const data = e.editor.getData();

        this.setState({
            [targetName]: data,
        });
    }

    titleChange = (e, key) => {
        const data = e.editor.getData();
        const { content } = this.state;
        content[key].header = data;
        this.setState({
            ...this.state,
            content,
        });
    }

    contentChange = (e, key, index) => {
        const data = e.editor.getData();
        const { content } = this.state;
        content[key].content[index].title = data;
        this.setState({
            ...this.state,
            content,
        });
    }

    updateContent = () => {
        const { uploadContent } = this.props;

        const { sidebar_header, content } = this.state;
        return uploadContent({
            sidebar_header,
            content,
        }).then(res => {
            if (res === false) {
                message.error('Something went wrong, please try again.');
            } else {
                message.success('Updated');
            }
        });
    }

    render() {
        const { sidebar_header, content, loading } = this.state;

        return (
            <Row>
                <Col span={16}>
                    <Form>
                        <Form.Item label="Main header">
                            <div className="block-item">
                                <CKEditor
                                    id="sidebar_header"
                                    name="sidebar_header"
                                    data={sidebar_header}
                                    onChange={e => this.headerChange(e, 'sidebar_header')}
                                    onBeforeLoad={cke => (cke.disableAutoInline = true)}
                                />
                            </div>
                        </Form.Item>
                        {content.map((item, key) => (
                            <Form.Item label={`Main title: ${key + 1}`} className="academy-items" key={key}>
                                <div className="block-item">
                                    <CKEditor
                                        name="header"
                                        data={item.header}
                                        onChange={e => this.titleChange(e, key)}
                                        onBeforeLoad={cke => (cke.disableAutoInline = true)}
                                    />
                                </div>
                                {
                                    (item.content || []).map((record, index) => (
                                        <Form.Item label={`subtitle ${index + 1}`} className="academy-items" key={index}>
                                            <Row>
                                                <Col span={12}>
                                                    <div className="block-item">
                                                        <CKEditor
                                                            name="first_title"
                                                            data={record.title}
                                                            onChange={e => this.contentChange(e, key, index)}
                                                            onBeforeLoad={cke => (cke.disableAutoInline = true)}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col offset={2} span={10}>
                                                    <Upload
                                                        beforeUpload={e => this.uploadImage(e, key, index)}
                                                        showUploadList={false}
                                                    >
                                                        <Button>
                                                            <Icon type="upload" />
                                                            {' '}
                                                            Click to Upload
                                                        </Button>
                                                    </Upload>
                                                    {record.image
                                                        ? (
                                                            <div className="image-div">
                                                                <img src={(record.image)} alt="labsImage" />
                                                            </div>
                                                        ) : <></>}
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                    ))
                                }
                            </Form.Item>
                        ))}
                    </Form>
                </Col>
                <Col span={6} offset={2}>
                    <Button className="update-content-btn" onClick={this.updateContent} loading={loading}>
                        Update
                    </Button>
                </Col>
            </Row>
        );
    }
}
