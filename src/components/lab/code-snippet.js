import React from 'react';
import MonacoEditor from 'react-monaco-editor';

const CodeSnippet = props => {
    const convert = new DOMParser().parseFromString(props.code, 'text/html');
    const converted = convert.body.textContent;
    const options = {
        selectOnLineNumbers: true,
        readOnly: true,
    };

    return (
        <MonacoEditor
            width="100%"
            height="300"
            language={props.language}
            theme="vs-dark"
            value={converted}
            options={options}
        />
    );
};

export default CodeSnippet;
