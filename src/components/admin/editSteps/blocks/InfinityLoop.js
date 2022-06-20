import React, { Component } from 'react';
import { Input } from 'antd';

const stages = ['Plan', 'Code', 'Build', 'Test', 'Release', 'Deploy', 'Operate', 'Monitor'];

export default class InfinityLoop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'InfinityLoop',
            content: {
                text: [],
                stages: ['Plan', 'Code', 'Build', 'Test', 'Release', 'Deploy', 'Operate', 'Monitor'],
            },
        };
    }

    componentDidMount() {
        this.setState({
            ...this.props.block,
        });
    }

    inputChange = (e, index) => {
        const { content } = this.state;
        content.text[index] = e.target.value;
        content.stages = [...stages];
        this.setState({
            content,
        }, () => this.props.onChangeBlock(this.state, this.props.index));
    }

    render() {
        const { content } = this.props.block;
        const { preview } = this.props;

        return (
            <div>
                {
                    stages.map((item, key) => (
                        <div className="block-item infinity" key={key}>
                            <Input name={item} addonBefore={item} value={content.text[key]} onChange={e => this.inputChange(e, key)} disabled={preview} />
                        </div>
                    ))
                }

            </div>
        );
    }
}
