import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';

export default class SingleText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'SingleText',
            content: {
                text: '',
            },
        };
    }

    componentDidMount() {
        this.setState({
            ...this.props.block,
        });
    }

    inputChange = e => {
        this.setState({
            ...this.state,
            content: {
                text: e.editor.getData(),
            },
        }, () => this.props.onChangeBlock(this.state, this.props.index));
    }

    render() {
        const { content } = this.props.block;
        const { preview } = this.props;

        return (
            <div>
                <div className="block-item">
                    <CKEditor
                        name="text"
                        data={content.text}
                        onChange={this.inputChange}
                        onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
                        readOnly={preview}

                    />
                </div>
            </div>
        );
    }
}
