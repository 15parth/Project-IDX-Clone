import React, { useEffect } from 'react'
import { useTreeStructureStore } from '../../../store/treeStructureStore'
import TreeNode from '../../molecules/TreeNode/TreeNode';

const TreeStructure = () => {

    const {treeStructure,setTreeStructure} = useTreeStructureStore();

    useEffect(()=>{
      if(treeStructure){
        console.log('Tree --->',treeStructure)
      } else{
        setTreeStructure()
      }
    },[setTreeStructure,treeStructure])

  return (
    <div>
       <TreeNode fileFolderData={treeStructure}/>
    </div>
  )
}

export default TreeStructure
