import axios from "axios";
import { contactEdit, googleLogin, verifyOtp } from "../actions/apiAction";
import { url } from "inspector";


const API_URL ='http://localhost:4001/api/user'

const apiservice=axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json"
    }
   
})
const apiserviceMethood={
    post:(url:string,data:any)=> {return  apiservice.post(url,data)},
    verifyOtp:(url:string,data:any)=>{  return  apiservice.post(url,data)},
    login:(url:string,data:any)=>{return apiservice.post(url,data)},
    googleLogin:(url:string,token:string)=>{ return  apiservice.post(url,token)},
    logout:()=>{return localStorage.removeItem("user")},
    profilUpdate:(url:string,data:any)=>{return apiservice.post(url,data) },
    contactEdit:(url:string,data:any)=>{return apiservice.post(url,data)},
    passport:(url:string,data:{[key:string]:string|number})=>{return apiservice.post(url,data)}
    
}
export default apiserviceMethood