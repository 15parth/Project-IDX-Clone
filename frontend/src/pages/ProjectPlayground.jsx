import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EditorComponent from '../components/molecules/EditorComponent/EditorComponent';
import EditorButton from '../components/atoms/EditorButton/EditorButton';
import TreeStructure from '../components/organisms/TreeStructure/TreeStructure';
import { useTreeStructureStore } from '../store/treeStructureStore';
import { useEditorSocketStore } from '../store/editorSocketStore';
import {io} from 'socket.io-client'
import BrowserTerminal from '../components/molecules/BrowserTerminal/BrowserTerminal';
const ProjectPlayground = () => {

    const {projectId:projectIdFromUrl} = useParams();

    const { setProjectId, projectId}= useTreeStructureStore()

    const {setEditorSocket}= useEditorSocketStore()

    useEffect(()=>{
       setProjectId(projectIdFromUrl)
       console.log('this is the url --> ',import.meta.env.VITE_BACKEND_URL)
       const editorSocketConn =io(`${import.meta.env.VITE_BACKEND_URL}/editor`,{
           query:{
             projectId:projectIdFromUrl
           }
       })
       console.log('this is the editorSocketConn', editorSocketConn)
       setEditorSocket(editorSocketConn)
    },[projectIdFromUrl,setProjectId,setEditorSocket])

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
         <div>
           <BrowserTerminal/>
         </div>
    </>
  )
}

export default ProjectPlayground
