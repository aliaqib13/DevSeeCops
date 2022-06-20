import React, { Component } from 'react';
import { List, Radio, Checkbox } from 'antd';
import './question.scss';

class Question extends Component {
    __checkAnswer(id) {
        const { checkedAnswers } = this.props;
        let checked = false;
        if (checkedAnswers.findIndex(item => item === id) >= 0) {
            checked = true;
        }

        return checked;
    }

    render() {
        const { data, disabled, is_multiple } = this.props;

        return (
            <div className="options-list-container">
                <List
                    className="options-list"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            {' '}
                            {
                                is_multiple
                                    ? (
                                        <Checkbox
                                            disabled={disabled}
                                            onChange={e => this.props.onChange(e, item.quiz_id, item.id, is_multiple)}
                                            checked={this.__checkAnswer(item.id)}
                                            key="checkbox"
                                        >
                                            {item.answer}
                                        </Checkbox>
                                    )
                                    : (
                                        <Radio
                                            disabled={disabled}
                                            onChange={e => this.props.onChange(e, item.quiz_id, item.id, is_multiple)}
                                            checked={this.__checkAnswer(item.id)}
                                            key="radio"
                                        >
                                            {item.answer}
                                        </Radio>
                                    )
                            }

                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default Question;
