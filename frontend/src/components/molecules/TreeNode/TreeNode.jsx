import React, { useState } from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import FileIcon from '../../atoms/FileIcon/FileIcon';
import { useEditorSocketStore } from '../../../store/editorSocketStore';

const TreeNode = ({ fileFolderData }) => {

  const [visiblity, setVisiblity] = useState({

  });

  const {editorSocket} = useEditorSocketStore();

  function toggleVisibility(name) {
    setVisiblity({
      ...visiblity,
      [name]: !visiblity[name]
    })
  }

  function computeExtension(fileFolderData) {
    const name = fileFolderData.name.split(".");
    return name[name.length - 1];
  }

  function handleDoubleClick(fileFolderData){
    // console.log(fileFolderData)
    console.log(editorSocket)
    editorSocket.emit("readFile",{
       pathToFileOrFolder: fileFolderData.path
    })
  }

  return (
    (fileFolderData &&
      <div
        style={{
          paddingLeft: "15px",
          color: "white"
        }}
      >

        {fileFolderData.children ? (
          <button
            onClick={() => toggleVisibility(fileFolderData.name)}
            style={{
              border: "none",
              cursor: "pointer",
              outline: "none",
              color: "white",
              backgroundColor: "transparent",
              paddingTop: "15px",
              fontSize: "16px"
            }}
          >
            <MdOutlineKeyboardArrowRight style={{ height: "10px", width: "10px" }} />
            {fileFolderData.name}
          </button>
        )
          :
          (
            <div style={{
              display: "flex",
              alignItems: "center"
            }}>
              <FileIcon extension={computeExtension(fileFolderData)} />
              <p style={{
                paddingTop: "5px",
                fontSize: "15px",
                cursor: "pointer",
                marginLeft: "5px",
                // color:"white",
              }}
              onDoubleClick={()=> handleDoubleClick(fileFolderData)}
              >
                {fileFolderData?.name}
              </p>
            </div>
          )
        }
        {visiblity[fileFolderData.name] && fileFolderData.children && (
          fileFolderData.children.map((child) => (
            <TreeNode
              fileFolderData={child}
              key={child.name}
            />
          ))
        )}

      </div>)
  )
}

export default TreeNode
