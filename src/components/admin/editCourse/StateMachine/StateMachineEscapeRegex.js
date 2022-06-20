import React, { Component } from 'react';
import { Button, Input, Typography } from 'antd';
import jsStringEscape from 'js-string-escape';

const { Paragraph } = Typography;

class StateMachineEscapeRegex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            output: '',
        };
    }

    handleChange = e => {
        this.setState({
            input: e.target.value,
        });
    }

    escapeString = () => {
        this.setState({
            output: jsStringEscape(this.state.input),
        });
    }

    render() {
        const { input, output, loading } = this.state;
        return (
            <div className="editCourse">
                <div className="actions-top-block">
                    <h3>Escape Regex</h3>
                    <div className="small-input">
                        <span className="inputSpan">Copy-paste the string to escape here</span>
                        <Input onChange={this.handleChange} value={input} />
                        <Button style={{ marginTop: '15px' }} type="primary" loading={loading} onClick={this.escapeString}>
                            Escape
                        </Button>
                    </div>
                    <div className="small-input state-block">
                        {output && <Paragraph copyable className="inputSpan">{output}</Paragraph>}
                    </div>

                </div>
            </div>

        );
    }
}

export default StateMachineEscapeRegex;
