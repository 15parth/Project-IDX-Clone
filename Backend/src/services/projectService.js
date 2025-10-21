import fs from 'fs/promises'
import uuid4 from 'uuid4'
import { REACT_PROJECT_COMMAND } from '../config/serverConfig.js';
import { execPromisified } from '../utils/execUtility.js';
import path from 'path'
import dirTree from "directory-tree";



export const createProjectService= async (req,res)=>{
    
      const projectId= uuid4();
      console.log('New project id is', projectId);
  
      await fs.mkdir(`./projects/${projectId}`)
  
      const response = await execPromisified(REACT_PROJECT_COMMAND,{
          cwd:`./projects/${projectId}`
      })

    return projectId;
}


export const getProjectTreeService = async (projectId)=>{
     const projectPath = path.resolve(`./projects/${projectId}`);
     const tree = dirTree(projectPath);

     return tree;
}