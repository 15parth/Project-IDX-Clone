import React, { useRef } from "react";
import Editor from "@monaco-editor/react";

const EditorComponent = () => {

  const editorRef = useRef();
    const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
       <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={'javascript'}
            defaultValue={'Please enter your code here'}
            onMount={onMount}
  
          />
  );
};

export default EditorComponent;