import React from 'react';
import MonacoEditor from 'react-monaco-editor';

export default props => {
    const { content } = props;

    return (
        <MonacoEditor
            width="100%"
            height="300"
            language={content.language}
            theme="vs-dark"
            value={content.code}
            options={{
                selectOnLineNumbers: true,
                readOnly: true,
            }}
        />
    );
};
