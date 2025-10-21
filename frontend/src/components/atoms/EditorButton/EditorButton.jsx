import React from 'react'
import './EditorButton.css'

const EditorButton = ({isActive }) => {

    function handleClick(){
        //Todo implement click handler
    }

    

  return (
    <button 
     className='editor-button'
     style={{
        color: isActive ? 'white':'#6272a4',
        backgroundColor: isActive ? '#282a37' :'#4a4859',
        borderTop : isActive ? ' 1px solid #ea86c0': 'none'
     }}
    >
      file.js
    </button>
  )
}

export default EditorButton
