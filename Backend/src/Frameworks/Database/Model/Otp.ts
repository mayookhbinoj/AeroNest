import mongoose from "mongoose";

const otp=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
   otp:{
    type:String,
    required:true
   },
   created_at: {
    type: Date,
    default: Date.now,
    expires: 120
},
})
export default mongoose.model("Otp",otp)