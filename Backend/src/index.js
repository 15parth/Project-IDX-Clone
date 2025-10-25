import express from 'express'
import cors from 'cors'
import {Server} from 'socket.io'
import chokidar from 'chokidar';
import {createServer} from 'node:http'
import { PORT } from './config/serverConfig.js'
import apiRoutes from './routes/main.routes.js'
import { handleEditorSocketEvents } from './socketHandlers/editorHanlder.js';


const app = express()
const server = createServer(app)
const io= new Server(server,{
  cors:{
     origin:'*',
     method: ['GET','POST']
  }
});


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

// io.on('connection', (sockets)=>{
//   console.log('server connected')
// })

app.get('/ping',(req,res)=>{
    return res.json({message:'Pong'})
})

app.use('/api', apiRoutes)

 
const editorNamespce = io.of('/editor');

editorNamespce.on("connection",(socket)=>{

  console.log('editor connected');

  let projectId=socket.handshake.query['projectId'];
  console.log('projectId receive after connection->', projectId)

  if(projectId){
    var watcher = chokidar.watch(`./projects/${projectId}`,{
      ignored:(path)=> path.includes("node_modules"),
      persistent:true, //keeps the watcher in running state 
      awaitWriteFinish:{
        stabilityThreshold:2000, // ensure stablity of files before triggering event
        pollInterval:100,
      },
      ignoreInitial:true
    }).on("all",(event,path)=>{
        console.log(event, path)
    })
  }
  handleEditorSocketEvents(socket, editorNamespce);

    
})

const terminamNamespace =io.of('/terminal');


terminamNamespace.on("connection",()=>{
    console.log()
})

server.listen(PORT, () => {
  console.log(`server started on Port ${PORT}`);
}).on("error", (err) => {
  console.error("Server failed to start:", err);
});