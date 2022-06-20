import React, { Component } from 'react';
import { Input, Button, Icon } from 'antd';
import CKEditor from 'ckeditor4-react';

export default class InformationBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'InformationBox',
            content: {
                titles: [''],
                text: [''],
            },
        };
    }

    componentDidMount() {
        this.setState({
            ...this.props.block,
        });
    }

    inputChange = (e, index) => {
        let name = '';
        let value = '';
        if (e.target === undefined) {
            name = 'text';
            value = e.editor.getData();
        } else {
            name = e.target.name;
            value = e.target.value;
        }
        const { content } = this.state;
        if (!content[name]) {
            content[name] = new Array(content.text.length).fill('');
        }
        content[name][index] = value;
        this.setState({
            content,
        }, () => this.props.onChangeBlock(this.state, this.props.index));
    }

    addParagraph = () => {
        const content = { ...this.state.content };
        content.titles.push('');
        content.text.push('');

        this.setState({
            content,
        });
    }

    render() {
        const { content } = this.props.block;
        const { preview } = this.props;

        return (
            <>
                {
                    content.titles ? content.titles.map((item, key) => (
                        <div key={key}>
                            <div className="block-item">
                                <Input
                                    type="text"
                                    name="titles"
                                    placeholder="Title"
                                    value={content.titles[key]}
                                    onChange={e => this.inputChange(e, key)}
                                    disabled={preview}
                                />
                            </div>
                            <div className="block-item">
                                <CKEditor
                                    name="text"
                                    data={content.text[key]}
                                    onChange={e => this.inputChange(e, key)}
                                    onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
                                    readOnly={preview}
                                />
                            </div>
                            {!preview
                                    && (
                                        <div className="add-paragraph">
                                            <Button type="link" onClick={this.addParagraph}>
                                                <Icon type="plus-circle" />
                                                {' '}
                                                Add Paragraph
                                            </Button>
                                        </div>
                                    )}
                        </div>
                    ))
                        : content.text.map((item, key) => (
                            <div key={key}>
                                <div className="block-item">
                                    <Input
                                        type="text"
                                        name="titles"
                                        placeholder="Title"
                                        value=""
                                        onChange={e => this.inputChange(e, key)}
                                        disabled={preview}
                                    />
                                </div>
                                <div className="block-item">
                                    <CKEditor
                                        name="text"
                                        data={item}
                                        onChange={e => this.inputChange(e, key)}
                                        onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
                                        readOnly={preview}
                                    />
                                </div>
                                {!preview
                                        && (
                                            <div className="add-paragraph">
                                                <Button type="link" onClick={this.addParagraph}>
                                                    <Icon type="plus-circle" />
                                                    {' '}
                                                    Add Paragraph
                                                </Button>
                                            </div>
                                        )}
                            </div>
                        ))
                }
            </>
        );
    }
}
