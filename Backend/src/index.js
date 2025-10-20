import express from 'express'
import cors from 'cors'
import { PORT } from './config/serverConfig.js'
import apiRoutes from './routes/main.routes.js'



const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get('/ping',(req,res)=>{
    return res.json({message:'Pong'})
})

app.use('/api', apiRoutes)

app.listen(PORT, () => {
  console.log(`server started on Port ${PORT}`);
}).on("error", (err) => {
  console.error("Server failed to start:", err);
});