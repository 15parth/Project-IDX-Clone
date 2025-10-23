import React, { useEffect } from 'react'
import { useTreeStructureStore } from '../../../store/treeStructureStore'
import TreeNode from '../../molecules/TreeNode/TreeNode';
import { useFileContextMenu } from '../../../store/fileContextMenuStore';
import FileContextMenu from '../../molecules/ContextMenu/FileContextMenu';

const TreeStructure = () => {

    const {treeStructure,setTreeStructure} = useTreeStructureStore();
    const {isOpen: isFileContextOpen, x:fileContextX, y:fileContextY, file}=  useFileContextMenu();

    useEffect(()=>{
      if(treeStructure){
        console.log('Tree --->',treeStructure)
      } else{
        setTreeStructure()
      }
    },[setTreeStructure,treeStructure])

  return (
    <>
    {isFileContextOpen && fileContextX && fileContextY && (
      <FileContextMenu 
       x={fileContextX}
       y={fileContextY}
       path={file}
      />
    )}
       <TreeNode fileFolderData={treeStructure}/>
    </>
  )
}

export default TreeStructure
