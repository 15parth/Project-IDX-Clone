import {useRef } from "react";
import Editor from "@monaco-editor/react";
import { useActiveFileTabStore } from "../../../store/activeFileTabStore";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { extensionToFileType } from "../../../utils/extensionToFileType";

const EditorComponent = () => {

  let timerId = null;

  const editorRef = useRef();
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const { activeFileTab } = useActiveFileTabStore();

  console.log("value of active tab", activeFileTab);

  const {editorSocket}= useEditorSocketStore()

  function handleChange(value, e){
   
    if(timerId !== null) clearTimeout(timerId);

   timerId = setTimeout(()=>{
      const editorContent =value;
      editorSocket?.emit("writeFile",{
        data: editorContent,
        pathToFileOrFolder: activeFileTab.path
      })
    },2000)


    console.log(value, e)
  }

  console.log('this is the extention-->', activeFileTab?.extension)

  return (
    <Editor
      options={{
        minimap: {
          enabled: false,
        },
      }}
      height="75vh"
      theme="vs-dark"
      definedLanguage={undefined}
      language={extensionToFileType(activeFileTab?.extension)}
      value={
        activeFileTab?.value
          ? activeFileTab.value
          : "Welcome to the playground"
      }
      onChange={handleChange}
      onMount={onMount}
    />
  );
};

export default EditorComponent;
