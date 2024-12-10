import mongoose  from "mongoose";
import configKeys from "../../Utils/Config";

const connectDB= async()=>{
    try {
        await mongoose.connect(configKeys.MONGO_Db_URI)
        console.log("connect Mongodb")
    } catch (error) {
        throw new Error("Environment variable MONGO_URI must be defined.")
    }
}
export default connectDB