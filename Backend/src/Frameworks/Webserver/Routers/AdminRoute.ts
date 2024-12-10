import express from "express"
import adminControllers from "../../../Adapters/adminControllers"
import { adminDbRepository } from "../../../App/Interface/AdminDbRepository"
import { adminRepositoryMongo } from "../../Database/Repositories/adminRepository"
const adminRoute =()=>{
    const router=express.Router()
    const adminController=adminControllers(adminDbRepository,adminRepositoryMongo)


    //Adminrouters
    router.post("/login",adminController.adminLogin)
    router.get("/getAirlines",adminController.getAirlines)
    router.get("/getTrips",adminController.getTrips)
    router.get("/verifyTrip",adminController.verifyTrip)

    return router

}
export default adminRoute