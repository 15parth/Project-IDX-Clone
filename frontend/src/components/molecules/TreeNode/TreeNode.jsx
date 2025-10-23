import React, { useState } from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import FileIcon from '../../atoms/FileIcon/FileIcon';
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { useFileContextMenu } from '../../../store/fileContextMenuStore';

const TreeNode = ({ fileFolderData }) => {

  const [visiblity, setVisiblity] = useState({

  });

  const {editorSocket} = useEditorSocketStore();
  
  const {
    setFile ,
     setIsOpen:setFileContextMenuIsopen,
     setX:setFileContextMenuX,
     setY: setFileContextMenuY
   }= useFileContextMenu()

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

  function handleContextMenuForFile(e, path){
    e.preventDefault();
    setFile(path)
    setFileContextMenuX(e.clientX);
    setFileContextMenuY(e.clientY);
    setFileContextMenuIsopen(true);
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
              padding: "15px",
              fontSize: "16px",
              marginTop:"10px"
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
              alignItems: "center",
              justifyContent:'start'
            }}>
              <FileIcon extension={computeExtension(fileFolderData)} />
              <p style={{
                padding: "15px",
                fontSize: "15px",
                cursor: "pointer",
                marginLeft: "5px",
                // color:"white",
              }}
              onDoubleClick={()=> handleDoubleClick(fileFolderData)}
              onContextMenu={(e)=>handleContextMenuForFile(e,fileFolderData.path)}
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
