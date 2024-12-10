import { createAsyncThunk } from "@reduxjs/toolkit";
import airlineServiceMehood from "../Service/AirlineSerive"


export const airlineRegister=createAsyncThunk("airline/Register",async(formData:{[key:string]:string|number},{rejectWithValue})=>{
    try {
      const result=await airlineServiceMehood.register("/Register",formData)

    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.log("error",error.response)
            return rejectWithValue(error.response.data.message); 
          }
    
          return rejectWithValue("An unexpected error occurred");
       
    }
    }
)
export const airlineLogin=createAsyncThunk("airline/login",async(email:{[key:string]:string},{rejectWithValue})=>{
  try {
    console.log("enter",email)
    const response=await airlineServiceMehood.login("/login",email)
    console.log(response.data)
    return response.data

  } catch (error:any) {
    console.log("error",error)
    if (error.response && error.response.data && error.response.data.message) {
      console.log("error",error.response)
      return rejectWithValue(error.response.data.message); 
    }

    return rejectWithValue("An unexpected error occurred");
 
}
})

export const airlineTrip=createAsyncThunk("airline/trip",async(data:{[key:string]:string|number},{rejectWithValue})=>{
    try {
      console.log("enter with data",data)
      const response=await airlineServiceMehood.trip("/addTrip",data)
      return response.data.trips
    } catch (error:any) {
      console.log("error",error)
      if (error.response && error.response.data && error.response.data.message) {
        console.log("error",error.response)
        return rejectWithValue(error.response.data.message); 
      }
  
      return rejectWithValue("An unexpected error occurred");
      
    }
})
export const getTrip=createAsyncThunk("airline/getTrip",async(id:any,{rejectWithValue})=>{
  try {
     console.log("enter in to the flights")
     console.log(id)
     const response=await airlineServiceMehood.getTrips(`/getTrips?id=${id}`)
     console.log("response",response.data.trips)
     return response.data
  } catch (error) {
    
  }
})