import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true
  },
  flight:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"Airline"
  },
  aircraftType:{
  type:String
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  reachDate:{
    type:String,
    required:true
  },
  isVerified:{
   type:Boolean,
   default:false
  },
  classes: {
    economy: {
      totalSeats: {
        type: Number,
        required: true
      },
      economyPrice:{type:String},
      seats: [
        {
          seatType: { 
            type: String, 
          
          },
          seatNumber: { 
            type: String, 
           
          },
          price: {
            type: Number,
            
          },
          isAvailable: { 
            type: Boolean, 
            default: true 
          }
        }
      ]
    },
    business: {
      totalSeats: {
        type: Number,
        required: true
      },
      BusinessPrice:{
        type:String
      },
      
      seats: [
        {
          seatType: { 
            type: String, 
            required: true 
          },
          seatNumber: { 
            type: String, 
            required: true 
          },
          price: {
            type: Number,
            required: true
          },
          isAvailable: { 
            type: Boolean, 
            default: true 
          }
        }
      ]
    }
  }
});

export default mongoose.model("Trip", tripSchema);
