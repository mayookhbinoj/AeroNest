
import {Request,Response,NextFunction} from "express"
import {airlinRegistere,airlineLogin,addFlight,getAllTrips} from "../App/User/Auth/Read&Update/airlineAuth"
import { airDbInterface } from "../App/Interface/airlineDbRespository"
import { airlineRepositoryMongoType } from "../Frameworks/Database/Repositories/airlineRepository"
const airlineController=(airlineDbRespository:airDbInterface,airlineImp:airlineRepositoryMongoType)=>{
    const  dbRepositoryUser=airlineDbRespository(airlineImp())
    const airlineRegister=async(req:Request,res:Response)=>{
        try {
            const Airline=req.body
            const newAirline=await airlinRegistere(Airline,dbRepositoryUser)
            res.status(200).json({newAirline,message:"sucessfull"})
            
        } catch (error) {
            console.log(error)
            
        }
    }
    const login=async(req:Request,res:Response)=>{
        try {
            const {email}=req.body
           const newAirline=await airlineLogin(email,dbRepositoryUser)
           console.log("new",newAirline)
            res.status(200).json({newAirline,message:"sucessfull"})
        } catch (error:any) {
           if(error.message=="Email not found"){
            res.status(400).json({message:"Email not found"})
           }
        }
    }
    const addTrip=async(req:Request,res:Response)=>{
        try {
            console.log("enter in to the addtrip",req.body)
            const data=req.body 
            const trips=await addFlight(data,dbRepositoryUser)
            res.status(200).json({trips})

        } catch (error) {
            console.log(error)
            
        }
    }
    const getTrips=async(req:Request,res:Response)=>{
        try {
            console.log("enter ",req.query)
            const id=req.query
            const gettrips=await getAllTrips
            const trips=await gettrips(id,dbRepositoryUser)
             res.status(200).json({trips})
            
        } catch (error) {
            
        }
    }
    return {
        airlineRegister,
        login,
        addTrip,
        getTrips
    }

}
export default airlineController