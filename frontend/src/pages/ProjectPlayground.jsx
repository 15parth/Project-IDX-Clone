import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EditorComponent from '../components/molecules/EditorComponent/EditorComponent';
import EditorButton from '../components/atoms/EditorButton/EditorButton';
import TreeStructure from '../components/organisms/TreeStructure/TreeStructure';
import { useTreeStructureStore } from '../store/treeStructureStore';

const ProjectPlayground = () => {

    const {projectId:projectIdFromUrl} = useParams();

    const { setProjectId, projectId}= useTreeStructureStore()

    useEffect(()=>{
       setProjectId(projectIdFromUrl)
    },[projectIdFromUrl,setProjectId ])

  return (
    <>

    <div style={{
      display:"flex"
    }}>

       { projectId && <div 
        style={{
           backgroundColor:"#333254",
           paddingRight:"10px",
           paddingTop:"0.3vh",
           minWidth:"250px",
           maxWidth:"25%",
           height:"99.7vh",
           overflow:"auto"
        }}
       >
         <TreeStructure/>
       </div> }
       {projectIdFromUrl && <EditorComponent/>}
    </div>

        <EditorButton isActive={true}/>
         <EditorButton isActive={false}/>
    </>
  )
}

export default ProjectPlayground
