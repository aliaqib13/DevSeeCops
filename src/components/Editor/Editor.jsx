import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import mytext from './mytext.js';
import { Typography } from 'antd';

const { Title } = Typography;

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: mytext,
    }
  }
  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  onChange(newValue, e) {
    console.log('onChange', newValue, e);
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (
    <div>
     <Title level={3}>Example code editing for participants</Title>  
      <MonacoEditor
        width="1000"
        height="600"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
      </div>
    );
  }
}

export default Editor