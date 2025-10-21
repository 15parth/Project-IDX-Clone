import util from 'util'
import child_process  from 'child_process';
import fs from 'fs/promises'
import uuid4 from 'uuid4'
import { REACT_PROJECT_COMMAND } from '../config/serverConfig.js';


const execPromisified = util.promisify(child_process.exec)


const createProjectController = async(req, res) => {
   
    const projectId= uuid4();
    console.log('New project id is', projectId);

    await fs.mkdir(`./projects/${projectId}`)

    const response = await execPromisified(REACT_PROJECT_COMMAND,{
        cwd:`./projects/${projectId}`
    })

    res.json({ message: 'project created', data : projectId });
};


export default createProjectController