import React, { Component } from 'react';
import { Input } from 'antd';

export default class ParagraphTitle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'ParagraphTitle',
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
        const { content } = this.state;
        content[e.target.name] = e.target.value;
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
                    <Input name="text" value={content.text} onChange={this.inputChange} disabled={preview} />
                </div>
            </div>
        );
    }
}
