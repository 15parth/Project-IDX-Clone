import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { useFileContextMenu } from '../../../store/fileContextMenuStore';
import './FileContextMenu.css'

const FileContextMenu = ({x, y,path}) => {

    const {setIsOpen}= useFileContextMenu()

    const { editorSocket} = useEditorSocketStore();

    const handleFileDelete=(e)=>{
         e.preventDefault();
         console.log('file deletion')
         editorSocket.emit("deleteFile",{
            pathToFileOrFolder:path
         })
    }

    const handleFileRename = () => {
        e.preventDefault();
        console.log('file deletion')
    }

  return (
    <div 
     onMouseLeave={()=>{
        setIsOpen(false)
     }}
    style={{
        width:'120px',
        position:'fixed',
        left:x,
        top:y,
        border:'1.5px solid black',
    }}
     className='fileContextOptionsWrapper'
    >
        <button 
         onClick={handleFileDelete}
         className='fileContextButton'
        >Delete file</button>
        <button onClick={handleFileRename}  className='fileContextButton'>Rename file</button>
    </div>
  )
}

export default FileContextMenu
