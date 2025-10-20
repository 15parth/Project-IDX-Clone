import express from 'express'
import projectRouter from './v1Routes/project.routes.js'

const router = express.Router();


router.use('/projects', projectRouter)


export default router;