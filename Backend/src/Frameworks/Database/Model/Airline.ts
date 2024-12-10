import mongoose from "mongoose";

const airlineSchema=new mongoose.Schema({
   
    airlineName:{
        type:String,
        require:true
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    email:{
        type:String,
        require:true
    },
    countryRegistration:{
        type:String,
        require:true
    },
    IATA:{
        type:String,
        require:true
    },
    ICAO:{
        type:String,
        require:true
    },
    website:{
        type:String
    },
    phone:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true
    },
    adress:{
        type:String,
        require:true
    },
    fax:{
        type:String,
        require:true
    },



})

export default mongoose.model("Airline",airlineSchema)