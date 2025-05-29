import axios from "axios";
import { ElMessage } from 'element-plus'

export default function useAxios (){

    const postData = async (url: string, formData: any) => {
        let config: any;
        const token: string | null = localStorage.getItem('token')
        if(token){
            config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                },
                // onUploadProgress: function(progressEvent) {
                //     let percentage = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                //     store.commit('upload/setPercentage',{uid: formData.get('uid'), percentage: percentage})
                // }
            }
        }else {
            config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        }
        return await axios.post(url, formData, config)
    }

    const post = async (url: string, param: any) => {
        let config: any;
        const token: string | null = localStorage.getItem('token')

        if(token){
            config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                }
            }
        }else {
            config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'multipart/form-data'
                }
            }
        }
         try {
             return await axios.post(url, param, config)
         }catch (error){
            showError(error)
         }
    }

    const get = async(url: string) => {
        const token: string | null  = localStorage.getItem('token')
        const config: any = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            }
        }
   
        try {
            return await axios.get(url, config)
        }catch (error){
           showError(error)
        } 
    }

    const patch = async(url: any, params: any) => {
        let config: any;
        const token: string | null = localStorage.getItem('token')

        if(token){
            config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                }
            }

        }else {
            config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'multipart/form-data'
                }
            }
        }

        try {
            return await axios.patch(url, params, config)
        }catch (error){
           showError(error)
        }
    }

    const remove = async(url: string) => {
        const token: string | null = localStorage.getItem('token')
        const config: any = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            }
        }

        try {
            return await axios.delete(url, config)
        }catch (error){
           showError(error)
        }
    }

    const showError = (error: any) => {
        const message: string = error.response.data.message
        if(Array.isArray(message)){
            message.forEach(msg => {
            ElMessage.error(msg)
            });
        }else{
            ElMessage.error(message)
        }
         //window.location.href = '/app/acceuil'
    }

    return {
        postData,
        post,
        get,
        patch,
        remove
    }
}