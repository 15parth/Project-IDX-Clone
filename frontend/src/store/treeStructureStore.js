import { QueryClient } from '@tanstack/react-query'
import {create} from 'zustand'
import { getProjectTree } from '../apis/project';

export const useTreeStructureStore = create((set,get)=>{

    const queryClient = new QueryClient();

   return {
    treeStructure:null,
    projectId:null,
    setTreeStructure:async ()=>{
      const id= get().projectId;
       const data = await queryClient.fetchQuery({
          queryKey: [`projectTree-${id}`], 
          queryFn:()=> getProjectTree({projectId:id})
       })
       set({
         treeStructure:data
       })
    },
    setProjectId:(projectId)=>{
      set({
         projectId:projectId
      })
    }
   }
})