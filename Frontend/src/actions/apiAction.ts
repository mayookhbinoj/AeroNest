import { createAsyncThunk } from "@reduxjs/toolkit";
import   apiserviceMethood  from "../Service/apiService"

export const registerUser=createAsyncThunk(
    "auth/register",
    async(userData:any,{rejectWithValue})=>{
        console.log("enter")
        try {
            console.log("user",userData)
            const response=await apiserviceMethood.post("/register",userData)
        
            if(response.data){
                console.log("enter")
                localStorage.setItem("user",JSON.stringify(response.data.newUser))           
            }
            console.log("response",response.data.newUser)
            return response.data
        } catch (error:any) {  
         console.log("error",error)
            if (error.response && error.response.data && error.response.data.message) {
                console.log("error",error.response)
                return rejectWithValue(error.response.data.message); 
              }
        
              return rejectWithValue("An unexpected error occurred");
           
        }
    }
)

export const verifyOtp=createAsyncThunk(
    "auth/verifyOtp",async(payload:{otp:string,userid:string},{rejectWithValue})=>{
       
    try {
       
        const response=await apiserviceMethood.verifyOtp("/verifyOtp",{otp:payload.otp,userid:payload.userid})
        console.log(response)
        return response
    } catch (error:any) {
        console.log("enter in to error")
        if (error.response && error.response.data && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
          }
          return rejectWithValue("An unexpected error occurred");
    }
})
export const login=createAsyncThunk(
    "auth/login",async(data:any,{rejectWithValue})=>{
        try {
       
            const respnse =await apiserviceMethood.login("/login",data)
            console.log(respnse,"res")
            if(respnse.data){
                console.log("enter")
                console.log("response",respnse.data.verify)
                localStorage.setItem("user",JSON.stringify(respnse.data.verify))
               
            }
            console.log(respnse.data)
            return respnse.data
        } catch (error:any) {
            if (error.response && error.response.data && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
              }
              return rejectWithValue("An unexpected error occurred");
        }
        
    }
)
export const googleLogin=createAsyncThunk(
    "auth/google",async(token:any,{rejectWithValue})=>{
        try {
           
            const response=await apiserviceMethood.googleLogin("/googleLogin",token)
            if(response.data){
                localStorage.setItem("user",JSON.stringify(response.data.newUser))
                console.log("response",response.data)
            }
            return response.data
            
        } catch (error:any) {
            if (error.response && error.response.data && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
              }
              return rejectWithValue("An unexpected error occurred");
            
        }
    }
)

export const profileEdit=createAsyncThunk(
    "auth/profileEdit",async(data:{[key:string]:string|number},{rejectWithValue})=>{
        try {
            console.log("enter")
            const response=await apiserviceMethood.profilUpdate("/ProfileUpdate",data)
            console.log("response",response.data)
            return response.data
        } catch (error:any) {
            console.log("error",error)
            console.log("error")
            if (error.response && error.response.data && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
              }
              return rejectWithValue("An unexpected error occurred");
            
        }
  
    }
)


export const contactEdit=createAsyncThunk("auth/contactEdit",async(data:{[key:string]:string},{rejectWithValue})=>{
    try {
        console.log("enter")
        const respnse=await apiserviceMethood.contactEdit("/contactEdit",data)
        return respnse.data
    } catch (error:any) {
        console.log("error",error)
        console.log("error")
        if (error.response && error.response.data && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
          }
          return rejectWithValue("An unexpected error occurred");
        
    
    }
})


export const passportEdit=createAsyncThunk("auth/passportEdit",async(data:{[key:string]:string|number},{rejectWithValue})=>{
    try {
        console.log("enter in to action ",data)
        const response=await apiserviceMethood.passport("/passportEdit",data)
        return response.data
    } catch (error:any) {
        console.log("error",error)
        console.log("error")
        if (error.response && error.response.data && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
          }
          return rejectWithValue("An unexpected error occurred");
        
    
    }
    
})
export const logOut=createAsyncThunk("auth/logOut",async()=>{
    try {
        const response=await apiserviceMethood.logout()
    } catch (error) {
        
    }
})