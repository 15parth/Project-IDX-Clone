import express from 'express'
import cors from 'cors'
import {Server} from 'socket.io'
import {createServer} from 'node:http'
import { PORT } from './config/serverConfig.js'
import apiRoutes from './routes/main.routes.js'


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

io.on('connection', (sockets)=>{
  console.log('server connected')
})

app.get('/ping',(req,res)=>{
    return res.json({message:'Pong'})
})

app.use('/api', apiRoutes)

server.listen(PORT, () => {
  console.log(`server started on Port ${PORT}`);
}).on("error", (err) => {
  console.error("Server failed to start:", err);
});