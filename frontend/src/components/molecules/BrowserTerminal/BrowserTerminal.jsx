import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import "@xterm/xterm/css/xterm.css"; // required styles
import { useEffect, useRef,useParams } from 'react';
// import { AttachAddon } from '@xterm/addon-attach';
// import { useTerminalSocketStore } from '../../../store/terminalSocketStore';
import {io} from  'socket.io-client'

 const BrowserTerminal = () => {

    const terminalRef = useRef(null);
    const socket = useRef(null);
    // const socket = useRef(null);
    const {projectId: projectIdFromUrl } = useParams();

    // const { terminalSocket } = useTerminalSocketStore();
    

    useEffect(() => {
        const term = new Terminal({
            cursorBlink: true,
            theme: {
                background: "#282a37",
                foreground: "#f8f8f3",
                cursor: "#f8f8f3",
                cursorAccent: "#282a37",
                red: "#ff5544",
                green: "#50fa7c",
                yellow: "#f1fa8c",
                cyan: "#8be9fd",
            },
            fontSize: 16,
            fontFamily: "Fira Code",
            convertEol: true,
        });

        term.open(terminalRef.current);
        let fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        fitAddon.fit();

        socket.current= io(`${import.meta.env.VITE_BACKEND_URL}/terminal`,{
          query:{
            projectId:projectIdFromUrl
          }
        })

        socket.current.on("shell-output",(data)=>{
          term.write(data);
        })

        // if(terminalSocket) {
        //     terminalSocket.onopen = () => {
        //         const attachAddon = new AttachAddon(terminalSocket);
        //         term.loadAddon(attachAddon);
        //         // socket.current = ws;
        //     }
        // }
        
        term.onData((data)=>{
           console.log(data);
           socket.current.emit("shell-input", data);
        })

        return () => {
            term.dispose();
            socket.current.disconnect();
            // terminalSocket?.close();
        }
    }, [])

    return (
        <div
            ref={terminalRef}
            style={{
                width: "100vw",
            }}
            className='terminal'
            id="terminal-container"
        >

        </div>
    )
}

export default BrowserTerminal