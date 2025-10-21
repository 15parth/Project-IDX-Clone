import axios from "../config/axiosConfig";

export const createProjectApi= async (project)=>{
    try {
        
        const response = await axios.post(`/api/v1/projects`)
        console.log(response?.data);
        return response?.data

    } catch (error) {
        console.log('this is error', error);
    }
}  


export const getProjectTree = async({projectId})=>{
        try {
        const response = await axios.get(`/api/v1/projects/${projectId}/tree`)
        console.log(response?.data);
        return response?.data?.data

    } catch (error) {
        console.log('this is error', error);
    }
}