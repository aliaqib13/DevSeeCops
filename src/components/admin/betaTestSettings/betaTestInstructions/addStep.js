import React, { Component } from 'react';
import {
    Button, Icon, Input, Form,
} from 'antd';

export default class AddStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInput: false,
            stepName: '',
        };
    }

    showInput = () => {
        this.setState({
            showInput: true,
        });
    }

    onChange = e => {
        this.setState({
            stepName: e.target.value,
        });
    }

    addNewStep = () => {
        const { stepName } = this.state;
        this.props.addStep(stepName);
        this.setState({
            showInput: false,
        });
    }

    render() {
        const { showInput } = this.state;
        return (
            <>
                {
                    showInput
                        ? (
                            <Form layout="inline">
                                <Form.Item>
                                    <Input type="primary" placeholder="Step name" onChange={this.onChange} />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" onClick={this.addNewStep}>Save</Button>
                                </Form.Item>
                            </Form>
                        )
                        : (
                            <>
                                <Button type="link" size="large" onClick={this.showInput}>
                                    <Icon type="plus-circle" />
                                    {' '}
                                    Add
                                    step
                                </Button>
                            </>
                        )
                }
            </>
        );
    }
}
