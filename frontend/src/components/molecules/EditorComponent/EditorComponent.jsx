import React, { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useActiveFileTabStore } from "../../../store/activeFileTabStore";

const EditorComponent = () => {
  const editorRef = useRef();
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const { editorSocket } = useEditorSocketStore();
  const { activeFileTab, setActiveFileTab } = useActiveFileTabStore();

  useEffect(() => {
    if (!editorSocket) return; // ✅ Wait until socket is set

    const handleReadFile = (data) => {
      console.log("✅ Read file success", data);
      setActiveFileTab(data.path, data.value);
    };

    // ✅ Listen
    editorSocket.on("readFileSuccess", handleReadFile);

    // ✅ Cleanup when component unmounts or socket changes
    return () => {
      editorSocket.off("readFileSuccess", handleReadFile);
    };
  }, [editorSocket, setActiveFileTab]);

  console.log("value of active tab", activeFileTab);

  return (
    <Editor
      options={{
        minimap: {
          enabled: false,
        },
      }}
      height="75vh"
      theme="vs-dark"
      language={undefined}
      value={
        activeFileTab?.value
          ? activeFileTab.value
          : "Welcome to the playground"
      }
      onMount={onMount}
    />
  );
};

export default EditorComponent;
