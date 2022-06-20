import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default class LearningPathSelectBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'LearningPath',
            content: {
                id: '',
            },
        };
    }

    componentDidMount() {
        const { block, learningPaths } = this.props;
        if (block.content.id) {
            this.setState({ content: block.content });
        } else if (learningPaths[0]) {
            this.handleChange(learningPaths[0].id);
        }
    }

    handleChange = id => {
        this.setState({
            ...this.state,
            content: {
                id,
            },
        }, () => {
            this.props.onChangeBlock(this.state, this.props.index);
        });
    }

    render() {
        const { learningPaths } = this.props;
        const { content: { id } } = this.state;
        return (
            <div>
                <div className="block-item">
                    <Select
                        style={{ width: '50%' }}
                        placeholder="Select Learning Path"
                        onChange={this.handleChange}
                        value={id}
                    >
                        {learningPaths.map(item => <Option key={item.id} value={item.id}>{item.title}</Option>)}
                    </Select>
                </div>
            </div>
        );
    }
}
