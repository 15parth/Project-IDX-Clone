import React, { useEffect } from 'react'
import { useTreeStructureStore } from '../../../store/treeStructureStore'

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
        Tree structure
    </div>
  )
}

export default TreeStructure
