import { createSlice } from "@reduxjs/toolkit";
import { airlineLogin,airlineTrip,getTrip } from "../../actions/AirlineAction";
import { stat } from "fs";

interface AirlineState {
    airline: any; 
    trips: any[]; 
    isError: boolean;
    isOtp: boolean;
    isLoading: boolean;
    isSucess: boolean;
    message: string;
}

const initialState: AirlineState = {
    airline: "",
    trips: [],
    isError: false,
    isOtp: false,
    isLoading: false,
    isSucess: false,
    message: ""
};


const airlineSlice=createSlice({
    name:"airline",
    initialState,
    reducers:{
      reset:(state)=>{
        state.isError=false
        state.isLoading=false
        state.isSucess=false
        state.message=""
        state.airline=""
        state.trips=[]
      },
      resetTrips:(state)=>{
        state.trips=[]
      }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(airlineLogin.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(airlineLogin.fulfilled,(state,action:any)=>{
            console.log("actio",action.payload)
            state.isSucess=true
            state.isLoading=false
            state.airline={...action.payload.newAirline}
            state.message=action.payload.message
        })
        .addCase(airlineLogin.rejected,(state,action:any)=>{
            state.isError=true
            state.isSucess=false
            state.message=action.payload.message||"Email Not Found"
        })
        .addCase(airlineTrip.pending,(state)=>{
             state.isLoading=true
        })
        .addCase(airlineTrip.fulfilled,(state,action:any)=>{
            console.log("state",action.payload)

          
            state.isLoading=false
            state.isSucess=true
            console.log("action payload",state.trips)
            state.message="trip is added"
        })
         .addCase(airlineTrip.rejected,(state)=>{
            state.isSucess=false
            state.isError=true
         })
         .addCase(getTrip.pending,(state)=>{
            state.isLoading=true
         })
         .addCase(getTrip.fulfilled,(state,action:any)=>{
            console.log("action",action.payload)
            state.trips.push(...action.payload.trips)
            state.isSucess=true
            state.isLoading=false
         })
         .addCase(getTrip.rejected,(state)=>{
            state.isError=true
         })
    }


})

export const {reset,resetTrips}=airlineSlice.actions
export default airlineSlice.reducer