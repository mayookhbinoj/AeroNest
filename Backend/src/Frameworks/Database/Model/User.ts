import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true

    },
    passportDetails: {
        passportNumber: {
            type: String,
          
        },
        nationality: {
            type: String,
           
        },
        dateOfIssue: {
            type: String,
            
        },
        dateOfExpiry: {
            type: String,
          
        }
    }

})
export default mongoose.model("User",userSchema)