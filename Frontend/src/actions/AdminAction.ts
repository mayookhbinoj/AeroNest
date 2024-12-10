import { createAsyncThunk } from "@reduxjs/toolkit";
import adminServiceMehood from "../Service/Adminservice";
import apiserviceMethood from "../Service/apiService";




export const adminLogin=createAsyncThunk("admin/login",async(data:{[key:string]:string|number},{rejectWithValue})=>{
    try {
        console.log("enter ",data)
        const response=adminServiceMehood.login("/login",data)
        return (await response).data
    } catch (error:any) {
      console.log(error)
    }
})

export const getFlights=createAsyncThunk("admin/getFlight",async( rejectWithValue)=>{
   try {
     const  response= await adminServiceMehood.getAirlines("/getAirlines")
     console.log("response",response)
     return response.data
   } catch (error) {
    console.log(error)
   }
})


export const getTrips=createAsyncThunk("admin/getTrips",async(id:any,{rejectWithValue})=>{
  try {
    const response=await adminServiceMehood.getTrips(`/getTrips?id=${id}`)
    console.log("response",response.data.trips)
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const verifyTrip=createAsyncThunk("admin/verifyTrip",async(id:string,{rejectWithValue})=>{
  try {
    const response=await adminServiceMehood.verifyTrips(`/verifyTrip?id=${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
})