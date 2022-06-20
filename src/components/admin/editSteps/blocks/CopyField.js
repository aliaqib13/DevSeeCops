import React, { Component } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

export default class CopyField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'CopyField',
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
                text: e.target.value,
            },
        }, () => this.props.onChangeBlock(this.state, this.props.index));
    }

    render() {
        const { preview } = this.props;

        return (
            <div>
                <div className="block-item">
                    <TextArea
                        rows={4}
                        type="text"
                        name="text"
                        value={this.state.content.text}
                        onChange={this.inputChange}
                        disabled={preview}
                    />
                </div>
            </div>
        );
    }
}
