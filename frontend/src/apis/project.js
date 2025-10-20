import axios from "../config/axiosConfig";

export const createProjectApi= async (project)=>{
    try {
        
        const response = axios.post(`/api/v1/projects`)
        console.log(response?.data);
        return response?.data

    } catch (error) {
        console.log('this is error', error);
    }
} 