import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { Select } from 'antd';

const { Option } = Select;

const langs = [
    {
        value: 'bash',
        title: 'Bash',
    },
    {
        value: 'gradle',
        title: 'Gradle',
    },
    {
        value: 'yaml',
        title: 'Yaml',
    },
    {
        value: 'csharp',
        title: 'Csharp',
    },
    {
        value: 'json',
        title: 'Json',
    },
    {
        value: 'javascript',
        title: 'Javascript',
    },
];

export default class CodeSnippet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'CodeSnippet',
            content: {
                code: '',
                language: '',
            },
        };
    }

    componentDidMount() {
        this.setState({
            ...this.props.block,
        });
    }

    onChange = value => {
        const { content } = this.state;
        content.code = value;
        this.setState({
            content,
        }, () => this.props.onChangeBlock(this.state, this.props.index));
    }

    changeLang = value => {
        const { content } = this.state;
        content.language = value;
        this.setState({
            content,
        }, () => this.props.onChangeBlock(this.state, this.props.index));
    }

    render() {
        const { content } = this.props.block;
        const { preview } = this.props;

        return (
            <div>
                <div className="block-item">
                    <Select value={content.language ? content.language : 'bash'} className="lang-snippet" onChange={this.changeLang} disabled={preview}>
                        {
                            langs.map((item, key) => <Option key={key} value={item.value}>{item.title}</Option>)
                        }
                    </Select>
                </div>
                <div className="block-item-code-snippet">
                    <MonacoEditor
                        width="100%"
                        height="300"
                        language={content.language}
                        theme="vs-dark"
                        value={content.code}
                        onChange={this.onChange}
                        options={{
                            selectOnLineNumbers: true,
                            readOnly: !!preview,
                        }}
                    />
                </div>
            </div>
        );
    }
}
