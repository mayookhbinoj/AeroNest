import { createSlice } from "@reduxjs/toolkit";

import { adminLogin ,getFlights,getTrips,verifyTrip} from "../../actions/AdminAction";



interface AdminState{
    admin:any,
    flights:any[],
    trips:any[]
    isError: boolean;
    isOtp: boolean;
    isLoading: boolean;
    isSucess: boolean;
    message: string;
}

const initialState:AdminState={
    admin: "",
    flights:[],
    trips:[],
    isError: false,
    isOtp: false,
    isLoading: false,
    isSucess: false,
    message: "",
  

}
const adminSlice=createSlice({
    name:"admin",
    initialState,
    reducers:{
        reset:(state)=>{
            state.isError=false
            state.isLoading=false
            state.isSucess=false
            state.message=""
            state.flights=[]
            state.admin=""
          
        },
        resetTrips:(state)=>{
            state.trips=[]
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(adminLogin.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(adminLogin.fulfilled,(state,action:any)=>{
          
            console.log("action payload",action.payload)
            state.isLoading=false
            state.isSucess=true
            state.admin={...action.payload.newAdmin}
        })
        .addCase(adminLogin.rejected,(state,action:any)=>{
            state.isSucess=false
            state.isError=true
        })
        .addCase(getFlights.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getFlights.fulfilled,(state,action:any)=>{
            console.log("enter in to te sucess")
            console.log("state",state.flights)
            console.log("action",action.payload)
            state.isLoading=false
            state.isSucess=true
            state.flights=action.payload.airlines
           
        })
        .addCase(getFlights.rejected,(state)=>{
            state.isError=true
        })
        .addCase(getTrips.pending,(state)=>{
            state.isLoading=true

        })
        .addCase(getTrips.fulfilled,(state,action:any)=>{
            console.log("action",action.payload)
            state.isLoading=false
            state.isSucess=true
            state.trips=action.payload.trips
        })
        .addCase(getTrips.rejected,(state,action:any)=>{
            state.isSucess=false
            state.isError=true
        })
        .addCase(verifyTrip.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(verifyTrip.fulfilled,(state,action:any)=>{
            state.isLoading=false
            state.isSucess=true
             state.trips=action.payload.trips
            console.log("action",action.payload)
        })
        .addCase(verifyTrip.rejected,(state)=>{
            state.isError=true
            state.isSucess=false
        })
    }
})

 export const {reset,resetTrips}=adminSlice.actions
export default adminSlice.reducer