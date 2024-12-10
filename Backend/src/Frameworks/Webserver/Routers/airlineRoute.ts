
import express from "express"
import airlineController from "../../../Adapters/airlineController"
import { airlineRepositoryMongo } from "../../Database/Repositories/airlineRepository"
import { airlineDbReposirtory } from "../../../App/Interface/airlineDbRespository"
const airlineRoute=()=>{

    const router=express.Router()
    const airline=airlineController(airlineDbReposirtory,airlineRepositoryMongo)
    
    //register airiline
    router.post("/Register",airline.airlineRegister)
    router.post("/login",airline.login)
    router.post("/addTrip",airline.addTrip)
    router.get("/getTrips",airline.getTrips)


    return router

}
export default airlineRoute